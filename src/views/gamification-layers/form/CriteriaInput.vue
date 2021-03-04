<template>
  <ValidationProvider
    name="criteria"
    rules="criteria"
    v-slot="{ errors }"
    persist
  >
    <multi-row-input
      name="criteria"
      :label="$t('GamificationLayer._Criteria')"
      :value="conditions"
      @input="onChangeCriteria"
      :empty-line="{
        condition: {
          order: conditions.length,
          left_entity: 'FIXED',
          left_property: '',
          comparing_function: 'LESS_THAN',
          right_entity: 'FIXED',
          right_property: ''
        },
        junctor: 'AND'
      }"
      v-slot:default="{ line, index }"
    >
      <div class="block">
        <div class="w-full mb-1">
          <fgpe-select
            name="left_entity"
            v-model="line.condition.left_entity"
            class="w-full select-large"
            :placeholder="$t('GamificationLayer.Criteria.LeftEntity')"
            :options="entity_choices"
            :clearable="false"
            :searchable="false"
          >
            <template slot="option" slot-scope="option">
              <div class="d-center">
                {{ $t("GamificationLayer.Criteria.Subjects." + option.label) }}
              </div>
            </template>
            <template slot="selected-option" slot-scope="option">
              <div class="selected d-center">
                {{ $t("GamificationLayer.Criteria.Subjects." + option.label) }}
              </div>
            </template>
          </fgpe-select>
        </div>

        <div class="w-full mb-1">
          <value-extractor-input
            name="left_property"
            :value="line.condition.left_property"
            @input="line.condition.left_property = $event"
            :challenges="challenges"
            :exercises="exercises"
            :mode="line.condition.left_entity"
            :placeholder="$t('GamificationLayer.Criteria.LeftProperty')"
            class="w-full"
          />
        </div>

        <div class="w-full mb-1">
          <fgpe-select
            name="comparing_function"
            v-model="line.condition.comparing_function"
            class="w-full select-large"
            :placeholder="$t('GamificationLayer.Criteria.ComparingFunction')"
            :options="compfunction_choices"
            :clearable="false"
            :searchable="false"
          >
            <template slot="option" slot-scope="option">
              <div class="d-center">
                {{
                  $t(
                    "GamificationLayer.Criteria.ComparingFunctions." +
                      option.label
                  )
                }}
              </div>
            </template>
            <template slot="selected-option" slot-scope="option">
              <div class="selected d-center">
                {{
                  $t(
                    "GamificationLayer.Criteria.ComparingFunctions." +
                      option.label
                  )
                }}
              </div>
            </template>
          </fgpe-select>
        </div>

        <div v-if="showRightProperty(line)" class="w-full mb-1">
          <fgpe-select
            name="right_entity"
            v-model="line.condition.right_entity"
            class="w-full select-large"
            :placeholder="$t('GamificationLayer.Criteria.RightEntity')"
            :options="entity_choices"
            :clearable="false"
            :searchable="false"
          >
            <template slot="option" slot-scope="option">
              <div class="d-center">
                {{ $t("GamificationLayer.Criteria.Subjects." + option.label) }}
              </div>
            </template>
            <template slot="selected-option" slot-scope="option">
              <div class="selected d-center">
                {{ $t("GamificationLayer.Criteria.Subjects." + option.label) }}
              </div>
            </template>
          </fgpe-select>
        </div>

        <div v-if="showRightProperty(line)" class="w-full mb-1">
          <value-extractor-input
            name="right_property"
            :value="line.condition.right_property"
            @input="line.condition.right_property = $event"
            :challenges="challenges"
            :exercises="exercises"
            :mode="line.condition.right_entity"
            :placeholder="$t('GamificationLayer.Criteria.RightProperty')"
            class="w-full"
          />
        </div>

        <div v-show="index + 1 < conditions.length" class="w-full mt-4 mb-2">
          <fgpe-select
            name="junctor"
            v-model="line.junctor"
            class="w-full select-large"
            :placeholder="$t('GamificationLayer.Criteria.Junctor')"
            :options="junctor_choices"
            :clearable="false"
            :searchable="false"
          >
            <template slot="option" slot-scope="option">
              <div class="d-center">
                {{ $t("GamificationLayer.Criteria.Junctors." + option.label) }}
              </div>
            </template>
            <template slot="selected-option" slot-scope="option">
              <div class="selected d-center">
                {{ $t("GamificationLayer.Criteria.Junctors." + option.label) }}
              </div>
            </template>
          </fgpe-select>
        </div>
      </div>
    </multi-row-input>
    <span v-show="errors[0]" class="text-danger text-sm">
      {{ errors[0] }}
    </span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

import FgpeSelect from "@/components/FgpeSelect";
import MultiRowInput from "@/components/MultiRowInput";
import ValueExtractorInput from "@/components/value-extractor-input/ValueExtractorInput";

export default {
  name: "criteria-input",
  components: {
    ValueExtractorInput,
    ValidationProvider,
    "fgpe-select": FgpeSelect,
    "multi-row-input": MultiRowInput
  },
  props: {
    value: {
      type: Object
    },
    exercises: {
      type: Array,
      default: () => []
    },
    challenges: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    showRightProperty() {
      return l =>
        !(
          l.condition.comparing_function === "IS_EMPTY" ||
          l.condition.comparing_function === "NOT_EMPTY"
        );
    }
  },
  data() {
    return {
      entity_choices: ["FIXED", "EVENT", "ACTION", "PLAYER", "ENVIRONMENT"],
      compfunction_choices: [
        "LESS_THAN",
        "GREATER_THAN",
        "LESS_OR_EQUAL",
        "GREAT_OR_EQUAL",
        "EQUALS",
        "NOT_EQUALS",
        "STARTS_WITH",
        "MATCHES",
        "NOT_MATCHES",
        "IS_EMPTY",
        "NOT_EMPTY",
        "IN",
        "NOT_IN"
      ],
      junctor_choices: ["AND", "OR"],

      conditions: []
    };
  },
  watch: {
    value(val) {
      if (val && val.conditions) {
        const conds = [];
        val.conditions.forEach(condition => {
          conds.push({ condition });
        });
        conds.sort((a, b) => (a.condition.order > b.condition.order ? 1 : -1));
        conds.forEach((condition, i) => {
          condition.junctor = val.junctors[i];
        });
        this.conditions = conds;
      } else {
        this.conditions = [];
      }
    }
  },
  methods: {
    onChangeCriteria(val) {
      this.$emit("input", {
        conditions: val.map((c, i) => ({
          ...c.condition,
          order: i
        })),
        junctors: val.map(c => c.junctor)
      });
    }
  }
};
</script>
