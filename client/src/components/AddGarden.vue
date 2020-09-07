<template>
  <section class="add-garden">
    <b-field label="Garden Name">
      <b-input v-model="name" placeholder="Garden Name"></b-input>
    </b-field>
    <b-field label="Garden Width in Inches">
      <b-input
        v-model="width"
        type="number"
        placeholder="Garden Width"
      ></b-input>
    </b-field>
    <b-field label="Garden Length in Inches">
      <b-input
        v-model="length"
        type="number"
        placeholder="Garden Length"
      ></b-input>
    </b-field>
    <GmapMap
      class="add-garden-map"
      :center="mapStart"
      :zoom="14"
      map-type-id="terrain"
      style="width: 80vw; height: 300px"
      @click="mapClick"
    >
      <GmapMarker :position="position" />
    </GmapMap>
    <b-button @click="onSubmit" type="is-success">Add Garden</b-button>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "AddGarden",
  data() {
    return {
      name: "",
      width: "",
      length: "",
      position: {
        lat: 29.9855645,
        lng: -90.1027271,
      },
      photo: "",
      zone: 0,
      mapStart: {
        lat: 29.9855645,
        lng: -90.1027271,
      },
    };
  },
  methods: {
    mapClick(e) {
      this.position = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
    },
    onSubmit() {
      // axios({
      // })
    },
  },
  created() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.$log.info(latitude, longitude);
      this.mapStart.lat = +latitude;
      this.mapStart.lng = +longitude;
    });
  },
};
</script>

<style lang="sass">
.add-garden
  margin: 0 30px
.add-garden-map
  margin: 10px auto
</style>
