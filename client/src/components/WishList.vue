<!-- Renders search field and search results -->

<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">WISH LIST</p>
    </div>
    <div class="card-content">
      <!-- Search field begins -->
      <b-field>
        <b-input
          v-model="keyword"
          type="search"
          placeholder="Search..."
          icon="magnify"
          icon-clickable
          @icon-click="searchIconClick"
        >
        </b-input>
      </b-field>
      <!-- Search field ends -->
      <!-- Search results begins -->
      <div v-if="loaded">
        <article
          class="media"
          v-for="plant in results"
          :key="plant.common_name"
        >
          <figure class="media-left"></figure>
          <div class="media-content">
            <div class="content">
              <p>
                {{ plant.common_name }}
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <b-button
                  size="is-small"
                  icon-left="plus-circle"
                  @click="wishButtonClick(plant.id, plant.slug)"
                  :active="wishClicked.includes(plant.id)"
                >
                  <span v-if="!wishClicked.includes(plant.id)"
                    >Add to Wishlist</span
                  >
                  <span v-else>Included in Wishlist</span>
                </b-button>
                <b-button
                  size="is-small"
                  icon-left="plus-circle"
                  @click="gardenButtonClick(plant.id, plant.slug)"
                >
                  Add to Garden
                </b-button>
              </div>
            </nav>
          </div>
        </article>
      </div>
      <div v-else>
        <wishListSkeleton></wishListSkeleton>
      </div>
      <!-- Search results ends -->

      <!-- <suspense>
        <template #default> -->
      <!-- </template>
        <template #fallback>
          <wishListSkeleton></wishListSkeleton>
        </template>
      </suspense> -->
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
  methods: {
    searchIconClick() {
      this.loaded = false;
      axios
        .get("/api/search", {
          params: {
            q: this.keyword,
          },
        })
        .then((res) => {
          this.results = res.data;
          console.log(this.results);
        })
        .catch((err) => {
          console.error(err);
        });
      this.keyword = "";
      this.loaded = true;
    },
    clearIconClick() {
      this.search = "";
    },
    wishButtonClick(treflePlantId, treflePlantSlug) {
      axios
        .post("/wishlist", {
          plantId: treflePlantId,
          slug: treflePlantSlug,
          userId: this.user.id,
        })
        .then((res) => {
          this.$log.info(res);
        })
        .catch((err) => {
          console.error(err);
        });
      const wishIndex = this.wishClicked.indexOf(treflePlantId);
      if (wishIndex > -1) {
        console.log("Remove", wishIndex, this.wishClicked);
        this.wishClicked.splice(wishIndex, 1);
      } else {
        console.log("Add", treflePlantId, this.wishClicked);
        this.wishClicked.push(treflePlantId);
      }
      this.keyword = "";
    },
    gardenButtonClick(treflePlantId, treflePlantSlug) {
      console.log(this.gardenId);
      axios
        .post("/garden/addplant", {
          plantId: treflePlantId,
          slug: treflePlantSlug,
          gardenId: this.gardenId,
        })
        .then((res) => {
          this.$log.info(res);
        })
        .catch((err) => {
          console.error(err);
        });
      this.keyword = "";
      this.$router.push("garden");
    },
  },
  data() {
    return {
      loaded: false,
      keyword: "",
      results: [],
      wishClicked: [],
    };
  },
  props: ["plant", "user"],

  mounted() {
    if (this.plant !== undefined) {
      this.keyword = this.plant;
      this.searchIconClick();
    }
  },
};
</script>
