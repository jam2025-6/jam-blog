import { request } from "@/utils/request";
// 新增
export function addToolsType(data: { name: string; code: string; sort: number }) {
  return request({
    method: "POST",
    url: "/website/type",
    data,
  });
}
// 获取列表
export function getWebsiteTypeList() {
  return request({
    method: "GET",
    url: "/website/type",
  });
}
