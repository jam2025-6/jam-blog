import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/",
        name: "高特微电网管理平台",
        component: () => import("@/pages/home/index.vue"),
      },
      {
        path: "/system",
        name: "高特微电网管理系统",
        component: () => import("@/pages/system/index.vue"),
      },
    ],
  },
];

export default routes;
