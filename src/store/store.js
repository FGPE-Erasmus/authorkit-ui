import Vue from "vue";
import Vuex from "vuex";

import moduleBase from "./module";

Vue.use(Vuex);

import moduleAuth from "./auth/auth.module";
import moduleUser from "./users/user.module";
import moduleContact from "./contact/contact.module";
import modulePermission from "./permissions/permission.module";
import moduleProject from "./projects/project.module";
import moduleExercise from "./exercises/exercise.module";
import moduleGamificationLayer from "./gamification-layers/gamification-layer.module";
import moduleChallenge from "./challenges/challenge.module";
import moduleLeaderboard from "./leaderboards/leaderboard.module";
import moduleReward from "./rewards/reward.module";
import moduleRule from "./rules/rule.module";

export default new Vuex.Store({
  getters: moduleBase.getters,
  mutations: moduleBase.mutations,
  state: moduleBase.state,
  actions: moduleBase.actions,
  modules: {
    auth: moduleAuth,
    user: moduleUser,
    contact: moduleContact,
    permission: modulePermission,
    project: moduleProject,
    exercise: moduleExercise,
    gamificationLayer: moduleGamificationLayer,
    challenge: moduleChallenge,
    leaderboard: moduleLeaderboard,
    reward: moduleReward,
    rule: moduleRule
  },
  strict: process.env.NODE_ENV !== "production"
});
