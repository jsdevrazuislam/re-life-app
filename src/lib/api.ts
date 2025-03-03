import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../store/store";

export const SERVER_URL = "https://light-cloths-watch.loca.lt";
const baseURL = `${SERVER_URL}/api/v1`;
export const baseURLPhoto = (url:string) : string => {
  return url
};

export const api = axios.create({
  baseURL, 
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (!refreshToken) {
          useAuthStore.getState().logout();
          return Promise.reject(error);
        }

        const { data } = await axios.post(`${baseURL}/users/refreshToken`, { refreshToken });
        await AsyncStorage.setItem("accessToken", data.accessToken);
        api.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
