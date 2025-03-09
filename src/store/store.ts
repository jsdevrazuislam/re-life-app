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
  totalPeople: 0,
  totalCommittees: 0,
  committees: [],
  people: [],
  notifications: [],
  isFirstTime: false
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
  setNotifications: (notifications) => set({ notifications }),
  setTotalPeople: (totalPeople) => set({ totalPeople }),
  setTotalCommittees: (totalCommittees) => set({ totalCommittees }),
  setCommittees: (committees) => set({ committees }),
  setPeople: (people) => set({ people }),
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

      set({ status, userTempId, userTempEmail, tempUser,  isFirstTime: isFirstTime ? true : false });


      await messaging().requestPermission();
      const token = await messaging().getToken();

      if (accessToken) {
        const { data } = await api.get(ApiStrings.ME);
        if (!data?.data?.fcmToken || data?.data?.fcmToken !== token) {
          await api.post(ApiStrings.SAVE_FCM_TOKEN, { userId: data?.data?._id, fcmToken: token })
          console.log("FCM Token:", token);
        }
        if (data?.data?.kycStatus === 'verified') {
          const { data: imamData } = await api.get(ApiStrings.GET_MASJID_DETAILS(data?.data?.masjid?._id || ''));
          const { data: notifications } = await api.get(ApiStrings.GET_NOTIFICATIONS(data?.data?._id || ''));
          set({ committees: imamData?.data?.committees, people: imamData?.data?.poorPeople, totalPeople: imamData?.data?.totalPoorPeople, totalCommittees: imamData?.data?.totalCommittees, notifications: notifications?.data });
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
    await AsyncStorage.setItem('status', status);
  },
  setTempEmail: async (email) => {
    set({ userTempEmail: email })
    await AsyncStorage.setItem('userTempEmail', email);

  },
  setRole: (role) => set({ role }),
  setTempUser: async (tempUser) => {
    set({ tempUser })
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
    set({ user, accessToken, refreshToken, isAuthenticated: true });
  },
}));
