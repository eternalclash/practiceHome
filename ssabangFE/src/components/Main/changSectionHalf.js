function calculateHalfAverage(data, area) {
  data.sort((a, b) => {
    const [yearA, monthA, dayA] = a.dealDate.split('-').map(part => part.padStart(2, '0'));
    const [yearB, monthB, dayB] = b.dealDate.split('-').map(part => part.padStart(2, '0'));

    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);

    return dateA - dateB;
  });

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;

  const halfAveragePrices = [[],[]];
  const chartData = [];

  const threeYearsAgo = new Date(today);
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

  // 루프 시작을 현재 달로 설정합니다.
  let currentYear = todayYear;
  let currentMonth = todayMonth;
  let sum = 0;
  let count = 0;

  for (const item of data) {
    if (area == -1 || item.area == area) {
      chartData.push(item);
      const [year, month] = item.dealDate.split('-').map(part => part.padStart(2, '0'));
      const dealAmount = parseFloat(item.dealAmount);

      const dealDate = new Date(`${year}-${month}-01`);

      if (dealDate >= threeYearsAgo && dealDate <= today) {
        // 6개월 단위로 데이터를 누적하여 합산합니다.
        if (dealDate.getMonth() % 6 === 0) {
          if (count > 0) {
            const average = Math.round(sum / count);
            halfAveragePrices[0].push([`${currentYear}-${currentMonth}`, parseFloat((average / 10000).toFixed(2))]);
          }
          sum = 0;
          count = 0;
          currentYear = dealDate.getFullYear();
          currentMonth = dealDate.getMonth() + 1;
        }
        sum += dealAmount;
        count++;
      }
    }
  }

  if (count > 0) {
    const average = Math.round(sum / count);
    halfAveragePrices[0].push([`${currentYear}-${currentMonth}`, parseFloat((average / 10000).toFixed(2))]);
  }

  halfAveragePrices[1] = chartData.reverse();
  return halfAveragePrices;
}

export { calculateHalfAverage };
