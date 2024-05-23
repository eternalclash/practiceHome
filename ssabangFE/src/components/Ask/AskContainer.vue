<template>
  <div>
    <div style="display: flex; width: 100vw; justify-content: flex-end">
      <div
        style="
          margin-right: 3vw;
          background-color: lightblue;
          cursor: pointer;
          width: 10vw;
          height: 5vh;
          display: flex;
          justify-content: center;
          align-items: center;
        "
        @click="goInput()"
      >
        Q&A작성하기
      </div>
    </div>
    <div v-for="post in posts" :key="post.id" class="post" @click="goToPostDetail(post.id)">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
      <!-- <p>Posted by: {{ post.userId }}</p> -->
    </div>
  </div>
</template>

<script>
import { getQuestionAll, getQuestionId, deleteQuestionId, postQuestionNew } from '@/api/questionAPI'
import { useRouter } from 'vue-router'
export default {
  data() {
    return {
      posts: []
    }
  },
  async mounted() {
    this.fetchPosts()
    console.log(this.posts)
  },
  methods: {
    async fetchPosts() {
      this.posts = await getQuestionAll()
    },
    goToPostDetail(postId) {
      this.$router.push({ name: 'AskDetailContainer', params: { id: postId } })
    },
    goInput() {
      this.$router.push({ name: 'AskInputContainer' })
    }
  }
}
</script>

<style scoped>
.post {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px 0;
  cursor: pointer;
}
</style>
