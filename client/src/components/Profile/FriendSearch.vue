<template>
  <div>
    <div class="ui stackable grid container">
      <div class="four wide column">
        <div class="pad-15-hor pad-15-ver search-parent">
          <div class="search-bar">
            <div class="status-form">
              <b-field label="Search a Friend">
                <b-input
                  name="friend"
                  type="search"
                  v-model="friend"
                  placeholder="Search by username"
                  @icon-click="searchFriend(friend)"
                  icon="magnify"
                  icon-clickable
                  lazy
                />
              </b-field>
            </div>
            <div class="friendimg" v-if="searched.username" @click="goToUser()">
              <b-image
                class="searched"
                v-if="!searched.s3_id"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                ratio="4x4"
                rounded
              />
              <b-image
                class="searched"
                v-if="searched.s3_id"
                :src="searched.s3_id"
                ratio="4x4"
                rounded
              />
              <div padding="5%" margin-top="0.5cm">
                <a class="username">{{ searched.username }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="eight wide column" padding="15%">
        <div>
          <img
            src="https://www.clipartmax.com/png/middle/427-4273239_friends-icon-friends-icon-transparent-background.png"
            width="25px"
          />Friends List
        </div>
        <div class="ui segment">
          <div v-if="friends" class="friend-list">
            <div
              @click="goToFriend(clickedFriend.id)"
              :index="i"
              v-for="(clickedFriend, i) in friends"
              :key="i"
            >
              <!-- <b-image
                class="friend"
                :src="clickedFriend.s3_id"
                ratio="2x2"
                rounded
                fluid
                contain
              /> -->
              <a>{{ clickedFriend.username }}</a>
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
      clickedFriend: {},
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
    goToUser() {
      this.$router
        .push({
          path: "/UserProfile",
          query: { id: this.searched.id },
        })
        .catch(() => {
          this.$log.info("same route");
        });
    },
    goToFriend(id) {
      this.$router
        .push({
          path: "/UserProfile",
          query: { id: id },
        })
        .catch(() => {
          this.$log.info("same route");
        });
    },
  },
};
</script>

<style scoped lang="sass">


input[type="text"]
  background-color: white
  background-position: 10px 10px
  background-repeat: no-repeat
  padding-left: 80px

.header
  display: flex
  flex-flow: row wrap
  justify-content: space-between
  padding-top: 10%

.searched
  height: 100px
  position: static
  left: 0
  width: 120px
  margin: 0
  padding: 0 0px 0 10px
  text-align: right

.friendimg
  padding-top: 25px

a
  color: #4a4a4a

.username
  padding-top: 15px
  display: block
</style>
