<template>
  <div class="buttons">
    <button class="button" @click="cardModal()">Edit Garden</button>
  </div>
</template>

<script>
import Editor from "./Editor.vue";
export default {
  name: "EditModal",
  methods: {
    cardModal() {
      this.$buefy.modal.open({
        parent: this,
        component: Editor,
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
