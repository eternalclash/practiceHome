
import axiosClient from './axiosClient'
const getZzim = async () => {
  try {
    const response = await axiosClient.get(`/memberhouses`)
    return response.data.result
  } catch (error) {
    return []
  }
}

const postZzim = async (buildingName) => {
  try {
    const response = await axiosClient.post(`/memberhouses?buildingName=${buildingName}`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    throw error
  }
}

export { postZzim, getZzim }
