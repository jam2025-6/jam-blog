<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import Cookies from "js-cookie";
import { useScreenAdapts } from "@/hooks";
import { useLocaleStore } from "@/stores/modules/locale";
import { useTabVisibility } from "@/hooks/useTabVisibility";
import { getInfo } from "@/api/saas";
import { LangType } from "@/types/api";

// 初始化语言状态管理存储，用于全局语言切换
const localeStore = useLocaleStore();

// 存储当前SaaS语言设置的响应式变量，用于检测语言变化
let saasLocale = ref("");

// 计算属性：动态获取Element Plus组件库的本地化配置
// 确保Element Plus组件的文本（如日期选择器）与当前语言一致
const locale = computed(() => localeStore.elementPlusLocale);

/**
 * 获取基础信息函数
 * 负责从服务器获取公司配置信息，包括：
 * - 网站标题（显示在浏览器标签页）
 * - 公司图标（favicon）
 * - 其他基础配置
 */
async function getBasicInfo() {
  try {
    let res = await getInfo();
    document.title = res.company?.companyName || import.meta.env.VITE_APP_TITLE;
    if (res.company.iconUrl) {
      let favicon = document.querySelector('link[rel="shortcut icon"]') || document.querySelector('link[rel="icon"]');
      if (favicon) {
        favicon.setAttribute("href", res.company.iconUrl);
      }
      sessionStorage.setItem("logoUrl", res.company.logoUrl);
    }
  } catch (error) {
    console.error("获取基础信息失败:", error);
  }
}

/**
 * 设置语言映射函数
 * 负责：
 * 1. 从cookie读取语言设置
 * 2. 更新全局语言状态
 * 3. 同步存储当前语言值用于变化检测
 */
function setLangMap() {
  const currentLang = (Cookies.get("saas-locale") || "zh-CN") as LangType;
  localeStore.setLang(currentLang); // 设置全局语言
  saasLocale.value = currentLang; // 存储当前语言用于检测变化
}
/**
 * 标签页可见性检测
 * 当用户从其他标签页切换回来时，检查语言设置是否变化
 * 如果cookie中的语言与当前不一致，则重新设置语言并刷新页面
 */
useTabVisibility({
  onVisible: () => {
    // 比较cookie中的语言与当前存储的语言
    if (saasLocale.value !== Cookies.get("saas-locale")) {
      setLangMap(); // 重新设置语言
      window.location.reload(); // 刷新页面以应用新语言
    }
  },
});

// 组件挂载时的初始化逻辑
onMounted(() => {
  Cookies.set('Admin-Token', 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJuaWNrbmFtZSI6IumrmOeJueeUteWtkCIsImVtYWlsIjoiY2hpbmFAY2hpbmEtZ29sZC5jb20iLCJwaG9uZW51bWJlciI6ImUyNDY0Nzg1MGVhZGI0ZWI0ZWU4MzFlOTBhMjRlMjU1IiwiYXZhdGFyIjoiaHR0cHM6Ly9lc3MtZHMuY29tL3N0YXRpY3MvMjAyNC8xMS8wOC8yMDI0MTEwODA1MjgyOEE0OTRfNTFkYzNiOGJmMDJkNGY4ZjgzZjZjNWQ1ZWRhZThlMDYucG5nIiwiY29tcGFueWNvZGUiOiJnb2xkIiwidGVuYW50aWQiOjk5OTksImRza2V5IjoibWFzdGVyIiwicGxhdGZvcm11c2VyaWQiOjEsInBsYXRmb3JtdXNlcm5hbWUiOiJhZG1pbiIsInVzZXJUeXBlIjoiMDAiLCJwZXJtaXNzaW9uc1JlZGlzS2V5IjoicGVybWlzc2lvbjoxIiwicm9sZXMiOlsiYWRtaW4iXSwiZGVwdElkIjoxMDMsInRva2VuUmVkaXNLZXkiOiJsb2dpbl90b2tlbnM6NWQzZGQ0N2ItMWM4YS00ZDIzLThiZmYtNDkwNDlmYTViZWI1IiwidGFnIjoiZGVmYXVsdF9pbnZva2UifQ.n52ikNd7h0FuDwMq2lIxORbVwUNYzsUtLgxG6PbXtXlN26X5qA21cfaroYmTwjl0Oj3wF3dqcXlwdM6a2lCHOA', {
    domain: location.hostname.includes('ess-ds.com')
      ? '.ess-ds.com'
      : location.hostname,
  })
  setLangMap(); // 初始化语言设置
  useScreenAdapts(); // 启用屏幕自适应功能（响应式布局）
  getBasicInfo(); // 获取基础信息
});
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}
</style>
