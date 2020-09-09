<template>
  <div>
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
      <div>
        {{ selectedStore.schedule }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NearbyStores",
  data() {
    return {
      center: {
        lat: 29.9855645,
        lng: -90,
      },
      markers: [
        {
          position: {
            lat: 29.9855645,
            lng: -90.1027271,
          },
        },
      ],
      selectedStore: {},
      selected: false,
    };
  },
  mounted() {
    axios
      .get("/stores", {
        lat: 30,
        lng: -90,
      })
      .then((stores) => {
        this.markers = stores.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    findStore(index) {
      this.selected = true;
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
