<template>
  <div class="canvas" @dragover.prevent @drop="onDrop">
    <v-card
      class="mt-2"
      prepend-icon="mdi-map-marker-multiple"
      width="460"
      title="HOW TO ADD CONNECTIONS"
      subtitle="Double click target nodes in the canva to connect them"
    ></v-card>
    <svg class="connections">
      <path
        v-for="(connection, index) in connections"
        :key="index"
        :d="generatePath(connection)"
        stroke="black"
        stroke-width="3"
        fill="transparent"
      />
    </svg>
    <Node
      v-for="(node, index) in nodes"
      :key="index"
      :node="node"
      :index="index"
      @start-drag="startDragNode"
      @start-resize="startResizeNode"
      @initiate-connection="initiateConnection"
    />
  </div>
</template>

<script>
import { useCanvasStore } from "~/stores/canvas";
import Node from "./Node.vue";

export default {
  components: {
    Node,
  },
  data() {
    return {
      draggingNode: null,
      connectingNode: null,
      resizingNode: null,
      startPos: { x: 0, y: 0 },
    };
  },
  computed: {
    nodes() {
      return useCanvasStore().getNodes;
    },
    connections() {
      return useCanvasStore().getConnections;
    },
  },
  methods: {
    onDrop(event) {
      const component = JSON.parse(event.dataTransfer.getData("component"));
      const x = event.offsetX;
      const y = event.offsetY;
      const canvasStore = useCanvasStore();
      canvasStore.addNode({ ...component, x, y, size: 100 });
    },
    startDragNode(index, event) {
      this.draggingNode = index;
      this.startPos = { x: event.clientX, y: event.clientY };
      event.preventDefault();
      window.addEventListener("mousemove", this.onMouseMove);
      window.addEventListener("mouseup", this.onMouseUp);
    },
    startResizeNode(index, event) {
      this.resizingNode = index;
      this.startPos = { x: event.clientX, y: event.clientY };
      window.addEventListener("mousemove", this.onMouseMove);
      window.addEventListener("mouseup", this.onMouseUp);
    },
    onMouseMove(event) {
      if (this.draggingNode !== null) {
        const deltaX = event.clientX - this.startPos.x;
        const deltaY = event.clientY - this.startPos.y;
        const node = this.nodes[this.draggingNode];
        node.x += deltaX;
        node.y += deltaY;
        this.startPos = { x: event.clientX, y: event.clientY };
        this.updateConnections();
      } else if (this.resizingNode !== null) {
        const deltaX = event.clientX - this.startPos.x;
        const deltaY = event.clientY - this.startPos.y;
        const node = this.nodes[this.resizingNode];
        node.size += Math.max(deltaX, deltaY);
        if (node.size < 10) node.size = 10; // Minimum size to prevent disappearing
        this.startPos = { x: event.clientX, y: event.clientY };
        this.updateConnections();
      }
    },
    onMouseUp() {
      if (this.draggingNode !== null) {
        this.draggingNode = null;
      } else if (this.resizingNode !== null) {
        this.resizingNode = null;
      }
      window.removeEventListener("mousemove", this.onMouseMove);
      window.removeEventListener("mouseup", this.onMouseUp);
      this.updateConnections();
    },
    initiateConnection(index) {
      if (this.connectingNode === null) {
        this.connectingNode = index;
      } else {
        const canvasStore = useCanvasStore();
        canvasStore.addConnection({
          startNodeIndex: this.connectingNode,
          endNodeIndex: index,
        });
        this.connectingNode = null;
        this.updateConnections();
      }
    },
    generatePath(connection) {
      const startNode = this.nodes[connection.startNodeIndex];
      const endNode = this.nodes[connection.endNodeIndex];
      const startX = startNode.x + startNode.size / 2;
      const startY = startNode.y + startNode.size / 2;
      const endX = endNode.x + endNode.size / 2;
      const endY = endNode.y + endNode.size / 2;
      const dx = endX - startX;
      const dy = endY - startY;
      const curvature = 0.5;
      const midX = startX + dx * curvature;
      const midY = startY + dy * curvature;
      return `M ${startX},${startY} Q ${midX},${startY} ${endX},${endY}`;
    },
    updateConnections() {
      const canvasStore = useCanvasStore();
      canvasStore.setConnections(
        this.connections.map((connection) => {
          const startNode = this.nodes[connection.startNodeIndex];
          const endNode = this.nodes[connection.endNodeIndex];
          return {
            ...connection,
            startX: startNode.x + startNode.size / 2,
            startY: startNode.y + startNode.size / 2,
            endX: endNode.x + endNode.size / 2,
            endY: endNode.y + endNode.size / 2,
          };
        })
      );
    },
  },
  mounted() {
    const canvasStore = useCanvasStore();
    canvasStore.loadData();
  },
};
</script>

<style>
.canvas {
  position: relative;
  padding-left: 140px;
  width: 100%;
  height: 90vh;
  background: linear-gradient(90deg, rgba(200, 200, 200, 0.7) 3%, transparent 0),
    linear-gradient(rgba(200, 200, 200, 0.7) 3%, transparent 0);
  background-size: 20px 20px;
}
.connections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
