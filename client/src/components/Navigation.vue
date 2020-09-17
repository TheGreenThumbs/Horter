<!-- Renders navigation bar with hamburger and ellipsis menu buttons -->

<template>
  <section id="logo-bar">
    <sidebar
      :user="user"
      class="left-sidebar"
      :swipeOpen="openLeft"
      v-on:close-sidebars="closeSidebars"
    ></sidebar>
    <span id="logo-text"> Horter </span>
    <img id="logo-image" :src="logoImage" />
    <rightbar
      class="right-sidebar"
      :user="user"
      :swipeOpen="openRight"
      v-on:close-sidebars="closeSidebars"
      v-bind:gardens.sync="gardens"
    ></rightbar>
  </section>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import Rightbar from "./Rightbar.vue";

export default {
  name: "navigation",
  props: ["user", "openLeft", "openRight", "gardens"],
  data() {
    return {
      logoImage: require("../assets/horterFavicon.png"),
    };
  },
  components: {
    sidebar: Sidebar,
    rightbar: Rightbar,
  },
  methods: {
    closeSidebars: function () {
      this.$emit("close-navbars");
    },
  },
};
</script>

<style lang="sass">
#logo-bar
  position: fixed
  display: inline
  z-index: 39
  top: 0
  left: 0
  width: 100%
  background-color: $lightGreen

.right-sidebar
  position: fixed
  display: inline
  top: 0
  right: 0
  button
    background-color: $lightGreen

.left-sidebar
  position: relative
  display: inline
  top: 0
  left: 0
  button
    background-color: $lightGreen

.nav-button
  border: none

.p-1
  padding: 1em

#logo-text
  margin-left: 20%
  font-size: 1.6em
  display: inline
#logo-image
  height: 30px
  position: relative
  top: 5px
</style>
