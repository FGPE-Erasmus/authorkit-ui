<template>
  <div id="exercises">
    <card-list
      :sorting-options="sortingOptions"
      :current-page="currentPage"
      :items-per-page="itemsPerPage"
      :sorting-order="sortingOrder"
      :table-view="tableView"
      :total="totalItems"
      :items="exercises"
      :allow-create="permissions[projectId] >= 2"
      :allow-import="permissions[projectId] >= 2"
      :columns="[
        'Exercise.Title',
        'Exercise.Module',
        'Exercise.Type',
        'Exercise.Difficulty',
        'Exercise.Status'
      ]"
      @itemsperpagechange="itemsPerPage = $event"
      @currentpagechange="currentPage = $event"
      @sortchange="sortingOrder = $event"
      @viewchange="changeView($event)"
      @create="create"
      @import="triggerImport"
    >
      <template v-slot:row="{ item }">
        <card-list-row
          :allow-view="permissions[projectId] === 1"
          :allow-export="permissions[projectId] >= 1"
          :allow-edit="permissions[projectId] >= 2"
          :allow-remove="permissions[projectId] >= 4"
          @view="edit(item)"
          @edit="edit(item)"
          @export="triggerExport(item.id)"
          @remove="confirmDelete(item)"
        >
          <vs-td>
            <p>{{ truncateWithEllipses(item.title, 20) }}</p>
          </vs-td>
          <vs-td>
            <p>{{ truncateWithEllipses(item.module || "", 20) }}</p>
          </vs-td>
          <vs-td>
            <p>{{ $t("Exercise.Types." + item.type.toUpperCase()) }}</p>
          </vs-td>
          <vs-td>
            <p>
              {{
                $t("Exercise.DifficultyLevels." + item.difficulty.toUpperCase())
              }}
            </p>
          </vs-td>
          <vs-td>
            <p>{{ $t("Exercise.Statuses." + item.status.toUpperCase()) }}</p>
          </vs-td>
        </card-list-row>
      </template>
      <template v-slot:card="{ item }">
        <exercise-card
          :exercise="item"
          :allow-view="permissions[projectId] >= 1"
          :allow-export="permissions[projectId] >= 1"
          :allow-edit="permissions[projectId] >= 2"
          :allow-remove="permissions[projectId] >= 4"
          @view="edit(item)"
          @edit="edit(item)"
          @export="exportAndDownload(item)"
          @remove="confirmDelete(item)"
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
    <export-exercise-dialog
      :active="exportDialog.active"
      :format="exportDialog.format"
      @export="exportAndDownload($event)"
      @cancel="
        exportDialog.active = false;
        exportDialog.file = undefined;
      "
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

import * as downloads from "@/assets/utils/downloads";
import * as fileUtils from "@/assets/utils/file";
import * as search from "@/assets/utils/search";
import { truncateWithEllipses } from "@/assets/utils/strings";

import { TOGGLE_TABLE_VIEW } from "@/store/constants";
import {
  MODULE_BASE,
  EXERCISE_LIST,
  EXERCISE_DELETE,
  EXERCISE_EXPORT,
  EXERCISE_IMPORT,
  EXERCISE_IMPORT_SIPE,
  EXERCISE_IMPORT_MEF,
  EXERCISE_EXPORT_MEF
} from "@/store/exercises/exercise.constants";

import CardList from "@/components/card-list/CardList";
import CardListRow from "@/components/card-list/CardListRow";
import ExerciseCard from "@/views/exercises/ExerciseCard";
import ImportExerciseDialog from "@/views/exercises/dialog/ImportExerciseDialog";
import ExportExerciseDialog from "@/views/exercises/dialog/ExportExerciseDialog";

export default {
  components: {
    CardList,
    CardListRow,
    ExerciseCard,
    ImportExerciseDialog,
    ExportExerciseDialog
  },
  data: () => ({
    sortingOptions: [
      "title",
      "module",
      "type",
      "difficulty",
      "updated_at",
      "created_at"
    ],
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
    },
    exportDialog: {
      active: false,
      exerciseId: undefined,
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
    ...mapState("permission", {
      permissions: "permissions"
    }),
    ...mapState({
      tableView: state => state.theme_settings.tableView,
      searchQuery: "searchQuery"
    })
  },
  created() {
    this.fetchExercises();
  },
  mounted() {},
  methods: {
    truncateWithEllipses,
    changeView(tableView) {
      this.$store.dispatch(TOGGLE_TABLE_VIEW, tableView);
    },

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
    edit(exercise) {
      this.$router.push(`/projects/${this.projectId}/exercises/${exercise.id}`);
    },
    triggerExport(exerciseId) {
      this.exportDialog.exerciseId = exerciseId;
      this.exportDialog.format = "yapexil";
      this.exportDialog.active = true;
    },
    exportAndDownload(format) {
      const exerciseId = this.exportDialog.exerciseId;
      this.$store
        .dispatch(
          `${MODULE_BASE}/${
            format === "yapexil" ? EXERCISE_EXPORT : EXERCISE_EXPORT_MEF
          }`,
          this.exportDialog.exerciseId
        )
        .then(data => {
          downloads.download(data, exerciseId + ".zip");
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
      this.exportDialog.exerciseId = undefined;
      this.exportDialog.active = false;
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
      let action;
      if (format === "mef") {
        action = EXERCISE_IMPORT_MEF;
      } else if (format === "sipe") {
        action = EXERCISE_IMPORT_SIPE;
      } else {
        action = EXERCISE_IMPORT;
      }
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

    confirmDelete(exercise) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: this.$t("Dialogs.ConfirmDelete.Title", {
          item: exercise.title
        }),
        text: this.$t("Dialogs.ConfirmDelete.Message", {
          item: exercise.title
        }),
        "accept-text": this.$t("Form.Delete"),
        "cancel-text": this.$t("Form.Cancel"),
        accept: () => this.delete(exercise.id)
      });
    },
    delete(id) {
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
