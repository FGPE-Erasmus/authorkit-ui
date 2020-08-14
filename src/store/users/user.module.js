import userService from "@/api/users.service";
import {
  // actions
  USER_ME,
  USER_GET,
  USER_CREATE,
  USER_UPDATE,
  USER_CHANGE_PASSWORD,
  USER_LIST,
  USER_DELETE,

  // mutations
  USER_ME_REQUEST,
  USER_ME_SUCCESS,
  USER_ME_ERROR,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_ERROR,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_ERROR,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_ERROR,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PASSWORD_ERROR,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_ERROR
} from "./user.constants";

import {
  MODULE_BASE as AUTH_MODULE_BASE,
  AUTH_FETCH_AUTHENTICATED_USER_SUCCESS
} from "../auth/auth.constants";

const state = {
  loading: 0
};

const getters = {};

const actions = {
  [USER_ME]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit(USER_ME_REQUEST);
      userService
        .authenticate(rootState.auth.token)
        .me()
        .then(res => {
          commit(USER_ME_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(USER_ME_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [USER_GET]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(USER_GET_REQUEST);
      userService
        .authenticate(rootState.auth.token)
        .getOne(id)
        .then(res => {
          commit(USER_GET_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(USER_GET_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [USER_LIST]: ({ commit, rootState }, query) => {
    return new Promise((resolve, reject) => {
      commit(USER_LIST_REQUEST);
      userService
        .authenticate(rootState.auth.token)
        .list(query)
        .then(res => {
          commit(USER_LIST_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(USER_LIST_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [USER_CREATE]: ({ commit, rootState }, user) => {
    return new Promise((resolve, reject) => {
      commit(USER_CREATE_REQUEST);
      userService
        .authenticate(rootState.auth.token)
        .create(user)
        .then(res => {
          commit(USER_CREATE_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(USER_CREATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [USER_UPDATE]: ({ commit, rootState }, { id, partial }) => {
    return new Promise((resolve, reject) => {
      commit(USER_UPDATE_REQUEST);
      userService
        .authenticate(rootState.auth.token)
        .update(id, partial)
        .then(res => {
          commit(USER_UPDATE_SUCCESS, res.data);
          if (rootState.auth.profile.id === id) {
            commit(
              `${AUTH_MODULE_BASE}/${AUTH_FETCH_AUTHENTICATED_USER_SUCCESS}`,
              res.data,
              {
                root: true
              }
            );
          }
          resolve(res.data);
        })
        .catch(err => {
          commit(USER_UPDATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [USER_CHANGE_PASSWORD]: (
    { commit, rootState },
    { old_password, new_password }
  ) => {
    return new Promise((resolve, reject) => {
      commit(USER_CHANGE_PASSWORD_REQUEST);
      userService
        .authenticate(rootState.auth.token)
        .changePassword({ old_password, new_password })
        .then(res => {
          commit(USER_CHANGE_PASSWORD_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(USER_CHANGE_PASSWORD_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [USER_DELETE]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(USER_DELETE_REQUEST);
      userService
        .authenticate(rootState.auth.token)
        .delete(id)
        .then(res => {
          commit(USER_DELETE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(USER_DELETE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  }
};

const mutations = {
  [USER_ME_REQUEST]: state => {
    state.loading++;
  },
  [USER_ME_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [USER_ME_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [USER_CREATE_REQUEST]: state => {
    state.loading++;
  },
  [USER_CREATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [USER_CREATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [USER_UPDATE_REQUEST]: state => {
    state.loading++;
  },
  [USER_UPDATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [USER_UPDATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [USER_GET_REQUEST]: state => {
    state.loading++;
  },
  [USER_GET_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [USER_GET_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [USER_LIST_REQUEST]: state => {
    state.loading++;
  },
  [USER_LIST_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [USER_LIST_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [USER_DELETE_REQUEST]: state => {
    state.loading++;
  },
  [USER_DELETE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [USER_DELETE_ERROR]: state => {
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
