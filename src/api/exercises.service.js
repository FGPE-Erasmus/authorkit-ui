import HttpService from "./http.service";

class ExercisesService extends HttpService {
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
    return this.client.get(`exercises`, {
      headers: this.headers,
      params: query && this.buildQuery(query)
    });
  }

  getOne(id, query) {
    return this.client.get(`exercises/${id}`, {
      headers: this.headers,
      params: query && this.buildQuery(query)
    });
  }

  create(obj) {
    return this.client.post(`exercises`, obj, {
      headers: this.headers
    });
  }

  update(id, obj) {
    return this.client.patch(`exercises/${id}`, obj, {
      headers: this.headers
    });
  }

  delete(id) {
    return this.client.delete(`exercises/${id}`, {
      headers: this.headers
    });
  }

  import(obj) {
    const fd = this.buildFormData(obj);
    const headers = Object.assign(
      { "Content-Type": "multipart/form-data" },
      this.headers
    );
    return this.client.post("exercises/import", fd, {
      headers
    });
  }

  importSipe(obj) {
    const fd = this.buildFormData(obj);
    const headers = Object.assign(
      { "Content-Type": "multipart/form-data" },
      this.headers
    );
    return this.client.post("exercises/import/sipe", fd, {
      headers
    });
  }

  importMef(obj) {
    const fd = this.buildFormData(obj);
    const headers = Object.assign(
      { "Content-Type": "multipart/form-data" },
      this.headers
    );
    return this.client.post("exercises/import/mef", fd, {
      headers
    });
  }

  export(id, format = "zip") {
    return this.client.get(`exercises/${id}/export`, {
      responseType: "arraybuffer",
      headers: this.headers,
      params: {
        format
      }
    });
  }

  readFile(type, id) {
    return this.client.get(`${type}/${id}/contents`, {
      headers: this.headers
    });
  }

  createFile(type, obj) {
    const fd = this.buildFormData(obj);
    const headers = Object.assign(
      { "Content-Type": "multipart/form-data" },
      this.headers
    );
    return this.client.post(`${type}`, fd, {
      headers
    });
  }

  updateFile(type, id, obj) {
    const fd = this.buildFormData(obj);
    const headers = Object.assign(
      { "Content-Type": "multipart/form-data" },
      this.headers
    );
    return this.client.patch(`${type}/${id}`, fd, {
      headers
    });
  }

  translateFile(type, id, natLang) {
    return this.client.post(
      `${type}/${id}/translate?nat_lang=${natLang}`,
      {},
      {
        headers: this.headers
      }
    );
  }

  deleteFile(type, id) {
    return this.client.delete(`${type}/${id}`, {
      headers: this.headers
    });
  }
}

export default new ExercisesService();
