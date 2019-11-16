/* import userService from "@/api/user.service";
import {
  USER_GET,
  USER_CREATE,
  USER_UPDATE,
  USER_LIST,
  USER_DELETE
} from "./user.constants"; */

const state = {
  users: [],
  from: 1,
  to: 1,
  size: 0,
  args: {}
};

const getters = {};

const actions = {
  /* [USER_GET]: ({ commit, state }, id) => {
    users.filter()
  },

  [USER_LIST]: ({ commit, state }, { page, size, args }) => {

  },

  [USER_CREATE]: ({ commit, state }, user) => {

  },

  [USER_UPDATE]: ({ commit, state }, id, partial) => {

  },

  [USER_DELETE]: ({ commit, state }, id) => {

  } */
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
};
