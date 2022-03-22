import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import firebase from "firebase";
Vue.use(VueRouter);

const routes = [
  { path: "*", redirect: "/login" },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/profil",
    name: "Profil",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Profil.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { hideNavigation: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { hideNavigation: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some((record) => record.meta.requireAuth);

  if (requireAuth && !currentUser) next("/login");
  else if (!requireAuth && currentUser) next("/home");
  else next();
});

export default router;
