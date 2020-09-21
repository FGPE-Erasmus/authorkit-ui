<template>
  <add-update-file-sidebar
    :name="$t('GamificationLayer._Reward')"
    :existing="!!reward.id"
    :is-sidebar-active="isSidebarActive"
    @submit="$emit('submit', rewardDto)"
    @close-sidebar="$emit('close-sidebar')"
  >
    <template v-slot:form>
      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="name"
            rules="required|max:150"
            v-slot="{ errors }"
            persist
          >
            <vs-input
              name="name"
              v-model="reward.name"
              :label-placeholder="$t('GamificationLayer.Reward.Name')"
              class="w-full"
            />
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="description"
            rules="max:500"
            v-slot="{ errors }"
            persist
          >
            <vs-textarea
              :label="$t('GamificationLayer.Reward.Description')"
              name="description"
              v-model="reward.description"
              :class="{
                hasValue: !!reward.description
              }"
              class="mt-5 w-full"
            />
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="kind"
            rules="required"
            v-slot="{ errors }"
            persist
          >
            <fgpe-select
              name="kind"
              v-model="reward.kind"
              class="mt-5 w-full select-large"
              :label-placeholder="$t('GamificationLayer.Reward.Kind')"
              :options="kind_choices"
              :clearable="false"
              :searchable="false"
            >
              <template slot="option" slot-scope="option">
                <div class="d-center">
                  {{ $t("GamificationLayer.Reward.Kinds." + option.label) }}
                </div>
              </template>
              <template slot="selected-option" slot-scope="option">
                <div class="selected d-center">
                  {{ $t("GamificationLayer.Reward.Kinds." + option.label) }}
                </div>
              </template>
            </fgpe-select>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mt-2 mb-2">
          <vs-checkbox
            name="recurrent"
            v-model="reward.recurrent"
            class="w-full"
            icon-pack="mi md-16"
          >
            {{ $t("GamificationLayer.Reward.Recurrent") }}
          </vs-checkbox>
        </div>
      </div>

      <div v-if="canLinkImage" class="vx-row">
        <div class="vx-col w-full mt-2 mb-2">
          <fgpe-image-upload name="image" v-model="reward.image" />
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mt-2 mb-4">
          <ValidationProvider
            name="cost"
            rules="required"
            v-slot="{ errors }"
            persist
          >
            <label class="fgpe-label">
              {{ $t("GamificationLayer.Reward.Cost") }}
            </label>
            <vs-checkbox
              name="purchasable"
              class="w-full mt-2 mb-2"
              icon-pack="mi md-16"
              :value="reward.cost > 0"
              @input="onPurchasable"
            >
              {{ $t("GamificationLayer.Reward.Purchasable") }}
            </vs-checkbox>
            <vs-input-number
              v-if="reward.cost > 0"
              name="cost"
              v-model.number="reward.cost"
              :min="1"
              :step="1"
              size="medium"
              icon-pack="mi"
            />
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row" v-if="reward.kind === 'POINT'">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="amount"
            rules="required"
            v-slot="{ errors }"
            persist
          >
            <label class="fgpe-label">
              {{ $t("GamificationLayer.Reward.Amount") }}
            </label>
            <vs-input-number
              name="amount"
              v-model.number="reward.amount"
              :step="1"
              size="medium"
              icon-pack="mi"
            />
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div
        class="vx-row"
        v-if="reward.kind === 'HINT' || reward.kind === 'MESSAGE'"
      >
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="message"
            rules="required|minLength:1"
            v-slot="{ errors }"
            persist
          >
            <vs-textarea
              :label="$t('GamificationLayer.Reward.Message')"
              name="message"
              v-model="reward.message"
              :class="{
                hasValue: !!reward.message
              }"
              class="w-full"
            />
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div
        class="vx-row"
        v-if="
          reward.kind === 'HINT' ||
            reward.kind === 'REVEAL' ||
            reward.kind === 'UNLOCK'
        "
      >
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="challenges"
            rules=""
            v-slot="{ errors }"
            persist
          >
            <fgpe-select
              name="challenges"
              v-model="reward.challenges"
              class="mt-5 w-full select-large"
              :label-placeholder="$t('GamificationLayer.Reward.Challenges')"
              :options="challenges"
              :clearable="false"
              :searchable="false"
              :multiple="true"
              :reduce="option => option.id"
              :picker-threshold="1"
            >
            </fgpe-select>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>
    </template>
  </add-update-file-sidebar>
