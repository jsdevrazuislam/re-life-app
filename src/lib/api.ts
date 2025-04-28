import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthStore} from '../store/store';
import {jwtDecode} from 'jwt-decode';

export const SERVER_URL = 'http://192.168.1.104:3000';
const baseURL = `${SERVER_URL}/api/v1`;
export const baseURLPhoto = (url: string): string => {
  return url;
};

export const api = axios.create({
  baseURL,
  headers: {'Content-Type': 'application/json'},
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const isTokenExpiringSoon = async () => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  if (!accessToken) return true;

  try {
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);
    const bufferTime = 30; 

    return decodedToken.exp ? decodedToken.exp - currentTime < bufferTime : false; 
  } catch (e) {
    return true; 
  }
};

const refreshAuthToken = async () => {
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  if (!refreshToken) {
      useAuthStore.getState().logout();
      return
  }

  try {
    const response = await axios.post(`${baseURL}/users/refreshToken`, { refreshToken });
    const data = response?.data?.data;


    if (!data?.accessToken) {
      useAuthStore.getState().logout();
    }

    await AsyncStorage.setItem("accessToken", data.accessToken);
    await AsyncStorage.setItem("refreshToken", data.refreshToken);
    await AsyncStorage.setItem("role", data.user?.role);

    useAuthStore.setState({
      user: data?.user,
      accessToken: data?.accessToken,
      refreshToken: data?.refreshToken,
    });

    api.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
    return data.accessToken;
  } catch (error) {
    useAuthStore.getState().logout();
    throw new Error("Token refresh failed");
  }
};

api.interceptors.request.use(async (config) => {
  if (await isTokenExpiringSoon()) {
    try {
      const newToken = await refreshAuthToken();
      config.headers.Authorization = `Bearer ${newToken}`;
    } catch (error) {
      console.error("Failed to refresh token before request", error);
    }
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error?.response?.data?.message === 'User is blocked') {
      useAuthStore.getState().logout();
    }
    const originalRequest = error.config;
    if (
      error?.response?.data?.message === 'jwt expired' ||
      (error.response?.status === 401 && !originalRequest._retry)
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) {
          useAuthStore.getState().logout();
          return Promise.reject(error);
        }

        const {data} = await axios.post(`${baseURL}/users/refreshToken`, {
          refreshToken,
        });
        useAuthStore.setState({
          user: data?.user,
          accessToken: data?.accessToken,
          refreshToken: data?.refreshToken,
        });
        await AsyncStorage.setItem("accessToken", data.accessToken);
        await AsyncStorage.setItem("refreshToken", data.refreshToken);
        await AsyncStorage.setItem("role", data.user?.role);
        api.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
