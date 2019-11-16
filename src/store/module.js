import {
  STORAGE_THEME_LIGHTS,
  STORAGE_I18N_LOCALE,

  // actions
  TOGGLE_LIGHTS,
  UPDATE_I18N_LOCALE,

  // mutations
  THEME_TOGGLE_LIGHTS,
  THEME_UPDATE_SIDEBAR_WIDTH,
  THEME_UPDATE_SIDEBAR_ICONS_ONLY,
  THEME_TOGGLE_REDUCE_BUTTON,
  THEME_TOGGLE_CONTENT_OVERLAY,
  THEME_TOGGLE_IS_SIDEBAR_ACTIVE,
  THEME_UPDATE_WINDOW_BREAKPOINT,
  SETTINGS_UPDATE_I18N_LOCALE,
  USER_UPDATE_ROLE
} from "./constants";

const state = {
  loading: 0,
  isSidebarActive: true,
  breakpoint: null,
  sidebarWidth: "default",
  reduceButton: false,
  bodyOverlay: false,
  sidebarItemsIconOnly: false,
  searchableItems: [],

  userRole: null,
  theme_settings: {
    lights: localStorage.getItem(STORAGE_THEME_LIGHTS) !== "false"
  },
  locale: localStorage.getItem(STORAGE_I18N_LOCALE) || "en",
  activeUser: undefined,
  activeProject: undefined
};

const getters = {
  theme: state => (state.theme_settings.lights ? "light" : "dark"),
  loading: state =>
    state.loading ||
    state.auth.loading ||
    state.project.loading ||
    state.exercise.loading ||
    state.user.loading
};

const actions = {
  // theme actions
  [TOGGLE_LIGHTS]: ({ commit, state }) => {
    const lights = !state.theme_settings.lights;
    commit(THEME_TOGGLE_LIGHTS, lights);
    localStorage.setItem(STORAGE_THEME_LIGHTS, lights);
  },

  // settings
  [UPDATE_I18N_LOCALE]: ({ commit }, locale) => {
    commit(SETTINGS_UPDATE_I18N_LOCALE, locale);
    localStorage.setItem(STORAGE_I18N_LOCALE, locale);
  },

  // active user
  updateUserRole({ commit }, val) {
    commit("UPDATE_USER_ROLE", val);
  }
};

const mutations = {
  [USER_UPDATE_ROLE]: (state, val) => {
    state.userRole = val;
    localStorage.setItem("userRole", val);
  },

  // theme
  [THEME_TOGGLE_LIGHTS]: (state, toggle) => {
    state.theme_settings.lights = toggle;
  },
  [THEME_UPDATE_SIDEBAR_WIDTH]: (state, width) => {
    state.sidebarWidth = width;
  },
  [THEME_UPDATE_SIDEBAR_ICONS_ONLY]: (state, val) => {
    state.sidebarItemsIconOnly = val;
  },
  [THEME_TOGGLE_REDUCE_BUTTON]: (state, val) => {
    state.reduceButton = val;
  },
  [THEME_TOGGLE_CONTENT_OVERLAY]: (state, val) => {
    state.bodyOverlay = val;
  },
  [THEME_TOGGLE_IS_SIDEBAR_ACTIVE]: (state, val) => {
    state.isSidebarActive = val;
  },
  [THEME_UPDATE_WINDOW_BREAKPOINT]: (state, val) => {
    state.breakpoint = val;
  },

  // settings
  [SETTINGS_UPDATE_I18N_LOCALE]: (state, locale) => {
    state.locale = locale;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
