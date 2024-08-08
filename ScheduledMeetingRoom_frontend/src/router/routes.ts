import { RouteRecordRaw } from 'vue-router'

// 暴露常量路由
export const constantRoute: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login', // 命名路由：以便權限管理
        component: () => import('../views/login/Login.vue')
    }, // 登錄畫面
    {
        path: '/',
        name: 'Welcome',
        component: () => import('../views/home/Weclome.vue')
    }, // 歡迎畫面
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/home/Index.vue')
    }, // 主頁
    {
        path: '/404',
        name: 'Page404',
        component: () => import('../views/404/Index.vue')
    }, // 404 畫面
    {
        // 未匹配時的任意路由
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'AnyView'
    }, // 未匹配，跳轉至 404 畫面
]