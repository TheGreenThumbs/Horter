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
            <p class="image is-64x64">
              <b-image
                :src="plant.photo_url"
                alt="Plant"
                ratio="4by4"
                :rounded="rounded"
              ></b-image>
            </p>
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  <br />
                  Nulla accumsan, metus ultrices eleifend gravida, nulla nunc
                  varius lectus, nec rutrum justo nibh eu lectus. <br />
                  Ut vulputate semper dui. Fusce erat odio, sollicitudin vel
                  erat vel, interdum mattis neque.
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
      rounded: true,
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
