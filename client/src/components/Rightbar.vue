<!-- Renders ellipsis menu button and right sidebar menu -->

<template>
  <section>
    <!-- Right sidebar menu begins -->
    <b-sidebar
      type="is-light"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      v-model="open"
    >
      <div class="p-1">
        <b-menu>
          <b-menu-list label="Garden Menu">
            <b-menu-item
              label="Garden1"
              @click="$router.push({ path: '/garden', query: { id: 1 } })"
            ></b-menu-item>
            <b-menu-item label="Garden2" disabled></b-menu-item>
            <b-menu-item label="Garden3" disabled></b-menu-item>
          </b-menu-list>
          <router-link to="/addgarden">
            <b-button type="is-success is-light">Add a Garden</b-button>
          </router-link>
        </b-menu>
      </div>
    </b-sidebar>
    <!-- Right sidebar menu ends -->
    <!-- Ellipsis menu button begins -->
    <b-button @click="open = true"
      ><b-icon icon="dots-vertical"></b-icon
    ></b-button>
    <!-- Ellipsis menu button ends -->
  </section>
</template>

<script>
export default {
  name: "rightbar",
  data() {
    return {
      open: false,
      overlay: true,
      fullheight: true,
      fullwidth: false,
      right: true,
      rounded: true,
    };
  },
};
</script>

<style>
.p-1 {
  padding: 1em;
}
</style>
