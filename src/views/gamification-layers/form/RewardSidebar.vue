<template>
  <add-update-file-sidebar
    :type="$t('GamificationLayer._Reward')"
    :existing="!!reward.id"
    :is-sidebar-active="isSidebarActive"
    @submit="$emit('submit', rewardDto)"
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
              v-model="reward.name"
              :label-placeholder="$t('GamificationLayer.Reward.Name')"
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
            name="description"
            rules="max:500"
            v-slot="{ errors }"
            persist
          >
            <vs-textarea
              :label="$t('GamificationLayer.Reward.Description')"
              name="description"
              v-model="reward.description"
              :class="{
                hasValue: !!reward.description
              }"
              class="mt-5 w-full"
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
            name="kind"
            rules="required"
            v-slot="{ errors }"
            persist
          >
            <fgpe-select
              name="kind"
              v-model="reward.kind"
              class="mt-5 w-full select-large"
              :label-placeholder="$t('GamificationLayer.Reward.Kind')"
              :options="kind_choices"
              :clearable="false"
              :searchable="false"
            >
              <template slot="option" slot-scope="option">
                <div class="d-center">
                  {{ $t("GamificationLayer.Reward.Kinds." + option.label) }}
                </div>
              </template>
              <template slot="selected-option" slot-scope="option">
                <div class="selected d-center">
                  {{ $t("GamificationLayer.Reward.Kinds." + option.label) }}
                </div>
              </template>
            </fgpe-select>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row" v-if="reward.kind === 'POINT'">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="amount"
            rules="required"
            v-slot="{ errors }"
            persist
          >
            <label class="fgpe-label">
              {{ $t("GamificationLayer.Reward.Amount") }}
            </label>
            <vs-input-number
              name="amount"
              v-model.number="reward.amount"
              :step="1"
              size="medium"
              icon-pack="mi"
            />
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row" v-if="reward.kind === 'HINT'">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="hints"
            rules="required|minLength:1"
            v-slot="{ errors }"
            persist
          >
            <multi-row-input
              :label="$t('GamificationLayer.Reward.Hints')"
              name="hints"
              v-model="hints"
              :empty-line="{ hint: '' }"
              :empty-check="l => !l.hint"
              v-slot:default="{ line }"
            >
              <div class="flex">
                <div class="w-full">
                  <vs-input
                    name="hint"
                    v-model="line.hint"
                    :placeholder="$t('GamificationLayer.Reward.Hint')"
                    class="w-full"
                  />
                </div>
              </div>
            </multi-row-input>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row" v-if="reward.kind === 'MESSAGE'">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="congratulations"
            rules="required|minLength:1"
            v-slot="{ errors }"
            persist
          >
            <multi-row-input
              :label="$t('GamificationLayer.Reward.Congratulations')"
              name="congratulations"
              v-model="congratulations"
              :empty-line="{ congratulation: '' }"
              :empty-check="l => !l.congratulation"
              v-slot:default="{ line }"
            >
              <div class="flex">
                <div class="w-full">
                  <vs-input
                    name="congratulation"
                    v-model="line.congratulation"
                    :placeholder="$t('GamificationLayer.Reward.Congratulation')"
                    class="w-full"
                  />
                </div>
              </div>
            </multi-row-input>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row" v-if="reward.kind === 'REVEAL'">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="revealable_exercises"
            rules=""
            v-slot="{ errors }"
            persist
          >
            <fgpe-select
              name="revealable_exercises"
              v-model="reward.revealable_exercises"
              class="mt-5 w-full select-large"
              :label-placeholder="
                $t('GamificationLayer.Reward.RevealableExercises')
              "
              :options="exercises"
              :clearable="false"
              :searchable="false"
              :multiple="true"
              :reduce="option => option.id"
            >
            </fgpe-select>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row" v-if="reward.kind === 'REVEAL'">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="revealable_challenges"
            rules=""
            v-slot="{ errors }"
            persist
          >
            <fgpe-select
              name="revealable_challenges"
              v-model="reward.revealable_challenges"
              class="mt-5 w-full select-large"
              :label-placeholder="
                $t('GamificationLayer.Reward.RevealableChallenges')
              "
              :options="challenges"
              :clearable="false"
              :searchable="false"
              :multiple="true"
              :reduce="option => option.id"
            >
            </fgpe-select>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row" v-if="reward.kind === 'UNLOCK'">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="unlockable_exercises"
            rules=""
            v-slot="{ errors }"
            persist
          >
            <fgpe-select
              name="unlockable_exercises"
              v-model="reward.unlockable_exercises"
              class="mt-5 w-full select-large"
              :label-placeholder="
                $t('GamificationLayer.Reward.UnlockableExercises')
              "
              :options="exercises"
              :clearable="false"
              :searchable="false"
              :multiple="true"
              :reduce="option => option.id"
            >
            </fgpe-select>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row" v-if="reward.kind === 'UNLOCK'">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="unlockable_challenges"
            rules=""
            v-slot="{ errors }"
            persist
          >
            <fgpe-select
              name="unlockable_challenges"
              v-model="reward.unlockable_challenges"
              class="mt-5 w-full select-large"
              :label-placeholder="
                $t('GamificationLayer.Reward.UnlockableChallenges')
              "
              :options="challenges"
              :clearable="false"
              :searchable="false"
              :multiple="true"
              :reduce="option => option.id"
            >
            </fgpe-select>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <criteria-input v-model="reward.criteria" />
        </div>
      </div>
    </template>
  </add-update-file-sidebar>
