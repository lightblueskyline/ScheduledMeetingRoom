import { defineStore } from 'pinia'
import type { LoginForm, LoginResponse } from '../../api/user/type'
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
            await requestLogin(loginForm).then((response) => {
                let tempResponse: LoginResponse = response
                this.token = tempResponse.token
                localStorage.setItem('jwtToken', tempResponse.token)
                return 'OK'
            }).catch((error) => {
                return Promise.reject(error)
            })
        }
    },
    // 類似：計算屬性
    getters: {}
})