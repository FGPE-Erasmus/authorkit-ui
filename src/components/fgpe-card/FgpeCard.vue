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
      <div class="fgpe-card__actions">
        <slot name="actions">
          <vs-dropdown
            v-if="
              allowView ||
                allowExport ||
                allowEdit ||
                allowShare ||
                allowRemove ||
                allowUpload
            "
            class="cursor-pointer"
            vs-trigger-click
          >
            <feather-icon
              icon="MoreVerticalIcon"
              svgClasses="w-6 h-6 text-grey"
            ></feather-icon>

            <vs-dropdown-menu class="w-32">
              <vs-dropdown-item v-if="allowView" @click="$emit('view')">
                <div class="flex flex-row">
                  <feather-icon
                    icon="EyeIcon"
                    class="flex items-center mr-2"
                    svgClasses="w-4 h-4"
                  /><span>{{ $t("Card.Actions.View") }}</span>
                </div>
              </vs-dropdown-item>
              <vs-dropdown-item v-if="allowEdit" @click="$emit('edit')">
                <div class="flex flex-row">
                  <feather-icon
                    icon="EditIcon"
                    class="flex items-center mr-2"
                    svgClasses="w-4 h-4"
                  /><span>{{ $t("Card.Actions.Edit") }}</span>
                </div>
              </vs-dropdown-item>
              <vs-dropdown-item v-if="allowShare" @click="$emit('share')">
                <div class="flex flex-row">
                  <feather-icon
                    icon="Share2Icon"
                    class="flex items-center mr-2"
                    svgClasses="w-4 h-4"
                  /><span>{{ $t("Card.Actions.Share") }}</span>
                </div>
              </vs-dropdown-item>
              <vs-dropdown-item v-if="allowExport" @click="$emit('export')">
                <div class="flex flex-row">
                  <feather-icon
                    icon="ArrowDownCircleIcon"
                    class="flex items-center mr-2"
                    svgClasses="w-4 h-4"
                  /><span>{{ $t("Card.Actions.Export") }}</span>
                </div>
              </vs-dropdown-item>
              <vs-dropdown-item v-if="allowUpload" @click="$emit('upload')">
                <div class="flex flex-row">
                  <feather-icon
                    icon="ArrowUpCircleIcon"
                    class="flex items-center mr-2"
                    svgClasses="w-4 h-4"
                  /><span>{{ $t("Card.Actions.Export") }}</span>
                </div>
              </vs-dropdown-item>
              <vs-divider v-if="allowRemove" class="my-1 p-1"></vs-divider>
              <vs-dropdown-item v-if="allowRemove" @click="$emit('remove')">
                <div class="flex flex-row">
                  <feather-icon
                    icon="TrashIcon"
                    class="flex items-center mr-2"
                    svgClasses="w-4 h-4"
                  /><span>{{ $t("Card.Actions.Delete") }}</span>
                </div>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
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
    },
    allowView: {
      type: Boolean,
      default: false
    },
    allowExport: {
      type: Boolean,
      default: false
    },
    allowShare: {
      type: Boolean,
      default: false
    },
    allowEdit: {
      type: Boolean,
      default: false
    },
    allowRemove: {
      type: Boolean,
      default: false
    },
    allowUpload: {
      type: Boolean,
      default: false
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

