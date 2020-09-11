<template>
  <div>
    <div class="ui stackable grid container" v-if="user">
      <div class="four wide column">
        <img
          class="ui tiny avatar image"
          :src="user.photoUrl"
          style="border-radius: 290486px"
        />
        <h3>{{ `Welcome to @${user.username}'s garden.` }}</h3>
      </div>
      <div class="eight wide column">
        <div class="ui segment">
          <h3 class="ui medium dividing header">
            {{ `@${user.username}: ${user.status}` }}
          </h3>
          <button v-on:click="() => {}">Follow</button>
          <button v-on:click="() => {}">Unfollow</button>
        </div>
      </div>
      <div class="gardens">
        <Carousel :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import user from "../fake-data/fake-data.js";
import Carousel from "./garden-carousel.vue";

export default {
  name: "FriendProfile",
  data() {
    return {
      user: user,
      // authUser: '',
      bid: "",
    };
  },
  computed: {
    isOwner() {
      return this.user.id === this.authUser.id;
    },
    isLoggedIn() {
      return !!this.authUser;
    },
    isFollowing() {
      for (const following of this.authUser.following) {
        if (following.id === this.user.id) {
          return true;
        }
      }
      return false;
    },
    follow(userId) {
      const token = localStorage.getItem("tweetr-token");
      axios
        .post(
          "/add",
          { user_id: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          this.authUser.following.push({ id: userId });
        });
    },
    unFollow(userId) {
      const token = localStorage.getItem("tweetr-token");
      axios
        .delete(`/users/unfollow/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.authUser.following = this.authUser.following.filter((u) => {
            return u.id !== userId;
          });
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
