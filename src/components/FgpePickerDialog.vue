<template>
  <vs-prompt
    class="fgpe-picker-dialog"
    @accept="$emit('pick', selection)"
    @cancel="$emit('cancel')"
    @close="$emit('cancel')"
    :active.sync="dialogActive"
    icon-pack="mi"
    style="z-index: 55000"
  >
    <div class="title">
      <h4 class="mb-4">
        {{
          title ||
            (multiple
              ? Vue.$t("PickerDialog.PickOption")
              : $t("PickerDialog.PickOptions"))
        }}
      </h4>
    </div>

    <div class="body w-full">
      <vs-checkbox
        v-if="multiple"
        :value="all"
        @change="toggleSelectAll"
        icon-pack="mi md-16"
        class="mb-4"
      >
        {{ $t("PickerDialog.SelectAll") }}
      </vs-checkbox>
      <ul class="centerx">
        <li v-for="option in normalizedOptions" :key="option.id" class="mb-2">
          <vs-checkbox
            v-if="multiple"
            v-model="selection"
            :vs-value="option.id"
            icon-pack="mi md-16"
          >
            <slot name="option" v-bind="option">
              {{ option.label }}
            </slot>
          </vs-checkbox>
          <vs-radio
            v-else
            v-model="selection"
            :vs-value="option.id"
            icon-pack="mi md-16"
          >
            <slot name="option" v-bind="option">
              {{ option.label }}
            </slot>
          </vs-radio>
        </li>
      </ul>
    </div>
  </vs-prompt>
</template>

<script>
export default {
  name: "fgpe-picker-dialog",
  props: {
    title: {
      type: String
    },
    multiple: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      required: true
    },
    options: {
      type: Array,
      default: () => []
    },
    selected: {
      type: [String, Number, Array],
      default: ""
    }
  },
  data() {
    return {
      dialogActive: this.active,
      selection: []
    };
  },
  watch: {
    active(val) {
      this.dialogActive = val;
      if (this.multiple && !this.selected) {
        this.selection = [];
      } else {
        this.selection = this.selected;
      }
    },
    selected(val) {
      this.selection = val;
    }
  },
  computed: {
    all() {
      return this.selection.length === this.normalizedOptions.length;
    },
    normalizedOptions() {
      const normalizedOptions = [];
      for (const option of this.options) {
        if (typeof option === "string" || typeof option === "number") {
          normalizedOptions.push({
            id: option,
            label: option
          });
        } else {
          normalizedOptions.push({
            id: option.id,
            label: option.label || option.id
          });
        }
      }
      return normalizedOptions;
    }
  },

  methods: {
    toggleSelectAll() {
      if (this.all) {
        this.selection = [];
      } else {
        this.selection = this.normalizedOptions.map(option => option.id);
      }
    }
  }
};
</script>

<style lang="scss">
.fgpe-picker-dialog.con-vs-dialog .vs-dialog .vs-dialog-text {
  padding: 1rem;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  overflow: hidden;

  .title {
    flex: 0;
  }

  .body {
    flex: 1;
    overflow: auto;
  }
}
</style>
