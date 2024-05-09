// axiosClient.js
import axios from 'axios'
import { takeException } from './exception'

// Axios 인스턴스 생성
const axiosClient = axios.create({
  // baseURL: 'http://ec2-43-200-173-75.ap-northeast-2.compute.amazonaws.com:8080/api'
  baseURL: 'http://localhost:8080/api'
})

// 요청 인터셉터 추가
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access')
    if (token) {
      config.headers['access'] = token // 'access'는 서버가 요구하는 헤더 키
    }
    return config
  },
  (error) => {
    takeException();
    return Promise.reject(error)
  }
)

export default axiosClient
