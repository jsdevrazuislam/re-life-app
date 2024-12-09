export type Language = 'en' | 'bn';

export interface TranslationStore {
  language: Language;
  translations: Record<Language, Record<string, string>>;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}