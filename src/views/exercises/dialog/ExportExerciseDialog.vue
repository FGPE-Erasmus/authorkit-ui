<template>
  <vs-prompt
    @accept="$emit('export', currentFormat)"
    @cancel="$emit('cancel')"
    @close="$emit('cancel')"
    :active.sync="dialogActive"
    icon-pack="mi"
  >
    <div>
      <h4 class="mb-4">{{ $t("Exercise.ExportDialog.Title") }}</h4>
    </div>

    <div class="w-full">
      <vs-radio v-model="currentFormat" vs-value="yapexil" class="w-full">{{
        $t("Exercise.ExportDialog.Format.yapexil")
      }}</vs-radio>
      <vs-radio v-model="currentFormat" vs-value="mef" class="w-full">{{
        $t("Exercise.ExportDialog.Format.mef")
      }}</vs-radio>
    </div>
  </vs-prompt>
</template>

<script>
export default {
  name: "export-exercise-dialog",
  props: {
    active: {
      type: Boolean,
      required: true
    },
    format: {
      type: String,
      default: "yapexil"
    }
  },
  data() {
    return {
      dialogActive: this.active,
      currentFormat: this.format
    };
  },
  watch: {
    active(val) {
      this.dialogActive = val;
      this.currentFormat = this.format;
    }
  }
};
</script>
