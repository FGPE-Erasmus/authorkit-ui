<template>
  <div class="parentx">
    <vs-sidebar
      ref="mainSidebar"
      :parent="parent"
      :hiddenBackground="clickNotClose"
      :reduce="reduce"
      default-index="-1"
      class="sidebarx main-menu-sidebar items-no-padding"
      v-model="isSidebarActive"
      :click-not-close="clickNotClose"
      :reduce-not-rebound="reduceNotRebound"
    >
      <div @mouseenter="sidebarMouseEntered" @mouseleave="sidebarMouseLeave">
        <div
          class="header-sidebar flex items-end justify-between"
          slot="header"
        >
          <div class="logo flex items-center">
            <img :src="logo" alt="logo" class="w-10 mr-4" v-if="logo" />
            <span
              class="logo-text"
              v-show="isMouseEnter || !reduce"
              v-if="title"
              >{{ title }}</span
            >
          </div>
          <div>
            <template v-if="showCloseButton">
              <feather-icon
                icon="XIcon"
                class="m-0 cursor-pointer"
                @click="isSidebarActive = false"
              ></feather-icon>
            </template>
            <template v-else-if="!showCloseButton && !sidebarItemsIconOnly">
              <feather-icon
                icon="DiscIcon"
                class="mr-0 cursor-pointer"
                svg-classes="stroke-current"
                v-show="!reduce"
                @click="toggleReduce(true)"
                id="btnSidebarToggler"
              ></feather-icon>
              <feather-icon
                icon="CircleIcon"
                class="mr-0 cursor-pointer"
                svg-classes="stroke-current"
                v-show="reduce"
                @click="toggleReduce(false)"
                id="btnSidebarToggler"
              ></feather-icon>
            </template>
          </div>
        </div>

        <VuePerfectScrollbar
          ref="mainSidebarPs"
          class="scroll-area--main-sidebar pt-10 pb-5"
          :settings="settings"
          @ps-scroll-y="psSectionScroll"
        >
          <template v-for="(sidebarItem, index) in sidebarItems">
            <!-- GROUP ITEM HEADER -->
            <span
              :key="`header-${index}`"
              v-if="sidebarItem.header && !sidebarItemsIconOnly"
              class="navigation-header truncate"
              >{{ $t(sidebarItem.i18n) || sidebarItem.header }}</span
            >
            <template v-else-if="!sidebarItem.header">
              <!-- IF IT'S SINGLE ITEM -->
              <fgpe-sidebar-item
                ref="sidebarLink"
                :key="`sidebarItem-${index}`"
                v-if="!sidebarItem.submenu"
                :index="index"
                :to="sidebarItem.slug != 'external' ? sidebarItem.url : ''"
                :href="sidebarItem.slug == 'external' ? sidebarItem.url : ''"
                :icon="sidebarItem.icon"
                :target="sidebarItem.target"
                :isDisabled="sidebarItem.isDisabled"
              >
                <span v-show="!sidebarItemsIconOnly" class="truncate">{{
                  $t(sidebarItem.i18n) || sidebarItem.name
                }}</span>
                <vs-chip
                  class="ml-auto"
                  :color="sidebarItem.tagColor"
                  v-if="sidebarItem.tag && (isMouseEnter || !reduce)"
                  >{{ sidebarItem.tag }}</vs-chip
                >
              </fgpe-sidebar-item>

              <!-- IF HAVE SUBMENU / DROPDOWN -->
              <template v-else>
                <fgpe-sidebar-group
                  ref="sidebarGrp"
                  :key="`group-${index}`"
                  :openHover="openGroupHover"
                  :group="sidebarItem"
                  :groupIndex="index"
                  :open="isGroupActive(sidebarItem)"
                ></fgpe-sidebar-group>
              </template>
            </template>
          </template>
        </VuePerfectScrollbar>
      </div>
    </vs-sidebar>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";

import {
  THEME_UPDATE_SIDEBAR_WIDTH,
  THEME_UPDATE_SIDEBAR_ICONS_ONLY,
  THEME_TOGGLE_REDUCE_BUTTON,
  THEME_TOGGLE_IS_SIDEBAR_ACTIVE,
  THEME_UPDATE_WINDOW_BREAKPOINT
} from "@/store/constants";

import FgpeSidebarGroup from "./FgpeSidebarGroup.vue";
import FgpeSidebarItem from "./FgpeSidebarItem.vue";

