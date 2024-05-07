import axios from 'axios'
const API_URL = 'http://localhost:8080/api'

const getSchoolNear = async (lat,lng) => {
  try {
    const response = await axios.get(`${API_URL}/school/schoolNear?lat=${lat}&lng=${lng}`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

const getSchoolInRange = async (lat, lng) => {
  try {
    const response = await axios.get(`${API_URL}/school/schoolInRange?lat=${lat}&lng=${lng}&distance=1000`)
    console.log(response.data.result)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

export { getSchoolInRange,getSchoolNear}
