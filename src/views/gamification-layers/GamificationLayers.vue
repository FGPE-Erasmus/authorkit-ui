<template>
  <card-list
    :currentPage="currentPage"
    :itemsPerPage="itemsPerPage"
    :total="totalItems"
    :items="gamificationLayers"
    @itemsperpagechange="itemsPerPage = $event"
    @currentpagechange="currentPage = $event"
    @create="create"
    @import="uploadAndImport"
  >
    <template v-slot:card="{ item }">
      <gamification-layer-card
        :id="item.id"
        :name="item.name"
        :description="item.description"
        :owner_id="item.owner_id"
        :keywords="item.keywords"
        :status="item.status"
        :role="'owner'"
        @edit="update(item)"
        @delete="remove"
        @export="exportAndDownload"
      />
    </template>
  </card-list>
</template>

<script>
import { mapState } from "vuex";

import * as downloads from "@/utils/downloads";
import {
  MODULE_BASE,
  GAMIFICATION_LAYER_LIST,
  GAMIFICATION_LAYER_DELETE,
  GAMIFICATION_LAYER_IMPORT,
  GAMIFICATION_LAYER_EXPORT
} from "@/store/gamification-layers/gamification-layer.constants";

import CardList from "@/components/card-list/CardList";
import GamificationLayerCard from "@/views/gamification-layers/GamificationLayerCard";

export default {
  components: {
    CardList,
    GamificationLayerCard
  },
  data: () => ({
    gamificationLayers: [],
    currentPage: 1,
    itemsPerPage: 6,
    totalItems: 0
  }),
  watch: {
    itemsPerPage: function() {
      this.fetchGamificationLayers();
    },
    currentPage: function() {
      this.fetchGamificationLayers();
    }
  },
  computed: {
    projectId() {
      return this.$route.params.project_id;
    },
    ...mapState("project", {
      project: "activeProject"
    })
  },
  created() {
    this.fetchGamificationLayers();
  },
  mounted() {},
  methods: {
    setItemsPerPage(itemsPerPage) {
      this.itemsPerPage = itemsPerPage;
    },
    setCurrentPage(currentPage) {
      this.currentPage = currentPage;
    },
    fetchGamificationLayers() {
      this.$store
        .dispatch(`${MODULE_BASE}/${GAMIFICATION_LAYER_LIST}`, {
          page: this.currentPage,
          limit: this.itemsPerPage,
          filter: [`project_id||eq||${this.projectId}`]
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
    update(gamificationLayer) {
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
    exportAndDownload(id) {
      this.$store
        .dispatch(`${MODULE_BASE}/${GAMIFICATION_LAYER_EXPORT}`, id)
        .then(data => {
          downloads.download(data, id + ".zip");
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
    },
    remove(id) {
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