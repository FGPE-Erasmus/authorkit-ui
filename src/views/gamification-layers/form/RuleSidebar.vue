<template>
  <add-update-file-sidebar
    :name="$t('GamificationLayer._Rule')"
    :existing="!!rule.id"
    :is-sidebar-active="isSidebarActive"
    @submit="$emit('submit', ruleDto)"
    @close-sidebar="$emit('close-sidebar')"
  >
    <template v-slot:form>
      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="name"
            rules="required|max:150"
            v-slot="{ errors }"
            persist
          >
            <vs-input
              name="name"
              v-model="rule.name"
              :label-placeholder="$t('GamificationLayer.Rule.Name')"
              class="w-full"
            />
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="triggers"
            rules="required|triggers"
            v-slot="{ errors }"
            persist
          >
            <trigger-input
              name="triggers"
              v-model="rule.triggers"
              :challenges="challenges"
              :exercises="exercises"
              :rewards="rewards"
            />
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <criteria-input
            v-model="rule.criteria"
            :challenges="challenges"
            :exercises="exercises"
          />
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="actions"
            rules=""
            v-slot="{ errors }"
            persist
          >
            <multi-row-input
              :label="$t('GamificationLayer.Rule.Actions')"
              name="actions"
              v-model="actions"
              :empty-line="{
                type: 'GIVE',
                parameters: [],
                reward_parameters: []
              }"
              :empty-check="l => !l.type"
              v-slot:default="{ line }"
            >
              <div class="block">
                <div class="w-full mb-1">
                  <ValidationProvider
                    name="type"
                    rules="required"
                    v-slot="{ errors }"
                    persist
                  >
                    <fgpe-select
                      name="type"
                      v-model="line.type"
                      class="w-full select-large"
                      :placeholder="$t('GamificationLayer.Rule.ActionType')"
                      :options="action_type_choices"
                      :clearable="false"
                      :searchable="false"
                    >
                      <template slot="option" slot-scope="option">
                        <div class="d-center">
                          {{
                            $t(
                              "GamificationLayer.Rule.ActionTypes." +
                                option.label
                            )
                          }}
                        </div>
                      </template>
                      <template slot="selected-option" slot-scope="option">
                        <div class="selected d-center">
                          {{
                            $t(
                              "GamificationLayer.Rule.ActionTypes." +
                                option.label
                            )
                          }}
                        </div>
                      </template>
                    </fgpe-select>
                    <span v-show="errors[0]" class="text-danger text-sm">
                      {{ errors[0] }}
                    </span>
                  </ValidationProvider>
                </div>
                <div v-if="line.type === 'GIVE'" class="w-full mb-1">
                  <ValidationProvider
                    name="reward_parameters"
                    rules="required"
                    v-slot="{ errors }"
                    persist
                  >
                    <fgpe-select
                      name="reward_parameters"
                      v-model="line.reward_parameter"
                      class="w-full select-large"
                      :placeholder="
                        $t('GamificationLayer.Rule.ActionParameters')
                      "
                      :options="rewards"
                      :clearable="false"
                      :searchable="false"
                      :reduce="option => option.id"
                    >
                      <template slot="option" slot-scope="option">
                        <div class="d-center">
                          {{ rewardsById[option.id].label }}
                        </div>
                      </template>
                      <template slot="selected-option" slot-scope="option">
                        <div class="selected d-center">
                          {{ rewardsById[option.id].label }}
                        </div>
                      </template>
                    </fgpe-select>
                    <span v-show="errors[0]" class="text-danger text-sm">
                      {{ errors[0] }}
                    </span>
                  </ValidationProvider>
                </div>
                <div class="w-full">
                  <ValidationProvider
                    name="parameters"
                    rules="eachMax:150"
                    v-slot="{ errors }"
                    persist
                  >
                    <fgpe-chips
                      name="parameters"
                      v-model="line.parameters"
                      :placeholder="
                        $t('GamificationLayer.Rule.ActionParameters')
                      "
                      :unique="false"
                      icon-pack="mi md-16"
                      remove-icon="delete_forever"
                    >
                      <vs-chip
                        v-for="(param, i) in line.parameters"
                        :key="i"
                        @click="removeActionParameter(line, i)"
                        closable
                        icon-pack="mi"
                        close-icon="close"
                      >
                        {{ param }}
                      </vs-chip>
                    </fgpe-chips>
                    <span v-show="errors[0]" class="text-danger text-sm">
                      {{ errors[0] }}
                    </span>
                  </ValidationProvider>
                </div>
              </div>
            </multi-row-input>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>
    </template>
  </add-update-file-sidebar>
</template>

<script>
import { ValidationProvider } from "vee-validate";

import FgpeChips from "@/components/FgpeChips";
import FgpeSelect from "@/components/FgpeSelect";
import MultiRowInput from "@/components/MultiRowInput";
import AddUpdateFileSidebar from "@/components/sidebar-form/AddUpdateFileSidebar";
import CriteriaInput from "./CriteriaInput";
import TriggerInput from "./TriggerInput";

