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
import Fuse from "fuse.js";
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
      page: "",
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
          if (data.data.page !== undefined) {
            this.page = data.data.page;
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
            const fuse = new Fuse(gardens.data, { keys: ["name"] });
            const result = fuse.search(this.gardenName);
            let gardenId = result[0].item.id;
            setTimeout(() => {
              this.$emit("close");
            }, 1000);

            router
              .push({
                name: "wish",
                params: {
                  plant: this.plant,
                  gardenId,
                },
                query: {
                  name: this.plant,
                  gardenId,
                },
              })
              .then((data) => this.$log(data))
              .catch((err) => this.$log(err));
          } else if (this.page) {
            if (this.page.includes("create") || this.page.includes("add")) {
              setTimeout(() => {
                this.$emit("close");
              }, 1000);
              router.push({
                name: "addgarden",
              });
            } else if (this.page.includes("garden")) {
              setTimeout(() => {
                this.$emit("close");
              }, 1000);
              router.push({
                name: "garden",
              });
            } else if (this.page.includes("wish")) {
              setTimeout(() => {
                this.$emit("close");
              }, 1000);
              router.push({
                name: "wish",
              });
            } else if (this.page.includes("friends")) {
              setTimeout(() => {
                this.$emit("close");
              }, 1000);
              router.push({
                name: "friend",
              });
            } else if (this.page.includes("nearby stores")) {
              setTimeout(() => {
                this.$emit("close");
              }, 1000);
              router.push({
                name: "nearbystores",
              });
            } else if (this.page.includes("profile")) {
              setTimeout(() => {
                this.$emit("close");
              }, 1000);
              router.push({
                name: "profile",
              });
            }
          } else {
            let string = "";
            if (gardens.data.length > 0) {
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
            } else {
              setTimeout(() => {
                this.$emit("close");
              }, 1000);
              router.push({
                name: "wish",
              });
            }
          }
        })
        .catch((err) => {
          this.$log.error(err);
        });
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
