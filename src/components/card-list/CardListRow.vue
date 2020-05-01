<template>
  <tr class="tr-values vs-table--tr cursor-pointer" @click="$emit('view')">
    <slot></slot>
    <vs-td>
      <div class="flex justify-end">
        <feather-icon
          v-if="allowView"
          @click="
            $emit('view');
            $event.stopPropagation();
          "
          icon="EyeIcon"
          class="flex items-center mr-4 cursor-pointer text-base"
          svgClasses="w-5 h-5"
        />
        <feather-icon
          v-if="allowEdit"
          @click="
            $emit('edit');
            $event.stopPropagation();
          "
          icon="EditIcon"
          class="flex items-center mr-4 cursor-pointer text-base"
          svgClasses="w-5 h-5"
        />
        <feather-icon
          v-if="allowShare"
          @click="
            $emit('share');
            $event.stopPropagation();
          "
          icon="Share2Icon"
          class="flex items-center mr-4 cursor-pointer text-base"
          svgClasses="w-5 h-5"
        />
        <feather-icon
          v-if="allowExport"
          @click="
            $emit('export');
            $event.stopPropagation();
          "
          icon="ArrowDownCircleIcon"
          class="flex items-center mr-4 cursor-pointer text-base"
          svgClasses="w-5 h-5"
        />
        <feather-icon
          v-if="allowRemove"
          @click="
            $emit('remove');
            $event.stopPropagation();
          "
          icon="TrashIcon"
          class="flex items-center mr-4 cursor-pointer text-danger"
          svgClasses="w-5 h-5"
        />
      </div>
    </vs-td>
  </tr>
</template>

<script>
export default {
  name: "card-list-row",
  props: {
    id: String,
    allowView: {
      type: Boolean,
      default: false
    },
    allowExport: {
      type: Boolean,
      default: false
    },
    allowShare: {
      type: Boolean,
      default: false
    },
    allowEdit: {
      type: Boolean,
      default: false
    },
    allowRemove: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>
