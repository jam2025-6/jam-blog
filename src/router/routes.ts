import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/",
        name: "首页",
        component: () => import("@/pages/home/index.vue"),
      },
    ],
  },
];

export default routes;
