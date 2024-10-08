<template>
  <add-update-file-sidebar
    :name="$t('GamificationLayer._Template')"
    :is-exercise-active="isExerciseActive"
    :is-sidebar-active="isSidebarActive"
    @submit="$emit('submit', templateDto)"
    @close-sidebar="$emit('close-sidebar')"
  >
    <template v-slot:form>
      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="templates"
            rules=""
            v-slot="{ errors }"
            persist
          >
            <fgpe-select
              name="templates"
              v-model="challenge.templates"
              class="mt-5 w-full select-large"
              :label-placeholder="
                $t('GamificationLayer.Challenge.AvailableTemplates')
              "
              :options="templates"
              :clearable="false"
              :searchable="true"
              :multiple="false"
              :reduce="option => option.id"
              :picker-threshold="1"
              @input="selectedTemplate()"
            >
            </fgpe-select>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>
      <div ref="exercises" class="vx-row">
        <div>
          <label
            id="exercises_number"
            class="vx-col w-full mb-2 fgpe-select--label"
            ref="exercises_number"
          >
            {{ $t("SelectExercises.Exercises") }}
          </label>
        </div>
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
              :searchable="true"
              :multiple="true"
              :reduce="option => option.id"
              :picker-threshold="1"
            >
            </fgpe-select>
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

import FgpeSelect from "@/components/FgpeSelect";
import AddUpdateFileSidebar from "@/components/sidebar-form/AddUpdateFileSidebar";
import {
  MODULE_BASE as EXERCISE_MODULE_BASE,
  EXERCISE_LIST
} from "@/store/exercises/exercise.constants";
import {
  MODULE_BASE as GAMIFICATION_MODULE_BASE,
  GAMIFICATION_LAYER_TEMPLATES
} from "@/store/gamification-layers/gamification-layer.constants";

export default {
  name: "template-sidebar",
  components: {
    ValidationProvider,
    "fgpe-select": FgpeSelect,
    "add-update-file-sidebar": AddUpdateFileSidebar
  },
  props: {
    gamificationLayerId: String,
    parentChallengeId: String,
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    isExerciseActive: {
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
        this.getTemplates();
      } else {
        this.challenge = JSON.parse(JSON.stringify(this.empty));
      }
      if (!this.isExerciseActive) {
        this.$refs.exercises.style.visibility = "hidden";
        this.templates = [];
        this.exercises = [];
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
        templates: [],
        exercises: []
      },
      challenge: undefined,
      pickerActive: false,
      exercises: [],
      templates: []
    };
  },
  computed: {
    templateDto() {
      return {
        id: this.challenge.id,
        gl_id: this.gamificationLayerId,
        parent_challenge_id: this.parentChallengeId,
        exercises: this.challenge.exercises
          ? this.challenge.exercises.map(id => ({ id }))
          : [],
        templates: this.templates.find(
          ({ id }) => id === this.challenge.templates
        )
      };
    }
  },
  methods: {
    openPicker() {
      this.pickerActive = true;
    },

    selectedTemplate() {
      this.$refs.exercises.style.visibility = "visible";
      this.getExercises();
    },

    getTemplates() {
      this.$store
        .dispatch(`${GAMIFICATION_MODULE_BASE}/${GAMIFICATION_LAYER_TEMPLATES}`)
        .then(res => {
          for (const [key, value] of Object.entries(res)) {
            console.log(key);
            this.templates.push(value);
          }
        })
        .catch(err => {
          console.log(err);
          this.$vs.notify({
            title: "Failed to get templates",
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
