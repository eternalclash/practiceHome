import axios from 'axios'
const API_URL = 'http://localhost:8080/api'

const getSubwayMarker = async () => {
  try {
    const response = await axios.get(`${API_URL}/subway/subwayAll`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

const findSubwayNear = async (lat, lng) => {
  try {
    const response = await axios.get(`${API_URL}/subway/subwayInRange?lat=${lat}&lng=${lng}&distance=2000`)
    console.log(response.data.result)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

export { getSubwayMarker,findSubwayNear }
