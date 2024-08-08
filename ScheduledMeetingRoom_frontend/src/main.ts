import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index' // 路由
import pinia from './store/index' // 狀態管理
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn' // 配置 Element Plus 國際化
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // Register All Icons globally
import './styles/index.scss' // 引入全局樣式

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 注冊模板路由
app.use(router)
app.use(pinia)
app.use(ElementPlus, {
    locale: zhCn,
})

// 打印當前環境變量内容
console.log(import.meta.env)

app.mount('#app')
