import axiosClient from './axiosClient'

const postEmail = async (data) => {
  try {
    await axiosClient.post(`/emails/code`, data)
  } catch (error) {}
}

const postVerify = async (data) => {
  try {
    await axiosClient.post(`/emails/code/verify`, data)
  } catch (error) {
    console.error('Error fetching deals:', error)
    throw error
  }
}

export { postEmail, postVerify }
