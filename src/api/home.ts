import { request } from "@/utils/request";
import { listParams } from "@/types/home.d";

//列表查询
export function getMicrogridList(params: listParams): Promise<{ data: any }> {
  return request({
    method: "GET",
    url: "/microgrid/list",
    params,
  });
}
