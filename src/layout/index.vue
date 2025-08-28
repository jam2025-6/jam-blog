<script setup lang="ts">
import PlatHeader from "@/components/PlatHeader/index.vue";
import SystemHeader from "@/components/SystemHeader/index.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

/**
 * 计算属性：判断当前是否为首页
 **/
const isHome = computed(() => route.path === "/");
</script>

<template>
  <div class="pages">
    <PlatHeader v-if="isHome" />
    <SystemHeader v-else />
    <div class="pages-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pages {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 主内容区域样式 */
.pages-content {
  height: calc(100% - 96px);
  width: 100%;
}
</style>
