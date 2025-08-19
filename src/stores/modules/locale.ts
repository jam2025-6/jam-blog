import { defineStore } from "pinia";
import Cookies from "js-cookie";
import i18n from "@/i18n/index.js";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";
type LangType = "zh-CN" | "en-US";
const elementPlusLocaleMap: Record<LangType, any> = {
  "zh-CN": zhCn,
  "en-US": en,
};

export const useLocaleStore = defineStore("lang", {
  state: () => ({
    lang: Cookies.get("saas-locale") || "zh-CN",
    elementPlusLocale: zhCn,
  }),
  actions: {
    setLang(lang: LangType) {
      lang = lang || "zh-CN";
      Cookies.set("saas-locale", lang, {
        expires: 365,
        domain: import.meta.env.VITE_APP_ENV === "development" ? location.hostname : ".ess-ds.com",
      });
      this.elementPlusLocale = elementPlusLocaleMap[lang];
      i18n.global.locale.value = lang;
      this.lang = lang;
    },
  },
});
