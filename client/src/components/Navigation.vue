<!-- Renders navigation bar with hamburger and ellipsis menu buttons -->

<template>
  <section>
    <sidebar :user="user" class="left-sidebar"></sidebar>
    <rightbar class="right-sidebar" :user="user"></rightbar>
  </section>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import Rightbar from "./Rightbar.vue";

export default {
  name: "navigation",
  props: ["user"],
  components: {
    sidebar: Sidebar,
    rightbar: Rightbar,
  },
};
</script>

<style>
.right-sidebar {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
