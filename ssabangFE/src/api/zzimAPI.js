import axiosClient from './axiosClient'
import { takeException } from './exception'
const getZzim = async () => {
  try {
    const response = await axiosClient.get(`/memberhouses`)
    return response.data.result
  } catch (error) {
    return []
  }
}

const postZzim = async (buildingName, dongName) => {
  try {
    const response = await axiosClient.post(
      `/memberhouses?buildingName=${buildingName}&dongName=${dongName}`
    )
    console.log(response.data)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    takeException()
    throw error
  }
}

export { postZzim, getZzim }
