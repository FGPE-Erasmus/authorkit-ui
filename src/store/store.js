import Vue from "vue";
import Vuex from "vuex";

import moduleBase from "./module";

Vue.use(Vuex);

import moduleAuth from "./auth/auth.module";
import moduleUser from "./users/user.module";
import moduleProject from "./projects/project.module";
import moduleExercise from "./exercises/exercise.module";

export default new Vuex.Store({
  getters: moduleBase.getters,
  mutations: moduleBase.mutations,
  state: moduleBase.state,
  actions: moduleBase.actions,
  modules: {
    auth: moduleAuth,
    user: moduleUser,
    project: moduleProject,
    exercise: moduleExercise
  },
  strict: process.env.NODE_ENV !== "production"
});
