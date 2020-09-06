<template>
  <div>
    <div class="ui stackable grid container" v-if="user">
      <div class="four wide column">
        <img class="ui tiny avatar image" :src="user.photoUrl">
        <h3>{{`Welcome to your garden, @${user.username}.`}}</h3>
      </div>
      <div class="eight wide column">
        <div class="ui segment">
          <!-- <h3 class="ui medium dividing header">{{`Status: ${user.status}`}}</h3> -->
          <input name="bid" type="text" v-model="bid" placeholder="Status" lazy>
          <button :status="updateStatus" v-on:click="() => {
             updateStatus(this.bid);
             this.bid = '';
            }">Update
          </button>
          <p>@{{user.username}}: {{ user.status }}</p>
        </div>
      </div>
      <div class="gardens">
        <Carousel :user="user"/>
      </div>
    </div>
  </div>
</template> 

<script>
  import Carousel from './garden-carousel.vue'
  import user  from '../fake-data/fake-data.js'

  export default {
    name: 'UserProfile',
    components: {
      Carousel,
    },
    data () {
      return {
        user: user,
        // authUser: '',
        bid: '',
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
      updateStatus: (string) => {
        return user.status = string;
      }
    }
  }
</script>