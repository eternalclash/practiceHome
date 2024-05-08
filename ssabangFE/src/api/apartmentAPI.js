import axios from 'axios'
// const API_URL = 'http://ec2-15-164-49-137.ap-northeast-2.compute.amazonaws.com:8080/api'
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
      // `${API_URL}/house-deals/apartment?apt-code=${aptcode}&sort-option=DESC`
      `${API_URL}/house-deals?apartment-name=${aptcode}&sort-option=DESC`
    )
    console.log(response.data.result)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

const getDongData = async (dongName) => {
  try {
    const response = await axios.get(`${API_URL}/house-deals/dongName?dongName=${dongName}&`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

const getApartmentMarker = async (lat, lng) => {
  try {
    const response = await axios.get(
      `${API_URL}/house-deals/near?latitude=${lat}&longitude=${lng}&distance=1000`
    )
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

const getDongMarker = async () => {
  try {
    const response = await axios.get(`${API_URL}/location-deal/dong`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

const getGuMarker = async () => {
  try {
    const response = await axios.get(`${API_URL}/location-deal/gu`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

export {
  searchKeyword,
  getApartmentData,
  getDongMarker,
  getGuMarker,
  getApartmentMarker,
  getDongData
} // 명시적으로 내보내기
