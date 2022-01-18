<template>
  <form>
    <template-sidebar
      :is-sidebar-active="isTemplateSidebarActive"
      :item="template"
      @submit="sendDataTemplate"
      @close-sidebar="
        isTemplateSidebarActive = false;
        template = undefined;
      "
    />
    <div id="gamification-layers">
      <card-list
        :sorting-options="sortingOptions"
        :current-page="currentPage"
        :items-per-page="itemsPerPage"
        :sorting-order="sortingOrder"
        :table-view="tableView"
        :total="totalItems"
        :items="gamificationLayers"
        :allow-create="permissions[projectId] >= 2"
        :allow-import="permissions[projectId] >= 2"
        :allow-template="permissions[projectId] >= 2"
        :columns="[
          'GamificationLayer.Name',
          'GamificationLayer.Description',
          'GamificationLayer.Status'
        ]"
        @itemsperpagechange="itemsPerPage = $event"
        @currentpagechange="currentPage = $event"
        @sortchange="sortingOrder = $event"
        @viewchange="changeView($event)"
        @create="create"
        @import="uploadAndImport"
        @template="activateTemplateSidebar"
      >
        <template v-slot:row="{ item }">
          <card-list-row
            :allow-view="permissions[projectId] === 1"
            :allow-export="permissions[projectId] >= 1"
            :allow-edit="permissions[projectId] >= 2"
            :allow-remove="permissions[projectId] >= 4"
            @view="edit(item)"
            @edit="edit(item)"
            @export="triggerExport(item)"
            @remove="confirmDelete(item)"
          >
            <vs-td>
              <p>{{ truncateWithEllipses(item.name, 20) }}</p>
            </vs-td>
            <vs-td>
              <p>{{ truncateWithEllipses(item.description || "", 40) }}</p>
            </vs-td>
            <vs-td>
              <p>
                {{
                  $t("GamificationLayer.Statuses." + item.status.toUpperCase())
                }}
              </p>
            </vs-td>
          </card-list-row>
        </template>
        <template v-slot:card="{ item }">
          <gamification-layer-card
            :gamificationLayer="item"
            :allow-view="permissions[projectId] === 1"
            :allow-export="permissions[projectId] >= 1"
            :allow-edit="permissions[projectId] >= 2"
            :allow-remove="permissions[projectId] >= 4"
            @view="edit(item)"
            @edit="edit(item)"
            @export="triggerExport(item)"
            @remove="confirmDelete(item)"
          />
        </template>
      </card-list>
      <export-gamification-layer-dialog
        :active.sync="exportDialog.active"
        :exercises="exportDialog.exercises"
        @export="exportAndDownload($event)"
        @cancel="
          exportDialog.active = false;
          exportDialog.file = undefined;
        "
      />
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";

import * as downloads from "@/assets/utils/downloads";
import * as search from "@/assets/utils/search";
import { truncateWithEllipses } from "@/assets/utils/strings";

import { TOGGLE_TABLE_VIEW } from "@/store/constants";
import {
  MODULE_BASE,
  GAMIFICATION_LAYER_LIST,
  GAMIFICATION_LAYER_DELETE,
  GAMIFICATION_LAYER_IMPORT,
  GAMIFICATION_LAYER_EXPORT,
  GAMIFICATION_LAYER_CREATE_FROM_TEMPLATE
} from "@/store/gamification-layers/gamification-layer.constants";

import CardList from "@/components/card-list/CardList";
import CardListRow from "@/components/card-list/CardListRow";
import GamificationLayerCard from "@/views/gamification-layers/GamificationLayerCard";
import ExportGamificationLayerDialog from "@/views/gamification-layers/dialog/ExportGamificationLayerDialog";
import TemplateSidebar from "./form/TemplateSidebar";

