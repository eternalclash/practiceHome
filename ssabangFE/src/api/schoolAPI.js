import axiosClient from './axiosClient'

const getSchoolNear = async (lat, lng) => {
  try {
    const response = await axiosClient.get(`/school/schoolNear?lat=${lat}&lng=${lng}`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

const getSchoolInRange = async (lat, lng) => {
  try {
    const response = await axiosClient.get(
      `/school/schoolInRange?lat=${lat}&lng=${lng}&distance=1000`
    )
    console.log(response.data.result)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    return []
  }
}

export { getSchoolInRange, getSchoolNear }
