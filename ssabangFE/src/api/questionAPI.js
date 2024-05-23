import axiosClient from './axiosClient'
import { takeException } from './exception'
const getQuestionId = async (questionId) => {
  try {
    const response = await axiosClient.get(`/boards/questions/${questionId}`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    throw error
  }
}

const getAnswerId = async (questionId) => {
  try {
    const response = await axiosClient.get(`/boards/answers/${questionId}`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    throw error
  }
}

const deleteQuestionId = async (questionId) => {
  try {
    await axiosClient.delete(`/boards/questions/${questionId}`)
  } catch (error) {
    console.error('Error fetching deals:', error)
    throw error
  }
}

const getQuestionAll = async () => {
  try {
    const response = await axiosClient.get(`/boards/questions/all`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)
    throw error
  }
}

const postQuestionNew = async (data) => {
  try {
    await axiosClient.post(`/boards/questions/new`,data)
  } catch (error) {
    console.error('Error fetching deals:', error)
    takeException()
    throw error
  }
}

export { getQuestionAll, getQuestionId, deleteQuestionId, postQuestionNew, getAnswerId }
