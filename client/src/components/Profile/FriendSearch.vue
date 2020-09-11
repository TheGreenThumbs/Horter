<template>
  <div>
    <div class="ui stackable grid container" :user0="user0">
      <div class="four wide column">
        <input name="search" type="text" placeholder="Search Friend" />
      </div>
      <div class="eight wide column">
        <div class="ui segment">
          <img class="userimage" src="user0.photoUrl" />
          <p @click="$router.push('FriendProfile')">@{{ user0.username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import user0 from "../fake-data/fake-data.js";
import FriendProfile from "./friend-profile.vue";

export default {
  name: "FriendSearch",
  data() {
    return {
      user0: user0,
    };
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
</style>
