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
      @dragstop="plantMoved"
      :snapToGrid="true"
      :gridX="gardenScale"
      :gridY="gardenScale"
    >
    </VueDragResize>
  </div>
</template>

<script>
import VueDragResize from "vue-drag-resize";

// Change this to change everything's size

export default {
  name: "gardenLayout",
  data() {
    return { gardenScale: 20 };
  },
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
      const height = this.plantScale(this.gardenSize.height);
      const width = this.plantScale(this.gardenSize.width);
      return { height: `${height}px`, width: `${width}px` };
    },
  },
  methods: {
    plantBorderRadius: function (radius) {
      return { "border-radius": `${this.plantScale(radius) / 2}px` };
    },
    plantScale: function (num) {
      return num * this.gardenScale;
    },
    selectPlant: function (id) {
      this.$emit("update:selected", id);
    },
    plantMoved: function (loc) {
      console.log(loc);
      console.log(this.selected);
      let i = 0;
      while (i < this.plants.length) {
        if (this.plants[i].id !== this.selected) {
          this.collisionCheck(loc, this.plants[i]);
        }
        i++;
      }
    },
    collisionCheck: (curr, other) => {
      // if()
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
