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

  readFile(id, path) {
    return this.client.get(`exercises/${id}/files/read`, {
      headers: this.headers,
      params: {
        pathname: path
      }
    });
  }

  createFile(id, type, obj) {
    const fd = this.buildFormData(obj);
    const headers = Object.assign(
      { "Content-Type": "multipart/form-data" },
      this.headers
    );
    return this.client.post(`exercises/${id}/${type}`, fd, {
      headers
    });
  }

  updateFile(id, type, file_id, obj) {
    const fd = this.buildFormData(obj);
    const headers = Object.assign(
      { "Content-Type": "multipart/form-data" },
      this.headers
    );
    return this.client.patch(`exercises/${id}/${type}/${file_id}`, fd, {
      headers
    });
  }

  deleteFile(id, type, file_id) {
    return this.client.delete(`exercises/${id}/${type}/${file_id}`, {
      headers: this.headers
    });
  }
}

export default new ExercisesService();
