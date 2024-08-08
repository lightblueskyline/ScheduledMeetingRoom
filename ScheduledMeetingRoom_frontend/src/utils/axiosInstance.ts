// 對 axios 進行二次封裝
import axios from 'axios'
import { ElMessage } from 'element-plus'

let axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 6000
})
// 請求攔截器
axiosInstance.interceptors.request.use((config) => {
    // 返回配置對象
    return config
})
// 響應攔截器
axiosInstance.interceptors.response.use((response) => {
    debugger
    return response
}, (error) => {
    debugger
    // 處理 HTTP 網絡錯誤
    let msg = ''
    let status = error.response.status
    switch (status) {
        case 401:
            // msg = 'Token 過期'
            msg = error.response.data.result
            break;
        case 403:
            msg = '無權訪問'
            break;
        case 404:
            msg = '請求地址錯誤'
            break;
        case 500:
            msg = '服務器故障'
            break;
        default:
            msg = '網絡故障'
            break;
    }
    // 提示錯誤信息
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(new Error(error.response.status))
})

export default axiosInstance