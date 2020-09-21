<template>
  <form>
    <leaderboard-sidebar
      :project-id="projectId"
      :gamification-layer-id="gamificationLayerId"
      :is-sidebar-active="isLeaderboardSidebarActive"
      :item="leaderboard"
      @submit="saveLeaderboard"
      @close-sidebar="
        isLeaderboardSidebarActive = false;
        leaderboard = undefined;
      "
    />
    <div class="vx-row">
      <div class="vx-col w-full mb-2">
        <fgpe-tree
          :label="$t('GamificationLayer.Leaderboards')"
          ref="leaderboard-tree"
          :value="leaderboardTree"
          :options="leaderboardTreeOpts"
          @create-node="onCreate()"
          :allow-create="permissions[projectId] > 1"
          :allow-update="permissions[projectId] > 1"
          :allow-delete="permissions[projectId] > 1"
        >
          <template v-slot:node="{ node }">
            <fgpe-tree-node
              :value="node"
              @create-node="onCreate"
              @update-node="onUpdate"
              @delete-node="onDelete"
              :supports-children="false"
              :editable="permissions[projectId] > 1"
              :removable="permissions[projectId] > 1"
            />
          </template>
        </fgpe-tree>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";

import FgpeTree from "@/components/fgpe-tree/FgpeTree";
import FgpeTreeNode from "@/components/fgpe-tree/FgpeTreeNode";

import LeaderboardSidebar from "./LeaderboardSidebar";

import {
  MODULE_BASE as LEADERBOARD_MODULE_BASE,
  LEADERBOARD_CREATE,
  LEADERBOARD_UPDATE,
  LEADERBOARD_DELETE,
  LEADERBOARD_LIST
} from "@/store/leaderboards/leaderboard.constants";

export default {
  name: "gamification-layer-leaderboards-step",
  components: {
    "fgpe-tree": FgpeTree,
    "fgpe-tree-node": FgpeTreeNode,
    "leaderboard-sidebar": LeaderboardSidebar
  },
  props: {
    projectId: String,
    gamificationLayerId: String,
    value: {
      type: Object
    }
  },
  computed: {
    ...mapState("permission", {
      permissions: "permissions"
    }),
    leaderboardTree() {
      return this.leaderboards
        .filter(leaderboard => !leaderboard.challenge_id)
        .map(this.transformLeaderboardIntoNode);
    }
  },
  data() {
    return {
      leaderboards: [],

      leaderboardTreeOpts: {},

      isLeaderboardSidebarActive: false,
      leaderboard: undefined
    };
  },
  watch: {
    gamificationLayerId(val) {
      if (val) {
        this.refreshLeaderboards();
      }
    }
  },
  methods: {
    refreshLeaderboards() {
      this.$store
        .dispatch(`${LEADERBOARD_MODULE_BASE}/${LEADERBOARD_LIST}`, {
          filter: [`gl_id||eq||${this.gamificationLayerId}`]
        })
        .then(res => {
          this.leaderboards.splice(0, this.leaderboards.length);
          this.leaderboards.push(...res);
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to get leaderboards",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },

    transformLeaderboardIntoNode(leaderboard) {
      const node = {
        id: leaderboard.id,
        text: leaderboard.name,
        data: {
          nodeType: "leaderboard",
          ...leaderboard,
          revealable_exercises: leaderboard.revealable_exercise_ids,
          revealable_challenges: leaderboard.revealable_challenge_ids,
          unlockable_exercises: leaderboard.unlockable_exercise_ids,
          unlockable_challenges: leaderboard.unlockable_challenge_ids
        },
        state: {
          draggable: false,
          droppable: true
        },
        children: []
      };
      return node;
    },

    /* lifecycle */

    onCreate(id, data) {
      this.activateLeaderboardSidebar(data);
    },

    onUpdate(id, data) {
      this.activateLeaderboardSidebar(data);
    },

    async onDelete(id, data) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: this.$t("Dialogs.ConfirmDelete.Title", {
          item: this.$t("GamificationLayer._Leaderboard")
        }),
        text: this.$t("Dialogs.ConfirmDelete.Message", {
          item: data.name
        }),
        "accept-text": this.$t("Form.Delete"),
        "cancel-text": this.$t("Form.Cancel"),
        accept: async () => {
          await this.deleteLeaderboard(id);
          this.refreshLeaderboards();
        }
      });
    },

    /** Sidebar */

    activateLeaderboardSidebar(leaderboard) {
      this.leaderboard = leaderboard;
      this.isLeaderboardSidebarActive = true;
    },

    async saveLeaderboard(leaderboard) {
      if (leaderboard && leaderboard.id) {
        await this.updateLeaderboard(leaderboard);
      } else {
        await this.createLeaderboard(leaderboard);
      }
      this.isLeaderboardSidebarActive = false;
      this.refreshLeaderboards();
    },

    createLeaderboard(leaderboard) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(
            `${LEADERBOARD_MODULE_BASE}/${LEADERBOARD_CREATE}`,
            leaderboard
          )
          .then(res => {
            this.$vs.notify({
              title: "Leaderboard Created",
              text: `Leaderboard ${res.name} has been created successfully.`,
              iconPack: "mi",
              icon: "check_circle",
              color: "success"
            });
            resolve(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: "Failed to Create Leaderboard",
              text: err.message,
              iconPack: "mi",
              icon: "error",
              color: "danger"
            });
            reject(err);
          });
      });
    },

    updateLeaderboard(leaderboard) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(`${LEADERBOARD_MODULE_BASE}/${LEADERBOARD_UPDATE}`, {
            id: leaderboard.id,
            leaderboard
          })
          .then(res => {
            this.$vs.notify({
              title: "Leaderboard Updated",
              text: `Leaderboard ${res.name} has been updated successfully.`,
              iconPack: "mi",
              icon: "check_circle",
              color: "success"
            });
            resolve(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: "Failed to Update Leaderboard",
              text: err.message,
              iconPack: "mi",
              icon: "error",
              color: "danger"
            });
            reject(err);
          });
      });
    },

    deleteLeaderboard(id) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(`${LEADERBOARD_MODULE_BASE}/${LEADERBOARD_DELETE}`, id)
          .then(res => {
            this.$vs.notify({
              title: "Leaderboard Deleted",
              text: `Leaderboard ${res.name} has been deleted successfully.`,
              iconPack: "mi",
              icon: "check_circle",
              color: "success"
            });
            resolve(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: "Failed to Delete Leaderboard",
              text: err.message,
              iconPack: "mi",
              icon: "error",
              color: "danger"
            });
            reject(err);
          });
      });
    }
  }
};
</script>
