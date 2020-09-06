<template>
  <multi-row-input
    name="trigger"
    :label="$t('GamificationLayer.Triggers')"
    :value="triggers"
    @input="onChangeTriggers"
    :empty-line="empty"
    v-slot:default="{ line, index }"
  >
    <div class="block">
      <div class="w-full mb-2">
        <fgpe-select
          name="kind"
          v-model="line.kind"
          class="w-full select-large"
          :placeholder="$t('GamificationLayer.Trigger.Type')"
          :options="types"
          :clearable="false"
          :searchable="false"
          @input="line.event = events[$event.toLowerCase()][0]"
        >
          <template slot="option" slot-scope="option">
            <div class="d-center">
              {{ $t("GamificationLayer.Trigger.Types." + option.label) }}
            </div>
          </template>
          <template slot="selected-option" slot-scope="option">
            <div class="selected d-center">
              {{ $t("GamificationLayer.Trigger.Types." + option.label) }}
            </div>
          </template>
        </fgpe-select>
      </div>

      <div class="w-full mb-2">
        <fgpe-select
          name="event"
          v-model="line.event"
          class="w-full select-large"
          :placeholder="$t('GamificationLayer.Trigger.Event')"
          :options="line.kind ? events[line.kind.toLowerCase()] : events.time"
          :clearable="false"
          :searchable="false"
        >
          <template slot="option" slot-scope="option">
            <div class="d-center">
              {{ $t("GamificationLayer.Trigger.Events." + option.label) }}
            </div>
          </template>
          <template slot="selected-option" slot-scope="option">
            <div class="selected d-center">
              {{ $t("GamificationLayer.Trigger.Events." + option.label) }}
            </div>
          </template>
        </fgpe-select>
      </div>

      <div class="w-full mb-2">
        <vs-checkbox
          name="recurrent"
          v-model="line.recurrent"
          class="w-full"
          icon-pack="mi md-16"
        >
          {{ $t("GamificationLayer.Trigger.Recurrent") }}
        </vs-checkbox>
      </div>

      <div v-if="activeEventSources[index] === 'REWARD'" class="w-full mb-2">
        <ValidationProvider
          name="reward"
          rules="required"
          v-slot="{ errors }"
          persist
        >
          <fgpe-select
            name="reward"
            v-model="line.reward"
            class="w-full select-large"
            :placeholder="$t('GamificationLayer.Trigger.Reward')"
            :options="rewards"
            :clearable="false"
            :searchable="true"
            :reduce="option => option.id"
          >
            <template slot="option" slot-scope="option">
              <div class="d-center">
                {{ rewardsById[option.id] && rewardsById[option.id].label }}
              </div>
            </template>
            <template slot="selected-option" slot-scope="option">
              <div class="selected d-center">
                {{ rewardsById[option.id] && rewardsById[option.id].label }}
              </div>
            </template>
          </fgpe-select>
          <span v-show="errors[0]" class="text-danger text-sm">
            {{ errors[0] }}
          </span>
        </ValidationProvider>
      </div>

      <div v-if="activeEventSources[index] === 'CHALLENGE'" class="w-full mb-2">
        <ValidationProvider
          name="challenge"
          rules="required"
          v-slot="{ errors }"
          persist
        >
          <fgpe-select
            name="challenge"
            v-model="line.challenge"
            class="w-full select-large"
            :placeholder="$t('GamificationLayer.Trigger.Challenge')"
            :options="challenges"
            :clearable="false"
            :searchable="true"
            :reduce="option => option.id"
          >
            <template slot="option" slot-scope="option">
              <div class="d-center">
                {{
                  challengesById[option.id] && challengesById[option.id].label
                }}
              </div>
            </template>
            <template slot="selected-option" slot-scope="option">
              <div class="selected d-center">
                {{
                  challengesById[option.id] && challengesById[option.id].label
                }}
              </div>
            </template>
          </fgpe-select>
          <span v-show="errors[0]" class="text-danger text-sm">
            {{ errors[0] }}
          </span>
        </ValidationProvider>
      </div>

      <div v-if="activeEventSources[index] === 'EXERCISE'" class="w-full mb-2">
        <ValidationProvider
          name="exercise"
          rules="required"
          v-slot="{ errors }"
          persist
        >
          <fgpe-select
            name="exercise"
            v-model="line.exercise"
            class="w-full select-large"
            :placeholder="$t('GamificationLayer.Trigger.Exercise')"
            :options="exercises"
            :clearable="false"
            :searchable="true"
            :reduce="option => option.id"
          >
            <template slot="option" slot-scope="option">
              <div class="d-center">
                {{ exercisesById[option.id] && exercisesById[option.id].label }}
              </div>
            </template>
            <template slot="selected-option" slot-scope="option">
              <div class="selected d-center">
                {{ exercisesById[option.id] && exercisesById[option.id].label }}
              </div>
            </template>
          </fgpe-select>
          <span v-show="errors[0]" class="text-danger text-sm">
            {{ errors[0] }}
          </span>
        </ValidationProvider>
      </div>

      <div v-if="activeEventSources[index] === 'INTERVAL'" class="w-full mb-2">
        <ValidationProvider
          name="interval"
          rules="required"
          v-slot="{ errors }"
          persist
        >
          <vs-input-number
            name="interval"
            v-model.number="line.interval"
            :min="10"
            :step="10"
            size="medium"
            icon-pack="mi"
          />
          <span v-show="errors[0]" class="text-danger text-sm">
            {{ errors[0] }}
          </span>
        </ValidationProvider>
      </div>

      <div v-if="activeEventSources[index] === 'CRONJOB'" class="w-full mb-2">
        <ValidationProvider
          name="cronjob"
          rules="required|cronjob"
          v-slot="{ errors }"
          persist
        >
          <vs-input name="cronjob" v-model="line.cronjob" icon-pack="mi" />
          <span v-show="errors[0]" class="text-danger text-sm">
            {{ errors[0] }}
          </span>
          <span v-show="!errors[0]" class="text-success text-sm">
            {{ cronExplain(line.cronjob) }}
          </span>
        </ValidationProvider>
      </div>
    </div>
  </multi-row-input>
