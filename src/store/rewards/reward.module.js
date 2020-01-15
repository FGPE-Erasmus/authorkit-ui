import rewardService from "@/api/rewards.service";
import {
  // actions
  REWARD_GET,
  REWARD_CREATE,
  REWARD_UPDATE,
  REWARD_LIST,
  REWARD_DELETE,

  // mutations
  REWARD_GET_REQUEST,
  REWARD_GET_SUCCESS,
  REWARD_GET_ERROR,
  REWARD_CREATE_REQUEST,
  REWARD_CREATE_SUCCESS,
  REWARD_CREATE_ERROR,
  REWARD_UPDATE_REQUEST,
  REWARD_UPDATE_SUCCESS,
  REWARD_UPDATE_ERROR,
  REWARD_LIST_REQUEST,
  REWARD_LIST_SUCCESS,
  REWARD_LIST_ERROR,
  REWARD_DELETE_REQUEST,
  REWARD_DELETE_SUCCESS,
  REWARD_DELETE_ERROR
} from "./reward.constants";

const state = {
  loading: 0
};

const getters = {};

const actions = {
  [REWARD_GET]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(REWARD_GET_REQUEST);
      rewardService
        .authenticate(rootState.auth.token)
        .getOne(id)
        .then(res => {
          commit(REWARD_GET_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(REWARD_GET_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [REWARD_LIST]: ({ commit, rootState }, query) => {
    return new Promise((resolve, reject) => {
      commit(REWARD_LIST_REQUEST);
      rewardService
        .authenticate(rootState.auth.token)
        .list(query)
        .then(res => {
          commit(REWARD_LIST_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(REWARD_LIST_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [REWARD_CREATE]: ({ commit, rootState }, reward) => {
    return new Promise((resolve, reject) => {
      commit(REWARD_CREATE_REQUEST);
      rewardService
        .authenticate(rootState.auth.token)
        .create(reward)
        .then(res => {
          commit(REWARD_CREATE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(REWARD_CREATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [REWARD_UPDATE]: ({ commit, rootState }, { id, reward }) => {
    return new Promise((resolve, reject) => {
      commit(REWARD_UPDATE_REQUEST);
      rewardService
        .authenticate(rootState.auth.token)
        .update(id, reward)
        .then(res => {
          commit(REWARD_UPDATE_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(REWARD_UPDATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [REWARD_DELETE]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(REWARD_DELETE_REQUEST);
      rewardService
        .authenticate(rootState.auth.token)
        .delete(id)
        .then(res => {
          commit(REWARD_DELETE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(REWARD_DELETE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  }
};

const mutations = {
  [REWARD_CREATE_REQUEST]: state => {
    state.loading++;
  },
  [REWARD_CREATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [REWARD_CREATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [REWARD_UPDATE_REQUEST]: state => {
    state.loading++;
  },
  [REWARD_UPDATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [REWARD_UPDATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [REWARD_GET_REQUEST]: state => {
    state.loading++;
  },
  [REWARD_GET_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [REWARD_GET_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [REWARD_LIST_REQUEST]: state => {
    state.loading++;
  },
  [REWARD_LIST_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [REWARD_LIST_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [REWARD_DELETE_REQUEST]: state => {
    state.loading++;
  },
  [REWARD_DELETE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [REWARD_DELETE_ERROR]: state => {
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
