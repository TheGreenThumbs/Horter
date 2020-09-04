<template>
  <div class="friend-profile">
    <h1>
        Welcome to friend's garden.
    </h1>
    <!-- <UserProfileHeader
            :user="user"
            :auth-user="authUser"
        /> -->
        <div class="ui stackable grid container">
            <div class="four wide column">
                User Profile details
                <!-- <UserProfileSidebarDetails :user="user"/> -->
                    <h2 class="ui medium dividing header">Status</h2>
            </div>
             <b-button type="follow">Follow</b-button>
  <!-- <div class="bottom aligned twelve wide column">
        <div class="ui horizontal relaxed link list"> -->
          <!-- <div class="item"> -->
            <!-- <div class="content">
              <router-link :to="isOwner ? `/following` : `/${user.username}/following`">
                <div class="header">Following</div>
                <strong>{{ user.following.length }}</strong>
              </router-link>
            </div> -->
          <!-- </div> -->
          <!-- <div class="item">
            <div class="content">
              <router-link :to="isOwner ? `/followers` : `/${user.username}/followers`">
                <div class="header">Followers</div>
                <strong>{{ user.followers.length }}</strong>
              </router-link>
            </div>
          </div>            -->
        <!-- <div class="ui right floated horizontal list" v-if="isLoggedIn && !isOwner">
          <button class="ui tiny primary button" v-if="isFollowing" @click="unFollow(user.id)">Unfollow</button>
          <button class="ui tiny primary button" v-else @click="follow(user.id)">Follow</button>
        </div> -->
      <!-- </div>
    </div> -->
        </div>
  </div>
</template>


<script>
import user from '../fake-data/fake-data.js';

export default {
  name: 'FriendProfile',
  props: {
    msg: String,
    user: Object
  },
  computed: {
      isOwner () {
        return this.user.id === this.authUser.id
      },
      isLoggedIn () {
        return !!this.authUser
      },
      isFollowing () {
        for (const following of this.authUser.following) {
          if (following.id === this.user.id) {
            return true
          }
        }
        return false
      },
       follow (userId) {
        const token = localStorage.getItem('tweetr-token')
        axios
          .post(
            '/users/follow',
            { user_id: userId },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(response => {
            this.authUser.following.push({ id: userId })
          })
      },
      unFollow (userId) {
        const token = localStorage.getItem('tweetr-token')
        axios
          .delete(`/users/unfollow/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            this.authUser.following = this.authUser.following.filter(u => {
              return u.id !== userId
            })
          })
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>