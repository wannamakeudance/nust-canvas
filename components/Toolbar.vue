<template>
  <v-toolbar class="toolbar">
    Nust Canvas
    <v-spacer></v-spacer>
    <v-btn variant="tonal" color="green" @click="$emit('save')">Save</v-btn>
    <v-btn variant="tonal" class="ml-5 mr-3" @click="$emit('load')">Load</v-btn>
  </v-toolbar>
</template>

<style>
.toolbar {
  padding-left: 120px;
}
</style>
