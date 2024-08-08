import { defineStore } from 'pinia'
import type { LoginForm } from '../../api/user/type'
import { requestLogin } from '../../api/user/index'

// 選項式寫法
export const useUserStore = defineStore('user', {
    // 類似：數據
    state: () => ({
        token: localStorage.getItem('jwtToken')
    }),
    // 類似：方法
    actions: {
        async userLogin(loginForm: LoginForm) {
            let tempToken: string = ''
            let tempResponse = await requestLogin(loginForm)
            if (tempResponse.token !== '') {
                tempToken = tempResponse.token
                return tempResponse
            } else {
                return Promise.reject(tempResponse.token)
            }
        }
    },
    // 類似：計算屬性
    getters: {}
})