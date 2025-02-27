import {create} from 'zustand';
import bn from '../i18n/bn';
import en from '../i18n/en';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useTranslationStore = create<TranslationStore>((set, get) => ({
  language: 'bn',
  translations: {
    en,
    bn,
  },
  setLanguage: async lang => {
    set({language: lang});
    try {
      await AsyncStorage.setItem('language', lang);
    } catch (error) {
      console.error('Error saving language to AsyncStorage:', error);
    }
  },
  t: key => {
    const {language, translations} = get();
    return translations[language][key] || key;
  },
}));

const initializeLanguage = async () => {
  try {
    const storedLanguage = await AsyncStorage.getItem('language');
    if (storedLanguage) {
      useTranslationStore.getState().setLanguage(storedLanguage as Language);
    }
  } catch (error) {
    console.error('Error loading language from AsyncStorage:', error);
  }
};

initializeLanguage();
