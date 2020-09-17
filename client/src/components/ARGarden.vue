<template>
  <a-scene
    embedded
    id="ar-garden"
    v-touch:tap="spinTouch"
    v-touch:swipe.top="slideUp"
    v-touch:swipe.bottom="slideDown"
    vr-mode-ui="enabled: false"
  >
    <a-camera>
      <a-box
        :depth="gardenScale(gardenSize.height)"
        height=".5"
        :width="gardenScale(gardenSize.width)"
        :position="gardenPosition"
        :rotation="gardenRotation"
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
import plantTexture from "../assets/plantTexture.jpg";
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
      windowWidth: 0,
      spin: 0,
      positionX: -5,
      positionY: -1,
    };
  },
  computed: {
    gardenRotation() {
      return `45 ${this.spin} 0`;
    },
    gardenPosition() {
      return `0 ${this.positionY} ${this.positionX}`;
    },
  },
  methods: {
    slideDown() {
      this.positionX += 0.5;
      this.positionY -= 0.5;
    },
    slideUp() {
      this.positionX -= 0.5;
      this.positionY += 0.5;
    },
    gardenScale: (num) => num * 0.1,
    plantPosition: function (plant) {
      const truePlantX = this.gardenScale(
        Math.min(plant.position_x, this.gardenSize.width - plant.radius) +
          plant.radius / 2
      );
      const x = (
        truePlantX -
        this.gardenScale(this.gardenSize.width) / 2
      ).toFixed(2);
      const truePlantY = this.gardenScale(
        Math.min(plant.position_y, this.gardenSize.height - plant.radius) +
          plant.radius / 2
      );
      const y = (
        truePlantY -
        this.gardenScale(this.gardenSize.height) / 2
      ).toFixed(2);
      this.$log.info(`x: ${x} y: ${y}`);
      return `${x} .5 ${y}`;
      // return `1.5 .5 1.5`;
    },
    spinTouch(e) {
      const touchX = e.changedTouches[0].clientX;
      if (touchX < this.windowWidth / 2) {
        this.spin -= 20;
      } else {
        this.spin += 20;
      }
      if (this.spin >= 360 || this.spin <= -360) this.spin = 0;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    const controlsMessage =
      "Click edges to rotate or swipe foward and back to move";
    this.$buefy.toast.open({
      type: "is-primary",
      message: controlsMessage,
      duration: 5000,
    });
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
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
          //cone.setAttribute("color", color);
          cone.setAttribute("src", plantTexture);
          cone.setAttribute("repeat", "1");
          cone.setAttribute("roughness", "1");
          cone.setAttribute(
            "radius-bottom",
            this.gardenScale(plant.radius / 3)
          );
          cone.setAttribute("radius-top", this.gardenScale(plant.radius / 5));
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
#ar-garden
  height: 100vh
  margin: 0
  width: 100vw
</style>
