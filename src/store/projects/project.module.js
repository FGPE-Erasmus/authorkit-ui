import projectService from "@/api/projects.service";
import {
  // actions
  PROJECT_GET,
  PROJECT_CREATE,
  PROJECT_UPDATE,
  PROJECT_LIST,
  PROJECT_LIST_PUBLIC,
  PROJECT_SHARES,
  PROJECT_IMPORT,
  PROJECT_EXPORT,
  PROJECT_EXPORT_PUBLIC,
  PROJECT_DELETE,
  PROJECT_CREATE_PERMISSION,
  PROJECT_UPDATE_PERMISSION,
  PROJECT_DELETE_PERMISSION,

  // mutations
  PROJECT_GET_REQUEST,
  PROJECT_GET_SUCCESS,
  PROJECT_GET_ERROR,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_ERROR,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_ERROR,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_ERROR,
  PROJECT_LIST_PUBLIC_REQUEST,
  PROJECT_LIST_PUBLIC_SUCCESS,
  PROJECT_LIST_PUBLIC_ERROR,
  PROJECT_SHARES_REQUEST,
  PROJECT_SHARES_SUCCESS,
  PROJECT_SHARES_ERROR,
  PROJECT_IMPORT_REQUEST,
  PROJECT_IMPORT_SUCCESS,
  PROJECT_IMPORT_ERROR,
  PROJECT_EXPORT_REQUEST,
  PROJECT_EXPORT_SUCCESS,
  PROJECT_EXPORT_ERROR,
  PROJECT_EXPORT_PUBLIC_REQUEST,
  PROJECT_EXPORT_PUBLIC_SUCCESS,
  PROJECT_EXPORT_PUBLIC_ERROR,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_ERROR,
  PROJECT_CREATE_PERMISSION_REQUEST,
  PROJECT_CREATE_PERMISSION_SUCCESS,
  PROJECT_CREATE_PERMISSION_ERROR,
  PROJECT_UPDATE_PERMISSION_REQUEST,
  PROJECT_UPDATE_PERMISSION_SUCCESS,
  PROJECT_UPDATE_PERMISSION_ERROR,
  PROJECT_DELETE_PERMISSION_REQUEST,
  PROJECT_DELETE_PERMISSION_SUCCESS,
  PROJECT_DELETE_PERMISSION_ERROR,
  PROJECT_SET_ACTIVE,
  PROJECT_SET_ACTIVE_ACCESS_LEVEL
} from "./project.constants";

import {
  MODULE_BASE as PERMISSION_MODULE_BASE,
  PERMISSION_GET,
  PERMISSION_GET_ALL
} from "../permissions/permission.constants";

const state = {
  loading: 0,
  activeProject: undefined,
  accessLevel: undefined
};

const getters = {};

