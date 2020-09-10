<template>
  <a-scene embedded class="ar-garden">
    <a-camera>
      <a-box
        :depth="gardenScale(gardenSize.height)"
        height=".5"
        :width="gardenScale(gardenSize.width)"
        position="0 -1 -5"
        rotation="45 0 0"
        scale="1 1 1"
        color="#3e2723"
      >
        <a-entity id="plants"> </a-entity>
      </a-box>
    </a-camera>
  </a-scene>
</template>

<script>
import axios from "axios";
export default {
  name: "ARGarden",
  data() {
    return {
      gardenSize: { width: 10, height: 10 },
      plantList: [
        { position_x: 1, position_y: 2, radius: 2, id: 1 },
        { position_x: 5, position_y: 5, radius: 2, id: 2 },
        { position_x: 10, position_y: 10, radius: 4, id: 3 },
      ],
    };
  },
  methods: {
    gardenScale: (num) => num * 0.1,
    plantPosition: function (plant) {
      const x = ((plant.position_x - this.gardenSize.width / 2) * 0.06).toFixed(
        2
      );
      const y = ((plant.position_y - 1) * 0.06).toFixed(2);
      this.$log.info(`x: ${x} y: ${y}`);
      return `${x} 1 ${y}`;
    },
  },
  mounted() {
    axios({
      method: "GET",
      url: "/garden/one",
      params: { id: this.$route.query.id },
    })
      .then(({ data }) => {
        this.plantList = data.plants;
        this.gardenSize.height = data.length;
        this.gardenSize.width = data.width;
        const plants = document.getElementById("plants");
        let color = "green";
        data.plants.forEach((plant) => {
          const cone = document.createElement("a-cone");
          color = color === "green" ? "lightgreen" : "green";
          cone.setAttribute("color", color);
          cone.setAttribute(
            "radius-bottom",
            this.gardenScale(plant.radius / 2)
          );
          cone.setAttribute("radius-top", ".03");
          cone.setAttribute("height", ".5");
          cone.setAttribute("position", this.plantPosition(plant));
          plants.append(cone);
        });
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
};
</script>

<style lang="sass">
.ar-garden
  height: 80vh
  width: 100vw
</style>
