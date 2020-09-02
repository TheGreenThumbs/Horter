<!-- Creates hamburger button -->

<template>
  <b-button @click="open = true">
    <b-icon icon="menu"></b-icon>
  </b-button>
</template>

<script>
export default {
  name: "hamburger",
  data() {
    return {
      open: false,
    };
  },
};
</script>
