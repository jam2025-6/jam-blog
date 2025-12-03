import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router";
import "@/assets/style/index.scss"; // 全局样式
import pinia from "@/stores"; // ✅ 引入刚才的 pinia 实例
import SvgIcon from "@/components/SvgIcon/index.vue";
import loadingDirective from "./directives/loading";
// import "@/utils/base";
// import SvgIcon from "@/components/SvgIcon/index.vue";
import "virtual:svg-icons-register"; // svg图标
import 'md-editor-v3/lib/style.css';
const app = createApp(App);
app.component("SvgIcon", SvgIcon);
// 注册全局指令
app.directive('loading', loadingDirective);
app.use(router);
app.use(pinia); // ✅ 使用 Pinia
app.mount("#app");
