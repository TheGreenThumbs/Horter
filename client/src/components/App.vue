<template>
  <div>
    <<<<<<< HEAD
    <nav>
      <router-link to="/garden">Garden Main</router-link>
    </nav>
    <h1>{{ msg }}</h1>
    <router-view></router-view>
    =======
    <navigation></navigation>
    >>>>>>> 50224c516d670037491b589523429660e691d4ab
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";
import router from "../router";
<<<<<<< HEAD
export default {
  name: "App",
  router,
  data() {
    return {
      msg: "Welcome to Horter",
    };
=======

export default {
  name: "App",
  router,
  components: {
     navigation: Navigation
>>>>>>> 50224c516d670037491b589523429660e691d4ab
  },
};
</script>
