import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store  from './store' 

const app = createApp(App)

app.use(router)
app.use(store) // Vuex 스토어를 애플리케이션에 연결

app.mount('#app')
