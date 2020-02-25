<template>
  <vs-popup
    class="fgpe-code-editor-popup"
    fullscreen
    :title="title || $t('CodeEditor.Title')"
    :active.sync="activeLocal"
    icon-pack="mi"
  >
    <div class="flex flex-col h-full">
      <div class="flex flex-row mb-4">
        <div class="flex flex-grow mr-4 items-start">
          <ValidationProvider
            name="name"
            rules="max:100"
            v-slot="{ errors }"
            persist
            class="w-full"
          >
            <vs-input
              name="name"
              v-model="filenameLocal"
              :label-placeholder="$t('CodeEditor.Name')"
              class="w-full"
            />
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
        <div
          v-if="allowChangeProgrammingLanguage"
          class="flex flex-grow items-start"
        >
          <ValidationProvider
            name="prog_lang"
            rules="required"
            v-slot="{ errors }"
            persist
            class="w-full"
          >
            <fgpe-select
              name="prog_lang"
              v-model="programmingLanguageLocal"
              class="mt-5 w-full select-large"
              :options="languages"
              :clearable="false"
              :searchable="true"
              :reduce="o => o.id"
              :label-placeholder="$t('CodeEditor.ProgLang')"
            >
            </fgpe-select>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>
      <MonacoEditor
        class="flex-grow editor"
        v-model="codeLocal"
        :language="programmingLanguageLocal"
        :options="editorOptions"
      />
    </div>
  </vs-popup>
</template>

<script>
import MonacoEditor from "vue-monaco";
import { ValidationProvider } from "vee-validate";

import languages from "@/assets/data/programming-languages.json";

import FgpeSelect from "@/components/FgpeSelect";

export default {
  name: "fgpe-code-editor-popup",
  components: {
    ValidationProvider,
    "fgpe-select": FgpeSelect,
    MonacoEditor
  },
  props: {
    title: String,
    active: {
      type: Boolean,
      default: false
    },
    allowChangeProgrammingLanguage: {
      type: Boolean,
      default: false
    },
    filename: {
      type: String,
      default: ""
    },
    programmingLanguage: {
      type: String,
      default: ""
    },
    code: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      editorOptions: {
        automaticLayout: true
      }
    };
  },
  computed: {
    languages() {
      return languages.map(l => ({ id: l, label: l }));
    },
    activeLocal: {
      get() {
        return this.active;
      },
      set(val) {
        if (!val) {
          this.$emit("close-popup");
        }
      }
    },
    filenameLocal: {
      get() {
        return this.filename;
      },
      set(val) {
        this.$emit("change-filename", val);
      }
    },
    programmingLanguageLocal: {
      get() {
        return this.programmingLanguage;
      },
      set(val) {
        this.$emit("change-programming-language", val);
      }
    },
    codeLocal: {
      get() {
        return this.code;
      },
      set(val) {
        this.$emit("change-code", val);
      }
    }
  }
};
</script>
