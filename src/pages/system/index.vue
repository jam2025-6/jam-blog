<script setup lang="ts">
import { ref } from 'vue'
import { getCoreCenter } from '@/api/system'
import { LeftPanel, RightPanel, CentralPanel, BottomPanel, IndicatorCard, InfoCard } from "./components";
import { useRoute } from "vue-router";
import { EnergyData } from '@/types/system'
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
  pvcTotalConsumSaveElec: null
})
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
getData();
</script>
<template>
  <div class="page">
    <LeftPanel />
    <RightPanel />
    <IndicatorCard />
    <CentralPanel :data="data" />
    <BottomPanel />
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
