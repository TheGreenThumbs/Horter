import Vue from "vue";
import VueRouter from "vue-router";
import GardenMain from "../components/GardenMain.vue";
import WishList from "../components/WishList.vue";

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
  ],
  mode: "history",
});

export default router;
