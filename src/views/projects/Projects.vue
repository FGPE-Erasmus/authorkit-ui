<template>
  <div id="project-list">
    <project-form-sidebar
      :isSidebarActive="showSidebarForm"
      :data="sidebarProject"
      @closeSidebar="showSidebarForm = false"
      @submit="createOrUpdateProject"
    />
    <card-list
      :sorting-options="sortingOptions"
      :current-page="currentPage"
      :items-per-page="itemsPerPage"
      :sorting-order="sortingOrder"
      :table-view="tableView"
      :total="totalItems"
      :items="projects"
      :allow-create="true"
      :allow-import="true"
      :columns="['Project.Name', 'Project.Description', 'Project.Status']"
      @itemsperpagechange="itemsPerPage = $event"
      @currentpagechange="currentPage = $event"
      @sortchange="sortingOrder = $event"
      @viewchange="changeView($event)"
      @create="showSidebarForm = true"
      @import="uploadAndImport"
    >
      <template v-slot:row="{ item }">
        <card-list-row
          :allow-view="permissions[item.id] >= 1"
          :allow-export="permissions[item.id] >= 1"
          :allow-edit="permissions[item.id] >= 2"
          :allow-share="permissions[item.id] >= 3"
          :allow-remove="permissions[item.id] >= 4"
          @view="openProject(item)"
          @edit="editProject(item)"
          @export="exportAndDownload(item)"
          @share="openSharePopup(item)"
          @remove="confirmDelete(item)"
        >
          <vs-td>
            <p>{{ truncateWithEllipses(item.name, 20) }}</p>
          </vs-td>
          <vs-td>
            <p>{{ truncateWithEllipses(item.description, 50) }}</p>
          </vs-td>
          <vs-td>
            <p>{{ $t("Project.Statuses." + item.status.toUpperCase()) }}</p>
          </vs-td>
        </card-list-row>
      </template>
      <template v-slot:card="{ item }">
        <project-card
          :project="item"
          :allow-view="permissions[item.id] >= 1"
          :allow-export="permissions[item.id] >= 1"
          :allow-edit="permissions[item.id] >= 2"
          :allow-share="permissions[item.id] >= 3"
          :allow-remove="permissions[item.id] >= 4"
          @view="openProject(item)"
          @edit="editProject(item)"
          @export="exportAndDownload(item)"
          @share="openSharePopup(item)"
          @remove="confirmDelete(item)"
        />
      </template>
    </card-list>
    <fgpe-share-popup
      :active="sharePopupOpen"
      @close-popup="closeSharePopup"
      :shares="shares"
      @create="onShareProject"
      @edit="onEditShareProject"
      @remove="onRevokePermissionProject"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

import * as downloads from "@/assets/utils/downloads";
import * as search from "@/assets/utils/search";
import { truncateWithEllipses } from "@/assets/utils/strings";
import { TOGGLE_TABLE_VIEW } from "@/store/constants";
import {
  MODULE_BASE,
  PROJECT_LIST,
  PROJECT_SHARES,
  PROJECT_GET,
  PROJECT_CREATE,
  PROJECT_UPDATE,
  PROJECT_CREATE_PERMISSION,
  PROJECT_UPDATE_PERMISSION,
  PROJECT_DELETE_PERMISSION,
  PROJECT_IMPORT,
  PROJECT_EXPORT,
  PROJECT_DELETE
} from "@/store/projects/project.constants";
import {
  MODULE_BASE as PERMISSION_MODULE_BASE,
  PERMISSION_GET_ALL
} from "@/store/permissions/permission.constants";

import CardList from "@/components/card-list/CardList";
import CardListRow from "@/components/card-list/CardListRow";
import FgpeSharePopup from "@/components/FgpeSharePopup.vue";
import ProjectCard from "@/views/projects/ProjectCard";
import ProjectFormSidebar from "@/views/projects/ProjectFormSidebar";

