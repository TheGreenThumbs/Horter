<!-- Renders plant thumbnail and plant modal -->

<template>
  <div class="thumbnail">
    <div v-if="plant.photo_url">
      <a class="image is-64x64" @click="imageClick(plant.photo_url)">
        <b-image
          :src="plant.photo_url"
          ratio="4by4"
          :rounded="rounded"
          :value="plant.photo_url"
          v-model="modalImageUrl"
        ></b-image>
      </a>
    </div>
    <div v-else>
      <p class="image is-64x64">
        <b-skeleton
          circle
          width="64px"
          height="64px"
          :animated="false"
        ></b-skeleton>
      </p>
    </div>
    <b-modal v-model="isImageModalActive" @close="isImageModalActive = false">
      <p>
        <img :src="modalImageUrl" />
      </p>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "PlantThumbnail",
  data() {
    return {
      rounded: true,
      isImageModalActive: false,
      modalImageUrl: "",
    };
  },
  props: ["plant"],
  methods: {
    imageClick(imageUrl) {
      this.isImageModalActive = true;
      this.modalImageUrl = imageUrl;
    },
  },
};
</script>
