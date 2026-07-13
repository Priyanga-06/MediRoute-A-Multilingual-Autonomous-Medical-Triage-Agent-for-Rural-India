'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { LANGUAGES, LanguageCode, translate } from './languages'

interface LanguageContextType {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en')

  useEffect(() => {
    const saved = localStorage.getItem('preferred-language') as LanguageCode
    if (saved && saved in LANGUAGES) {
      setLanguageState(saved)
      document.documentElement.lang = LANGUAGES[saved].code
    }
  }, [])

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang)
    localStorage.setItem('preferred-language', lang)
    document.documentElement.lang = LANGUAGES[lang].code
  }

  const t = (key: string) => translate(key, language)

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
