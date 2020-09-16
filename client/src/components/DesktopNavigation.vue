<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        Horter
        <img id="brand-image" :src="brandImageUrl" />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: 'UserProfile' }">
        Profile
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: 'plant' }">
        Plantlist
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: 'wish' }">
        Wishlist
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: 'FriendSearch' }">
        Search Friends
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item v-if="!user.id" tag="a" href="/auth/google">
        Login
      </b-navbar-item>
      <b-navbar-item v-else tag="a" href="/auth/logout"> Logout </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "DesktopNavigation",
  props: ["user"],
  data() {
    return {
      brandImageUrl: require("../assets/horter.png"),
    };
  },
};
</script>

<style lang="sass">
#brand-image
  height: 40px
  margin: 10px
</style>
