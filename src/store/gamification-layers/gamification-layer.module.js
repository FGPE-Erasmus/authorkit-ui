import gamificationlayerService from "@/api/gamification-layers.service";
import {
  // actions
  GAMIFICATION_LAYER_GET,
  GAMIFICATION_LAYER_CREATE,
  GAMIFICATION_LAYER_UPDATE,
  GAMIFICATION_LAYER_LIST,
  GAMIFICATION_LAYER_DELETE,
  GAMIFICATION_LAYER_IMPORT,
  GAMIFICATION_LAYER_EXPORT,
  GAMIFICATION_LAYER_TEMPLATES,
  GAMIFICATION_LAYER_CREATE_FROM_TEMPLATE,
  GAMIFICATION_LAYER_UPLOAD_TEMPLATE,
  GAMIFICATION_TEMPLATE_IMPORT,

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
  GAMIFICATION_LAYER_IMPORT_REQUEST,
  GAMIFICATION_LAYER_IMPORT_SUCCESS,
  GAMIFICATION_LAYER_IMPORT_ERROR,
  GAMIFICATION_LAYER_EXPORT_REQUEST,
  GAMIFICATION_LAYER_EXPORT_SUCCESS,
  GAMIFICATION_LAYER_EXPORT_ERROR,
  GAMIFICATION_LAYER_TEMPLATES_REQUEST,
  GAMIFICATION_LAYER_TEMPLATES_SUCCESS,
  GAMIFICATION_LAYER_TEMPLATES_ERROR,
  GAMIFICATION_LAYER_CREATE_FROM_TEMPLATE_REQUEST,
  GAMIFICATION_LAYER_CREATE_FROM_TEMPLATE_SUCCESS,
  GAMIFICATION_LAYER_CREATE_FROM_TEMPLATE_ERROR,
  GAMIFICATION_LAYER_UPLOAD_TEMPLATE_REQUEST,
  GAMIFICATION_LAYER_UPLOAD_TEMPLATE_SUCCESS,
  GAMIFICATION_LAYER_UPLOAD_TEMPLATE_ERROR,
  GAMIFICATION_TEMPLATE_IMPORT_REQUEST,
  GAMIFICATION_TEMPLATE_IMPORT_SUCCESS,
  GAMIFICATION_TEMPLATE_IMPORT_ERROR
} from "./gamification-layer.constants";

const state = {
  loading: 0
};

const getters = {};

const actions = {
  [GAMIFICATION_LAYER_TEMPLATES]: ({
    commit,
    rootState: { auth, project }
  }) => {
    return new Promise((resolve, reject) => {
      commit(GAMIFICATION_LAYER_TEMPLATES_REQUEST);
      gamificationlayerService
        .authenticate(auth.token)
        .onProject(project.activeProject && project.activeProject.id)
        .getTemplatesList()
        .then(res => {
          commit(GAMIFICATION_LAYER_TEMPLATES_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(GAMIFICATION_LAYER_TEMPLATES_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [GAMIFICATION_LAYER_CREATE_FROM_TEMPLATE]: (
    { commit, rootState },
    gamification_layer
  ) => {
    return new Promise((resolve, reject) => {
      commit(GAMIFICATION_LAYER_CREATE_FROM_TEMPLATE_REQUEST);
      gamificationlayerService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .createFromTemplate(gamification_layer)
        .then(res => {
          commit(GAMIFICATION_LAYER_CREATE_FROM_TEMPLATE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(
            GAMIFICATION_LAYER_CREATE_FROM_TEMPLATE_ERROR,
            err.response.data
          );
          reject(err.response.data);
        });
    });
  },

  [GAMIFICATION_LAYER_UPLOAD_TEMPLATE]: (
    { commit, rootState },
    gamification_layer
  ) => {
    return new Promise((resolve, reject) => {
      commit(GAMIFICATION_LAYER_UPLOAD_TEMPLATE_REQUEST);
      gamificationlayerService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .upload(gamification_layer)
        .then(res => {
          commit(GAMIFICATION_LAYER_UPLOAD_TEMPLATE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(GAMIFICATION_LAYER_UPLOAD_TEMPLATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [GAMIFICATION_LAYER_GET]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(GAMIFICATION_LAYER_GET_REQUEST);
      gamificationlayerService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
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
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
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
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
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
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
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
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
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

  [GAMIFICATION_TEMPLATE_IMPORT]: (
    { commit, rootState },
    { gl_name, file }
  ) => {
    return new Promise((resolve, reject) => {
      commit(GAMIFICATION_TEMPLATE_IMPORT_REQUEST);
      gamificationlayerService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .importTemplate({ gl_name, file })
        .then(res => {
          commit(GAMIFICATION_TEMPLATE_IMPORT_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(GAMIFICATION_TEMPLATE_IMPORT_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [GAMIFICATION_LAYER_IMPORT]: (
    { commit, rootState },
    { project_id, file }
  ) => {
    return new Promise((resolve, reject) => {
      commit(GAMIFICATION_LAYER_IMPORT_REQUEST);
      gamificationlayerService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .import({ project_id, file })
        .then(res => {
          commit(GAMIFICATION_LAYER_IMPORT_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(GAMIFICATION_LAYER_IMPORT_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [GAMIFICATION_LAYER_EXPORT]: (
    { commit, rootState },
    { id, exercises, format }
  ) => {
    return new Promise((resolve, reject) => {
      commit(GAMIFICATION_LAYER_EXPORT_REQUEST);
      gamificationlayerService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .export(id, exercises, format)
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
  [GAMIFICATION_LAYER_TEMPLATES_REQUEST]: state => {
    state.loading++;
  },
  [GAMIFICATION_LAYER_TEMPLATES_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [GAMIFICATION_LAYER_TEMPLATES_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [GAMIFICATION_LAYER_CREATE_FROM_TEMPLATE_REQUEST]: state => {
    state.loading++;
  },
  [GAMIFICATION_LAYER_CREATE_FROM_TEMPLATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [GAMIFICATION_LAYER_CREATE_FROM_TEMPLATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [GAMIFICATION_LAYER_UPLOAD_TEMPLATE_REQUEST]: state => {
    state.loading++;
  },
  [GAMIFICATION_LAYER_UPLOAD_TEMPLATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [GAMIFICATION_LAYER_UPLOAD_TEMPLATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [GAMIFICATION_TEMPLATE_IMPORT_REQUEST]: state => {
    state.loading++;
  },
  [GAMIFICATION_TEMPLATE_IMPORT_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [GAMIFICATION_TEMPLATE_IMPORT_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

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

  [GAMIFICATION_LAYER_IMPORT_REQUEST]: state => {
    state.loading++;
  },
  [GAMIFICATION_LAYER_IMPORT_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [GAMIFICATION_LAYER_IMPORT_ERROR]: state => {
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
