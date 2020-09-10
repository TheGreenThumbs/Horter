<template>
  <div class="card login-card">
    <div class="card-header login-title">
      <div class="card-image">
        <img :src="imageUrl" alt="Logo" />
      </div>
      <h1 class="card-header-title logo-title">Horter</h1>
    </div>
    <div class="card-content login-content">
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

<style lang="sass">
.login-card
  max-width: 200px
  margin: 20vh auto
.login-title
  display: flex
  flex-direction: column
  align-items: center
.logo-title
  color: $green
  font-size: 3em
.login-content
  display: flex
  flex-direction: column
  align-items: center
</style>
