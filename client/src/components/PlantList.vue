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
          <figure class="media-left">
            <thumbnail :plant="plant"></thumbnail>
          </figure>
          <div class="media-content">
            <div class="content">
              <b-collapse
                aria-id="contentIdForA11y2"
                class="panel"
                animation="slide"
                v-model="plant.isOpen"
              >
                <div
                  slot="trigger"
                  class="panel-heading"
                  role="button"
                  aria-controls="contentIdForA11y2"
                >
                  <strong>{{ plant.common_name }}</strong>
                </div>
                <div class="panel-block">
                  <plantDetails :plant="plant"></plantDetails>
                </div>
              </b-collapse>
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
import PlantThumbnail from "./PlantThumbnail.vue";
import PlantDetails from "./PlantDetails.vue";
import WishListSkeleton from "./WishListSkeleton.vue";
import axios from "axios";

export default {
  name: "Plant",
  components: {
    wishListSkeleton: WishListSkeleton,
    plantDetails: PlantDetails,
    thumbnail: PlantThumbnail,
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
        this.results = data.map((plant) => {
          plant.isOpen = false;
          return plant;
        });
      })
      .catch((err) => {
        console.error(err);
      });
    this.loaded = true;
  },
};
</script>
