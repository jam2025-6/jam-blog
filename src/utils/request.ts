import axios, { type Method } from "axios";
interface RequestOptions {
  url: string;
  method?: Method;
  params?: any;
  data?: any;
  headers?: any;
}
// 基础配置
const baseURL = import.meta.env.VITE_API_BASE || "https://api.example.com";

const service = axios.create({
  baseURL,
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const data = response.data;
    // 按照你们的接口规范调整
    return data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// T 为返回的数据类型
export function request<T = any>(options: RequestOptions): Promise<T> {
  return service({
    url: options.url,
    method: options.method || "GET",
    params: options.params,
    data: options.data,
    headers: options.headers,
  });
}