export default {
  components: {
    CardList,
    CardListRow,
    FgpeSharePopup,
    ProjectCard,
    ProjectFormSidebar
  },
  data: () => ({
    sortingOptions: ["name", "updated_at", "created_at"],
    projects: [],
    currentPage: 1,
    itemsPerPage: 6,
    visible: 0,
    totalItems: 0,
    sortingOrder: {
      field: "updated_at",
      order: "DESC"
    },
    showSidebarForm: false,
    sidebarProject: undefined,
    sharePopupOpen: false,
    projectSelected: null,
    shares: [],
    searchObj: undefined
  }),
  computed: {
    ...mapState({
      tableView: state => state.theme_settings.tableView,
      searchQuery: "searchQuery",
      permissions: state => state.permission.permissions
    })
  },
  watch: {
    itemsPerPage: function() {
      this.fetchProjects();
    },
    currentPage: function() {
      this.fetchProjects();
    },
    sortingOrder: function() {
      this.fetchProjects();
    },
    searchQuery: {
      handler: function() {
        if (!this.searchQuery) {
          this.searchObj = undefined;
        } else {
          this.searchObj = search.searchQueryToSearch(
            this.searchQuery,
            ["name", "description"],
            ["status"]
          );
        }
        this.currentPage = 1;
        this.fetchProjects();
      },
      deep: true
    }
  },
  created() {
    this.fetchProjects();
  },
  mounted() {
    this.$store.dispatch(`${PERMISSION_MODULE_BASE}/${PERMISSION_GET_ALL}`);
  },
  methods: {
    truncateWithEllipses,
    changeView(tableView) {
      this.$store.dispatch(TOGGLE_TABLE_VIEW, tableView);
    },
    openSharePopup(item) {
      this.projectSelected = item.id;
      this.getShares();
      this.sharePopupOpen = true;
    },
    closeSharePopup() {
      this.sharePopupOpen = false;
    },
    getShares() {
      this.$store
        .dispatch(`${MODULE_BASE}/${PROJECT_SHARES}`, this.projectSelected)
        .then(res => {
          this.shares = res;
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to get shares",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },
    onShareProject(share) {
      this.$store
        .dispatch(`${MODULE_BASE}/${PROJECT_CREATE_PERMISSION}`, {
          project_id: this.projectSelected,
          ...share
        })
        .then(() => {
          this.getShares();
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to share project",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },
    onEditShareProject(share) {
      this.$store
        .dispatch(`${MODULE_BASE}/${PROJECT_UPDATE_PERMISSION}`, {
          project_id: this.projectSelected,
          ...share
        })
        .then(() => {
          this.getShares();
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to share project",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },
    onRevokePermissionProject(user_id) {
      this.$store
        .dispatch(`${MODULE_BASE}/${PROJECT_DELETE_PERMISSION}`, {
          project_id: this.projectSelected,
          user_id
        })
        .then(() => {
          this.getShares();
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to revoke access project",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },

    openProject(item) {
      this.$router.push(`/projects/${item.id}/exercises`);
    },
    createProject() {
      this.sidebarProject = null;
      this.showSidebarForm = true;
    },
    editProject(item) {
      this.$store
        .dispatch(`${MODULE_BASE}/${PROJECT_GET}`, item.id)
        .then(res => {
          this.sidebarProject = res;
          this.showSidebarForm = true;
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to retrieve projects",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
          this.showSidebarForm = true;
        });
    },

    fetchProjects() {
      this.$store
        .dispatch(`${MODULE_BASE}/${PROJECT_LIST}`, {
          page: this.currentPage,
          limit: this.itemsPerPage,
          search: this.searchObj,
          sort: [`${this.sortingOrder.field},${this.sortingOrder.order}`]
        })
        .then(res => {
          this.projects = res.data;
          this.visible = res.data.length;
          this.totalItems = res.total;
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to list projects",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },

    createOrUpdateProject(project) {
      if (!project.id) {
        this.$store
          .dispatch(`${MODULE_BASE}/${PROJECT_CREATE}`, project)
          .then(res => {
            this.$vs.notify({
              title: "Project Created",
              text: `Project ${res.name} has been created successfully.`,
              iconPack: "mi",
              icon: "check_circle",
              color: "success"
            });
            this.showSidebarForm = false;
            this.sidebarProject = null;

            this.fetchProjects();
          })
          .catch(err => {
            this.$vs.notify({
              title: "Failed to create project",
              text: err.message,
              iconPack: "mi",
              icon: "error",
              color: "danger"
            });
          });
      } else {
        this.$store
          .dispatch(`${MODULE_BASE}/${PROJECT_UPDATE}`, {
            id: project.id,
            project
          })
          .then(res => {
            this.$vs.notify({
              title: "Project Updated",
              text: `Project ${res.name} has been updated successfully.`,
              iconPack: "mi",
              icon: "check_circle",
              color: "success"
            });
            this.showSidebarForm = false;
            this.sidebarProject = null;

            this.fetchProjects();
          })
          .catch(err => {
            this.$vs.notify({
              title: "Failed to update project",
              text: err.message,
              iconPack: "mi",
              icon: "error",
              color: "danger"
            });
          });
      }
    },

    uploadAndImport(file) {
      this.$store
        .dispatch(`${MODULE_BASE}/${PROJECT_IMPORT}`, {
          project_id: this.projectId,
          file
        })
        .then(() => {
          this.fetchProjects();
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to import project",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },

    exportAndDownload(item) {
      this.$store
        .dispatch(`${MODULE_BASE}/${PROJECT_EXPORT}`, item.id)
        .then(data => {
          downloads.download(data, item.id + ".zip");
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to export project",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },

    confirmDelete(project) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: this.$t("Dialogs.ConfirmDelete.Title", {
          item: project.name
        }),
        text: this.$t("Dialogs.ConfirmDelete.Message", {
          item: project.name
        }),
        "accept-text": this.$t("Form.Delete"),
        "cancel-text": this.$t("Form.Cancel"),
        accept: () => this.deleteProject(project.id)
      });
    },

    deleteProject(id) {
      this.$store
        .dispatch(`${MODULE_BASE}/${PROJECT_DELETE}`, id)
        .then(() => {
          this.fetchProjects();
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to delete project",
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
