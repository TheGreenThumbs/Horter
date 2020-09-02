<template>
  <div>
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";
import router from "../router";

export default {
  name: "App",
  router,
  components: {
    navigation: Navigation,
  },
};
</script>
