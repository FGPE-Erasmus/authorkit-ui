<template>
  <vs-prompt
    @accept="$emit('import', currentFormat)"
    @cancel="$emit('cancel')"
    @close="$emit('cancel')"
    :active.sync="dialogActive"
    icon-pack="mi"
  >
    <div>
      <h4 class="mb-4">{{ $t("Exercise.ImportDialog.Title") }}</h4>
    </div>

    <div class="w-full">
      <vs-radio v-model="currentFormat" vs-value="yapexil" class="w-full">{{
        $t("Exercise.ImportDialog.Format.yapexil")
      }}</vs-radio>
      <vs-radio v-model="currentFormat" vs-value="sipe" class="w-full">{{
        $t("Exercise.ImportDialog.Format.sipe")
      }}</vs-radio>
      <vs-radio v-model="currentFormat" vs-value="mef" class="w-full">{{
        $t("Exercise.ImportDialog.Format.mef")
      }}</vs-radio>
    </div>
  </vs-prompt>
</template>

<script>
export default {
  name: "import-exercise-dialog",
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
