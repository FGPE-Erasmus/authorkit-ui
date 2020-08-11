import HttpService from "./http.service";

class TestsetsService extends HttpService {
  constructor(language = "en") {
    super(language);
    this.headers = {};
  }

  authenticate(access_token) {
    this.headers.Authorization = `Bearer ${access_token}`;
    return this;
  }

  onProject(project) {
    this.headers.project = project;
    return this;
  }

  list(query) {
    return this.client.get(`testsets`, {
      headers: this.headers,
      params: query && this.buildQuery(query)
    });
  }

  getOne(id, query) {
    return this.client.get(`testsets/${id}`, {
      headers: this.headers,
      params: query && this.buildQuery(query)
    });
  }

  create(obj) {
    return this.client.post(`testsets`, obj, {
      headers: this.headers
    });
  }

  update(id, obj) {
    return this.client.patch(`testsets/${id}`, obj, {
      headers: this.headers
    });
  }

  delete(id) {
    return this.client.delete(`testsets/${id}`, {
      headers: this.headers
    });
  }
}

export default new TestsetsService();
