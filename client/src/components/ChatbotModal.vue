<template>
  <section>
    <div class="buttons">
      <button class="button" @click="cardModal()">
        <b-icon icon="sprout-outline"></b-icon>
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
        customClass: "custom-class custom-class-2",
        trapFocus: false,
        width: 400,
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

<style scoped>
.button {
  background-color: limegreen;
}
.buttons {
  color: green;
}
</style>
