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

  const firstItem = data[0];
  const [firstYear, firstMonth] = firstItem.dealDate.split('-').map(part => parseInt(part));
  let currentYear = firstYear;
  let currentMonth = firstMonth - 1; // JavaScript에서 월은 0부터 시작하므로 1을 뺍니다.

  // 첫 번째 요소의 날짜와 같은 달의 평균을 추가합니다.
  const firstMonthAverage = calculateMonthAverage(data, firstYear, firstMonth, area);
  halfAveragePrices[0].push([`${firstYear}-${firstMonth}`, firstMonthAverage]);

  for (const item of data) {
    if (area == -1 || item.area == area) {
      chartData.push(item);
      const [year, month] = item.dealDate.split('-').map(part => part.padStart(2, '0'));
      const dealAmount = parseFloat(item.dealAmount);
      const dealDate = new Date(`${year}-${month}-01`);
      const currentDate = new Date(`${currentYear}-${currentMonth + 1}-01`); 

      if (dealDate > currentDate) {
        if (count > 0) {
          const average = Math.round(sum / count);
          halfAveragePrices[0].push([`${currentYear}-${currentMonth + 1}`, parseFloat((average / 10000).toFixed(2))]); 
        }
        currentMonth += 6;
        if (currentMonth >= 12) {
          currentYear++;
          currentMonth %= 12;
        }
        sum = 0;
        count = 0;
      }

      if (dealDate >= currentDate) {
        sum += dealAmount;
        count++;
      }
    }
  }

  if (count > 0) {
    const average = Math.round(sum / count);
    halfAveragePrices[0].push([`${currentYear}-${currentMonth + 1}`, parseFloat((average / 10000).toFixed(2))]); 
  }

  halfAveragePrices[1] = chartData.reverse();
  return halfAveragePrices;
}

function calculateMonthAverage(data, year, month, area) {
  let sum = 0;
  let count = 0;

  for (const item of data) {
    const [itemYear, itemMonth] = item.dealDate.split('-').map(part => parseInt(part));
    if (itemYear === year && itemMonth === month && (area == -1 || item.area == area)) {
      sum += parseFloat(item.dealAmount);
      count++;
    }
  }

  if (count > 0) {
    return parseFloat((sum / count / 10000).toFixed(2));
  } else {
    return 0;
  }
}

export { calculateHalfAverage };
