export interface EarningsRecord {
  time: string; // 日期，例如 "2025-08-22"
  earnings: string; // 收益
  chargeAmount: string; // 充电量
  disChargeAmount: string; // 放电量
}

export interface AmountRecord {
  amount: number; // 金额或数值
  gmtCreate: string; // 创建时间，格式为 "YYYY-MM-DD"
}

export interface EnergyCurves {
  loadCurve: number[]; // 负荷曲线
  storeEnergyCurve: number[]; // 储能曲线
  mainsElectricity: number[]; // 电网曲线
  photovoltaic: number[]; // 光伏曲线
}
