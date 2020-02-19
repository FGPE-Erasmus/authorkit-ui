<template>
  <form>
    <formatted-text-file-sidebar
      type="instructions"
      :name="$t('Exercise.Instruction')"
      :is-sidebar-active="isInstructionsSidebarActive"
      :item="instruction"
      @submit="saveInstruction"
      @close-sidebar="isInstructionsSidebarActive = false"
    />
    <formatted-text-file-sidebar
      type="statements"
      :name="$t('Exercise.Statement')"
      :is-sidebar-active="isStatementsSidebarActive"
      :item="statement"
      @submit="saveStatement"
      @close-sidebar="isStatementsSidebarActive = false"
    />
    <resource-file-sidebar
      type="embeddables"
      :name="$t('Exercise.Embeddable')"
      :is-sidebar-active="isEmbeddablesSidebarActive"
      :item="embeddable"
      @submit="saveEmbeddable"
      @close-sidebar="isEmbeddablesSidebarActive = false"
    />
    <code-file-sidebar
      type="skeletons"
      :name="$t('Exercise.Skeleton')"
      :is-sidebar-active="isSkeletonsSidebarActive"
      :item="skeleton"
      @submit="saveSkeleton"
      @close-sidebar="isSkeletonsSidebarActive = false"
    />
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <fgpe-file-list
          :default-category="$t('Exercise.Instructions')"
          :items="instructions"
          item-title-prop="filename"
          item-subtitle-prop="language"
          @create="activateInstructionsSidebar"
          @edit="activateInstructionsSidebar"
          @delete="removeInstruction"
        >
        </fgpe-file-list>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <fgpe-file-list
          :default-category="$t('Exercise.Statements')"
          :items="statements"
          item-title-prop="filename"
          item-subtitle-prop="language"
          @create="activateStatementsSidebar"
          @edit="activateStatementsSidebar"
          @delete="removeStatement"
        >
        </fgpe-file-list>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <fgpe-file-list
          :default-category="$t('Exercise.Embeddables')"
          :items="embeddables"
          item-title-prop="filename"
          @create="activateEmbeddablesSidebar"
          @edit="activateEmbeddablesSidebar"
          @delete="removeEmbeddable"
        >
        </fgpe-file-list>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <fgpe-file-list
          :default-category="$t('Exercise.Skeletons')"
          :items="skeletons"
          item-title-prop="filename"
          item-subtitle-prop="lang"
          @create="activateSkeletonsSidebar"
          @edit="activateSkeletonsSidebar"
          @delete="removeSkeleton"
        >
        </fgpe-file-list>
      </div>
    </div>
  </form>
</template>

<script>
import languages from "@/assets/data/languages.json";
import { filenameFromPath } from "@/assets/utils/file";

import {
  MODULE_BASE,
  EXERCISE_FILE_CREATE,
  EXERCISE_FILE_UPDATE,
  EXERCISE_FILE_DELETE
} from "@/store/exercises/exercise.constants";

import FgpeFileList from "@/components/FgpeFileList";

import FormattedTextFileSidebar from "./FormattedTextFileSidebar";
import ResourceFileSidebar from "./ResourceFileSidebar";
import CodeFileSidebar from "./CodeFileSidebar";

