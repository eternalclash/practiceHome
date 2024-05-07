import axios from 'axios'
const API_URL = 'http://ec2-15-164-49-137.ap-northeast-2.compute.amazonaws.com:8080/api'

const getSchoolNear = async (lat, lng) => {
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
    const response = await axios.get(
      `${API_URL}/school/schoolInRange?lat=${lat}&lng=${lng}&distance=1000`
    )
    console.log(response.data.result)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

export { getSchoolInRange, getSchoolNear }
