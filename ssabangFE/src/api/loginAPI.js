import axiosClient from './axiosClient'
const postSignup = async (data) => {
  try {
    const response = await axiosClient.post(`/members/new`, data, {
      withCredentials: true
    })
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    throw error
  }
}

const postLogin = async (data) => {
  try {
    const response = await axiosClient.post('/members/login', data)
    const token = response.headers['access']
    if (token) {
      localStorage.setItem('access', token)
    }
    return response.data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

const postLogout = async () => {
  try {
    await axiosClient.post(`/members/logout`)
  } catch (error) {
    console.error('Error fetching deals:', error)
    throw error
  }
}

export { postSignup, postLogin, postLogout }
