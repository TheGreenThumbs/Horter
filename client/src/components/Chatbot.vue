<template>
  <div class="divclass">
    <h2 class="header">My Chat With Chatbot</h2>
    <br />
    <div v-for="(m, index) in messages" v-bind:key="index">
      <div v-if="m[0] === 'ChatBot'" class="message-chatbot">
        <div class="content-chatbot">{{ m[0] }}: {{ m[1] }}</div>
      </div>
      <div v-else class="message-user">
        <div class="content-user">{{ m[0] }}: {{ m[1] }}</div>
      </div>
      <br />
    </div>
    <br />
    <message v-on:submit:message="submitMessage" />
  </div>
</template>

<script>
import Message from "./Message.vue";
import axios from "axios";
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
      this.messages.push(["User", message]);
      axios
        .get("/chatbot")
        .then((data) => {
          this.messages.push(["ChatBot", data.data]);
        })
        .catch((err) => {});
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
.message-chatbot {
  background-color: rgb(197, 195, 195);
  width: 60%;
  padding-right: 30px;
  border-radius: 10px;
}
.content-chatbot {
  color: black;
}
.message-user {
  background-color: rgb(81, 68, 255);
  width: 60%;
  padding-left: 50px;
  border-radius: 10px;
  position: absolute;
  right: 0;
}
.content-user {
  color: white;
}
</style>
