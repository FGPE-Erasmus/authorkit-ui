<template>
  <form>
    <challenge-sidebar
      :project-id="projectId"
      :gamification-layer-id="gamificationLayerId"
      :parent-challenge-id="parentChallengeId"
      :is-sidebar-active="isChallengeSidebarActive"
      :item="challenge"
      @submit="saveChallenge"
      @close-sidebar="isChallengeSidebarActive = false"
    />
    <reward-sidebar
      :project-id="projectId"
      :gamification-layer-id="gamificationLayerId"
      :parent-challenge-id="parentChallengeId"
      :is-sidebar-active="isRewardSidebarActive"
      :item="reward"
      @submit="saveReward"
      @close-sidebar="isRewardSidebarActive = false"
    />
    <rule-sidebar
      :project-id="projectId"
      :gamification-layer-id="gamificationLayerId"
      :parent-challenge-id="parentChallengeId"
      :is-sidebar-active="isRuleSidebarActive"
      :item="rule"
      @submit="saveRule"
      @close-sidebar="isRuleSidebarActive = false"
    />
    <leaderboard-sidebar
      :project-id="projectId"
      :gamification-layer-id="gamificationLayerId"
      :parent-challenge-id="parentChallengeId"
      :is-sidebar-active="isLeaderboardSidebarActive"
      :item="leaderboard"
      @submit="saveLeaderboard"
      @close-sidebar="isLeaderboardSidebarActive = false"
    />
    <div class="vx-row">
      <div class="vx-col w-full mb-2">
        <fgpe-tree
          :label="$t('GamificationLayer.Challenges')"
          ref="challenge-tree"
          :value="challengeTree"
          :options="challengeTreeOpts"
          @create-node="onCreate()"
        >
          <template v-slot:node="{ node }">
            <fgpe-tree-node
              :value="node"
              @create-node="onCreate"
              @update-node="onUpdate"
              @delete-node="onDelete"
              :supports-children="
                ['challenges', 'leaderboards', 'rewards', 'rules'].includes(
                  node.data.nodeType
                )
              "
              :editable="
                ['challenge', 'leaderboard', 'reward', 'rule'].includes(
                  node.data.nodeType
                )
              "
              :removable="
                ['challenge', 'leaderboard', 'reward', 'rule'].includes(
                  node.data.nodeType
                )
              "
            />
          </template>
        </fgpe-tree>
      </div>
    </div>
  </form>
</template>

<script>
import FgpeTree from "@/components/fgpe-tree/FgpeTree";
import FgpeTreeNode from "@/components/fgpe-tree/FgpeTreeNode";

import ChallengeSidebar from "./ChallengeSidebar";
import LeaderboardSidebar from "./LeaderboardSidebar";
import RewardSidebar from "./RewardSidebar";
import RuleSidebar from "./RuleSidebar";

import {
  MODULE_BASE as CHALLENGE_MODULE_BASE,
  CHALLENGE_CREATE,
  CHALLENGE_UPDATE,
  CHALLENGE_DELETE,
  CHALLENGE_LIST
} from "@/store/challenges/challenge.constants";

import {
  MODULE_BASE as REWARD_MODULE_BASE,
  REWARD_CREATE,
  REWARD_UPDATE,
  REWARD_DELETE
} from "@/store/rewards/reward.constants";

import {
  MODULE_BASE as RULE_MODULE_BASE,
  RULE_CREATE,
  RULE_UPDATE,
  RULE_DELETE
} from "@/store/rules/rule.constants";

import {
  MODULE_BASE as LEADERBOARD_MODULE_BASE,
  LEADERBOARD_CREATE,
  LEADERBOARD_UPDATE,
  LEADERBOARD_DELETE
} from "@/store/leaderboards/leaderboard.constants";

