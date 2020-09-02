<template>
  <section>
    <b-sidebar
      type="is-light"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :left="left"
      v-model="open"
    >
      <div class="divclass">
        <ul v-for="(m, index) in messages" v-bind:key="index">
          <div>
            <li>{{ m[0] }}: {{ m[1] }}</li>
          </div>
        </ul>
        <message v-on:submit:message="submitMessage" />
      </div>
    </b-sidebar>
    <!-- Next line is Hamburger menu button -->
    <b-button @click="open = true"><b-icon icon="menu"></b-icon></b-button>
  </section>
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
      open: false,
      overlay: true,
      fullheight: true,
      fullwidth: false,
      left: false,
      rounded: true,
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
