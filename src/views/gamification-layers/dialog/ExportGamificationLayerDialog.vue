<template>
  <vs-prompt
    @accept="$emit('export', currentExerciseFormat)"
    @cancel="$emit('cancel')"
    @close="$emit('cancel')"
    :active.sync="dialogActive"
    icon-pack="mi"
  >
    <div>
      <h4 class="mb-4">{{ $t("GamificationLayer.ExportDialog.Title") }}</h4>
    </div>

    <div class="w-full">
      <vs-radio
        v-model="currentExerciseFormat"
        vs-value="yapexil"
        class="w-full"
        >{{ $t("GamificationLayer.ExportDialog.Format.yapexil") }}</vs-radio
      >
      <vs-radio v-model="currentExerciseFormat" vs-value="mef" class="w-full">{{
        $t("GamificationLayer.ExportDialog.Format.mef")
      }}</vs-radio>
      <vs-radio v-model="currentExerciseFormat" vs-value="" class="w-full">{{
        $t("GamificationLayer.ExportDialog.Format.doNotIncludeExercises")
      }}</vs-radio>
    </div>
  </vs-prompt>
</template>

<script>
export default {
  name: "export-gamification-layer-dialog",
  props: {
    active: {
      type: Boolean,
      required: true
    },
    exercises: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      dialogActive: this.active,
      currentExerciseFormat: this.exercises
    };
  },
  watch: {
    active(val) {
      this.dialogActive = val;
      this.currentExerciseFormat = this.exercises;
    }
  }
};
</script>
