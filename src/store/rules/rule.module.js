import ruleService from "@/api/rules.service";
import {
  // actions
  RULE_GET,
  RULE_CREATE,
  RULE_UPDATE,
  RULE_LIST,
  RULE_DELETE,

  // mutations
  RULE_GET_REQUEST,
  RULE_GET_SUCCESS,
  RULE_GET_ERROR,
  RULE_CREATE_REQUEST,
  RULE_CREATE_SUCCESS,
  RULE_CREATE_ERROR,
  RULE_UPDATE_REQUEST,
  RULE_UPDATE_SUCCESS,
  RULE_UPDATE_ERROR,
  RULE_LIST_REQUEST,
  RULE_LIST_SUCCESS,
  RULE_LIST_ERROR,
  RULE_DELETE_REQUEST,
  RULE_DELETE_SUCCESS,
  RULE_DELETE_ERROR
} from "./rule.constants";

const state = {
  loading: 0
};

const getters = {};

const actions = {
  [RULE_GET]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(RULE_GET_REQUEST);
      ruleService
        .authenticate(rootState.auth.token)
        .getOne(id)
        .then(res => {
          commit(RULE_GET_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(RULE_GET_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [RULE_LIST]: ({ commit, rootState }, query) => {
    return new Promise((resolve, reject) => {
      commit(RULE_LIST_REQUEST);
      ruleService
        .authenticate(rootState.auth.token)
        .list(query)
        .then(res => {
          commit(RULE_LIST_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(RULE_LIST_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [RULE_CREATE]: ({ commit, rootState }, rule) => {
    return new Promise((resolve, reject) => {
      commit(RULE_CREATE_REQUEST);
      ruleService
        .authenticate(rootState.auth.token)
        .create(rule)
        .then(res => {
          commit(RULE_CREATE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(RULE_CREATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [RULE_UPDATE]: ({ commit, rootState }, { id, rule }) => {
    return new Promise((resolve, reject) => {
      commit(RULE_UPDATE_REQUEST);
      ruleService
        .authenticate(rootState.auth.token)
        .update(id, rule)
        .then(res => {
          commit(RULE_UPDATE_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(RULE_UPDATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [RULE_DELETE]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(RULE_DELETE_REQUEST);
      ruleService
        .authenticate(rootState.auth.token)
        .delete(id)
        .then(res => {
          commit(RULE_DELETE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(RULE_DELETE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  }
};

const mutations = {
  [RULE_CREATE_REQUEST]: state => {
    state.loading++;
  },
  [RULE_CREATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [RULE_CREATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [RULE_UPDATE_REQUEST]: state => {
    state.loading++;
  },
  [RULE_UPDATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [RULE_UPDATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [RULE_GET_REQUEST]: state => {
    state.loading++;
  },
  [RULE_GET_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [RULE_GET_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [RULE_LIST_REQUEST]: state => {
    state.loading++;
  },
  [RULE_LIST_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [RULE_LIST_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [RULE_DELETE_REQUEST]: state => {
    state.loading++;
  },
  [RULE_DELETE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [RULE_DELETE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
