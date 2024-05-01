import { createRouter, createWebHistory } from 'vue-router'
import LoginContainer from '@/components/Login/LoginContainer.vue'
import SignUpContainer from '@/components/Login/SignUpContainer.vue'
import MainContainer from '@/components/Main/MainContainer.vue'
const routes = [
  {
    path: '/',
    name: 'MainContainer',
    component: MainContainer
  },
  {
    path: '/login',
    name: 'LoginContainer',
    component: LoginContainer
  },
  {
    path: '/signup',
    name: 'SignUpContainer',
    component: SignUpContainer
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
