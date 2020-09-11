<template>
  <div>
    <div class="ui stackable grid container" v-if="profile">
      <div class="four wide column">
        <img
          class="ui tiny avatar image"
          :src="profile.s3_id"
          style="border-radius: 290486px"
        />
        <h3>{{ `Welcome to your garden, @${profile.username}.` }}</h3>
      </div>
      <div class="eight wide column">
        <div class="ui segment">
          <h3 class="ui medium dividing header">
            {{ `${profile.username}: ${profile.status}` }}
          </h3>
          <b-field label="Update your Status">
            <b-input
              name="newStatus"
              type="textarea"
              v-model="newStatus"
              placeholder="What are you up to?"
            />
          </b-field>
          <b-button type="is-primary"> Update </b-button>
        </div>
      </div>
      <div class="gardens">
        <Carousel :gardens="gardens" />
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
      gardens: [],
      newStatus: "",
      profile: {},
    };
  },
  async mounted() {
    if (this.$route.query.id) {
      try {
        const response = await axios({
          method: "get",
          url: "/user/getuser",
          params: {
            id: this.$route.query.id,
          },
        });
        this.profile = response.data;
      } catch (err) {
        this.$log.error(err);
        this.$buefy.toast.open({
          duration: 1000,
          message: "User Profile Not Found",
          type: "is-danger",
        });
        return;
      }
    } else {
      this.profile = this.user;
    }
    try {
      const response = await axios({
        method: "get",
        url: "/garden/user",
        params: {
          id: this.profile.id,
        },
      });
      this.gardens = response.data;
    } catch (err) {
      this.$log.error(err);
      this.$buefy.toast.open({
        duration: 1000,
        message: "Gardens Not Found",
        type: "is-danger",
      });
      return;
    }
  },
};
</script>
