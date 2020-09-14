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
        <article class="media" v-for="plant in results" :key="plant.id">
          <figure class="media-left">
            <p class="image is-64x64">
              <b-image :src="plant.image_url" :rounded="true"></b-image>
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                {{ plant.common_name }}
              </p>
              <p>
                {{ plant.scientific_name }}
              </p>
              <p>
                {{ plant.family_common_name }}
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
                  v-if="gardenId > -1"
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
  data() {
    return {
      loaded: false,
      keyword: "",
      results: [],
      wishClicked: [],
      gardenId: this.$route.params.gardenId || -1,
    };
  },
  props: ["plant", "user"],
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
      const wishIndex = this.wishClicked.indexOf(treflePlantId);
      if (wishIndex > -1) {
        this.wishClicked.splice(wishIndex, 1);
        axios({
          method: "DELETE",
          url: "/wishlist",
          params: {
            userId: this.user.id,
            plantId: treflePlantId,
          },
        })
          .then((res) => {
            this.$log.info(res);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        this.wishClicked.push(treflePlantId);
        axios
          .post("/wishlist", {
            userId: this.user.id,
            plantId: treflePlantId,
            slug: treflePlantSlug,
          })
          .then((res) => {
            this.$log.info(res);
          })
          .catch((err) => {
            console.error(err);
          });
      }
      this.keyword = "";
    },
    gardenButtonClick(treflePlantId, treflePlantSlug) {
      this.gardenId = this.$route.params.gardenId;
      axios
        .post("/garden/addplant", {
          gardenId: this.$route.params.gardenId,
          plantId: treflePlantId,
          slug: treflePlantSlug,
        })
        .then((res) => {
          this.$log.info(res);
        })
        .catch((err) => {
          console.error(err);
        });
      this.keyword = "";
      this.$router.push({
        path: "/garden",
        query: { id: this.gardenId },
      });
    },
  },
  mounted() {
    this.loaded = false;
    if (this.plant !== undefined) {
      this.keyword = this.plant;
      this.searchIconClick();
    }
    axios({
      method: "GET",
      url: "/wishlist",
      params: { userId: this.user.id },
    })
      .then(({ data }) => {
        this.$log.info(data);
        this.results = data
          .filter((plant) => {
            if (!this.wishClicked.includes(plant.plant.id_trefle)) {
              this.wishClicked.push(plant.plant.id_trefle);
              return plant;
            }
          })
          .map((uniquePlant) => {
            return {
              id: uniquePlant.plant.id_trefle,
              common_name: uniquePlant.plant.common_name,
              slug: uniquePlant.plant.slug,
            };
          });
      })
      .catch((err) => {
        console.error(err);
      });
    this.loaded = true;
  },
};
</script>
