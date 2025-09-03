<script setup lang="ts">
import { BasicInfo, CarbonCurve, ElectricityAnalysis } from "./components";
import { ref } from 'vue'
const basicInfoRef = ref()
const electricityAnalysisRef = ref()
const carbonCurveRef = ref()
defineExpose({
  basicInfoRef,
  electricityAnalysisRef,
  carbonCurveRef,
})
</script>
<template>
  <div class="left-panel">
    <BasicInfo ref="basicInfoRef" />
    <ElectricityAnalysis ref="electricityAnalysisRef" />
    <CarbonCurve ref="carbonCurveRef" />
  </div>
</template>

<style scoped lang="scss">
.left-panel {
  height: 974px;
  width: 475px;
  background-color: transparent;
  position: absolute;
  left: 24px;
  top: 84px;
  bottom: 24px;
  padding-top: 6px;
  background: linear-gradient(180deg, rgba(5, 17, 42, 0.02) 0%, rgba(15, 75, 156, 0.03) 100%);
  backdrop-filter: blur(12px);
}
</style>
