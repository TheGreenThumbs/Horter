<template>
  <div class="ui segment">
    <div class="ui grid container">
      <div class="ui segment">
        <carousel-3d :display="gardens.length">
          <slide :index="i" v-for="(garden, i) in gardens" :key="i">
            {{ garden.name }}
            <img :src="garden.photo" />
          </slide>
        </carousel-3d>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import carousel3d from "vue-carousel-3d";
import { Carousel3d, Slide } from "vue-carousel-3d";

Vue.use(Carousel3d);

export default {
  name: "Carousel",

  components: {
    "carousel-3d": Carousel3d,
    slide: Slide,
  },
  props: ["gardens"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.is-active .al img {
  border: 1px solid #fff;
  filter: grayscale(0%);
}
.al img {
  border: 1px solid transparent;
  filter: grayscale(100%);
}
</style>
