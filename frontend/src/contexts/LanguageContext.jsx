import React, { createContext, useContext, useState, useEffect } from 'react'
import { languages, getTranslation } from '../utils/languages'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('tatkaleasy_lang') || 'en')

  useEffect(() => {
    localStorage.setItem('tatkaleasy_lang', lang)
  }, [lang])

  const t = (key) => getTranslation(key, lang)
  const currentLanguage = languages.find((l) => l.code === lang) || languages[0]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, languages, currentLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
