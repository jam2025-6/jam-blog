import { request } from "@/utils/request";
import {
  listParams,
  Microgrid,
  MicrogridBigScreenConfig
} from "@/types/home";
import { ApiResponse, PageResponse } from "@/types/api";

//列表查询
export function getMicrogridList(params: listParams): Promise<ApiResponse<PageResponse<Microgrid>>> {
  return request({
    method: "GET",
    url: "/microgrid/list",
    params,
  });
}


//列表查询
export function getMicrogridBigScreenName(): Promise<ApiResponse<MicrogridBigScreenConfig>> {
  return request({
    method: "GET",
    url: "/microgrid/getMicrogridBigScreenName",
  });
}
