import HttpService from "./http.service";

class PermissionsService extends HttpService {
  constructor(language = "en") {
    super(language);
    this.headers = {};
  }

  authenticate(access_token) {
    this.headers.Authorization = `Bearer ${access_token}`;
    return this;
  }

  getPermission(project_id) {
    return this.client.get(`permissions/${project_id}`, {
      headers: this.headers
    });
  }

  getPermissions() {
    return this.client.get("permissions", {
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

export default new PermissionsService();
