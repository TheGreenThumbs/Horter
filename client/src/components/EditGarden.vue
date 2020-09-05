<template>
  <div class="edit">
    <form @submit.prevent="handleSubmit">
      <div class="columns">
        <label class="column">Garden Name</label>
        <input v-model="gardenName" />
      </div>
      <div class="columns">
        <label class="column">Latitude</label>
        <input v-model="latt" />
      </div>
      <div class="columns">
        <label class="column">Longitude</label>
        <input v-model="long" />
      </div>
      <div class="columns">
        <label class="column">Width</label>
        <input v-model="wid" />
      </div>
      <div class="columns">
        <label class="column">Height</label>
        <input v-model="hei" />
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
      gardenName: this.name,
      latt: this.lat,
      long: this.lng,
      wid: this.width,
      hei: this.height,
    };
  },
  props: {
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("edit:garden", {
        name: this.gardenName,
        lat: this.latt,
        lng: this.long,
        width: this.wid,
        height: this.hei,
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
