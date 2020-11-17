import HttpService from "@/api/http.service";

class ContactService extends HttpService {
  constructor(language = "en") {
    super(language);
    this.headers = {};
  }

  authenticate(access_token) {
    this.headers.Authorization = `Bearer ${access_token}`;
    return this;
  }

  sendMessage(obj) {
    return this.client.post(`contact/send-message`, obj, {
      headers: this.headers
    });
  }
}

export default new ContactService();
