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
    <b-button @click="onSubmit" type="is-success">Add Garden</b-button>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "Add Garden",
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
