import axios from "axios";

import config from "../../api.config.json";
import router from "../router";
import {
  STORAGE_ACCESS_TOKEN,
  STORAGE_ACCESS_TOKEN_EXPIRY_TIME,
  STORAGE_REFRESH_TOKEN,
  STORAGE_REFRESH_TOKEN_EXPIRY_TIME,
  STORAGE_REMEMBER_ME,
  STORAGE_USER_PROFILE
} from "../store/constants";

export default class HttpService {
  constructor(language = "en") {
    this.client = axios.create({
      baseURL: `${config.protocol}://${config.host}:${config.port}/${config.base_path}`,
      headers: {
        Accept: "application/json",
        "Accept-Language": language,
        "Content-Type": "application/json"
      }
    });
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "dev"
    ) {
      this.addResponseInterceptor(
        res => {
          // eslint-disable-next-line no-console
          console.log(
            "%c Request Success:",
            "color: #4CAF50; font-weight: bold",
            res
          );
          return res;
        },
        err => {
          if (err.response && err.response.status === 401) {
            localStorage.removeItem(STORAGE_REMEMBER_ME);
            localStorage.removeItem(STORAGE_ACCESS_TOKEN);
            localStorage.removeItem(STORAGE_ACCESS_TOKEN_EXPIRY_TIME);
            localStorage.removeItem(STORAGE_REFRESH_TOKEN);
            localStorage.removeItem(STORAGE_REFRESH_TOKEN_EXPIRY_TIME);
            localStorage.removeItem(STORAGE_USER_PROFILE);
            sessionStorage.removeItem(STORAGE_ACCESS_TOKEN);
            sessionStorage.removeItem(STORAGE_ACCESS_TOKEN_EXPIRY_TIME);
            sessionStorage.removeItem(STORAGE_REFRESH_TOKEN);
            sessionStorage.removeItem(STORAGE_REFRESH_TOKEN_EXPIRY_TIME);
            sessionStorage.removeItem(STORAGE_USER_PROFILE);

            router.go();
          }
          // eslint-disable-next-line no-console
          console.log(
            "%c Request Error:",
            "color: #EC6060; font-weight: bold",
            err
          );
          return Promise.reject(err);
        }
      );
    }
  }

  addRequestInterceptor(success, error) {
    this.client.interceptors.request.use(success, error);
  }

  addResponseInterceptor(success, error) {
    this.client.interceptors.response.use(success, error);
  }

  buildQuery({
    page,
    limit,
    filter,
    or,
    search,
    sort,
    fields,
    select,
    join,
    offset,
    cache
  }) {
    const searchParams = new URLSearchParams();
    if (page) {
      searchParams.append("page", page);
    }
    if (limit) {
      searchParams.append("limit", limit);
    }
    if (search) {
      searchParams.append("s", JSON.stringify(search));
    }
    if (filter) {
      filter.forEach(c => {
        searchParams.append("filter", c);
      });
    }
    if (or) {
      or.forEach(c => {
        searchParams.append("or", c);
      });
    }
    if (sort) {
      sort.forEach(s => {
        searchParams.append("sort", s);
      });
    }
    if (fields) {
      searchParams.append("fields", fields.join(","));
    }
    if (select) {
      searchParams.append("select", select.join(","));
    }
    if (join) {
      join.forEach(j => {
        searchParams.append("join", j);
      });
    }
    if (offset) {
      searchParams.append("offset", offset);
    }
    if (cache) {
      searchParams.append("cache", cache);
    }
    return searchParams;
  }

  buildFormData(data, formData, parentKey) {
    formData = formData || new FormData();
    if (
      data &&
      typeof data === "object" &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach(key => {
        this.buildFormData(
          data[key],
          formData,
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      const value = data === null ? "" : data;
      formData.append(parentKey, value);
    }
    return formData;
  }
}
