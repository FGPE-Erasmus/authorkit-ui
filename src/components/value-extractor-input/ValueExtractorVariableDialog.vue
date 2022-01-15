<template>
  <vs-prompt
    class="value-extractor-variable-dialog"
    :title="$t('ValueExtractor.Popup.Title')"
    :active.sync="activeLocal"
    @accept="$emit('accept', variablesWithIds)"
    @cancel="$emit('cancel')"
    @close="$emit('cancel')"
    icon-pack="mi"
    style="z-index: 54000"
  >
    <multi-row-input
      name="variables"
      v-model="variables"
      :empty-line="{
        type: types[0],
        value: ''
      }"
      v-slot:default="{ line, index }"
    >
      <div class="vx-col w-full mb-2">
        <fgpe-select
          name="type"
          v-model="line.type"
          class="mt-5 w-full select-large"
          :options="types"
          :clearable="false"
          :searchable="false"
        >
          <template slot="option" slot-scope="option">
            <div class="d-center">
              {{ $t("ValueExtractor.Popup.Variables.Type." + option.label) }}
            </div>
          </template>
          <template slot="selected-option" slot-scope="option">
            <div class="selected d-center">
              {{ $t("ValueExtractor.Popup.Variables.Type." + option.label) }}
            </div>
          </template>
        </fgpe-select>
      </div>
      <div class="vx-col w-full mb-2">
        <fgpe-select
          v-if="line.type === 'CHALLENGE'"
          name="challenges"
          v-model="line.value"
          class="w-full select-large"
          :options="challenges"
          :clearable="false"
          :searchable="false"
          :multiple="false"
          :reduce="option => option.id"
          :picker-threshold="1"
        >
        </fgpe-select>
        <fgpe-select
          v-else-if="line.type === 'EXERCISE'"
          name="exercises"
          v-model="line.value"
          class="w-full select-large"
          :options="exercises"
          :clearable="false"
          :searchable="false"
          :multiple="false"
          :reduce="option => option.id"
          :picker-threshold="1"
        >
        </fgpe-select>
        <fgpe-select
          v-else-if="line.type === 'REWARD'"
          name="rewards"
          v-model="line.value"
          class="w-full select-large"
          :options="rewards"
          :clearable="false"
          :searchable="false"
          :multiple="false"
          :reduce="option => option.id"
          :picker-threshold="1"
        >
        </fgpe-select>
      </div>
    </multi-row-input>
  </vs-prompt>
</template>

<script>
import FgpeSelect from "@/components/FgpeSelect";
import MultiRowInput from "@/components/MultiRowInput";

export default {
  name: "ValueExtractorVariableDialog",
  components: {
    FgpeSelect,
    MultiRowInput
  },
  props: {
    active: {
      type: Boolean,
      required: true
    },
    value: {
      type: Array
    },
    exercises: {
      type: Array,
      default: () => []
    },
    challenges: {
      type: Array,
      default: () => []
    },
    rewards: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    variablesWithIds() {
      return this.variables
        .filter(variable => !!variable.value)
        .map((variable, index) => ({
          id: `V${index}`,
          ...variable
        }));
    }
  },
  data() {
    return {
      activeLocal: false,
      types: ["CHALLENGE", "EXERCISE", "REWARD"],
      variables: []
    };
  },
  watch: {
    active(val) {
      this.activeLocal = val;
    },
    value(val) {
      this.variables = val || [];
    }
  },
  methods: {}
};
</script>
