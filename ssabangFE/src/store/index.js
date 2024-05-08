import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      isLoggedIn: !!localStorage.getItem('userToken') // 로컬 스토리지 토큰 유무로 로그인 상태 초기화
    }
  },
  mutations: {
    setLoginState(state, status) {
      state.isLoggedIn = status
    }
  },
  actions: {
    performLogin({ commit }) {
      localStorage.setItem('userToken', 'your-token-here') // 예시 토큰 저장
      commit('setLoginState', true)
    },
    logout({ commit }) {
      localStorage.removeItem('userToken')
      commit('setLoginState', false)
    }
  }
})
