import axios from 'axios'
const API_URL = 'http://localhost:8080/api'

const getSubwayNear = async (lat,lng) => {
  try {
    const response = await axios.get(`${API_URL}/subway/subwayNear?lat=${lat}&lng=${lng}`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

const getSubwayInRange = async (lat, lng) => {
  try {
    const response = await axios.get(`${API_URL}/subway/subwayInRange?lat=${lat}&lng=${lng}&distance=1000`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

export { getSubwayInRange,getSubwayNear}