const actions = {
  [PROJECT_GET]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(PROJECT_GET_REQUEST);
      projectService
        .authenticate(rootState.auth.token)
        .getOne(id)
        .then(res => {
          commit(PROJECT_GET_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(PROJECT_GET_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [PROJECT_LIST]: ({ commit, rootState }, query) => {
    return new Promise((resolve, reject) => {
      commit(PROJECT_LIST_REQUEST);
      projectService
        .authenticate(rootState.auth.token)
        .list(query)
        .then(res => {
          commit(PROJECT_LIST_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(PROJECT_LIST_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [PROJECT_LIST_PUBLIC]: ({ commit }, query) => {
    return new Promise((resolve, reject) => {
      commit(PROJECT_LIST_PUBLIC_REQUEST);
      projectService
        .listPublic(query)
        .then(res => {
          commit(PROJECT_LIST_PUBLIC_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(PROJECT_LIST_PUBLIC_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [PROJECT_CREATE]: ({ dispatch, commit, rootState }, project) => {
    return new Promise((resolve, reject) => {
      commit(PROJECT_CREATE_REQUEST);
      projectService
        .authenticate(rootState.auth.token)
        .create(project)
        .then(res => {
          commit(PROJECT_CREATE_SUCCESS, res.data);

          dispatch(`${PERMISSION_MODULE_BASE}/${PERMISSION_GET}`, res.data.id, {
            root: true
          });

          resolve(res.data);
        })
        .catch(err => {
          commit(PROJECT_CREATE_ERROR, err.response.data);

          reject(err.response.data);
        });
    });
  },

  [PROJECT_UPDATE]: ({ dispatch, commit, rootState }, { id, project }) => {
    return new Promise((resolve, reject) => {
      commit(PROJECT_UPDATE_REQUEST);
      projectService
        .authenticate(rootState.auth.token)
        .update(id, project)
        .then(res => {
          commit(PROJECT_UPDATE_SUCCESS, res.data);

          dispatch(`${PERMISSION_MODULE_BASE}/${PERMISSION_GET}`, res.data.id, {
            root: true
          });

          resolve(res.data);
        })
        .catch(err => {
          commit(PROJECT_UPDATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [PROJECT_IMPORT]: ({ dispatch, commit, rootState }, { file }) => {
    return new Promise((resolve, reject) => {
      commit(PROJECT_IMPORT_REQUEST);
      projectService
        .authenticate(rootState.auth.token)
        .import({ file })
        .then(res => {
          commit(PROJECT_IMPORT_SUCCESS, res.data);

          dispatch(
            `${PERMISSION_MODULE_BASE}/${PERMISSION_GET_ALL}`,
            res.data.id,
            {
              root: true
            }
          );

          resolve(res.data);
        })
        .catch(err => {
          commit(PROJECT_IMPORT_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [PROJECT_SHARES]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(PROJECT_SHARES_REQUEST);
      projectService
        .authenticate(rootState.auth.token)
        .getProjectShares(id)
        .then(res => {
          commit(PROJECT_SHARES_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(PROJECT_SHARES_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [PROJECT_CREATE_PERMISSION]: ({ commit, rootState }, obj) => {
    return new Promise((resolve, reject) => {
      commit(PROJECT_CREATE_PERMISSION_REQUEST);
      projectService
        .authenticate(rootState.auth.token)
        .shareByEmail(obj)
        .then(res => {
          commit(PROJECT_CREATE_PERMISSION_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(PROJECT_CREATE_PERMISSION_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [PROJECT_UPDATE_PERMISSION]: ({ commit, rootState }, obj) => {
    return new Promise((resolve, reject) => {
      commit(PROJECT_UPDATE_PERMISSION_REQUEST);
      projectService
        .authenticate(rootState.auth.token)
        .share(obj)
        .then(res => {
          commit(PROJECT_UPDATE_PERMISSION_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(PROJECT_UPDATE_PERMISSION_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [PROJECT_DELETE_PERMISSION]: ({ commit, rootState }, obj) => {
    return new Promise((resolve, reject) => {
      commit(PROJECT_DELETE_PERMISSION_REQUEST);
      projectService
        .authenticate(rootState.auth.token)
        .revoke(obj)
        .then(res => {
          commit(PROJECT_DELETE_PERMISSION_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(PROJECT_DELETE_PERMISSION_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [PROJECT_EXPORT]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(PROJECT_EXPORT_REQUEST);
      projectService
        .authenticate(rootState.auth.token)
        .export(id)
        .then(res => {
          commit(PROJECT_EXPORT_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          const data = err.response ? err.response.data : err;
          commit(PROJECT_EXPORT_ERROR, data);
          reject(data);
        });
    });
  },

  [PROJECT_EXPORT_PUBLIC]: ({ commit }, id) => {
    return new Promise((resolve, reject) => {
      commit(PROJECT_EXPORT_PUBLIC_REQUEST);
      projectService
        .exportPublic(id)
        .then(res => {
          commit(PROJECT_EXPORT_PUBLIC_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          const data = err.response ? err.response.data : err;
          commit(PROJECT_EXPORT_PUBLIC_ERROR, data);
          reject(data);
        });
    });
  },

  [PROJECT_DELETE]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(PROJECT_DELETE_REQUEST);
      projectService
        .authenticate(rootState.auth.token)
        .delete(id)
        .then(res => {
          commit(PROJECT_DELETE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(PROJECT_DELETE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  }
};

const mutations = {
  [PROJECT_CREATE_REQUEST]: state => {
    state.loading++;
  },
  [PROJECT_CREATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [PROJECT_CREATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [PROJECT_UPDATE_REQUEST]: state => {
    state.loading++;
  },
  [PROJECT_UPDATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [PROJECT_UPDATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [PROJECT_GET_REQUEST]: state => {
    state.loading++;
  },
  [PROJECT_GET_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [PROJECT_GET_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [PROJECT_LIST_REQUEST]: state => {
    state.loading++;
  },
  [PROJECT_LIST_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [PROJECT_LIST_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [PROJECT_LIST_PUBLIC_REQUEST]: state => {
    state.loading++;
  },
  [PROJECT_LIST_PUBLIC_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [PROJECT_LIST_PUBLIC_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [PROJECT_SHARES_REQUEST]: state => {
    state.loading++;
  },
  [PROJECT_SHARES_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [PROJECT_SHARES_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [PROJECT_CREATE_PERMISSION_REQUEST]: state => {
    state.loading++;
  },
  [PROJECT_CREATE_PERMISSION_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [PROJECT_CREATE_PERMISSION_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [PROJECT_UPDATE_PERMISSION_REQUEST]: state => {
    state.loading++;
  },
  [PROJECT_UPDATE_PERMISSION_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [PROJECT_UPDATE_PERMISSION_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [PROJECT_DELETE_PERMISSION_REQUEST]: state => {
    state.loading++;
  },
  [PROJECT_DELETE_PERMISSION_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [PROJECT_DELETE_PERMISSION_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [PROJECT_IMPORT_REQUEST]: state => {
    state.loading++;
  },
  [PROJECT_IMPORT_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [PROJECT_IMPORT_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [PROJECT_EXPORT_REQUEST]: state => {
    state.loading++;
  },
  [PROJECT_EXPORT_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [PROJECT_EXPORT_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [PROJECT_EXPORT_PUBLIC_REQUEST]: state => {
    state.loading++;
  },
  [PROJECT_EXPORT_PUBLIC_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [PROJECT_EXPORT_PUBLIC_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [PROJECT_DELETE_REQUEST]: state => {
    state.loading++;
  },
  [PROJECT_DELETE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [PROJECT_DELETE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [PROJECT_SET_ACTIVE]: (state, project) => {
    state.activeProject = project;
  },

  [PROJECT_SET_ACTIVE_ACCESS_LEVEL]: (state, accessLevel) => {
    state.accessLevel = accessLevel;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
