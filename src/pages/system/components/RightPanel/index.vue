<script setup lang="ts">
import { ref } from "vue";
import { PowerCurve, IncomeComparison, SocialBenefit } from "./components";

const powerCurveRef = ref()
const incomeComparisonRef = ref()
const socialBenefitRef = ref()
defineExpose({
  powerCurveRef,
  incomeComparisonRef,
  socialBenefitRef
})
</script>
<template>
  <div class="right-panel">
    <PowerCurve ref="powerCurveRef" />
    <IncomeComparison ref="incomeComparisonRef" />
    <SocialBenefit ref="socialBenefitRef" />
  </div>
</template>

<style scoped lang="scss">
.right-panel {
  height: 974px;
  width: 475px;
  background-color: #fff;
  position: absolute;
  right: 24px;
  top: 84px;
  bottom: 24px;
  padding-top: 6px;
  background: linear-gradient(180deg, rgba(5, 17, 42, 0.02) 0%, rgba(15, 75, 156, 0.03) 100%);
  backdrop-filter: blur(12px);
}
</style>
