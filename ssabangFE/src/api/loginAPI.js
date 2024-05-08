import axios from 'axios'
// const API_URL = 'http://ec2-15-164-49-137.ap-northeast-2.compute.amazonaws.com:8080/api'
const API_URL = 'http://localhost:8080/api'

const postSignup = async (data ) => {
  try {
    const response = await axios.post(`${API_URL}/members/new`, data)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    throw error
  }
}

const postLogin = async ( data ) => {
  try {
    await axios.post(`${API_URL}/members/login`, data)
  } catch (error) {
    console.error('Error fetching deals:', error)
    throw error
  }
}

const postLogout = async (data) => {
  try {
    await axios.post(`${API_URL}/members/logout`, data)
  } catch (error) {
    console.error('Error fetching deals:', error)
    throw error
  }
}

export { postSignup, postLogin, postLogout }
