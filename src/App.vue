<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useScreenAdapts } from "@/hooks";
useScreenAdapts();
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}
</style>
