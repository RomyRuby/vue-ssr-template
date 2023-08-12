import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home";

Vue.use(VueRouter);

export const createRouter = () => {
  const router = new VueRouter({
    mode: "history", // 兼容前后端
    routes: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: "/about",
        name: "about",
        component: () => import("@/pages/About"),
      },
      {
        path: "/posts",
        name: "post-list",
        component: () => import("@/pages/Posts"),
      },
      {
        path: "*",
        name: "error404",
        component: () => import("@/pages/404"),
      },
    ],
  });

  router.beforeEach((to, from, next) => {
    setTimeout(async () => {
      console.log(to.matched);
      console.log(
        to.matched.length && to.matched[0].instances.default.serverPrefetch
      );
      if (to.matched.length && to.matched[0].instances.default.serverPrefetch) {
        await to.matched[0].instances.default.serverPrefetch();
      }
    }, 100);
    next();
  });

  return router;
};
