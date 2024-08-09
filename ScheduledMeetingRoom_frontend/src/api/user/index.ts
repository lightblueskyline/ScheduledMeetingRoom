// 統一管理用戶相關接口
import axiosInstance from "../../utils/axiosInstance";
import type { LoginForm, LoginResponse } from './type'

enum API {
    LOGIN_URL = '/Account/login',
    USER_INFO_URL = '',
}

// 暴漏請求函數
export const requestLogin = async (param: LoginForm) => axiosInstance.post<any, LoginResponse>(API.LOGIN_URL, param, {
    headers: { 'Content-Type': 'application/json' },
})

export const requestUserInfo = () => axiosInstance.get(API.USER_INFO_URL)