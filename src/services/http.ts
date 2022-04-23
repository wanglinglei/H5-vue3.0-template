import axios from "axios";

interface IRes<T = unknown> {
  code: string;
  data: T;
  subMsg: string;
}

let request = axios.create({
  baseURL: "/api",
  timeout: 30000,
});

request.interceptors.request.use((config) => {
  return config;
});

request.interceptors.response.use(
  (res) => {
    const resData: IRes = res.data;
    if (resData.code !== "9999") {
      return Promise.reject(resData);
    } else {
      Promise.resolve(resData);
    }
    return resData;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export function get(url: string, params: any) {
  return new Promise((resolve, reject) => {
    request
      .get(url, { params })
      .then((res) => {
        resolve([undefined, res]);
      })
      .catch((err) => {
        resolve([err, undefined]);
      });
  });
}

export function post(url: string, params: any) {
  return new Promise((resolve, reject) => {
    request
      .post(url, { params })
      .then((res) => {
        resolve([undefined, res]);
      })
      .catch((err) => {
        resolve([err, undefined]);
      });
  });
}
