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
            <b-menu-item label="Delete Garden" @click="toggleGardens">
              <b-menu-item
                v-for="garden in gardens"
                :key="garden.id"
                :label="garden.name"
                @click="deleteGarden(garden.id)"
              ></b-menu-item>
            </b-menu-item>
            <!-- <div
            v-if="deleting === true"
            >
              <div
              v-for="garden in gardens"
              :key="garden.id"
              :label="garden.name"
              @click="goToGarden(garden.id)"
              >
                {{garden.name}}
              </div>
            </div> -->
          </b-menu-list>
          <router-link to="/addgarden">
            <b-button type="is-success is-light">Add a Garden</b-button>
          </router-link>
        </b-menu>
      </div>
    </b-sidebar>
    <!-- Right sidebar menu ends -->
    <!-- Ellipsis menu button begins -->
    <b-button class="nav-button" @click="open = true"
      ><b-icon icon="dots-vertical"></b-icon
    ></b-button>
    <!-- Ellipsis menu button ends -->
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "rightbar",
  props: ["user", "swipeOpen"],
  data() {
    return {
      open: false,
      overlay: true,
      fullheight: true,
      fullwidth: false,
      right: true,
      gardens: [],
      deleting: false,
    };
  },
  mounted() {
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
        this.$log.error(err);
        this.$buefy.toast.open({
          message: "Error getting gardens",
          type: "is-danger",
          duration: 1000,
        });
      });
  },
  watch: {
    swipeOpen: function () {
      this.open = this.swipeOpen;
    },
    open: function () {
      if (!this.open) {
        this.$emit("close-sidebars");
      }
    },
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
    toggleGardens() {
      this.deleting = !this.deleting;
      console.log("deleting");
    },
    deleteGarden(id) {
      axios({
        method: "DELETE",
        url: "garden/deletegarden",
        data: { id: id },
      })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    },
  },
};
</script>
