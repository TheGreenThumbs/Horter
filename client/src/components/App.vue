<template>
  <div>
    <navigation></navigation>
    <div class="chatbot">
      <chatbotmodal></chatbotmodal>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";
import ChatbotModal from "./ChatbotModal.vue";
import router from "../router";

export default {
  name: "App",
  router,
  components: {
    navigation: Navigation,
    chatbotmodal: ChatbotModal,
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
