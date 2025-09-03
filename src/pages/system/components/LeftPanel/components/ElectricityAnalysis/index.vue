<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { PanelTitle, SemiCircleProgress } from "@/components";
import { useLocaleStore } from "@/stores/modules/locale";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { getCalcElectricity } from "@/api/system";
import { EnergyStats } from '@/types/system'
const { isChinese } = storeToRefs(useLocaleStore());
const route = useRoute();
const formData = ref<EnergyStats>({
  yearElecConsum: 0,
  yearElecConsumOld: 0,
  yearElecConsumUnit: "kWh",
  monthElecConsum: 0,
  monthElecConsumOld: 0,
  monthElecConsumUnit: "kWh",
  dayElecConsum: 0,
  dayElecConsumOld: 0,
  dayElecConsumUnit: "kWh",
  lastMonthDemand: 0,
  lastMonthDemandOld: 0,
  lastMonthDemandUnit: "kWh",
  monthPowerGridSupply: 0,
  monthPowerGridSupplyOld: 0,
  monthPowerGridSupplyUnit: "kWh",
  monthPowerGridSupplyPercent: "0%",
  monthNewEnergyConsum: 0,
  monthNewEnergyConsumOld: 0,
  monthNewEnergyConsumUnit: "kWh",
  monthNewEnergyConsumPercent: "0%",
  yearPowerGridSupply: 0,
  yearPowerGridSupplyOld: 0,
  yearPowerGridSupplyUnit: "kWh",
  yearPowerGridSupplyPercent: null,
  yearNewEnergyConsum: 0,
  yearNewEnergyConsumOld: 0,
  yearNewEnergyConsumUnit: "kWh",
  yearNewEnergyConsumPercent: null
});
const loading = ref(false);
async function getData() {
  try {
    loading.value = true;
    const id = route.query.id as string;
    if (!id) {
      return;
    }
    const res = await getCalcElectricity(id);
    formData.value = res.data;
  } catch (e) {
  } finally {
    loading.value = false;
  }
}
/**
 * 将 MW·h 转换为合适的电量单位，返回对象 { value, unit }
 * @param {number} mwh - 电量 (单位: MW·h)
 * @returns {{value: number, unit: string}} - 数值和单位
 */
// function convertEnergy(mwh: number) {
//   const kWh = mwh * 1000;
//   let value, unit;
//   if (kWh >= 1e8) {
//     value = +(kWh / 1e8).toFixed(2);
//     unit = "亿kW·h";
//   } else if (kWh >= 1e4) {
//     value = +(kWh / 1e4).toFixed(2);
//     unit = "万kW·h";
//   } else {
//     value = +kWh.toFixed(2);
//     unit = "kW·h";
//   }

//   return { value, unit };
// }
type EnergyUnit = "wh" | "kwh" | "mwh" | "gwh";

