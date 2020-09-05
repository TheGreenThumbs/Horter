<template>
  <div class="buttons">
    <button class="button" @click="cardModal()">Edit Garden</button>
  </div>
</template>

<script>
import Editor from "./Editor.vue";
export default {
  name: "EditModal",
  props: {
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    updateMain: {
      type: Function,
    },
  },
  methods: {
    cardModal() {
      this.$buefy.modal.open({
        parent: this,
        component: Editor,
        props: {
          id: this.id,
          name: this.name,
          lat: this.lat,
          lng: this.lng,
          width: this.width,
          height: this.height,
          updateMain: this.updateMain,
        },
        hasModalCard: false,
        customClass: "custom-class custom-class-2",
        trapFocus: true,
        width: 400,
      });
    },
  },
};
</script>
