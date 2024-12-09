import { useTranslationStore } from './useTranslationStore';

export const useTranslation = () => {
  const language = useTranslationStore(state => state.language); 
  const t = useTranslationStore(state => state.t); 
  const setLanguage = useTranslationStore(state => state.setLanguage);

  return { t, language, setLanguage };
};
