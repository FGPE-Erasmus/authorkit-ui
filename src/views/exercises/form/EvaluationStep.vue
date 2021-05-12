<template>
  <form>
    <executable-file-sidebar
      type="dynamic-correctors"
      :name="$t('Exercise.DynamicCorrector')"
      :is-sidebar-active="isDynamicCorrectorsSidebarActive"
      :item="dynamic_corrector"
      @submit="saveDynamicCorrector"
      @close-sidebar="isDynamicCorrectorsSidebarActive = false"
    />
    <executable-file-sidebar
      type="static-correctors"
      :name="$t('Exercise.StaticCorrector')"
      :is-sidebar-active="isStaticCorrectorsSidebarActive"
      :item="static_corrector"
      @submit="saveStaticCorrector"
      @close-sidebar="isStaticCorrectorsSidebarActive = false"
    />
    <resource-file-sidebar
      type="libraries"
      :name="$t('Exercise.Library')"
      :is-sidebar-active="isLibrariesSidebarActive"
      :item="library"
      @submit="saveLibrary"
      @close-sidebar="isLibrariesSidebarActive = false"
    />
    <code-file-sidebar
      type="templates"
      :name="$t('Exercise.Template')"
      :is-sidebar-active="isTemplatesSidebarActive"
      :item="template"
      @submit="saveTemplate"
      @close-sidebar="isTemplatesSidebarActive = false"
    />
    <code-file-sidebar
      type="solutions"
      :name="$t('Exercise.Solution')"
      :is-sidebar-active="isSolutionsSidebarActive"
      :item="solution"
      @submit="saveSolution"
      @close-sidebar="isSolutionsSidebarActive = false"
    />
    <test-file-sidebar
      type="tests"
      :name="$t('Exercise._Test')"
      :is-sidebar-active="isTestsSidebarActive"
      :testset-id="testset ? testset.id : undefined"
      :item="test"
      @submit="saveTest"
      @close-sidebar="isTestsSidebarActive = false"
    />
    <testset-sidebar
      :is-sidebar-active="isTestSetsSidebarActive"
      :item="testset"
      @submit="saveTestset"
      @close-sidebar="isTestSetsSidebarActive = false"
    />
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <fgpe-file-list
          :default-category="$t('Exercise.DynamicCorrectors')"
          :default-category-tooltip="$t('Exercise.Hints.DynamicCorrectors')"
          :items="dynamic_correctors"
          item-title-prop="filename"
          item-subtitle-prop="command_line"
          @create="activateDynamicCorrectorsSidebar"
          @edit="activateDynamicCorrectorsSidebar"
          @delete="removeDynamicCorrector"
          :allow-create="permissions[projectId] > 1"
          :allow-update="permissions[projectId] > 1"
          :allow-delete="permissions[projectId] > 1"
        >
        </fgpe-file-list>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <fgpe-file-list
          :default-category="$t('Exercise.StaticCorrectors')"
          :default-category-tooltip="$t('Exercise.Hints.StaticCorrectors')"
          :items="static_correctors"
          item-title-prop="filename"
          item-subtitle-prop="command_line"
          @create="activateStaticCorrectorsSidebar"
          @edit="activateStaticCorrectorsSidebar"
          @delete="removeStaticCorrector"
          :allow-create="permissions[projectId] > 1"
          :allow-update="permissions[projectId] > 1"
          :allow-delete="permissions[projectId] > 1"
        >
        </fgpe-file-list>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <fgpe-file-list
          :default-category="$t('Exercise.Libraries')"
          :default-category-tooltip="$t('Exercise.Hints.Libraries')"
          :items="libraries"
          item-title-prop="filename"
          @create="activateLibrariesSidebar"
          @edit="activateLibrariesSidebar"
          @delete="removeLibrary"
          :allow-create="permissions[projectId] > 1"
          :allow-update="permissions[projectId] > 1"
          :allow-delete="permissions[projectId] > 1"
        >
        </fgpe-file-list>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <fgpe-file-list
          :default-category="$t('Exercise.Templates')"
          :default-category-tooltip="$t('Exercise.Hints.Templates')"
          :items="templates"
          item-title-prop="filename"
          item-subtitle-prop="lang"
          @create="activateTemplatesSidebar"
          @edit="activateTemplatesSidebar"
          @delete="removeTemplate"
          :allow-create="permissions[projectId] > 1"
          :allow-update="permissions[projectId] > 1"
          :allow-delete="permissions[projectId] > 1"
        >
        </fgpe-file-list>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <fgpe-file-list
          :default-category="$t('Exercise.Solutions')"
          :default-category-tooltip="$t('Exercise.Hints.Solutions')"
          :items="solutions"
          item-title-prop="filename"
          item-subtitle-prop="lang"
          @create="activateSolutionsSidebar"
          @edit="activateSolutionsSidebar"
          @delete="removeSolution"
          :allow-create="permissions[projectId] > 1"
          :allow-update="permissions[projectId] > 1"
          :allow-delete="permissions[projectId] > 1"
        >
        </fgpe-file-list>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <fgpe-file-list
          :default-category="$t('Exercise.Tests')"
          :default-category-tooltip="$t('Exercise.Hints.Tests')"
          :categories="evaluation.test_sets"
          :items="tests"
          item-title-prop="title"
          item-subtitle-prop="in_out"
          item-category-prop="testset_id"
          category-id-prop="id"
          category-title-prop="name"
          @edit="activateTestsSidebar(!$event.header, false, $event)"
          @delete="removeTest"
          :allow-create="permissions[projectId] > 1"
          :allow-update="permissions[projectId] > 1"
          :allow-delete="permissions[projectId] > 1"
        >
          <template v-slot:category-actions="{ category, confirm }">
            <div
              v-if="permissions[projectId] > 1"
              class="py-2 px-2 cursor-pointer flex items-center justify-between text-base"
              :class="{
                'text-primary': category.is_default
              }"
              @click="activateTestsSidebar(true, true, category)"
            >
              <vs-tooltip
                :text="$t('Exercise.Test.Create')"
                class="flex items-center"
              >
                <feather-icon icon="FilePlusIcon" svgClasses="h-4 w-4" />
                <span></span>
              </vs-tooltip>
            </div>
            <div
              v-if="permissions[projectId] > 1 && category.is_default"
              class="py-2 px-2 cursor-pointer flex items-center justify-between text-base text-primary"
              @click="activateTestsSidebar(false, true)"
            >
              <vs-tooltip
                :text="$t('Exercise.TestSet.Create')"
                class="flex items-center"
              >
                <feather-icon icon="FolderPlusIcon" svgClasses="h-4 w-4" />
                <span></span>
              </vs-tooltip>
            </div>
            <template v-else-if="permissions[projectId] > 1">
              <div
                class="py-2 px-2 cursor-pointer flex items-center justify-between text-base"
                @click="activateTestsSidebar(false, false, category)"
              >
                <vs-tooltip
                  :text="$t('Exercise.TestSet.Edit')"
                  class="flex items-center"
                >
                  <feather-icon icon="EditIcon" svgClasses="h-4 w-4" />
                  <span></span>
                </vs-tooltip>
              </div>
              <div
                class="py-2 px-2 cursor-pointer flex items-center justify-between text-base"
                @click="confirm(category)"
              >
                <vs-tooltip
                  :text="$t('Exercise.TestSet.Delete')"
                  class="flex items-center"
                >
                  <feather-icon icon="Trash2Icon" svgClasses="h-4 w-4" />
                  <span></span>
                </vs-tooltip>
              </div>
            </template>
          </template>
        </fgpe-file-list>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";
