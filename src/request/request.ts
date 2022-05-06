import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// 配置项
const axiosOptions = {
    baseURL: '/vie',
    timeout: 5000
}

const instance: AxiosInstance = axios.create(axiosOptions);

// 添加请求拦截
instance.interceptors.request.use(function(config: AxiosRequestConfig) {
    return config;
}, function(error) {
    return Promise.reject(error);
});

// 添加响应拦截
instance.interceptors.response.use(function(response: AxiosResponse<any>): any {
    if(response.status === 200) {
        const { code, msg = '' } = response.data;
        if(code === 1) {
            return response.data;
        } else if(msg){
            alert(msg);
            return null;
        } else {
            console.error(response.data);
            return null;
        }
    } else {
        console.error(response);
        return null;
    }
}, function(error) {
    return Promise.reject(error);
});

export default instance;