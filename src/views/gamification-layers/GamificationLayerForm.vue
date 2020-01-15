<template>
  <fgpe-card id="gamification-layer-form">
    <form-wizard
      ref="gamification-layer-wizard"
      color="rgba(var(--vs-primary), 1)"
      errorColor="rgba(var(--vs-danger), 1)"
      :title="null"
      :subtitle="null"
      finishButtonText="Submit"
      @on-change="handleTabChange"
    >
      <tab-content
        :title="$t('GamificationLayer.Form.Metadata')"
        class="mb-5"
        icon="mi label"
        :before-change="submitMetadata"
      >
        <ValidationObserver ref="metadata-observer">
          <gamification-layer-metadata-step v-model="metadata" />
        </ValidationObserver>
      </tab-content>

      <tab-content
        :title="$t('GamificationLayer.Rewards')"
        class="mb-5"
        icon="mi stars"
      >
        <gamification-layer-rewards-step
          ref="rewards-step"
          :project-id="projectId"
          :gamification-layer-id="gamificationLayerId"
        />
      </tab-content>

      <tab-content
        :title="$t('GamificationLayer.Rules')"
        class="mb-5"
        icon="mi alarm"
      >
        <gamification-layer-rules-step
          ref="rules-step"
          :project-id="projectId"
          :gamification-layer-id="gamificationLayerId"
        />
      </tab-content>

      <tab-content
        :title="$t('GamificationLayer.Leaderboards')"
        class="mb-5"
        icon="mi format_list_numbered"
      >
        <gamification-layer-leaderboards-step
          ref="leaderboards-step"
          :project-id="projectId"
          :gamification-layer-id="gamificationLayerId"
        />
      </tab-content>

      <tab-content
        :title="$t('GamificationLayer.Challenges')"
        class="mb-5"
        icon="mi casino"
      >
        <gamification-layer-challenges-step
          ref="challenges-step"
          :project-id="projectId"
          :gamification-layer-id="gamificationLayerId"
        />
      </tab-content>

      <template slot="footer" slot-scope="props">
        <div class="wizard-footer-left">
          <wizard-button
            v-if="props.activeTabIndex > 0"
            @click.native="props.prevTab()"
            class="vs-button vs-button-primary"
            :style="props.fillButtonStyle"
          >
            {{ $t("Form.Previous") }}
          </wizard-button>
        </div>
        <div class="wizard-footer-right">
          <wizard-button
            v-if="!props.isLastStep"
            @click.native="props.nextTab()"
            class="wizard-footer-right vs-button vs-button-primary vs-button-filled"
            :style="props.fillButtonStyle"
          >
            {{ $t("Form.Next") }}
          </wizard-button>
          <wizard-button
            v-else
            @click.native="
              $router.push(`/projects/${projectId}/gamification-layers`)
            "
            class="wizard-footer-right vs-button vs-button-primary vs-button-filled finish-button"
            :style="props.fillButtonStyle"
          >
            {{ $t("Form.Done") }}
          </wizard-button>
        </div>
      </template>
    </form-wizard>
  </fgpe-card>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { FormWizard, TabContent, WizardButton } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

import {
  MODULE_BASE,
  GAMIFICATION_LAYER_CREATE,
  GAMIFICATION_LAYER_UPDATE,
  GAMIFICATION_LAYER_GET
} from "@/store/gamification-layers/gamification-layer.constants";

import MetadataStep from "./form/MetadataStep";
import ChallengesStep from "./form/ChallengesStep";
import RewardsStep from "./form/RewardsStep";
import RulesStep from "./form/RulesStep";
import LeaderboardsStep from "./form/LeaderboardsStep";

