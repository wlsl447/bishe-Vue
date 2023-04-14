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
import Notice from '@/views/Notice'
import CompetitionManger from '@/views/manager/CompetitionManger'
import PlaceManager from '@/views/manager/PlaceManager'
import AwardManager from '@/views/manager/AwardManager'
import NoticeManager from '@/views/manager/NoticeManager'
import ChangePassword from '@/views/user/ChangePassword'
import Advice from '@/views/user/Advice'
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
      {
        path: "notice",
        name: "notice",
        component: Notice
      },
      {
        path: "competitionManager",
        name: "competitionManager",
        component: CompetitionManger,
      },
      {
        path: "placeManager",
        name: "placeManager",
        component: PlaceManager,
      },
      {
        path: "awardManager",
        name: "awardManager",
        component: AwardManager,
      },
      {
        path: "noticeManager",
        name: "noticeManager",
        component: NoticeManager,
      },
    ]
  },
  {
    path: "/login",
    name: 'login',
    component: Login,
  },
  {
    path: "/changePassword",
    name: "changePassword",
    component: ChangePassword
  },
  {
    path: "/advice",
    name: "advice",
    component: Advice
  },

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
