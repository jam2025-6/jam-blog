<script setup lang="ts">
import { ref } from 'vue'
import { getCoreCenter } from '@/api/system'
import { LeftPanel, RightPanel, CentralPanel, BottomPanel, IndicatorCard, InfoCard } from "./components";
import { useRoute } from "vue-router";
import { EnergyData } from '@/types/system'
import { useMethodPolling } from '@/hooks/useMethodPolling'
const route = useRoute();
const data = ref<EnergyData>({
  pvcDayCapacity: 0,
  pvcDayConsumCapacity: 0,
  pvcDayConsumCapacityUnit: "MWh",
  pvcDayPower: 0,
  pvcDayPowerUnit: "kWh",
  loadDayConsumCapacity: 0,
  loadDayConsumCapacityUnit: "MWh",
  loadDayPower: 0,
  loadDayPowerUnit: "kWh",
  chargePileDayConsumCapacity: 0,
  chargePileDayConsumCapacityUnit: "kWh",
  chargePileDayPower: 0,
  chargePileDayPowerUnit: "kWh",
  municipalPowerGridCapacity: 0,
  municipalPowerGridCapacityUnit: "kWh",
  municipalPowerGridPower: 0,
  municipalPowerGridPowerUnit: "kWh",
  energyStorageChargingPower: 0,
  energyStorageChargingPowerUnit: "kWh",
  energyStorageSOC: 0,
  energyStorageSOCText: "0%",
  energyStorageStatus: -1,
  energyStorageStatusText: "未知",
  newEnergyProportion: "0%",
  peakValleyArbitrageMonthSaveElec: 0,
  peakValleyArbitrageMonthSaveElecUnit: "元",
  peakValleyArbitrageTotalSaveElec: 0,
  peakValleyArbitrageTotalSaveElecUnit: "元",
  demandManageMonthReduce: 0,
  demandManageMonthReduceUnit: "kWh",
  demandManageMonthSaveElec: 0,
  demandManageTotalSaveElec: 0,
  pvcMonthConsumCapacity: 0,
  pvcMonthConsumCapacityUnit: "kWh",
  pvcMonthConsumSaveElec: 0,
  pvcTotalConsumSaveElec: null,
  pvcExist: false,
  chargePileExist: false,
  windExist: false,
})
const bottomPanelRef = ref()
const leftPanelRef = ref()
const rightPanelRef = ref()
const indicatorCardRef = ref()
async function getData() {
  try {
    const id = route.query.id as string;
    if (!id) {
      return;
    }
    const res = await getCoreCenter(id);
    if (res.code === 200) {
      data.value = res.data;
    }
  } catch (e) {
  } finally {
  }
}

useMethodPolling(() => {
  // 基本信息
  leftPanelRef.value.basicInfoRef.getData()
  // 用电情况分析
  leftPanelRef.value.electricityAnalysisRef.getData()
  // 碳排放曲线
  // leftPanelRef.value.carbonCurveRef.getData()
  // 运行功率曲线
  // rightPanelRef.value.powerCurveRef.getData()
  // 近七日收益
  // rightPanelRef.value.incomeComparisonRef.getData()
  // 新能源社会效益
  rightPanelRef.value.socialBenefitRef.getData()
  // 符合预测曲线
  // bottomPanelRef.value.changeFun()
  // 中间模块
  getData()
  // 顶部指标
  indicatorCardRef.value.getData()

}, {
  interval: 1000 * 60, // 每 5 秒轮询一次
  immediate: false, // 启动时立即执行一次
  autoStart: true, // 组件挂载后自动开始轮询
});
useMethodPolling(() => {
  // 碳排放曲线
  leftPanelRef.value.carbonCurveRef.getData()
  // 运行功率曲线
  rightPanelRef.value.powerCurveRef.getData()
  // 近七日收益
  rightPanelRef.value.incomeComparisonRef.getData()
  // 符合预测曲线
  bottomPanelRef.value.changeFun()

}, {
  interval: 1000 * 60 * 5, // 每 5 秒轮询一次
  immediate: false, // 启动时立即执行一次
  autoStart: true, // 组件挂载后自动开始轮询
});
getData()
</script>
<template>
  <div class="page">
    <LeftPanel ref="leftPanelRef" />
    <RightPanel ref="rightPanelRef" />
    <IndicatorCard ref="indicatorCardRef" />
    <CentralPanel :data="data" />
    <!-- <CentralPanel /> -->
    <BottomPanel ref="bottomPanelRef" />
    <InfoCard :data="data" />
  </div>
</template>

<style scoped lang="scss">
.page {
  color: #fff;
  height: 100%;
  width: 100%;
}
</style>