import { filenameFromPath } from "@/assets/utils/file";

import {
  MODULE_BASE,
  EXERCISE_FILE_CREATE,
  EXERCISE_FILE_UPDATE,
  EXERCISE_FILE_DELETE,
  EXERCISE_TESTSET_CREATE,
  EXERCISE_TESTSET_UPDATE,
  EXERCISE_TESTSET_DELETE
} from "@/store/exercises/exercise.constants";

import FgpeFileList from "@/components/FgpeFileList";

import ExecutableFileSidebar from "./ExecutableFileSidebar";
import ResourceFileSidebar from "./ResourceFileSidebar";
import CodeFileSidebar from "./CodeFileSidebar";
import TestFileSidebar from "./TestFileSidebar";
import TestSetSidebar from "./TestSetSidebar";

export default {
  name: "exercise-evaluation-step",
  components: {
    "fgpe-file-list": FgpeFileList,
    "executable-file-sidebar": ExecutableFileSidebar,
    "resource-file-sidebar": ResourceFileSidebar,
    "code-file-sidebar": CodeFileSidebar,
    "test-file-sidebar": TestFileSidebar,
    "testset-sidebar": TestSetSidebar
  },
  props: {
    id: String,
    value: {
      type: Object
    }
  },
  computed: {
    ...mapState({
      permissions: state => state.permission.permissions
    }),
    exerciseId() {
      return this.id || this.$route.params.id;
    },
    projectId() {
      return this.$route.params.project_id;
    },
    dynamic_correctors() {
      return this.evaluation.dynamic_correctors.map(dynamic_corrector => {
        return {
          ...dynamic_corrector,
          filename: filenameFromPath(dynamic_corrector.pathname)
        };
      });
    },
    static_correctors() {
      return this.evaluation.static_correctors.map(static_corrector => {
        return {
          ...static_corrector,
          filename: filenameFromPath(static_corrector.pathname)
        };
      });
    },
    libraries() {
      return this.evaluation.libraries.map(library => {
        return {
          ...library,
          filename: filenameFromPath(library.pathname)
        };
      });
    },
    templates() {
      return this.evaluation.templates.map(template => {
        return {
          ...template,
          filename: filenameFromPath(template.pathname)
        };
      });
    },
    solutions() {
      return this.evaluation.solutions.map(solution => {
        return {
          ...solution,
          filename: filenameFromPath(solution.pathname)
        };
      });
    },
    tests() {
      return this.evaluation.tests.map(test => {
        return {
          ...test,
          input: {
            pathname: test.input.pathname,
            filename: filenameFromPath(test.input.pathname)
          },
          output: {
            pathname: test.output.pathname,
            filename: filenameFromPath(test.output.pathname)
          },
          title: `Test ${test.id}`,
          in_out: `Input: ${filenameFromPath(
            test.input.pathname
          )} | Output: ${filenameFromPath(test.output.pathname)}`
        };
      });
    }
  },
  data() {
    return {
      evaluation: this.value,
      isDynamicCorrectorsSidebarActive: false,
      isStaticCorrectorsSidebarActive: false,
      isLibrariesSidebarActive: false,
      isTemplatesSidebarActive: false,
      isSolutionsSidebarActive: false,
      isTestsSidebarActive: false,
      isTestSetsSidebarActive: false,

      dynamic_corrector: undefined,
      static_corrector: undefined,
      library: undefined,
      template: undefined,
      solution: undefined,
      test: undefined,
      testset: undefined
    };
  },
  watch: {
    value() {
      this.copyEvaluation(this.value);
    }
  },
  mounted() {
    this.copyEvaluation(this.value);
  },
  methods: {
    copyEvaluation(from) {
      this.evaluation.dynamic_correctors = from.dynamic_correctors;
      this.evaluation.static_correctors = from.static_correctors;
      this.evaluation.libraries = from.libraries;
      this.evaluation.templates = from.templates;
      this.evaluation.solutions = from.solutions;
      this.evaluation.tests = from.tests;
      this.evaluation.test_sets = from.test_sets;
    },

    activateDynamicCorrectorsSidebar(dynamic_corrector) {
      this.dynamic_corrector = dynamic_corrector;
      this.isDynamicCorrectorsSidebarActive = true;
    },

    saveDynamicCorrector(dynamic_corrector) {
      if (dynamic_corrector.id) {
        this.updateFile(
          "dynamic-correctors",
          dynamic_corrector.id,
          dynamic_corrector
        ).then(res => {
          this.isDynamicCorrectorsSidebarActive = false;
          const index = this.evaluation.dynamic_correctors.findIndex(
            item => item.id === res.id
          );
          this.$set(this.evaluation.dynamic_correctors, index, res);
        });
      } else {
        this.createFile("dynamic-correctors", dynamic_corrector).then(res => {
          this.isDynamicCorrectorsSidebarActive = false;
          this.evaluation.dynamic_correctors.push(res);
        });
      }
    },

    activateStaticCorrectorsSidebar(static_corrector) {
      this.static_corrector = static_corrector;
      this.isStaticCorrectorsSidebarActive = true;
    },

    saveStaticCorrector(static_corrector) {
      if (static_corrector.id) {
        this.updateFile(
          "static-correctors",
          static_corrector.id,
          static_corrector
        ).then(res => {
          this.isStaticCorrectorsSidebarActive = false;
          const index = this.evaluation.static_correctors.findIndex(
            item => item.id === res.id
          );
          this.$set(this.evaluation.static_correctors, index, res);
        });
      } else {
        this.createFile("static-correctors", static_corrector).then(res => {
          this.isStaticCorrectorsSidebarActive = false;
          this.evaluation.static_correctors.push(res);
        });
      }
    },

    activateSolutionsSidebar(solution) {
      this.solution = solution;
      this.isSolutionsSidebarActive = true;
    },

    saveSolution(solution) {
      if (solution.id) {
        this.updateFile("solutions", solution.id, solution).then(res => {
          this.isSolutionsSidebarActive = false;
          const index = this.evaluation.solutions.findIndex(
            item => item.id === res.id
          );
          this.$set(this.evaluation.solutions, index, res);
        });
      } else {
        this.createFile("solutions", solution).then(res => {
          this.isSolutionsSidebarActive = false;
          this.evaluation.solutions.push(res);
        });
      }
    },

    activateLibrariesSidebar(library) {
      this.library = library;
      this.isLibrariesSidebarActive = true;
    },

    saveLibrary(library) {
      if (library.id) {
        this.updateFile("libraries", library.id, library).then(res => {
          const index = this.evaluation.libraries.findIndex(
            item => item.id === res.id
          );
          this.$set(this.evaluation.libraries, index, res);
          this.isLibrariesSidebarActive = false;
        });
      } else {
        this.createFile("libraries", library).then(res => {
          this.isLibrariesSidebarActive = false;
          this.evaluation.libraries.push(res);
        });
      }
    },

    activateTemplatesSidebar(template) {
      this.template = template;
      this.isTemplatesSidebarActive = true;
    },

    saveTemplate(template) {
      if (template.id) {
        this.updateFile("templates", template.id, template).then(res => {
          this.isTemplatesSidebarActive = false;
          const index = this.evaluation.templates.findIndex(
            item => item.id === res.id
          );
          this.$set(this.evaluation.templates, index, res);
        });
      } else {
        this.createFile("templates", template).then(res => {
          this.isTemplatesSidebarActive = false;
          this.evaluation.templates.push(res);
        });
      }
    },

    activateTestsSidebar(isTest, isNew, item) {
      if (isTest) {
        if (isNew) {
          if (!item.is_default) {
            this.testset = item;
          } else {
            this.testset = undefined;
          }
          this.test = undefined;
          this.isTestsSidebarActive = true;
        } else {
          this.test = Object.assign({}, item);
          this.isTestsSidebarActive = true;
        }
      } else {
        if (isNew) {
          this.testset = undefined;
          this.isTestSetsSidebarActive = true;
        } else {
          this.testset = item;
          this.isTestSetsSidebarActive = true;
        }
      }
    },

    saveTest(test) {
      if (test.id) {
        this.updateFile("tests", test.id, test).then(res => {
          const index = this.evaluation.tests.findIndex(
            item => item.id === res.id
          );
          this.$set(this.evaluation.tests, index, res);
          this.isTestsSidebarActive = false;
          this.test = undefined;
          this.testset = undefined;
        });
      } else {
        this.createFile("tests", test).then(res => {
          this.isTestsSidebarActive = false;
          this.evaluation.tests.push(res);
        });
      }
    },

    saveTestset(testset) {
      if (testset.id) {
        this.$store
          .dispatch(`${MODULE_BASE}/${EXERCISE_TESTSET_UPDATE}`, {
            exerciseId: this.exerciseId,
            id: testset.id,
            testset
          })
          .then(res => {
            const index = this.evaluation.test_sets.findIndex(
              item => item.id === res.id
            );
            this.$set(this.evaluation.test_sets, index, res);
            this.isTestSetsSidebarActive = false;
            this.testset = undefined;
          })
          .catch(err => {
            this.$vs.notify({
              title: `Failed to update test set`,
              text: err.message,
              iconPack: "mi",
              icon: "error",
              color: "danger"
            });
          });
      } else {
        this.$store
          .dispatch(`${MODULE_BASE}/${EXERCISE_TESTSET_CREATE}`, {
            exerciseId: this.exerciseId,
            testset
          })
          .then(res => {
            this.isTestSetsSidebarActive = false;
            this.evaluation.test_sets.push(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: `Failed to create test set`,
              text: err.message,
              iconPack: "mi",
              icon: "error",
              color: "danger"
            });
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

    removeDynamicCorrector(item) {
      this.removeFile("dynamic-correctors", item.id).then(res => {
        const index = this.evaluation.dynamic_correctors.findIndex(
          item => item.id === res.id
        );
        this.evaluation.dynamic_correctors.splice(index, 1);
      });
    },
    removeStaticCorrector(item) {
      this.removeFile("static-correctors", item.id).then(res => {
        const index = this.evaluation.static_correctors.findIndex(
          item => item.id === res.id
        );
        this.evaluation.static_correctors.splice(index, 1);
      });
    },
    removeLibrary(item) {
      this.removeFile("libraries", item.id).then(res => {
        const index = this.evaluation.libraries.findIndex(
          item => item.id === res.id
        );
        this.evaluation.libraries.splice(index, 1);
      });
    },
    removeTemplate(item) {
      this.removeFile("templates", item.id).then(res => {
        const index = this.evaluation.templates.findIndex(
          item => item.id === res.id
        );
        this.evaluation.templates.splice(index, 1);
      });
    },
    removeSolution(item) {
      this.removeFile("solutions", item.id).then(res => {
        const index = this.evaluation.solutions.findIndex(
          item => item.id === res.id
        );
        this.evaluation.solutions.splice(index, 1);
      });
    },
    removeTest(item) {
      if (item.header) {
        return this.removeTestset(item);
      }
      this.removeFile("tests", item.id).then(res => {
        const index = this.evaluation.tests.findIndex(
          item => item.id === res.id
        );
        this.evaluation.tests.splice(index, 1);
      });
    },
    removeTestset(item) {
      this.$store
        .dispatch(`${MODULE_BASE}/${EXERCISE_TESTSET_DELETE}`, {
          exerciseId: this.exerciseId,
          id: item.id
        })
        .then(res => {
          const index = this.evaluation.test_sets.findIndex(
            item => item.id === res.id
          );
          this.evaluation.test_sets.splice(index, 1);
          let i = this.evaluation.tests.length;
          while (i--) {
            if (this.evaluation.tests["testset_id"] === res.id) {
              this.evaluation.tests.splice(i, 1);
            }
          }
        })
        .catch(err => {
          this.$vs.notify({
            title: `Failed to delete test set`,
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },

    removeFile(type, id) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(`${MODULE_BASE}/${EXERCISE_FILE_DELETE}`, {
            type,
            id
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
      this.$emit("input", this.evaluation);
    }
  }
};
</script>
