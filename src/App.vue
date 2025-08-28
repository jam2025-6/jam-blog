<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useScreenAdapts } from "@/hooks";
import { useLocaleStore } from "@/stores/modules/locale";
import { useTabVisibility } from "@/hooks/useTabVisibility";
import { getInfo } from "@/api/saas";
import Cookies from "js-cookie";
type LangType = "zh-CN" | "en-US";
const localeStore = useLocaleStore();
const locale = computed(() => localeStore.elementPlusLocale);
async function getBasicInfo() {
  let res = await getInfo();
  document.title = res.company?.companyName || import.meta.env.VITE_APP_TITLE;
  if (res.company.iconUrl) {
    // 找到 HTML 页面中的 favicon 标签
    let favicon = document.querySelector('link[rel="shortcut icon"]') || document.querySelector('link[rel="icon"]');
    // 修改 favicon 的 URL
    if (favicon) {
      favicon.setAttribute("href", res.company.iconUrl);
    }
  }
}
localeStore.setLang((Cookies.get("saas-locale") || "zh-CN") as LangType);
useTabVisibility({
  onVisible: () => {
    localeStore.setLang((Cookies.get("saas-locale") || "zh-CN") as LangType);
    window.location.reload();
  },
});
useScreenAdapts();
getBasicInfo();
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}
</style>
