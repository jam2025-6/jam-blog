import { createI18n } from "vue-i18n";
import Cookies from "js-cookie";
import enUS from "./locale/en-US.json";
import zhCN from "./locale/zh-CN.json";
import { LangType } from "@/types/api";

const messages: Record<LangType, any> = {
  "en-US": enUS,
  "zh-CN": zhCN,
};

// 从 cookie 中获取用户选择的语言，如果没有则使用默认语言
const savedLocale = Cookies.get("saas-locale") || "zh-CN";

const i18n = createI18n({
  legacy: false,
  locale: savedLocale, // 默认语言
  fallbackLocale: "zh-CN", // 回退语言
  messages,
});

export default i18n;
