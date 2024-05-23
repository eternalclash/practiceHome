<template>
  <div class="login-container">
    <div class="input-container">
      <div class="logo-group">
        <div class="logo"></div>
      </div>

      <div style="display: flex; margin-bottom: 3vh">
        <input v-model="email" type="text" placeholder="이메일" required style="width: 30vw" />
        <button class="login-button" @click="handleEmailSend">이메일 전송</button>
      </div>
      <div style="display: flex">
        <input v-model="code" type="text" placeholder="인증번호" required style="width: 30vw" />
        <button class="login-button" @click="handleCodeVerify">인증번호 확인</button>
      </div>
    </div>
  </div>
</template>

<script>
import { postEmail, postVerify } from '@/api/emailAPI'

export default {
  data() {
    return {
      email: '',
      code: ''
    }
  },
  methods: {
    async handleEmailSend() {
      try {
        const response = await postEmail({ email: this.email })
        alert('인증번호를 확인해주세요')
      } catch (error) {
        console.error('Error sending email:', error)
        alert('이메일 전송에 실패했습니다.')
      }
    },
    async handleCodeVerify() {
      try {
        const response = await postVerify({ email: this.email, code: this.code })
        alert('인증번호가 확인되었습니다.')
        this.$router.push({ name: 'ModifyPasswordContainer' }) // 인증 성공 시 페이지 이동
      } catch (error) {
        console.error('Error verifying code:', error)
        alert('인증번호 확인에 실패했습니다.')
      }
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
  width: 10vw;
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
