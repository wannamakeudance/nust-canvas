<template>
  <v-empty-state
    v-if="$device.isMobile"
    class="mt-10"
    headline="Whoops"
    title="Device is not surpported"
    text="Please use your laptop to use this platform, thanks for your understanding"
  ></v-empty-state>
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
