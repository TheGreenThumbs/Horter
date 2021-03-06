<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">{{ name }}</p>
    </div>
    <b-button
      @click="$router.push({ path: '/argarden', query: { id: gardenId } })"
      type="is-success"
      >AR View</b-button
    >
    <div class="card-content" id="garden-info" ref="gardenInfo">
      <div class="columns">
        <div class="column is-3">
          <div class="lat">Latitude: {{ location.lat.toFixed(6) }}</div>
        </div>
        <div class="column is-3">
          <div class="lng">Longitude: {{ location.lng.toFixed(6) }}</div>
        </div>
        <div class="column is-3">
          <div class="width">Width: {{ gardenSize.width }}</div>
        </div>
        <div class="column is-3">
          <div class="height">Height: {{ gardenSize.height }}</div>
        </div>
      </div>
      <garden-layout
        :selected.sync="selected"
        :gardenSize="gardenSize"
        :plants="plantList"
        v-on:plant-moved="plantMoved"
        :width="screenWidth"
        :gardenOwned="gardenOwned"
      ></garden-layout>
      <div v-if="selected > 0" id="plant-info">
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img :src="selectedPlant.photo_url" />
            </p>
          </figure>
          <div class="media-content">
            <plantDetails
              :plant="selectedPlant"
              :displayName="displayName"
            ></plantDetails>
          </div>
        </article>
        <div v-if="gardenOwned" class="sliders">
          <b-field label="Plant scale">
            <b-slider
              size="is-small"
              :min="sliderMin"
              :max="sliderMax"
              :step="2"
              :rounded="rounded"
              :tooltip="false"
              v-model="sliderValue"
              @change="sliderChange"
            >
              <template v-for="scale in [2, 4, 6, 8, 10]">
                <b-slider-tick
                  id="tick"
                  :value="scale"
                  :key="scale"
                ></b-slider-tick>
              </template>
            </b-slider>
          </b-field>
        </div>
        <div v-if="gardenOwned" class="buttons">
          <b-button
            class="plant-button"
            type="is-warning"
            icon-left="minus-circle"
            @click="removePlantButtonClick()"
          >
            Remove Plant from Garden
          </b-button>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="footer-buttons card-footer-item">
        <div class="footer-buttons-top-row" v-if="gardenOwned">
          <b-button
            type="is-success"
            class="card-footer-item"
            icon-left="plus-circle"
            @click="$router.push({ name: 'wish', params: { gardenId } })"
          >
            Add Plant
          </b-button>

          <editmodal
            :id="gardenId"
            :name="name"
            :lat="location.lat"
            :lng="location.lng"
            :width="gardenSize.width"
            :height="gardenSize.height"
            :updateMain="updateMain"
          ></editmodal>
          <b-button
            type="is-danger"
            icon-left="minus-circle"
            @click="deleteGarden(gardenId)"
          >
            Delete This Garden
          </b-button>
        </div>
        <div>
          <router-link
            :to="{ name: 'nearbystores', params: { location: location } }"
          >
            <b-button
              class="card-footer-item"
              icon-left="google-maps"
              type="is-warning"
              >Locate Nearby Garden Centers</b-button
            >
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GardenLayout from "./GardenLayout.vue";
import PlantDetails from "./PlantDetails.vue";
import EditModal from "./EditModal.vue";
import axios from "axios";
import router from "../router";

