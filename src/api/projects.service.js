import HttpService from "./http.service";

class ProjectsService extends HttpService {
  constructor(language = "en") {
    super(language);
    this.headers = {};
  }

  authenticate(access_token) {
    this.headers.Authorization = `Bearer ${access_token}`;
    return this;
  }

  list(query) {
    return this.client.get(`projects`, {
      headers: this.headers,
      params: this.buildQuery(query)
    });
  }

  getOne(id, query) {
    return this.client.get(`projects/${id}`, {
      headers: this.headers,
      params: query
    });
  }

  create(obj) {
    return this.client.post(`projects`, obj, {
      headers: this.headers
    });
  }

  update(id, obj) {
    return this.client.patch(`projects/${id}`, obj, {
      headers: this.headers
    });
  }

  delete(id) {
    return this.client.delete(`projects/${id}`, {
      headers: this.headers
    });
  }
}

export default new ProjectsService();
