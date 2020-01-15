<template>
  <fgpe-card id="exercise-form">
    <form-wizard
      ref="exercise-wizard"
      color="rgba(var(--vs-primary), 1)"
      errorColor="rgba(var(--vs-danger), 1)"
      :title="null"
      :subtitle="null"
      finishButtonText="Submit"
    >
      <tab-content
        :title="$t('Exercise.Form.Metadata')"
        class="mb-5"
        icon="mi label"
        :before-change="submitMetadata"
      >
        <ValidationObserver ref="metadata-observer">
          <exercise-metadata-step v-model="metadata" />
        </ValidationObserver>
      </tab-content>
      <tab-content
        :title="$t('Exercise.Form.Presentation')"
        class="mb-5"
        icon="mi remove_red_eye"
      >
        <exercise-presentation-step :id="exerciseId" v-model="presentation" />
      </tab-content>
      <tab-content
        :title="$t('Exercise.Form.Evaluation')"
        class="mb-5"
        icon="mi check_circle"
      >
        <exercise-evaluation-step :id="exerciseId" v-model="evaluation" />
      </tab-content>
      <tab-content
        :title="$t('Exercise.Form.Tools')"
        class="mb-5"
        icon="mi build"
      >
        <exercise-tools-step :id="exerciseId" v-model="tools" />
      </tab-content>
      <template slot="footer" slot-scope="props">
        <div class="wizard-footer-left">
          <wizard-button
            v-if="props.activeTabIndex > 0"
            @click.native="props.prevTab()"
            class="vs-button vs-button-primary"
            :style="props.fillButtonStyle"
          >
            {{ $t("Form.Previous") }}
          </wizard-button>
        </div>
        <div class="wizard-footer-right">
          <wizard-button
            v-if="!props.isLastStep"
            @click.native="props.nextTab()"
            class="wizard-footer-right vs-button vs-button-primary vs-button-filled"
            :style="props.fillButtonStyle"
          >
            {{ $t("Form.Next") }}
          </wizard-button>
          <wizard-button
            v-else
            @click.native="$router.push(`/projects/${projectId}/exercises`)"
            class="wizard-footer-right finish-button"
            :style="props.fillButtonStyle"
          >
            {{ $t("Form.Done") }}
          </wizard-button>
        </div>
      </template>
    </form-wizard>
  </fgpe-card>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { FormWizard, TabContent, WizardButton } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

import {
  MODULE_BASE,
  EXERCISE_CREATE,
  EXERCISE_UPDATE,
  EXERCISE_GET
} from "@/store/exercises/exercise.constants";

import MetadataStep from "./form/MetadataStep";
import PresentationStep from "./form/PresentationStep";
import EvaluationStep from "./form/EvaluationStep";
import ToolsStep from "./form/ToolsStep";

