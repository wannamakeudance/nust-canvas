<template>
  <div
    :style="{
      top: node.y + 'px',
      left: node.x + 'px',
      width: node.size + 'px',
      height: node.size + 'px',
    }"
    class="node"
    @mousedown="startDrag"
    @dblclick="$emit('initiate-connection', index)"
  >
    <v-icon
      :size="node.size"
      :icon="node.icon"
      :color="node.color"
      :style="{ width: node.size + 'px', height: node.size + 'px' }"
    ></v-icon>
    <v-icon
      class="resize-handle"
      icon="mdi-resize-bottom-right"
      size="large"
      color="grey-darken-3"
      @mousedown.stop="startResize"
    ></v-icon>
  </div>
</template>

<script>
export default {
  props: ["node", "index"],
  methods: {
    startDrag(event) {
      this.$emit("start-drag", this.index, event);
    },
    startResize(event) {
      this.$emit("start-resize", this.index, event);
    },
  },
};
</script>

<style>
.node {
  position: absolute;
  padding: 5px;
  background: transparent;
  cursor: move;
}
.resize-handle {
  position: absolute;
  right: -5px;
  bottom: -5px;
  width: 10px;
  height: 10px;
  cursor: se-resize;
}
</style>
