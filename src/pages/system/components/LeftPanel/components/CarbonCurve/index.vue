<script setup lang="ts">
import { PanelTitle } from "@/components";
</script>
<template>
  <div class="carbon-curve">
    <PanelTitle title="碳排放曲线" />
    <div class="container"></div>
  </div>
</template>

<style scoped lang="scss">
.carbon-curve {
  height: 305px;
  width: 100%;
  .container {
    padding: 24px 32px 17px 24px;
    width: calc(100% - 56px);
    height: calc(100% - 41px);
  }
}
</style>
