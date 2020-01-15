import HttpService from "./http.service";

class ChallengeService extends HttpService {
  constructor(language = "en") {
    super(language);
    this.headers = {};
  }

  authenticate(access_token) {
    this.headers.Authorization = `Bearer ${access_token}`;
    return this;
  }

  list(query) {
    return this.client.get(`challenges`, {
      headers: this.headers,
      params: query && this.buildQuery(query)
    });
  }

  getOne(id, query) {
    return this.client.get(`challenges/${id}`, {
      headers: this.headers,
      params: query && this.buildQuery(query)
    });
  }

  create(obj) {
    return this.client.post(`challenges`, obj, {
      headers: this.headers
    });
  }

  update(id, obj) {
    return this.client.patch(`challenges/${id}`, obj, {
      headers: this.headers
    });
  }

  delete(id) {
    return this.client.delete(`challenges/${id}`, {
      headers: this.headers
    });
  }
}

export default new ChallengeService();
