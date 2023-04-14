import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/home"
import Login from '../views/Login.vue'
import Competition from '../views/Competition.vue'
import Place from '../views/Place.vue'
import UserCT from '@/components/UserCT'
import MyCompotition from '@/views/MyCompotition'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "competition",
        name: "competition",
        component: Competition,
        children: [
          {
            path: "/",
            name: "place",
            component: Place
          },
        ]
      },
      {
        path: "place",
        name: "place",
        component: Place
      },
      {
        path: "userCT",
        name: "userCT",
        component: UserCT
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