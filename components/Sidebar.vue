<template>
  <v-navigation-drawer
    permanent
    class="sidebar"
    color="grey-darken-4"
    width="100"
  >
    <v-list class="icons-list">
      <v-list-item
        class="mb-5"
        v-for="item in items"
        :key="item.id"
        @dragstart="startDrag(item)"
        draggable="true"
      >
        <v-icon
          v-tooltip="item.name"
          :color="item.color"
          :icon="item.icon"
          size="36"
        ></v-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          type: "shape",
          name: "Circle",
          icon: "mdi-circle-outline",
          color: "green-darken-2",
          size: 48,
        },
        {
          id: 2,
          type: "shape",
          name: "Square",
          icon: "mdi-square-outline",
          color: "blue-darken-2",
          size: 48,
        },
        {
          id: 3,
          type: "shape",
          name: "Triangle",
          icon: "mdi-triangle-outline",
          color: "red-darken-2",
          size: 48,
        },
        {
          id: 4,
          type: "shape",
          name: "Star",
          icon: "mdi-star-outline",
          color: "yellow-darken-2",
          size: 48,
        },
        {
          id: 5,
          type: "shape",
          name: "Note",
          icon: "mdi-note-outline",
          color: "purple-darken-2",
          size: 48,
        },
      ],
    };
  },
  methods: {
    startDrag(item) {
      event.dataTransfer.setData("component", JSON.stringify(item));
    },
  },
};
</script>
<style>
.icons-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
