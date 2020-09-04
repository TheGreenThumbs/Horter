<template>
  <div class="edit">
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Garden Name</label>
        <input v-model="gardenName" />
      </div>
      <div>
        <label>Latitude</label>
        <input v-model="latitude" />
      </div>
      <div>
        <label>Longitude</label>
        <input v-model="longitude" />
      </div>
      <div>
        <label>Width</label>
        <input v-model="width" />
      </div>
      <div>
        <label>Height</label>
        <input v-model="height" />
        <button>Update</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditGarden",
  data() {
    return {
      gardenName: "",
      latitude: "",
      longitude: "",
      width: "",
      height: "",
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("edit:garden", {
        gardenName: this.gardenName,
        latitude: this.latitude,
        longitude: this.longitude,
        width: this.width,
        height: this.height,
      });
    },
  },
};
</script>
