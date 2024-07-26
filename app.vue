<template>
  <v-app>
    <Sidebar />
    <Toolbar @save="saveData" @load="loadData" />
    <Canvas ref="canvas" />
  </v-app>
</template>

<script>
export default {
  methods: {
    saveData() {
      this.$refs.canvas.saveData();
    },
    loadData() {
      this.$refs.canvas.loadData();
    },
  },
};
</script>
<style>
@import url("~/assets/css/main.css");
</style>
