<template>
  <div
    class="fgpe-card"
    ref="card"
    :class="[
      { 'overflow-hidden': tempHidden },
      { 'no-shadow': noShadow },
      { 'rounded-none': noRadius },
      { 'card-border': cardBorder }
    ]"
    :style="cardStyles"
    @dblclick="$emit('cardselected')"
  >
    <div class="fgpe-card__header" v-if="hasHeader">
      <!-- card title -->
      <div class="fgpe-card__title">
        <h4 v-if="this.$props.title">{{ title }}</h4>
        <h6 v-if="this.$props.subtitle" class="text-grey">{{ subtitle }}</h6>
      </div>

      <!-- card actions -->
      <div class="fgpe-card__actions" v-if="hasAction">
        <slot name="actions">
          <div
            class="fgpe-card__action-buttons"
            v-if="
              actionButtons ||
                collapseAction ||
                refreshContentAction ||
                removeCardAction
            "
          >
            <feather-icon
              @click="toggleContent"
              icon="ChevronUpIcon"
              :class="{ rotate180: !isContentCollapsed }"
              class="ml-4"
              v-if="actionButtons || collapseAction"
            />
            <feather-icon
              @click="refreshcard"
              icon="RotateCwIcon"
              class="ml-4"
              v-if="actionButtons || refreshContentAction"
            />
            <feather-icon
              @click="removeCard"
              icon="XIcon"
              class="ml-4"
              v-if="actionButtons || removeCardAction"
            />
          </div>
        </slot>
      </div>
    </div>

    <div
      class="fgpe-card__collapsible-content vs-con-loading__container"
      ref="content"
      :class="[
        { collapsed: isContentCollapsed },
        { 'overflow-hidden': tempHidden }
      ]"
      :style="StyleItems"
    >
      <!-- content with no body(no padding) -->
      <slot name="no-body"></slot>

      <!-- content inside body(with padding) -->
      <div class="fgpe-card__body" v-if="this.$slots.default">
        <slot></slot>
      </div>

      <!-- content with no body(no padding) -->
      <slot name="no-body-bottom"></slot>

      <div class="fgpe-card__footer" v-if="this.$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "fgpe-card",
  props: {
    title: String,
    subtitle: String,
    actionButtons: {
      type: Boolean,
      default: false
    },
    actionButtonsColor: {
      type: String,
      default: "success"
    },
    noShadow: {
      default: false,
      type: Boolean
    },
    noRadius: {
      default: false,
      type: Boolean
    },
    cardBorder: {
      default: false,
      type: Boolean
    },
    collapseAction: {
      default: false,
      type: Boolean
    },
    refreshContentAction: {
      default: false,
      type: Boolean
    },
    removeCardAction: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      isContentCollapsed: false,
      maxHeight: null,
      cardMaxHeight: null,
      tempHidden: false
    };
  },
  computed: {
    hasAction() {
      return (
        this.$slots.actions ||
        this.actionButtons ||
        this.collapseAction ||
        this.refreshContentAction ||
        this.removeCardAction
      );
    },
    hasHeader() {
      return this.hasAction || this.title || this.subtitle;
    },
    StyleItems() {
      return { maxHeight: this.maxHeight };
    },
    cardStyles() {
      return { maxHeight: this.cardMaxHeight };
    }
  },
  methods: {
    toggleContent() {
      this.$refs.content.style.overflow = "hidden";
      let scrollHeight = this.$refs.content.scrollHeight;
      if (this.maxHeight == "1.5rem") {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = "none";
          this.$refs.content.style.overflow = "hidden";
        }, 300);
      } else {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = `1.5rem`;
          this.$refs.content.style.overflow = "hidden";
        }, 50);
      }
      this.isContentCollapsed = !this.isContentCollapsed;
    },
    refreshcard() {
      this.tempHidden = true;
      this.$vs.loading({
        container: this.$refs.content,
        scale: 0.5
      });
      setTimeout(() => {
        this.$vs.loading.close(this.$refs.content);
        this.tempHidden = false;
      }, 3000);
    },
    removeCard() {
      let scrollHeight = this.$refs.card.scrollHeight;
      this.cardMaxHeight = `${scrollHeight}px`;
      this.$el.style.overflow = "hidden";
      setTimeout(() => {
        this.cardMaxHeight = `0px`;
      }, 50);
    }
  },
  components: {}
};
</script>
