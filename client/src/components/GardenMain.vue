<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">{{ name }}</p>
    </div>
    <div class="columns">
      <div class="column is-3">
        <div class="lat">Latitude: {{ location.lat }}</div>
      </div>
      <div class="column is-3">
        <div class="lng">Longitude: {{ location.lng }}</div>
      </div>
      <div class="column is-3">
        <div class="width">Width: {{ gardenSize.width }}</div>
      </div>
      <div class="column is-3">
        <div class="height">Height: {{ gardenSize.height }}</div>
      </div>
    </div>
    <div class="card-content" id="garden-info">
      <garden-layout
        :selected.sync="selected"
        :gardenSize="gardenSize"
        :plants="plantList"
        v-on:plant-moved="plantMoved"
      ></garden-layout>
      <article v-if="selected > 0" class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img :src="selectedPlant.photo_url" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <strong>{{ selectedPlant.common_name }}</strong>
            <div v-if="selectedPlant.duration" class="columns is-mobile is-8">
              <div class="column is-one-third">Duration</div>
              <div class="column">
                {{ selectedPlant.duration }}
              </div>
            </div>
            <div class="columns is-mobile is-8">
              <div class="column is-one-third">Edible</div>
              <div class="column">
                {{ selectedPlant.edible ? "Yes" : "No" }}
              </div>
            </div>
            <div class="columns is-mobile is-8">
              <div class="column is-one-third">Vegetable</div>
              <div class="column">
                {{ selectedPlant.vegetable ? "Yes" : "No" }}
              </div>
            </div>
            <div v-if="selectedPlant.ph_min" class="columns is-mobile is-8">
              <div class="column is-one-quarter">PH</div>
              <div class="column">
                {{ selectedPlant.ph_min }} - {{ selectedPlant.ph_max }}
              </div>
            </div>
            <div v-if="selectedPlant.light" class="columns is-mobile is-8">
              <div class="column is-one-quarter">Light</div>
              <div class="column">
                <b-progress
                  :value="selectedPlant.light * 10"
                  type="is-warning"
                ></b-progress>
              </div>
            </div>
            <div class="columns is-mobile is-8">
              <div class="column is-one-quarter">Rainfall</div>
              <div class="column">
                {{ Math.floor(selectedPlant.precipitation_min / 25.4) }}" -
                {{ Math.floor(selectedPlant.precipitation_max / 25.4) }}"
              </div>
            </div>
            <div v-if="selectedPlant.temp_min" class="columns is-mobile is-8">
              <div class="column">Temperature Minimum</div>
              <div class="column">{{ selectedPlant.temp_min }}°F</div>
            </div>
            <div v-if="selectedPlant.temp_max" class="columns is-mobile is-8">
              <div class="column is-one-quarter">Temp Max</div>
              <div class="column">{{ selectedPlant.temp_max }}°F</div>
            </div>
            <div
              v-if="selectedPlant.soil_nutriments"
              class="columns is-mobile is-8"
            >
              <div class="column is-one-quarter">Nutriments</div>
              <div class="column">
                <b-progress
                  :value="selectedPlant.soil_nutriments * 10"
                  type="is-success"
                ></b-progress>
              </div>
            </div>
            <div
              v-if="selectedPlant.soil_salinity"
              class="columns is-mobile is-8"
            >
              <div class="column is-one-quarter">Salinity</div>
              <div class="column">
                <b-progress
                  :value="selectedPlant.soil_salinity * 10"
                  type="is-success"
                ></b-progress>
              </div>
            </div>
            <div
              v-if="selectedPlant.soil_humidity"
              class="columns is-mobile is-8"
            >
              <div class="column is-one-quarter">Humidity</div>
              <div class="column">
                <b-progress
                  :value="selectedPlant.soil_humidity * 10"
                  type="is-success"
                ></b-progress>
              </div>
            </div>
            <div
              v-if="selectedPlant.soil_texture"
              class="columns is-mobile is-8"
            >
              <div class="column is-one-quarter">Texture</div>
              <div class="column">
                <b-progress
                  :value="selectedPlant.soil_texture * 10"
                  type="is-success"
                ></b-progress>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
    <div class="card-footer">
      <button
        class="card-footer-item"
        @click="$router.push({ name: 'wish', params: { gardenId } })"
      >
        Add Plant
      </button>
      <editmodal
        :id="gardenId"
        :name="name"
        :lat="location.lat"
        :lng="location.lng"
        :width="gardenSize.width"
        :height="gardenSize.height"
        :updateMain="updateMain"
      ></editmodal>
    </div>
  </div>
</template>

<script>
import GardenLayout from "./GardenLayout.vue";
import EditModal from "./EditModal.vue";
import axios from "axios";

export default {
  name: "GardenMain",
  components: {
    "garden-layout": GardenLayout,
    editmodal: EditModal,
  },
  data() {
    return {
      gardenSize: { width: 10, height: 10 },
      name: "",
      location: { lat: 30, lng: 30 },
      gardenId: 0,
      plantList: [
        { position_x: 1, position_y: 2, radius: 2, id: 1 },
        { position_x: 5, position_y: 4, radius: 2, id: 2 },
        { position_x: 1, position_y: 5, radius: 4, id: 3 },
      ],
      selected: -1,
      msg: "Garden Main Page",
    };
  },
  computed: {
    selectedPlant: function () {
      return this.plantList.filter((i) => i.id === this.selected)[0].plant;
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
  },
  mounted() {
    this.$nextTick(function () {
      this.loadGardens(this.$route.query.id);
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.loadGardens(to.query.id);
    next();
  },
};
</script>

<style lang="sass">
#garden-info
  display: flex
  flex-direction: column
  align-items: center
</style>
