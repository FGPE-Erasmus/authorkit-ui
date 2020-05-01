<template>
  <div class="w-full">
    <label v-if="label" class="fgpe-label">
      {{ label }}
    </label>
    <tree
      ref="tree"
      :data="value"
      :options="options"
      @node:dragging:start="$emit('drag-start')"
      @node:dragging:finish="$emit('drag-finish')"
      class="fgpe-tree"
    >
      <template slot-scope="{ node }">
        <slot name="node" v-bind:node="node">
          <fgpe-tree-node
            :value="node"
            :supports-children="allowCreate"
            :editable="allowUpdate"
            :removable="allowDelete"
            @create-node="onCreate"
            @update-node="onUpdate"
            @delete-node="onDelete"
          />
        </slot>
      </template>
    </tree>
    <slot name="add-root" v-if="allowCreate">
      <div class="flex items-center justify-center py-2 cursor-pointer">
        <vs-icon
          color="primary"
          icon="add_circle_outline"
          icon-pack="mi md-24"
          @click="onCreate()"
        />
      </div>
    </slot>
  </div>
</template>

<script>
import LiquorTree from "liquor-tree";

import FgpeTreeNode from "./FgpeTreeNode";

export default {
  name: "fgpe-tree",
  components: {
    tree: LiquorTree,
    FgpeTreeNode
  },
  props: {
    label: {
      type: String,
      default: null
    },
    value: {
      type: Array
    },
    options: {
      type: Object
    },
    allowCreate: {
      type: Boolean,
      default: true
    },
    allowUpdate: {
      type: Boolean,
      default: true
    },
    allowDelete: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    value(newVal) {
      this.$refs["tree"].tree.setModel(newVal);
    }
  },

  methods: {
    onCreate(id, data) {
      this.$emit("create-node", id, data);
      console.log(`Creating on ... ${id} ... ${data}`);
    },
    onUpdate(id, data) {
      this.$emit("update-node", id, data);
      console.log(`Updating ... ${id} ... ${data}`);
    },
    onDelete(id, data) {
      this.$emit("delete-node", id, data);
      console.log(`Deleting ... ${id} ... ${data}`);
    }
  }
};
</script>
