<!-- Renders search field and search results -->

<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">PLANT LIST</p>
    </div>
    <div class="card-content">
      <!-- Plant listing begins -->
      <div v-if="loaded">
        <article class="media" v-for="plant in results" :key="plant.id">
          <figure class="media-left"></figure>
          <div class="media-content">
            <div class="content">
              <p>
                {{ plant.common_name }}
              </p>
            </div>
          </div>
        </article>
      </div>
      <div v-else>
        <wishListSkeleton></wishListSkeleton>
      </div>
      <!-- Plant listing ends -->
    </div>
  </div>
</template>

<script>
import WishListSkeleton from "./WishListSkeleton.vue";
import axios from "axios";

export default {
  name: "Wish",
  components: {
    wishListSkeleton: WishListSkeleton,
  },
  data() {
    return {
      loaded: false,
      results: [],
    };
  },
  props: ["user"],
  methods: {},
  mounted() {
    this.loaded = false;
    axios({
      method: "GET",
      url: "/garden/plants",
      params: { userId: this.user.id },
    })
      .then(({ data }) => {
        this.$log.info(data);
        this.results = data;
        this.loaded = true;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>