export default {
  components: {
    "export-gamification-layer-dialog": ExportGamificationLayerDialog,
    "template-sidebar": TemplateSidebar,
    CardList,
    CardListRow,
    GamificationLayerCard
  },
  data: () => ({
    isTemplateSidebarActive: false,
    sortingOptions: ["name", "updated_at", "created_at"],
    gamificationLayers: [],
    currentPage: 1,
    itemsPerPage: 6,
    totalItems: 0,
    sortingOrder: {
      field: "updated_at",
      order: "DESC"
    },
    searchObj: undefined,
    exportDialog: {
      active: false,
      glId: undefined,
      exercises: ""
    }
  }),
  watch: {
    itemsPerPage: function() {
      this.fetchGamificationLayers();
    },
    currentPage: function() {
      this.fetchGamificationLayers();
    },
    sortingOrder: function() {
      this.fetchGamificationLayers();
    },
    searchQuery: {
      handler: function() {
        if (!this.searchQuery) {
          this.searchObj = undefined;
        } else {
          this.searchObj = search.searchQueryToSearch(
            this.searchQuery,
            ["name", "keywords"],
            ["status"]
          );
        }
        this.currentPage = 1;
        this.fetchGamificationLayers();
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
      searchQuery: "searchQuery"
    }),
    ...mapState({
      tableView: state => state.theme_settings.tableView,
      searchQuery: "searchQuery"
    })
  },
  created() {
    this.fetchGamificationLayers();
  },
  mounted() {},
  methods: {
    truncateWithEllipses,
    changeView(tableView) {
      this.$store.dispatch(TOGGLE_TABLE_VIEW, tableView);
    },

    activateTemplateSidebar(instruction) {
      this.instruction = instruction;
      this.isTemplateSidebarActive = true;
    },

    async sendDataTemplate(template) {
      await this.createChallengeFromTemplate(template);
    },

    createChallengeFromTemplate(template) {
      //console.log(template.exercises[0].id);
      this.$store
        .dispatch(
          `${MODULE_BASE}/${GAMIFICATION_LAYER_CREATE_FROM_TEMPLATE}`,
          Object.assign({
            project_id: this.projectId,
            template_id: template.templates[0].id
          })
        )
        .then(res => {
          console.log("Creating...", res);
          this.isTemplateSidebarActive = false;
          this.fetchGamificationLayers();
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to create gamification layer from template",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },

    fetchGamificationLayers() {
      this.$store
        .dispatch(`${MODULE_BASE}/${GAMIFICATION_LAYER_LIST}`, {
          page: this.currentPage,
          limit: this.itemsPerPage,
          search: this.searchObj,
          sort: [`${this.sortingOrder.field},${this.sortingOrder.order}`]
        })
        .then(res => {
          this.gamificationLayers = res.data;
          this.totalItems = res.total;
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to list gamification layers",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },
    create() {
      this.$router.push(`/projects/${this.projectId}/gamification-layers/new`);
    },
    edit(gamificationLayer) {
      this.$router.push(
        `/projects/${this.projectId}/gamification-layers/${gamificationLayer.id}`
      );
    },
    uploadAndImport(file) {
      this.$store
        .dispatch(`${MODULE_BASE}/${GAMIFICATION_LAYER_IMPORT}`, {
          project_id: this.projectId,
          file
        })
        .then(() => {
          this.fetchGamificationLayers();
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to import gamification layer",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },
    triggerExport(gl) {
      this.exportDialog.glId = gl.id;
      this.exportDialog.exercises = "";
      this.exportDialog.active = !this.exportDialog.active;
    },
    exportAndDownload(exercises) {
      const glId = this.exportDialog.glId;
      this.$store
        .dispatch(`${MODULE_BASE}/${GAMIFICATION_LAYER_EXPORT}`, {
          id: glId,
          exercises
        })
        .then(data => {
          downloads.download(data, glId + ".zip");
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to export gamification layer",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
      this.exportDialog.glId = undefined;
      this.exportDialog.active = false;
    },

    confirmDelete(gamificationLayer) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: this.$t("Dialogs.ConfirmDelete.Title", {
          item: gamificationLayer.name
        }),
        text: this.$t("Dialogs.ConfirmDelete.Message", {
          item: gamificationLayer.name
        }),
        "accept-text": this.$t("Form.Delete"),
        "cancel-text": this.$t("Form.Cancel"),
        accept: () => this.delete(gamificationLayer.id)
      });
    },
    delete(id) {
      this.$store
        .dispatch(`${MODULE_BASE}/${GAMIFICATION_LAYER_DELETE}`, id)
        .then(() => {
          this.fetchGamificationLayers();
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to delete gamification layer",
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
