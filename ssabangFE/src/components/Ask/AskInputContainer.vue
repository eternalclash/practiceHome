<template>
  <div
    style="
      width: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 80vh;
    "
  >
    <div style="font-size: 2rem">질문제목</div>
    <input v-model="title" class="text" placeholder="제목을 입력하세요" />
    <div style="font-size: 2rem; margin-top: 20px">질문내용</div>
    <textarea v-model="content" class="text" placeholder="내용을 입력하세요"></textarea>
    <div style="display: flex; width: 30vw; justify-content: space-between; margin-top: 20px">
      <div
        style="
          height: 5vh;
          background-color: lightblue;
          width: 10vw;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        "
        @click="handleConfirm"
      >
        확인
      </div>
      <div
        style="
          height: 5vh;
          background-color: red;
          width: 10vw;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        "
        @click="handleCancel"
      >
        취소
      </div>
    </div>
  </div>
</template>

<script>
import { getQuestionAll, getQuestionId, deleteQuestionId, postQuestionNew } from '@/api/questionAPI'
import { useRouter } from 'vue-router'
export default {
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    async handleConfirm() {
      const postData = {
        title: this.title,
        content: this.content
      }
      await postQuestionNew(postData) // 여기에 postData를 처리하는 로직 추가
      this.$router.push({ name: 'AskContainer' })
    },
    handleCancel() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.text {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px 0;
  width: 80vw;
  height: 5vh;
}
.textarea {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px 0;
  width: 80vw;
  height: 40vh;
}
</style>
