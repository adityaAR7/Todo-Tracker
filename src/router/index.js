import { createRouter, createWebHistory } from "vue-router";
import Todo from "../views/Todo.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      component: Todo,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/signin",
      name: "SignIn",
      component: () => import("../views/SignIn.vue"),
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem("access_token")) {
      next();
    } else {
      next("/login");
    }
  } else {
    if (localStorage.getItem("access_token")) {
      next("/");
    } else {
      next();
    }
  }
});

export default router;
