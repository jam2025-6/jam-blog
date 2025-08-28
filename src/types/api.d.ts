// 通用接口返回结构
export interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

// 通用分页响应结构
export interface PageResponse<T> {
  currPage: number; // 当前页
  pageSize: number; // 每页条数
  totalCount: number; // 总条数
  totalPage: number; // 总页数
  list: T[]; // 数据列表
}

// 定义支持的语言类型枚举，限制只能是中文或英文
export type LangType = "zh-CN" | "en-US";
