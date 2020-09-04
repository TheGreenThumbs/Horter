<template>
  <div>
    <UserProfileHeader
      :user="user"
    />
    <div class="ui stackable grid container">
      <div class="four wide column">
        <UserProfileSidebarDetails :user="user"/>
      </div>
      <div class="eight wide column">
        <div class="ui segment">
          <h3 class="ui medium dividing header">{{user.status}}</h3>
        </div>
      </div>
      <div class="gardens">
        <Carousel :user="user"/>
      </div>
    </div>
  </div>
</template>

<script>
  import UserProfileHeader from './UserProfileHeader.vue'
  import UserProfileSidebarDetails from './UserProfileSidebarDetails.vue'
  import Carousel from './garden-carousel.vue'
  import user from '../fake-data/fake-data.js'

  export default {
    name: 'UserProfile',
    components: {
      UserProfileSidebarDetails,
      UserProfileHeader,
      Carousel,
    },
    data () {
      return {
        user: user,
        // authUser: '',
        status: '',
      }
    },
    // beforeRouteUpdate (to, from, next) {
    //   this.fetchUser(to.params.username)
    //   next()
    // },
    // computed: {
    //   isLoggedIn () {
    //     return !!this.authUser
    //   }
    // },
    // created () {
    //   this.fetchUser(this.$route.params.username)
    //   const token = localStorage.getItem('tweetr-token')
    //   if (token) {
    //     this.fetchAuthenticatedUser(token)
    //   }
    // },
    methods: {

    }
  }
</script>