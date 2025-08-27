import { request } from "@/utils/request";
import { ApiResponse, PageResponse } from "@/types/api";
import { Microgrid } from "@/types/home";
import { AmountRecord, EnergyCurves } from "@/types/system";
//基本信息
export function getSearchById(id: string): Promise<ApiResponse<Microgrid>> {
  return request({
    method: "GET",
    url: "/microgrid/searchById/" + id,
  });
}

//用电情况分析
export function getCalcElectricity(id: string): Promise<ApiResponse<any>> {
  return request({
    method: "GET",
    url: "/microgrid/calcElectricity/" + id,
  });
}

//碳排放量曲线
export function getCalcCarbonEmissions(id: string): Promise<ApiResponse<AmountRecord[]>> {
  return request({
    method: "GET",
    url: "/microgrid/calcCarbonEmissions/" + id,
  });
}

//运行功率曲线
export function getPowerCurve(id: string): Promise<ApiResponse<EnergyCurves>> {
  return request({
    method: "GET",
    url: "/microgrid/powerCurve/" + id,
  });
}

//近7日收益对比
export function getCompareEarn(id: string): Promise<ApiResponse<any>> {
  return request({
    method: "GET",
    url: "/microgrid/compareEarn/" + id,
  });
}

//新能源社会效益
export function getSocialBenefitsNewEnergy(id: string): Promise<ApiResponse<any>> {
  return request({
    method: "GET",
    url: "/microgrid/socialBenefitsNewEnergy/" + id,
  });
}
