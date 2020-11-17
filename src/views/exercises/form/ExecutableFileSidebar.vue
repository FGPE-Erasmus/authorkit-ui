<template>
  <add-update-file-sidebar
    :name="name"
    :existing="!!fileItem.id"
    :is-sidebar-active="isSidebarActive"
    @submit="$emit('submit', fileItem)"
    @close-sidebar="$emit('close-sidebar')"
  >
    <template v-slot:form>
      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="command_line"
            rules="max:255"
            v-slot="{ errors }"
            persist
          >
            <vs-tooltip
              :title="$t('ExecutableFile.CommandLine')"
              :text="$t('ExecutableFile.Hints.CommandLine')"
              color="primary"
              position="left"
            >
              <vs-input
                name="command_line"
                v-model="fileItem.command_line"
                :label-placeholder="$t('ExecutableFile.CommandLine')"
                class="w-full"
              />
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
            ref="fileProvider"
            name="file"
            rules="required"
            v-slot="{ validate, errors }"
            persist
          >
            <file-pond
              name="file"
              ref="fileUpload"
              class-name="fgpe-pond"
              :server="server"
              :label-idle="$t('Exercise.File.UploadFile')"
              allow-multiple="false"
              max-files="1"
              maxFileSize="1MB"
              :labelMaxFileSizeExceeded="
                $t('validation.maxFileSize', { filesize: '1MB' })
              "
              :labelMaxFileSize="
                $t('Form.File.MaxFileSizeLabel', { filesize: '1MB' })
              "
              :files="files"
              @updatefiles="validate($event) && updateFiles()"
            />
            <div v-if="canEditCode" class="flex flex-wrap">
              <span
                class="text-primary cursor-pointer ml-auto"
                @click="openEditor"
              >
                {{ $t("Form.File.OpenEditor") }}
              </span>
            </div>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>
      <fgpe-code-editor-popup
        :active="editorOpen"
        @close-popup="closeEditor"
        :filename="filename"
        @change-filename="onChangeFilename"
        :allowChangeProgrammingLanguage="true"
        :programming-language="language"
        @change-programming-language="language = $event"
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

import FgpeCodeEditorPopup from "@/components/FgpeCodeEditorPopup";
import AddUpdateFileSidebar from "@/components/sidebar-form/AddUpdateFileSidebar";

export default {
  name: "executable-file-sidebar",
  components: {
    ValidationProvider,
    "fgpe-code-editor-popup": FgpeCodeEditorPopup,
    "add-update-file-sidebar": AddUpdateFileSidebar
  },
  props: {
    name: String,
    type: String,
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    item: Object
  },
  created() {
    this.fileItem = Object.assign({}, this.empty);
  },
  data() {
    return {
      server: {
        process: null,
        load: (source, load, error, progress, abort) => {
          this.$store
            .dispatch(`${MODULE_BASE}/${EXERCISE_FILE_READ}`, {
              id: this.item.id,
              type: this.type
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
        pathname: "",
        command_line: ""
      },
      fileItem: undefined,
      canEditCode: true,
      editorOpen: false,
      language: "shell",
      filename: "",
      code: ""
    };
  },
  watch: {
    isSidebarActive(val) {
      if (val && this.item) {
        this.fileItem = Object.assign({}, this.item);
        this.filename = this.fileItem.pathname;
      } else {
        this.fileItem = Object.assign({}, this.empty);
        this.fileItem.file = undefined;
      }
    }
  },
  computed: {
    files() {
      if (this.fileItem && this.fileItem.pathname) {
        return [
          {
            source: this.fileItem.pathname,
            options: {
              type: "local"
            }
          }
        ];
      } else {
        return [];
      }
    }
  },
  methods: {
    openEditor() {
      this.editorOpen = true;
    },
    closeEditor() {
      this.editorOpen = false;
    },

    onChangeFilename(filename) {
      if (!this.editorOpen) {
        return;
      }
      this.$refs.fileUpload.removeFile();
      const file = new File([new Blob([this.code])], filename || "file", {
        type: "text/plain"
      });
      this.$refs.fileUpload.addFile(file);
      this.fileItem.file = file;
      this.filename = filename;
    },

    onChangeCode(code) {
      if (!this.editorOpen) {
        return;
      }
      this.$refs.fileUpload.removeFile();
      const file = new File([new Blob([code])], this.filename, {
        type: "text/plain"
      });
      this.$refs.fileUpload.addFile(file);
      this.fileItem.file = file;
      this.code = code;
    },

    updateFiles() {
      if (this.editorOpen) {
        return;
      }
      const files = this.$refs.fileUpload.getFiles();
      if (files.length) {
        if (!(files[0].file instanceof File)) {
          this.fileItem.file = new File(
            [files[0].file],
            this.fileItem.filename,
            { lastModified: this.fileItem.updated_at }
          );
        } else {
          this.fileItem.file = files[0].file;
        }
        if (files[0].status !== 8) {
          this.readFile(this.fileItem.file);
        }
      } else {
        this.fileItem.file = undefined;
        this.filename = "";
        this.code = "";
      }
    },

    readFile(file) {
      this.canEditCode = false;
      const reader = new FileReader();
      reader.onload = () => {
        this.filename = file.name;
        this.code = reader.result;
        this.canEditCode = true;
      };
      reader.readAsText(file, "UTF-8");
    }
  }
};
</script>
