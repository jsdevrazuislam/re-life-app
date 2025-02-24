import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../lib/api';
import ApiStrings from '../lib/apis_string';

interface AuthState {
  user: IUser | null;
  tempUser: TempUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  userTempId: string | null;
  status: string | null;
  isAuthenticated: boolean;
  setUserInfo: (user: IUser) => void;
  setTempUser: (user: TempUser | null) => void;
  logout: () => void;
  setUser: (user: IUser, accessToken: string, refreshToken: string) => void;
  setRole: (role: string) => void;
  setUserId: (role: string) => void;
  setTempEmail: (email: string) => void;
  userTempEmail:string | null,
  setStatus: (status: string) => void;
  loadUserFromStorage: () => Promise<void>;
  isLoading: boolean;
  masjids: MasjidNames[] | null,
  setMasjids: (data: MasjidNames[]) => void
}

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  role: null,
  tempUser: null,
  isLoading: true,
  status: '',
  userTempId: null,
  userTempEmail: "",
  masjids: []
};

export const useAuthStore = create<AuthState>(set => ({
  ...initialState,
  logout: async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('role');
    await AsyncStorage.removeItem('status');
    await AsyncStorage.removeItem('userTempId');
    await AsyncStorage.removeItem('userTempEmail');
    await AsyncStorage.removeItem('tempUser');

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      userTempId: null,
      role: null,
      tempUser: null,
      isAuthenticated: false,
    });
  },
  setMasjids: (masjids) => set({ masjids }),
  loadUserFromStorage: async () => {
    try {
      const role = await AsyncStorage.getItem('role');
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userTempId = await AsyncStorage.getItem('userTempId');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const status = await AsyncStorage.getItem('status');
      const userTempEmail = await AsyncStorage.getItem('userTempEmail');
      const user = await AsyncStorage.getItem('tempUser');
      const tempUser = user ? JSON.parse(user) : null;

      set({ status, userTempId , userTempEmail, tempUser})

      const { data } = await api.get(ApiStrings.GET_MASJIDS_NAME);
      set({ masjids: data?.data?.data })

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
  setStatus: async (status) => {
    set({ status })
    await AsyncStorage.setItem('status', status);
  },
  setTempEmail: async (email) => {
    set({ userTempEmail: email })
    await AsyncStorage.setItem('userTempEmail', email);

  },
  setRole:(role) => set({ role }),
  setTempUser: async (tempUser) => {
    set({ tempUser})
    await AsyncStorage.setItem('tempUser', JSON.stringify(tempUser));
  },
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
