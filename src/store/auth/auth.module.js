import authService from "@/api/auth.service";
import userService from "@/api/users.service";
import router from "@/router";

import {
  STORAGE_ACCESS_TOKEN,
  STORAGE_ACCESS_TOKEN_EXPIRY_TIME,
  STORAGE_REFRESH_TOKEN,
  STORAGE_REFRESH_TOKEN_EXPIRY_TIME,
  STORAGE_REMEMBER_ME,
  STORAGE_USER_PROFILE
} from "../constants";

import {
  // actions
  AUTH_REGISTER,
  /* AUTH_RESEND_VERIFY_EMAIL, */
  AUTH_VERIFY_EMAIL,
  AUTH_LOGIN,
  /* AUTH_FACEBOOK_LOGIN,
  AUTH_TWITTER_LOGIN,
  AUTH_GOOGLE_LOGIN,
  AUTH_GITHUB_LOGIN, */
  AUTH_RESET_PASSWORD,
  AUTH_SET_PASSWORD,
  /* AUTH_REFRESH_TOKEN, */
  AUTH_LOGOUT,
  AUTH_FETCH_AUTHENTICATED_USER,

  // mutations
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_ERROR,
  AUTH_RESEND_VERIFY_EMAIL_REQUEST,
  AUTH_RESEND_VERIFY_EMAIL_SUCCESS,
  AUTH_RESEND_VERIFY_EMAIL_ERROR,
  AUTH_VERIFY_EMAIL_REQUEST,
  AUTH_VERIFY_EMAIL_SUCCESS,
  AUTH_VERIFY_EMAIL_ERROR,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_RESET_PASSWORD_REQUEST,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_RESET_PASSWORD_ERROR,
  AUTH_SET_PASSWORD_REQUEST,
  AUTH_SET_PASSWORD_SUCCESS,
  AUTH_SET_PASSWORD_ERROR,
  AUTH_REFRESH_TOKEN_REQUEST,
  AUTH_REFRESH_TOKEN_SUCCESS,
  AUTH_REFRESH_TOKEN_ERROR,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_ERROR,
  AUTH_FETCH_AUTHENTICATED_USER_REQUEST,
  AUTH_FETCH_AUTHENTICATED_USER_ERROR,
  AUTH_FETCH_AUTHENTICATED_USER_SUCCESS
} from "./auth.constants";

const state = {
  loading: 0,
  token:
    localStorage.getItem(STORAGE_ACCESS_TOKEN) ||
    sessionStorage.getItem(STORAGE_ACCESS_TOKEN) ||
    "",
  tokenExpiryTime:
    localStorage.getItem(STORAGE_ACCESS_TOKEN_EXPIRY_TIME) ||
    sessionStorage.getItem(STORAGE_ACCESS_TOKEN_EXPIRY_TIME) ||
    0,
  profile: JSON.parse(
    localStorage.getItem(STORAGE_USER_PROFILE) ||
      sessionStorage.getItem(STORAGE_USER_PROFILE) ||
      "{}"
  ),
  status: "",
  hasLoadedOnce: false
};

const getters = {
  isAuthenticated: state => {
    console.log(state.tokenExpiryTime)
    return (
      state.token && state.tokenExpiryTime && Date.now() < state.tokenExpiryTime
    );
  },
  isUserLoggedIn: (state, getters) => state.profile && getters.isAuthenticated,
  /* authenticatedUser: state => {
    if
  }, */
  authStatus: state => state.status
};

