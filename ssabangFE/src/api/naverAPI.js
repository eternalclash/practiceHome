import axiosClient from './axiosClient'
const getNews = async (keyword = "서울") => {
  try {
    const response = await axiosClient.get(`/navernews/real-estate-news?query=${keyword}`)
    console.log("response"+ response.data[0])
    return response.data
  } catch (error) {
    console.error('Error fetching deals:', error)
    throw error
  }
}

export {getNews}