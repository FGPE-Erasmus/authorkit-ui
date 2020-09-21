<template>
  <form>
    <rule-sidebar
      :project-id="projectId"
      :gamification-layer-id="gamificationLayerId"
      :is-sidebar-active="isRuleSidebarActive"
      :item="rule"
      @submit="saveRule"
      @close-sidebar="
        isRuleSidebarActive = false;
        rule = undefined;
      "
    />
    <div class="vx-row">
      <div class="vx-col w-full mb-2">
        <fgpe-tree
          :label="$t('GamificationLayer.Rules')"
          ref="rule-tree"
          :value="ruleTree"
          :options="ruleTreeOpts"
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

import RuleSidebar from "./RuleSidebar";

import {
  MODULE_BASE as RULE_MODULE_BASE,
  RULE_CREATE,
  RULE_UPDATE,
  RULE_DELETE,
  RULE_LIST
} from "@/store/rules/rule.constants";

export default {
  name: "gamification-layer-rules-step",
  components: {
    "fgpe-tree": FgpeTree,
    "fgpe-tree-node": FgpeTreeNode,
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
    ...mapState("permission", {
      permissions: "permissions"
    }),
    ruleTree() {
      return this.rules
        .filter(rule => !rule.challenge_id)
        .map(this.transformRuleIntoNode);
    }
  },
  data() {
    return {
      rules: [],

      ruleTreeOpts: {},

      isRuleSidebarActive: false,
      rule: undefined
    };
  },
  watch: {
    gamificationLayerId(val) {
      if (val) {
        this.refreshRules();
      }
    }
  },
  methods: {
    refreshRules() {
      this.$store
        .dispatch(`${RULE_MODULE_BASE}/${RULE_LIST}`, {
          filter: [`gl_id||eq||${this.gamificationLayerId}`]
        })
        .then(res => {
          this.rules.splice(0, this.rules.length);
          this.rules.push(...res);
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to get rules",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
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

    /* lifecycle */

    onCreate(id, data) {
      this.activateRuleSidebar(data);
    },

    onUpdate(id, data) {
      this.activateRuleSidebar(data);
    },

    async onDelete(id, data) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: this.$t("Dialogs.ConfirmDelete.Title", {
          item: this.$t("GamificationLayer._Rule")
        }),
        text: this.$t("Dialogs.ConfirmDelete.Message", {
          item: data.name
        }),
        "accept-text": this.$t("Form.Delete"),
        "cancel-text": this.$t("Form.Cancel"),
        accept: async () => {
          await this.deleteRule(id);
          this.refreshRules();
        }
      });
    },

    /** Sidebar */

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
      this.refreshRules();
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
              iconPack: "mi",
              icon: "error",
              color: "danger"
            });
            reject(err);
          });
      });
    },

    updateRule(rule) {
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
              iconPack: "mi",
              icon: "error",
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
