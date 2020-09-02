<!-- Creates/Renders hamburger menu button and sidebar menu -->

<template>
  <section>
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
            <b-menu-item icon="home" label="Home"></b-menu-item>
            <b-menu-item icon="list" label="Plant List"></b-menu-item>
            <b-menu-item
              icon="list-alt"
              label="Wish List"
              disabled
            ></b-menu-item>
            <b-menu-item
              icon="information-outline"
              label="New Plant"
            ></b-menu-item>
            <b-menu-item icon="nature">
              <template slot="label" slot-scope="props">
                Gardens
                <b-icon
                  class="is-pulled-right"
                  :icon="props.expanded ? 'menu-down' : 'menu-up'"
                ></b-icon>
              </template>
              <b-menu-item icon="nature">
                <template slot="label">
                  Gardens
                  <b-dropdown
                    aria-role="list"
                    class="is-pulled-right"
                    position="is-bottom-left"
                  >
                    <b-icon icon="dots-vertical" slot="trigger"></b-icon>
                    <b-dropdown-item aria-role="listitem"
                      >Garden1</b-dropdown-item
                    >
                    <b-dropdown-item aria-role="listitem"
                      >Garden2</b-dropdown-item
                    >
                    <b-dropdown-item aria-role="listitem"
                      >Garden3</b-dropdown-item
                    >
                  </b-dropdown>
                </template>
              </b-menu-item>
            </b-menu-item>
            <b-menu-item icon="account" label="Friends">
              <b-menu-item label="Friend1"></b-menu-item>
              <b-menu-item label="Friend2"></b-menu-item>
            </b-menu-item>
          </b-menu-list>
          <b-menu-list label="Actions">
            <b-menu-item label="Logout"></b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
    <!-- Next line is Hamburger menu button -->
    <b-button @click="open = true"><b-icon icon="menu"></b-icon></b-button>
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

<style>
.p-1 {
  padding: 1em;
}
</style>
