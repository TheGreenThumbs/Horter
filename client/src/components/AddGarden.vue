<template>
  <section class="add-garden">
    <b-field label="Garden Name">
      <b-input v-model="name" placeholder="Garden Name"></b-input>
    </b-field>
    <add-photo :photo.sync="photo"></add-photo>
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
      :options="{
        streetViewControl: false,
        mapTypeControl: false,
      }"
    >
      <GmapMarker :position="position" />
    </GmapMap>
    <b-button @click="onSubmit" type="is-success">Add Garden</b-button>
  </section>
</template>

<script>
import axios from "axios";
import AddPhoto from "./AddPhoto.vue";
export default {
  name: "AddGarden",
  props: ["user"],
  components: {
    "add-photo": AddPhoto,
  },
  data() {
    return {
      name: "",
      width: "",
      length: "",
      position: {
        lat: 29.9855645,
        lng: -90.1027271,
      },
      photo: null,
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
    verifyForm() {
      let valid = true;
      let message = "";
      if (!this.name.length) {
        message = "Garden must have a name";
        valid = false;
      }
      if (this.length <= 0) {
        message = "Length must be higher than 0";
        valid = false;
      }
      if (this.width <= 0) {
        message = "Width must be higher than 0";
        valid = false;
      }
      if (!this.photo) {
        message = "Garden must have a photo";
        valid = false;
      }
      if (valid) {
        return true;
      }
      this.$buefy.toast.open({
        duration: 1000,
        message,
        type: "is-danger",
      });
      return false;
    },
    onSubmit() {
      if (!this.verifyForm()) {
        return;
      }
      const formData = new FormData();
      const newGarden = {
        name: this.name,
        width: this.width,
        length: this.length,
        lat: this.position.lat,
        lng: this.position.lng,
        userId: this.user.id,
      };
      formData.append("photo", this.photo);
      formData.append("garden", JSON.stringify(newGarden));
      axios({
        method: "post",
        url: "/garden",
        data: formData,
        config: {
          headers: {
            "Content-type": "multipart/form-data",
          },
        },
      })
        .then(({ data }) => {
          this.$buefy.toast.open({
            message: "Successfully made Garden",
            type: "is-success",
            duration: 1000,
          });
          this.$router.push({
            path: "/garden",
            query: { id: data.id },
          });
        })
        .catch((err) => {
          this.$buefy.toast.open({
            message: "Error creating Garden",
            type: "is-danger",
            duration: 1000,
          });
          this.$log.error(err);
        });
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
