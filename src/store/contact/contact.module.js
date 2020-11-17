import contactService from "@/api/contact.service";

import {
  CONTACT_SEND_MESSAGE,
  CONTACT_SEND_MESSAGE_ERROR,
  CONTACT_SEND_MESSAGE_REQUEST,
  CONTACT_SEND_MESSAGE_SUCCESS
} from "@/store/contact/contact.constants";

const state = {
  loading: 0
};

const getters = {};

const actions = {
  [CONTACT_SEND_MESSAGE]: ({ commit, rootState }, data) => {
    return new Promise((resolve, reject) => {
      commit(CONTACT_SEND_MESSAGE_REQUEST);
      contactService
        .authenticate(rootState.auth.token)
        .sendMessage(data)
        .then(res => {
          commit(CONTACT_SEND_MESSAGE_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(CONTACT_SEND_MESSAGE_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  }
};

const mutations = {
  [CONTACT_SEND_MESSAGE_REQUEST]: state => {
    state.loading++;
  },
  [CONTACT_SEND_MESSAGE_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [CONTACT_SEND_MESSAGE_ERROR]: state => {
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
