<template>
  <div class="divclass">
    <h2 class="header">My Chat With Chatbot</h2>
    <br />
    <ul v-for="(m, index) in messages" v-bind:key="index">
      <div class="message">
        <li v-if="m[0] === 'ChatBot'" class="message-chatbot">
          {{ m[0] }}: {{ m[1] }}
        </li>
        <li v-else class="message-user">{{ m[0] }}: {{ m[1] }}</li>
      </div>
      <br />
    </ul>
    <br />
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
.header {
  text-align: center;
}
.divclass {
  color: white;
  background-color: green;
  border-radius: 10px;
}
.message {
  color: grey;
}
.message-chatbot {
  color: black;
  text-align: right;
  padding-right: 30px;
}
.message-user {
  color: black;
  padding-left: 30px;
}
</style>
