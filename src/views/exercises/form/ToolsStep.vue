<template>
  <form>
    <executable-file-sidebar
      type="feedback-generators"
      :name="$t('Exercise.FeedbackGenerator')"
      :is-sidebar-active="isFeedbackGeneratorsSidebarActive"
      :item="feedbackGenerator"
      @submit="saveFeedbackGenerator"
      @close-sidebar="isFeedbackGeneratorsSidebarActive = false"
    />
    <executable-file-sidebar
      type="test-generators"
      :name="$t('Exercise.TestGenerator')"
      :is-sidebar-active="isTestGeneratorsSidebarActive"
      :item="testGenerator"
      @submit="saveTestGenerator"
      @close-sidebar="isTestGeneratorsSidebarActive = false"
    />
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <fgpe-file-list
          :default-category="$t('Exercise.FeedbackGenerators')"
          :items="feedbackGenerators"
          item-title-prop="filename"
          item-subtitle-prop="command_line"
          @create="activateFeedbackGeneratorsSidebar"
          @edit="activateFeedbackGeneratorsSidebar"
          @delete="removeFeedbackGenerator"
        >
        </fgpe-file-list>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <fgpe-file-list
          :default-category="$t('Exercise.TestGenerators')"
          :items="testGenerators"
          item-title-prop="filename"
          item-subtitle-prop="command_line"
          @create="activateTestGeneratorsSidebar"
          @edit="activateTestGeneratorsSidebar"
          @delete="removeTestGenerator"
        >
        </fgpe-file-list>
      </div>
    </div>
  </form>
</template>

<script>
import { filenameFromPath } from "@/assets/utils/file";

import {
  MODULE_BASE,
  EXERCISE_FILE_CREATE,
  EXERCISE_FILE_UPDATE,
  EXERCISE_FILE_DELETE
} from "@/store/exercises/exercise.constants";

import FgpeFileList from "@/components/FgpeFileList";

import ExecutableFileSidebar from "./ExecutableFileSidebar";

export default {
  name: "exercise-tools-step",
  components: {
    "fgpe-file-list": FgpeFileList,
    "executable-file-sidebar": ExecutableFileSidebar
  },
  props: {
    id: String,
    value: {
      type: Object
    }
  },
  computed: {
    exerciseId() {
      return this.id || this.$route.params.id;
    },
    feedbackGenerators() {
      return this.tools.feedback_generators.map(feedbackGenerator => {
        return {
          ...feedbackGenerator,
          filename: filenameFromPath(feedbackGenerator.pathname)
        };
      });
    },
    testGenerators() {
      return this.tools.test_generators.map(testGenerator => {
        return {
          ...testGenerator,
          filename: filenameFromPath(testGenerator.pathname)
        };
      });
    }
  },
  data() {
    return {
      tools: this.value,
      isFeedbackGeneratorsSidebarActive: false,
      isTestGeneratorsSidebarActive: false,

      feedbackGenerator: undefined,
      testGenerator: undefined
    };
  },
  watch: {
    value() {
      this.copyTools(this.value);
    }
  },
  mounted() {
    this.copyTools(this.value);
  },
  methods: {
    copyTools(from) {
      this.tools.feedback_generators = from.feedback_generators;
      this.tools.test_generators = from.test_generators;
    },

    activateFeedbackGeneratorsSidebar(feedbackGenerator) {
      this.feedbackGenerator = feedbackGenerator;
      this.isFeedbackGeneratorsSidebarActive = true;
    },

    saveFeedbackGenerator(feedbackGenerator) {
      if (feedbackGenerator.id) {
        this.updateFile(
          "feedback-generators",
          feedbackGenerator.id,
          feedbackGenerator
        ).then(res => {
          this.isFeedbackGeneratorsSidebarActive = false;
          const index = this.tools.feedback_generators.findIndex(
            item => item.id === res.id
          );
          this.$set(this.tools.feedback_generators, index, res);
        });
      } else {
        this.createFile("feedback-generators", feedbackGenerator).then(res => {
          this.isFeedbackGeneratorsSidebarActive = false;
          this.tools.feedback_generators.push(res);
        });
      }
    },

    activateTestGeneratorsSidebar(testGenerator) {
      this.testGenerator = testGenerator;
      this.isTestGeneratorsSidebarActive = true;
    },

    saveTestGenerator(testGenerator) {
      if (testGenerator.id) {
        this.updateFile(
          "test-generators",
          testGenerator.id,
          testGenerator
        ).then(res => {
          this.isTestGeneratorsSidebarActive = false;
          const index = this.tools.test_generators.findIndex(
            item => item.id === res.id
          );
          this.$set(this.tools.test_generators, index, res);
        });
      } else {
        this.createFile("test-generators", testGenerator).then(res => {
          this.isTestGeneratorsSidebarActive = false;
          this.tools.test_generators.push(res);
        });
      }
    },

    createFile(type, obj) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(`${MODULE_BASE}/${EXERCISE_FILE_CREATE}`, {
            exerciseId: this.exerciseId,
            type,
            obj
          })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: `Failed to create ${type} file`,
              text: err.message,
              iconPack: "mi",
              icon: "error",
              color: "danger"
            });
            reject(err);
          });
      });
    },

    updateFile(type, id, obj) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(`${MODULE_BASE}/${EXERCISE_FILE_UPDATE}`, {
            exerciseId: this.exerciseId,
            type,
            id,
            obj
          })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: `Failed to update ${type} file`,
              text: err.message,
              iconPack: "mi",
              icon: "error",
              color: "danger"
            });
            reject(err);
          });
      });
    },

    removeFeedbackGenerator(item) {
      this.removeFile("feedback-generators", item.id).then(res => {
        const index = this.tools.feedback_generators.findIndex(
          item => item.id === res.id
        );
        this.tools.feedback_generators.splice(index, 1);
      });
    },
    removeTestGenerator(item) {
      this.removeFile("test-generators", item.id).then(res => {
        const index = this.tools.test_generators.findIndex(
          item => item.id === res.id
        );
        this.tools.test_generators.splice(index, 1);
      });
    },
    removeFile(type, id) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(`${MODULE_BASE}/${EXERCISE_FILE_DELETE}`, {
            exerciseId: this.exerciseId,
            type,
            fileId: id
          })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: `Failed to delete ${type} file`,
              text: err.message,
              iconPack: "mi",
              icon: "error",
              color: "danger"
            });
            reject(err);
          });
      });
    },

    updateValue() {
      this.$emit("input", this.tools);
    }
  }
};
</script>