export default {
  props: {},
  components: {
    ValidationObserver,
    FormWizard,
    TabContent,
    WizardButton,
    "exercise-metadata-step": MetadataStep,
    "exercise-presentation-step": PresentationStep,
    "exercise-evaluation-step": EvaluationStep,
    "exercise-tools-step": ToolsStep
  },
  data() {
    return {
      empty: {
        ...this.emptyMetadata,
        ...this.emptyPresentation,
        ...this.emptyEvaluation,
        ...this.emptyTools
      },
      emptyMetadata: {
        title: "",
        module: "",
        keywords: [],
        type: "",
        event: "",
        platform: "",
        difficulty: "",
        status: ""
      },
      emptyPresentation: {
        instructions: [],
        statements: [],
        embeddables: [],
        skeletons: []
      },
      emptyEvaluation: {
        libraries: [],
        static_correctors: [],
        dynamic_correctors: [],
        solutions: [],
        templates: [],
        tests: [],
        test_sets: []
      },
      emptyTools: {
        test_generators: [],
        feedback_generators: []
      },
      id: undefined,
      metadata: undefined,
      presentation: undefined,
      evaluation: undefined,
      tools: undefined,
      changed: false
    };
  },
  computed: {
    exerciseId() {
      return this.id || this.$route.params.id;
    },
    projectId() {
      return (
        (this.metadata && this.metadata.project_id) ||
        this.$route.params.project_id
      );
    },
    isNew() {
      return this.exerciseId && this.exerciseId.toLowerCase() === "new";
    }
  },
  created() {
    this.metadata = Object.assign({}, this.emptyMetadata);
    this.presentation = Object.assign({}, this.emptyPresentation);
    this.evaluation = Object.assign({}, this.emptyEvaluation);
    this.tools = Object.assign({}, this.emptyTools);
  },

  mounted() {
    this.$refs["exercise-wizard"].reset();
    if (!this.isNew) {
      this.getExercise(this.$route.params.id);
    } else {
      this.metadata = Object.assign({}, this.emptyMetadata);
      this.presentation = Object.assign({}, this.emptyPresentation);
      this.evaluation = Object.assign({}, this.emptyEvaluation);
      this.tools = Object.assign({}, this.emptyTools);
    }
    this.$nextTick(() => {
      this.changed = false;
    });
  },
  watch: {
    metadata: {
      handler() {
        this.changed = true;
      },
      deep: true
    }
  },

  methods: {
    getExercise(id) {
      this.$store
        .dispatch(`${MODULE_BASE}/${EXERCISE_GET}`, {
          id,
          query: {
            join: [
              "instructions",
              "statements",
              "embeddables",
              "skeletons",
              "libraries",
              "static_correctors",
              "dynamic_correctors",
              "solutions",
              "templates",
              "tests",
              "test_sets",
              "test_generators",
              "feedback_generators"
            ]
          }
        })
        .then(res => {
          this.unwrap(res);
          this.$refs["exercise-wizard"].activateAll();
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to Get Exercise",
            text: err.message,
            iconPack: "feather",
            icon: "icon-x-circle",
            color: "danger"
          });
        });
    },

    unwrap(exercise) {
      this.id = exercise.id;
      this.metadata = {
        title: exercise.title,
        module: exercise.module,
        keywords: exercise.keywords,
        type: exercise.type,
        event: exercise.event,
        platform: exercise.platform,
        difficulty: exercise.difficulty,
        status: exercise.status
      };
      this.presentation = {
        instructions: exercise.instructions,
        statements: exercise.statements,
        embeddables: exercise.embeddables,
        skeletons: exercise.skeletons
      };
      this.evaluation = {
        libraries: exercise.libraries,
        static_correctors: exercise.static_correctors,
        dynamic_correctors: exercise.dynamic_correctors,
        solutions: exercise.solutions,
        templates: exercise.templates,
        tests: exercise.tests,
        test_sets: exercise.test_sets
      };
      this.tools = {
        test_generators: exercise.test_generators,
        feedback_generators: exercise.feedback_generators
      };
      this.$nextTick(() => {
        this.changed = false;
      });
    },

    async submitMetadata() {
      if (!this.changed) {
        return true;
      }
      const result = await this.validateStepMetadata();
      if (result) {
        if (this.isNew) {
          let failed = false;
          const exercise = await this.create().catch(() => (failed = true));
          if (failed) {
            return false;
          }
          this.id = exercise.id;
          this.changed = false;
          return true;
        } else {
          let failed = false;
          await this.update().catch(() => (failed = true));
          if (failed) {
            return false;
          }
          this.changed = false;
          return true;
        }
      }
    },

    validateStepMetadata() {
      return this.$refs["metadata-observer"].validate();
    },

    create() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(
            `${MODULE_BASE}/${EXERCISE_CREATE}`,
            Object.assign({ project_id: this.projectId }, this.metadata)
          )
          .then(res => {
            this.$vs.notify({
              title: "Exercise Created",
              text: `Exercise ${res.title} has been created successfully.`,
              iconPack: "mi",
              icon: "check_circle",
              color: "success"
            });
            resolve(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: "Failed to Create Exercise",
              text: err.message,
              iconPack: "feather",
              icon: "icon-x-circle",
              color: "danger"
            });
            reject(err);
          });
      });
    },
    update() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(`${MODULE_BASE}/${EXERCISE_UPDATE}`, {
            id: this.exerciseId,
            exercise: Object.assign(
              { project_id: this.projectId },
              this.metadata
            )
          })
          .then(res => {
            this.$vs.notify({
              title: "Exercise Updated",
              text: `Exercise ${res.title} has been updated successfully.`,
              iconPack: "mi",
              icon: "check_circle",
              color: "success"
            });
            resolve(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: "Failed to Update Exercise",
              text: err.message,
              iconPack: "feather",
              icon: "icon-x-circle",
              color: "danger"
            });
            reject(err);
          });
      });
    }
  }
};
</script>
