<!-- Renders plant thumbnail and plant modal -->

<template>
  <div class="plant-details">
    <div v-if="displayName" class="plant-row">
      <strong>{{ plant.common_name }}</strong>
    </div>
    <div v-if="plant.duration" class="plant-row">
      <div>Duration</div>
      <div>{{ plant.duration }}</div>
    </div>
    <div class="plant-row">
      <div>Edible</div>
      <div>{{ plant.edible ? "Yes" : "No" }}</div>
    </div>
    <div class="plant-row">
      <div>Vegetable</div>
      <div>{{ plant.vegetable ? "Yes" : "No" }}</div>
    </div>
    <div v-if="plant.ph_min" class="plant-row">
      <div>PH</div>
      <div>{{ plant.ph_min }} - {{ plant.ph_max }}</div>
    </div>
    <div v-if="plant.light" class="plant-row">
      <div>Light</div>
      <b-progress
        class="plant-progressbar"
        :value="plant.light * 10"
        type="is-warning"
      ></b-progress>
    </div>
    <div class="plant-row">
      <div>Rainfall</div>
      <div>
        {{ Math.floor(plant.precipitation_min / 25.4) }}" -
        {{ Math.floor(plant.precipitation_max / 25.4) }}"
      </div>
    </div>
    <div v-if="plant.temp_min" class="plant-row">
      <div>Temperature Minimum</div>
      <div>{{ plant.temp_min }}°F</div>
    </div>
    <div v-if="plant.temp_max" class="plant-row">
      <div>Temp Max</div>
      <div>{{ plant.temp_max }}°F</div>
    </div>
    <div v-if="plant.soil_nutriments" class="plant-row">
      <div>Nutriments</div>
      <b-progress
        class="plant-progressbar"
        :value="plant.soil_nutriments * 10"
        type="is-success"
      ></b-progress>
    </div>
    <div v-if="plant.soil_salinity" class="plant-row">
      <div>Salinity</div>
      <b-progress
        class="plant-progressbar"
        :value="plant.soil_salinity * 10"
        type="is-success"
      ></b-progress>
    </div>
    <div v-if="plant.soil_humidity" class="plant-row">
      <div>Humidity</div>
      <b-progress
        class="plant-progressbar"
        :value="plant.soil_humidity * 10"
        type="is-success"
      ></b-progress>
    </div>
    <div v-if="plant.soil_texture" class="plant-row">
      <div>Texture</div>
      <b-progress
        class="plant-progressbar"
        :value="plant.soil_texture * 10"
        type="is-success"
      ></b-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlantDetails",
  data() {
    return {};
  },
  props: ["plant", "displayName"],
  methods: {},
};
</script>

<style lang="sass">
.plant-details
  width: 100%
  display: flex
  flex-direction: column
  align-items: flex-start
.plant-row
  width: 100%
  display: flex
  justify-content: space-between
  border-bottom: 1px solid #e3e3e3
.plant-row:last-child
  border-bottom: none
.plant-progressbar
  width: 100%
  padding-left: 10px
  padding-top: 3px
</style>
