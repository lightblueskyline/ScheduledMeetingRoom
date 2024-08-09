// 對 Axios 進行二次封裝
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 創建 Axios 實例
let axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 6000
})

// 請求攔截器
axiosInstance.interceptors.request.use((config) => {
    // Do something before request is sent
    // 返回配置對象
    return config
}, (error) => {
    // Do something with request error
    return Promise.reject(error)
})

// 響應攔截器
axiosInstance.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
}, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
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
        message: `${status}-${msg}`
    })
    return Promise.reject(error)
})

export default axiosInstance