<template>
  <section>
    <div class="buttons">
      <button class="button is-green" @click="cardModal()">
        <b-icon icon="menu"></b-icon>
      </button>
    </div>
  </section>
</template>

<script>
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
        "full-screen": false,
        width: 400,
      });
    },
  },
};
</script>

<style scoped>
.button {
  color: green;
}
.buttons {
  color: green;
}
</style>