</template>

<script>
import { ValidationProvider } from "vee-validate";

import FgpeSelect from "@/components/FgpeSelect";
import MultiRowInput from "@/components/MultiRowInput";
import AddUpdateFileSidebar from "@/components/sidebar-form/AddUpdateFileSidebar";
import CriteriaInput from "./CriteriaInput";

import {
  MODULE_BASE as EXERCISE_MODULE_BASE,
  EXERCISE_LIST
} from "@/store/exercises/exercise.constants";

import {
  MODULE_BASE as CHALLENGE_MODULE_BASE,
  CHALLENGE_LIST
} from "@/store/challenges/challenge.constants";

export default {
  name: "reward-sidebar",
  components: {
    ValidationProvider,
    "fgpe-select": FgpeSelect,
    "multi-row-input": MultiRowInput,
    "add-update-file-sidebar": AddUpdateFileSidebar,
    "criteria-input": CriteriaInput
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
    this.reward = JSON.parse(JSON.stringify(this.empty));
  },
  data() {
    return {
      empty: {
        name: "",
        description: "",
        kind: "POINT",
        amount: 0,
        unlockable_exercises: [],
        unlockable_challenges: [],
        revealable_exercises: [],
        revealable_challenges: [],
        hints: [],
        congratulations: [],
        criteria: {}
      },
      reward: undefined,
      kind_choices: [
        "POINT",
        "BADGE",
        "VIRTUAL_ITEM",
        "COUPON",
        "REVEAL",
        "UNLOCK",
        "HINT",
        "MESSAGE"
      ],

      exercises: [],
      challenges: [],

      hints: [],
      congratulations: []
    };
  },
  watch: {
    isSidebarActive(val) {
      if (val) {
        this.getExercises();
        this.getChallenges();
      } else {
        this.reward = JSON.parse(JSON.stringify(this.empty));
      }
    },
    item(val) {
      if (!val || !val.id) {
        this.reward = JSON.parse(JSON.stringify(this.empty));
      } else {
        this.reward = JSON.parse(JSON.stringify(val));
      }
      this.$set(
        this,
        "hints",
        this.reward.hints.map(h => ({ hint: h }))
      );
      this.$set(
        this,
        "congratulations",
        this.reward.congratulations.map(c => ({
          congratulation: c
        }))
      );
    },
    hints(val) {
      this.reward.hints.splice(0, this.reward.hints.length);
      this.reward.hints.push(...val.map(h => h.hint));
    },
    congratulations(val) {
      this.reward.congratulations.splice(0, this.reward.congratulations.length);
      this.reward.congratulations.push(...val.map(c => c.congratulation));
    }
  },
  computed: {
    rewardDto() {
      const dto = {
        id: this.reward.id,
        challenge_id: this.parentChallengeId || this.reward.challenge_id,
        gl_id: this.gamificationLayerId,
        name: this.reward.name,
        description: this.reward.description,
        kind: this.reward.kind,
        revealable_exercises: [],
        revealable_challenges: [],
        unlockable_exercises: [],
        unlockable_challenges: [],
        hints: [],
        congratulations: [],
        amount: 0,
        criteria: this.reward.criteria
      };
      if (this.reward.kind === "POINT") {
        dto.amount = this.reward.amount;
      } else if (this.reward.kind === "REVEAL") {
        dto.revealable_exercises = this.reward.revealable_exercises.map(id => ({
          id
        }));
        dto.revealable_challenges = this.reward.revealable_challenges.map(
          id => ({
            id
          })
        );
      } else if (this.reward.kind === "UNLOCK") {
        dto.unlockable_exercises = this.reward.unlockable_exercises.map(id => ({
          id
        }));
        dto.unlockable_challenges = this.reward.unlockable_challenges.map(
          id => ({ id })
        );
      } else if (this.reward.kind === "HINT") {
        dto.hints = this.reward.hints;
      } else if (this.reward.kind === "MESSAGE") {
        dto.congratulations = this.reward.congratulations;
      }
      return dto;
    }
  },

  methods: {
    getExercises() {
      this.$store
        .dispatch(`${EXERCISE_MODULE_BASE}/${EXERCISE_LIST}`, {
          filter: [`project_id||eq||${this.projectId}`],
          select: ["id", "title"]
        })
        .then(res => {
          this.exercises = res.map(exercise => ({
            id: exercise.id,
            label: exercise.title
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
    },

    getChallenges() {
      this.$store
        .dispatch(`${CHALLENGE_MODULE_BASE}/${CHALLENGE_LIST}`, {
          filter: [`gl_id||eq||${this.gamificationLayerId}`],
          select: ["id", "name"]
        })
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
    }
  }
};
</script>
