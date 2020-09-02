<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">GARDEN NAME</p>
    </div>
    <div class="card-content">
      <p>
        Florem ipsum sneezeweed peruvian lily dune helleborine plumed thistle.
        Scabious st john’s wort holy grass false beard. Bloom glory lily
        drumstick gentian buttercup cosmos foxtail lily
      </p>
      <garden-layout
        :selected.sync="selected"
        :gardenSize="gardenSize"
        :plants="plantList"
        v-on:plant-moved="plantMoved"
      ></garden-layout>
      <article class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>PLANT NAME</strong><br />
              Florem ipsum sneezeweed peruvian lily dune helleborine plumed
              thistle. Scabious st john’s wort holy grass false beard.
            </p>
          </div>
        </div>
      </article>
    </div>
    <div class="card-footer">
      <button class="card-footer-item">Add Plant</button>
      <button class="card-footer-item">Edit Garden</button>
    </div>
  </div>
</template>

<script>
import GardenLayout from "./GardenLayout.vue";
import axios from "axios";

export default {
  name: "GardenMain",
  components: {
    "garden-layout": GardenLayout,
  },
  data() {
    return {
      gardenSize: { width: 10, height: 10 },
      plantList: [
        { position_x: 1, position_y: 2, radius: 2, id: 1 },
        { position_x: 5, position_y: 4, radius: 2, id: 2 },
        { position_x: 1, position_y: 5, radius: 4, id: 3 },
      ],
      selected: -1,
      msg: "Garden Main Page",
    };
  },
  methods: {
    plantMoved: function (info, collide) {
      this.plantList.forEach((plant, i) => {
        if (plant.id === this.selected) {
          const newPlant = { ...plant, ...info };
          this.$set(this.plantList, i, { ...plant, ...info });
        }
      });
    },
  },
};
</script>
