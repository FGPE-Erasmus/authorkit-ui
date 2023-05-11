<template>
  <add-update-file-sidebar
    :name="name"
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
            <vs-tooltip
              :title="$t('TestFile.Input')"
              :text="$t('TestFile.Hints.Input')"
              color="primary"
              position="left"
            >
              <file-pond
                name="inputFile"
                ref="inputFileUpload"
                class-name="fgpe-pond"
                :server="inputServer"
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
              <div v-if="canEditInput" class="flex flex-wrap">
                <span
                  class="text-primary cursor-pointer ml-auto"
                  @click="openEditor('input')"
                >
                  {{ $t("Form.File.OpenEditor") }}
                </span>
              </div>
            </vs-tooltip>
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
            <vs-tooltip
              :title="$t('TestFile.Output')"
              :text="$t('TestFile.Hints.Output')"
              color="primary"
              position="left"
            >
              <file-pond
                name="outputFile"
                ref="outputFileUpload"
                class-name="fgpe-pond"
                :server="outputServer"
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
              <div v-if="canEditOutput" class="flex flex-wrap">
                <span
                  class="text-primary cursor-pointer ml-auto"
                  @click="openEditor('output')"
                >
                  {{ $t("Form.File.OpenEditor") }}
                </span>
              </div>
            </vs-tooltip>
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
            <vs-tooltip
              :title="$t('TestFile.Arguments')"
              :text="$t('TestFile.Hints.Arguments')"
              color="primary"
              position="left"
            >
              <fgpe-chips
                name="arguments"
                v-model="test.arguments"
                :label-placeholder="$t('TestFile.Arguments')"
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
            </vs-tooltip>
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
            <vs-tooltip
              :title="$t('TestFile.Weight')"
              :text="$t('TestFile.Hints.Weight')"
              color="primary"
              position="left"
            >
              <label class="fgpe-label">
                {{ $t("TestFile.Weight") }}
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
            </vs-tooltip>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <vs-tooltip
            :title="$t('TestFile.Visible')"
            :text="$t('TestFile.Hints.Visible')"
            color="primary"
            position="left"
          >
            <vs-checkbox
              name="visible"
              v-model="test.visible"
              class="mt-5 w-full"
              icon-pack="mi md-16"
            >
              {{ $t("TestFile.Visible") }}
            </vs-checkbox>
          </vs-tooltip>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="timeout"
            rules="required|min:0"
            v-slot="{ errors }"
            persist
          >
            <vs-tooltip
              :title="$t('TestFile.Timeout')"
              :text="$t('TestFile.Hints.Timeout')"
              color="primary"
              position="left"
            >
              <label class="fgpe-label">
                {{ $t("TestFile.Timeout") }}
              </label>
              <vs-input-number
                name="timeout"
                v-model.number="test.timeout"
                :step="1"
                min="0"
                size="medium"
                icon-pack="mi"
              />
            </vs-tooltip>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="feedback"
            rules=""
            v-slot="{ errors }"
            persist
          >
            <vs-tooltip
              :title="$t('TestFile.Feedback')"
              :text="$t('TestFile.Hints.Feedback')"
              color="primary"
              position="left"
            >
              <multi-row-input
                :label="$t('TestFile.Feedback')"
                name="feedback"
                v-model="feedback"
                :empty-line="{ message: '', weight: 0 }"
                :empty-check="l => !l.message && !l.weight"
                v-slot:default="{ line }"
              >
                <div class="flex">
                  <div class="w-2/3 flex justify-center items-center pb-1">
                    <vs-input
                      name="message"
                      v-model="line.message"
                      :placeholder="$t('TestFile.FeedbackMessage')"
                      class="w-full"
                    />
                  </div>
                  <div class="w-1/3 flex justify-center items-center">
                    <vs-input-number
                      name="weight"
                      v-model.number="line.weight"
                      :step="1"
                      min="0"
                      size="small"
                      icon-pack="mi"
                    />
                  </div>
                </div>
              </multi-row-input>
            </vs-tooltip>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <fgpe-code-editor-popup
        :active="editorOpen"
        @close-popup="closeEditor"
        :programming-language="'text'"
        :filename="filename"
        @change-filename="onChangeFilename"
        :code="code"
        @change-code="onChangeCode"
      />
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
import FgpeCodeEditorPopup from "@/components/FgpeCodeEditorPopup";
import AddUpdateFileSidebar from "@/components/sidebar-form/AddUpdateFileSidebar";
import MultiRowInput from "@/components/MultiRowInput";

