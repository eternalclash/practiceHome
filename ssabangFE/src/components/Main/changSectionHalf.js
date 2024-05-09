function calculateHalfAverage(data, area) {
  // 데이터를 날짜순으로 정렬합니다.
  data.sort((a, b) => {
    const [yearA, monthA, dayA] = a.dealDate.split('-').map(part => part.padStart(2, '0'));
    const [yearB, monthB, dayB] = b.dealDate.split('-').map(part => part.padStart(2, '0'));

    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);

    return dateA - dateB;
  });

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();

  const halfAveragePrices = [[], []];
  const chartData = [];

  let sum = 0;
  let count = 0;
  let currentYear = todayYear - 3;
  let currentMonth = todayMonth;

  for (const item of data) {
    if (area == -1 || item.area == area) {
      chartData.push(item);
      const [year, month] = item.dealDate.split('-').map(part => part.padStart(2, '0'));
      const dealAmount = parseFloat(item.dealAmount);
      const dealDate = new Date(`${year}-${month}-01`);
      const currentDate = new Date(`${currentYear}-${currentMonth + 1}-01`); 

      if (dealDate > currentDate) {
        currentMonth += 6;
        if (currentMonth >= 12) {
          currentYear++;
          currentMonth %= 12;
        }
        const average = Math.round(sum / count);
        halfAveragePrices[0].push([`${currentYear}-${currentMonth + 1}`, parseFloat((average / 10000).toFixed(2))]); 
        sum = 0;
        count = 0;
      }

      if (dealDate >= currentDate) {
        sum += dealAmount;
        count++;
      }
    }
  }

  halfAveragePrices[1] = chartData.reverse();
  return halfAveragePrices;
}

export { calculateHalfAverage };
