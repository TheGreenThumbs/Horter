<template>
  <div class="ui segment">
    <div class="ui grid container">
      <div class="ui segment">
        <carousel-3d height="500">
          <slide
            class="garden-slide"
            :index="i"
            v-for="(garden, i) in gardens"
            :key="i"
          >
            {{ garden.name }}
            <b-image ratio="1by1" class="garden-photo" :src="garden.photo" />
            <b-button
              class="garden-button"
              @click="goToGarden(garden.id)"
              type="is-success"
              >Check out Garden</b-button
            >
          </slide>
        </carousel-3d>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Carousel3d, Slide } from "vue-carousel-3d";

Vue.use(Carousel3d);

export default {
  name: "Carousel",

  components: {
    "carousel-3d": Carousel3d,
    slide: Slide,
  },
  props: ["gardens"],
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.is-active
  .al
    img
      border: 1px solid #fff
      filter: grayscale(0%)

.al
  img
    border: 1px solid transparent
    filter: grayscale(100%)

.garden-slide
  display: flex
  flex-direction: column

.garden-button
  margin: 10px auto
</style>
