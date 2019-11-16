export const MODULE_BASE = "auth";

// actions
export const AUTH_REGISTER = "register";
export const AUTH_VERIFY_EMAIL = "verify-email";
export const AUTH_RESEND_VERIFY_EMAIL = "resend-verify-email";
export const AUTH_LOGIN = "login";
export const AUTH_FACEBOOK_LOGIN = "facebook-login";
export const AUTH_TWITTER_LOGIN = "twitter-login";
export const AUTH_GOOGLE_LOGIN = "google-login";
export const AUTH_GITHUB_LOGIN = "github-login";
export const AUTH_LOGOUT = "logout";
export const AUTH_FETCH_AUTHENTICATED_USER = "me";

// mutations
export const AUTH_REGISTER_REQUEST = "AUTH_REGISTER_REQUEST";
export const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS";
export const AUTH_REGISTER_ERROR = "AUTH_REGISTER_ERROR";

export const AUTH_VERIFY_EMAIL_REQUEST = "AUTH_VERIFY_EMAIL_REQUEST";
export const AUTH_VERIFY_EMAIL_SUCCESS = "AUTH_VERIFY_EMAIL_SUCCESS";
export const AUTH_VERIFY_EMAIL_ERROR = "AUTH_VERIFY_EMAIL_ERROR";

export const AUTH_RESEND_VERIFY_EMAIL_REQUEST =
  "AUTH_RESEND_VERIFY_EMAIL_REQUEST";
export const AUTH_RESEND_VERIFY_EMAIL_SUCCESS =
  "AUTH_RESEND_VERIFY_EMAIL_SUCCESS";
export const AUTH_RESEND_VERIFY_EMAIL_ERROR = "AUTH_RESEND_VERIFY_EMAIL_ERROR";

export const AUTH_LOGIN_REQUEST = "AUTH_LOGIN_REQUEST";
export const AUTH_FACEBOOK_LOGIN_REQUEST = "AUTH_FACEBOOK_LOGIN_REQUEST";
export const AUTH_TWITTER_LOGIN_REQUEST = "AUTH_TWITTER_LOGIN_REQUEST";
export const AUTH_GOOGLE_LOGIN_REQUEST = "AUTH_GOOGLE_LOGIN_REQUEST";
export const AUTH_GITHUB_LOGIN_REQUEST = "AUTH_GITHUB_LOGIN_REQUEST";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_ERROR = "AUTH_LOGIN_ERROR";

export const AUTH_RESET_PASSWORD_REQUEST = "AUTH_RESET_PASSWORD_REQUEST";
export const AUTH_RESET_PASSWORD_SUCCESS = "AUTH_RESET_PASSWORD_SUCCESS";
export const AUTH_RESET_PASSWORD_ERROR = "AUTH_RESET_PASSWORD_ERROR";

export const AUTH_SET_PASSWORD_REQUEST = "AUTH_SET_PASSWORD_REQUEST";
export const AUTH_SET_PASSWORD_SUCCESS = "AUTH_SET_PASSWORD_SUCCESS";
export const AUTH_SET_PASSWORD_ERROR = "AUTH_SET_PASSWORD_ERROR";

export const AUTH_REFRESH_TOKEN_REQUEST = "AUTH_REFRESH_TOKEN_REQUEST";
export const AUTH_REFRESH_TOKEN_SUCCESS = "AUTH_REFRESH_TOKEN_SUCCESS";
export const AUTH_REFRESH_TOKEN_ERROR = "AUTH_REFRESH_TOKEN_ERROR";

export const AUTH_LOGOUT_REQUEST = "AUTH_LOGOUT_REQUEST";
export const AUTH_LOGOUT_SUCCESS = "AUTH_LOGOUT_SUCCESS";
export const AUTH_LOGOUT_ERROR = "AUTH_LOGOUT_ERROR";

export const AUTH_FETCH_AUTHENTICATED_USER_REQUEST =
  "AUTH_FETCH_AUTHENTICATED_USER_REQUEST";
export const AUTH_FETCH_AUTHENTICATED_USER_SUCCESS =
  "AUTH_FETCH_AUTHENTICATED_USER_SUCCESS";
export const AUTH_FETCH_AUTHENTICATED_USER_ERROR =
  "AUTH_FETCH_AUTHENTICATED_USER_ERROR";
