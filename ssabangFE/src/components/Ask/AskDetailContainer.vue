<template>
  <div
    style="
      display: flex;
      align-items: center;
      width: 100vw;
      height: 80vh;
      flex-direction: column;
      justify-content: center;
    "
  >
    <div style="width: 80%; background-color: lightblue; border-radius: 5px">
      <h2>제목: {{ post.title }}</h2>
      <p>내용: {{ post.content }}</p>
      <!-- <p>글쓴이: {{ post.userId }}</p> -->
    </div>

    <div
      v-if="answer.length > 0"
      style="margin-top: 3vh; width: 80%; border: 1px solid lightblue; border-radius: 5px"
    >
      CHAT GPT 답변
      <p>{{ answer[0].content }}</p>
    </div>
    <div
      style="
        margin-top: 3vh;
        background-color: blue;
        color: white;
        width: 80%;
        border: 1px solid lightblue;
        border-radius: 5px;
        cursor: pointer;
      "
      @click="goBack()"
    >
      뒤로돌아가기
    </div>
  </div>
</template>

<script>
import { getQuestionId, getAnswerId } from '@/api/questionAPI'
import { useRoute } from 'vue-router'

export default {
  data() {
    return {
      post: {},
      answer: []
    }
  },
  async mounted() {
    const route = useRoute()
    const postId = route.params.id
    await this.fetchPost(postId)
    await this.fetchGet(postId)
  },
  methods: {
    async fetchPost(id) {
      try {
        this.post = await getQuestionId(id)
      } catch (error) {
        console.error('Error fetching post:', error)
      }
    },
    async fetchGet(id) {
      try {
        this.answer = await getAnswerId(id)
        console.log(this.answer[0])
      } catch (error) {
        console.log(error)
      }
    },
    goBack() {
      this.$router.push({ name: 'AskContainer' })
    }
  }
}
</script>

<style scoped>
/* Add styles if necessary */
</style>
