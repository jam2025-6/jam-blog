import { request } from "@/utils/request";
// 搜索引擎
export function getEngineList() {
  return request({
    method: "GET",
    url: "/engine/list",
  });
}
