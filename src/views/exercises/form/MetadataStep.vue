<template>
  <form>
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <ValidationProvider
          name="title"
          rules="required|max:150"
          v-slot="{ errors }"
          persist
        >
          <vs-tooltip
            :title="$t('Exercise.Title')"
            :text="$t('Exercise.Hints.Title')"
            color="primary"
          >
            <vs-input
              name="title"
              v-model="metadata.title"
              :label-placeholder="$t('Exercise.Title')"
              @input="updateValue()"
              class="w-full"
              :disabled="permissions[projectId] < 2"
            />
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </vs-tooltip>
        </ValidationProvider>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <ValidationProvider
          name="module"
          rules="max:150"
          v-slot="{ errors }"
          persist
        >
          <vs-tooltip
            :title="$t('Exercise.Module')"
            :text="$t('Exercise.Hints.Module')"
            color="primary"
          >
            <vs-input
              name="module"
              v-model="metadata.module"
              :label-placeholder="$t('Exercise.Module')"
              @input="updateValue()"
              class="w-full"
              :disabled="permissions[projectId] < 2"
            />
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </vs-tooltip>
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
          <vs-tooltip
            :title="$t('Exercise.Keywords')"
            :text="$t('Exercise.Hints.Keywords')"
            color="primary"
          >
            <fgpe-chips
              name="keywords"
              v-model="metadata.keywords"
              :label-placeholder="$t('Exercise.Keywords')"
              :unique="true"
              icon-pack="mi md-16"
              remove-icon="delete_forever"
              @input="updateValue()"
              class="mt-5"
              :disabled="permissions[projectId] < 2"
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
          </vs-tooltip>
        </ValidationProvider>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <ValidationProvider
          name="status"
          rules="required"
          v-slot="{ errors }"
          persist
        >
          <vs-tooltip
            :title="$t('Exercise.Status')"
            :text="$t('Exercise.Hints.Status')"
            color="primary"
          >
            <fgpe-select
              name="status"
              v-model="metadata.status"
              class="mt-5 w-full select-large"
              :options="statuses"
              :clearable="false"
              :searchable="false"
              :label-placeholder="$t('Exercise.Status')"
              @input="updateValue()"
              :disabled="permissions[projectId] < 2"
            >
              <template slot="option" slot-scope="option">
                <div class="d-center">
                  {{ $t("Exercise.Statuses." + option.label.toUpperCase()) }}
                </div>
              </template>
              <template slot="selected-option" slot-scope="option">
                <div class="selected d-center">
                  {{ $t("Exercise.Statuses." + option.label.toUpperCase()) }}
                </div>
              </template>
            </fgpe-select>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </vs-tooltip>
        </ValidationProvider>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <ValidationProvider
          name="type"
          rules="required"
          v-slot="{ errors }"
          persist
        >
          <vs-tooltip
            :title="$t('Exercise.Type')"
            :text="$t('Exercise.Hints.Type')"
            color="primary"
          >
            <fgpe-select
              name="type"
              v-model="metadata.type"
              class="mt-5 w-full select-large"
              :label-placeholder="$t('Exercise.Type')"
              :options="types"
              :clearable="false"
              :searchable="false"
              @input="updateValue()"
              :disabled="permissions[projectId] < 2"
            >
              <template slot="option" slot-scope="option">
                <div class="d-center">
                  {{ $t("Exercise.Types." + option.label.toUpperCase()) }}
                </div>
              </template>
              <template slot="selected-option" slot-scope="option">
                <div class="selected d-center">
                  {{ $t("Exercise.Types." + option.label.toUpperCase()) }}
                </div>
              </template>
            </fgpe-select>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </vs-tooltip>
        </ValidationProvider>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <ValidationProvider
          name="difficulty"
          rules="required"
          v-slot="{ errors }"
          persist
        >
          <vs-tooltip
            :title="$t('Exercise.Difficulty')"
            :text="$t('Exercise.Hints.Difficulty')"
            color="primary"
          >
            <fgpe-select
              name="difficulty"
              v-model="metadata.difficulty"
              class="mt-5 w-full select-large"
              :label-placeholder="$t('Exercise.Difficulty')"
              :options="difficultyLevels"
              :clearable="false"
              :searchable="false"
              @input="updateValue()"
              :disabled="permissions[projectId] < 2"
            >
              <template slot="option" slot-scope="option">
                <div class="d-center">
                  {{
                    $t(
                      "Exercise.DifficultyLevels." + option.label.toUpperCase()
                    )
                  }}
                </div>
              </template>
              <template slot="selected-option" slot-scope="option">
                <div class="selected d-center">
                  {{
                    $t(
                      "Exercise.DifficultyLevels." + option.label.toUpperCase()
                    )
                  }}
                </div>
              </template>
            </fgpe-select>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </vs-tooltip>
        </ValidationProvider>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <ValidationProvider
          name="event"
          rules="max:250"
          v-slot="{ errors }"
          persist
        >
          <vs-tooltip
            :title="$t('Exercise.Event')"
            :text="$t('Exercise.Hints.Event')"
            color="primary"
          >
            <vs-input
              name="event"
              v-model="metadata.event"
              :label-placeholder="$t('Exercise.Event')"
              @input="updateValue()"
              class="w-full"
              :disabled="permissions[projectId] < 2"
            />
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </vs-tooltip>
        </ValidationProvider>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-6">
        <ValidationProvider
          name="platform"
          rules="max:250"
          v-slot="{ errors }"
          persist
        >
          <vs-tooltip
            :title="$t('Exercise.Platform')"
            :text="$t('Exercise.Hints.Platform')"
            color="primary"
          >
            <vs-input
              name="platform"
              v-model="metadata.platform"
              :label-placeholder="$t('Exercise.Platform')"
              @input="updateValue()"
              class="w-full"
              :disabled="permissions[projectId] < 2"
            />
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </vs-tooltip>
        </ValidationProvider>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";
import { ValidationProvider } from "vee-validate";

import FgpeChips from "@/components/FgpeChips";
import FgpeSelect from "@/components/FgpeSelect";

export default {
  name: "exercise-metadata-step",
  components: {
    ValidationProvider,
    "fgpe-chips": FgpeChips,
    "fgpe-select": FgpeSelect
  },
  props: {
    id: {
      type: String
    },
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
    }
  },
  data() {
    return {
      metadata: this.value,
      types: [
        "blank_sheet",
        "extension",
        "improvement",
        "bug_fix",
        "fill_in_gaps",
        "sort_blocks",
        "spot_bug"
      ],
      difficultyLevels: ["beginner", "easy", "average", "hard", "master"],
      statuses: ["draft", "unpublished", "published", "trash"]
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
      this.metadata.title = from.title;
      this.metadata.module = from.module;
      this.metadata.keywords = from.keywords;
      this.metadata.status = from.status;
      this.metadata.type = from.type;
      this.metadata.difficulty = from.difficulty;
      this.metadata.event = from.event;
      this.metadata.platform = from.platform;
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
