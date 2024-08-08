import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routes'

// 創建路由器
const router = createRouter({
    history: createWebHistory(), // 路由器工作模式
    routes: constantRoute,
    // 滾動行爲
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})

export default router