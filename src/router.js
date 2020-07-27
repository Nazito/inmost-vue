import Vue from "vue";
import router from "vue-router";
import Registration from "@/components/SidebarFormRegistration";

Vue.use(router);

export default new router({
  mode: "history",
  routes: [
    { path: "/", component: Registration },
    {
      path: "/login",
      component: () => import("./components/SidebarFormLogin.vue"),
    },
    {
      path: "/forgotPassword",
      component: () => import("./components/SidebarFormForgotPassword.vue"),
    },
  ],
});
