<template>
  <n-config-provider>
    <!-- :theme="darkTheme" -->
    <n-message-provider>
      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
// import { darkTheme } from "naive-ui";
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  .n-config-provider {
    height: 100%;
    width: 100%;
  }
}
</style>
