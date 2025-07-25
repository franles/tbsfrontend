import axios from "axios";
import { isTokenNearExpiry } from "../utils/utils";
import { userStore } from "../store/userStore";

export const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    let token = userStore.getState().accessToken;

    if (config.url?.includes("/auth/refresh")) {
      return config;
    }

    if (token && isTokenNearExpiry(token, 30)) {
      const { data } = await api.post(`${API_URL}/auth/refresh`);
      token = data.accessToken;
      userStore.getState().setAccessToken(token!);
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
