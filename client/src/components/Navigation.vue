<!-- Renders navigation bar with hamburger and ellipsis menu buttons -->

<template>
  <section id="logo-bar">
    <sidebar
      :user="user"
      class="left-sidebar"
      :swipeOpen="openLeft"
      v-on:close-sidebars="closeSidebars"
    ></sidebar>
    <rightbar
      class="right-sidebar"
      :user="user"
      :swipeOpen="openRight"
      v-on:close-sidebars="closeSidebars"
    ></rightbar>
  </section>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import Rightbar from "./Rightbar.vue";

export default {
  name: "navigation",
  props: ["user", "openLeft", "openRight"],
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
  z-index: 39
  top: 0
  left: 0
  width: 100%
  background-color: $lightGreen
.right-sidebar
  position: fixed
  top: 0
  right: 0
.left-sidebar
  position: relative
  top: 0
  left: 0
.nav-button
  border: none

.p-1
  padding: 1em
</style>