</template>

<script>
import { ValidationProvider } from "vee-validate";

import FgpeImageUpload from "@/components/FgpeImageUpload";
import FgpeSelect from "@/components/FgpeSelect";
import AddUpdateFileSidebar from "@/components/sidebar-form/AddUpdateFileSidebar";

import {
  MODULE_BASE as CHALLENGE_MODULE_BASE,
  CHALLENGE_LIST
} from "@/store/challenges/challenge.constants";

export default {
  name: "reward-sidebar",
  components: {
    ValidationProvider,
    "fgpe-image-upload": FgpeImageUpload,
    "fgpe-select": FgpeSelect,
    "add-update-file-sidebar": AddUpdateFileSidebar
  },
  props: {
    projectId: String,
    gamificationLayerId: String,
    parentChallengeId: String,
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    item: Object
  },
  created() {
    this.reward = JSON.parse(JSON.stringify(this.empty));
  },
  data() {
    return {
      pickerActive: false,
      empty: {
        name: "",
        description: "",
        kind: "POINT",
        image: null,
        recurrent: true,
        cost: 0,
        amount: 0,
        challenges: [],
        message: ""
      },
      reward: undefined,
      kind_choices: [
        "POINT",
        "BADGE",
        "VIRTUAL_ITEM",
        "COUPON",
        "REVEAL",
        "UNLOCK",
        "HINT",
        "MESSAGE"
      ],

      challenges: []
    };
  },
  watch: {
    isSidebarActive(val) {
      if (val) {
        this.getChallenges();
      } else {
        this.reward = JSON.parse(JSON.stringify(this.empty));
      }
    },
    item(val) {
      if (!val || !val.id) {
        this.reward = JSON.parse(JSON.stringify(this.empty));
      } else {
        this.reward = JSON.parse(JSON.stringify(val));
      }
    }
  },
  computed: {
    rewardDto() {
      const dto = {
        id: this.reward.id,
        challenge_id: this.parentChallengeId || this.reward.challenge_id,
        gl_id: this.gamificationLayerId,
        name: this.reward.name,
        description: this.reward.description,
        kind: this.reward.kind,
        image: this.canLinkImage ? this.reward.image : null,
        recurrent: this.reward.recurrent,
        cost: this.reward.cost,
        challenges: [],
        message: "",
        amount: 0
      };
      if (this.reward.kind === "POINT") {
        dto.amount = this.reward.amount;
      } else if (
        this.reward.kind === "REVEAL" ||
        this.reward.kind === "UNLOCK" ||
        this.reward.kind === "HINT"
      ) {
        dto.challenges = this.reward.challenges.map(id => ({
          id
        }));
      } else if (
        this.reward.kind === "HINT" ||
        this.reward.kind === "MESSAGE"
      ) {
        dto.message = this.reward.message;
      }
      return dto;
    },

    canLinkImage() {
      return (
        ["BADGE", "VIRTUAL_ITEM", "COUPON", "MESSAGE", "HINT"].indexOf(
          this.reward.kind
        ) >= 0
      );
    }
  },

  methods: {
    getChallenges() {
      this.$store
        .dispatch(`${CHALLENGE_MODULE_BASE}/${CHALLENGE_LIST}`, {
          filter: [`gl_id||eq||${this.gamificationLayerId}`],
          select: ["id", "name"]
        })
        .then(res => {
          this.challenges = res.map(challenge => ({
            id: challenge.id,
            label: challenge.name
          }));
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to get challenges",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },

    onPurchasable(val) {
      if (val) {
        this.reward.cost = 1;
      } else {
        this.reward.cost = 0;
      }
    }
  }
};
</script>
