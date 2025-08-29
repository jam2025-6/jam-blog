export interface EarningsRecord {
  time: string; // 日期，例如 "2025-08-22"
  earnings: string; // 收益
  chargeAmount: string; // 充电量
  disChargeAmount: string; // 放电量
}

export interface AmountRecord {
  amount: number; // 数值
  gmtCreate: string; // 创建时间，格式为 "YYYY-MM-DD"
}

export interface PowerCurve {
  time: string; // 时间
  value: number; // 数值
}

export interface EnergyCurves {
  loadCurve: PowerCurve[]; // 负荷曲线
  storeEnergyCurve: PowerCurve[]; // 储能曲线
  mainsElectricity: PowerCurve[]; // 电网曲线
  photovoltaic: PowerCurve[]; // 新能源
}

export interface PvStatistics {
  pvYearDisChargeCapacity: number; // 光伏年发电量
  pvYearDisChargeCapacityOld: number; //
  pvYearDisChargeCapacityUnit: string; //

  pvDayDisChargeCapacity: number; //
  pvDayDisChargeCapacityOld: number; //
  pvDayDisChargeCapacityUnit: string; //

  pvCapacity: number; // 装机容量
  pvYearEffHours: number; // 光伏年有效小时数

  pvYearSelfConsumElec: number; // 光伏年自用电量
  pvYearSelfConsumElecOld: number; //
  pvYearSelfConsumElecUnit: string; //

  pvYearOnGridElec: number; // 光伏年上网电量
  pvYearOnGridElecOld: number; //
  pvYearOnGridElecUnit: string; //

  reduceCarbonEmissions: number; // 减排二氧化碳 (t)
  saveStandardCoal: number; // 节约标准煤 (t)
  treesPlantedNumber: number; // 折合植树数量
  greenCertificatesNumber: number; // 绿证数量
}

export interface RealTimeData {
  loadRealTime: PowerCurve[]; // 实时负荷数据
  powerGenerationRealTime: PowerCurve[]; // 实时发电数据
}

export interface StationInfo {
  layoutId: number;        // 布局 ID
  stationCode: string;     // 电站编码
  stationName: string;     // 电站名称
  stationType: number;     // 电站类型
}
