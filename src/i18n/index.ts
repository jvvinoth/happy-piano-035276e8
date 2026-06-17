import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en/translation.json'
import ja from './locales/ja/translation.json'
import ar from './locales/ar/translation.json'
import th from './locales/th/translation.json'
import id from './locales/id/translation.json'
import ms from './locales/ms/translation.json'
import bn from './locales/bn/translation.json'
import ta from './locales/ta/translation.json'
import hi from './locales/hi/translation.json'
import ur from './locales/ur/translation.json'
import zhCN from './locales/zh-CN/translation.json'
import tl from './locales/tl/translation.json'
import vi from './locales/vi/translation.json'
import ko from './locales/ko/translation.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    defaultNS: 'translation',
    resources: {
      en:    { translation: en },
      ja:    { translation: ja },
      ar:    { translation: ar },
      th:    { translation: th },
      id:    { translation: id },
      ms:    { translation: ms },
      bn:    { translation: bn },
      ta:    { translation: ta },
      hi:    { translation: hi },
      ur:    { translation: ur },
      'zh-CN': { translation: zhCN },
      tl:    { translation: tl },
      vi:    { translation: vi },
      ko:    { translation: ko },
    },
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n
