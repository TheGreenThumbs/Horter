<template>
  <div class="divclass">
    <ul v-for="(m, index) in messages" v-bind:key="index">
      <div>
        <li>{{ m[0] }}: {{ m[1] }}</li>
      </div>
    </ul>
    <message v-on:submit:message="submitMessage" />
  </div>
</template>

<script>
import Message from "./Message.vue";

export default {
  name: "chatbot",
  components: {
    Message,
  },
  data: function () {
    return {
      messages: [["ChatBot", "Hey there! How can I help?"]],
    };
  },
  methods: {
    submitMessage(message) {
      // this should ideally contact the chatbot on submit with the message, then print the response
      this.messages.push(["User", message], ["ChatBot", "no prob!"]);
    },
  },
};
</script>

<style scoped>
.divclass {
  color: white;
}
</style>
