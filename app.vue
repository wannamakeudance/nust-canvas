<template>
  <h3
    v-if="$device.isMobile"
    color="blue-grey-darken-3"
    class="mt-15 pl-5 pr-5"
  >
    Please use your laptop to use this platform, thanks for your understanding
  </h3>
  <v-app v-else>
    <Sidebar />
    <Toolbar @save="saveData" @load="loadData" @clear="clearData" />
    <Canvas ref="canvas" />
  </v-app>
</template>

<script>
export default {
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
  methods: {
    saveData() {
      this.$refs.canvas.saveData();
    },
    loadData() {
      this.$refs.canvas.loadData();
    },
    clearData() {
      this.$refs.canvas.clearData();
    },
  },
};
</script>
<style>
@import url("~/assets/css/main.css");
</style>
