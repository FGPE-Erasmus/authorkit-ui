<template>
  <div>
    <label
      v-if="labelPlaceholder ? false : label"
      class="con-chips--label"
      for=""
      @click="focusInput"
    >
      {{ label }}
    </label>
    <div
      :class="{
        focused: isFocus,
        disabled: disabled
      }"
      class="con-chips"
    >
      <slot></slot>

      <input
        :placeholder="!value || value.length === 0 ? placeholder : null"
        v-model="newChip"
        ref="input"
        type="text"
        class="con-chips--input"
        :class="{
          hasValue: value && value.length > 0
        }"
        @keypress.enter.prevent="addItem"
        v-on="listeners"
        :disabled="disabled"
      />
      <transition name="placeholderx">
        <span
          v-if="isValue && (labelPlaceholder || $attrs.placeholder)"
          ref="spanplaceholder"
          :style="styleLabel"
          :class="[
            labelPlaceholder,
            {
              'vs-placeholder-label': labelPlaceholder,
              normal: !isFocus && (!value || value.length === 0)
            }
          ]"
          class="input-span-placeholder con-chips--placeholder"
          @click="focusInput"
        >
          {{ $attrs.placeholder || labelPlaceholder }}
        </span>
      </transition>
      <div class="x-global con-chips--remove-all" @click="removeAllItems">
        <vs-icon :icon-pack="iconPack" :icon="removeIcon"></vs-icon>
      </div>
    </div>
  </div>
</template>

<script>
import colors from "@/../colors.config.json";

export default {
  name: "fgpe-chips",
  props: {
    value: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array
    },
    unique: {
      type: Boolean,
      default: true
    },
    color: {
      default: "primary",
      type: String
    },
    iconPack: {
      type: String,
      default: "mi"
    },
    removeIcon: {
      type: String,
      default: "close"
    },
    labelPlaceholder: {
      default: null,
      type: [String, Number]
    },
    label: {
      default: null,
      type: [String, Number]
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
      return this.labelPlaceholder
        ? true
        : !this.value || this.value.length === 0;
    }
  },
  data() {
    return {
      isFocus: false,
      newChip: "",
      itemsx: this.items
    };
  },
  methods: {
    addItem() {
      let valueOld = this.value;
      if (
        this.newChip.trim().length > 0 &&
        (valueOld.indexOf(this.newChip) < 0 || !this.unique)
      ) {
        valueOld.push(this.newChip);
        this.$emit("input", valueOld);
        this.newChip = "";
      }
    },
    removeAllItems() {
      let valueOld = this.value;
      valueOld.splice(0, this.value.length);
      this.$emit("input", valueOld);
    },

    changeFocus(booleanx) {
      this.isFocus = booleanx;
      if (!booleanx) {
        this.addItem();
      }
    },
    beforeEnter(el) {
      el.style.height = 0;
    },
    focusInput() {
      this.$refs.input.focus();
    }
  }
};
</script>
