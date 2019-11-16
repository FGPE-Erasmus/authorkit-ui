<template>
  <div class="relative">
    <div class="vx-navbar-wrapper">
      <vs-navbar
        class="vx-navbar navbar-custom"
        :color="navbarColor"
        :class="classObj"
      >
        <feather-icon
          class="sm:inline-flex xl:hidden cursor-pointer mr-1"
          icon="MenuIcon"
          @click.stop="showSidebar"
        ></feather-icon>

        <vs-spacer></vs-spacer>

        <i18n-select />

        <div
          class="search-full-container w-full h-full absolute pin-l rounded-lg"
          :class="{ flex: showFullSearch }"
          v-show="showFullSearch"
        >
          <fgpe-auto-suggest
            :autoFocus="showFullSearch"
            :data="searchableItems"
            @selected="selected"
            ref="navbarSearch"
            @closeSearchbar="showFullSearch = false"
            placeholder="Search..."
            class="w-full"
            inputClassses="w-full vs-input-no-border vs-input-no-shdow-focus no-icon-border"
            icon="SearchIcon"
            background-overlay
          ></fgpe-auto-suggest>
          <div class="absolute pin-r h-full z-50">
            <feather-icon
              icon="XIcon"
              class="px-4 cursor-pointer h-full close-search-icon"
              @click="showFullSearch = false"
            ></feather-icon>
          </div>
        </div>
        <feather-icon
          icon="SearchIcon"
          @click="showFullSearch = true"
          class="cursor-pointer navbar-fuzzy-search mx-4"
        ></feather-icon>

        <!-- LIGHT TOGGLER -->
        <feather-icon
          :icon="lights ? 'SunIcon' : 'MoonIcon'"
          @click="toggleLights"
          class="cursor-pointer mr-4"
        ></feather-icon>

        <!-- NOTIFICATIONS -->
        <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
          <feather-icon
            icon="BellIcon"
            class="cursor-pointer mt-1 sm:mr-6 mr-2"
            :badge="unreadNotifications.length"
          ></feather-icon>
          <vs-dropdown-menu class="notification-dropdown dropdown-custom">
            <div class="notification-top text-center p-5 bg-primary text-white">
              <h3 class="text-white">{{ unreadNotifications.length }} New</h3>
              <p class="opacity-75">App Notifications</p>
            </div>

            <VuePerfectScrollbar
              ref="mainSidebarPs"
              class="scroll-area--nofications-dropdown p-0 mb-10"
              :settings="settings"
            >
              <ul class="bordered-items">
                <li
                  v-for="ntf in unreadNotifications"
                  :key="ntf.index"
                  class="flex justify-between px-4 py-4 notification cursor-pointer"
                >
                  <div class="flex items-start">
                    <feather-icon
                      :icon="ntf.icon"
                      :svgClasses="[
                        `text-${ntf.category}`,
                        'stroke-current mr-1 h-6 w-6'
                      ]"
                    ></feather-icon>
                    <div class="mx-2">
                      <span
                        class="font-medium block notification-title"
                        :class="[`text-${ntf.category}`]"
                        >{{ ntf.title }}</span
                      >
                      <small>{{ ntf.msg }}</small>
                    </div>
                  </div>
                  <small class="mt-1 whitespace-no-wrap">{{
                    elapsedTime(ntf.time)
                  }}</small>
                </li>
              </ul>
            </VuePerfectScrollbar>
            <div
              class="
                        checkout-footer
                        fixed
                        pin-b
                        rounded-b-lg
                        text-primary
                        w-full
                        p-2
                        font-semibold
                        text-center
                        border
                        border-b-0
                        border-l-0
                        border-r-0
                        border-solid
                        border-grey-light
                        cursor-pointer"
            >
              <span>View All Notifications</span>
            </div>
          </vs-dropdown-menu>
        </vs-dropdown>

        <!-- USER META -->
        <div class="the-navbar__user-meta flex items-center">
          <div class="text-right leading-tight hidden sm:block">
            <p class="font-semibold">{{ name }}</p>
            <small>{{ user.email }}</small>
          </div>
          <vs-dropdown
            vs-custom-content
            vs-trigger-click
            class="cursor-pointer"
          >
            <div class="con-img ml-3">
              <img
                v-if="user.profile_img"
                key="fgpe-image"
                :src="user.profile_img"
                alt="user-img"
                width="40"
                height="40"
                class="rounded-full shadow-md cursor-pointer block"
              />
              <gravatar-img
                v-else
                key="gravatar-img"
                :email="user.email"
                :size="40"
                alt="user-img"
                class="rounded-full shadow-md cursor-pointer block"
              />
            </div>
            <vs-dropdown-menu>
              <ul style="min-width: 9rem">
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="$router.push('/profile')"
                >
                  <feather-icon
                    icon="UserIcon"
                    svgClasses="w-4 h-4"
                  ></feather-icon>
                  <span class="ml-2">Profile</span>
                </li>
                <vs-divider class="m-1"></vs-divider>
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="logout"
                >
                  <feather-icon
                    icon="LogOutIcon"
                    svgClasses="w-4 h-4"
                  ></feather-icon>
                  <span class="ml-2">Logout</span>
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

