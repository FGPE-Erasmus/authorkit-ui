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
      <vs-tooltip v-if="tooltip" :title="title" :text="tooltip" color="primary">
        <div v-if="title" class="fgpe-list--title has-tooltip">{{ title }}</div>
        <span></span>
      </vs-tooltip>
      <template v-else>
        <div v-if="title" class="fgpe-list--title">{{ title }}</div>
      </template>
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
    tooltip: {
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
