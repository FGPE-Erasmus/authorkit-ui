import projectService from "@/api/projects.service";
import {
  // actions
  PROJECT_GET,
  PROJECT_CREATE,
  PROJECT_UPDATE,
  PROJECT_LIST,
  PROJECT_EXPORT,
  PROJECT_DELETE,

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
  PROJECT_EXPORT_REQUEST,
  PROJECT_EXPORT_SUCCESS,
  PROJECT_EXPORT_ERROR,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_ERROR,
  PROJECT_SET_ACTIVE
} from "./project.constants";

const state = {
  loading: 0,
  activeProject: undefined
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

  [PROJECT_CREATE]: ({ commit, rootState }, project) => {
    return new Promise((resolve, reject) => {
      commit(PROJECT_CREATE_REQUEST);
      projectService
        .authenticate(rootState.auth.token)
        .create(project)
        .then(res => {
          commit(PROJECT_CREATE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(PROJECT_CREATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [PROJECT_UPDATE]: ({ commit, rootState }, { id, project }) => {
    return new Promise((resolve, reject) => {
      commit(PROJECT_UPDATE_REQUEST);
      projectService
        .authenticate(rootState.auth.token)
        .update(id, project)
        .then(res => {
          commit(PROJECT_UPDATE_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(PROJECT_UPDATE_ERROR, err.response.data);
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
          commit(PROJECT_EXPORT_ERROR, err.response.data);
          reject(err.response.data);
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

  [PROJECT_EXPORT_REQUEST]: state => {
    state.loading++;
  },
  [PROJECT_EXPORT_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [PROJECT_EXPORT_ERROR]: state => {
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
