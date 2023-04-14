import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/home"
import Login from '../views/Login.vue'
import Competition from '../views/Competition.vue'
import Place from '../views/Place.vue'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "competition",
        name: "competition",
        component: Competition
      },
      {
        path: "place",
        name: "place",
        component: Place
      },
      {
        path: "userCT",
        name: "place",
        component: Place
      },
    ]
  },
  {
    path: "/login",
    name: 'login',
    component: Login,
  },

];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
