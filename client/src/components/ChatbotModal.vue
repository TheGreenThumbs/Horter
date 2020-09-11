<template>
  <section>
    <div class="buttons" id="chatbot-buttons">
      <button class="button" id="chatbot-button" @click="cardModal()">
        <b-icon icon="robot"></b-icon>
      </button>
    </div>
  </section>
</template>

<script>
import { mdiBarley } from "@mdi/js";
import Chatbot from "./Chatbot.vue";
export default {
  name: "chatbot",
  methods: {
    cardModal() {
      this.$buefy.modal.open({
        parent: this,
        component: Chatbot,
        hasModalCard: false,
        trapFocus: false,
        width: "80vw",
      });
    },
  },
  data() {
    return {
      mdiBarley,
    };
  },
};
</script>

<style lang="sass">
#chatbot-button
  background-color: limegreen
  margin-bottom: 0
#chatbot-buttons
  margin-bottom: 0
</style>
