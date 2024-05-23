import { createRouter, createWebHistory } from 'vue-router'
import LoginContainer from '@/components/Login/LoginContainer.vue'
import SignUpContainer from '@/components/Login/SignUpContainer.vue'
import MainContainer from '@/components/Main/MainContainer.vue'
import RealEstateList from '@/components/Main/RealEstateList.vue'
import AskContainer from '@/components/Ask/AskContainer.vue'
import AskDetailContainer from '@/components/Ask/AskDetailContainer.vue'
import AskInputContainer from '@/components/Ask/AskInputContainer.vue'
import ModifyPasswordContainer from '@/components/Login/ModifyPasswordContainer.vue'
import PasswordContainer from '@/components/Login/PasswordContainer.vue'

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
  },
  {
    path: '/realestate',
    name: 'RealEstateList',
    component: RealEstateList
  },
  {
    path: '/ask',
    name: 'AskContainer',
    component: AskContainer
  },
  {
    path: `/ask/:id`,
    name: 'AskDetailContainer',
    component: AskDetailContainer
  },
  {
    path: `/askinput`,
    name: 'AskInputContainer',
    component: AskInputContainer
  },
  {
    path: `/passwordcheck`,
    name: 'PasswordContainer',
    component: PasswordContainer
  },
  {
    path: `/passwordmodify`,
    name: 'ModifyPasswordContainer',
    component: ModifyPasswordContainer
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
