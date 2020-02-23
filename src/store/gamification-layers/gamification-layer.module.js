import gamificationlayerService from "@/api/gamification-layers.service";
import {
  // actions
  GAMIFICATION_LAYER_GET,
  GAMIFICATION_LAYER_CREATE,
  GAMIFICATION_LAYER_UPDATE,
  GAMIFICATION_LAYER_LIST,
  GAMIFICATION_LAYER_DELETE,
  GAMIFICATION_LAYER_EXPORT,

  // mutations
  GAMIFICATION_LAYER_GET_REQUEST,
  GAMIFICATION_LAYER_GET_SUCCESS,
  GAMIFICATION_LAYER_GET_ERROR,
  GAMIFICATION_LAYER_CREATE_REQUEST,
  GAMIFICATION_LAYER_CREATE_SUCCESS,
  GAMIFICATION_LAYER_CREATE_ERROR,
  GAMIFICATION_LAYER_UPDATE_REQUEST,
  GAMIFICATION_LAYER_UPDATE_SUCCESS,
  GAMIFICATION_LAYER_UPDATE_ERROR,
  GAMIFICATION_LAYER_LIST_REQUEST,
  GAMIFICATION_LAYER_LIST_SUCCESS,
  GAMIFICATION_LAYER_LIST_ERROR,
  GAMIFICATION_LAYER_DELETE_REQUEST,
  GAMIFICATION_LAYER_DELETE_SUCCESS,
  GAMIFICATION_LAYER_DELETE_ERROR,
  GAMIFICATION_LAYER_EXPORT_REQUEST,
  GAMIFICATION_LAYER_EXPORT_SUCCESS,
  GAMIFICATION_LAYER_EXPORT_ERROR
} from "./gamification-layer.constants";

const state = {
  loading: 0
};

const getters = {};

const actions = {
  [GAMIFICATION_LAYER_GET]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(GAMIFICATION_LAYER_GET_REQUEST);
      gamificationlayerService
        .authenticate(rootState.auth.token)
        .getOne(id)
        .then(res => {
          commit(GAMIFICATION_LAYER_GET_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(GAMIFICATION_LAYER_GET_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [GAMIFICATION_LAYER_LIST]: ({ commit, rootState }, query) => {
    return new Promise((resolve, reject) => {
      commit(GAMIFICATION_LAYER_LIST_REQUEST);
      gamificationlayerService
        .authenticate(rootState.auth.token)
        .list(query)
        .then(res => {
          commit(GAMIFICATION_LAYER_LIST_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(GAMIFICATION_LAYER_LIST_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [GAMIFICATION_LAYER_CREATE]: ({ commit, rootState }, gamification_layer) => {
    return new Promise((resolve, reject) => {
      commit(GAMIFICATION_LAYER_CREATE_REQUEST);
      gamificationlayerService
        .authenticate(rootState.auth.token)
        .create(gamification_layer)
        .then(res => {
          commit(GAMIFICATION_LAYER_CREATE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(GAMIFICATION_LAYER_CREATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [GAMIFICATION_LAYER_UPDATE]: (
    { commit, rootState },
    { id, gamification_layer }
  ) => {
    return new Promise((resolve, reject) => {
      commit(GAMIFICATION_LAYER_UPDATE_REQUEST);
      gamificationlayerService
        .authenticate(rootState.auth.token)
        .update(id, gamification_layer)
        .then(res => {
          commit(GAMIFICATION_LAYER_UPDATE_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(GAMIFICATION_LAYER_UPDATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [GAMIFICATION_LAYER_DELETE]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(GAMIFICATION_LAYER_DELETE_REQUEST);
      gamificationlayerService
        .authenticate(rootState.auth.token)
        .delete(id)
        .then(res => {
          commit(GAMIFICATION_LAYER_DELETE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(GAMIFICATION_LAYER_DELETE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [GAMIFICATION_LAYER_EXPORT]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(GAMIFICATION_LAYER_EXPORT_REQUEST);
      gamificationlayerService
        .authenticate(rootState.auth.token)
        .export(id)
        .then(res => {
          commit(GAMIFICATION_LAYER_EXPORT_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(GAMIFICATION_LAYER_EXPORT_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  }
};

const mutations = {
  [GAMIFICATION_LAYER_CREATE_REQUEST]: state => {
    state.loading++;
  },
  [GAMIFICATION_LAYER_CREATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [GAMIFICATION_LAYER_CREATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [GAMIFICATION_LAYER_UPDATE_REQUEST]: state => {
    state.loading++;
  },
  [GAMIFICATION_LAYER_UPDATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [GAMIFICATION_LAYER_UPDATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [GAMIFICATION_LAYER_GET_REQUEST]: state => {
    state.loading++;
  },
  [GAMIFICATION_LAYER_GET_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [GAMIFICATION_LAYER_GET_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [GAMIFICATION_LAYER_LIST_REQUEST]: state => {
    state.loading++;
  },
  [GAMIFICATION_LAYER_LIST_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [GAMIFICATION_LAYER_LIST_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [GAMIFICATION_LAYER_DELETE_REQUEST]: state => {
    state.loading++;
  },
  [GAMIFICATION_LAYER_DELETE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [GAMIFICATION_LAYER_DELETE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [GAMIFICATION_LAYER_EXPORT_REQUEST]: state => {
    state.loading++;
  },
  [GAMIFICATION_LAYER_EXPORT_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [GAMIFICATION_LAYER_EXPORT_ERROR]: state => {
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
