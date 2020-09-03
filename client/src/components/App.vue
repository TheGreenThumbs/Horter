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
  created() {
    this.$log.debug("test", 123);
    this.$log.info("test", 456);
    this.$log.warn("test");
    this.$log.error("test");
    this.$log.fatal("test");
  },
};
</script>
