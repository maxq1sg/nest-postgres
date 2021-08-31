import axios from "axios";

const API_URL = "http://localhost:4000";
const $api = axios.create({
  baseURL: API_URL,
  //   withCredentials: true,
});

$api.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${JSON.parse(
    localStorage.getItem("token")
  )}`;
  return config;
});

export default $api;
