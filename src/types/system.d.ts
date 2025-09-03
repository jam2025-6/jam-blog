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

export interface EnergyStats {
  yearElecConsum: number;
  yearElecConsumOld: number;
  yearElecConsumUnit: string;

  monthElecConsum: number;
  monthElecConsumOld: number;
  monthElecConsumUnit: string;

  dayElecConsum: number;
  dayElecConsumOld: number;
  dayElecConsumUnit: string;

  lastMonthDemand: number;
  lastMonthDemandOld: number;
  lastMonthDemandUnit: string;

  monthPowerGridSupply: number;
  monthPowerGridSupplyOld: number;
  monthPowerGridSupplyUnit: string;
  monthPowerGridSupplyPercent: string;

  monthNewEnergyConsum: number;
  monthNewEnergyConsumOld: number;
  monthNewEnergyConsumUnit: string;
  monthNewEnergyConsumPercent: string;

  yearPowerGridSupply: number;
  yearPowerGridSupplyOld: number;
  yearPowerGridSupplyUnit: string;
  yearPowerGridSupplyPercent: string | null;

  yearNewEnergyConsum: number;
  yearNewEnergyConsumOld: number;
  yearNewEnergyConsumUnit: string;
  yearNewEnergyConsumPercent: string | null;
}

// 定义数据响应体的接口
export interface EnergyAndEarningsData {
  /** 新能源总容量（新值），单位为 MWh */
  newEnergyTotalCapacity: number;
  /** 新能源总容量（旧值），单位为 MWh */
  newEnergyTotalCapacityOld: number;
  /** 新能源总容量的单位 */
  newEnergyTotalCapacityUnit: string;
  /** 新能源总容量百分比（字符串形式，如 "100%"） */
  newEnergyTotalCapacityPercent: string;
  /** PVC 放电总收益，单位为元 */
  pvcDisChargeTotalEarnings: number;
  /** PVC 放电总收益的单位 */
  pvcDisChargeTotalEarningsUnit: string;
  /** 总收益 */
  totalEarnings: number;
  /** 总收益的单位 */
  totalEarningsUnit: string;
  /** 碳减排量，单位为吨 (t) */
  carbonReduction: number;
  /** 碳减排量的单位 */
  carbonReductionUnit: string;
}

export interface EnergyData {
  /** 光伏日发电量 */
  pvcDayCapacity: number;
  /** 光伏日用电量 */
  pvcDayConsumCapacity: number;
  /** 光伏日用电量单位 */
  pvcDayConsumCapacityUnit: string;
  /** 光伏日功率 */
  pvcDayPower: number;
  /** 光伏日功率单位 */
  pvcDayPowerUnit: string;
  /** 负载日用电量 */
  loadDayConsumCapacity: number;
  /** 负载日用电量单位 */
  loadDayConsumCapacityUnit: string;
  /** 负载日功率 */
  loadDayPower: number;
  /** 负载日功率单位 */
  loadDayPowerUnit: string;
  /** 充电桩日用电量 */
  chargePileDayConsumCapacity: number;
  /** 充电桩日用电量单位 */
  chargePileDayConsumCapacityUnit: string;
  /** 充电桩日功率 */
  chargePileDayPower: number;
  /** 充电桩日功率单位 */
  chargePileDayPowerUnit: string;
  /** 市政电网容量 */
  municipalPowerGridCapacity: number;
  /** 市政电网容量单位 */
  municipalPowerGridCapacityUnit: string;
  /** 市政电网功率 */
  municipalPowerGridPower: number;
  /** 市政电网功率单位 */
  municipalPowerGridPowerUnit: string;
  /** 储能充电功率 */
  energyStorageChargingPower: number;
  /** 储能充电功率单位 */
  energyStorageChargingPowerUnit: string;
  /** 储能SOC（State of Charge） */
  energyStorageSOC: number;
  /** 储能SOC文本显示 */
  energyStorageSOCText: string;
  /** 储能状态代码 */
  energyStorageStatus: number;
  /** 储能状态文本描述 */
  energyStorageStatusText: string;
  /** 新能源占比 */
  newEnergyProportion: string;
  /** 峰谷套利月节电收益 */
  peakValleyArbitrageMonthSaveElec: number;
  /** 峰谷套利月节电收益单位 */
  peakValleyArbitrageMonthSaveElecUnit: string;
  /** 峰谷套利累计节电收益 */
  peakValleyArbitrageTotalSaveElec: number;
  /** 峰谷套利累计节电收益单位 */
  peakValleyArbitrageTotalSaveElecUnit: string;
  /** 需求管理月减少量 */
  demandManageMonthReduce: number;
  /** 需求管理月减少量单位 */
  demandManageMonthReduceUnit: string;
  /** 需求管理月节电收益 */
  demandManageMonthSaveElec: number;
  /** 需求管理累计节电收益 */
  demandManageTotalSaveElec: number;
  /** 光伏月用电量 */
  pvcMonthConsumCapacity: number;
  /** 光伏月用电量单位 */
  pvcMonthConsumCapacityUnit: string;
  /** 光伏月节电收益 */
  pvcMonthConsumSaveElec: number;
  /** 光伏累计节电收益 */
  pvcTotalConsumSaveElec: number | null;
}