import {
  TOGGLE_LIGHTS,
  THEME_TOGGLE_IS_SIDEBAR_ACTIVE
} from "@/store/constants";
import { MODULE_BASE, AUTH_LOGOUT } from "@/store/auth/auth.constants";
import I18nSelect from "@/components/I18nSelect.vue";
import GravatarImg from "@/components/GravatarImg.vue";
import FgpeAutoSuggest from "@/components/FgpeAutoSuggest";

export default {
  name: "the-navbar",
  props: {
    navbarColor: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      searchableItems: this.$store.state.searchableItems,
      searchQuery: "",
      showFullSearch: false,
      unreadNotifications: [
        {
          index: 0,
          title: "New Project Added",
          msg: "Project FGPE has been added.",
          icon: "MessageSquareIcon",
          time: "Wed Nov 14 2019 07:45:23 GMT+0000 (GMT)",
          category: "primary"
        }
      ],
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      },
      autoFocusSearch: false
    };
  },
  watch: {
    $route() {
      if (this.showBookmarkPagesDropdown)
        this.showBookmarkPagesDropdown = false;
    }
  },
  computed: {
    ...mapState({
      lights: state => state.theme_settings.lights,
      user: state => state.auth.profile
    }),

    sidebarWidth() {
      return this.$store.state.sidebarWidth;
    },
    breakpoint() {
      return this.$store.state.breakpoint;
    },

    classObj() {
      if (this.sidebarWidth == "default") return "navbar-default";
      else if (this.sidebarWidth == "reduced") return "navbar-reduced";
      else if (this.sidebarWidth) return "navbar-full";
      return "navbar-default";
    },

    name() {
      return this.user.first_name + " " + this.user.last_name;
    }
  },
  methods: {
    showSidebar() {
      this.$store.commit(THEME_TOGGLE_IS_SIDEBAR_ACTIVE, true);
    },
    selected(item) {
      this.$router.push(item.url);
      this.showFullSearch = false;
    },
    showNavbarSearch() {
      this.showFullSearch = true;
    },
    showSearchbar() {
      this.showFullSearch = true;
    },
    elapsedTime(startTime) {
      let x = new Date(startTime);
      let now = new Date();
      var timeDiff = now - x;
      timeDiff /= 1000;

      var seconds = Math.round(timeDiff);
      timeDiff = Math.floor(timeDiff / 60);

      var minutes = Math.round(timeDiff % 60);
      timeDiff = Math.floor(timeDiff / 60);

      var hours = Math.round(timeDiff % 24);
      timeDiff = Math.floor(timeDiff / 24);

      var days = Math.round(timeDiff % 365);
      timeDiff = Math.floor(timeDiff / 365);

      var years = timeDiff;

      if (years > 0) {
        return years + (years > 1 ? " Years " : " Year ") + "ago";
      } else if (days > 0) {
        return days + (days > 1 ? " Days " : " Day ") + "ago";
      } else if (hours > 0) {
        return hours + (hours > 1 ? " Hrs " : " Hour ") + "ago";
      } else if (minutes > 0) {
        return minutes + (minutes > 1 ? " Mins " : " Min ") + "ago";
      } else if (seconds > 0) {
        return seconds + (seconds > 1 ? `${seconds} sec ago` : "just now");
      }

      return "Just Now";
    },
    toggleLights() {
      this.$store.dispatch(TOGGLE_LIGHTS);
    },
    logout() {
      this.$store.dispatch(`${MODULE_BASE}/${AUTH_LOGOUT}`);
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },

      unbind: function(el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  },
  components: {
    VuePerfectScrollbar,
    FgpeAutoSuggest,
    I18nSelect,
    GravatarImg
  }
};
</script>
