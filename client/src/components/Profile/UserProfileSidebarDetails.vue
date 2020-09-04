<template>
  <div>
    <div class="ui segment">
      <div class="ui grid container">
      <div class="four wide column">
        <img class="profile-pic" alt="avatar" :src="user.photoUrl" >
      </div>
    </div>
      <h2 class="ui medium header">
        <!-- <router-link :to="`/${user.username}`">{{ user.name }}</router-link> -->
        <div class="sub header">
          <p>{{ `Welcome to your garden, @${user.username}` }}</p>
        </div>
      </h2>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserProfileSidebarDetails',
    props: {
      user: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style>

</style>