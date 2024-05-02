import axios from 'axios'
const API_URL = 'http://localhost:8080/api'

const searchKeyword = async (apartmentName) => {
  try {
    console.log(apartmentName)
    const response = await axios.get(
      `${API_URL}/search-keywords?input=${encodeURIComponent(apartmentName)}`
    )
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}
const getApartmentData = async (aptcode) => {
  try {
    console.log(aptcode)
    const response = await axios.get(
      `${API_URL}/house-deals/apartment?apt-code=${aptcode}&sort-option=DESC`
    )
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

export { searchKeyword, getApartmentData } // 명시적으로 내보내기
