<template>
  <fgpe-card
    :title="truncateWithEllipses(exercise.title, 20)"
    :subtitle="truncateWithEllipses(exercise.module, 40)"
    ref="card"
    @cardselected="onExerciseSelect()"
    class="cursor-pointer"
    :allow-view="allowView && !allowEdit"
    :allow-export="allowExport"
    :allow-edit="allowEdit"
    :allow-remove="allowRemove"
    @view="$emit('view')"
    @edit="$emit('edit')"
    @export="$emit('export')"
    @remove="$emit('remove')"
  >
    <div class="flex mt-6 flex-wrap">
      <span
        v-if="exercise.difficulty"
        :title="$t('Exercise.Difficulty')"
        class="flex mr-6"
        ><feather-icon
          class="cursor-pointer"
          icon="ShieldIcon"
          svgClasses="text-primary stroke-current h-6 w-6"
        ></feather-icon
        ><span class="ml-2">{{
          $t("Exercise.DifficultyLevels." + exercise.difficulty.toUpperCase())
        }}</span></span
      >
    </div>
  </fgpe-card>
</template>

<script>
import { truncateWithEllipses } from "@/assets/utils/strings";

import FgpeCard from "@/components/fgpe-card/FgpeCard.vue";

export default {
  name: "exercise-card",
  props: {
    exercise: Object,
    allowView: {
      type: Boolean,
      default: true
    },
    allowExport: {
      type: Boolean,
      default: true
    },
    allowEdit: {
      type: Boolean,
      default: true
    },
    allowRemove: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    truncateWithEllipses,
    onExerciseSelect() {
      this.$emit("view");
    }
  },
  components: {
    FgpeCard
  }
};
</script>
