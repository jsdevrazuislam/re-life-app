import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../lib/api';
import ApiStrings from '../lib/apis_string';
import messaging from '@react-native-firebase/messaging';


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
  notifications: [],
  isFirstTime: false
};

export const useAuthStore = create<AuthState>(set => ({
  ...initialState,
  logout: async () => {
    await AsyncStorage.clear()

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      userTempId: null,
      role: null,
      tempUser: null,
      isAuthenticated: false,
      notifications: [],
      status: ''
    });
  },
  setNotifications: (notifications) => set({ notifications }),
  loadUserFromStorage: async () => {
    try {
      const role = await AsyncStorage.getItem('role');
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userTempId = await AsyncStorage.getItem('userTempId');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const status = await AsyncStorage.getItem('status');
      const userTempEmail = await AsyncStorage.getItem('userTempEmail');
      const user = await AsyncStorage.getItem('tempUser');
      const isFirstTime = await AsyncStorage.getItem('hasSeenOpening');
      const tempUser = user ? JSON.parse(user) : null;

      set({ status, userTempId, userTempEmail, tempUser, isFirstTime: isFirstTime ? true : false });


      await messaging().requestPermission();
      const token = await messaging().getToken();

      if (accessToken) {
        const { data } = await api.get(ApiStrings.ME);
        const user = data?.data;
        if (!user.fcmToken || user.fcmToken !== token) {
          await api.post(ApiStrings.SAVE_FCM_TOKEN, { userId: user._id, fcmToken: token })
        }
        if (user.kycStatus === 'verified') {
          const { data: notifications } = await api.get(ApiStrings.GET_NOTIFICATIONS(user._id || ''));
          set({ notifications: notifications?.data });
        }

        set({ userTempId, accessToken, refreshToken, isLoading: false, role, user: data?.data, isAuthenticated: true })
      }
      set({ isLoading: false });

    } catch (error) {
      console.error('Error loading user from storage:', error);
      set({ isLoading: false });
    }
  },
  setStatus: async (status) => {
    set({ status })
    if (status) {
      await AsyncStorage.setItem('status', status);
    } else {
      await AsyncStorage.removeItem('status');
    }
  },
  setTempEmail: async (email) => {
    set({ userTempEmail: email })
    if (email) {
      await AsyncStorage.setItem('userTempEmail', email);
    } else {
      await AsyncStorage.removeItem('userTempEmail');
    }
  },
  setRole: (role) => set({ role }),
  setTempUser: async (tempUser) => {
    set({ tempUser })
    if (tempUser) {
      await AsyncStorage.setItem('tempUser', JSON.stringify(tempUser));
    } else {
      await AsyncStorage.removeItem('tempUser');
    }
  },
  setUserId: async (userTempId) => {
    set({ userTempId })
    if (userTempId) {
      await AsyncStorage.setItem('userTempId', userTempId);
    } else {
      await AsyncStorage.removeItem('userTempId');
    }

  },
  setUserInfo: user => set({ user }),
  setUser: async (user, accessToken, refreshToken) => {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    await AsyncStorage.setItem('role', user.role);
    set({ user, accessToken, refreshToken, isAuthenticated: true });
  },
}));
