import axiosClient from './axiosClient'
const postSignup = async (data) => {
  try {
    const response = await axiosClient.post(`/members/new`, data, {
      withCredentials: true
    })
    console.log(response.data)
    if (response.data.statusCode == 400) throw new Error('Bad Request')
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)

    throw error
  }
}

const postLogin = async (data) => {
  try {
    const response = await axiosClient.post('/members/login', data)
    console.log(response.data)
    if (response.data.statusCode == 400) throw new Error('Bad Request')
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

const updatePassword =  async (data) => {
  try {
    await axiosClient.put('/members/password',data);

  } catch(error) {

  }
}



export { postSignup, postLogin, postLogout,updatePassword }
