import permissionService from "@/api/permissions.service";

import {
  // actions
  PERMISSION_ADD,
  PERMISSION_EDIT,
  PERMISSION_REVOKE,
  PERMISSION_GET,
  PERMISSION_GET_ALL,

  // mutations
  PERMISSION_ADD_REQUEST,
  PERMISSION_ADD_SUCCESS,
  PERMISSION_ADD_ERROR,
  PERMISSION_EDIT_REQUEST,
  PERMISSION_EDIT_SUCCESS,
  PERMISSION_EDIT_ERROR,
  PERMISSION_REVOKE_REQUEST,
  PERMISSION_REVOKE_SUCCESS,
  PERMISSION_REVOKE_ERROR,
  PERMISSION_GET_ALL_REQUEST,
  PERMISSION_GET_ALL_SUCCESS,
  PERMISSION_GET_ALL_ERROR,
  PERMISSION_GET_REQUEST,
  PERMISSION_GET_SUCCESS,
  PERMISSION_GET_ERROR
} from "./permission.constants";

const state = {
  loading: 0,
  permissions: {}
};

const getters = {
  permissions: state => state.permissions
};

const actions = {
  [PERMISSION_GET]: ({ commit, rootState }, project_id) => {
    return new Promise((resolve, reject) => {
      commit(PERMISSION_GET_REQUEST);
      permissionService
        .authenticate(rootState.auth.token)
        .getPermission(project_id)
        .then(res => {
          commit(PERMISSION_GET_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(PERMISSION_GET_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [PERMISSION_GET_ALL]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      commit(PERMISSION_GET_ALL_REQUEST);
      permissionService
        .authenticate(rootState.auth.token)
        .getPermissions()
        .then(res => {
          commit(PERMISSION_GET_ALL_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(PERMISSION_GET_ALL_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [PERMISSION_ADD]: (
    { commit, rootState },
    { email, project_id, access_level }
  ) => {
    return new Promise((resolve, reject) => {
      commit(PERMISSION_ADD_REQUEST);
      permissionService
        .authenticate(rootState.auth.token)
        .shareByEmail({ email, project_id, access_level })
        .then(res => {
          commit(PERMISSION_ADD_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(PERMISSION_ADD_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [PERMISSION_EDIT]: (
    { commit, rootState },
    { user_id, project_id, access_level }
  ) => {
    return new Promise((resolve, reject) => {
      commit(PERMISSION_EDIT_REQUEST);
      permissionService
        .authenticate(rootState.auth.token)
        .share({ user_id, project_id, access_level })
        .then(res => {
          commit(PERMISSION_EDIT_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(PERMISSION_EDIT_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [PERMISSION_REVOKE]: ({ commit, rootState }, { user_id, project_id }) => {
    return new Promise((resolve, reject) => {
      commit(PERMISSION_REVOKE_REQUEST);
      permissionService
        .authenticate(rootState.auth.token)
        .revoke({ user_id, project_id })
        .then(res => {
          commit(PERMISSION_REVOKE_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(PERMISSION_REVOKE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  }
};

const mutations = {
  [PERMISSION_ADD_REQUEST]: state => {
    state.loading++;
  },
  [PERMISSION_ADD_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [PERMISSION_ADD_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [PERMISSION_EDIT_REQUEST]: state => {
    state.loading++;
  },
  [PERMISSION_EDIT_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [PERMISSION_EDIT_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [PERMISSION_REVOKE_REQUEST]: state => {
    state.loading++;
  },
  [PERMISSION_REVOKE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [PERMISSION_REVOKE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [PERMISSION_GET_REQUEST]: state => {
    state.loading++;
  },
  [PERMISSION_GET_SUCCESS]: (state, permission) => {
    state.loading = Math.max(state.loading - 1, 0);
    state.permissions[permission.project_id] = permission.access_level;
  },
  [PERMISSION_GET_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [PERMISSION_GET_ALL_REQUEST]: state => {
    state.loading++;
  },
  [PERMISSION_GET_ALL_SUCCESS]: (state, permissions) => {
    state.loading = Math.max(state.loading - 1, 0);
    state.permissions = permissions.reduce((obj, item) => {
      obj[item.project_id] = item.access_level;
      return obj;
    }, {});
  },
  [PERMISSION_GET_ALL_ERROR]: state => {
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