export default {
  name: "fgpe-sidebar",
  props: {
    sidebarItems: {
      type: Array,
      required: true
    },
    title: {
      type: String
    },
    logo: {
      type: String
    },
    parent: {
      type: String
    },
    openGroupHover: {
      type: Boolean,
      default: false
    },
    reduceNotRebound: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    clickNotClose: false,
    reduce: false,
    showCloseButton: false,
    isMouseEnter: false,
    settings: {
      // perfectscrollbar settings
      maxScrollbarLength: 60,
      wheelSpeed: 1,
      swipeEasing: true
    },
    windowWidth: window.innerWidth //width of windows
  }),
  computed: {
    isSidebarActive: {
      get() {
        return this.$store.state.isSidebarActive;
      },
      set(val) {
        this.$store.commit(THEME_TOGGLE_IS_SIDEBAR_ACTIVE, val);
      }
    },
    reduceSidebar() {
      return Boolean(this.reduce && this.reduceButton);
    },
    reduceButton: {
      get() {
        return this.$store.state.reduceButton;
      },
      set(val) {
        this.$store.commit(THEME_TOGGLE_REDUCE_BUTTON, val);
      }
    },
    sidebarItemsIconOnly() {
      return this.$store.state.sidebarItemsIconOnly;
    },
    isGroupActive() {
      return sidebarItem => {
        const path = this.$route.fullPath;
        let open = false;
        let func = function(sidebarItem) {
          if (sidebarItem.submenu) {
            sidebarItem.submenu.forEach(item => {
              if (path == item.url) {
                open = true;
              } else if (item.submenu) {
                func(item);
              }
            });
          }
        };
        func(sidebarItem);
        return open;
      };
    }
  },
  watch: {
    reduce(val) {
      if (val == true) {
        this.$store.commit(THEME_UPDATE_SIDEBAR_WIDTH, "reduced");
      } else {
        this.$store.commit(THEME_UPDATE_SIDEBAR_WIDTH, "default");
      }

      setTimeout(function() {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    },
    reduceButton() {
      this.setSidebarWidth();
    },
    $route() {
      if (this.isSidebarActive && this.showCloseButton)
        this.$store.commit(THEME_TOGGLE_IS_SIDEBAR_ACTIVE, false);
    }
  },
  methods: {
    sidebarMouseEntered() {
      if (this.reduce)
        this.$store.commit(THEME_UPDATE_SIDEBAR_ICONS_ONLY, false);
      this.isMouseEnter = true;
    },
    sidebarMouseLeave() {
      if (this.reduce) {
        this.$store.commit(THEME_UPDATE_SIDEBAR_ICONS_ONLY, true);
      }
      this.isMouseEnter = false;
    },
    toggleReduce(val) {
      this.reduceButton = val;
      this.setSidebarWidth();
    },
    handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth;
      this.setSidebarWidth();
    },
    setSidebarWidth() {
      if (this.windowWidth < 1200) {
        if (this.windowWidth < 992)
          this.$store.commit(THEME_UPDATE_WINDOW_BREAKPOINT, "md");
        else this.$store.commit(THEME_UPDATE_WINDOW_BREAKPOINT, "lg");

        this.$store.commit(THEME_TOGGLE_IS_SIDEBAR_ACTIVE, false);
        if (this.reduceButton) this.reduce = false;
        // this.reduceButton = false;
        this.showCloseButton = true;
        this.clickNotClose = false;
        this.$store.commit(THEME_UPDATE_SIDEBAR_WIDTH, "no-sidebar");
        this.$store.commit(THEME_UPDATE_SIDEBAR_ICONS_ONLY, false);
      } else {
        this.$store.commit(THEME_UPDATE_WINDOW_BREAKPOINT, "xl");
        if (this.reduceButton) this.reduce = true;
        else this.reduce = false;

        this.$store.commit(THEME_TOGGLE_IS_SIDEBAR_ACTIVE, true);
        if (this.reduceButton && !this.isMouseEnter)
          this.$store.commit(THEME_UPDATE_SIDEBAR_ICONS_ONLY, true);
        else this.$store.commit(THEME_UPDATE_SIDEBAR_ICONS_ONLY, false);

        this.clickNotClose = true;
        this.showCloseButton = false;
        if (this.reduceSidebar)
          this.$store.commit(THEME_UPDATE_SIDEBAR_WIDTH, "reduced");
        else this.$store.commit(THEME_UPDATE_SIDEBAR_WIDTH, "default");
      }
    },
    psSectionScroll() {
      if (this.$refs.mainSidebarPs.$el.scrollTop > 0)
        this.showShadowBottom = true;
      else this.showShadowBottom = false;
    }
  },
  components: {
    FgpeSidebarGroup,
    FgpeSidebarItem,
    VuePerfectScrollbar
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.handleWindowResize);
    });
    this.setSidebarWidth();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
  }
};
</script>
