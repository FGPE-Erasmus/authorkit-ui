<template>
  <div>
    <label
      v-if="labelPlaceholder ? false : label"
      class="fgpe-select--label"
      @click="focusInput"
    >
      {{ label }}
    </label>
    <div :class="'fgpe-select' + (multiple ? ' fgpe-select--multiple' : '')">
      <v-select
        v-model="selected"
        ref="input"
        class="w-full fgpe-select--input"
        :class="{
          hasValue: !!value && (typeof value === 'number' || value.length > 0)
        }"
        :placeholder="!value && !searchable && !isFocus ? placeholder : null"
        :options="options"
        :clearable="clearable"
        :searchable="searchable"
        :filterBy="customFilter ? customFilter : filterBy"
        :reduce="reduce"
        :multiple="multiple"
        :disabled="disabled"
        @search:blur="listeners.blur"
        @search:focus="listeners.focus"
        v-on="listeners"
      >
        <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </v-select>
      <transition name="placeholderx">
        <span
          v-if="
            isValue &&
              (!isFocus || !placeholder) &&
              (labelPlaceholder || placeholder)
          "
          ref="spanplaceholder"
          :style="styleLabel"
          :class="[
            {
              'vs-placeholder-label': labelPlaceholder,
              normal:
                (!isFocus || !placeholder) &&
                isValue &&
                (labelPlaceholder || placeholder)
            }
          ]"
          class="input-span-placeholder fgpe-select--placeholder"
          @click="focusInput"
        >
          {{ placeholder || labelPlaceholder }}
        </span>
      </transition>
    </div>
  </div>
</template>

<script>
import colors from "@/../colors.config.json";

export default {
  name: "fgpe-select",
  props: {
    value: {
      type: [String, Number, Array],
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    color: {
      default: "primary",
      type: String
    },
    clearable: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    labelPlaceholder: {
      default: null,
      type: [String, Number]
    },
    label: {
      default: null,
      type: [String, Number]
    },
    reduce: {
      type: Function
    },
    customFilter: {
      type: Function
    }
  },
  computed: {
    styleLabel() {
      return {
        color: this.isFocus ? colors[this.color] : null
      };
    },
    listeners() {
      return {
        focus: evt => {
          this.$emit("focus", evt);
          this.changeFocus(true);
        },
        blur: evt => {
          this.$emit("blur", evt);
          this.changeFocus(false);
        }
      };
    },
    isValue() {
      return this.labelPlaceholder ? true : !this.value;
    }
  },
  data() {
    return {
      isFocus: false,
      selected: this.value
    };
  },
  watch: {
    value(val) {
      this.selected = val;
    },
    selected(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    changeFocus(booleanx) {
      this.isFocus = booleanx;
    },
    beforeEnter(el) {
      el.style.height = 0;
    },
    focusInput() {
      this.$refs.input.focus();
    },
    filterBy(option, label, search) {
      if (label) {
        if (label.toLowerCase().indexOf(search.toLowerCase()) > -1) {
          return true;
        }
      }
      if (option) {
        if (typeof option === "string") {
          return option.toLowerCase().includes(search.toLowerCase());
        } else if (typeof option === "object") {
          return Object.keys(option).some(k =>
            option[k].toLowerCase().includes(search.toLowerCase())
          );
        }
      }
      return false;
    }
  }
};
</script>
