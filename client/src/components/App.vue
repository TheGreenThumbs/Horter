<template>
  <div>
    <navigation></navigation>
    <div>
      <chatbot></chatbot>
    </div>
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
