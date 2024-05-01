function formatToKoreanCurrency(value) {
  const billion = Math.floor(value / 100000000)
  const million = Math.floor((value % 100000000) / 10000)

  let formatted = ''
  if (billion > 0) formatted += `${billion}억 `
  if (million > 0 || billion > 0) formatted += `${million}만원`
  if (formatted === '') formatted = '0원'

  return formatted
}
function parseDate(dateStr) {
  // 날짜 형식 "YYYY. M. D"를 "YYYY-MM-DD"로 변경
  const parts = dateStr.split('.').map((part) => part.trim()) // 공백 제거 및 분할
  if (parts[1].length === 1) parts[1] = '0' + parts[1] // 월을 두 자리 숫자로 변환
  if (parts[2].length === 1) parts[2] = '0' + parts[2] // 일을 두 자리 숫자로 변환
  const formattedDate = `${parts[0]}-${parts[1]}-${parts[2]}`

  return new Date(formattedDate)
}

export { formatToKoreanCurrency, parseDate } // 명시적으로 내보내기
