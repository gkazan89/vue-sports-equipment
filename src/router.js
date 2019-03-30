import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Silence from "./views/Silence.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import ItemsNew from "./views/ItemsNew.vue";
import ItemsShow from "./views/ItemsShow.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/silence",
      name: "silence",
      component: Silence
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/items/new",
      name: "items-new",
      component: ItemsNew
    },
    {
      path: "/items/:id",
      name: "items-show",
      component: ItemsShow
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    }
  ]
});
