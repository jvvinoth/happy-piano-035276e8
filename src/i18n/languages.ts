export type TextDirection = 'ltr' | 'rtl'

export interface Language {
  code: string
  name: string
  flag: string
  dir: TextDirection
}

const languages: Language[] = [
  { code: 'en',    name: 'English',          flag: '🇺🇸', dir: 'ltr' },
  { code: 'ja',    name: '日本語',            flag: '🇯🇵', dir: 'ltr' },
  { code: 'ar',    name: 'العربية',           flag: '🇸🇦', dir: 'rtl' },
  { code: 'th',    name: 'ไทย',              flag: '🇹🇭', dir: 'ltr' },
  { code: 'id',    name: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr' },
  { code: 'ms',    name: 'Bahasa Melayu',    flag: '🇲🇾', dir: 'ltr' },
  { code: 'bn',    name: 'বাংলা',            flag: '🇧🇩', dir: 'ltr' },
  { code: 'ta',    name: 'தமிழ்',            flag: '🇮🇳', dir: 'ltr' },
  { code: 'hi',    name: 'हिन्दी',           flag: '🇮🇳', dir: 'ltr' },
  { code: 'ur',    name: 'اردو',             flag: '🇵🇰', dir: 'rtl' },
  { code: 'zh-CN', name: '简体中文',          flag: '🇨🇳', dir: 'ltr' },
  { code: 'tl',    name: 'Tagalog',          flag: '🇵🇭', dir: 'ltr' },
  { code: 'vi',    name: 'Tiếng Việt',       flag: '🇻🇳', dir: 'ltr' },
  { code: 'ko',    name: '한국어',            flag: '🇰🇷', dir: 'ltr' },
]

export default languages
