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
              v-for="garden in gardens"
              :key="garden.id"
              :label="garden.name"
              @click="goToGarden(garden.id)"
            ></b-menu-item>
            <b-menu-item
              label="Test Garden"
              @click="goToGarden(1)"
            ></b-menu-item>
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
import axios from "axios";

export default {
  name: "rightbar",
  props: ["user"],
  data() {
    return {
      open: false,
      overlay: true,
      fullheight: true,
      fullwidth: false,
      right: true,
      rounded: true,
      gardens: [],
    };
  },
  created() {
    axios({
      method: "get",
      url: "/garden/user",
      params: {
        id: this.user.id,
      },
    })
      .then(({ data }) => {
        this.$log.info(data);
        this.gardens = data;
      })
      .catch((err) => {
        this.$buefy.toast.open({
          message: "Error getting gardens",
          type: "is-danger",
          duration: 1000,
        });
      });
  },
  methods: {
    goToGarden(id) {
      this.$router
        .push({
          path: "/garden",
          query: { id },
        })
        .catch(() => {
          this.$log.info("same route");
        });
    },
  },
};
</script>

<style>
.p-1 {
  padding: 1em;
}
</style>
