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
            name="prog_lang"
            rules="required"
            v-slot="{ errors }"
            persist
          >
            <vs-tooltip
              :title="$t('CodeFile.ProgLang')"
              :text="$t('CodeFile.Hints.ProgLang')"
              color="primary"
              position="left"
            >
              <fgpe-select
                name="prog_lang"
                v-model="fileItem.lang"
                class="mt-5 w-full select-large"
                :options="languages"
                :clearable="false"
                :searchable="true"
                :reduce="o => o.id"
                :label-placeholder="$t('CodeFile.ProgLang')"
              >
              </fgpe-select>
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
              accepted-file-types="text/*, application/*"
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
        :programming-language="fileItem.lang"
        @change-programming-language="onChangeProgrammingLanguage"
        :code="code"
        @change-code="onChangeCode"
      />
    </template>
  </add-update-file-sidebar>
</template>

<script>
import { mapState } from "vuex";
import { ValidationProvider } from "vee-validate";

import { base64toBlob } from "@/assets/utils/file.js";
import languages from "@/assets/data/programming-languages.json";

import {
  MODULE_BASE,
  EXERCISE_FILE_READ
} from "@/store/exercises/exercise.constants";

import FgpeSelect from "@/components/FgpeSelect";
import FgpeCodeEditorPopup from "@/components/FgpeCodeEditorPopup";
import AddUpdateFileSidebar from "@/components/sidebar-form/AddUpdateFileSidebar";

export default {
  name: "code-file-sidebar",
  components: {
    ValidationProvider,
    "fgpe-select": FgpeSelect,
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
              // this.code = atob(res);
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
      fileItem: undefined,
      canEditCode: true,
      editorOpen: false,
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
    ...mapState({
      last_used: "last_used_values"
    }),
    empty() {
      return {
        pathname: "",
        lang: this.last_used.lang
      };
    },
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
    },
    languages() {
      return languages.map(l => ({ id: l, label: l }));
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

    onChangeProgrammingLanguage(lang) {
      this.fileItem.lang = lang;
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
