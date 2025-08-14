<script setup lang="ts">
import { LeftPanel, RightPanel, CentralPanel, BottomPanel, IndicatorCard, InfoCard } from "./components";
</script>
<template>
  <div class="page">
    <LeftPanel />
    <RightPanel />
    <IndicatorCard />
    <CentralPanel />
    <BottomPanel />
    <InfoCard />
  </div>
</template>

<style scoped lang="scss">
.page {
  color: #fff;
  height: 100%;
  width: 100%;
}
</style>
