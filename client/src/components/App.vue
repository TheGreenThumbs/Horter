<template>
  <div>
    <nav>
      <router-link to="/garden">Garden Main</router-link>
    </nav>
    <h1>{{ msg }}</h1>
    <router-view></router-view>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "App",
  router,
  data() {
    return {
      msg: "Welcome to Horter",
    };
  },
};
</script>
