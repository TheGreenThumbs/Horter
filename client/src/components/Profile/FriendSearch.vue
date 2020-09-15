<template>
  <div>
    <div class="pad-15-hor pad-15-ver header">
      <div>
        <img
          src="https://listimg.pinclipart.com/picdir/s/15-153148_search-magnifying-glass-icon-black-search-icon-png.png"
          width="25px"
        />Search Friends
      </div>
    </div>
    <div class="ui stackable grid container">
      <div class="four wide column">
        <div class="pad-15-hor pad-15-ver search-parent">
          <div class="search-bar">
            <input
              name="friend"
              v-model="friend"
              v-on:change="searchFriend(friend)"
              placeholder="Search by username"
              lazy
            />
            <div
              class="friendimg"
              v-if="searched.username"
              @click="goToUser(searched.id)"
            >
              <b-image
                :src="searched.s3_id"
                padding="15%"
                ratio="4x4"
                rounded
              />
              <p>{{ searched.username }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="eight wide column">
        <div>
          <img
            src="https://www.clipartmax.com/png/middle/427-4273239_friends-icon-friends-icon-transparent-background.png"
            width="25px"
          />Friends List
        </div>
        <div class="ui segment">
          <!-- <button @click="seeFriends()">Show Friends</button> -->
          <div v-if="friends" class="friend-list">
            <div
              class="friends"
              @click="goToUser(friend.id)"
              :index="i"
              v-for="(friend, i) in friends"
              :key="i"
            >
              <b-image :src="friend.s3_id" padding="15%" ratio="2x2" rounded />
              <p>{{ friend.username }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FriendProfile from "./friend-profile.vue";
import axios from "axios";

export default {
  name: "FriendSearch",

  props: ["user"],

  data() {
    return {
      searched: {},
      friend: "",
      friends: [],
    };
  },

  mounted() {
    axios({
      method: "GET",
      url: "/friend/",
      params: {
        userId: this.user.id,
      },
    })
      .then((friends) => {
        const { data } = friends;
        console.log("data", data);
        this.friends = data;
      })
      .catch((error) => {
        console.error(error);
      });
  },

  methods: {
    searchFriend(username) {
      axios({
        method: "GET",
        url: "/user/getuser",
        params: { username },
      })
        .then((user) => {
          const { data } = user;
          this.searched = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    goToUser(user) {
      console.log("USER CLICKED");
      this.$router
        .push({
          path: "/UserProfile",
          query: { id: user },
        })
        .catch(() => {
          this.$log.info("same route");
        });
    },
  },
};
</script>

<style scoped>
input[type="text"] {
  background-color: white;
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding-left: 80px;
}

.header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding-top: 10%;
}
</style>