export default {
  name: "exercise-presentation-step",
  components: {
    "fgpe-file-list": FgpeFileList,
    "formatted-text-file-sidebar": FormattedTextFileSidebar,
    "resource-file-sidebar": ResourceFileSidebar,
    "code-file-sidebar": CodeFileSidebar
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
    instructions() {
      return this.presentation.instructions.map(instruction => {
        return {
          ...instruction,
          filename: filenameFromPath(instruction.pathname),
          language: instruction.nat_lang ? languages[instruction.nat_lang] : ""
        };
      });
    },
    statements() {
      return this.presentation.statements.map(statement => {
        return {
          ...statement,
          filename: filenameFromPath(statement.pathname),
          language: statement.nat_lang ? languages[statement.nat_lang] : ""
        };
      });
    },
    embeddables() {
      return this.presentation.embeddables.map(embeddable => {
        return {
          ...embeddable,
          filename: filenameFromPath(embeddable.pathname)
        };
      });
    },
    skeletons() {
      return this.presentation.skeletons.map(skeleton => {
        return {
          ...skeleton,
          filename: filenameFromPath(skeleton.pathname),
          language: skeleton.lang
        };
      });
    }
  },
  data() {
    return {
      presentation: this.value,
      isInstructionsSidebarActive: false,
      isStatementsSidebarActive: false,
      isEmbeddablesSidebarActive: false,
      isSkeletonsSidebarActive: false,

      instruction: undefined,
      statement: undefined,
      embeddable: undefined,
      skeleton: undefined
    };
  },
  watch: {
    value() {
      this.copyPresentation(this.value);
    }
  },
  mounted() {
    this.copyPresentation(this.value);
  },
  methods: {
    copyPresentation(from) {
      this.presentation.instructions = from.instructions;
      this.presentation.statements = from.statements;
      this.presentation.embeddables = from.embeddables;
      this.presentation.skeletons = from.skeletons;
    },

    activateInstructionsSidebar(instruction) {
      this.instruction = instruction;
      this.isInstructionsSidebarActive = true;
    },

    saveInstruction(instruction) {
      if (instruction.id) {
        this.updateFile("instructions", instruction.id, instruction).then(
          res => {
            this.isInstructionsSidebarActive = false;
            const index = this.presentation.instructions.findIndex(
              item => item.id === res.id
            );
            this.$set(this.presentation.instructions, index, res);
          }
        );
      } else {
        this.createFile("instructions", instruction).then(res => {
          this.isInstructionsSidebarActive = false;
          this.presentation.instructions.push(res);
        });
      }
    },

    activateStatementsSidebar(statement) {
      this.statement = statement;
      this.isStatementsSidebarActive = true;
    },

    saveStatement(statement) {
      if (statement.id) {
        this.updateFile("statements", statement.id, statement).then(res => {
          this.isStatementsSidebarActive = false;
          const index = this.presentation.statements.findIndex(
            item => item.id === res.id
          );
          this.$set(this.presentation.statements, index, res);
        });
      } else {
        this.createFile("statements", statement).then(res => {
          this.isStatementsSidebarActive = false;
          this.presentation.statements.push(res);
        });
      }
    },

    activateEmbeddablesSidebar(embeddable) {
      this.embeddable = embeddable;
      this.isEmbeddablesSidebarActive = true;
    },

    saveEmbeddable(embeddable) {
      if (embeddable.id) {
        this.updateFile("embeddables", embeddable.id, embeddable).then(res => {
          this.isEmbeddablesSidebarActive = false;
          const index = this.presentation.embeddables.findIndex(
            item => item.id === res.id
          );
          this.$set(this.presentation.embeddables, index, res);
        });
      } else {
        this.createFile("embeddables", embeddable).then(res => {
          this.isEmbeddablesSidebarActive = false;
          this.presentation.embeddables.push(res);
        });
      }
    },

    activateSkeletonsSidebar(skeleton) {
      this.skeleton = skeleton;
      this.isSkeletonsSidebarActive = true;
    },

    saveSkeleton(skeleton) {
      if (skeleton.id) {
        this.updateFile("skeletons", skeleton.id, skeleton).then(res => {
          this.isSkeletonsSidebarActive = false;
          const index = this.presentation.skeletons.findIndex(
            item => item.id === res.id
          );
          this.$set(this.presentation.skeletons, index, res);
        });
      } else {
        this.createFile("skeletons", skeleton).then(res => {
          this.isSkeletonsSidebarActive = false;
          this.presentation.skeletons.push(res);
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

    removeInstruction(item) {
      this.removeFile("instructions", item.id).then(res => {
        const index = this.presentation.instructions.findIndex(
          item => item.id === res.id
        );
        this.presentation.instructions.splice(index, 1);
      });
    },
    removeStatement(item) {
      this.removeFile("statements", item.id).then(res => {
        const index = this.presentation.statements.findIndex(
          item => item.id === res.id
        );
        this.presentation.statements.splice(index, 1);
      });
    },
    removeEmbeddable(item) {
      this.removeFile("embeddables", item.id).then(res => {
        const index = this.presentation.embeddables.findIndex(
          item => item.id === res.id
        );
        this.presentation.embeddables.splice(index, 1);
      });
    },
    removeSkeleton(item) {
      this.removeFile("skeletons", item.id).then(res => {
        const index = this.presentation.skeletons.findIndex(
          item => item.id === res.id
        );
        this.presentation.skeletons.splice(index, 1);
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
      this.$emit("input", this.presentation);
    }
  }
};
</script>
