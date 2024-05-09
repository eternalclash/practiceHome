<template>
  <header class="header-group">
    <div style="display: flex; align-items: center;">
      <img :src="logoSrc" @click="goHome" alt="Logo" class="header-logo hover" />
      <div @click="goRealEstate" class="realEstate hover">서울시 최근거래가</div>
    </div>
    <button class="login-button hover" @click="handleAuth">{{ authButtonLabel }}</button>
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
    },
    goHome(){
      this.$router.push({ name: 'MainContainer' })
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
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
header {
  overflow: hidden;
}
.login-button {
  width: 5vw;
  height: 5.5vh;
  border-radius: 5px;
  border: none;
  color: white;
  background-color: #38b6ff;
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
.realEstate {
  border-radius: 5px;
  height: 5vh;
  color: #38b6ff;
  font-weight: bold;
  border: 1px solid #38b6ff;
  margin-left: 20px;
  display: flex;
  align-items: center;
  padding: 0 1vw;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}
.header-logo {
}
.hover {
  cursor: pointer;
}
* {
  font-family: "Jua", sans-serif;
}
</style>
