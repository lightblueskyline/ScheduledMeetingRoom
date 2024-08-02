import { RouteRecordRaw } from 'vue-router'

// 暴露常量路由
export const constantRoute: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login', // 命名路由：以便權限管理
        component: () => import('../views/Login.vue')
    },
    {
        path: '/',
        name: 'Welcome',
        component: () => import('../views/Weclome.vue')
    },
    {
        // 未匹配時的任意路由
        path: '/:pathMatch(.*)*',
        redirect: '/welcome',
        name: 'AnyView'
    }
]