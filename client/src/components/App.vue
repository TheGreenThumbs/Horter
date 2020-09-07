<template>
  <div>
    <navigation></navigation>
    <router-view :user="user"></router-view>
    <chatbotmodal class="chatbot"></chatbotmodal>
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";
import ChatbotModal from "./ChatbotModal.vue";
import UserProfile from "./Profile/user-profile.vue";
import user from "./fake-data/fake-data.js";
import router from "../router";
import axios from "axios";

export default {
  name: "App",
  router,
  components: {
    navigation: Navigation,
    chatbotmodal: ChatbotModal,
    user: UserProfile,
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
<style scoped>
.chatbot {
  display: fixed;
  bottom: 0;
}
</style>
