<template>
  <form>
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <ValidationProvider
          name="name"
          rules="required|max:150"
          v-slot="{ errors }"
          persist
        >
          <vs-input
            name="name"
            v-model="metadata.name"
            :label-placeholder="$t('GamificationLayer.Name')"
            @input="updateValue()"
            class="w-full"
          />
          <span v-show="errors[0]" class="text-danger text-sm">
            {{ errors[0] }}
          </span>
        </ValidationProvider>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <ValidationProvider
          name="description"
          rules="max:250"
          v-slot="{ errors }"
          persist
        >
          <vs-input
            name="description"
            v-model="metadata.description"
            :label-placeholder="$t('GamificationLayer.Description')"
            @input="updateValue()"
            class="w-full"
          />
          <span v-show="errors[0]" class="text-danger text-sm">
            {{ errors[0] }}
          </span>
        </ValidationProvider>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <ValidationProvider
          name="keywords"
          rules="eachMax:50"
          v-slot="{ errors }"
          persist
        >
          <fgpe-chips
            name="keywords"
            v-model="metadata.keywords"
            :label-placeholder="$t('GamificationLayer.Keywords')"
            :unique="true"
            icon-pack="mi md-16"
            remove-icon="delete_forever"
            @input="updateValue()"
            class="mt-5"
          >
            <vs-chip
              v-for="keyword in metadata.keywords"
              :key="keyword"
              @click="removeKeyword(keyword)"
              closable
              icon-pack="mi"
              close-icon="close"
            >
              {{ keyword }}
            </vs-chip>
          </fgpe-chips>
          <span v-show="errors[0]" class="text-danger text-sm">
            {{ errors[0] }}
          </span>
        </ValidationProvider>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <ValidationProvider
          name="status"
          rules="required"
          v-slot="{ errors }"
          persist
        >
          <fgpe-select
            name="status"
            v-model="metadata.status"
            class="mt-5 w-full select-large"
            :options="Object.keys(statuses)"
            :clearable="false"
            :searchable="false"
            :label-placeholder="$t('GamificationLayer.Status')"
            @input="updateValue()"
          >
            <template slot="option" slot-scope="option">
              <div class="d-center">
                {{ $t(statuses[option.label]) }}
              </div>
            </template>
            <template slot="selected-option" slot-scope="option">
              <div class="selected d-center">
                {{ $t(statuses[option.label]) }}
              </div>
            </template>
          </fgpe-select>
          <span v-show="errors[0]" class="text-danger text-sm">
            {{ errors[0] }}
          </span>
        </ValidationProvider>
      </div>
    </div>
  </form>
</template>

<script>
import { ValidationProvider } from "vee-validate";

import FgpeChips from "@/components/FgpeChips";
import FgpeSelect from "@/components/FgpeSelect";

export default {
  name: "gamification-layer-metadata-step",
  components: {
    ValidationProvider,
    "fgpe-chips": FgpeChips,
    "fgpe-select": FgpeSelect
  },
  props: {
    value: {
      type: Object
    }
  },
  computed: {},
  data() {
    return {
      statuses: {
        draft: this.$t("GamificationLayer.Statuses.Draft"),
        unpublished: this.$t("GamificationLayer.Statuses.Unpublished"),
        published: this.$t("GamificationLayer.Statuses.Published"),
        trash: this.$t("GamificationLayer.Statuses.Trash")
      },
      metadata: this.value
    };
  },
  watch: {
    value() {
      this.copyMetadata(this.value);
    }
  },
  mounted() {
    this.copyMetadata(this.value);
  },
  methods: {
    copyMetadata(from) {
      this.metadata.name = from.name;
      this.metadata.description = from.description;
      this.metadata.keywords = from.keywords;
      this.metadata.status = from.status;
    },
    removeKeyword(keyword) {
      this.metadata.keywords.splice(this.metadata.keywords.indexOf(keyword), 1);
      this.updateValue();
      return false;
    },
    updateValue() {
      this.$emit("input", this.metadata);
    }
  }
};
</script>
