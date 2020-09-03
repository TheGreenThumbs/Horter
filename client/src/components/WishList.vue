<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">WISH LIST</p>
    </div>
    <div class="card-content">
      <b-field>
        <b-input
          placeholder="Search..."
          type="search"
          icon="magnify"
          icon-clickable
          @icon-click="searchIconClick"
        >
        </b-input>
      </b-field>
    </div>
  </div>
</template>
<script>
export default {
  name: "Wish",
  methods: {
    searchIconClick() {
      alert("You wanna make a search?");
    },
    clearIconClick() {
      this.search = "";
      alert("Email cleared!");
    },
  },
};
</script>
