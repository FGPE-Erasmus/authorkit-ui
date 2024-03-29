/*
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Structure:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
*/

import Vue from "vue";
import Router from "vue-router";

import store from "@/store/store";
import { SHOW_SEARCH_ICON, HIDE_SEARCH_ICON } from "@/store/constants";
import {
  MODULE_BASE as PROJECT_MODULE_BASE,
  PROJECT_GET,
  PROJECT_SET_ACTIVE
} from "@/store/projects/project.constants";
import {
  MODULE_BASE as PERMISSION_MODULE_BASE,
  PERMISSION_GET
} from "@/store/permissions/permission.constants";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "",
      component: () => import("@/layouts/main/Main.vue"),
      children: [
        {
          path: "",
          redirect: "/home",
          meta: {
            rule: ["*"]
          }
        },
        {
          path: "/",
          redirect: "/home",
          meta: {
            rule: ["*"]
          }
        },
        {
          path: "/home",
          name: "home",
          component: () => import("@/views/pages/Home.vue"),
          meta: {
            rule: ["*"]
          }
        },
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/views/projects/Projects.vue"),
          meta: {
            rule: ["user"]
          }
        },

        {
          path: "/profile",
          name: "profile",
          component: () => import("@/views/user-settings/UserSettings.vue"),
          meta: {
            rule: ["user"],
            breadcrumb: [
              { i18n: "Home", url: "/" },
              { i18n: "Profile", active: true }
            ]
          }
        },

        {
          path: "/projects/:project_id/exercises",
          name: "exercises",
          component: () => import("@/views/exercises/Exercises.vue"),
          meta: {
            breadcrumb: [
              { i18n: "Home", url: "/" },
              { i18n: "Exercises", active: true }
            ],
            pageTitle: "Exercises",
            rule: ["user"]
          }
        },
        {
          path: "/projects/:project_id/exercises/:id",
          name: "exercise-form",
          component: () => import("@/views/exercises/ExerciseForm.vue"),
          meta: {
            breadcrumb: [
              { i18n: "Home", url: "/" },
              { i18n: "Exercises", url: "/projects/:project_id/exercises" },
              { i18n: "ExerciseForm", active: true }
            ],
            pageTitle: "ExerciseForm",
            rule: ["user"]
          }
        },

        {
          path: "/projects/:project_id/gamification-layers",
          name: "gamification-layers",
          component: () =>
            import("@/views/gamification-layers/GamificationLayers.vue"),
          meta: {
            breadcrumb: [
              { i18n: "Home", url: "/" },
              { i18n: "GamificationLayers", active: true }
            ],
            pageTitle: "GamificationLayers",
            rule: ["user"]
          }
        },
        {
          path: "/projects/:project_id/gamification-layers/:id",
          name: "gamification-layer-form",
          component: () =>
            import("@/views/gamification-layers/GamificationLayerForm.vue"),
          meta: {
            breadcrumb: [
              { i18n: "Home", url: "/" },
              {
                i18n: "GamificationLayers",
                url: "/projects/:project_id/gamification-layers"
              },
              { i18n: "GamificationLayerForm", active: true }
            ],
            pageTitle: "GamificationLayerForm",
            rule: ["user"]
          }
        },
        {
          path: "/documentation",
          name: "documentation",
          component: () => import("@/views/pages/FAQ.vue"),
          meta: {
            rule: ["*"],
            breadcrumb: [
              { i18n: "Home", url: "/" },
              { i18n: "Documentation.Title", active: true }
            ]
          }
        },
        {
          path: "/support",
          name: "support",
          component: () => import("@/views/pages/Support"),
          meta: {
            rule: ["*"],
            breadcrumb: [
              { i18n: "Home", url: "/" },
              { i18n: "Support.Title", active: true }
            ]
          }
        }
      ]
    },
    {
      path: "",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      children: [
        {
          path: "/pages/login",
          name: "pageLogin",
          component: () => import("@/views/pages/Login.vue"),
          meta: {
            rule: ["*"]
          }
        },
        {
          path: "/pages/register",
          name: "pageRegister",
          component: () => import("@/views/pages/Register.vue"),
          meta: {
            rule: ["*"]
          }
        },
        {
          path: "/pages/verify-email",
          name: "pageVerifyEmail",
          component: () => import("@/views/pages/VerifyEmail.vue"),
          props: route => ({ ...route.params, ...route.query }),
          meta: {
            rule: ["*"]
          }
        },
        {
          path: "/401",
          name: "error401",
          component: () => import("@/views/pages/Error401.vue"),
          meta: {
            rule: ["*"]
          }
        },
        {
          path: "/403",
          name: "error403",
          component: () => import("@/views/pages/Error403.vue"),
          meta: {
            rule: ["*"]
          }
        },
        {
          path: "/404",
          name: "error404",
          component: () => import("@/views/pages/Error404.vue"),
          meta: {
            rule: ["*"]
          }
        },
        {
          path: "/500",
          name: "error500",
          component: () => import("@/views/pages/Error500.vue"),
          meta: {
            rule: ["*"]
          }
        },
        {
          path: "/maintenance",
          name: "pageMaintenance",
          component: () => import("@/views/pages/Maintenance.vue"),
          meta: {
            rule: ["*"]
          }
        },
        {
          path: "/pages/forgot-password",
          name: "pageForgotPassword",
          component: () => import("@/views/pages/ForgotPassword.vue"),
          meta: {
            rule: ["admin"]
          }
        },
        {
          path: "/pages/reset-password",
          name: "pageResettPassword",
          component: () => import("@/views/pages/ResetPassword.vue"),
          props: route => ({ ...route.params, ...route.query }),
          meta: {
            rule: ["admin"]
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: "*",
      redirect: "/404",
      meta: {
        rule: ["*"]
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === "/home" && store.getters["auth/isAuthenticated"]) {
    router.push({ path: "/dashboard" });
    return next();
  }
  if (
    to.path === "/home" ||
    to.path === "/documentation" ||
    to.path === "/support" ||
    to.path === "/pages/login" ||
    to.path === "/pages/forgot-password" ||
    to.path === "/pages/reset-password" ||
    to.path === "/401" ||
    to.path === "/403" ||
    to.path === "/404" ||
    to.path === "/500" ||
    to.path === "/pages/register" ||
    to.path === "/pages/verify-email" ||
    to.path === "/maintenance" ||
    store.getters["auth/isAuthenticated"]
  ) {
    if (
      to.path === "/home" ||
      to.path.match(
        /\/(home|dashboard|projects|exercises|gamification-layers)\/?$/i
      )
    ) {
      store.dispatch(SHOW_SEARCH_ICON);
    } else {
      store.dispatch(HIDE_SEARCH_ICON);
    }
    const projectsPathMatch = to.path.match(/\/projects\/([^/]+)/i);
    if (projectsPathMatch) {
      if (
        !store.state.project.activeProject ||
        store.state.project.activeProject.id !== to.params.project_id
      ) {
        return store
          .dispatch(
            `${PROJECT_MODULE_BASE}/${PROJECT_GET}`,
            to.params.project_id
          )
          .then(res => {
            store.commit(`${PROJECT_MODULE_BASE}/${PROJECT_SET_ACTIVE}`, res);
            if (!store.state.permission.permissions[to.params.project_id]) {
              return store
                .dispatch(
                  `${PERMISSION_MODULE_BASE}/${PERMISSION_GET}`,
                  to.params.project_id
                )
                .then(() => {
                  return next();
                });
            }
            return next();
          });
      } else if (!store.state.permission.permissions[to.params.project_id]) {
        return store
          .dispatch(
            `${PERMISSION_MODULE_BASE}/${PERMISSION_GET}`,
            to.params.project_id
          )
          .then(() => next());
      } else {
        return next();
      }
    }
    return next();
  }
  router.push({ path: "/pages/login", query: { to: to.path } });
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
