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
  let currentYear = todayYear;
  let currentMonth = todayMonth;
  let sum = 0;
  let count = 0;

  for (const item of data) {
    if(area == -1 || item.area == area){
      chartData.push(item);
      const [year, month] = item.dealDate.split('-').map(part => part.padStart(2, '0'));
      const dealAmount = parseFloat(item.dealAmount);
      
      while (!(year === currentYear && month === currentMonth) && (currentYear > year || (currentYear === year && currentMonth > month))) {
        // 6개월 전까지 데이터를 모은 후 평균 계산
        if (count > 0) {
          const average = Math.round(sum / count);
          halfAveragePrices[0].push([`${currentYear}-${currentMonth}`, parseFloat((average / 10000).toFixed(2))]);
        }

        // 다음 6개월로 이동
        currentMonth -= 6;
        if (currentMonth <= 0) {
          currentYear--;
          currentMonth += 12;
        }
        sum = 0;
        count = 0;
      }

      sum += dealAmount;
      count++;

      // 오늘의 달까지 데이터를 처리했으면 종료
      if (currentYear === todayYear && currentMonth === todayMonth) {
        break;
      }
    }
  }

  // 마지막 남은 데이터 처리
  if (sum > 0 && count > 0) {
    const average = Math.round(sum / count);
    halfAveragePrices[0].push([`${currentYear}-${currentMonth}`, parseFloat((average / 10000).toFixed(2))]);
  }

  halfAveragePrices[1] = chartData.reverse();
  return halfAveragePrices;
}

export { calculateHalfAverage };
