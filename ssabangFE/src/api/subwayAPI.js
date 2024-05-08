import axiosClient from './axiosClient'

const getSubwayNear = async (lat, lng) => {
  try {
    const response = await axiosClient.get(`/subway/subwayNear?lat=${lat}&lng=${lng}`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

const getSubwayInRange = async (lat, lng) => {
  try {
    const response = await axiosClient.get(`/subway/subwayInRange?lat=${lat}&lng=${lng}&distance=1000`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

export { getSubwayInRange, getSubwayNear }
