 type Language = 'en' | 'bn';

 interface TranslationStore {
  language: Language;
  translations: Record<Language, Record<string, string>>;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

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
  isFirstTime: boolean;
  isLoading: boolean;
  notifications: NotificationResponseData[],
  setNotifications: (notifications: NotificationResponseData[]) => void;
}