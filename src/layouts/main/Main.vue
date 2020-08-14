<template>
  <div class="layout--main" :class="[navbarClasses, footerClasses]">
    <fgpe-tour :steps="steps" v-if="!disableThemeTour" />

    <fgpe-sidebar
      :logo="require('@/assets/images/logo/logo-nocaption.svg')"
      :sidebarItems="sidebarItems"
      title="AuthorKit"
      parent=".layout--main"
    />

    <div
      id="content-area"
      :class="[contentAreaClass, { 'show-overlay': bodyOverlay }]"
    >
      <div id="content-overlay"></div>

      <div class="content-wrapper">
        <the-navbar
          :navbarColor="navbarColor"
          :class="[
            { 'text-white': isNavbarDark && !isThemeDark },
            { 'text-base': !isNavbarDark && isThemeDark }
          ]"
        />

        <div class="router-view">
          <div
            class="router-content"
            :class="{ 'mt-0': navbarType == 'hidden' }"
          >
            <transition :name="routerTransition">
              <div
                class="router-header flex flex-wrap items-center mb-6"
                v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
              >
                <div
                  class="content-area__heading"
                  :class="{
                    'pr-4 border-0 md:border-r border-t-0 border-b-0 border-l-0 border-solid border-grey-light':
                      $route.meta.breadcrumb
                  }"
                >
                  <h2 class="mb-1">{{ $t(routeTitle) }}</h2>
                </div>
                <fgpe-breadcrumb
                  class="ml-4 md:block hidden"
                  v-if="$route.meta.breadcrumb"
                />
              </div>
            </transition>
            <div class="content-area__content">
              <back-to-top
                bottom="5%"
                visibleoffset="500"
                v-if="!hideScrollToTop"
              >
                <vs-button
                  icon-pack="feather"
                  icon="icon-arrow-up"
                  class="shadow-lg"
                />
              </back-to-top>
              <transition :name="routerTransition" mode="out-in">
                <router-view @changeRouteTitle="changeRouteTitle"></router-view>
              </transition>
            </div>
          </div>
        </div>
      </div>

      <the-footer></the-footer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BackToTop from "vue-backtotop";

import themeConfig from "@/../theme.config.js";
import {
  THEME_TOGGLE_IS_SIDEBAR_ACTIVE,
  THEME_UPDATE_SIDEBAR_WIDTH
} from "@/store/constants";
import FgpeSidebar from "@/layouts/components/fgpe-sidebar/FgpeSidebar.vue";
import TheNavbar from "../components/TheNavbar.vue";
import TheFooter from "../components/TheFooter.vue";
const FgpeTour = () => import("@/components/FgpeTour.vue");

export default {
  data() {
    return {
      navbarType: themeConfig.navbarType || "floating",
      navbarColor: themeConfig.navbarColor || "#fff",
      footerType: themeConfig.footerType || "static",
      routerTransition: themeConfig.routerTransition || "none",
      isNavbarDark: false,
      routeTitle: this.$route.meta.pageTitle,
      windowWidth: window.innerWidth,
      hideScrollToTop: themeConfig.hideScrollToTop,
      disableThemeTour: themeConfig.disableThemeTour,
      steps: [
        {
          target: "#btnSidebarToggler",
          content: "Toggle Collapse Sidebar."
        },
        {
          target: ".i18n-locale",
          content: "You can change language from here."
        }
      ]
    };
  },
  watch: {
    $route() {
      this.routeTitle = this.$route.meta.pageTitle;
    }
  },
  computed: {
    ...mapState({
      sidebarWidth: state => state.sidebarWidth,
      bodyOverlay: state => state.bodyOverlay,
      activeProject: state => state.project.activeProject
    }),
    isProjectContext() {
      if (this.$route.path.match(/\/projects\/(.+)/i)) return true;
      else return false;
    },
    currentProjectId() {
      return this.$route.params.project_id;
    },
    isThemeDark() {
      return this.$store.state.theme == "dark";
    },
    contentAreaClass() {
      if (this.sidebarWidth == "default") return "content-area-default";
      else if (this.sidebarWidth == "reduced") return "content-area-reduced";
      else if (this.sidebarWidth) return "content-area-full";
      return "content-area-default";
    },
    navbarClasses() {
      return {
        "navbar-hidden": this.navbarType == "hidden",
        "navbar-sticky": this.navbarType == "sticky",
        "navbar-static": this.navbarType == "static",
        "navbar-floating": this.navbarType == "floating"
      };
    },
    footerClasses() {
      return {
        "footer-hidden": this.footerType == "hidden",
        "footer-sticky": this.footerType == "sticky",
        "footer-static": this.footerType == "static"
      };
    },
    sidebarItems() {
      return [
        ...this.sidebarItemsFromContext,
        {
          header: "Support",
          i18n: "Support"
        },
        {
          url: "/documentation",
          name: "Documentation",
          icon: "BookOpenIcon",
          slug: "external",
          i18n: "Documentation",
          target: "_blank"
        },
        {
          url: "/help",
          name: "Help",
          icon: "LifeBuoyIcon",
          slug: "external",
          i18n: "Help",
          target: "_blank"
        }
      ];
    },
    sidebarItemsFromContext() {
      if (this.isProjectContext) {
        return [
          {
            url: "/dashboard",
            name: "Dashboard",
            slug: "dashboard",
            icon: "ArrowLeftIcon",
            i18n: "ExitToDashboard"
          },
          {
            header: this.activeProject.name
          },
          {
            url: `/projects/${this.currentProjectId}/exercises`,
            name: "Exercises",
            slug: "exercises",
            icon: "FileTextIcon",
            i18n: "Exercises"
          },
          {
            url: `/projects/${this.currentProjectId}/gamification-layers`,
            name: "Gamification Layers",
            slug: "gamification-layers",
            icon: "LayersIcon",
            i18n: "GamificationLayers"
          }
        ];
      } else {
        return [
          {
            url: "/dashboard",
            name: "Dashboard",
            slug: "dashboard",
            icon: "HomeIcon",
            i18n: "Dashboard"
          }
        ];
      }
    }
  },
  methods: {
    changeRouteTitle(title) {
      this.routeTitle = title;
    },
    updateNavbar(val) {
      this.navbarType = val;
    },
    updateFooter(val) {
      this.footerType = val;
    },
    updateRouterTransition(val) {
      this.routerTransition = val;
    },
    handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth;
      this.setSidebarWidth();
    },
    setSidebarWidth() {
      if (this.windowWidth < 1200) {
        this.$store.commit(THEME_TOGGLE_IS_SIDEBAR_ACTIVE, false);
        this.$store.commit(THEME_UPDATE_SIDEBAR_WIDTH, "no-sidebar");
        this.disableThemeTour = true;
      } else if (this.windowWidth < 1200) {
        this.$store.commit(THEME_UPDATE_SIDEBAR_WIDTH, "reduced");
      } else {
        this.$store.commit(THEME_TOGGLE_IS_SIDEBAR_ACTIVE, true);
      }
    },
    toggleHideScrollToTop(val) {
      this.hideScrollToTop = val;
    }
  },
  components: {
    FgpeSidebar,
    TheNavbar,
    TheFooter,
    BackToTop,
    FgpeTour
  },
  created() {
    this.setSidebarWidth();
  }
};
</script>