export default {
  name: "test-file-sidebar",
  components: {
    ValidationProvider,
    "fgpe-chips": FgpeChips,
    "fgpe-code-editor-popup": FgpeCodeEditorPopup,
    "add-update-file-sidebar": AddUpdateFileSidebar,
    "multi-row-input": MultiRowInput
  },
  props: {
    name: String,
    type: String,
    testsetId: String,
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    item: Object
  },
  created() {
    this.test = Object.assign({}, this.empty);
    this.feedback = [];
  },
  data() {
    return {
      inputServer: {
        process: null,
        load: (source, load, error, progress, abort) => {
          this.$store
            .dispatch(`${MODULE_BASE}/${EXERCISE_FILE_READ}`, {
              id: this.item.id + "/input",
              type: this.type
            })
            .then(res => {
              // this.inputCode = atob(res);
              load(base64toBlob(res));
            })
            .catch(err => {
              error(err.message);
            });

          return {
            abort: () => {
              abort();
            }
          };
        }
      },
      outputServer: {
        process: null,
        load: (source, load, error, progress, abort) => {
          this.$store
            .dispatch(`${MODULE_BASE}/${EXERCISE_FILE_READ}`, {
              id: this.item.id + "/output",
              type: this.type
            })
            .then(res => {
              // this.outputCode = atob(res);
              load(base64toBlob(res));
            })
            .catch(err => {
              error(err.message);
            });

          return {
            abort: () => {
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
        visible: false,
        timeout: 0,
        feedback: []
      },
      test: undefined,
      inputFile: undefined,
      outputFile: undefined,

      canEditInput: true,
      canEditOutput: true,
      editorOpen: false,
      editorType: null,

      inputFilename: "",
      inputCode: "",

      outputFilename: "",
      outputCode: "",

      filename: "",
      code: "",

      feedback: []
    };
  },
  watch: {
    isSidebarActive(val) {
      if (!val || !this.item) {
        this.test = JSON.parse(JSON.stringify(this.empty));
        this.inputFile = undefined;
        this.outputFile = undefined;
        this.feedback.splice(0, this.feedback.length);
      } else {
        this.test = Object.assign({}, this.item);
        this.inputFilename = this.test.input.pathname;
        this.outputFilename = this.test.output.pathname;
        if (!Array.isArray(this.test.feedback)) this.test.feedback = [];
        this.test.feedback.forEach(item => this.feedback.push(item));
      }
    },
    feedback: {
      handler(val) {
        this.test.feedback.splice(0, this.test.feedback.length);
        val.forEach(item => this.test.feedback.push(item));
      },
      deep: true
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
        timeout: this.test.timeout,
        feedback: this.test.feedback || [],
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
    openEditor(type) {
      this.editorOpen = true;
      this.editorType = type;
      if (type === "input") {
        this.filename = this.inputFilename;
        this.code = this.inputCode;
      } else {
        this.filename = this.outputFilename;
        this.code = this.outputCode;
      }
    },
    closeEditor() {
      this.editorOpen = false;
      if (this.editorType === "input") {
        this.inputFilename = this.filename;
        this.inputCode = this.code;
      } else {
        this.outputFilename = this.filename;
        this.outputCode = this.code;
      }
      this.editorType = null;
    },

    onChangeFilename(filename) {
      if (!this.editorOpen) {
        return;
      }
      const file = new File([new Blob([this.code])], filename || "file", {
        type: "text/plain"
      });
      if (this.editorType === "input") {
        this.$refs.inputFileUpload.removeFile();
        this.$refs.inputFileUpload.addFile(file);
        this.inputFile = file;
      } else {
        this.$refs.outputFileUpload.removeFile();
        this.$refs.outputFileUpload.addFile(file);
        this.outputFile = file;
      }
      this.filename = filename;
    },

    onChangeCode(code) {
      if (!this.editorOpen) {
        return;
      }
      const file = new File([new Blob([code])], this.filename, {
        type: "text/plain"
      });
      if (this.editorType === "input") {
        this.$refs.inputFileUpload.removeFile();
        this.$refs.inputFileUpload.addFile(file);
        this.inputFile = file;
      } else {
        this.$refs.outputFileUpload.removeFile();
        this.$refs.outputFileUpload.addFile(file);
        this.outputFile = file;
      }
      this.code = code;
    },

    updateInputFiles(files) {
      if (this.editorOpen) {
        return;
      }
      if (files.length) {
        if (!(files[0].file instanceof File)) {
          this.inputFile = new File([files[0].file], this.test.input.filename, {
            lastModified: this.test.updated_at
          });
        } else {
          this.inputFile = files[0].file;
        }
        if (files[0].status !== 8) {
          this.readFile(this.inputFile, "input");
        }
      } else {
        this.inputFile = undefined;
        this.inputFilename = "";
        this.inputCode = "";
      }
    },
    updateOutputFiles(files) {
      if (this.editorOpen) {
        return;
      }
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
        if (files[0].status !== 8) {
          this.readFile(this.outputFile, "output");
        }
      } else {
        this.outputFile = undefined;
        this.outputFilename = "";
        this.outputCode = "";
      }
    },
    removeArg(arg) {
      this.test.arguments.splice(this.test.arguments.indexOf(arg), 1);
      return false;
    },

    readFile(file, type) {
      if (type === "input") {
        this.canEditInput = false;
      } else {
        this.canEditOutput = false;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (type === "input") {
          this.inputFilename = file.name;
          this.inputCode = reader.result;
          this.canEditInput = true;
        } else {
          this.outputFilename = file.name;
          this.outputCode = reader.result;
          this.canEditOutput = true;
        }
      };
      reader.readAsText(file, "UTF-8");
    }
  }
};
</script>
