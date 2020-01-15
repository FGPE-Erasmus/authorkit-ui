import challengeService from "@/api/challenges.service";
import {
  // actions
  CHALLENGE_GET,
  CHALLENGE_CREATE,
  CHALLENGE_UPDATE,
  CHALLENGE_LIST,
  CHALLENGE_DELETE,

  // mutations
  CHALLENGE_GET_REQUEST,
  CHALLENGE_GET_SUCCESS,
  CHALLENGE_GET_ERROR,
  CHALLENGE_CREATE_REQUEST,
  CHALLENGE_CREATE_SUCCESS,
  CHALLENGE_CREATE_ERROR,
  CHALLENGE_UPDATE_REQUEST,
  CHALLENGE_UPDATE_SUCCESS,
  CHALLENGE_UPDATE_ERROR,
  CHALLENGE_LIST_REQUEST,
  CHALLENGE_LIST_SUCCESS,
  CHALLENGE_LIST_ERROR,
  CHALLENGE_DELETE_REQUEST,
  CHALLENGE_DELETE_SUCCESS,
  CHALLENGE_DELETE_ERROR
} from "./challenge.constants";

const state = {
  loading: 0
};

const getters = {};

const actions = {
  [CHALLENGE_GET]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(CHALLENGE_GET_REQUEST);
      challengeService
        .authenticate(rootState.auth.token)
        .getOne(id)
        .then(res => {
          commit(CHALLENGE_GET_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(CHALLENGE_GET_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [CHALLENGE_LIST]: ({ commit, rootState }, query) => {
    return new Promise((resolve, reject) => {
      commit(CHALLENGE_LIST_REQUEST);
      challengeService
        .authenticate(rootState.auth.token)
        .list(query)
        .then(res => {
          commit(CHALLENGE_LIST_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(CHALLENGE_LIST_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [CHALLENGE_CREATE]: ({ commit, rootState }, challenge) => {
    return new Promise((resolve, reject) => {
      commit(CHALLENGE_CREATE_REQUEST);
      challengeService
        .authenticate(rootState.auth.token)
        .create(challenge)
        .then(res => {
          commit(CHALLENGE_CREATE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(CHALLENGE_CREATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [CHALLENGE_UPDATE]: ({ commit, rootState }, { id, challenge }) => {
    return new Promise((resolve, reject) => {
      commit(CHALLENGE_UPDATE_REQUEST);
      challengeService
        .authenticate(rootState.auth.token)
        .update(id, challenge)
        .then(res => {
          commit(CHALLENGE_UPDATE_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(CHALLENGE_UPDATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [CHALLENGE_DELETE]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(CHALLENGE_DELETE_REQUEST);
      challengeService
        .authenticate(rootState.auth.token)
        .delete(id)
        .then(res => {
          commit(CHALLENGE_DELETE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(CHALLENGE_DELETE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  }
};

const mutations = {
  [CHALLENGE_CREATE_REQUEST]: state => {
    state.loading++;
  },
  [CHALLENGE_CREATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [CHALLENGE_CREATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [CHALLENGE_UPDATE_REQUEST]: state => {
    state.loading++;
  },
  [CHALLENGE_UPDATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [CHALLENGE_UPDATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [CHALLENGE_GET_REQUEST]: state => {
    state.loading++;
  },
  [CHALLENGE_GET_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [CHALLENGE_GET_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [CHALLENGE_LIST_REQUEST]: state => {
    state.loading++;
  },
  [CHALLENGE_LIST_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [CHALLENGE_LIST_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [CHALLENGE_DELETE_REQUEST]: state => {
    state.loading++;
  },
  [CHALLENGE_DELETE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [CHALLENGE_DELETE_ERROR]: state => {
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
