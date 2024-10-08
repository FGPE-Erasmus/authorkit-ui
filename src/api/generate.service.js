import HttpService from "./http.service";

class GenerateService extends HttpService {
  constructor(language = "en") {
    super(language);
    this.headers = {};
  }

  authenticate(access_token) {
    this.headers.Authorization = `Bearer ${access_token}`;
    return this;
  }

  generate() {
    console.log("SENDING TO BACKEND...");
    return this.client.post(`generate`, {
      headers: this.headers
    });
  }
}

export default new GenerateService();
