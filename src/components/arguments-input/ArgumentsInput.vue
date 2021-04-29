<template>
  <div class="value-extractor-input">
    <fgpe-chips
      name="parameters"
      v-model="args"
      :placeholder="$t('ArgumentsInput.Title')"
      :unique="false"
      icon-pack="mi md-16"
      remove-icon="delete_forever"
      class="mb-2"
    >
      <vs-chip
        v-for="(param, i) in args"
        :key="i"
        @click="removeActionParameter(args, i)"
        closable
        icon-pack="mi"
        close-icon="close"
      >
        {{ param }}
      </vs-chip>
    </fgpe-chips>
    <div class="flex flex-wrap">
      <div class="flex flex-wrap w-full">
        <vs-chip
          v-for="variable in variables"
          :key="variable.id"
          color="primary"
          @click.native="args.push('${' + variable.id + '}')"
        >
          <vs-avatar :text="variable.id" />
          {{ title(variable) }}
        </vs-chip>
      </div>
      <div class="flex w-full">
        <span
          class="text-primary cursor-pointer ml-auto mt-2"
          @click="openVariableDialog()"
        >
          {{ $t("ArgumentsInput.EditVariables") }}
        </span>
      </div>
    </div>
    <arguments-input-variable-dialog
      :active="variableDialogActive"
      :value="variables"
      :challenges="challenges"
      :exercises="exercises"
      :rewards="rewards"
      @accept="
        variables = $event;
        variableDialogActive = false;
      "
      @cancel="variableDialogActive = false"
      @close="variableDialogActive = false"
    />
  </div>
</template>

<script>
import ArgumentsInputVariableDialog from "@/components/arguments-input/ArgumentsInputVariableDialog";
import FgpeChips from "@/components/FgpeChips";

export default {
  name: "ArgumentsInput",
  components: {
    "fgpe-chips": FgpeChips,
    ArgumentsInputVariableDialog
  },
  props: {
    placeholder: {
      type: String
    },
    value: {
      type: Array
    },
    exercises: {
      type: Array,
      default: () => []
    },
    challenges: {
      type: Array,
      default: () => []
    },
    rewards: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    fullArgs() {
      let newArr = this.args.slice(0);
      for (const variable of this.variables) {
        newArr = newArr.map(val =>
          "${" + variable.id + "}" === val ? variable.value : val
        );
      }
      return newArr;
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
    rewardsById() {
      return this.rewards.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
      }, {});
    }
  },

  watch: {
    args() {
      this.$emit("input", this.fullArgs);
    },
    exercises() {
      this.variables = this.buildVariablesFromArgs(this.fullArgs);
    },
    challenges() {
      this.variables = this.buildVariablesFromArgs(this.fullArgs);
    },
    rewards() {
      this.variables = this.buildVariablesFromArgs(this.fullArgs);
    }
  },

  data() {
    return {
      isFocus: false,
      types: ["CHALLENGE", "EXERCISE", "REWARD"],
      variableDialogActive: false,
      args: [],
      variables: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.variables = this.buildVariablesFromArgs(this.value);
      this.args = this.replaceUUIDsByVariablesInArgs(
        this.value,
        this.variables
      );
    });
  },
  methods: {
    extractUUIDs(arr) {
      const re = /^([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})$/gi;
      const uuids = [];
      for (let i = 0; i < arr.length; i++) {
        let match;
        if ((match = re.exec(arr[i]))) {
          if (!uuids.includes(match[1])) {
            uuids.push(match[1]);
          }
        }
      }
      return uuids;
    },
    buildVariablesFromArgs(args) {
      return this.extractUUIDs(args).reduce((acc, nextValue, i) => {
        acc.push({
          id: `V${i}`,
          type: Object.keys(this.exercisesById).includes(nextValue)
            ? "EXERCISE"
            : Object.keys(this.challengesById).includes(nextValue)
            ? "CHALLENGE"
            : "REWARD",
          value: nextValue
        });
        return acc;
      }, []);
    },
    replaceUUIDsByVariablesInArgs(arr, variables) {
      let newArr = arr.slice(0);
      for (const variable of variables) {
        newArr = newArr.map(val =>
          variable.value === val ? "${" + variable.id + "}" : val
        );
      }
      return newArr;
    },
    openVariableDialog() {
      this.variableDialogActive = true;
    },
    title(variable) {
      if (!variable.value) {
        return "";
      }
      let title;
      if (variable.type === "EXERCISE") {
        return (
          this.exercisesById[variable.value] &&
          this.exercisesById[variable.value].label
        );
      } else if (variable.type === "CHALLENGE") {
        return (
          this.challengesById[variable.value] &&
          this.challengesById[variable.value].label
        );
      } else if (variable.type === "REWARD") {
        return (
          this.rewardsById[variable.value] &&
          this.rewardsById[variable.value].label
        );
      }
      if (title && title.length > 10) {
        return title.substr(0, 10) + "...";
      }
      return title;
    },
    removeActionParameter(arr, i) {
      arr.splice(i, 1);
      return false;
    }
  }
};
</script>
