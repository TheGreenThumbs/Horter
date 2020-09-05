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
      <div v-if="loaded"></div>
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
      axios
        .get("/api/search", {
          params: {
            q: this.keyword,
          },
        })
        .then((res) => {
          results = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
      this.keyword = "";
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
