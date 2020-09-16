<!-- Renders plant thumbnail and plant modal -->

<template>
  <div class="plant-details">
    <div v-if="displayName">
      <strong>{{ plant.common_name }}</strong>
    </div>
    <div v-if="plant.duration" class="columns is-mobile is-8">
      <div class="column is-one-third">Duration</div>
      <div class="column">
        {{ plant.duration }}
      </div>
    </div>
    <div class="columns is-mobile is-8">
      <div class="column is-one-third">Edible</div>
      <div class="column">
        {{ plant.edible ? "Yes" : "No" }}
      </div>
    </div>
    <div class="columns is-mobile is-8">
      <div class="column is-one-third">Vegetable</div>
      <div class="column">
        {{ plant.vegetable ? "Yes" : "No" }}
      </div>
    </div>
    <div v-if="plant.ph_min" class="columns is-mobile is-8">
      <div class="column is-one-quarter">PH</div>
      <div class="column">{{ plant.ph_min }} - {{ plant.ph_max }}</div>
    </div>
    <div v-if="plant.light" class="columns is-mobile is-8">
      <div class="column is-one-quarter">Light</div>
      <div class="column">
        <b-progress :value="plant.light * 10" type="is-warning"></b-progress>
      </div>
    </div>
    <div class="columns is-mobile is-8">
      <div class="column is-one-quarter">Rainfall</div>
      <div class="column">
        {{ Math.floor(plant.precipitation_min / 25.4) }}" -
        {{ Math.floor(plant.precipitation_max / 25.4) }}"
      </div>
    </div>
    <div v-if="plant.temp_min" class="columns is-mobile is-8">
      <div class="column">Temperature Minimum</div>
      <div class="column">{{ plant.temp_min }}°F</div>
    </div>
    <div v-if="plant.temp_max" class="columns is-mobile is-8">
      <div class="column is-one-quarter">Temp Max</div>
      <div class="column">{{ plant.temp_max }}°F</div>
    </div>
    <div v-if="plant.soil_nutriments" class="columns is-mobile is-8">
      <div class="column is-one-quarter">Nutriments</div>
      <div class="column">
        <b-progress
          :value="plant.soil_nutriments * 10"
          type="is-success"
        ></b-progress>
      </div>
    </div>
    <div v-if="plant.soil_salinity" class="columns is-mobile is-8">
      <div class="column is-one-quarter">Salinity</div>
      <div class="column">
        <b-progress
          :value="plant.soil_salinity * 10"
          type="is-success"
        ></b-progress>
      </div>
    </div>
    <div v-if="plant.soil_humidity" class="columns is-mobile is-8">
      <div class="column is-one-quarter">Humidity</div>
      <div class="column">
        <b-progress
          :value="plant.soil_humidity * 10"
          type="is-success"
        ></b-progress>
      </div>
    </div>
    <div v-if="plant.soil_texture" class="columns is-mobile is-8">
      <div class="column is-one-quarter">Texture</div>
      <div class="column">
        <b-progress
          :value="plant.soil_texture * 10"
          type="is-success"
        ></b-progress>
      </div>
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
