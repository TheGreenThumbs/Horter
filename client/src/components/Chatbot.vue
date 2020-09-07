<template>
  <div class="divclass">
    <h2 class="header">My Chat With Chatbot</h2>
    <br />
    <!-- <div v-for="(m, index) in messages" v-bind:key="index">
      <div v-if="m[0] === 'ChatBot'" class="message-chatbot">
        <div class="content-chatbot">{{ m[0] }}: {{ m[1] }}</div>
      </div>
      <div v-else class="message-user">
        <div class="content-user">{{ m[0] }}: {{ m[1] }}</div>
      </div>
      <br />
    </div> -->
    <div class="columns" v-for="(m, index) in messages" v-bind:key="index">
      <div v-if="m[0] === 'ChatBot'">
        <div class="column is-6 chatbot">
          <div class="content-chatbot">{{ m[0] }}: {{ m[1] }}</div>
        </div>
      </div>
      <div v-else>
        <div class="column is-6 user is-pulled-right">
          <div class="content-user">{{ m[0] }}: {{ m[1] }}</div>
        </div>
      </div>
    </div>
    <br />
    <message v-on:submit:message="submitMessage" />
  </div>
</template>

<script>
import Message from "./Message.vue";
import axios from "axios";
import router from "../router";
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
      let mArray = [];
      let plant = "";
      // this should ideally contact the chatbot on submit with the message, then print the response
      this.messages.push(["User", message]);
      // axios
      //   .get("/chatbot")
      //   .then((data) => {
      //     this.messages.push(["ChatBot", data.data]);
      //   })
      //   .catch((err) => {});

      // i would like to plant [] in my garden
      // show me a list of [] plants
      // could you recommend any []
      mArray = message.split(" ");
      if (mArray.includes("plant")) {
        let index = mArray.indexOf("plant") + 1;
        plant = mArray[index];
        this.$emit("close");
        router.push({
          name: "wish",
          params: {
            plant: plant,
          },
        });
      }

      // this.messages.push(["ChatBot", "great!"]);
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
.column {
  background-color: rgb(197, 195, 195);
  padding-right: 30px;
  border-radius: 10px;
}
.content-chatbot {
  color: black;
}
.user {
  background-color: rgb(81, 68, 255);
  padding-left: 50px;
  border-radius: 10px;
  right: 0;
  position: relative;
}
.content-user {
  color: black;
}
</style>