function convertEnergy(
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


getData();
</script>
<template>
  <div class="electricity-analysis">
    <PanelTitle :title="$t('powerUsageAnalysis')" />
    <div v-loading="loading" class="container">
      <div class="cell">
        <div class="cell-item">
          <svg-icon v-if="isChinese" name="year" style="font-size: 42px" />
          <svg-icon v-else name="elec" style="font-size: 42px" />
          <div class="info">
            <div class="name">{{ $t("annualPowerConsumption") }}</div>
            <div class="value">
              <div class="num">{{ convertEnergy(formData.yearElecConsum, formData.yearElecConsumUnit).value }}</div>
              <div class="unit">{{ convertEnergy(formData.yearElecConsum, formData.yearElecConsumUnit).unit }}</div>
            </div>
          </div>
        </div>

        <div class="cell-item">
          <svg-icon v-if="isChinese" name="month" style="font-size: 42px" />
          <svg-icon v-else name="elec" style="font-size: 42px" />
          <div class="info">
            <div class="name">{{ $t("monthlyPowerConsumption") }}</div>
            <div class="value">
              <div class="num">{{ convertEnergy(formData.monthElecConsum, formData.monthElecConsumUnit).value }}</div>
              <div class="unit">{{ convertEnergy(formData.monthElecConsum, formData.monthElecConsumUnit).unit }}</div>
            </div>
          </div>
        </div>
        <div class="cell-item">
          <svg-icon v-if="isChinese" name="day" style="font-size: 42px" />
          <svg-icon v-else name="elec" style="font-size: 42px" />
          <div class="info">
            <div class="name">{{ $t("dailyPowerConsumption") }}</div>
            <div class="value">
              <div class="num">{{ convertEnergy(formData.dayElecConsum, formData.dayElecConsumUnit).value }}</div>
              <div class="unit">{{ convertEnergy(formData.dayElecConsum, formData.dayElecConsumUnit).unit }}</div>
            </div>
          </div>
        </div>
        <div class="cell-item">
          <svg-icon v-if="isChinese" name="demand" style="font-size: 42px" />
          <svg-icon v-else name="elec" style="font-size: 42px" />
          <div class="info">
            <div class="name">{{ $t("currentMonthDemand") }}</div>
            <div class="value">
              <div class="num">{{ convertEnergy(formData.lastMonthDemand, formData.lastMonthDemandUnit).value }}</div>
              <div class="unit">{{ convertEnergy(formData.lastMonthDemand, formData.lastMonthDemandUnit).unit }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="rate">
        <div class="rate-item">
          <div class="rate-item-pic">
            <SemiCircleProgress :bluePercent="Number(formData.monthPowerGridSupplyPercent)"
              :orangePercent="Number(formData.monthNewEnergyConsumPercent)" :text="$t('monthlyComparison')" />
          </div>
          <div class="rate-item-main">
            <div class="item">
              <div class="point"></div>
              <div class="name">{{ $t("gridMonthlySupply") }}</div>
              <div class="value">
                <div class="num">{{ convertEnergy(formData.monthPowerGridSupply,
                  formData.monthPowerGridSupplyUnit).value }}</div>
                <div class="unit">{{ convertEnergy(formData.monthPowerGridSupply,
                  formData.monthPowerGridSupplyUnit).unit }}</div>
              </div>
              <div class="percent">({{ formData.monthPowerGridSupplyPercent || 0 }}%)</div>
            </div>
            <div class="item orange">
              <div class="point"></div>
              <div class="name">{{ $t("renewableEnergyAnnualUtilization") }}</div>
              <div class="value">
                <div class="num">{{ convertEnergy(formData.monthNewEnergyConsum,
                  formData.monthNewEnergyConsumUnit).value }}</div>
                <div class="unit">{{ convertEnergy(formData.monthNewEnergyConsum,
                  formData.monthNewEnergyConsumUnit).unit }}</div>
              </div>
              <div class="percent">({{ formData.monthNewEnergyConsumPercent || 0 }}%)</div>
            </div>
          </div>
          <!-- <SemiCircleProgress :progress="85" title="月对比" :size="100" progress-color="#2196F3" /> -->
        </div>
        <div class="rate-item">
          <div class="rate-item-pic">
            <SemiCircleProgress :bluePercent="Number(formData.yearPowerGridSupplyPercent)"
              :orangePercent="Number(formData.yearNewEnergyConsumPercent)" text="年对比" />
          </div>
          <div class="rate-item-main">
            <div class="item">
              <div class="point"></div>
              <div class="name">{{ $t("gridMonthlySupply") }}</div>
              <div class="value">
                <div class="num">{{ convertEnergy(formData.yearPowerGridSupply, formData.yearPowerGridSupplyUnit).value
                }}</div>
                <div class="unit">{{ convertEnergy(formData.yearPowerGridSupply, formData.yearPowerGridSupplyUnit).unit
                }}</div>
              </div>
              <div class="percent">({{ formData.yearPowerGridSupplyPercent || 0 }}%)</div>
            </div>
            <div class="item orange">
              <div class="point"></div>
              <div class="name">{{ $t("renewableEnergyAnnualUtilization") }}</div>
              <div class="value">
                <div class="num">{{ convertEnergy(formData.yearNewEnergyConsum, formData.yearNewEnergyConsumUnit).value
                }}</div>
                <div class="unit">{{ convertEnergy(formData.yearNewEnergyConsum, formData.yearNewEnergyConsumUnit).unit
                }}</div>
              </div>
              <div class="percent">({{ formData.yearNewEnergyConsumPercent || 0 }}%)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.electricity-analysis {
  height: 348px;
  width: 100%;

  .container {
    padding: 19px 0 19px 39px;

    .cell {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 16px 20px;

      &-item {
        background-image: url("@/assets/images/system/electricity-cell-heigher.png");
        width: 183px;
        height: 48px;
        display: flex;
        align-items: center;

        .info {
          width: calc(100% - 42px);

          .value {
            display: flex;
            align-items: baseline;
          }
        }

        // padding: 0 10px;
        .name {
          white-space: nowrap;
          background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          /* 二级标题投影 */
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36), 0 0 10px rgba(48, 126, 229, 0.6);
          font-family: "HarmonyOS Sans SC";
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 0.6px;
          margin-bottom: 4px;
        }

        .num {
          background: linear-gradient(51deg, #e5b02b 6.53%, #ead08f 88.38%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          leading-trim: both;
          text-edge: cap;
          font-family: Rubik;
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 1.4px;
          margin-right: 4px;
        }

        .unit {
          background: linear-gradient(51deg, #e5b02b 6.53%, #ead08f 88.38%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          leading-trim: both;
          text-edge: cap;
          font-family: Rubik;
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 0.4px;
        }
      }
    }

    .rate {
      padding-left: 11px;

      &-item {
        height: 58px;
        width: 100%;
        margin-top: 19px;
        // background-color: #fdf;
        display: flex;
        align-items: center;

        &-pic {
          flex: 1;
        }

        &-main {
          width: calc(100% - 138px);

          .item {
            display: flex;
            align-items: center;
            min-height: 14px;
            width: 100%;

            &.orange {
              .point {
                background: linear-gradient(231deg, #f5b04f 0.05%, #fe9347 113.94%);
              }

              .value,
              .percent {
                background: linear-gradient(231deg, #f5b04f 0.05%, #fe9347 113.94%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }

            &:first-child {
              margin-bottom: 10px;
            }

            .point {
              background: linear-gradient(220deg, #26cefd 7.64%, #2b8ef3 100.06%);
              width: 6px;
              height: 6px;
              flex-shrink: 0;
              border-radius: 50%;
              margin-right: 11px;
            }

            .name {
              background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              /* 二级标题投影 */
              text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36),
                0 0 10px rgba(48, 126, 229, 0.6);
              font-family: "HarmonyOS Sans SC";
              font-size: 12px;
              font-style: normal;
              font-weight: 900;
              // line-height: normal;
              letter-spacing: 0.6px;
              margin-right: 6px;
            }

            .value {
              display: flex;
              align-items: baseline;
              background: linear-gradient(220deg, #26cefd 7.64%, #2b8ef3 100.06%);
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-family: Rubik;
              font-style: normal;
              font-weight: 700;
              line-height: normal;

              .num {
                font-size: 14px;
                letter-spacing: 1.4px;
                margin-right: 4px;
              }

              .unit {
                font-size: 12px;
                margin-right: 4px;
                letter-spacing: 0.6px;
              }
            }

            .percent {
              display: inline-block;
              background: linear-gradient(220deg, #26cefd 7.64%, #2b8ef3 100.06%);
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-family: Rubik;
              font-size: 14px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
              letter-spacing: 1.4px;
            }
          }
        }
      }
    }
  }
}
</style>
