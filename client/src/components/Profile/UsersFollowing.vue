<template>
  <div>
    <UserProfileHeader
      :user="user"
      :auth-user="authUser"
    />
    <div class="ui stackable grid container">
      <div class="four wide column">
        <UserProfileSidebarDetails :user="user"/>
      </div>
    </div>
  </div>
</template>

<script>
  import UserProfileHeader from './UserProfileHeader.vue';
  import UserProfileSidebarDetails from './UserProfileSidebarDetails.vue';
  
  export default {
    name: 'UsersFollowing',
    components: {
      UserProfileHeader,
      UserProfileSidebarDetails
    },
    data () {
      return {
        user: '',
        authUser: ''
      }
    }
  }
</script>