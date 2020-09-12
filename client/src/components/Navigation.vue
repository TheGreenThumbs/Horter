<!-- Renders navigation bar with hamburger and ellipsis menu buttons -->

<template>
  <section>
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
.right-sidebar
  position: fixed
  top: 0
  right: 0
  z-index: 39
.left-sidebar
  position: fixed
  top: 0
  left: 0
  z-index: 39

.nav-button
  border: none

.p-1
  padding: 1em
</style>
