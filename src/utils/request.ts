import axios, { type Method } from "axios";
import { getToken } from "@/utils/auth";
import i18n from "@/i18n/index";
import { ElMessage, ElMessageBox } from "element-plus";
const { t } = i18n.global
interface RequestOptions {
  url: string;
  method?: Method;
  params?: any;
  data?: any;
  headers?: any;
  baseURL?: string; // 可选，自定义 baseURL
}
// 基础配置
const baseURL = import.meta.env.VITE_API_BASE || "https://ess-ds.com/";

const service = axios.create({
  baseURL,
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use((config) => {
  // 将 token 加入请求头
  config.headers["Authorization"] = "Bearer " + getToken();
  config.headers["lang"] = i18n.global.locale.value;
  config.headers["zone"] = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (import.meta.env.VITE_APP_ENV === "development") {
    config.headers["companycode"] = "gold";
    config.headers["userid"] = 1;
  }
  return config;
});

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const code = response.data.code;
    if (code === 200) {
      return Promise.resolve(response);
    } else if (code === 401) {
      ElMessageBox.confirm(t('message.sessionExpired'), t('message.systemNotification'), {
        confirmButtonText: t('message.confirm'),
        cancelButtonText: t('message.cancel'),
        type: 'warning'
      }).then(() => {
        location.href = '/'
      }).catch(() => { })
      // 保证返回一个 Promise<never>，让 TS 类型匹配
      return Promise.reject(new Error('Unauthorized'));
    } else {
      return Promise.reject(new Error(response.data.message || "Error"));
    }
  },
  (error) => {
    const { message } = error;
    ElMessage({ message: message, type: "error", duration: 5 * 1000 });
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
  }).then((res) => res.data as T);
}
