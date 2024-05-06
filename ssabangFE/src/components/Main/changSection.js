function calculateMonthlyAverage(data, area) {
  data.sort((a, b) => {
    const [yearA, monthA, dayA] = a.dealDate.split('-').map(part => part.padStart(2, '0'));
    const [yearB, monthB, dayB] = b.dealDate.split('-').map(part => part.padStart(2, '0'));

    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);

    return dateA - dateB;
  });

  const today = new Date();
  const todayYear = today.getFullYear().toString();
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, '0');

  const monthlyAveragePrices = [[],[]];
  const chartData = [];
  let currentYear = '';
  let currentMonth = '';
  let sum = 0;
  let count = 0;

  for (const item of data) {
    if(area === '-1' || item.area === area){
      chartData.push(item);
      const [year, month] = item.dealDate.split('-').map(part => part.padStart(2, '0'));
      const dealAmount = parseFloat(item.dealAmount);
      
      while ((year !== currentYear || month !== currentMonth) && (currentYear !== '' || currentMonth !== '')) {
        // 빈 달에 대해 이전 달의 정보를 사용하되, 이전 달이 없으면 기본 가격을 사용
        const average = count === 0 ? 0 : Math.round(sum / count);
        monthlyAveragePrices[0].push([`${currentYear}-${currentMonth}`, average]);

        // 다음 달로 이동
        const nextDate = new Date(`${currentYear}-${currentMonth}-01`);
        nextDate.setMonth(nextDate.getMonth() + 1);
        currentYear = nextDate.getFullYear().toString();
        currentMonth = (nextDate.getMonth() + 1).toString().padStart(2, '0');
      }

      if (year !== currentYear || month !== currentMonth) {
        // 새로운 달에 대한 초기화
        currentYear = year;
        currentMonth = month;
        sum = dealAmount;
        count = 1;
      } else {
        sum += dealAmount;
        count++;
      }

      // 만약 현재 달이 오늘의 달과 같다면 반복 종료
      if (year === todayYear && month === todayMonth) {
        break;
      }
    }
  }

  // 오늘의 달까지 데이터를 채웁니다.
  while (currentYear !== todayYear || currentMonth !== todayMonth) {
    const average = count === 0 ? 0 : Math.round(sum / count);
    monthlyAveragePrices[0].push([`${currentYear}-${currentMonth}`, average]);

    const nextDate = new Date(`${currentYear}-${currentMonth}-01`);
    nextDate.setMonth(nextDate.getMonth() + 1);
    currentYear = nextDate.getFullYear().toString();
    currentMonth = (nextDate.getMonth() + 1).toString().padStart(2, '0');
  }

  monthlyAveragePrices[0].reverse();
  monthlyAveragePrices[1] = chartData.reverse();
  return monthlyAveragePrices;
}

export { calculateMonthlyAverage };