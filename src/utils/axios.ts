import axios,{AxiosInstance,InternalAxiosRequestConfig,AxiosError,AxiosResponse} from "axios";
import { ElNotification } from 'element-plus'

const service:AxiosInstance = axios.create({
    baseURL:"https://www.demo.com", //后面会替换成环境变量
    timeout:5000,
})

// 请求拦截器
service.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
    
    return config
},(error:AxiosError)=>{
    ElNotification({
        title:"Error",
        message:error.message,
        type:"error"
    })
    return Promise.reject(error)
})

// 相应拦截器
service.interceptors.response.use((response:AxiosResponse)=>{
    console.log('拦截器',response)
    return response.data
},(error:AxiosError)=>{
    ElNotification({
        title:"Error",
        message:error.message,
        type:"error"
    })
    return Promise.reject(error)
})

export default service;