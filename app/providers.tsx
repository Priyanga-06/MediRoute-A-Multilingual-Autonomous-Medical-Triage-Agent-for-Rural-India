'use client'

import { createContext, useContext, useEffect } from 'react'
import { LanguageProvider } from '@/lib/language-context'

// ─── THEME ────────────────────────────────────────────────────────────────────
// App is permanently light mode — no dark toggle exposed
interface ThemeContextType {
  theme: 'light'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
})

function ThemeManager({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Force light mode — remove any dark class, persist light
    document.documentElement.classList.remove('dark')
    document.documentElement.style.colorScheme = 'light'
    localStorage.setItem('theme', 'light')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeManager>
        {children}
      </ThemeManager>
    </LanguageProvider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
