<template>
  <div>
    <v-toolbar class="toolbar">
      <v-spacer></v-spacer>
      <v-btn variant="tonal" color="green" @click="$emit('save')">Save</v-btn>
      <v-btn
        variant="tonal"
        color="blue"
        class="ml-5 mr-3"
        @click="$emit('load')"
        >Load</v-btn
      >
      <v-btn variant="tonal" color="red" class="ml-5 mr-3" @click="openDialog"
        >Clear</v-btn
      >
    </v-toolbar>
    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">Confirm Clear</v-card-title>
        <v-card-text>
          Are you sure you want to clear the canvas? This action cannot be
          undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="confirmClear">Clear</v-btn>
          <v-btn @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    confirmClear() {
      this.dialog = false;
      this.$emit("clear");
    },
  },
};
</script>

<style>
.toolbar {
  padding-left: 120px;
}
</style>
