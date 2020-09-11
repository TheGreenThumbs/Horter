import Vue from "vue";
import VueRouter from "vue-router";
import GardenMain from "../components/GardenMain.vue";
import WishList from "../components/WishList.vue";
import Login from "../components/Login.vue";
import UserProfile from "../components/Profile/user-profile.vue";
import FriendSearch from "../components/Profile/FriendSearch.vue";
import AddGarden from "../components/AddGarden.vue";
import ARGarden from "../components/ARGarden.vue";
import NearbyStores from "../components/NearbyStores.vue";

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
      name: "wish",
      props: true,
    },
    {
      path: "/UserProfile",
      component: UserProfile,
    },
    {
      path: "/FriendSearch",
      component: FriendSearch,
    },
    {
      path: "/addgarden",
      component: AddGarden,
    },
    {
      path: "/FriendSearch",
      component: FriendSearch,
    },
    {
      path: "/",
      component: Login,
    },
    {
      path: "/argarden",
      component: ARGarden,
    },
    {
      path: "/nearbystores/",
      name: "nearbystores",
      component: NearbyStores,
      props: true,
    },
  ],
  mode: "history",
});

export default router;
