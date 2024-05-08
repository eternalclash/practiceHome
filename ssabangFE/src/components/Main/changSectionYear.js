function calculateYearlyAverage(data, area) {
  data.sort((a, b) => {
    const [yearA, monthA, dayA] = a.dealDate.split('-').map(part => part.padStart(2, '0'));
    const [yearB, monthB, dayB] = b.dealDate.split('-').map(part => part.padStart(2, '0'));

    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);

    return dateA - dateB;
  });

  const today = new Date();
  const todayYear = today.getFullYear().toString();

  const yearlyAveragePrices = [];
  const yearlyChartData = [];
  let currentYear = '';
  let sum = 0;
  let count = 0;

  for (const item of data) {
    if(area == '-1' || item.area == area){
      const [year] = item.dealDate.split('-');
      const dealAmount = parseFloat(item.dealAmount);

      if (year !== currentYear) {
        if (currentYear !== '') {
          const average = count === 0 ? 0 : Math.round(sum / count);
          yearlyAveragePrices.push([currentYear, parseFloat((average / 10000).toFixed(2))]);
        }

        currentYear = year;
        sum = dealAmount;
        count = 1;
      } else {
        sum += dealAmount;
        count++;
      }

      yearlyChartData.push(item);

      if (year === todayYear) {
        break;
      }
    }
  }

  if (count > 0) {
    const average = Math.round(sum / count);
    yearlyAveragePrices.push([currentYear, parseFloat((average / 10000).toFixed(2))]);
  }

  // 결과를 반환합니다. 연도별 평균 가격 및 해당 연도의 데이터가 담긴 배열을 반환합니다.
  return [yearlyAveragePrices, yearlyChartData.reverse()];
}

export { calculateYearlyAverage };
