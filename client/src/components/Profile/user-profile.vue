<template>
  <div>
    <div class="ui stackable grid container" v-if="user">
      <div class="four wide column">
        <img
          class="ui tiny avatar image"
          :src="user.s3_id"
          style="border-radius: 290486px"
        />
        <h3>{{ `Welcome to your garden,  @${user.username}.` }}</h3>
      </div>
      <div class="eight wide column">
        <div class="ui segment">
          <h3 class="ui medium dividing header">
            {{ `Status: ${user.status}` }}
          </h3>
          <input
            name="bid"
            type="text"
            v-model="this.bid"
            placeholder="Status"
            lazy
          />
          <button
            :status="updateStatus"
            v-on:click="
              () => {
                user.status = this.bid;
                updateStatus(this.bid);
                this.bid = '';
              }
            "
          >
            Update
          </button>
          <p>@{{ user.username }}: {{ user.status }}</p>
        </div>
      </div>
      <div class="gardens">
        <Carousel :gardens="gardens" :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "./garden-carousel.vue";
import axios from "axios";

export default {
  name: "UserProfile",
  components: {
    Carousel,
  },
  props: ["user"],

  data() {
    return {
      authUser: "",
      // gardens: '/user/gardens'
      bid: "",
    };
  },

  computed: {
    isLoggedIn() {
      return !!this.authUser;
    },
  },

  methods: {
    updateStatus: (string) => {
      let newStatus;

      axios.get(`/getuser`).then((response) => {
        console.log(response);
      });
      return newStatus;
    },
  },
};
</script>
