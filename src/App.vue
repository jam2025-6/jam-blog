<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useScreenAdapts } from "@/hooks";
import { useLocaleStore } from "@/stores/modules/locale.js";
import { useTabVisibility } from "@/hooks/useTabVisibility";
import Cookies from "js-cookie";
type LangType = "zh-CN" | "en-US";
const localeStore = useLocaleStore();
const locale = computed(() => localeStore.elementPlusLocale);

localeStore.setLang((Cookies.get("saas-locale") || "zh-CN") as LangType);
useTabVisibility({
  onVisible: () => {
    localeStore.setLang((Cookies.get("saas-locale") || "zh-CN") as LangType);
  },
});
useScreenAdapts();
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}
</style>
