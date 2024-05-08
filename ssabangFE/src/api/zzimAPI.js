import axios from 'axios'
// const API_URL = 'http://ec2-15-164-49-137.ap-northeast-2.compute.amazonaws.com:8080/api'
const API_URL = 'http://localhost:8080/api'

const getZzim = async () => {
  try {
    const response = await axios.get(`${API_URL}/memberhouses`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

const postZzim = async (buildingName) => {
  try {
    const response = await axios.post(
      `${API_URL}/memberhouses?buildingName=${buildingName}`
    )
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    throw error
  }
}

export { postZzim,getZzim }