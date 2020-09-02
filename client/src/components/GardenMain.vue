<template>
  <div>
    <h1>GARDEN NAME</h1>
    <p>
      Florem ipsum sneezeweed peruvian lily dune helleborine plumed thistle.
      Scabious st john’s wort holy grass false beard. Bloom glory lily drumstick
      gentian buttercup cosmos foxtail lily
    </p>
    <garden-layout
      :selected.sync="selected"
      :gardenSize="gardenSize"
      :plants="plantList"
      v-on:plant-moved="plantMoved"
    ></garden-layout>
    <h2>PLANT NAME</h2>
    <p>
      Florem ipsum sneezeweed peruvian lily dune helleborine plumed thistle.
      Scabious st john’s wort holy grass false beard.
    </p>
    <button>Add Plant</button>
    <button>Edit Garden</button>
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
