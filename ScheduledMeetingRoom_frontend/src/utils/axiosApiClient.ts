import axios, { AxiosInstance } from "axios";

const axiosApiClient: AxiosInstance = axios.create({
    baseURL: 'https://localhost:7292/api',
    timeout: 10000,
    // headers: { 'Content-Type': 'application/json' }
})

// 對外暴露
export default axiosApiClient;