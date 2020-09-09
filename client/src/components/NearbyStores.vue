<template>
  <div class="body">
    <GmapMap
      :center="center"
      :zoom="12"
      map-type-id="terrain"
      style="width: 800px; height: 500px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        :icon="m.icon"
        @click="findStore(index)"
      />
    </GmapMap>
    <div v-if="selected">
      <div>
        {{ selectedStore.name }}
      </div>
      <div>
        {{ selectedStore.address }}
      </div>
      <div>
        {{ selectedStore.phone }}
      </div>
      <div v-for="(day, index) in selectedStore.schedule" :key="index">
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NearbyStores",
  props: {
    location: {
      type: Object,
    },
  },
  data() {
    return {
      center: {
        lat: this.location.lat,
        lng: this.location.lng,
      },
      markers: [
        {
          position: {
            lat: this.location.lat,
            lng: this.location.lng,
          },
        },
      ],
      selectedStore: {},
      selected: false,
      activeMarker: {},
    };
  },
  mounted() {
    axios({
      method: "GET",
      url: "/stores",
      params: {
        lat: this.location.lat,
        lng: this.location.lng,
      },
    })
      .then((stores) => {
        this.markers = stores.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    findStore(index) {
      this.selected = true;
      this.markers[index].icon =
        "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
      if (this.activeMarker) {
        this.activeMarker.icon =
          "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
        this.activeMarker = this.markers[index];
      }
      axios({
        method: "GET",
        url: "/stores/one",
        params: {
          placeId: this.markers[index].placeId,
        },
      }).then((store) => {
        this.selectedStore = store.data;
      });
    },
  },
};
</script>

<style>
.body {
  margin-left: 20px;
}
</style>
