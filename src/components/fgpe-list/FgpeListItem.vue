<template lang="html">
  <div class="fgpe-list--item">
    <div class="fgpe-list--avatar" v-if="$slots.avatar">
      <slot name="avatar" />
    </div>
    <div v-if="icon" class="fgpe-list--icon">
      <vs-icon :icon-pack="iconPack" :icon="icon" />
    </div>
    <div class="list-titles">
      <div v-if="title" class="fgpe-list--title">{{ title }}</div>
      <div v-if="subtitle" class="fgpe-list--subtitle">{{ subtitle }}</div>
    </div>
    <div class="fgpe-list--slot">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "fgpe-list-item",
  props: {
    vsAvatar: {
      type: [Boolean, String],
      default: false
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
      default: "material-icons"
    }
  }
};
</script>
