import exerciseService from "@/api/exercises.service";
import testsetService from "@/api/testsets.service";
import {
  // actions
  EXERCISE_GET,
  EXERCISE_CREATE,
  EXERCISE_UPDATE,
  EXERCISE_LIST,
  EXERCISE_DELETE,
  EXERCISE_EXPORT,
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

  [EXERCISE_CREATE]: ({ commit, rootState }, exercise) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_CREATE_REQUEST);
      exerciseService
        .authenticate(rootState.auth.token)
        .create(exercise)
        .then(res => {
          commit(EXERCISE_CREATE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(EXERCISE_CREATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [EXERCISE_UPDATE]: ({ commit, rootState }, { id, exercise }) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_UPDATE_REQUEST);
      exerciseService
        .authenticate(rootState.auth.token)
        .update(id, exercise)
        .then(res => {
          commit(EXERCISE_UPDATE_SUCCESS, res.data);

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

  [EXERCISE_EXPORT]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_EXPORT_REQUEST);
      exerciseService
        .authenticate(rootState.auth.token)
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
    { commit, rootState },
    { exerciseId, type, obj }
  ) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_FILE_CREATE_REQUEST);
      exerciseService
        .authenticate(rootState.auth.token)
        .createFile(type, { exercise_id: exerciseId, ...obj })
        .then(res => {
          commit(EXERCISE_FILE_CREATE_SUCCESS, res.data);

          resolve(res.data);
        })
        .catch(err => {
          commit(EXERCISE_FILE_CREATE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [EXERCISE_FILE_UPDATE]: ({ commit, rootState }, { type, id, obj }) => {
    return new Promise((resolve, reject) => {
      commit(EXERCISE_FILE_UPDATE_REQUEST);
      exerciseService
        .authenticate(rootState.auth.token)
        .updateFile(type, id, obj)
        .then(res => {
          commit(EXERCISE_FILE_UPDATE_SUCCESS, res.data);

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
