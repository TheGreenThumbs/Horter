<template>
  <div>
    <EditGarden
      v-on:edit:garden="submitEdit"
      :id="this.id"
      :name="this.name"
      :lat="this.lat"
      :lng="this.lng"
      :width="this.width"
      :height="this.height"
    />
  </div>
</template>

<script>
import EditGarden from "./EditGarden.vue";
import axios from "axios";

export default {
  name: "editor",
  components: {
    EditGarden,
  },
  props: {
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  methods: {
    submitEdit(info) {
      axios.put("/garden/gardenupdate", {
        id: this.id,
        info: info,
      });
    },
  },
};
</script>
