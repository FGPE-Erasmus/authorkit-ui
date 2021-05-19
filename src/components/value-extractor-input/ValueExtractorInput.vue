<template>
  <div class="value-extractor-input">
    <div v-show="mode !== 'FIXED'" class="vs-con-input">
      <autocomplete
        ref="jsonpath"
        name="jsonpath"
        :placeholder="placeholder || $t('ValueExtractor.Title')"
        :value="jsonPathExpr"
        @input="onInput($event)"
        :search="search"
        :debounce-time="50"
        :class="{
          input: true,
          'mb-2': true
        }"
        :get-result-value="getSuggestionLabel"
        @submit="onSelectSuggestion"
      ></autocomplete>
    </div>
    <vs-input
      v-if="mode === 'FIXED'"
      name="right_property"
      v-model="jsonPathExpr"
      :placeholder="placeholder || $t('ValueExtractor.Title')"
      class="w-full mb-2"
    />
    <div class="flex flex-wrap">
      <div class="flex flex-wrap w-full">
        <vs-chip
          v-for="variable in variables"
          :key="variable.id"
          color="primary"
          @click.native="jsonPathExpr = jsonPathExpr + '${' + variable.id + '}'"
        >
          <vs-avatar :text="variable.id" />
          {{ title(variable) }}
        </vs-chip>
      </div>
      <div class="flex w-full">
        <span
          class="text-primary cursor-pointer ml-auto mt-2"
          @click="openVariableDialog()"
        >
          {{ $t("ValueExtractor.EditVariables") }}
        </span>
      </div>
    </div>
    <value-extractor-variable-dialog
      :active="variableDialogActive"
      :value="variables"
      :challenges="challenges"
      :exercises="exercises"
      @accept="
        variables = $event;
        variableDialogActive = false;
      "
      @cancel="variableDialogActive = false"
      @close="variableDialogActive = false"
    />
  </div>
</template>

<script>
import { JSONPath } from "jsonpath-plus";

import ValueExtractorVariableDialog from "@/components/value-extractor-input/ValueExtractorVariableDialog";
import { getSuggestions } from "@/components/value-extractor-input/suggestionBuilder";
import colors from "../../../colors.config.json";
import {
  insertAtCursor,
  setCaretPosition
} from "@/components/value-extractor-input/getInputSelection";

import {
  SAMPLE_ACTION,
  SAMPLE_ENVIRONMENT,
  SAMPLE_EVENT,
  SAMPLE_PLAYER
} from "./environment";

