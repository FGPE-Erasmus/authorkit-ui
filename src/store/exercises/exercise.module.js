import exerciseService from "@/api/exercises.service";
import testsetService from "@/api/testsets.service";
import { UPDATE_LAST_USED_FIELD_VALUES } from "../constants";
import {
  // actions
  EXERCISE_GET,
  EXERCISE_CREATE,
  EXERCISE_UPDATE,
  EXERCISE_LIST,
  EXERCISE_DELETE,
  EXERCISE_EXPORT,
  EXERCISE_IMPORT,
  EXERCISE_IMPORT_SIPE,
  EXERCISE_IMPORT_MEF,
  EXERCISE_FILE_CREATE,
  EXERCISE_FILE_READ,
  EXERCISE_FILE_UPDATE,
  EXERCISE_FILE_DELETE,
  EXERCISE_TESTSET_CREATE,
  EXERCISE_TESTSET_UPDATE,
  EXERCISE_TESTSET_DELETE,

  // mutations
  EXERCISE_GET_REQUEST,
  EXERCISE_GET_SUCCESS,
  EXERCISE_GET_ERROR,
  EXERCISE_CREATE_REQUEST,
  EXERCISE_CREATE_SUCCESS,
  EXERCISE_CREATE_ERROR,
  EXERCISE_UPDATE_REQUEST,
  EXERCISE_UPDATE_SUCCESS,
  EXERCISE_UPDATE_ERROR,
  EXERCISE_LIST_REQUEST,
  EXERCISE_LIST_SUCCESS,
  EXERCISE_LIST_ERROR,
  EXERCISE_DELETE_REQUEST,
  EXERCISE_DELETE_SUCCESS,
  EXERCISE_DELETE_ERROR,
  EXERCISE_EXPORT_REQUEST,
  EXERCISE_EXPORT_SUCCESS,
  EXERCISE_EXPORT_ERROR,
  EXERCISE_IMPORT_REQUEST,
  EXERCISE_IMPORT_SUCCESS,
  EXERCISE_IMPORT_ERROR,
  EXERCISE_FILE_READ_REQUEST,
  EXERCISE_FILE_READ_SUCCESS,
  EXERCISE_FILE_READ_ERROR,
  EXERCISE_FILE_CREATE_REQUEST,
  EXERCISE_FILE_CREATE_SUCCESS,
  EXERCISE_FILE_CREATE_ERROR,
  EXERCISE_FILE_UPDATE_REQUEST,
  EXERCISE_FILE_UPDATE_SUCCESS,
  EXERCISE_FILE_UPDATE_ERROR,
  EXERCISE_FILE_DELETE_REQUEST,
  EXERCISE_FILE_DELETE_SUCCESS,
  EXERCISE_FILE_DELETE_ERROR,
  EXERCISE_TESTSET_CREATE_REQUEST,
  EXERCISE_TESTSET_CREATE_SUCCESS,
  EXERCISE_TESTSET_CREATE_ERROR,
  EXERCISE_TESTSET_UPDATE_REQUEST,
  EXERCISE_TESTSET_UPDATE_SUCCESS,
  EXERCISE_TESTSET_UPDATE_ERROR,
  EXERCISE_TESTSET_DELETE_REQUEST,
  EXERCISE_TESTSET_DELETE_SUCCESS,
  EXERCISE_TESTSET_DELETE_ERROR,
  EXERCISE_SELECT_ACTIVE
} from "./exercise.constants";

const state = {
  loading: 0,
  activeExercise: undefined
};

const getters = {};

