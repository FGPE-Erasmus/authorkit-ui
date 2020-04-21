<template>
  <add-update-file-sidebar
    :type="$t('GamificationLayer._Challenge')"
    :existing="!!challenge.id"
    :is-sidebar-active="isSidebarActive"
    @submit="$emit('submit', challengeDto)"
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
              v-model="challenge.name"
              :label-placeholder="$t('GamificationLayer.Challenge.Name')"
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
              :label="$t('GamificationLayer.Challenge.Description')"
              name="description"
              v-model="challenge.description"
              :class="{
                hasValue: !!challenge.description
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
            name="mode"
            rules="required"
            v-slot="{ errors }"
            persist
          >
            <fgpe-select
              name="mode"
              v-model="challenge.mode"
              class="mt-5 w-full select-large"
              :label-placeholder="$t('GamificationLayer.Challenge.Mode')"
              :options="mode_choices"
              :clearable="false"
              :searchable="false"
            >
              <template slot="option" slot-scope="option">
                <div class="d-center">
                  {{ $t("GamificationLayer.Challenge.Modes." + option.label) }}
                </div>
              </template>
              <template slot="selected-option" slot-scope="option">
                <div class="selected d-center">
                  {{ $t("GamificationLayer.Challenge.Modes." + option.label) }}
                </div>
              </template>
            </fgpe-select>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="mode_parameters"
            rules="eachMax:150"
            v-slot="{ errors }"
            persist
          >
            <fgpe-chips
              name="mode_parameters"
              v-model="challenge.mode_parameters"
              :label-placeholder="
                $t('GamificationLayer.Challenge.ModeParameters')
              "
              class="mt-5"
              :unique="false"
              icon-pack="mi md-16"
              remove-icon="delete_forever"
            >
              <vs-chip
                v-for="(param, i) in challenge.mode_parameters"
                :key="i"
                @click="removeModeParameter(param)"
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

      <div class="vx-row">
        <div class="vx-col w-full">
          <vs-checkbox
            name="hidden"
            v-model="challenge.hidden"
            class="mt-5 w-full"
            icon-pack="mi md-16"
          >
            {{ $t("GamificationLayer.Challenge.Hidden") }}
          </vs-checkbox>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <vs-checkbox
            name="locked"
            v-model="challenge.locked"
            class="mt-5 w-full"
            icon-pack="mi md-16"
          >
            {{ $t("GamificationLayer.Challenge.Locked") }}
          </vs-checkbox>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="difficulty"
            rules="required"
            v-slot="{ errors }"
            persist
          >
            <fgpe-select
              name="difficulty"
              v-model="challenge.difficulty"
              class="mt-5 w-full select-large"
              :label-placeholder="$t('GamificationLayer.Challenge.Difficulty')"
              :options="difficulty_choices"
              :clearable="false"
              :searchable="false"
            >
              <template slot="option" slot-scope="option">
                <div class="d-center">
                  {{
                    $t(
                      "GamificationLayer.Challenge.Difficulties." + option.label
                    )
                  }}
                </div>
              </template>
              <template slot="selected-option" slot-scope="option">
                <div class="selected d-center">
                  {{
                    $t(
                      "GamificationLayer.Challenge.Difficulties." + option.label
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
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="exercises"
            rules=""
            v-slot="{ errors }"
            persist
          >
            <fgpe-select
              name="exercises"
              v-model="challenge.exercises"
              class="mt-5 w-full select-large"
              :label-placeholder="
                $t('GamificationLayer.Challenge.LinkedExercises')
              "
              :options="exercises"
              :clearable="false"
              :searchable="false"
              :multiple="true"
              :reduce="option => option.id"
            >
            </fgpe-select>
            <div class="flex flex-wrap">
              <span
                class="text-primary cursor-pointer ml-auto mt-2"
                @click="openPicker()"
              >
                {{ $t("GamificationLayer.OpenExercisePicker") }}
              </span>
            </div>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>
      <pick-exercises-dialog
        :project-id="projectId"
        :active="pickerActive"
        :selected="challenge.exercises"
        @pick="onExercisesSelected"
        @cancel="pickerActive = false"
      />
    </template>
  </add-update-file-sidebar>
</template>

<script>
import { ValidationProvider } from "vee-validate";

import FgpeChips from "@/components/FgpeChips";
import FgpeSelect from "@/components/FgpeSelect";
import AddUpdateFileSidebar from "@/components/sidebar-form/AddUpdateFileSidebar";
import {
  MODULE_BASE as EXERCISE_MODULE_BASE,
  EXERCISE_LIST
} from "@/store/exercises/exercise.constants";
import PickExercisesDialog from "@/views/gamification-layers/dialog/PickExercisesDialog";

export default {
  name: "challenge-sidebar",
  components: {
    ValidationProvider,
    "fgpe-chips": FgpeChips,
    "fgpe-select": FgpeSelect,
    "add-update-file-sidebar": AddUpdateFileSidebar,
    PickExercisesDialog
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
    this.challenge = JSON.parse(JSON.stringify(this.empty));
  },
  watch: {
    isSidebarActive(val) {
      if (val) {
        this.getExercises();
      } else {
        this.challenge = JSON.parse(JSON.stringify(this.empty));
      }
    },
    item(val) {
      if (!val) {
        this.challenge = Object.assign({}, this.empty);
      } else {
        this.challenge = Object.assign({}, val);
      }
    }
  },
  data() {
    return {
      empty: {
        name: "",
        description: "",
        mode: "NORMAL",
        mode_parameters: [],
        locked: false,
        hidden: false,
        difficulty: "BEGINNER",
        exercises: []
      },
      challenge: undefined,
      mode_choices: [
        "NORMAL",
        "SHAPESHIFTER",
        "SHORTENING",
        "SPEEDUP",
        "HACK_IT",
        "TIME_BOMB",
        "DUEL"
      ],
      difficulty_choices: ["BEGINNER", "EASY", "AVERAGE", "HARD", "MASTER"],
      pickerActive: false,
      exercises: []
    };
  },
  computed: {
    challengeDto() {
      return {
        id: this.challenge.id,
        gl_id: this.gamificationLayerId,
        parent_challenge_id: this.parentChallengeId,
        name: this.challenge.name,
        description: this.challenge.description,
        mode: this.challenge.mode,
        mode_parameters: this.challenge.mode_parameters,
        locked: this.challenge.locked,
        hidden: this.challenge.hidden,
        difficulty: this.challenge.difficulty,
        exercises: this.challenge.exercises
          ? this.challenge.exercises.map(id => ({ id }))
          : []
      };
    }
  },
  methods: {
    removeModeParameter(param) {
      this.challenge.mode_parameters.splice(
        this.challenge.mode_parameters.indexOf(param),
        1
      );
      return false;
    },

    openPicker() {
      this.pickerActive = true;
    },

    onExercisesSelected(exercises) {
      this.pickerActive = false;
      this.challenge.exercises = exercises;
    },

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
    }
  }
};
</script>
