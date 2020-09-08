<template>
  <div>
    <navigation v-if="user.id" :user="user"></navigation>
    <router-view v-if="user.id" :user="user"></router-view>
    <login v-else></login>
    <chatbotmodal v-if="user.id" class="chatbot"></chatbotmodal>
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";
import ChatbotModal from "./ChatbotModal.vue";
import UserProfile from "./Profile/user-profile.vue";
import Login from "./Login.vue";
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
    login: Login,
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
