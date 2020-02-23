import axios from "axios";

import config from "../../api.config.json";
import router from "../router";

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
          console.log(
            "%c Request Success:",
            "color: #4CAF50; font-weight: bold",
            res
          );
          return res;
        },
        err => {
          if (err.response && err.response.status === 401) {
            router.push("/pages/login");
          }
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
