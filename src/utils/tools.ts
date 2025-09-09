import { round } from "lodash";
type EnergyUnit = "wh" | "kwh" | "mwh" | "gwh";

export function convertEnergy(
    value: number,
    unit: string = "kwh",
    precision: number = 2
) {
    // 把传入的单位转小写
    const normalizedUnit = unit.toLowerCase() as EnergyUnit;

    // 单位映射（统一到 kWh）
    const unitMap: Record<EnergyUnit, number> = {
        wh: 1 / 1000,    // 1 Wh = 0.001 kWh
        kwh: 1,          // 基准
        mwh: 1000,       // 1 MWh = 1000 kWh
        gwh: 1_000_000   // 1 GWh = 1,000,000 kWh
    };

    if (!(normalizedUnit in unitMap)) {
        throw new Error(`Unsupported unit: ${unit}`);
    }

    const kWh = value * unitMap[normalizedUnit];

    // 取绝对值进行判断
    const absKWh = Math.abs(kWh);

    let displayValue: number;
    let displayUnit: string;

    if (absKWh >= 1e8) {
        displayValue = absKWh / 1e8;
        displayUnit = "亿kWh";
    } else if (absKWh >= 1e4) {
        displayValue = absKWh / 1e4;
        displayUnit = "万kWh";
    } else {
        displayValue = absKWh;
        displayUnit = "kWh";
    }

    // 保留符号 & 小数位
    displayValue = Number((kWh < 0 ? -displayValue : displayValue).toFixed(precision));

    return { value: displayValue, unit: displayUnit };
}

/**
 * 金额单位转换（元 -> 万元/亿元/万亿元）
 * @param {number} value 金额（单位：元）
 * @param {number} digits 保留小数位数，默认 2
 * @returns {{num: string, unit: string}} 结果对象
 */
export function formatMoney(value: number, digits: number = 2) {
    if (value == null || isNaN(value)) {
        return { num: '-', unit: '' }
    }

    let num: number
    let unit: string

    if (value >= 1e12) {
        num = round((value / 1e12), digits)
        unit = '万亿元'
    } else if (value >= 1e8) {
        num = round((value / 1e8), digits)
        unit = '亿元'
    } else if (value >= 1e4) {
        num = round((value / 1e4), digits)
        unit = '万元'
    } else {
        num = round((value), digits)
        unit = '元'
    }

    return { num, unit }
}
