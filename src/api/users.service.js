import HttpService from "./http.service";

class UsersService extends HttpService {
  constructor(language = "en") {
    super(language);
    this.headers = {};
  }

  authenticate(access_token) {
    this.headers.Authorization = `Bearer ${access_token}`;
    return this;
  }

  me() {
    return this.client.get(`users/me`, {
      headers: this.headers
    });
  }

  getOne(id, filter) {
    return this.client.get(`users/${id}`, {
      headers: this.headers,
      params: filter
    });
  }

  getAll(filter) {
    return this.client.get(`users`, {
      headers: this.headers,
      params: filter
    });
  }

  create(obj) {
    return this.client.post(`users`, obj, {
      headers: this.headers
    });
  }

  update(id, obj) {
    return this.client.patch(`users/${id}`, obj, {
      headers: this.headers
    });
  }

  delete(id) {
    return this.client.delete(`users/${id}`, {
      headers: this.headers
    });
  }
}

export default new UsersService();
