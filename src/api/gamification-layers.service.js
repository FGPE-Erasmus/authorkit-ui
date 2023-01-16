import HttpService from "./http.service";

class GamificationLayerService extends HttpService {
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
    return this.client.get(`gamification-layers`, {
      headers: this.headers,
      params: query && this.buildQuery(query)
    });
  }

  getOne(id, query) {
    return this.client.get(`gamification-layers/${id}`, {
      headers: this.headers,
      params: query && this.buildQuery(query)
    });
  }

  getTemplatesList() {
    return this.client.get(`gamification-template/templates-list`, {
      headers: this.headers
    });
  }

  createFromTemplate(obj) {
    return this.client.post(`gamification-template/create-from-template`, obj, {
      headers: this.headers
    });
  }

  create(obj) {
    return this.client.post(`gamification-layers`, obj, {
      headers: this.headers
    });
  }

  update(id, obj) {
    return this.client.patch(`gamification-layers/${id}`, obj, {
      headers: this.headers
    });
  }

  upload(obj) {
    return this.client.post(`gamification-template/upload`, obj, {
      headers: this.headers
    });
  }

  delete(id) {
    return this.client.delete(`gamification-layers/${id}`, {
      headers: this.headers
    });
  }

  import(obj) {
    const fd = this.buildFormData(obj);
    const headers = Object.assign(
      { "Content-Type": "multipart/form-data" },
      this.headers
    );
    return this.client.post("gamification-layers/import", fd, {
      headers
    });
  }

  export(id, exercises = "", format = "zip") {
    return this.client.get(`gamification-layers/${id}/export`, {
      responseType: "arraybuffer",
      headers: this.headers,
      params: {
        format,
        exercises: exercises ? exercises : undefined
      }
    });
  }
}

export default new GamificationLayerService();

