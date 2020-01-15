<template>
  <div :class="'fgpe-tree__node fgpe-tree__node--' + nodeType">
    <span class="fgpe-tree__node__name text-primary">{{
      value && value.text
    }}</span>
    <div class="fgpe-tree__node__actions">
      <div
        v-if="supportsChildren"
        class="py-2 px-2 cursor-pointer flex items-center justify-between text-primary"
        @click="onCreate"
      >
        <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
      </div>
      <div
        v-if="editable"
        class="py-2 px-2 cursor-pointer flex items-center justify-between text-primary"
        @click="onEdit"
      >
        <feather-icon icon="EditIcon" svgClasses="h-4 w-4" />
      </div>
      <div
        v-if="removable"
        class="py-2 px-2 cursor-pointer flex items-center justify-between text-danger"
        @click="onDelete"
      >
        <feather-icon icon="Trash2Icon" svgClasses="h-4 w-4" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "fgpe-tree-node",
  props: {
    value: {
      type: Object
    },
    nodeType: {
      type: String,
      default: "standard"
    },
    supportsChildren: {
      type: Boolean,
      default: true
    },
    removable: {
      type: Boolean,
      default: true
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onCreate(evt) {
      evt.stopPropagation();
      this.$emit("create-node", this.value.id, this.value.data);
    },
    onEdit(evt) {
      evt.stopPropagation();
      this.$emit("update-node", this.value.id, this.value.data);
    },
    onDelete(evt) {
      evt.stopPropagation();
      this.$emit("delete-node", this.value.id, this.value.data);
    }
  }
};
</script>
