import axiosClient from './axiosClient'
import { takeException } from './exception'
const getZzim = async () => {
  try {
    const response = await axiosClient.get(`/memberhouses`)
    return response.data.result
  } catch (error) {
    takeException()
    return []
  }
}

const postZzim = async (buildingName) => {
  try {
    const response = await axiosClient.post(`/memberhouses?buildingName=${buildingName}`)
    console.log(response.data)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    throw error
  }
}

export { postZzim, getZzim }
