<template>
  <div id="exercises">
    <card-list
      :sorting-options="sortingOptions"
      :current-page="currentPage"
      :items-per-page="itemsPerPage"
      :sorting-order="sortingOrder"
      :total="totalItems"
      :items="exercises"
      :allow-create="permissions[projectId] >= 2"
      :allow-import="permissions[projectId] >= 2"
      @itemsperpagechange="itemsPerPage = $event"
      @currentpagechange="currentPage = $event"
      @sortchange="sortingOrder = $event"
      @create="create"
      @import="triggerImport"
    >
      <template v-slot:card="{ item }">
        <exercise-card
          :id="item.id"
          :title="item.title"
          :module="item.module"
          :owner-id="item.owner_id"
          :keywords="item.keywords"
          :type="item.type"
          :event="item.event"
          :platform="item.platform"
          :difficulty="item.difficulty"
          :status="item.status"
          @edit="update(item)"
          @delete="remove"
          @export="exportAndDownload"
        />
      </template>
    </card-list>
    <import-exercise-dialog
      :active="importDialog.active"
      :format="importDialog.format"
      @import="uploadAndImport($event)"
      @cancel="
        importDialog.active = false;
        importDialog.file = undefined;
      "
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

import * as downloads from "@/assets/utils/downloads";
import * as search from "@/assets/utils/search";
import * as fileUtils from "@/assets/utils/file";

import {
  MODULE_BASE,
  EXERCISE_LIST,
  EXERCISE_DELETE,
  EXERCISE_EXPORT,
  EXERCISE_IMPORT,
  EXERCISE_IMPORT_SIPE
} from "@/store/exercises/exercise.constants";

import CardList from "@/components/card-list/CardList";
import ExerciseCard from "@/views/exercises/ExerciseCard";
import ImportExerciseDialog from "@/views/exercises/dialog/ImportExerciseDialog";

export default {
  components: {
    CardList,
    ExerciseCard,
    ImportExerciseDialog
  },
  data: () => ({
    sortingOptions: ["title", "type", "difficulty", "updated_at", "created_at"],
    exercises: [],
    currentPage: 1,
    itemsPerPage: 6,
    totalItems: 0,
    sortingOrder: {
      field: "updated_at",
      order: "DESC"
    },
    searchObj: undefined,

    importDialog: {
      active: false,
      file: undefined,
      format: "yapexil"
    }
  }),
  watch: {
    itemsPerPage: function() {
      this.fetchExercises();
    },
    currentPage: function() {
      this.fetchExercises();
    },
    sortingOrder: function() {
      this.fetchExercises();
    },
    searchQuery: {
      handler: function() {
        if (!this.searchQuery) {
          this.searchObj = undefined;
        } else {
          this.searchObj = search.searchQueryToSearch(
            this.searchQuery,
            ["title", "keywords", "event", "platform"],
            ["status", "type", "difficulty"]
          );
        }
        this.currentPage = 1;
        this.fetchExercises();
      },
      deep: true
    }
  },
  computed: {
    projectId() {
      return this.$route.params.project_id;
    },
    ...mapState("project", {
      project: "activeProject"
    }),
    ...mapState("permission", {
      permissions: "permissions"
    }),
    ...mapState({
      searchQuery: "searchQuery"
    })
  },
  created() {
    this.fetchExercises();
  },
  mounted() {},
  methods: {
    fetchExercises() {
      this.$store
        .dispatch(`${MODULE_BASE}/${EXERCISE_LIST}`, {
          page: this.currentPage,
          limit: this.itemsPerPage,
          search: this.searchObj,
          sort: [`${this.sortingOrder.field},${this.sortingOrder.order}`]
        })
        .then(res => {
          this.exercises = res.data;
          this.totalItems = res.total;
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to List Exercises",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },
    create() {
      this.$router.push(`/projects/${this.projectId}/exercises/new`);
    },
    update(exercise) {
      this.$router.push(`/projects/${this.projectId}/exercises/${exercise.id}`);
    },
    exportAndDownload(id) {
      this.$store
        .dispatch(`${MODULE_BASE}/${EXERCISE_EXPORT}`, id)
        .then(data => {
          downloads.download(data, id + ".zip");
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to export exercise",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },
    triggerImport(file) {
      this.importDialog.file = file;
      if (
        fileUtils.extensionFromName(file.name) === "js" ||
        fileUtils.extensionFromName(file.name) === "json"
      ) {
        this.importDialog.format = "sipe";
      } else {
        this.importDialog.format = "yapexil";
      }
      this.importDialog.active = true;
    },
    uploadAndImport(format) {
      const action =
        format === "yapexil" ? EXERCISE_IMPORT : EXERCISE_IMPORT_SIPE;
      this.$store
        .dispatch(`${MODULE_BASE}/${action}`, {
          project_id: this.projectId,
          file: this.importDialog.file
        })
        .then(() => {
          this.fetchExercises();
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to import exercise",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
      this.importDialog.active = false;
      this.importDialog.file = undefined;
    },
    remove(id) {
      this.$store
        .dispatch(`${MODULE_BASE}/${EXERCISE_DELETE}`, id)
        .then(() => {
          this.fetchExercises();
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to delete exercise",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    }
  }
};
</script>
