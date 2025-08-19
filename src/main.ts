import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "@/router";
import "@/assets/style/index.scss"; // 全局样式
import pinia from "@/stores"; // ✅ 引入刚才的 pinia 实例
import SvgIcon from "@/components/SvgIcon/index.vue";
// import "@/utils/base";

// import SvgIcon from "@/components/SvgIcon/index.vue";

import "virtual:svg-icons-register"; // svg图标
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import i18n from "./i18n/index.js";

dayjs.extend(dayOfYear);

const app = createApp(App);
app.component("SvgIcon", SvgIcon);
// 注册全局指令// 全局注册，名字叫 Icon
// app.component("SvgIcon", SvgIcon);
app.use(ElementPlus);
app.use(i18n);
app.use(router);
app.use(pinia); // ✅ 使用 Pinia
app.mount("#app");
