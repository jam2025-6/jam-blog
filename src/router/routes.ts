import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/",
        redirect: "/article",
      },
      {
        path: "/article",
        component: () => import("@/pages/article/Main.vue"),
      },
      {
        path: "/article/:id",
        component: () => import("@/pages/article/Detail.vue"),
      },
      {
        path: "/self-talking",
        component: () => import("@/pages/self-talking/Main.vue"),
      },
      {
        path: "/memory",
        component: () => import("@/pages/memory/Main.vue"),
      },
      {
        path: "/memory/:id",
        component: () => import("@/pages/memory/Detail.vue"),
      }
    ],
  },
];

export default routes;
