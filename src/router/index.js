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

  router.beforeEach(async (to, from, next) => {
    const isMatched = to.matched.length;
    const isComponent = to.matched.length && (typeof to.matched[0].components.default !== 'function');

    if(isMatched){
      let component = !isComponent
        ? (await to.matched[0].components.default()).default
        : to.matched[0].components.default

      to.matched[0].components.default = component.serverPrefetch
        ? WithPrefetch(component)
        : component;
    }
    
    next();
  });

  return router;
};