const actions = {
  [AUTH_REGISTER]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REGISTER_REQUEST);
      authService
        .register(
          payload.firstname,
          payload.lastname,
          payload.email,
          payload.password
        )
        .then(res => {
          commit(AUTH_REGISTER_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(AUTH_REGISTER_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  /* [AUTH_RESEND_VERIFY_EMAIL]: ({ commit, dispatch }, payload) => {}, */

  [AUTH_VERIFY_EMAIL]: ({ commit, dispatch }, token) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_VERIFY_EMAIL_REQUEST);
      authService
        .verifyEmail(token)
        .then(res => {
          commit(AUTH_VERIFY_EMAIL_SUCCESS, res.data);
          clearTokenStorage();
          localStorage.setItem(STORAGE_REMEMBER_ME, false);
          sessionStorage.setItem(STORAGE_ACCESS_TOKEN, res.data.accessToken);
          sessionStorage.setItem(
            STORAGE_ACCESS_TOKEN_EXPIRY_TIME,
            new Date(Date.now() + res.data.expiresIn * 1000)
          );
          sessionStorage.setItem(STORAGE_REFRESH_TOKEN, res.data.refreshToken);
          sessionStorage.setItem(
            STORAGE_REFRESH_TOKEN_EXPIRY_TIME,
            new Date(Date.now() + res.data.refreshTokenExpiresIn * 1000)
          );

          dispatch(AUTH_FETCH_AUTHENTICATED_USER).then(() =>
            setTimeout(
              () => router.push(router.currentRoute.query.to || "/"),
              5000
            )
          );

          resolve(res.data);
        })
        .catch(err => {
          commit(AUTH_VERIFY_EMAIL_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [AUTH_LOGIN]: ({ commit, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGIN_REQUEST);
      authService
        .login(payload.user_details.email, payload.user_details.password)
        .then(res => {
          commit(
            AUTH_LOGIN_SUCCESS,
            Object.assign(
              {
                remember_me: payload.remember_me
              },
              res.data
            )
          );

          dispatch(AUTH_FETCH_AUTHENTICATED_USER).then(() => {
            router.push(router.currentRoute.query.to || "/");
          });

          resolve(res.data);
        })
        .catch(err => {
          commit(AUTH_LOGIN_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  // Google Login
  /* [AUTH_GOOGLE_LOGIN]: ({ commit, state }, payload) => {

  }, */

  // Facebook Login
  /* [AUTH_FACEBOOK_LOGIN]: ({ commit, state }, payload) => {

  }, */

  // Twitter Login
  /* [AUTH_TWITTER_LOGIN]: ({ commit, state }, payload) => {

  }, */

  // Github Login
  /* [AUTH_GITHUB_LOGIN]: ({ commit, state }, payload) => {

  }, */

  [AUTH_RESET_PASSWORD]: ({ commit }, email) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_RESET_PASSWORD_REQUEST);
      authService
        .resetPassword(email)
        .then(() => {
          commit(AUTH_RESET_PASSWORD_SUCCESS);

          router.push({ path: "login" });

          resolve();
        })
        .catch(err => {
          commit(AUTH_RESET_PASSWORD_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  [AUTH_SET_PASSWORD]: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_SET_PASSWORD_REQUEST);
      authService
        .setPassword(payload.reset_token, payload.password)
        .then(() => {
          commit(AUTH_SET_PASSWORD_SUCCESS);

          router.push({ path: "login" });

          resolve();
        })
        .catch(err => {
          commit(AUTH_SET_PASSWORD_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  },

  /* [AUTH_REFRESH_TOKEN]: ({ commit, dispatch }, payload) => {}, */

  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT_REQUEST);
      authService
        .logout()
        .then(() => {
          commit(AUTH_LOGOUT_SUCCESS);

          router.go();

          resolve();
        })
        .catch(err => {
          commit(AUTH_LOGOUT_ERROR);
          reject(err.response.data);
        });
    });
  },

  [AUTH_FETCH_AUTHENTICATED_USER]: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_FETCH_AUTHENTICATED_USER_REQUEST);
      userService
        .authenticate(state.token)
        .me()
        .then(res => {
          commit(AUTH_FETCH_AUTHENTICATED_USER_SUCCESS, res.data);
          resolve(res.data);
        })
        .catch(err => {
          commit(AUTH_FETCH_AUTHENTICATED_USER_ERROR, err.response.data);
          reject(err.response.data);
        });
    });
  }
};

const mutations = {
  // register
  [AUTH_REGISTER_REQUEST]: state => {
    state.loading++;
  },
  [AUTH_REGISTER_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [AUTH_REGISTER_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  // resend verify email
  [AUTH_RESEND_VERIFY_EMAIL_REQUEST]: state => {
    state.loading++;
  },
  [AUTH_RESEND_VERIFY_EMAIL_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [AUTH_RESEND_VERIFY_EMAIL_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  // verify email
  [AUTH_VERIFY_EMAIL_REQUEST]: state => {
    state.loading++;
  },
  [AUTH_VERIFY_EMAIL_SUCCESS]: (state, res) => {
    state.loading = Math.max(state.loading - 1, 0);
    state.token = res.accessToken;
    state.tokenExpiryTime = Date.now() + res.expiresIn * 1000;
  },
  [AUTH_VERIFY_EMAIL_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  // login
  [AUTH_LOGIN_REQUEST]: state => {
    state.loading++;
  },
  [AUTH_LOGIN_SUCCESS]: (state, res) => {
    state.loading = Math.max(state.loading - 1, 0);
    state.token = res.accessToken;
    state.tokenExpiryTime = Date.now() + res.expiresIn * 1000;
    clearTokenStorage();
    if (res.remember_me) {
      localStorage.setItem(STORAGE_REMEMBER_ME, true);
      localStorage.setItem(STORAGE_ACCESS_TOKEN, res.accessToken);
      localStorage.setItem(
        STORAGE_ACCESS_TOKEN_EXPIRY_TIME,
        Date.now() + res.expiresIn * 1000
      );
      localStorage.setItem(STORAGE_REFRESH_TOKEN, res.refreshToken);
      localStorage.setItem(
        STORAGE_REFRESH_TOKEN_EXPIRY_TIME,
        Date.now() + res.refreshTokenExpiresIn * 1000
      );
    } else {
      localStorage.setItem(STORAGE_REMEMBER_ME, false);
      sessionStorage.setItem(STORAGE_ACCESS_TOKEN, res.accessToken);
      sessionStorage.setItem(
        STORAGE_ACCESS_TOKEN_EXPIRY_TIME,
        Date.now() + res.expiresIn * 1000
      );
      sessionStorage.setItem(STORAGE_REFRESH_TOKEN, res.refreshToken);
      sessionStorage.setItem(
        STORAGE_REFRESH_TOKEN_EXPIRY_TIME,
        Date.now() + res.refreshTokenExpiresIn * 1000
      );
    }
  },
  [AUTH_LOGIN_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
    state.hasLoadedOnce = true;
    localStorage.removeItem(STORAGE_ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_REFRESH_TOKEN);
  },

  // reset password
  [AUTH_RESET_PASSWORD_REQUEST]: state => {
    state.loading++;
  },
  [AUTH_RESET_PASSWORD_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [AUTH_RESET_PASSWORD_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  // set password
  [AUTH_SET_PASSWORD_REQUEST]: state => {
    state.loading++;
  },
  [AUTH_SET_PASSWORD_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [AUTH_SET_PASSWORD_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  // refresh token
  [AUTH_REFRESH_TOKEN_REQUEST]: state => {
    state.loading++;
  },
  [AUTH_REFRESH_TOKEN_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },
  [AUTH_REFRESH_TOKEN_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  // logout
  [AUTH_LOGOUT_REQUEST]: state => {
    state.loading++;
  },
  [AUTH_LOGOUT_SUCCESS]: state => {
    state.loading = Math.max(state.loading - 1, 0);
    localStorage.removeItem(STORAGE_REMEMBER_ME);
    localStorage.removeItem(STORAGE_ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_ACCESS_TOKEN_EXPIRY_TIME);
    localStorage.removeItem(STORAGE_REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_REFRESH_TOKEN_EXPIRY_TIME);
    localStorage.removeItem(STORAGE_USER_PROFILE);
    sessionStorage.removeItem(STORAGE_ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_ACCESS_TOKEN_EXPIRY_TIME);
    sessionStorage.removeItem(STORAGE_REFRESH_TOKEN);
    sessionStorage.removeItem(STORAGE_REFRESH_TOKEN_EXPIRY_TIME);
    sessionStorage.removeItem(STORAGE_USER_PROFILE);
  },
  [AUTH_LOGOUT_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  },

  // user profile fetched
  [AUTH_FETCH_AUTHENTICATED_USER_REQUEST]: state => {
    state.loading++;
  },
  [AUTH_FETCH_AUTHENTICATED_USER_SUCCESS]: (state, user) => {
    state.loading = Math.max(state.loading - 1, 0);
    state.profile = user;
    const remember = localStorage.getItem(STORAGE_REMEMBER_ME) === "true";
    if (remember) {
      localStorage.setItem(STORAGE_USER_PROFILE, JSON.stringify(user));
    } else {
      sessionStorage.setItem(STORAGE_USER_PROFILE, JSON.stringify(user));
    }
  },
  [AUTH_FETCH_AUTHENTICATED_USER_ERROR]: state => {
    state.loading = Math.max(state.loading - 1, 0);
  }
};

function clearTokenStorage() {
  localStorage.removeItem(STORAGE_REMEMBER_ME);
  localStorage.removeItem(STORAGE_ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_ACCESS_TOKEN_EXPIRY_TIME);
  localStorage.removeItem(STORAGE_REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_REFRESH_TOKEN_EXPIRY_TIME);
  sessionStorage.removeItem(STORAGE_ACCESS_TOKEN);
  sessionStorage.removeItem(STORAGE_ACCESS_TOKEN_EXPIRY_TIME);
  sessionStorage.removeItem(STORAGE_REFRESH_TOKEN);
  sessionStorage.removeItem(STORAGE_REFRESH_TOKEN_EXPIRY_TIME);
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
