import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { constantRoute } from './routes'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login', // 命名路由：以便權限管理
        component: () => import('../components/Login.vue')
    },
    {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('../views/Weclome.vue')
    },
    {
        // 未匹配時的任意路由
        path: '/:pathMatch(.*)*',
        redirect: '/welcome',
        name: 'AnyView'
    }
];

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