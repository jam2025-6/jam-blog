<script setup lang="ts">
import PlatHeader from "@/components/PlatHeader/index.vue";
import SystemHeader from "@/components/SystemHeader/index.vue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { getMicrogridBigScreenName } from '@/api/home'
const route = useRoute();
const title = ref('')
function getTitle() {
  getMicrogridBigScreenName().then(res => {
    if (res.data) {
      title.value = res.data.config
      document.title = res.data.config || import.meta.env.VITE_APP_TITLE
    }
  })
}
/**
 * 计算属性：判断当前是否为首页
 **/
const isHome = computed(() => route.path === "/");
getTitle()
</script>

<template>
  <div class="pages">
    <PlatHeader :title="title" v-if="isHome" />
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
