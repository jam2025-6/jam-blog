import { request } from "@/utils/request";
interface Tools {
  name: string;
  files: never[];
  typeCode: string;
  url: string;
  brief: string;
  logoUrl: string;
  sort: number;
}
//
export function getToolsGrouped() {
  return request({
    method: "GET",
    url: "/website/grouped",
  });
}
export function addNewTools(data: Tools) {
  return request({
    method: "POST",
    url: "/website",
    data,
  });
}