export default {
  name: "ValueExtractorInput",
  components: {
    ValueExtractorVariableDialog
  },
  props: {
    placeholder: {
      type: String
    },
    value: {
      type: String
    },
    exercises: {
      type: Array,
      default: () => []
    },
    challenges: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String
    }
  },
  computed: {
    fullJsonExpression() {
      let expression = this.jsonPathExpr;
      this.variables.forEach(variable => {
        expression = expression.replaceAll(
          "${" + variable.id + "}",
          variable.value
        );
      });
      return expression;
    },
    validJSONPathExpression() {
      try {
        return JSONPath({
          path: this.fullJsonExpression,
          json: {},
          wrap: false
        });
      } catch (e) {
        return false;
      }
    },
    challengesById() {
      return this.challenges.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
      }, {});
    },
    exercisesById() {
      return this.exercises.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
      }, {});
    }
  },

  watch: {
    jsonPathExpr() {
      this.$emit("input", this.fullJsonExpression);
    },
    exercises() {
      this.variables = this.buildVariablesFromExpr(this.fullJsonExpression);
    },
    challenges() {
      this.variables = this.buildVariablesFromExpr(this.fullJsonExpression);
    }
  },

  data() {
    return {
      isFocus: false,
      types: ["CHALLENGE", "EXERCISE"],
      variableDialogActive: false,
      jsonPathExpr: "",
      variables: []
    };
  },
  mounted() {
    const jsonpathInput = this.$refs.jsonpath.$el.querySelector("input");
    jsonpathInput.addEventListener("keydown", event => {
      const { key } = event;
      if (
        key === "ArrowLeft" ||
        key === "Left" ||
        key === "ArrowRight" ||
        key === "Right"
      ) {
        this.$refs.jsonpath.core.handleInput({
          target: { value: this.jsonPathExpr }
        });
      }
    });
    jsonpathInput.addEventListener("click", () => {
      this.$refs.jsonpath.core.handleInput({
        target: { value: this.jsonPathExpr }
      });
    });

    this.$nextTick(() => {
      this.variables = this.buildVariablesFromExpr(this.value);
      this.jsonPathExpr = this.replaceUUIDsByVariablesInExpr(
        this.value,
        this.variables
      );
    });
  },
  methods: {
    styleLabel() {
      return {
        color: this.isFocus ? colors[this.color] : null
      };
    },
    extractUUIDs(str) {
      const re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/gi;
      const uuids = [];
      let match;
      while ((match = re.exec(str))) {
        if (!uuids.includes(match[1])) {
          uuids.push(match[1]);
        }
      }
      return uuids;
    },
    buildVariablesFromExpr(expr) {
      return this.extractUUIDs(expr).reduce((acc, nextValue, i) => {
        acc.push({
          id: `V${i}`,
          type: Object.keys(this.exercisesById).includes(nextValue)
            ? "EXERCISE"
            : "CHALLENGE",
          value: nextValue
        });
        return acc;
      }, []);
    },
    replaceUUIDsByVariablesInExpr(expr, variables) {
      let variableExpr = expr;
      for (const variable of variables) {
        variableExpr = variableExpr.replaceAll(
          variable.value,
          "${" + variable.id + "}"
        );
      }
      return variableExpr;
    },
    openVariableDialog() {
      this.variableDialogActive = true;
    },
    title(variable) {
      if (!variable.value) {
        return "";
      }
      const title =
        variable.type === "EXERCISE"
          ? this.exercisesById[variable.value] &&
            this.exercisesById[variable.value].label
          : this.challengesById[variable.value] &&
            this.challengesById[variable.value].label;
      if (title && title.length > 10) {
        return title.substr(0, 10) + "...";
      }
      return title;
    },
    search(input) {
      return new Promise(resolve => {
        setTimeout(() => {
          const caretPos = this.$refs.jsonpath.$el.querySelector("input")
            .selectionStart;
          const sandbox = Object.assign(
            {},
            ...this.variables.map(variable => ({
              ["${" + variable.id + "}"]: variable.value
            }))
          );
          let sample;
          switch (this.mode) {
            case "ENVIRONMENT":
              sample = SAMPLE_ENVIRONMENT;
              break;
            case "PLAYER":
              sample = SAMPLE_PLAYER;
              break;
            case "EVENT":
              sample = SAMPLE_EVENT;
              break;
            case "ACTION":
              sample = SAMPLE_ACTION;
              break;
          }
          resolve(getSuggestions(input, caretPos, sample, sandbox));
        }, 200);
      });
    },
    getSuggestionLabel(suggestion) {
      return `${suggestion.value} - ${suggestion.description}`;
    },
    onSelectSuggestion(suggestion) {
      const caretPos = this.$refs.jsonpath.$el.querySelector("input")
        .selectionStart;
      const initialJsonPathLength = this.jsonPathExpr.length;

      const parentJsonPath = this.jsonPathExpr.substring(
        0,
        this.jsonPathExpr.lastIndexOf(".") + 1
      );
      const suggestionsFilter = this.jsonPathExpr.substring(
        this.jsonPathExpr.lastIndexOf(".") + 1
      );

      if (suggestion.value.includes(suggestionsFilter)) {
        this.jsonPathExpr = parentJsonPath + suggestion.value;
      } else {
        const input = this.$refs.jsonpath.$el.querySelector("input");
        this.jsonPathExpr = insertAtCursor(
          this.jsonPathExpr,
          input.selectionStart,
          input.selectionEnd,
          suggestion.value
        );
      }

      if (suggestion.setCarretAt) {
        setCaretPosition(
          this.$refs.jsonpath.$el.querySelector("input"),
          (caretPos ? caretPos : initialJsonPathLength) + suggestion.setCarretAt
        );
      }
    },

    onInput() {
      this.jsonPathExpr = this.$refs.jsonpath.$el.querySelector("input").value;
    }
  }
};
</script>
