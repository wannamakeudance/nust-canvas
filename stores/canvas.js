import { defineStore } from "pinia";

export const useCanvasStore = defineStore("canvas", {
  state: () => ({
    nodes: [],
    connections: [],
  }),
  actions: {
    addNode(node) {
      this.nodes.push(node);
    },
    setNodes(nodes) {
      this.nodes = nodes;
    },
    addConnection(connection) {
      this.connections.push(connection);
    },
    setConnections(connections) {
      this.connections = connections;
    },
    clearCanvas() {
      this.nodes = [];
      this.connections = [];
      localStorage.removeItem("nodes");
      localStorage.removeItem("connections");
    },
    saveData() {
      localStorage.setItem("nodes", JSON.stringify(this.nodes));
      localStorage.setItem("connections", JSON.stringify(this.connections));
    },
    loadData() {
      const savedNodes = localStorage.getItem("nodes");
      const savedConnections = localStorage.getItem("connections");
      if (savedNodes) {
        this.nodes = JSON.parse(savedNodes);
      }
      if (savedConnections) {
        this.connections = JSON.parse(savedConnections);
      }
    },
  },
  getters: {
    getNodes: (state) => state.nodes,
    getConnections: (state) => state.connections,
  },
});
