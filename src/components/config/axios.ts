import axios, { AxiosError } from "axios";
import { decodeToken, isTokenNearExpiry } from "../utils/utils";
import { useUserStore } from "../store/userStore";

export const API_URL = import.meta.env.VITE_API_URL;

let isRefreshing = false;

type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: AxiosError | Error | unknown) => void;
};
let failedQueue: FailedRequest[] = [];

const processQueue = (
  error: AxiosError | Error | unknown,
  token: string | null = null
) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
};

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    let token = useUserStore.getState().accessToken;
    console.log("[Interceptor] Token actual:", token);

    if (token && isTokenNearExpiry(token, 30)) {
      console.log(
        "[Interceptor] Token cerca de expirar. Intentando refrescar..."
      );

      try {
        const { data } = await api.post(`${API_URL}/auth/refresh`);
        token = data.accessToken;
        useUserStore.getState().setAccessToken(token!);
        console.log("[Interceptor] Token refrescado:", token);
      } catch (error) {
        console.error("[Interceptor] Error al refrescar el token:", error);
        throw error;
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("[Interceptor] Token agregado al header");
    }

    return config;
  },
  (error) => {
    console.error("[Interceptor] Error en la solicitud:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Solo para errores 401 y si no hemos reintentado ya esta petición
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Si ya estamos refrescando, ponemos esta petición en cola
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // Llamada a /auth/refresh para obtener nuevo accessToken
        const { data } = await api.post("/auth/refresh");
        const newToken = data.accessToken;
        const payload = decodeToken(newToken);
        // Guardamos el nuevo token en el store
        useUserStore.getState().setAccessToken(newToken);
        useUserStore.getState().setUser({
          auth: true,
          nombre: payload?.nombre,
          email: payload?.email,
          avatar: payload?.avatar,
        });
        // Procesamos la cola de peticiones pendientes
        processQueue(null, newToken);
        // Reintentamos la petición original con el token actualizado
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Si falla el refresh, limpiamos cola y estado, y redirigimos
        processQueue(refreshError, null);
        useUserStore.getState().clearUser?.();
        useUserStore.getState().setAccessToken(undefined);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Para cualquier otro error, lo pasamos sin cambios
    return Promise.reject(error);
  }
);
