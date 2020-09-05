<template>
  <div>
    <navigation></navigation>
    <div class="chatbot">
      <chatbotmodal></chatbotmodal>
    </div>
    <div class="garden-main">
      <gardenmain></gardenmain>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";
import ChatbotModal from "./ChatbotModal.vue";
import GardenMain from "./GardenMain.vue";
import router from "../router";

export default {
  name: "App",
  router,
  components: {
    navigation: Navigation,
    chatbotmodal: ChatbotModal,
    gardenmain: GardenMain,
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
