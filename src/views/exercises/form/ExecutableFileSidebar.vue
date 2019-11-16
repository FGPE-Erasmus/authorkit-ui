<template>
  <add-update-file-sidebar
    :type="type"
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
            <vs-input
              name="command_line"
              v-model="fileItem.command_line"
              :label-placeholder="$t('Exercise.File.CommandLine')"
              class="w-full"
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

import {
  MODULE_BASE,
  EXERCISE_FILE_READ
} from "@/store/exercises/exercise.constants";

import AddUpdateFileSidebar from "./AddUpdateFileSidebar";

export default {
  name: "executable-file-sidebar",
  components: {
    ValidationProvider,
    "add-update-file-sidebar": AddUpdateFileSidebar
  },
  props: {
    exerciseId: String,
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
        pathname: "",
        command_line: ""
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
