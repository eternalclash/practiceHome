<template>
  <header class="header-group">
    <img :src="logoSrc" alt="Logo" class="header-logo" />
    <div @click="goRealEstate">서울시 최근거래가</div>
    <button class="login-button" @click="login">로그인</button>
  </header>
  <router-view />
</template>ㅋ

<script>
// 이미지를 import 문을 사용하여 불러옵니다.
import logoSrc from '@/assets/SSABANG.svg'
export default {
  name: 'App',
  data() {
    return {
      logoSrc // ES6 shorthand property
    }
  },
  methods: {
    login() {
      // 회원가입 로직을 여기에 추가
      this.$router.push({ name: 'LoginContainer' })
    },
    goRealEstate() {
      this.$router.push({ name: 'RealEstateList' })
    }
  }
}
</script>

<style scoped>
header {
  overflow: hidden;
}
.login-button {
  width: 5vw;
  height: 5vh;
  border-radius: 5px;
  border: none;
  color: white;
  background-color: #6366f1;
  box-shadow: 4px 4px 8px #aaa;
  cursor: pointer;
  transition: background-color 0.3s;
  outline: none;
  margin-right: 2vw;
}
.header-group {
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button:hover {
  opacity: 0.5;
  background-color: rgba(0, 0, 0, 0.3); /* 검정색 투명 레이어 */
}
.header-logo {
}
</style>
