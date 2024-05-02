<template>
  <div class="login-container">
    <div class="input-container">
      <div class="logo-group">
        <div class="logo"></div>
      </div>
      <div class="input-group">
        <input type="text" placeholder="아이디" required />
      </div>
      <div class="input-group">
        <input type="password" placeholder="비밀번호" required />
      </div>
      <button class="login-button" @click="login">로그인</button>
      <button class="signup-button" @click="goToSignUp">회원가입</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginContainer',
  methods: {
    login() {
      // 로그인 로직을 여기에 추가
      this.$router.push({ name: 'MainContainer' })
    },
    goToSignUp() {
      this.$router.push({ name: 'SignUpContainer' })
    }
  }
}
</script>

<style scoped>
.login-button {
  width: 100%;
  height: 5vh;
  border-radius: 5px;
  border: none;
  color: white;
  background-color: #2462B9; /* 변경 */
  box-shadow: 4px 4px 8px #aaa;
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 3%;
}
.signup-button {
  margin-top: 2vh;
  width: 100%;
  border-radius: 5px;
  border: none;
  color: white;
  background-color: #484854; /* 변경 */
  box-shadow: 4px 4px 8px #aaa;
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 3%;
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
  background-repeat: no-repeat; /* 이미지 반복 없음 */
  background-color: transparent; /* 배경색 투명 설정 */
  background-image: url('@/assets/SSABANG.svg'); /* 배경 이미지 */
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
  background-color: #CAE5FF; /* 변경 */
  opacity: 0.5; /* 이미지의 투명도 (이미지를 보이게 하기 위해 적당한 투명도 선택) */
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
  background-color: rgba(0, 0, 0, 0.3); /* 검정색 투명 레이어 */
}
</style>
