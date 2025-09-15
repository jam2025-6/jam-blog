import { request } from "@/utils/request";
import { ApiResponse } from "@/types/api";
import { Microgrid } from "@/types/home";
import { AmountRecord, EnergyCurves, PvStatistics, RealTimeData, StationInfo, EnergyData, EnergyStats, EnergyAndEarningsData, ForecastCurve, EarningsRecord } from "@/types/system";
//基本信息
export function getSearchById(id: string): Promise<ApiResponse<Microgrid>> {
  return request({
    method: "GET",
    url: "/microgrid/searchById/" + id,
  });
}

//用电情况分析
export function getCalcElectricity(id: string): Promise<ApiResponse<EnergyStats>> {
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
export function getCompareEarn(id: string): Promise<ApiResponse<EarningsRecord[]>> {
  return request({
    method: "GET",
    url: "/microgrid/compareEarn/" + id,
  });
}

//新能源社会效益
export function getSocialBenefitsNewEnergy(id: string): Promise<ApiResponse<PvStatistics>> {
  return request({
    method: "GET",
    url: "/microgrid/socialBenefitsNewEnergy/" + id,
  });
}

//
export function getLoadForecastCurve(id: string, params: ForecastCurve): Promise<ApiResponse<RealTimeData>> {
  return request({
    method: "GET",
    url: "microgrid/loadForecastCurve/" + id,
    params
  });
}


// 获取当前微电网的站点们
export function getSwitchCentralized(id: string): Promise<ApiResponse<StationInfo[]>> {
  return request({
    method: "GET",
    url: "/microgrid/switchCentralized/" + id,
  });
}


//图表核心上-标头
export function getCoreHeader(id: string): Promise<ApiResponse<EnergyAndEarningsData>> {
  return request({
    method: "GET",
    url: "/microgrid/coreHeader/" + id,
  });
}

//图表核心中-当日信息
export function getCoreCenter(id: string): Promise<ApiResponse<EnergyData>> {
  return request({
    method: "GET",
    url: "/microgrid/coreCenter/" + id,
  });
}
