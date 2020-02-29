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
      params: query && this.buildQuery(query)
    });
  }

  getOne(id, query) {
    return this.client.get(`projects/${id}`, {
      headers: this.headers,
      params: query && this.buildQuery(query)
    });
  }

  getProjectShares(id) {
    return this.client.get(`projects/${id}/users`, {
      headers: this.headers
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

  import(obj) {
    const fd = this.buildFormData(obj);
    const headers = Object.assign(
      { "Content-Type": "multipart/form-data" },
      this.headers
    );
    return this.client.post("projects/import", fd, {
      headers
    });
  }

  export(id, format = "zip") {
    return this.client.get(`projects/${id}/export`, {
      responseType: "arraybuffer",
      headers: this.headers,
      params: {
        format
      }
    });
  }

  delete(id) {
    return this.client.delete(`projects/${id}`, {
      headers: this.headers
    });
  }

  share(obj) {
    return this.client.post("permissions/share", obj, {
      headers: this.headers
    });
  }

  shareByEmail(obj) {
    return this.client.post("permissions/share-by-email", obj, {
      headers: this.headers
    });
  }

  revoke(obj) {
    return this.client.post("permissions/revoke", obj, {
      headers: this.headers
    });
  }
}

export default new ProjectsService();
