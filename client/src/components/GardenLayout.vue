<template>
  <div class="gardenLayout" :style="gardenStyles">
    <VueDragResize
      v-for="plant in plants"
      :key="plant.id"
      class="plant"
      :isResizable="false"
      :parentLimitation="true"
      :w="plantScale(plant.radius)"
      :h="plantScale(plant.radius)"
      :x="plantScale(plant.position_x)"
      :y="plantScale(plant.position_y)"
      :stickSize="0"
      :style="plantBorderRadius(plant.radius)"
      @clicked="selectPlant(plant.id)"
    >
    </VueDragResize>
  </div>
</template>

<script>
import VueDragResize from "vue-drag-resize";

// Change this to change everything's size
const gardenScale = 20;

export default {
  name: "gardenLayout",
  props: {
    gardenSize: {
      validator: (info) => {
        return info.width && info.height;
      },
      required: true,
    },
    plants: {
      validator: (list) =>
        list.every(
          (plant) =>
            !!plant.position_x &&
            !!plant.position_y &&
            !!plant.radius &&
            !!plant.id
        ),
      required: true,
    },
    selected: {
      type: Number,
      required: true,
    },
  },
  computed: {
    gardenStyles: function () {
      const height = this.gardenSize.height * gardenScale;
      const width = this.gardenSize.width * gardenScale;
      return { height: `${height}px`, width: `${width}px` };
    },
  },
  methods: {
    plantBorderRadius: function (radius) {
      return { "border-radius": `${this.plantScale(radius) / 2}px` };
    },
    plantScale: (num) => num * gardenScale,
    selectPlant: function (id) {
      this.$emit("update:selected", id);
    },
  },
  components: {
    VueDragResize,
  },
};
</script>

<style lang="sass">
.gardenLayout
  position: relative
  background-color: grey
.plant
  background-color: $brown
</style>
