<template>
  <div>
    <EditGarden v-on:edit:garden="submitEdit" />
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
  },
  methods: {
    submitEdit(info) {
      axios
        .put("/garden/gardenupdate", {
          id: this.id,
          info: info,
        })
        .then((garden) => console.log(garden));
    },
  },
};
</script>