export default {
  name: "gamification-layer-challenges-step",
  components: {
    "fgpe-tree": FgpeTree,
    "fgpe-tree-node": FgpeTreeNode,
    "challenge-sidebar": ChallengeSidebar,
    "leaderboard-sidebar": LeaderboardSidebar,
    "reward-sidebar": RewardSidebar,
    "rule-sidebar": RuleSidebar
  },
  props: {
    projectId: String,
    gamificationLayerId: String,
    value: {
      type: Object
    }
  },
  computed: {
    challengeTree() {
      const challengesById = {};
      this.challenges.forEach(challenge => {
        challengesById[challenge.id] = this.transformChallengeIntoNode(
          challenge
        );
      });
      const roots = [];
      Object.keys(challengesById).forEach(id => {
        const challenge = challengesById[id];
        if (challenge.data.parent_challenge_id !== null) {
          challengesById[
            challenge.data.parent_challenge_id
          ].children[3].children.push(challenge);
        } else {
          roots.push(challenge);
        }
      });
      return roots;
    },
    rewardTree() {
      return [];
    },
    rulesTree() {
      return this.value.rules.map(rule => ({
        id: rule.id,
        text: "rule",
        data: {
          ...rule
        },
        state: {
          editable: false,
          draggable: false,
          droppable: true
        },
        children: []
      }));
    }
  },
  data() {
    return {
      challenges: [],

      challengeTreeOpts: {},

      parentChallengeId: undefined,

      isChallengeSidebarActive: false,
      challenge: undefined,

      isRewardSidebarActive: false,
      reward: undefined,

      isRuleSidebarActive: false,
      rule: undefined,

      isLeaderboardSidebarActive: false,
      leaderboard: undefined
    };
  },
  watch: {
    gamificationLayerId(val) {
      if (val) {
        this.refreshChallenges();
      }
    }
  },
  methods: {
    refreshChallenges() {
      this.$store
        .dispatch(`${CHALLENGE_MODULE_BASE}/${CHALLENGE_LIST}`, {
          filter: [`gl_id||eq||${this.gamificationLayerId}`],
          join: ["leaderboards", "rewards", "rules"]
        })
        .then(res => {
          this.challenges.splice(0, this.challenges.length);
          this.challenges.push(...res);
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to get challenges",
            text: err.message,
            iconPack: "feather",
            icon: "icon-x-circle",
            color: "danger"
          });
        });
    },

    transformChallengeIntoNode(challenge) {
      const node = {
        id: challenge.id,
        text: challenge.name,
        data: {
          nodeType: "challenge",
          gl_id: challenge.gl_id,
          id: challenge.id,
          name: challenge.name,
          description: challenge.description,
          mode: challenge.mode,
          mode_parameters: challenge.mode_parameters,
          locked: challenge.locked,
          hidden: challenge.hidden,
          difficulty: challenge.difficulty,
          parent_challenge_id: challenge.parent_challenge_id,
          exercises: challenge.exercise_ids
        },
        children: [
          {
            text: "Rules",
            data: { nodeType: "rules", challenge_id: challenge.id },
            children: [
              ...challenge.rules.map(rule => this.transformRuleIntoNode(rule))
            ]
          },
          {
            text: "Rewards",
            data: { nodeType: "rewards", challenge_id: challenge.id },
            children: [
              ...challenge.rewards.map(reward =>
                this.transformRewardIntoNode(reward)
              )
            ]
          },
          {
            text: "Leaderboards",
            data: { nodeType: "leaderboards", challenge_id: challenge.id },
            children: [
              ...challenge.leaderboards.map(leaderboard =>
                this.transformLeaderboardIntoNode(leaderboard)
              )
            ]
          },
          {
            text: "Challenges",
            data: { nodeType: "challenges", challenge_id: challenge.id },
            children: []
          }
        ]
      };
      return node;
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

    transformRuleIntoNode(rule) {
      const node = {
        id: rule.id,
        text: rule.name,
        data: {
          nodeType: "rule",
          ...rule,
          revealable_exercises: rule.revealable_exercise_ids,
          revealable_challenges: rule.revealable_challenge_ids,
          unlockable_exercises: rule.unlockable_exercise_ids,
          unlockable_challenges: rule.unlockable_challenge_ids
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

    challengeTreeDragStart(node) {
      console.log(node);
    },
    challengeTreeDragFinish(node) {
      console.log(node);
    },

    /* lifecycle */

    onCreate(id, data) {
      console.log(`Creating on ... ${id} ... ${data}`);
      if (!data) {
        this.activateChallengeSidebar();
        return;
      }
      if (data.nodeType === "challenge") {
        this.parentChallengeId = data.parent_challenge_id;
        this.activateChallengeSidebar(data);
      } else if (data.nodeType === "challenges") {
        this.parentChallengeId = data.challenge_id;
        this.activateChallengeSidebar(data);
      } else if (
        data.nodeType === "leaderboard" ||
        data.nodeType === "leaderboards"
      ) {
        this.parentChallengeId = data.challenge_id;
        this.activateLeaderboardSidebar(data);
      } else if (data.nodeType === "reward" || data.nodeType === "rewards") {
        this.parentChallengeId = data.challenge_id;
        this.activateRewardSidebar(data);
      } else if (data.nodeType === "rule" || data.nodeType === "rules") {
        this.parentChallengeId = data.challenge_id;
        this.activateRuleSidebar(data);
      }
    },

    onUpdate(id, data) {
      if (data.nodeType === "challenge") {
        this.parentChallengeId = data.parent_challenge_id;
        this.activateChallengeSidebar(data);
      } else if (data.nodeType === "leaderboard") {
        this.parentChallengeId = data.challenge_id;
        this.activateLeaderboardSidebar(data);
      } else if (data.nodeType === "reward") {
        this.parentChallengeId = data.challenge_id;
        this.activateRewardSidebar(data);
      } else if (data.nodeType === "rule") {
        this.parentChallengeId = data.challenge_id;
        this.activateRuleSidebar(data);
      }
    },

    async onDelete(id, data) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: this.$t("Dialogs.ConfirmDelete.Title", {
          item: this.$t(
            "GamificationLayer._" +
              data.nodeType.charAt(0).toUpperCase() +
              data.nodeType.slice(1)
          )
        }),
        text: this.$t("Dialogs.ConfirmDelete.Message", {
          item: data.name
        }),
        "accept-text": this.$t("Form.Delete"),
        "cancel-text": this.$t("Form.Cancel"),
        accept: async () => {
          if (data.nodeType === "challenge") {
            await this.deleteChallenge(id);
          } else if (data.nodeType === "leaderboard") {
            await this.deleteLeaderboard(id);
          } else if (data.nodeType === "reward") {
            await this.deleteReward(id);
          } else if (data.nodeType === "rule") {
            await this.deleteRule(id);
          }
          this.refreshChallenges();
        }
      });
    },

    /** Sidebar */

    activateChallengeSidebar(challenge) {
      this.challenge = challenge;
      this.isChallengeSidebarActive = true;
    },

    async saveChallenge(challenge) {
      if (challenge && challenge.id) {
        await this.updateChallenge(challenge);
      } else {
        await this.createChallenge(challenge);
      }
      this.isChallengeSidebarActive = false;
      this.refreshChallenges();
    },

    createChallenge(challenge) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(`${CHALLENGE_MODULE_BASE}/${CHALLENGE_CREATE}`, challenge)
          .then(res => {
            this.$vs.notify({
              title: "Challenge Created",
              text: `Challenge ${res.name} has been created successfully.`,
              iconPack: "mi",
              icon: "check_circle",
              color: "success"
            });
            resolve(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: "Failed to Create Exercise",
              text: err.message,
              iconPack: "feather",
              icon: "icon-x-circle",
              color: "danger"
            });
            reject(err);
          });
      });
    },

    updateChallenge(challenge) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(`${CHALLENGE_MODULE_BASE}/${CHALLENGE_UPDATE}`, {
            id: challenge.id,
            challenge
          })
          .then(res => {
            this.$vs.notify({
              title: "Challenge Updated",
              text: `Challenge ${res.name} has been updated successfully.`,
              iconPack: "mi",
              icon: "check_circle",
              color: "success"
            });
            resolve(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: "Failed to Update Challenge",
              text: err.message,
              iconPack: "feather",
              icon: "icon-x-circle",
              color: "danger"
            });
            reject(err);
          });
      });
    },

    deleteChallenge(id) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(`${CHALLENGE_MODULE_BASE}/${CHALLENGE_DELETE}`, id)
          .then(res => {
            this.$vs.notify({
              title: "Challenge Deleted",
              text: `Challenge ${res.name} has been deleted successfully.`,
              iconPack: "mi",
              icon: "check_circle",
              color: "success"
            });
            resolve(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: "Failed to Delete Challenge",
              text: err.message,
              iconPack: "feather",
              icon: "icon-x-circle",
              color: "danger"
            });
            reject(err);
          });
      });
    },

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
      this.refreshChallenges();
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
              iconPack: "feather",
              icon: "icon-x-circle",
              color: "danger"
            });
            reject(err);
          });
      });
    },

    updateLeaderboard(leaderboard) {
      console.log(leaderboard);
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
              iconPack: "feather",
              icon: "icon-x-circle",
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
              iconPack: "feather",
              icon: "icon-x-circle",
              color: "danger"
            });
            reject(err);
          });
      });
    },

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
      this.refreshChallenges();
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
              iconPack: "feather",
              icon: "icon-x-circle",
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
              iconPack: "feather",
              icon: "icon-x-circle",
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
              iconPack: "feather",
              icon: "icon-x-circle",
              color: "danger"
            });
            reject(err);
          });
      });
    },

    activateRuleSidebar(rule) {
      this.rule = rule;
      this.isRuleSidebarActive = true;
    },

    async saveRule(rule) {
      if (rule && rule.id) {
        await this.updateRule(rule);
      } else {
        await this.createRule(rule);
      }
      this.isRuleSidebarActive = false;
      this.refreshChallenges();
    },

    createRule(rule) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(`${RULE_MODULE_BASE}/${RULE_CREATE}`, rule)
          .then(res => {
            this.$vs.notify({
              title: "Rule Created",
              text: `Rule ${res.name} has been created successfully.`,
              iconPack: "mi",
              icon: "check_circle",
              color: "success"
            });
            resolve(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: "Failed to Create Rule",
              text: err.message,
              iconPack: "feather",
              icon: "icon-x-circle",
              color: "danger"
            });
            reject(err);
          });
      });
    },

    updateRule(rule) {
      console.log(rule);
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(`${RULE_MODULE_BASE}/${RULE_UPDATE}`, {
            id: rule.id,
            rule
          })
          .then(res => {
            this.$vs.notify({
              title: "Rule Updated",
              text: `Rule ${res.name} has been updated successfully.`,
              iconPack: "mi",
              icon: "check_circle",
              color: "success"
            });
            resolve(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: "Failed to Update Rule",
              text: err.message,
              iconPack: "feather",
              icon: "icon-x-circle",
              color: "danger"
            });
            reject(err);
          });
      });
    },

    deleteRule(id) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(`${RULE_MODULE_BASE}/${RULE_DELETE}`, id)
          .then(res => {
            this.$vs.notify({
              title: "Rule Deleted",
              text: `Rule ${res.name} has been deleted successfully.`,
              iconPack: "mi",
              icon: "check_circle",
              color: "success"
            });
            resolve(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: "Failed to Delete Rule",
              text: err.message,
              iconPack: "feather",
              icon: "icon-x-circle",
              color: "danger"
            });
            reject(err);
          });
      });
    }
  }
};
</script>
