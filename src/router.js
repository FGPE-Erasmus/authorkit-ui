/*
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
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
import {
  MODULE_BASE,
  PROJECT_GET,
  PROJECT_SET_ACTIVE
} from "@/store/projects/project.constants";

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
          path: "/",
          redirect: "/dashboard"
        },
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/views/projects/Projects.vue"),
          meta: {
            rule: "user"
          }
        },

        {
          path: "/projects/:project_id/exercises",
          name: "exercises",
          component: () => import("@/views/exercises/Exercises.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Exercises", active: true }
            ],
            pageTitle: "Exercises",
            rule: "user"
          }
        },
        {
          path: "/projects/:project_id/exercises/:id",
          name: "exercise-form",
          component: () => import("@/views/exercises/ExerciseForm.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Exercises", url: "/projects/:project_id/exercises" },
              { title: "Exercise Form", active: true }
            ],
            pageTitle: "Exercise Form",
            rule: "user"
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
          component: () => import("@/views/pages/Login.vue")
        },
        {
          path: "/pages/register",
          name: "pageRegister",
          component: () => import("@/views/pages/Register.vue")
        },
        {
          path: "/pages/verify-email",
          name: "pageVerifyEmail",
          component: () => import("@/views/pages/VerifyEmail.vue"),
          props: route => ({ ...route.params, ...route.query })
        },
        {
          path: "/401",
          name: "error401",
          component: () => import("@/views/pages/Error401.vue")
        },
        {
          path: "/403",
          name: "error403",
          component: () => import("@/views/pages/Error403.vue")
        },
        {
          path: "/404",
          name: "error404",
          component: () => import("@/views/pages/Error404.vue")
        },
        {
          path: "/500",
          name: "error500",
          component: () => import("@/views/pages/Error500.vue")
        },
        {
          path: "/maintenance",
          name: "pageMaintenance",
          component: () => import("@/views/pages/Maintenance.vue")
        },
        {
          path: "/pages/forgot-password",
          name: "pageForgotPassword",
          component: () => import("@/views/pages/ForgotPassword.vue"),
          meta: {
            rule: "admin"
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: "*",
      redirect: "/404"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (
    to.path === "/pages/login" ||
    to.path === "/pages/forgot-password" ||
    to.path === "/401" ||
    to.path === "/403" ||
    to.path === "/404" ||
    to.path === "/500" ||
    to.path === "/pages/register" ||
    to.path === "/pages/verify-email" ||
    to.path === "/maintenance" ||
    store.getters["auth/isAuthenticated"]
  ) {
    const projectsPathMatch = to.path.match(/\/projects\/([^/]+)/i);
    if (projectsPathMatch) {
      if (
        !store.state.project.activeProject ||
        store.state.project.activeProject.id !== projectsPathMatch[1]
      ) {
        return store
          .dispatch(`${MODULE_BASE}/${PROJECT_GET}`, to.params.project_id)
          .then(res => {
            store.commit(`${MODULE_BASE}/${PROJECT_SET_ACTIVE}`, res);
            next();
          });
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
