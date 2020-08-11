<template>
  <vs-popup
    class="fgpe-translate-popup"
    :title="$t('TranslatePopup.Title')"
    :active.sync="activeLocal"
    icon-pack="mi"
  >
    <div class="flex flex-col h-full">
      <ValidationObserver v-slot="{ invalid }" class="flex flex-col">
        <div class="flex flex-row">
          <ValidationProvider
            name="nat_lang"
            rules="required"
            v-slot="{ errors }"
            persist
            class="flex flex-grow items-start"
          >
            <fgpe-select
              name="nat_lang"
              v-model="natLang"
              class="mt-5 w-full select-large"
              :options="Object.keys(languages)"
              :clearable="false"
              :searchable="false"
              :label-placeholder="$t('TranslatePopup.NatLang')"
            >
              <template slot="option" slot-scope="option">
                <div class="d-center">
                  {{ languages[option.label] }}
                </div>
              </template>
              <template slot="selected-option" slot-scope="option">
                <div class="selected d-center">
                  {{ languages[option.label] }}
                </div>
              </template>
            </fgpe-select>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>

        <div class="flex flex-wrap items-center justify-center p-6">
          <vs-button
            class="mr-6"
            @click="$emit('translate', natLang)"
            :disabled="invalid"
          >
            {{ $t("TranslatePopup.Translate") }}
          </vs-button>
          <vs-button
            type="border"
            color="danger"
            @click="activeLocal = false"
            >{{ $t("TranslatePopup.Cancel") }}</vs-button
          >
        </div>
      </ValidationObserver>
    </div>
  </vs-popup>
</template>

<script>
import { mapState } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";

import languages from "@/assets/data/languages.json";
import FgpeSelect from "@/components/FgpeSelect";

export default {
  name: "fgpe-translate-popup",
  components: {
    ValidationObserver,
    ValidationProvider,
    "fgpe-select": FgpeSelect
  },
  props: {
    active: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      languages,
      natLang: ""
    };
  },
  computed: {
    ...mapState({
      last_used: "last_used_values"
    }),
    activeLocal: {
      get() {
        return this.active;
      },
      set(val) {
        if (!val) {
          this.$emit("close-popup");
        }
      }
    }
  },
  watch: {
    active(val) {
      if (val) {
        console.log(this.last_used.translate_nat_lang);
        this.natLang = this.last_used.translate_nat_lang;
      }
    }
  }
};
</script>
