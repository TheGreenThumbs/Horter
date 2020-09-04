<template>
  <div class="ui segment">
    <div class="ui grid container">
      <div class="four wide column" :user="user">
        <img class="ui tiny avatar image" :src="user.photoUrl">
      </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'UserProfileHeader',
    props: {
      user: {
        type: Object,
        required: true
      },
      // authUser: {
      //   type: Object,
      //   required: true
      // }
    },
    // computed: {
    //   isOwner () {
    //     return this.user.id === this.authUser.id
    //   },
    //   isLoggedIn () {
    //     return !!this.authUser
    //   },
    // },
  }
</script>