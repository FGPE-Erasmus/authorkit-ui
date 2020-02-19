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
            <fgpe-select
              name="prog_lang"
              v-model="fileItem.lang"
              class="mt-5 w-full select-large"
              :options="languages"
              :clearable="false"
              :searchable="true"
              :reduce="o => o.id"
              :label-placeholder="$t('Exercise.File.ProgLang')"
            >
            </fgpe-select>
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
              @updatefiles="updateFiles($event) || validate($event)"
            />
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

import { base64toBlob } from "@/assets/utils/file.js";
import languages from "@/assets/data/programming-languages.json";

import {
  MODULE_BASE,
  EXERCISE_FILE_READ
} from "@/store/exercises/exercise.constants";

import FgpeSelect from "@/components/FgpeSelect";
import AddUpdateFileSidebar from "@/components/sidebar-form/AddUpdateFileSidebar";

export default {
  name: "code-file-sidebar",
  components: {
    ValidationProvider,
    "fgpe-select": FgpeSelect,
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
        lang: ""
      },
      fileItem: undefined
    };
  },
  watch: {
    item(val) {
      if (!val) {
        this.fileItem = Object.assign({}, this.empty);
        this.fileItem.file = undefined;
      } else {
        this.fileItem = Object.assign({}, val);
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
    },
    languages() {
      return languages.map(l => ({ id: l, label: l }));
    }
  },
  methods: {
    updateFiles(files) {
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
      } else {
        this.fileItem.file = undefined;
      }
    }
  }
};
</script>
