<template>
  <div class="body">
    <GmapMap
      ref="map"
      :center="center"
      :zoom="12"
      map-type-id="terrain"
      style="width: 800px; height: 500px"
      @dragend="resetCenter()"
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
        lat: 30,
        lng: -90,
      },
      markers: [
        {
          position: {
            lat: 30,
            lng: -90,
          },
        },
      ],
      selectedStore: {},
      selected: false,
      activeMarker: {},
    };
  },
  mounted() {
    this.getGeo();
    this.setLocation();
    axios({
      method: "GET",
      url: "/stores",
      params: {
        lat: this.center.lat,
        lng: this.center.lng,
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
          name: this.markers[index].name,
        },
      }).then((store) => {
        this.selectedStore = store.data;
      });
    },
    setLocation: function () {
      if (this.location !== undefined) {
        this.center.lat = this.location.lat;
        this.center.lng = this.location.lng;
      } else if (this.center === undefined) {
        this.center.lat = 30;
        this.center.lng = -90;
      }
    },
    getGeo: function () {
      navigator.geolocation.getCurrentPosition(function (position) {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    resetCenter: function () {
      let latlng = this.$refs.map.$mapObject.getCenter();
      let latitude = latlng.lat();
      let longitude = latlng.lng();
      this.center = {
        lat: latitude,
        lng: longitude,
      };
      axios({
        method: "GET",
        url: "/stores",
        params: {
          lat: this.center.lat,
          lng: this.center.lng,
        },
      })
        .then((stores) => {
          this.markers = stores.data;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
.body {
  margin-left: 20px;
}
</style>
