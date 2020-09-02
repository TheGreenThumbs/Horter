<template>
  <div>
    <!-- Render hamburger menu button and sidebar menu -->
    <sidebar></sidebar>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";

export default {
  name: "navigation",
  components: {
    sidebar: Sidebar,
  },
};
</script>