export default {
  props: {},
  components: {
    ValidationObserver,
    FormWizard,
    TabContent,
    WizardButton,
    "gamification-layer-metadata-step": MetadataStep,
    "gamification-layer-challenges-step": ChallengesStep,
    "gamification-layer-rewards-step": RewardsStep,
    "gamification-layer-rules-step": RulesStep,
    "gamification-layer-leaderboards-step": LeaderboardsStep
  },
  data() {
    return {
      empty: {
        ...this.emptyMetadata
      },
      emptyMetadata: {
        name: "",
        description: "",
        keywords: [],
        status: ""
      },
      id: undefined,
      metadata: undefined,
      changed: false
    };
  },
  computed: {
    gamificationLayerId() {
      return this.id || this.$route.params.id;
    },
    projectId() {
      return (
        (this.metadata && this.metadata.project_id) ||
        this.$route.params.project_id
      );
    },
    isNew() {
      return (
        this.gamificationLayerId &&
        this.gamificationLayerId.toLowerCase() === "new"
      );
    }
  },
  created() {
    this.metadata = Object.assign({}, this.emptyMetadata);
  },

  mounted() {
    this.$refs["gamification-layer-wizard"].reset();
    if (!this.isNew) {
      this.getGamificationLayer(this.$route.params.id);
      /* this.getChallenges(this.$route.params.id); */
      /* this.getRewards(this.$route.params.id);
      this.getRules(this.$route.params.id);
      this.geLeaderboards(this.$route.params.id); */
    } else {
      this.metadata = Object.assign({}, this.emptyMetadata);
    }
    this.$nextTick(() => {
      this.changed = false;
    });
  },
  watch: {
    metadata: {
      handler() {
        this.changed = true;
      },
      deep: true
    }
  },

  methods: {
    getGamificationLayer(id) {
      this.$store
        .dispatch(`${MODULE_BASE}/${GAMIFICATION_LAYER_GET}`, id)
        .then(res => {
          this.unwrap(res);
          this.$refs["gamification-layer-wizard"].activateAll();
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to get gamification layers",
            text: err.message,
            iconPack: "feather",
            icon: "icon-x-circle",
            color: "danger"
          });
        });
    },

    unwrap(gamificationLayer) {
      this.id = gamificationLayer.id;
      this.metadata = {
        name: gamificationLayer.name,
        description: gamificationLayer.description,
        keywords: gamificationLayer.keywords,
        status: gamificationLayer.status
      };
      this.$nextTick(() => {
        this.changed = false;
      });
    },

    handleTabChange(prevIndex, nextIndex) {
      if (nextIndex === 1) {
        this.$refs["rewards-step"].refreshRewards();
      } else if (nextIndex === 2) {
        this.$refs["rules-step"].refreshRules();
      } else if (nextIndex === 3) {
        this.$refs["leaderboards-step"].refreshLeaderboards();
      } else if (nextIndex === 4) {
        this.$refs["challenges-step"].refreshChallenges();
      }
    },

    async submitMetadata() {
      if (!this.changed) {
        return true;
      }
      const result = await this.validateStepMetadata();
      if (result) {
        if (this.isNew) {
          let failed = false;
          const gamificationLayer = await this.create().catch(
            () => (failed = true)
          );
          if (failed) {
            return false;
          }
          this.id = gamificationLayer.id;
          this.changed = false;
          return true;
        } else {
          let failed = false;
          await this.update().catch(() => (failed = true));
          if (failed) {
            return false;
          }
          this.changed = false;
          return true;
        }
      }
    },

    validateStepMetadata() {
      return this.$refs["metadata-observer"].validate();
    },

    create() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(
            `${MODULE_BASE}/${GAMIFICATION_LAYER_CREATE}`,
            Object.assign({ project_id: this.projectId }, this.metadata)
          )
          .then(res => {
            this.$vs.notify({
              title: "Gamification layer created",
              text: `Gamification layer ${res.name} has been created successfully.`,
              iconPack: "mi",
              icon: "check_circle",
              color: "success"
            });
            resolve(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: "Failed to create gamification layer",
              text: err.message,
              iconPack: "feather",
              icon: "icon-x-circle",
              color: "danger"
            });
            reject(err);
          });
      });
    },
    update() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(`${MODULE_BASE}/${GAMIFICATION_LAYER_UPDATE}`, {
            id: this.gamificationLayerId,
            gamification_layer: Object.assign(
              { project_id: this.projectId },
              this.metadata
            )
          })
          .then(res => {
            this.$vs.notify({
              title: "Gamification layer updated",
              text: `Gamification layer ${res.name} has been updated successfully.`,
              iconPack: "mi",
              icon: "check_circle",
              color: "success"
            });
            resolve(res);
          })
          .catch(err => {
            this.$vs.notify({
              title: "Failed to update gamification layer",
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
