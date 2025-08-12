import { request } from "@/utils/request";
import type { Hots } from "./index.d";

// 百度热点热榜API
export function getBaiduHots(): Promise<{ data: Hots[] }> {
  return request({
    method: "GET",
    url: "/hotSearch/baiduRD",
  });
}
// 今日头条
export function getTouHots(): Promise<{ data: Hots[] }> {
  return request({
    method: "GET",
    url: "/hotSearch/toutiao",
  });
}
// 微博
export function getWeiBoHots(): Promise<{ data: Hots[] }> {
  return request({
    method: "GET",
    url: "/hotSearch/weibo",
  });
}
// 哔哩哔哩
export function getBiliHots(): Promise<{ data: Hots[] }> {
  return request({
    method: "GET",
    url: "/hotSearch/bili",
  });
}
