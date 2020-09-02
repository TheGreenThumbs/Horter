<template>
  <div>
    <nav>
      <router-link to="/garden">Garden Main</router-link>
    </nav>
    <h1>{{ msg }}</h1>
    <router-view></router-view>
    <navigation></navigation>
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
