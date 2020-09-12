<template>
  <div class="container">
    <navigation v-if="user.id" :user="user"></navigation>
    <router-view
      class="content-container"
      v-if="user.id"
      :user="user"
    ></router-view>
    <login v-else></login>
    <chatbotmodal v-if="user.id" class="chatbot" :user="user"></chatbotmodal>
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";
import ChatbotModal from "./ChatbotModal.vue";
import UserProfile from "./Profile/user-profile.vue";
import FriendProfile from "./Profile/friend-profile.vue";
import Login from "./Login.vue";
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
    friend: FriendProfile,
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
        this.$log.info(data);
        this.user = data;
      })
      .catch((err) => {
        $log.error(err);
      });
  },
};
</script>
<style lang="sass">
html, body
  height: 100%
  margin: 0
  padding: 0
.chatbot
  position: fixed
  z-index: 39
  bottom: 0
.content-container
  max-width: 800px
  margin: 0 auto
  height: 100%
  padding: 20px
</style>
