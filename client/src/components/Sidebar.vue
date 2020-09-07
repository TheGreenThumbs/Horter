<!-- Renders hamburger menu button and left sidebar menu -->

<template>
  <section>
    <!-- Left sidebar menu begins -->
    <b-sidebar
      type="is-light"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      v-model="open"
    >
      <div class="p-1">
        <b-image
          src="https://picsum.photos/600/400"
          alt="A random image"
          ratio="4by4"
          :rounded="rounded"
        ></b-image>
        <b-menu>
          <b-menu-list label="Horter"></b-menu-list>
          <b-menu-list label="Menu">
            <b-menu-item
              icon="home"
              @click="$router.push('/')"
              label="Home"
            ></b-menu-item>
            <b-menu-item
              icon="sprout"
              label="Profile"
              @click="$router.push('UserProfile')"
            ></b-menu-item>
            <b-menu-item
              icon="sprout"
              label="Plant List"
              disabled
            ></b-menu-item>
            <b-menu-item
              icon="sprout-outline"
              label="Wish List"
              @click="$router.push('wish')"
            ></b-menu-item>
            <b-menu-item
              icon="information-outline"
              label="New Plant"
              disabled
            ></b-menu-item>
            <b-menu-item icon="account">
              <template slot="label" slot-scope="props">
                Friends
                <b-icon
                  class="is-pulled-right"
                  :icon="props.expanded ? 'menu-down' : 'menu-up'"
                ></b-icon>
              </template>
              <b-menu-item label="Friend1"></b-menu-item>
              <b-menu-item label="Friend2"></b-menu-item>
            </b-menu-item>
          </b-menu-list>
          <b-menu-list label="Actions">
            <a href="/auth/logout">
              <b-menu-item label="Logout"></b-menu-item>
            </a>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
    <!-- Left sidebar menu ends -->
    <!-- Hamburger menu button begins -->
    <b-button class="nav-button" @click="open = true"
      ><b-icon icon="menu"></b-icon
    ></b-button>
    <!-- Hamburger menu button ends -->
  </section>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      open: false,
      overlay: true,
      fullheight: true,
      fullwidth: false,
      right: false,
      rounded: true,
    };
  },
};
</script>
