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

  export(id, format = "zip") {
    return this.client.get(`gamification-layers/${id}/export`, {
      responseType: "arraybuffer",
      headers: this.headers,
      params: {
        format
      }
    });
  }
}

export default new GamificationLayerService();
