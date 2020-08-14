<template>
  <fgpe-select
    v-model="selected"
    class="mt-5 w-full select-large"
    :options="Object.keys(languages)"
    :clearable="false"
    :searchable="true"
    :custom-filter="filterBy"
    :label-placeholder="labelPlaceholder"
    :placeholder="placeholder"
  >
    <template slot="option" slot-scope="option">
      <div class="d-center">
        {{ languages[option.label] }}
      </div>
    </template>
    <template slot="selected-option" slot-scope="option">
      <div class="selected d-center">
        {{ languages[option.label] }}
      </div>
    </template>
  </fgpe-select>
</template>

<script>
import languages from "@/assets/data/languages.json";
import FgpeSelect from "@/components/FgpeSelect";

export default {
  name: "fgpe-language-select",
  components: {
    "fgpe-select": FgpeSelect
  },
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
    labelPlaceholder: {
      default: null,
      type: [String, Number]
    },
    label: {
      default: null,
      type: [String, Number]
    }
  },
  data() {
    return {
      languages,
      selected: this.value
    };
  },
  computed: {},
  watch: {
    value(val) {
      this.selected = val;
    },
    selected(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    filterBy(option, label, search) {
      return (
        option.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        this.languages[option.toLowerCase()]
          .toLowerCase()
          .indexOf(search.toLowerCase()) > -1
      );
    }
  }
};
</script>
