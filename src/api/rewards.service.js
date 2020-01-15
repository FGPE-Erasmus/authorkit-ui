import HttpService from "./http.service";

class RewardService extends HttpService {
  constructor(language = "en") {
    super(language);
    this.headers = {};
  }

  authenticate(access_token) {
    this.headers.Authorization = `Bearer ${access_token}`;
    return this;
  }

  list(query) {
    return this.client.get(`rewards`, {
      headers: this.headers,
      params: query && this.buildQuery(query)
    });
  }

  getOne(id, query) {
    return this.client.get(`rewards/${id}`, {
      headers: this.headers,
      params: query && this.buildQuery(query)
    });
  }

  create(obj) {
    return this.client.post(`rewards`, obj, {
      headers: this.headers
    });
  }

  update(id, obj) {
    return this.client.patch(`rewards/${id}`, obj, {
      headers: this.headers
    });
  }

  delete(id) {
    return this.client.delete(`rewards/${id}`, {
      headers: this.headers
    });
  }
}

export default new RewardService();
