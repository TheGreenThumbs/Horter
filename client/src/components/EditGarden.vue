<template>
  <div class="edit">
    <form>
      <b-field label="Garden Name">
        <b-input v-model="gardenName" />
      </b-field>
      <b-field label="Latitude">
        <b-input v-model="latt" />
      </b-field>
      <b-field label="Longitude">
        <b-input v-model="long" />
      </b-field>
      <b-field label="Width">
        <b-input v-model="wid" />
      </b-field>
      <b-field label="Height">
        <b-input v-model="hei" />
      </b-field>
      <b-button @click="handleSubmit" type="is-success">Update</b-button>
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
        length: this.hei,
      });
    },
  },
};
</script>

<style lang="sass">
.edit
  padding: 20px
  background-color: lightgrey
  border-radius: 20px
  margin: 20px
</style>
