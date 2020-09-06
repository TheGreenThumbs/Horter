import Vue from "vue";
import VueRouter from "vue-router";
import GardenMain from "../components/GardenMain.vue";
import WishList from "../components/WishList.vue";
import Login from "../components/Login.vue";
import UserProfile from "../components/Profile/user-profile.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/garden",
      component: GardenMain,
    },
    {
      path: "/wish",
      component: WishList,
    },
    {
      path: "/",
      component: Login,
    },
    {
      path: "/UserProfile",
      component: UserProfile,
    }
  ],
  mode: "history",
});

 
export default router;
