<template>
  <canvas id="garden-layout" :height="gardenHeight" :width="gardenWidth">
  </canvas>
</template>

<script>
export default {
  name: "gardenLayout",
  props: {
    gardenSize: {
      validator: (info) => {
        return info.width && info.height;
      },
    },
    plants: {
      validator: (list) =>
        list.every(
          (plant) => !!plant.position_x && !!plant.position_y && !!plant.radius
        ),
    },
  },
  computed: {
    gardenHeight: function () {
      const height = this.gardenSize.height * 10;
      return `${height}px`;
    },
    gardenWidth: function () {
      const width = this.gardenSize.width * 10;
      return `${width}px`;
    },
  },
};
</script>

<style lang="sass">
#garden-layout
  position: relative
  background-color: $brown
</style>
