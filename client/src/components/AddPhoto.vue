<template>
  <b-field class="file is-info" :class="{ 'has-name': !!photo }">
    <b-upload class="file-label" @input="onInput">
      <span class="file-cta">
        <b-icon class="file-icon" icon="upload"></b-icon>
        <span class="file-label">Upload Garden Image</span>
      </span>
      <span class="file-name" v-if="photo">
        {{ photo.name }}
      </span>
    </b-upload>
  </b-field>
</template>

<script>
export default {
  name: "AddPhoto",
  props: ["photo"],
  methods: {
    onInput: function (file) {
      this.$log.info(file);
      this.$emit("update:photo", file);
    },
  },
};
</script>
