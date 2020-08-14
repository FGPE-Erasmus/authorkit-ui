<template>
  <fgpe-select
    v-model="selected"
    class="mt-5 w-full select-large"
    :options="Object.keys(countries)"
    :clearable="false"
    :searchable="true"
    :custom-filter="filterBy"
    :label-placeholder="labelPlaceholder"
    :placeholder="placeholder"
  >
    <template slot="option" slot-scope="option">
      <div class="d-center">
        {{ countries[option.label.toUpperCase()] }}
      </div>
    </template>
    <template slot="selected-option" slot-scope="option">
      <div class="selected d-center">
        {{ countries[option.label.toUpperCase()] }}
      </div>
    </template>
  </fgpe-select>
</template>

<script>
import countries from "@/assets/data/countries.json";
import FgpeSelect from "@/components/FgpeSelect";

export default {
  name: "fgpe-country-select",
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
      countries,
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
        this.countries[option.toUpperCase()]
          .toLowerCase()
          .indexOf(search.toLowerCase()) > -1
      );
    }
  }
};
</script>
