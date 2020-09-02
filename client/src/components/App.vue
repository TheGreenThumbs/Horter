<template>
  <div>
    Hello
    <garden-layout
      :selected.sync="selected"
      :gardenSize="gardenSize"
      :plants="plantList"
      v-on:plant-moved="plantMoved"
    ></garden-layout>
  </div>
</template>
<script>
import GardenLayout from "./GardenLayout.vue";
export default {
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
