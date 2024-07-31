import axios from "axios";

let axiosInstance = axios.create({
    baseURL: 'https://localhost:7292/api/',
    timeout: 10000,
    // headers: { 'Content-Type': 'application/json' }
});
// 添加：請求 & 響應 攔截器
axiosInstance.interceptors.request.use((config) => {
    debugger
    // 返回配置對象
    return config;
});
// 配置響應攔截器
axiosInstance.interceptors.response.use((response) => {
    debugger
    // 成功的回調
    return response.data;
}, (error) => {
    debugger
    // 失敗的回調：處理 HTTP 網絡錯誤
    console.log(error);
});
// 對外暴露
export default axiosInstance;