<template>
  <div class="chatbot-modal">
    <h2 class="header">My Chat With Chatbot</h2>
    <div class="chatbot-box">
      <div :class="messageClass(m[0])" v-for="(m, i) in messages" :key="i">
        <p>{{ m[0] }}: {{ m[1] }}</p>
      </div>
    </div>
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
  props: ["user"],

  data: function () {
    return {
      gardenName: "",
      plant: "",
      messages: [["ChatBot", "Hey there! How can I help?"]],
    };
  },
  methods: {
    messageClass: (speaker) => `chatbot-message ${speaker}`,
    submitMessage(message) {
      let mArray = [];
      let plant = "";
      this.messages.push(["User", message]);
      axios({
        method: "GET",
        url: "/chatbot",
        params: {
          message: message,
        },
      })
        .then((data) => {
          if (data.data.garden !== undefined) {
            this.gardenName = data.data.garden;
          }
          if (data.data.plant !== undefined) {
            this.plant = data.data.plant;
          }
          this.messages.push(["ChatBot", data.data.response]);
          return axios({
            method: "GET",
            url: "/garden/user",
            params: {
              id: this.user.id,
            },
          });
        })
        .then((gardens) => {
          if (this.gardenName) {
            let gardenid = this.gardens.data
              .filter((g) => g.name === this.gardenName)
              .map((g) => g.id);
            console.log(gardenId);
          } else {
            let string = "";
            gardens.data.map((g) => {
              string += `${g.name}, `;
            });
            this.messages.push([
              "ChatBot",
              `Was there a particular garden you were searching plants for? I have: ${string.slice(
                0,
                -2
              )}`,
            ]);
          }

          // setTimeout(() => {
          //   this.$emit("close");
          // }, 1000);

          // router.push({
          //   name: "wish",
          //   params: {
          //     plant: plant,
          //   },
          // });
        })
        .catch((err) => {
          this.$log.error(err);
        });

      // i would like to plant [] in my garden
      // show me a list of [] plants
      // could you recommend any []
      // mArray = message.split(" ");
      // if (mArray.includes("plant")) {
      //   let index = mArray.indexOf("plant") + 1;
      //   plant = mArray[index];
      //   this.$emit("close");
      //   router.push({
      //     name: "wish",
      //     params: {
      //       plant: plant,
      //     },
      //   });
      // } else if (mArray.includes("recommend")) {
      //   let index = mArray.indexOf("recommend") + 2;
      //   plant = mArray[index];
      //   this.$emit("close");
      //   router.push({
      //     name: "wish",
      //     params: {
      //       plant: plant,
      //     },
      //   });
      // }

      // this.messages.push(["ChatBot", "great!"]);
    },
  },
};
</script>

<style scoped lang="sass">
.header
  text-align: center

.chatbot-box
  display: flex
  flex-direction: column
  align-items: flex-start
  padding: 20px 5px

.ChatBot
  align-self: flex-end

.chatbot-message
  background-color: #e6e6e6
  border-radius: 10px
  color: black
  padding: 5px
  max-width: 80%
  margin: 5px 0

.chatbot-modal
  color: white
  background-color: green
  border-radius: 10px
</style>
