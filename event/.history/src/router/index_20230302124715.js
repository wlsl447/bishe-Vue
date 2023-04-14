import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/home"
import Login from '../views/Login.vue'
import Competition from '../views/Competition.vue'
import Place from '../views/Place.vue'
import UserCT from '@/components/UserCT'
import MyCompotition from '@/views/MyCompotition'
import Index from '@/components/Index'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "index",
        name: "index",
        component: Index,

      },
      {
        path: "competition",
        name: "competition",
        component: Competition,

      },
      {
        path: "place",
        name: "place",
        component: Place
      },
      {
        path: "/userCT",
        name: "userCT",
        component: UserCT,
        children: [
          {
            path: "/mycompetition",
            name: "mycompetition",
            component: MyCompotition
          },
        ]
      },
    ]
  },
  {
    path: "/login",
    name: 'login',
    component: Login,
  },
  // {
  //   path: "/mycompetition",
  //   name: "mycompetition",
  //   component: MyCompotition
  // },

];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
