<template>
  <div>
    <navigation></navigation>
    <div class="chatbot">
      <chatbotmodal></chatbotmodal>
    </div>
    <router-view :user="user"></router-view>
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";
import ChatbotModal from "./ChatbotModal.vue";
import router from "../router";
import axios from "axios";

export default {
  name: "App",
  router,
  components: {
    navigation: Navigation,
    chatbotmodal: ChatbotModal,
  },
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.$log.debug("test", 123);
    this.$log.info("test", 456);
    this.$log.warn("test");
    this.$log.error("test");
    this.$log.fatal("test");
    axios({
      method: "get",
      url: "/auth",
    })
      .then(({ data }) => {
        this.user = data;
      })
      .catch((err) => {
        $log.error(err);
      });
  },
};
</script>
