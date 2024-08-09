import { defineStore } from 'pinia'
import type { LoginForm, LoginResponse } from '../../api/user/type'
import { requestLogin } from '../../api/user/index'
import type { UserStoreState } from './type'
// 引入操作本地存儲的工具方法
import { SET_TOKEN, GET_TOKEN } from '../../utils/jwtToken'

// 選項式寫法
export const useUserStore = defineStore('user', {
    // 類似：數據
    state: (): UserStoreState => ({
        token: GET_TOKEN()
    }),
    // 類似：方法
    actions: {
        async userLogin(loginForm: LoginForm) {
            await requestLogin(loginForm).then((response) => {
                let tempResponse: LoginResponse = response
                this.token = (tempResponse.token as string)
                // 本地存儲，存儲 TOKEN
                SET_TOKEN((tempResponse.token as string))
                return 'OK'
            }).catch((error) => {
                return Promise.reject(error)
            })
        }
    },
    // 類似：計算屬性
    getters: {}
})