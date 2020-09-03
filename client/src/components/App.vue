<template>
  <div>
    <navigation></navigation>
    <div class="chatbot">
      <chatbotmodal></chatbotmodal>
    </div>
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
};
</script>
