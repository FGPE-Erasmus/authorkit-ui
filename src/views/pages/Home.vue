<template>
  <div id="project-list">
    <card-list
      :sorting-options="sortingOptions"
      :current-page="currentPage"
      :items-per-page="itemsPerPage"
      :sorting-order="sortingOrder"
      :table-view="tableView"
      :total="totalItems"
      :items="projects"
      :columns="['Project.Name', 'Project.Description', 'Project.Status']"
      @itemsperpagechange="itemsPerPage = $event"
      @currentpagechange="currentPage = $event"
      @sortchange="sortingOrder = $event"
      @viewchange="changeView($event)"
      @create="showSidebarForm = true"
    >
      <template v-slot:row="{ item }">
        <card-list-row
          :allow-view="true"
          :allow-export="true"
          @view="openProject(item)"
          @export="exportAndDownload(item)"
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
          :allow-view="true"
          :allow-export="true"
          @view="openProject(item)"
          @export="exportAndDownload(item)"
        />
      </template>
    </card-list>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import {
  MODULE_BASE,
  PROJECT_EXPORT_PUBLIC,
  PROJECT_LIST_PUBLIC
} from "@/store/projects/project.constants";
import * as downloads from "@/assets/utils/downloads";
import { truncateWithEllipses } from "@/assets/utils/strings";
import { TOGGLE_TABLE_VIEW } from "@/store/constants";
import CardList from "@/components/card-list/CardList";
import CardListRow from "@/components/card-list/CardListRow";
import ProjectCard from "@/views/projects/ProjectCard";

export default {
  name: "Home",
  components: {
    CardList,
    CardListRow,
    ProjectCard
  },
  data() {
    return {
      sortingOptions: ["name", "updated_at", "created_at"],
      projects: [],
      currentPage: 1,
      itemsPerPage: 6,
      visible: 0,
      totalItems: 0,
      sortingOrder: {
        field: "updated_at",
        order: "DESC"
      }
    };
  },
  computed: {
    ...mapState({
      lights: state => state.theme_settings.lights,
      tableView: state => state.theme_settings.tableView,
      searchQuery: "searchQuery",
      user: state => state.user
    }),
    ...mapGetters({
      isUserLoggedIn: "auth/isUserLoggedIn"
    }),
  },
  created() {
    this.fetchProjects();
  },
  mounted() {
    if (this.isUserLoggedIn) {
      this.$router.push(this.$router.currentRoute.query.to || "/dashboard");
    }
  },
  methods: {
    truncateWithEllipses,
    changeView(tableView) {
      this.$store.dispatch(TOGGLE_TABLE_VIEW, tableView);
    },

    fetchProjects() {
      this.$store
        .dispatch(`${MODULE_BASE}/${PROJECT_LIST_PUBLIC}`, {
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
    openProject(item) {
      this.$router.push(`/projects/${item.id}/exercises`);
    },
    exportAndDownload(item) {
      this.$store
        .dispatch(`${MODULE_BASE}/${PROJECT_EXPORT_PUBLIC}`, item.id)
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
    }
  }
};
</script>

<style scoped></style>