export default {
  name: "GardenMain",
  components: {
    "garden-layout": GardenLayout,
    plantDetails: PlantDetails,
    editmodal: EditModal,
  },
  data() {
    return {
      gardenSize: { width: 10, height: 10 },
      name: "",
      location: { lat: 29, lng: -90 },
      gardenId: 0,
      plantList: [
        { position_x: 1, position_y: 2, radius: 2, id: 1 },
        { position_x: 5, position_y: 4, radius: 2, id: 2 },
        { position_x: 1, position_y: 5, radius: 4, id: 3 },
      ],
      ownerId: -1,
      selected: -1,
      displayName: true,
      msg: "Garden Main Page",
      screenWidth: 0,
      rounded: true,
      sliderMin: 2,
      sliderMax: 10,
      sliderValue: -1,
    };
  },
  props: ["user", "gardens"],
  computed: {
    selectedPlant: function () {
      let plantInGarden = this.plantList.filter(
        (i) => i.id === this.selected
      )[0];
      this.sliderValue = plantInGarden.radius;
      let plant = plantInGarden.plant;
      return plant;
    },
    gardenOwned() {
      return this.user.id === this.ownerId;
    },
  },
  methods: {
    plantMoved: function (info, collide) {
      this.plantList.forEach((plant, i) => {
        if (plant.id === this.selected) {
          const newPlant = { ...plant, ...info };
          axios({
            method: "put",
            url: "/garden/locationdata",
            data: {
              id: plant.id,
              info,
            },
          })
            .then(() => {
              this.$set(this.plantList, i, { ...plant, ...info });
            })
            .catch((err) => {
              this.$log.error(err);
              this.$buefy.toast.open({
                message: "Problem Moving Plant",
                type: "id-danger",
                duration: 1000,
              });
            });
        }
      });
    },
    updateMain: function (garden) {
      const { id, lat, lng, width, length, name } = garden.data;
      this.gardenSize = { width, height: length };
      this.name = name;
      this.location = { lat, lng };
    },
    loadGardens: function (id) {
      axios({
        method: "GET",
        url: "/garden/one",
        params: { id },
      })
        .then(({ data }) => {
          this.$log.info(data);
          this.ownerId = data.userId;
          this.plantList = data.plants;
          this.gardenId = data.id;
          this.gardenSize.height = data.length;
          this.gardenSize.width = data.width;
          this.location.lat = data.lat;
          this.location.lng = data.lng;
          this.name = data.name;
        })
        .catch((err) => {
          this.$buefy.toast.open({
            message: `Error finding garden ${id}`,
            type: "is-danger",
            duration: 1000,
          });
          this.$log.error(err);
        });
    },
    deleteGarden(gardenId) {
      if (confirm("Are you sure you want to delete?")) {
        axios({
          method: "DELETE",
          url: "garden/deletegarden",
          data: { id: gardenId },
        })
          .then((data) => {
            let newGardens = [...this.gardens];
            newGardens = newGardens.filter((g) => g.id !== gardenId);
            this.$emit("update:gardens", newGardens);
            this.$buefy.toast.open({
              message: "Garden Deleted",
              type: "is-success",
              duration: 1000,
            });
            router.push({
              name: "profile",
            });
          })
          .catch((err) => console.log(err));
      }
    },
    sliderChange(radius) {
      axios({
        method: "PUT",
        url: "/garden/locationdata",
        data: {
          id: this.selected,
          info: { radius },
        },
      })
        .then(({ data }) => {
          this.$log.info(data);
          this.plantList.filter(
            (i) => i.id === this.selected
          )[0].radius = radius;
          this.selectedPlant.radius = radius;
        })
        .catch((err) => {
          this.$buefy.toast.open({
            message: `Error finding garden ${id}`,
            type: "is-danger",
            duration: 1000,
          });
          this.$log.error(err);
        });
    },
    removePlantButtonClick() {
      axios({
        method: "DELETE",
        url: "/garden/deleteplant",
        data: { id: this.selected },
      })
        .then(() => {
          this.loadGardens(this.gardenId);
          this.selected = -1;
        })
        .catch((err) => {
          this.$buefy.toast.open({
            message: `Error deleting plant ${plantId}`,
            type: "is-danger",
            duration: 1000,
          });
          this.$log.error(err);
        });
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.loadGardens(this.$route.query.id);
      this.screenWidth = this.$refs.gardenInfo.clientWidth;
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to.query.id);
    this.loadGardens(to.query.id);
    next();
  },
};
</script>

<style lang="sass">
#plant-info
  width: 100%
#garden-info
  display: flex
  flex-direction: column
  align-items: center
.footer-buttons
  display: flex
  flex-direction: column
.footer-buttons-top-row
  display: flex
  flex-flow: column wrap
  margin: 10px auto
  button
    margin: 5px
.plant-button
  margin: 0 auto
</style>
