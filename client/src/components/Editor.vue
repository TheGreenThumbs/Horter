<template>
  <div>
    <EditGarden v-on:edit:garden="submitEdit" />
  </div>
</template>

<script>
import EditGarden from "./EditGarden.vue";

export default {
  name: "editor",
  components: {
    EditGarden,
  },
  methods: {
    submitEdit(info) {
      console.log(info);
    },
  },
};
</script>
