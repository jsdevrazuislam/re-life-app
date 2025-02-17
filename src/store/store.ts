import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../lib/api';
import ApiStrings from '../lib/apis_string';

interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  userTempId: string | null;
  isAuthenticated: boolean;
  setUserInfo: (user: IUser) => void;
  logout: () => void;
  setUser: (user: IUser, accessToken: string, refreshToken: string) => void;
  setRole: (role: string) => void;
  setUserId: (role: string) => void;
  loadUserFromStorage: () => Promise<void>;
  isLoading: boolean;
}

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  role: null,
  isLoading: true,
  userTempId: null
};

export const useAuthStore = create<AuthState>(set => ({
  ...initialState,
  logout: async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('role');
    await AsyncStorage.removeItem('userTempId');

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      userTempId: null,
      role: null,
      isAuthenticated: false,
    });
  },
  loadUserFromStorage: async () => {
    try {
      const role = await AsyncStorage.getItem('role');
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userTempId = await AsyncStorage.getItem('userTempId');
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      if(accessToken){
        const { data } = await api.get(ApiStrings.ME)
        set({ userTempId, accessToken, refreshToken, isLoading: false, role, user: data?.data, isAuthenticated: true})
      }
      set({ isLoading: false });

    } catch (error) {
      console.error('Error loading user from storage:', error);
      set({ isLoading: false });
    }
  },
  setRole:(role) => set({ role }),
  setUserId: async (userTempId) => {
    set({ userTempId })
    await AsyncStorage.setItem('userTempId', userTempId);
  },
  setUserInfo: user => set({ user }),
  setUser: async (user, accessToken, refreshToken) => {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    await AsyncStorage.setItem('role', user.role);
    set({user, accessToken, refreshToken, isAuthenticated: true});
  },
}));
