import { defineStore } from 'pinia'
import { LoginRequest } from '../../types/auth' // 引入數據類型
import axiosInstance from "../../utils/axiosApiClient"

// 選項式寫法
export const useUserStore = defineStore('user', {
    // 類似：數據
    state: () => ({
        token: localStorage.getItem('jwtToken')
    }),
    // 類似：方法
    actions: {
        async userLogin(loginRequest: LoginRequest) {
            let tempToken: string = ''
            // axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'; // 可使用
            await axiosInstance.post("/Account/login",
                JSON.stringify(loginRequest), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                if (response.status === 200) {
                    let { token } = response.data
                    tempToken = token
                    // Store the JWT token in localStorage
                    localStorage.setItem('jwtToken', token);
                    // 返回成功的 promise
                    return 'OK'
                } else {
                    return Promise.reject(new Error(response.status.toString()))
                }
            }).catch(function (error) {
                return Promise.reject(new Error(error))
            });
            this.token = tempToken
        }
    },
    // 類似：計算屬性
    getters: {}
})