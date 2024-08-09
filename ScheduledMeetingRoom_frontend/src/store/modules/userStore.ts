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
                let tempResponse: LoginResponse = {
                    status: response.status,
                    responseData: {
                        message: response.data.message,
                        token: response.data.token,
                        user: response.data.user
                    }
                }
                this.token = (tempResponse.responseData?.token as string)
                // 本地存儲，存儲 TOKEN
                SET_TOKEN((tempResponse.responseData?.token as string))
                return 'OK'
            }).catch((error) => {
                let tempError: LoginResponse = {
                    status: error.response.status,
                    responseData: {
                        message: error.response.data.message
                    }
                }
                return Promise.reject(tempError)
            })
        }
    },
    // 類似：計算屬性
    getters: {}
})