<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useThemeStore } from "./stores/theme";
const themeStore = useThemeStore();

function getThemeMode() {
  const currentHour = new Date().getHours();

  // 夜间模式时间：晚上6点到早上6点
  if (currentHour >= 18 || currentHour < 6) {
    themeStore.setTheme("dark");
  } else {
    themeStore.setTheme("light");
  }
}
getThemeMode();
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}
</style>
