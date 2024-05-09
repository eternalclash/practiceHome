import axiosClient from './axiosClient'
const getDongPeriod = async (dongName, startDate, endDate) => {
  try {
    const response = await axiosClient.get(
      `/house-deals/dong/period?dongName=${dongName}&startDate=${startDate}&endDate=${endDate}`
    )
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)

    throw error
  }
}

const getDongName = async (guCode) => {
  try {
    const response = await axiosClient.get(`/search-keywords/dong?guCode=${guCode}`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)

    throw error
  }
}

const getGuPeriod = async (dongName, startDate, endDate) => {
  try {
    const response = await axiosClient.get(
      `/house-deals/gu/period?guName=${dongName}&startDate=${startDate}&endDate=${endDate}`
    )
    return response.data.result
  } catch (error) {
    console.error('Error fetching deals:', error)

    throw error
  }
}

export { getDongPeriod, getDongName, getGuPeriod }
