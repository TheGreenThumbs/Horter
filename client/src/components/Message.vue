<template>
  <div class="search">
    <form @submit.prevent="handleSubmit">
      <label>My Message</label>
      <input v-model="message" />
      <b-button @click="handleSubmit" class="submit is-info">Send</b-button>
    </form>
  </div>
</template>

<script>
export default {
  name: "message",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("submit:message", this.message);
      this.message = "";
    },
  },
};
</script>
