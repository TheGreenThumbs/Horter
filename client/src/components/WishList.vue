<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">WISH LIST</p>
    </div>
    <div class="card-content"></div>
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
