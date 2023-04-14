import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/home"
import Login from '../views/Login.vue'
import Competition from '../views/Competition.vue'
import Place from '../views/Place.vue'
import UserCT from '@/components/UserCT'
import MyCompotition from '../views/MyCompotition.vue'
import Index from '@/components/Index'
import MyApply from '@/views/MyApply'
import CreateTeam from '@/views/CreateTeam'
import JoinTeam from '@/views/JoinTeam'
import AddApply from '@/views/AddApply'
import RecruitTeam from '@/views/RecruitTeam'
import Award from '@/views/Award'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    redirect: "index",
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
        path: "recruitteam",
        name: "recruitteam",
        component: RecruitTeam
      },
      
      {
        path: "/userCT",
        name: "userCT",
        component: UserCT,
        redirect: "mycompetition",
        children: [
          {
            path: "/mycompetition",
            name: "mycompetition",
            component: MyCompotition
          },
          {
            path: "/myapply",
            name: "myapply",
            component: MyApply
          },
          {
            path: "/createteam",
            name: "createam",
            component: CreateTeam
          },
          {
            path: "/addapply",
            name: "addapply",
            component: AddApply
          },
          {
            path: "/jointeam",
            name: "jointeam",
            component: JoinTeam
          },
        ]
      },
      {
        path: "award",
        name: "award",
        component: Award
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
  mode: "hash",
  routes,
});
// const VueRouterPush = Router.prototype.push
// Router.prototype.push = function push (to) {
//   return VueRouterPush.call(this, to).catch(err => err)
// }
export default router;
