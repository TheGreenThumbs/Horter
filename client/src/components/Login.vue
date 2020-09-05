<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by4">
        <img :src="imageUrl" alt="Logo" />
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        <h1>Horter</h1>
      </div>
      <a href="/auth/google">
        <b-button type="is-info">Login</b-button>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      imageUrl: require("../assets/horter.png"),
    };
  },
};
</script>
