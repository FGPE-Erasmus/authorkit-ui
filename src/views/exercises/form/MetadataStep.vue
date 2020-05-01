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
        </ValidationProvider>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <ValidationProvider
          name="module"
          rules="max:150"
          v-slot="{ errors }"
          persist
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
            :label-placeholder="$t('Exercise.Status')"
            @input="updateValue()"
            :disabled="permissions[projectId] < 2"
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
    <div class="vx-row">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <ValidationProvider
          name="type"
          rules="required"
          v-slot="{ errors }"
          persist
        >
          <fgpe-select
            name="type"
            v-model="metadata.type"
            class="mt-5 w-full select-large"
            :label-placeholder="$t('Exercise.Type')"
            :options="Object.keys(types)"
            :clearable="false"
            :searchable="false"
            @input="updateValue()"
            :disabled="permissions[projectId] < 2"
          >
            <template slot="option" slot-scope="option">
              <div class="d-center">
                {{ $t(types[option.label]) }}
              </div>
            </template>
            <template slot="selected-option" slot-scope="option">
              <div class="selected d-center">
                {{ $t(types[option.label]) }}
              </div>
            </template>
          </fgpe-select>
          <span v-show="errors[0]" class="text-danger text-sm">
            {{ errors[0] }}
          </span>
        </ValidationProvider>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <ValidationProvider
          name="difficulty"
          rules="required"
          v-slot="{ errors }"
          persist
        >
          <fgpe-select
            name="difficulty"
            v-model="metadata.difficulty"
            class="mt-5 w-full select-large"
            :label-placeholder="$t('Exercise.Difficulty')"
            :options="Object.keys(difficultyLevels)"
            :clearable="false"
            :searchable="false"
            @input="updateValue()"
            :disabled="permissions[projectId] < 2"
          >
            <template slot="option" slot-scope="option">
              <div class="d-center">
                {{ $t(difficultyLevels[option.label]) }}
              </div>
            </template>
            <template slot="selected-option" slot-scope="option">
              <div class="selected d-center">
                {{ $t(difficultyLevels[option.label]) }}
              </div>
            </template>
          </fgpe-select>
          <span v-show="errors[0]" class="text-danger text-sm">
            {{ errors[0] }}
          </span>
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
        </ValidationProvider>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-6">
        <ValidationProvider
          name="platform"
          rules="max:250"
          v-slot="{ errors }"
          persist
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
      types: {
        blank_sheet: this.$t("Exercise.Types.BlankSheet"),
        extension: this.$t("Exercise.Types.Extension"),
        improvement: this.$t("Exercise.Types.Improvement"),
        bug_fix: this.$t("Exercise.Types.BugFix"),
        fill_in_gaps: this.$t("Exercise.Types.FillInGaps"),
        sort_blocks: this.$t("Exercise.Types.SortBlocks"),
        spot_bug: this.$t("Exercise.Types.SpotBug")
      },
      difficultyLevels: {
        beginner: this.$t("Exercise.DifficultyLevels.Beginner"),
        easy: this.$t("Exercise.DifficultyLevels.Easy"),
        average: this.$t("Exercise.DifficultyLevels.Average"),
        hard: this.$t("Exercise.DifficultyLevels.Hard"),
        master: this.$t("Exercise.DifficultyLevels.Master")
      },
      statuses: {
        draft: this.$t("Exercise.Statuses.Draft"),
        unpublished: this.$t("Exercise.Statuses.Unpublished"),
        published: this.$t("Exercise.Statuses.Published"),
        trash: this.$t("Exercise.Statuses.Trash")
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
