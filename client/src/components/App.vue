<template>
  <div>
    <navigation></navigation>
    <chatbot></chatbot>
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";
import Chatbot from "./Chatbot.vue";
import router from "../router";

export default {
  name: "App",
  router,
  components: {
    navigation: Navigation,
    chatbot: Chatbot,
  },
};
</script>
