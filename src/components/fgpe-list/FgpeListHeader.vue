<template lang="html">
  <div
    :class="[
      `fgpe-header-list-${color}`,
      {
        'with-icon': icon
      }
    ]"
    :style="styleHeader"
    class="fgpe-list--header"
  >
    <div v-if="icon" class="fgpe-list--icon">
      <vs-icon :icon-pack="iconPack" :icon="icon" />
    </div>
    <div class="list-titles">
      <div v-if="title" class="fgpe-list--title">{{ title }}</div>
    </div>
    <div class="fgpe-list--slot">
      <slot />
    </div>
  </div>
</template>

<script>
import colors from "@/../colors.config.json";

export default {
  name: "fgpe-list-header",
  props: {
    color: {
      type: String,
      default: "primary"
    },
    title: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    iconPack: {
      type: String,
      default: "mi"
    }
  },
  computed: {
    styleHeader() {
      return colors[this.color];
    }
  }
};
</script>
