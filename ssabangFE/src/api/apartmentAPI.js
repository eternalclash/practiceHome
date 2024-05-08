import axiosClient from './axiosClient'
import { takeException } from './exception'

const searchKeyword = async (apartmentName) => {
  try {
    const response = await axiosClient.get(
      `/search-keywords?input=${encodeURIComponent(apartmentName)}`
    )
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}
const getApartmentData = async (aptcode) => {
  try {
    const response = await axiosClient.get(
      // `${API_URL}/house-deals/apartment?apt-code=${aptcode}&sort-option=DESC`
      `/house-deals?apartment-name=${aptcode}&sort-option=DESC`
    )
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

const getDongData = async (dongName) => {
  try {
    const response = await axiosClient.get(`/house-deals/dongName?dongName=${dongName}&`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

const getApartmentMarker = async (lat, lng) => {
  try {
    const response = await axiosClient.get(
      `/house-deals/near?latitude=${lat}&longitude=${lng}&distance=1000`
    )
    return response.data.result
  } catch (error) {
    takeException()
    console.error('Error fetching deals:', error)
    return []
  }
}

const getDongMarker = async () => {
  try {
    const response = await axiosClient.get(`/location-deal/dong`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

const getGuMarker = async () => {
  try {
    const response = await axiosClient.get(`/location-deal/gu`)
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
