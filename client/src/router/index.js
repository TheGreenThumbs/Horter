import Vue from "vue";
import VueRouter from "vue-router";
import GardenMain from "../components/GardenMain.vue";
import WishList from "../components/WishList.vue";
import PlantList from "../components/PlantList.vue";
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
      name: "garden",
    },
    {
      path: "/wish",
      component: WishList,
      name: "wish",
      props: true,
    },
    {
      path: "/plant",
      component: PlantList,
      name: "plant",
    },
    {
      path: "/UserProfile",
      component: UserProfile,
      name: "profile",
    },
    {
      path: "/FriendSearch",
      component: FriendSearch,
      name: "friend",
    },
    {
      path: "/addgarden",
      component: AddGarden,
      name: "addgarden",
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
