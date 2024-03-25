import axios from 'axios';

// 创建一个 Axios 实例
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // 设置请求的基础 URL
    timeout: 5000 // 设置请求超时时间
});

// 请求拦截器
api.interceptors.request.use(
    config => {
        // 在发送请求之前做些处理，例如添加请求头等
        // config.headers['Authorization'] = 'Bearer ' + getToken();
        return config;
    },
    error => {
        // 处理请求错误
        console.error(error);
        return Promise.reject(error);
    }
);

// 响应拦截器
api.interceptors.response.use(
    response => {
        // 对响应数据做些处理，例如解析返回的数据等
        return response.data;
    },
    error => {
        // 处理响应错误
        console.error(error);
        return Promise.reject(error);
    }
);

export default api;
