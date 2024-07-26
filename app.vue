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
    <Toolbar />
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
};
</script>
<style>
@import url("~/assets/css/main.css");
</style>
