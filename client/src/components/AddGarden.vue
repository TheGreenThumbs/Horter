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
      :center="{ lat: 29, lng: -90 }"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 500px"
    >
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
      lat: 29,
      lng: -90,
      photo: "",
      zone: 0,
    };
  },
  methods: {
    onSubmit() {
      // axios({
      // })
    },
  },
};
</script>

<style lang="sass">
.add-garden
  margin: 0 30px
</style>
