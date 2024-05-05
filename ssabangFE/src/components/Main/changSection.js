// function calculateMonthlyAverage(data) {
//   data.sort((a, b) => {
//     const [yearA, monthA] = a.dealDate.split('. ').map(part => part.padStart(2, '0'));
//     const [yearB, monthB] = b.dealDate.split('. ').map(part => part.padStart(2, '0'));

//     const dateA = new Date(`${yearA}-${monthA}-01`);
//     const dateB = new Date(`${yearB}-${monthB}-01`);

//     return dateA - dateB;
//   });

//   const today = new Date();
//   const todayYear = today.getFullYear().toString();
//   const todayMonth = (today.getMonth() + 1).toString().padStart(2, '0');

//   const monthlyAveragePrices = [];
//   let currentYear = '';
//   let currentMonth = '';
//   let sum = 0;
//   let count = 0;

//   for (const item of data) {
//     const [year, month] = item.dealDate.split('. ').map(part => part.padStart(2, '0'));
//     const dealAmount = parseFloat(item.dealAmount);

//     while ((year !== currentYear || month !== currentMonth) && (currentYear !== '' || currentMonth !== '')) {
//       // 빈 달에 대해 이전 달의 정보를 사용하되, 이전 달이 없으면 기본 가격을 사용
//       const average = count === 0 ? 0 : Math.round(sum / count);
//       monthlyAveragePrices.push([`${currentYear}-${currentMonth}`, average]);

//       // 다음 달로 이동
//       const nextDate = new Date(`${currentYear}-${currentMonth}-01`);
//       nextDate.setMonth(nextDate.getMonth() + 1);
//       currentYear = nextDate.getFullYear().toString();
//       currentMonth = (nextDate.getMonth() + 1).toString().padStart(2, '0');
//     }

//     if (year !== currentYear || month !== currentMonth) {
//       // 새로운 달에 대한 초기화
//       currentYear = year;
//       currentMonth = month;
//       sum = dealAmount;
//       count = 1;
//     } else {
//       sum += dealAmount;
//       count++;
//     }

//     // 만약 현재 달이 오늘의 달과 같다면 반복 종료
//     if (year === todayYear && month === todayMonth) {
//       break;
//     }
//   }

//   // 오늘의 달까지 데이터를 채웁니다.
//   while (currentYear !== todayYear || currentMonth !== todayMonth) {
//     const average = count === 0 ? 0 : Math.round(sum / count);
//     monthlyAveragePrices.push([`${currentYear}-${currentMonth}`, average]);

//     const nextDate = new Date(`${currentYear}-${currentMonth}-01`);
//     nextDate.setMonth(nextDate.getMonth() + 1);
//     currentYear = nextDate.getFullYear().toString();
//     currentMonth = (nextDate.getMonth() + 1).toString().padStart(2, '0');
//   }

//   console.log(monthlyAveragePrices);
//   monthlyAveragePrices.reverse();
//   return monthlyAveragePrices;
// }

// export { calculateMonthlyAverage };
function calculateMonthlyAverage(data) {
  // 날짜를 올바른 형식으로 분리 및 정렬
  data.sort((a, b) => {
    const [yearA, monthA, dayA] = a.dealDate.split('-').map((part) => part.padStart(2, '0'))
    const [yearB, monthB, dayB] = b.dealDate.split('-').map((part) => part.padStart(2, '0'))

    const dateA = new Date(yearA, monthA - 1, dayA)
    const dateB = new Date(yearB, monthB - 1, dayB)

    return dateA - dateB
  })

  data.forEach(d=>console.log(d))

  const today = new Date()
  const todayYear = today.getFullYear().toString()
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, '0')

  const monthlyAveragePrices = []
  let currentYear = ''
  let currentMonth = ''
  let sum = 0
  let count = 0

  data.forEach((item) => {
    const [year, month] = item.dealDate.split('-').map((part) => part.padStart(2, '0'))
    const dealAmount = parseFloat(item.dealAmount)

    if (year !== currentYear || month !== currentMonth) {
      if (currentYear !== '' || currentMonth !== '') {
        const average = count === 0 ? 0 : Math.round(sum / count)
        monthlyAveragePrices.push([`${currentYear}-${currentMonth}`, average])
      }

      // 새로운 달을 시작합니다.
      currentYear = year
      currentMonth = month
      sum = dealAmount
      count = 1
    } else {
      sum += dealAmount
      count++
    }
  })

  // 마지막 달 처리
  if (count > 0) {
    const average = Math.round(sum / count)
    monthlyAveragePrices.push([`${currentYear}-${currentMonth}`, average])
  }

  return monthlyAveragePrices
}

export { calculateMonthlyAverage }
