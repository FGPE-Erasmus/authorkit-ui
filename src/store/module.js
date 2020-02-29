import { parseQuery } from "@/assets/utils/search-query-parser";
import {
  STORAGE_THEME_LIGHTS,
  STORAGE_I18N_LOCALE,
  STORAGE_LAST_USED_VALUES,

  // actions
  TOGGLE_LIGHTS,
  SHOW_SEARCH_ICON,
  HIDE_SEARCH_ICON,
  UPDATE_I18N_LOCALE,
  UPDATE_LAST_USED_FIELD_VALUES,
  UPDATE_SEARCH_QUERY,

  // mutations
  THEME_TOGGLE_LIGHTS,
  THEME_SEARCH_ICON,
  THEME_UPDATE_SIDEBAR_WIDTH,
  THEME_UPDATE_SIDEBAR_ICONS_ONLY,
  THEME_TOGGLE_REDUCE_BUTTON,
  THEME_TOGGLE_CONTENT_OVERLAY,
  THEME_TOGGLE_IS_SIDEBAR_ACTIVE,
  THEME_UPDATE_WINDOW_BREAKPOINT,
  SETTINGS_UPDATE_I18N_LOCALE,
  SETTINGS_UPDATE_LAST_USED_FIELD_VALUES,
  SESSION_UPDATE_SEARCH_QUERY
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
    lights: localStorage.getItem(STORAGE_THEME_LIGHTS) !== "false",
    showSearchIcon: false
  },
  last_used_values: (localStorage.getItem(STORAGE_LAST_USED_VALUES) &&
    JSON.parse(localStorage.getItem(STORAGE_LAST_USED_VALUES))) || {
    nat_lang: "en",
    lang: "python",
    format: "txt",
    difficulty: "easy",
    type: "blank_sheet",
    module: ""
  },
  locale: localStorage.getItem(STORAGE_I18N_LOCALE) || "en",

  searchQuery: undefined
};

const getters = {
  theme: state => (state.theme_settings.lights ? "light" : "dark"),
  loading: state =>
    state.loading ||
    state.auth.loading ||
    state.project.loading ||
    state.exercise.loading ||
    state.gamificationLayer.loading ||
    state.challenge.loading ||
    state.leaderboard.loading ||
    state.reward.loading ||
    state.rule.loading ||
    state.user.loading
};

const actions = {
  // theme actions
  [TOGGLE_LIGHTS]: ({ commit, state }) => {
    const lights = !state.theme_settings.lights;
    commit(THEME_TOGGLE_LIGHTS, lights);
    localStorage.setItem(STORAGE_THEME_LIGHTS, lights);
  },
  [SHOW_SEARCH_ICON]: ({ commit }) => {
    commit(THEME_SEARCH_ICON, true);
  },
  [HIDE_SEARCH_ICON]: ({ commit }) => {
    commit(THEME_SEARCH_ICON, false);
  },

  // settings
  [UPDATE_I18N_LOCALE]: ({ commit }, locale) => {
    commit(SETTINGS_UPDATE_I18N_LOCALE, locale);
    localStorage.setItem(STORAGE_I18N_LOCALE, locale);
  },

  // update last used options
  [UPDATE_LAST_USED_FIELD_VALUES]: ({ commit, state }, values) => {
    const last_used_values = {
      ...state.last_used_values,
      ...values
    };
    localStorage.setItem(
      STORAGE_LAST_USED_VALUES,
      JSON.stringify(last_used_values)
    );
    commit(SETTINGS_UPDATE_LAST_USED_FIELD_VALUES, last_used_values);
  },

  // search
  [UPDATE_SEARCH_QUERY]: ({ commit }, query) => {
    commit(
      SESSION_UPDATE_SEARCH_QUERY,
      parseQuery(query, {
        keywords: [
          "status",
          "type",
          "difficulty",
          "module",
          "event",
          "platform"
        ],
        tokenize: true
      })
    );
  }
};

const mutations = {
  // theme
  [THEME_TOGGLE_LIGHTS]: (state, toggle) => {
    state.theme_settings.lights = toggle;
  },
  [THEME_SEARCH_ICON]: (state, toggle) => {
    state.theme_settings.showSearchIcon = toggle;
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
  },
  [SETTINGS_UPDATE_LAST_USED_FIELD_VALUES]: (state, values) => {
    state.last_used_values = values;
  },

  // session
  [SESSION_UPDATE_SEARCH_QUERY]: (state, val) => {
    state.searchQuery = val;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
