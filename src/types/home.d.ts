export interface listParams {
  page?: number;
  pageSize?: number;
  stationName?: string;
  microgridName?: string;
}

// 站点
export interface Station {
  stationCode: string;
  stationId: string;
  stationName: string;
  pvInstalledPower: number;
  windCapacity: number;
  installedPower: number;
  installedCapacity: number;
  pileInstalledPower: number;
  directCurrentPileInstalledPower: number;
  id?: string;
  pvInstalledPowerSum?: number;
  windCapacitySum?: number;
  installedCapacitySum?: number;
  pileInstalledPowerSum?: number;
  directCurrentPileInstalledPowerSum?: number;
}

// 微网
export interface Microgrid {
  id: string;
  microgridCode: string;
  microgridName: string;
  voltageLevel: string;
  transformerCapacity: number;
  pvInstalledPowerSum: number;
  windCapacitySum: number;
  installedPowerSum: number;
  installedCapacitySum: number;
  pileInstalledPowerSum: number;
  directCurrentPileInstalledPowerSum: number;
  stationCount: number;
  microgridAbbreviation: string;
  children: Station[];
}

/**
 * 微电网大屏配置实体
 */
interface MicrogridBigScreenConfig {
  id: number;
  corpId: string;
  name: string;
  useTo: string;
  config: string;
  gmtCreate: string;
  gmtModify: string;
}
