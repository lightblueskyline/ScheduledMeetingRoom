import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index' // 路由
import pinia from './store/index' // 狀態管理

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
