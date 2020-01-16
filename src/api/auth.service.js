import HttpService from "./http.service";

class AuthService extends HttpService {
  constructor(language = "en") {
    super(language);
  }

  register(firstname, lastname, email, password) {
    return this.client.post("auth/register", {
      first_name: firstname,
      last_name: lastname,
      email,
      password
    });
  }

  resendVerificationEmail(email) {
    return this.client.post("auth/register/verify/resend", {
      email
    });
  }

  verifyEmail(token) {
    return this.client.get("auth/register/verify", {
      params: {
        token
      }
    });
  }

  login(email, password) {
    return this.client.post("auth/login", {
      email,
      password
    });
  }

  resetPassword(email) {
    return this.client.post("auth/password/reset", {
      email
    });
  }

  setPassword(reset_token, password) {
    return this.client.post("auth/password/new", {
      resetToken: reset_token,
      password
    });
  }

  refreshToken(refresh_token) {
    return this.client.post("auth/refresh", {
      refreshToken: refresh_token
    });
  }

  logout() {
    return new Promise(resolve => {
      // no blacklist on server
      resolve();
    });
  }
}

export default new AuthService();
