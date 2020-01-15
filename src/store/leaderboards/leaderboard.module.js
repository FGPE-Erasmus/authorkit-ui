import leaderboardService from "@/api/leaderboards.service";
import {
  // actions
  LEADERBOARD_GET,
  LEADERBOARD_CREATE,
  LEADERBOARD_UPDATE,
  LEADERBOARD_LIST,
  LEADERBOARD_DELETE,

  // mutations
  LEADERBOARD_GET_REQUEST,
  LEADERBOARD_GET_SUCCESS,
  LEADERBOARD_GET_ERROR,
  LEADERBOARD_CREATE_REQUEST,
  LEADERBOARD_CREATE_SUCCESS,
  LEADERBOARD_CREATE_ERROR,
  LEADERBOARD_UPDATE_REQUEST,
  LEADERBOARD_UPDATE_SUCCESS,
  LEADERBOARD_UPDATE_ERROR,
  LEADERBOARD_LIST_REQUEST,
  LEADERBOARD_LIST_SUCCESS,
  LEADERBOARD_LIST_ERROR,
  LEADERBOARD_DELETE_REQUEST,
  LEADERBOARD_DELETE_SUCCESS,
  LEADERBOARD_DELETE_ERROR
} from "./leaderboard.constants";

const state = {
  loading: 0
};

const getters = {};

const actions = {
  [LEADERBOARD_GET]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(LEADERBOARD_GET_REQUEST);
      leaderboardService
        .authenticate(rootState.auth.token)
        .getOne(id)
        .then(res => {
          commit(LEADERBOARD_GET_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(LEADERBOARD_GET_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [LEADERBOARD_LIST]: ({ commit, rootState }, query) => {
    return new Promise((resolve, reject) => {
      commit(LEADERBOARD_LIST_REQUEST);
      leaderboardService
        .authenticate(rootState.auth.token)
        .list(query)
        .then(res => {
          commit(LEADERBOARD_LIST_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(LEADERBOARD_LIST_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [LEADERBOARD_CREATE]: ({ commit, rootState }, leaderboard) => {
    return new Promise((resolve, reject) => {
      commit(LEADERBOARD_CREATE_REQUEST);
      leaderboardService
        .authenticate(rootState.auth.token)
        .create(leaderboard)
        .then(res => {
          commit(LEADERBOARD_CREATE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(LEADERBOARD_CREATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [LEADERBOARD_UPDATE]: ({ commit, rootState }, { id, leaderboard }) => {
    return new Promise((resolve, reject) => {
      commit(LEADERBOARD_UPDATE_REQUEST);
      leaderboardService
        .authenticate(rootState.auth.token)
        .update(id, leaderboard)
        .then(res => {
          commit(LEADERBOARD_UPDATE_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(LEADERBOARD_UPDATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [LEADERBOARD_DELETE]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(LEADERBOARD_DELETE_REQUEST);
      leaderboardService
        .authenticate(rootState.auth.token)
        .delete(id)
        .then(res => {
          commit(LEADERBOARD_DELETE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(LEADERBOARD_DELETE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  }
};

const mutations = {
  [LEADERBOARD_CREATE_REQUEST]: state => {
    state.loading++;
  },
  [LEADERBOARD_CREATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [LEADERBOARD_CREATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [LEADERBOARD_UPDATE_REQUEST]: state => {
    state.loading++;
  },
  [LEADERBOARD_UPDATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [LEADERBOARD_UPDATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [LEADERBOARD_GET_REQUEST]: state => {
    state.loading++;
  },
  [LEADERBOARD_GET_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [LEADERBOARD_GET_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [LEADERBOARD_LIST_REQUEST]: state => {
    state.loading++;
  },
  [LEADERBOARD_LIST_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [LEADERBOARD_LIST_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [LEADERBOARD_DELETE_REQUEST]: state => {
    state.loading++;
  },
  [LEADERBOARD_DELETE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [LEADERBOARD_DELETE_ERROR]: state => {
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
