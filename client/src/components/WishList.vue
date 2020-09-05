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
        <p v-for="plant in results" :key="plant.common_name">
          {{ plant.common_name }}
        </p>
        <br />
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
  },
  data() {
    return {
      loaded: false,
      keyword: "",
      results: [],
      rounded: true,
    };
  },
};
</script>
