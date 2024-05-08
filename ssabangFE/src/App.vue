<template>
  <header class="header-group">
    <img :src="logoSrc" alt="Logo" class="header-logo" />
    <div @click="goRealEstate">서울시 최근거래가</div>
    <button class="login-button" @click="handleAuth">{{ authButtonLabel }}</button>
  </header>
  <router-view />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import logoSrc from '@/assets/SSABANG.svg'

export default {
  name: 'App',
  computed: {
    ...mapState(['isLoggedIn']),
    authButtonLabel() {
      return this.isLoggedIn ? '로그아웃' : '로그인'
    }
  },
  methods: {
    ...mapActions(['performLogin', 'logout']),
    handleAuth() {
      if (this.isLoggedIn) {
        this.logout().then(() => {
          this.$router.replace({ name: 'LoginContainer' })
        })
      } else {
        this.$router.push({ name: 'LoginContainer' })
      }
    },
    goRealEstate() {
      this.$router.push({ name: 'RealEstateList' })
    }
  },
  data() {
    return {
      logoSrc
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
  background-color: #38b6ff;
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
