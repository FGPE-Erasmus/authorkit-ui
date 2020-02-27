<template>
  <div id="projects-list">
    <project-form-sidebar
      :isSidebarActive="showSidebarForm"
      :data="sidebarProject"
      @closeSidebar="showSidebarForm = false"
      @submit="createOrUpdateProject"
    />
    <card-list-header
      :size="total"
      :current-page="currentPage"
      :items-per-page="itemsPerPage"
      @create="showSidebarForm = true"
      @import="uploadAndImport"
      @itemsperpagechange="setItemsPerPage"
    />
    <div class="vx-row">
      <div
        class="vx-col w-full md:w-1/3 sm:w-1/2 mb-base"
        v-for="project in projects"
        :key="project.id"
      >
        <project-card
          :id="project.id"
          :name="project.name"
          :description="project.description"
          :status="project.status"
          :role="project.role || 'owner'"
          :contributors="project.countContributors"
          :exercises="project.countExercises"
          :gamification-layers="project.countGamificationLayers"
          @edit="editProject"
          @open="openProject"
          @share="openSharePopup"
          @delete="deleteProject"
          @export="exportAndDownload"
        />
      </div>
    </div>
    <vs-pagination
      :total="Math.ceil(total / itemsPerPage)"
      v-model="currentPage"
      icon-pack="mi"
      class="vs-lg-12"
    ></vs-pagination>
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
import * as downloads from "@/utils/downloads";
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

import ProjectCard from "@/components/projects-cards/ProjectCard";
import CardListHeader from "@/components/card-list/CardListHeader";
import FgpeSharePopup from "@/components/FgpeSharePopup.vue";
import ProjectFormSidebar from "@/views/projects/ProjectFormSidebar";

export default {
  components: {
    ProjectCard,
    FgpeSharePopup,
    CardListHeader,
    ProjectFormSidebar
  },
  data: () => ({
    projects: [],
    currentPage: 1,
    itemsPerPage: 6,
    visible: 0,
    total: 0,
    showSidebarForm: false,
    sidebarProject: undefined,
    sharePopupOpen: false,
    projectSelected: null,
    shares: []
  }),
  watch: {
    itemsPerPage: function() {
      this.fetchProjects();
    },
    currentPage: function() {
      this.fetchProjects();
    }
  },
  created() {
    this.fetchProjects();
  },
  mounted() {
    this.$store.dispatch(`${PERMISSION_MODULE_BASE}/${PERMISSION_GET_ALL}`);
  },
  methods: {
    setItemsPerPage(itemsPerPage) {
      this.itemsPerPage = itemsPerPage;
    },

    openSharePopup(id) {
      this.projectSelected = id;
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

    openProject(id) {
      this.$router.push(`/projects/${id}/exercises`);
    },
    createProject() {
      this.sidebarProject = null;
      this.showSidebarForm = true;
    },
    editProject(id) {
      this.$store
        .dispatch(`${MODULE_BASE}/${PROJECT_GET}`, id)
        .then(res => {
          this.sidebarProject = res;
          this.showSidebarForm = true;
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to Retrieve Projects",
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
          limit: this.itemsPerPage
        })
        .then(res => {
          this.projects = res.data;
          this.visible = res.data.length;
          this.total = res.total;
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to List Projects",
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
              title: "Failed to Create Project",
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
              title: "Failed to Update Project",
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

    exportAndDownload(id) {
      this.$store
        .dispatch(`${MODULE_BASE}/${PROJECT_EXPORT}`, id)
        .then(data => {
          downloads.download(data, id + ".zip");
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

    deleteProject(id) {
      this.$store
        .dispatch(`${MODULE_BASE}/${PROJECT_DELETE}`, id)
        .then(() => {
          this.fetchProjects();
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to Delete Project",
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
