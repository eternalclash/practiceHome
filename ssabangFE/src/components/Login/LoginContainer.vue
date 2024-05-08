<template>
  <div class="login-container">
    <div class="input-container">
      <div class="logo-group">
        <div class="logo"></div>
      </div>
      <div class="input-group">
        <input v-model="username" type="text" placeholder="아이디" required />
      </div>
      <div class="input-group">
        <input v-model="password" type="password" placeholder="비밀번호" required />
      </div>
      <button class="login-button" @click="login">로그인</button>
      <button class="signup-button" @click="goToSignUp">회원가입</button>
    </div>
  </div>
</template>

<script>
import { postLogin } from '@/api/loginAPI'

export default {
  name: 'LoginContainer',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const userData = {
          email: this.username,
          password: this.password
        }
        await postLogin(userData)
        alert('로그인되었습니다')
        this.$router.push({ name: 'MainContainer' })
      } catch (error) {
        if (error.response) {
          alert('아이디 또는 비밀번호가 잘못되었습니다.')
        } else {
          alert('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
        }
      }
    },
    goToSignUp() {
      this.$router.push({ name: 'SignUpContainer' })
    }
  }
}
</script>

<style scoped>
.login-button,
.signup-button {
  width: 100%;
  height: 6vh;
  border-radius: 5px;
  border: none;
  color: white;
  box-shadow: 4px 4px 8px #aaa;
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 3%;
}

.login-button {
  background-color: #2462b9;
}

.signup-button {
  margin-top: 2vh;
  background-color: #484854;
}

.logo-group {
  display: flex;
  width: 100%;
  height: 20vh;
  justify-content: center;
}
.logo {
  width: 100%;
  height: auto;
  background-repeat: no-repeat;
  background-color: transparent;
  background-image: url('@/assets/SSABANG.svg');
  background-size: contain;
  background-position: center;
}
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90vh;
  position: relative;
  overflow: hidden;
}

.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cae5ff;
  opacity: 0.5;
}

.input-container {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 30%;

  padding: 3%;
  border-radius: 1%;
}

.button-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 10vh;
}
.login-container h2 {
  color: #333;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 3vh;
  width: 100%;
}

input[type='text'],
input[type='password'] {
  border: none;
  height: 5vh;
  width: 98%;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  padding-left: 2%;
}

button:hover {
  opacity: 0.5;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
