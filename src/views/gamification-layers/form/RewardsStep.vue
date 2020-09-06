<template>
  <form>
    <reward-sidebar
      :project-id="projectId"
      :gamification-layer-id="gamificationLayerId"
      :is-sidebar-active="isRewardSidebarActive"
      :item="reward"
      @submit="saveReward"
      @close-sidebar="
        isRewardSidebarActive = false;
        reward = undefined;
      "
    />
    <div class="vx-row">
      <div class="vx-col w-full mb-2">
        <fgpe-tree
          :label="$t('GamificationLayer.Rewards')"
          ref="reward-tree"
          :value="rewardTree"
          :options="rewardTreeOpts"
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

import RewardSidebar from "./RewardSidebar";

import {
  MODULE_BASE as REWARD_MODULE_BASE,
  REWARD_CREATE,
  REWARD_UPDATE,
  REWARD_DELETE,
  REWARD_LIST
} from "@/store/rewards/reward.constants";

export default {
  name: "gamification-layer-rewards-step",
  components: {
    "fgpe-tree": FgpeTree,
    "fgpe-tree-node": FgpeTreeNode,
    "reward-sidebar": RewardSidebar
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
    rewardTree() {
      return this.rewards
        .filter(reward => !reward.challenge_id)
        .map(this.transformRewardIntoNode);
    }
  },
  data() {
    return {
      rewards: [],

      rewardTreeOpts: {},

      isRewardSidebarActive: false,
      reward: undefined
    };
  },
  watch: {
    gamificationLayerId(val) {
      if (val) {
        this.refreshRewards();
      }
    }
  },
  methods: {
    refreshRewards() {
      this.$store
        .dispatch(`${REWARD_MODULE_BASE}/${REWARD_LIST}`, {
          filter: [`gl_id||eq||${this.gamificationLayerId}`]
        })
        .then(res => {
          this.rewards.splice(0, this.rewards.length);
          this.rewards.push(...res);
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to get rewards",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },

    transformRewardIntoNode(reward) {
      const node = {
        id: reward.id,
        text: reward.name,
        data: {
          nodeType: "reward",
          ...reward,
          revealable_exercises: reward.revealable_exercise_ids,
          revealable_challenges: reward.revealable_challenge_ids,
          unlockable_exercises: reward.unlockable_exercise_ids,
          unlockable_challenges: reward.unlockable_challenge_ids
        },
        state: {
          draggable: false,
          droppable: true
        },
        children: []
      };
      return node;
    },

    /* Dragging */

    rewardTreeDragStart(node) {
      console.log(node);
    },
    rewardTreeDragFinish(node) {
      console.log(node);
    },

    /* lifecycle */

    onCreate(id, data) {
      this.activateRewardSidebar(data);
    },

    onUpdate(id, data) {
      this.activateRewardSidebar(data);
    },

    async onDelete(id, data) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: this.$t("Dialogs.ConfirmDelete.Title", {
          item: this.$t("GamificationLayer._Reward")
        }),
        text: this.$t("Dialogs.ConfirmDelete.Message", {
          item: data.name
        }),
        "accept-text": this.$t("Form.Delete"),
        "cancel-text": this.$t("Form.Cancel"),
        accept: async () => {
          await this.deleteReward(id);
          this.refreshRewards();
        }
      });
    },

    /** Sidebar */

    activateRewardSidebar(reward) {
      this.reward = reward;
      this.isRewardSidebarActive = true;
    },

    async saveReward(reward) {
      if (reward && reward.id) {
        await this.updateReward(reward);
      } else {
        await this.createReward(reward);
      }
      this.isRewardSidebarActive = false;
      this.refreshRewards();
    },

    createReward(reward) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(`${REWARD_MODULE_BASE}/${REWARD_CREATE}`, reward)
          .then(res => {
            this.$vs.notify({
              title: "Reward Created",
              text: `Reward ${res.name} has been created successfully.`,
              iconPack: "mi",
              icon: "check_circle",
              color: "success"
            });
            resolve(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: "Failed to Create Reward",
              text: err.message,
              iconPack: "mi",
              icon: "error",
              color: "danger"
            });
            reject(err);
          });
      });
    },

    updateReward(reward) {
      console.log(reward);
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(`${REWARD_MODULE_BASE}/${REWARD_UPDATE}`, {
            id: reward.id,
            reward
          })
          .then(res => {
            this.$vs.notify({
              title: "Reward Updated",
              text: `Reward ${res.name} has been updated successfully.`,
              iconPack: "mi",
              icon: "check_circle",
              color: "success"
            });
            resolve(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: "Failed to Update Reward",
              text: err.message,
              iconPack: "mi",
              icon: "error",
              color: "danger"
            });
            reject(err);
          });
      });
    },

    deleteReward(id) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(`${REWARD_MODULE_BASE}/${REWARD_DELETE}`, id)
          .then(res => {
            this.$vs.notify({
              title: "Reward Deleted",
              text: `Reward ${res.name} has been deleted successfully.`,
              iconPack: "mi",
              icon: "check_circle",
              color: "success"
            });
            resolve(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: "Failed to Delete Reward",
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