import {
  MODULE_BASE as CHALLENGE_MODULE_BASE,
  CHALLENGE_LIST
} from "@/store/challenges/challenge.constants";
import {
  MODULE_BASE as EXERCISE_MODULE_BASE,
  EXERCISE_LIST
} from "@/store/exercises/exercise.constants";
import {
  MODULE_BASE as REWARD_MODULE_BASE,
  REWARD_LIST
} from "@/store/rewards/reward.constants";

export default {
  name: "rule-sidebar",
  components: {
    ValidationProvider,
    "fgpe-chips": FgpeChips,
    "fgpe-select": FgpeSelect,
    "multi-row-input": MultiRowInput,
    "add-update-file-sidebar": AddUpdateFileSidebar,
    "criteria-input": CriteriaInput,
    "trigger-input": TriggerInput
  },
  props: {
    projectId: String,
    gamificationLayerId: String,
    parentChallengeId: String,
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    item: Object
  },
  created() {
    this.rule = JSON.parse(JSON.stringify(this.empty));
  },
  data() {
    return {
      empty: {
        name: "",
        triggers: [],
        criteria: {},
        actions: []
      },
      rule: undefined,
      action_type_choices: ["GIVE", "TAKE", "UPDATE"],

      challenges: [],
      exercises: [],
      rewards: [],

      actions: []
    };
  },
  watch: {
    isSidebarActive(val) {
      if (val) {
        this.getRewards();
        this.getChallenges();
        this.getExercises();
      } else {
        this.rule = JSON.parse(JSON.stringify(this.empty));
      }
    },
    item(val) {
      if (!val || !val.id) {
        this.rule = Object.assign({}, this.empty);
      } else {
        this.rule = Object.assign({}, this.empty, val);
      }
      const actions = [];
      this.rule.actions.forEach(a => {
        const action = {
          type: a.type
        };
        if (a.type === "GIVE") {
          action.reward_parameter = a.parameters[0];
          action.parameters = a.parameters.slice(1);
        } else {
          action.parameters = a.parameters;
        }
        actions.push(action);
      });
      this.$set(this, "actions", actions);
    },
    actions(val) {
      this.rule.actions.splice(0, this.rule.actions.length);
      const actions = val.map(a => ({
        type: a.type,
        parameters:
          a.type === "GIVE"
            ? [a.reward_parameter, ...a.parameters]
            : a.parameters
      }));
      this.rule.actions.push(...actions);
    }
  },
  computed: {
    ruleDto() {
      const dto = {
        id: this.rule.id,
        challenge_id: this.parentChallengeId || this.rule.challenge_id,
        gl_id: this.gamificationLayerId,
        name: this.rule.name,
        triggers: this.rule.triggers,
        actions: this.rule.actions,
        criteria: this.rule.criteria
      };
      return dto;
    },
    rewardsById() {
      return this.rewards.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
      }, {});
    }
  },
  methods: {
    removeActionParameter(line, i) {
      this.line.parameters.splice(i, 1);
      return false;
    },

    getRewards() {
      const query = {
        filter: [`gl_id||eq||${this.gamificationLayerId}`],
        select: ["id", "name"]
      };
      if (this.parentChallengeId) {
        query.filter.push(`challenge_id||eq||${this.parentChallengeId}`);
        query.or = [
          `gl_id||eq||${this.gamificationLayerId}`,
          `challenge_id||$isnull`
        ];
      }
      this.$store
        .dispatch(`${REWARD_MODULE_BASE}/${REWARD_LIST}`, query)
        .then(res => {
          this.rewards = res.map(reward => ({
            id: reward.id,
            label: reward.name
          }));
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to get rewards",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },

    getChallenges() {
      const query = {
        filter: [`gl_id||eq||${this.gamificationLayerId}`],
        select: ["id", "name"]
      };
      if (this.parentChallengeId) {
        query.filter.push(`parent_challenge_id||eq||${this.parentChallengeId}`);
        query.or = [
          `gl_id||eq||${this.gamificationLayerId}`,
          `parent_challenge_id||$isnull`
        ];
      }
      this.$store
        .dispatch(`${CHALLENGE_MODULE_BASE}/${CHALLENGE_LIST}`, query)
        .then(res => {
          this.challenges = res.map(challenge => ({
            id: challenge.id,
            label: challenge.name
          }));
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to get challenges",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },

    getExercises() {
      this.$store
        .dispatch(`${EXERCISE_MODULE_BASE}/${EXERCISE_LIST}`, {
          filter: [`project_id||eq||${this.projectId}`],
          select: ["id", "title", "module"]
        })
        .then(res => {
          this.exercises = res.map(exercise => ({
            id: exercise.id,
            label: exercise.module
              ? `[${exercise.module}] ${exercise.title}`
              : exercise.title
          }));
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to get exercises",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    }
  }
};
</script>
