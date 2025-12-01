import axios, { type Method } from "axios";

interface RequestOptions {
  url: string;
  method?: Method;
  params?: any;
  data?: any;
  headers?: any;
  baseURL?: string; // 可选，自定义 baseURL
}

// 基础配置 - 后端服务地址
const baseURL = 'http://localhost:3000';

const service = axios.create({
  baseURL,
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use((config) => {
  // 设置请求头
  config.headers["Content-Type"] = "application/json";
  return config;
});

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 直接返回响应数据，后端返回的数据结构已经是前端需要的格式
    return Promise.resolve(response.data);
  },
  (error) => {
    const { message } = error;
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

// T 为返回的数据类型
export function request<T = any>(options: RequestOptions): Promise<T> {
  const mergedHeaders = {
    ...service.defaults.headers.common,
    ...(options.headers || {}),
  };
  return service({
    url: options.url,
    method: (options.method || "GET").toUpperCase() as Method,
    params: options.params,
    data: options.data,
    headers: mergedHeaders,
    baseURL: options.baseURL || service.defaults.baseURL, // ✅ 只作用于当前请求
  }).then((res) => res as T);
}
