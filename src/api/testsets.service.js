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

  list(exercise_id, query) {
    return this.client.get(`exercises/${exercise_id}/testsets`, {
      headers: this.headers,
      params: query && this.buildQuery(query)
    });
  }

  getOne(exercise_id, id, query) {
    return this.client.get(`exercises/${exercise_id}/testsets/${id}`, {
      headers: this.headers,
      params: query && this.buildQuery(query)
    });
  }

  create(exercise_id, obj) {
    return this.client.post(`exercises/${exercise_id}/testsets`, obj, {
      headers: this.headers
    });
  }

  update(exercise_id, id, obj) {
    return this.client.patch(`exercises/${exercise_id}/testsets/${id}`, obj, {
      headers: this.headers
    });
  }

  delete(exercise_id, id) {
    return this.client.delete(`exercises/${exercise_id}/testsets/${id}`, {
      headers: this.headers
    });
  }
}

export default new TestsetsService();
