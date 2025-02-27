import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../lib/api';
import ApiStrings from '../lib/apis_string';



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
  masjids: [],
  totalPeople: 0,
  totalCommittees: 0,
  committees: [],
  people: [],
  isFirstTime: false,
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

      set({ status, userTempId, userTempEmail, tempUser, isFirstTime: isFirstTime ? true : false });

      const { data } = await api.get(ApiStrings.GET_MASJIDS_NAME);
      set({ masjids: data?.data?.data })

      if (accessToken) {
        const { data } = await api.get(ApiStrings.ME);
        if (data?.data?.kycStatus === 'verified') {
          const { data: imamData } = await api.get(ApiStrings.GET_MASJID_DETAILS(data?.data?.masjid?._id || ''));
          set({ committees: imamData?.data?.committees, people: imamData?.data?.poorPeople, totalPeople: imamData?.data?.totalPoorPeople, totalCommittees: imamData?.data?.totalCommittees })
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