const actions = {
  [EXERCISE_GET]: ({ commit, rootState }, { id, query }) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_GET_REQUEST);
      exerciseService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .getOne(id, query)
        .then(res => {
          commit(EXERCISE_GET_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(EXERCISE_GET_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [EXERCISE_LIST]: ({ commit, rootState }, query) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_LIST_REQUEST);
      exerciseService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .list(query)
        .then(res => {
          commit(EXERCISE_LIST_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(EXERCISE_LIST_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [EXERCISE_CREATE]: ({ commit, dispatch, rootState }, exercise) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_CREATE_REQUEST);
      exerciseService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .create(exercise)
        .then(res => {
          commit(EXERCISE_CREATE_SUCCESS, res.data);

          dispatch(
            UPDATE_LAST_USED_FIELD_VALUES,
            {
              difficulty: exercise.difficulty,
              type: exercise.type,
              module: exercise.module,
              platform: exercise.platform,
              status: exercise.status
            },
            { root: true }
          );

          resolve(res.data);
        })
        .catch(err => {
          commit(EXERCISE_CREATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [EXERCISE_UPDATE]: ({ commit, dispatch, rootState }, { id, exercise }) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_UPDATE_REQUEST);
      exerciseService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .update(id, exercise)
        .then(res => {
          commit(EXERCISE_UPDATE_SUCCESS, res.data);

          dispatch(
            UPDATE_LAST_USED_FIELD_VALUES,
            {
              difficulty: exercise.difficulty,
              type: exercise.type,
              module: exercise.module,
              platform: exercise.platform,
              status: exercise.status
            },
            { root: true }
          );

          resolve(res.data);
        })
        .catch(err => {
          commit(EXERCISE_UPDATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [EXERCISE_DELETE]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_DELETE_REQUEST);
      exerciseService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .delete(id)
        .then(res => {
          commit(EXERCISE_DELETE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(EXERCISE_DELETE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [EXERCISE_IMPORT]: ({ commit, rootState }, { project_id, file }) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_IMPORT_REQUEST);
      exerciseService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .import({ project_id, file })
        .then(res => {
          commit(EXERCISE_IMPORT_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(EXERCISE_IMPORT_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [EXERCISE_IMPORT_SIPE]: ({ commit, rootState }, { project_id, file }) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_IMPORT_REQUEST);
      exerciseService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .importSipe({ project_id, file })
        .then(res => {
          commit(EXERCISE_IMPORT_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(EXERCISE_IMPORT_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [EXERCISE_IMPORT_MEF]: ({ commit, rootState }, { project_id, file }) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_IMPORT_REQUEST);
      exerciseService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .importMef({ project_id, file })
        .then(res => {
          commit(EXERCISE_IMPORT_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(EXERCISE_IMPORT_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [EXERCISE_EXPORT]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_EXPORT_REQUEST);
      exerciseService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .export(id)
        .then(res => {
          commit(EXERCISE_EXPORT_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(EXERCISE_EXPORT_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [EXERCISE_FILE_READ]: ({ commit, rootState }, { type, id }) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_FILE_READ_REQUEST);
      exerciseService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .readFile(type, id)
        .then(res => {
          commit(EXERCISE_FILE_READ_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(EXERCISE_FILE_READ_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [EXERCISE_FILE_CREATE]: (
    { commit, dispatch, rootState },
    { exerciseId, type, obj }
  ) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_FILE_CREATE_REQUEST);
      exerciseService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .createFile(type, { exercise_id: exerciseId, ...obj })
        .then(res => {
          commit(EXERCISE_FILE_CREATE_SUCCESS, res.data);

          const last_used = {};
          if (obj.format) {
            last_used.format = obj.format;
          }
          if (obj.lang) {
            last_used.lang = obj.lang;
          }
          if (obj.nat_lang) {
            last_used.nat_lang = obj.nat_lang;
          }
          dispatch(UPDATE_LAST_USED_FIELD_VALUES, last_used, { root: true });

          resolve(res.data);
        })
        .catch(err => {
          commit(EXERCISE_FILE_CREATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [EXERCISE_FILE_UPDATE]: (
    { commit, dispatch, rootState },
    { type, id, obj }
  ) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_FILE_UPDATE_REQUEST);
      exerciseService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .updateFile(type, id, obj)
        .then(res => {
          commit(EXERCISE_FILE_UPDATE_SUCCESS, res.data);

          const last_used = {};
          if (obj.format) {
            last_used.format = obj.format;
          }
          if (obj.lang) {
            last_used.lang = obj.lang;
          }
          if (obj.nat_lang) {
            last_used.nat_lang = obj.nat_lang;
          }
          dispatch(UPDATE_LAST_USED_FIELD_VALUES, last_used, { root: true });

          resolve(res.data);
        })
        .catch(err => {
          commit(EXERCISE_FILE_UPDATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [EXERCISE_FILE_DELETE]: ({ commit, rootState }, { type, id }) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_FILE_DELETE_REQUEST);
      exerciseService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .deleteFile(type, id)
        .then(res => {
          commit(EXERCISE_FILE_DELETE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(EXERCISE_FILE_DELETE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [EXERCISE_TESTSET_CREATE]: (
    { commit, rootState },
    { exerciseId, testset }
  ) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_TESTSET_CREATE_REQUEST);
      testsetService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .create({ exercise_id: exerciseId, ...testset })
        .then(res => {
          commit(EXERCISE_TESTSET_CREATE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(EXERCISE_TESTSET_CREATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [EXERCISE_TESTSET_UPDATE]: (
    { commit, rootState },
    { exerciseId, id, testset }
  ) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_TESTSET_UPDATE_REQUEST);
      testsetService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .update(id, { exercise_id: exerciseId, ...testset })
        .then(res => {
          commit(EXERCISE_TESTSET_UPDATE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(EXERCISE_TESTSET_UPDATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [EXERCISE_TESTSET_DELETE]: ({ commit, rootState }, { id }) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_TESTSET_DELETE_REQUEST);
      testsetService
        .authenticate(rootState.auth.token)
        .onProject(
          rootState.project.activeProject && rootState.project.activeProject.id
        )
        .delete(id)
        .then(res => {
          commit(EXERCISE_TESTSET_DELETE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(EXERCISE_TESTSET_DELETE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  }
};

const mutations = {
  [EXERCISE_CREATE_REQUEST]: state => {
    state.loading++;
  },
  [EXERCISE_CREATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [EXERCISE_CREATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [EXERCISE_UPDATE_REQUEST]: state => {
    state.loading++;
  },
  [EXERCISE_UPDATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [EXERCISE_UPDATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [EXERCISE_GET_REQUEST]: state => {
    state.loading++;
  },
  [EXERCISE_GET_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [EXERCISE_GET_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [EXERCISE_LIST_REQUEST]: state => {
    state.loading++;
  },
  [EXERCISE_LIST_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [EXERCISE_LIST_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [EXERCISE_DELETE_REQUEST]: state => {
    state.loading++;
  },
  [EXERCISE_DELETE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [EXERCISE_DELETE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [EXERCISE_EXPORT_REQUEST]: state => {
    state.loading++;
  },
  [EXERCISE_EXPORT_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [EXERCISE_EXPORT_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [EXERCISE_IMPORT_REQUEST]: state => {
    state.loading++;
  },
  [EXERCISE_IMPORT_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [EXERCISE_IMPORT_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [EXERCISE_FILE_READ_REQUEST]: state => {
    state.loading++;
  },
  [EXERCISE_FILE_READ_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [EXERCISE_FILE_READ_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [EXERCISE_FILE_CREATE_REQUEST]: state => {
    state.loading++;
  },
  [EXERCISE_FILE_CREATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [EXERCISE_FILE_CREATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [EXERCISE_FILE_UPDATE_REQUEST]: state => {
    state.loading++;
  },
  [EXERCISE_FILE_UPDATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [EXERCISE_FILE_UPDATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [EXERCISE_FILE_DELETE_REQUEST]: state => {
    state.loading++;
  },
  [EXERCISE_FILE_DELETE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [EXERCISE_FILE_DELETE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [EXERCISE_TESTSET_CREATE_REQUEST]: state => {
    state.loading++;
  },
  [EXERCISE_TESTSET_CREATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [EXERCISE_TESTSET_CREATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [EXERCISE_TESTSET_UPDATE_REQUEST]: state => {
    state.loading++;
  },
  [EXERCISE_TESTSET_UPDATE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [EXERCISE_TESTSET_UPDATE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [EXERCISE_TESTSET_DELETE_REQUEST]: state => {
    state.loading++;
  },
  [EXERCISE_TESTSET_DELETE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [EXERCISE_TESTSET_DELETE_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  [EXERCISE_SELECT_ACTIVE]: (state, exercise) => {
    state.activeExercise = exercise;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
