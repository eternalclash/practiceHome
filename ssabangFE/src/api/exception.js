import router from '../router/index.js' // router 인스턴스를 가져옵니다.

export const takeException = () => {
  localStorage.removeItem('access')
  alert('토큰 유효기간이 지났습니다. 로그인 부탁드립니다.')
  router.replace({ name: 'LoginContainer' })
}
