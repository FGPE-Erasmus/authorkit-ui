<template>
  <add-update-file-sidebar
    :type="$t('Exercise._Test')"
    :existing="!!test.id"
    :is-sidebar-active="isSidebarActive"
    @submit="$emit('submit', fullTest)"
    @close-sidebar="$emit('close-sidebar')"
  >
    <template v-slot:form>
      <div class="vx-row">
        <div class="vx-col w-full mb-2 mt-5">
          <ValidationProvider
            ref="inputFileProvider"
            name="inputFile"
            rules="required"
            v-slot="{ validate, errors }"
            persist
          >
            <file-pond
              name="inputFile"
              ref="inputFileUpload"
              class-name="fgpe-pond"
              :server="server"
              :label-idle="$t('Exercise.Test.File.UploadInputFile')"
              allow-multiple="false"
              max-files="1"
              accepted-file-types="text/*"
              maxFileSize="1MB"
              :labelMaxFileSizeExceeded="
                $t('validation.maxFileSize', { filesize: '1MB' })
              "
              :labelMaxFileSize="
                $t('Form.File.MaxFileSizeLabel', { filesize: '1MB' })
              "
              :files="inputFiles"
              @updatefiles="updateInputFiles($event) || validate($event)"
            />
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mb-2 mt-5">
          <ValidationProvider
            ref="outputFileProvider"
            name="outputFile"
            rules="required"
            v-slot="{ validate, errors }"
            persist
          >
            <file-pond
              name="outputFile"
              ref="outputFileUpload"
              class-name="fgpe-pond"
              :server="server"
              :label-idle="$t('Exercise.Test.File.UploadOutputFile')"
              allow-multiple="false"
              max-files="1"
              accepted-file-types="text/*"
              maxFileSize="1MB"
              :labelMaxFileSizeExceeded="
                $t('validation.maxFileSize', { filesize: '1MB' })
              "
              :labelMaxFileSize="
                $t('Form.File.MaxFileSizeLabel', { filesize: '1MB' })
              "
              :files="outputFiles"
              @updatefiles="updateOutputFiles($event) || validate($event)"
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
            name="arguments"
            rules="eachMax:50"
            v-slot="{ errors }"
            persist
          >
            <fgpe-chips
              name="arguments"
              v-model="test.arguments"
              :label-placeholder="$t('Exercise.Test.Arguments')"
              :unique="false"
              icon-pack="mi md-16"
              remove-icon="delete_forever"
            >
              <vs-chip
                v-for="(arg, i) in test.arguments"
                :key="i"
                @click="removeArg(arg)"
                closable
                icon-pack="mi"
                close-icon="close"
              >
                {{ arg }}
              </vs-chip>
            </fgpe-chips>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="weight"
            rules="required|max:100|min:0"
            v-slot="{ errors }"
            persist
          >
            <label class="fgpe-label">
              {{ $t("Exercise.Test.Weight") }}
            </label>
            <vs-input-number
              name="weight"
              v-model.number="test.weight"
              :step="1"
              min="0"
              max="100"
              size="medium"
              icon-pack="mi"
            />
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <vs-checkbox
            name="visible"
            v-model="test.visible"
            class="mt-5 w-full"
            icon-pack="mi md-16"
          >
            {{ $t("Exercise.Test.Visible") }}
          </vs-checkbox>
        </div>
      </div>
    </template>
  </add-update-file-sidebar>
</template>

<script>
import { ValidationProvider } from "vee-validate";

import { base64toBlob } from "@/assets/utils/file.js";

import {
  MODULE_BASE,
  EXERCISE_FILE_READ
} from "@/store/exercises/exercise.constants";

import FgpeChips from "@/components/FgpeChips";
import AddUpdateFileSidebar from "@/components/sidebar-form/AddUpdateFileSidebar";

export default {
  name: "test-file-sidebar",
  components: {
    ValidationProvider,
    "fgpe-chips": FgpeChips,
    "add-update-file-sidebar": AddUpdateFileSidebar
  },
  props: {
    exerciseId: String,
    testsetId: String,
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    item: Object
  },
  created() {
    this.test = Object.assign({}, this.empty);
  },
  data() {
    return {
      server: {
        process: null,
        load: (source, load, error, progress, abort) => {
          this.$store
            .dispatch(`${MODULE_BASE}/${EXERCISE_FILE_READ}`, {
              exerciseId: this.exerciseId || this.$route.params.id,
              path: source
            })
            .then(res => {
              load(base64toBlob(res));
            })
            .catch(err => {
              error(err.message);
            });

          // Should expose an abort method so the request can be cancelled
          return {
            abort: () => {
              // User tapped cancel, abort our ongoing actions here
              abort();
            }
          };
        }
      },
      empty: {
        input: {
          pathname: ""
        },
        output: {
          pathname: ""
        },
        arguments: [],
        weight: 0,
        visible: false
      },
      test: undefined,
      inputFile: undefined,
      outputFile: undefined
    };
  },
  watch: {
    item(val) {
      if (!val) {
        this.test = JSON.parse(JSON.stringify(this.empty));
        this.inputFile = undefined;
        this.outputFile = undefined;
      } else {
        this.test = Object.assign({}, val);
      }
    }
  },
  computed: {
    inputFiles() {
      if (this.test && this.test.input && this.test.input.pathname) {
        return [
          {
            source: this.test.input.pathname,
            options: {
              type: "local"
            }
          }
        ];
      } else {
        return [];
      }
    },
    outputFiles() {
      if (this.test && this.test.output && this.test.output.pathname) {
        return [
          {
            source: this.test.output.pathname,
            options: {
              type: "local"
            }
          }
        ];
      } else {
        return [];
      }
    },
    fullTest() {
      const test = {
        arguments: this.test.arguments,
        weight: this.test.weight,
        visible: this.test.visible,
        input: this.inputFile,
        output: this.outputFile
      };
      if (this.test.id) {
        test.id = this.test.id;
      }
      if (this.testsetId) {
        test.testset_id = this.testsetId;
      }
      return test;
    }
  },
  methods: {
    updateInputFiles(files) {
      if (files.length) {
        if (!(files[0].file instanceof File)) {
          this.inputFile = new File([files[0].file], this.test.input.filename, {
            lastModified: this.test.updated_at
          });
        } else {
          this.inputFile = files[0].file;
        }
      } else {
        this.inputFile = undefined;
      }
    },
    updateOutputFiles(files) {
      if (files.length) {
        if (!(files[0].file instanceof File)) {
          this.outputFile = new File(
            [files[0].file],
            this.test.output.filename,
            { lastModified: this.test.updated_at }
          );
        } else {
          this.outputFile = files[0].file;
        }
      } else {
        this.outputFile = undefined;
      }
    },
    removeArg(arg) {
      this.test.arguments.splice(this.test.arguments.indexOf(arg), 1);
      return false;
    }
  }
};
</script>
