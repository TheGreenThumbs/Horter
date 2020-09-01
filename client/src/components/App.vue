<template>
  <div>
    Hello
    <garden-layout :gardenSize="gardenSize" :plants="plantList"></garden-layout>
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
        { position_x: 1, position_y: 2, radius: 1 },
        { position_x: 4, position_y: 4, radius: 1 },
        { position_x: 1, position_y: 5, radius: 2 },
      ],
      selected: -1,
    };
  },
};
</script>
