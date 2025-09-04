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