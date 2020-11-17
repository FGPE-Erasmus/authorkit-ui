<template>
  <add-update-file-sidebar
    :name="$t('GamificationLayer._Leaderboard')"
    :existing="!!leaderboard.id"
    :is-sidebar-active="isSidebarActive"
    @submit="$emit('submit', leaderboardDto)"
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
              v-model="leaderboard.name"
              :label-placeholder="$t('GamificationLayer.Leaderboard.Name')"
              class="w-full"
            />
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mt-2 mb-2">
          <vs-checkbox
            name="groups"
            v-model="leaderboard.groups"
            class="w-full"
            icon-pack="mi md-16"
          >
            {{ $t("GamificationLayer.Leaderboard.GroupScope") }}
          </vs-checkbox>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="metrics"
            rules=""
            v-slot="{ errors }"
            persist
          >
            <multi-row-input
              :label="$t('GamificationLayer.Leaderboard.Metrics')"
              name="metrics"
              v-model="metrics"
              :empty-line="{ metric: '', sorting_order: 'ASC' }"
              :empty-check="l => !l.metric || !l.sorting_order"
              v-slot:default="{ line }"
            >
              <div class="flex">
                <div class="w-1/2 pr-1">
                  <vs-input
                    name="metric"
                    v-model="line.metric"
                    :placeholder="$t('GamificationLayer.Leaderboard.Metric')"
                    class="w-full"
                  />
                </div>
                <div class="w-1/2">
                  <fgpe-select
                    name="sorting_order"
                    v-model="line.sorting_order"
                    class="w-full select-large"
                    :placeholder="
                      $t('GamificationLayer.Leaderboard.SortingOrder')
                    "
                    :options="sorting_orders_choices"
                    :clearable="false"
                    :searchable="false"
                  >
                    <template slot="option" slot-scope="option">
                      <div class="d-center">
                        {{
                          $t(
                            "GamificationLayer.Leaderboard.SortingOrders." +
                              option.label
                          )
                        }}
                      </div>
                    </template>
                    <template slot="selected-option" slot-scope="option">
                      <div class="selected d-center">
                        {{
                          $t(
                            "GamificationLayer.Leaderboard.SortingOrders." +
                              option.label
                          )
                        }}
                      </div>
                    </template>
                  </fgpe-select>
                </div>
              </div>
            </multi-row-input>
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

import FgpeSelect from "@/components/FgpeSelect";
import MultiRowInput from "@/components/MultiRowInput";
import AddUpdateFileSidebar from "@/components/sidebar-form/AddUpdateFileSidebar";

export default {
  name: "leaderboard-sidebar",
  components: {
    ValidationProvider,
    "fgpe-select": FgpeSelect,
    "multi-row-input": MultiRowInput,
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
    this.leaderboard = JSON.parse(JSON.stringify(this.empty));
  },
  data() {
    return {
      empty: {
        name: "",
        groups: false,
        metrics: [],
        sorting_orders: []
      },
      leaderboard: undefined,
      sorting_orders_choices: ["ASC", "DESC"],
      metrics: []
    };
  },
  watch: {
    isSidebarActive(val) {
      if (!val) {
        this.reward = JSON.parse(JSON.stringify(this.empty));
      }
    },
    item(val) {
      if (!val || !val.id) {
        this.leaderboard = JSON.parse(JSON.stringify(this.empty));
      } else {
        this.leaderboard = JSON.parse(JSON.stringify(val));
      }
      this.$set(
        this,
        "metrics",
        this.leaderboard.metrics.map((m, i) => ({
          metric: m,
          sorting_order: this.leaderboard.sorting_orders[i]
        }))
      );
    },
    metrics(val) {
      this.leaderboard.metrics.splice(0, this.leaderboard.metrics.length);
      this.leaderboard.metrics.push(...val.map(m => m.metric));
      this.leaderboard.sorting_orders.splice(
        0,
        this.leaderboard.sorting_orders.length
      );
      this.leaderboard.sorting_orders.push(...val.map(m => m.sorting_order));
    }
  },
  computed: {
    leaderboardDto() {
      return {
        id: this.leaderboard.id,
        challenge_id: this.parentChallengeId || this.leaderboard.challenge_id,
        gl_id: this.gamificationLayerId,
        name: this.leaderboard.name,
        groups: this.leaderboard.groups,
        metrics: this.leaderboard.metrics,
        sorting_orders: this.leaderboard.sorting_orders
      };
    }
  },
  methods: {}
};
</script>