</template>

<script>
import cronstrue from "cronstrue";
import { ValidationProvider } from "vee-validate";

import FgpeSelect from "@/components/FgpeSelect";
import MultiRowInput from "@/components/MultiRowInput";

export default {
  name: "trigger-input",
  components: {
    ValidationProvider,
    "fgpe-select": FgpeSelect,
    "multi-row-input": MultiRowInput
  },
  props: {
    value: {
      type: Array
    },
    challenges: {
      type: Array,
      default: () => []
    },
    exercises: {
      type: Array,
      default: () => []
    },
    rewards: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    empty() {
      return {
        kind: this.types[0],
        event: this.events.time[0],
        recurrent: false,
        parameters: [],
        cronjob: "* * * * *",
        interval: 10
      };
    },
    rewardsById() {
      return this.rewards.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
      }, {});
    },
    challengesById() {
      return this.challenges.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
      }, {});
    },
    exercisesById() {
      return this.exercises.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
      }, {});
    },
    activeEventSources() {
      return this.value.map(trigger => this.activeEventSource(trigger));
    }
  },
  data() {
    return {
      types: ["TIME", "ACTION"],
      events: {
        time: ["INTERVAL", "CRONJOB"],
        action: [
          "SUBMISSION_RECEIVED",
          "SUBMISSION_EVALUATED",
          "SUBMISSION_ACCEPTED",
          "SUBMISSION_REJECTED",
          "CHALLENGE_COMPLETED",
          "CHALLENGE_FAILED",
          "REWARD_GRANTED",
          "PLAYER_UPDATED",
          "POINTS_UPDATED",
          "DUEL_INITIATED",
          "DUEL_INVITATION_RECEIVED",
          "DUEL_ACCEPTED",
          "DUEL_REJECTED",
          "DUEL_COMPLETED"
        ]
      },
      triggers: []
    };
  },
  watch: {
    value(val) {
      if (!val) {
        this.triggers = [];
      } else {
        this.triggers = this.triggersFromServer(val);
      }
    }
  },
  mounted() {
    if (!this.value) {
      this.triggers = [];
    } else {
      this.triggers = this.triggersFromServer(this.value);
    }
  },
  methods: {
    onChangeTriggers(val) {
      const triggers = val.map(trigger => {
        const parameters = [];
        if (trigger.kind === "TIME") {
          if (trigger.event === "CRONJOB") {
            parameters.push(trigger.cronjob);
          } else {
            parameters.push(trigger.interval);
          }
        } else {
          const eventSource = this.activeEventSource(trigger);
          switch (eventSource) {
            case "EXERCISE":
              parameters.push(trigger.exercise);
              break;
            case "CHALLENGE":
              parameters.push(trigger.challenge);
              break;
            case "REWARD":
              parameters.push(trigger.reward);
              break;
          }
        }
        return {
          kind: trigger.kind,
          event: trigger.event,
          recurrent: trigger.recurrent,
          parameters
        };
      });
      this.$emit("input", triggers);
    },

    triggersFromServer(val) {
      return val.map(trigger => {
        if (trigger.kind === "TIME") {
          if (trigger.event === "CRONJOB") {
            return Object.assign({}, this.empty, {
              ...trigger,
              cronjob: trigger.parameters[0]
            });
          } else {
            return Object.assign({}, this.empty, {
              ...trigger,
              interval: trigger.parameters[0]
            });
          }
        } else {
          const eventSource = this.activeEventSource(trigger);
          switch (eventSource) {
            case "EXERCISE":
              return Object.assign({}, this.empty, {
                ...trigger,
                exercise: trigger.parameters[0]
              });
            case "CHALLENGE":
              return Object.assign({}, this.empty, {
                ...trigger,
                challenge: trigger.parameters[0]
              });
            case "REWARD":
              return Object.assign({}, this.empty, {
                ...trigger,
                reward: trigger.parameters[0]
              });
          }
        }
        return trigger;
      });
    },

    activeEventSource(line) {
      switch (line.event) {
        case "SUBMISSION_RECEIVED":
        case "SUBMISSION_EVALUATED":
        case "SUBMISSION_ACCEPTED":
        case "SUBMISSION_REJECTED":
          return "EXERCISE";

        case "CHALLENGE_COMPLETED":
        case "CHALLENGE_FAILED":
          return "CHALLENGE";

        case "REWARD_GRANTED":
          return "REWARD";

        default:
          break;
      }
      return line.event;
    },

    cronExplain(str) {
      try {
        return cronstrue.toString(str, { locale: this.$root.$i18n.locale });
      } catch (error) {
        return "";
      }
    }
  }
};
</script>
