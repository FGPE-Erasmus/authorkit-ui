<template>
  <fgpe-card
    :title="truncateWithEllipses(gamificationLayer.name, 20)"
    :subtitle="truncateWithEllipses(gamificationLayer.description, 40)"
    ref="card"
    @cardselected="onGamificationLayerSelect()"
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
    <div class="flex mt-6 flex-wrap" vs-align="end"></div>
  </fgpe-card>
</template>

<script>
import { truncateWithEllipses } from "@/assets/utils/strings";

import FgpeCard from "@/components/fgpe-card/FgpeCard.vue";

export default {
  name: "gamification-layer-card",
  props: {
    gamificationLayer: Object,
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
  methods: {
    truncateWithEllipses,
    onGamificationLayerSelect() {
      this.$emit("view");
    }
  },
  components: {
    FgpeCard
  }
};
</script>
