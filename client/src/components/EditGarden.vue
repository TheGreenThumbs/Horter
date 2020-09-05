<template>
  <div class="edit">
    <form @submit.prevent="handleSubmit">
      <div class="columns">
        <label class="column">Garden Name</label>
        <input v-model="gardenName" />
      </div>
      <div class="columns">
        <label class="column">Latitude</label>
        <input v-model="latitude" />
      </div>
      <div class="columns">
        <label class="column">Longitude</label>
        <input v-model="longitude" />
      </div>
      <div class="columns">
        <label class="column">Width</label>
        <input v-model="width" />
      </div>
      <div class="columns">
        <label class="column">Height</label>
        <input v-model="height" />
      </div>
      <button>Update</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditGarden",
  data() {
    return {
      gardenName: null,
      latitude: null,
      longitude: null,
      width: null,
      height: null,
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("edit:garden", {
        name: this.gardenName,
        lat: this.latitude,
        lng: this.longitude,
        width: this.width,
        height: this.height,
      });
    },
  },
};
</script>

<style scoped>
.column {
  color: white;
}
</style>
