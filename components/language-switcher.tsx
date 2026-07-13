'use client'

import { useState } from 'react'
import { Globe, X, Check } from 'lucide-react'
import { LANGUAGES, LanguageCode } from '@/lib/languages'
import { useLanguage } from '@/lib/language-context'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [showPanel, setShowPanel] = useState(false)

  const handleSelect = (lang: LanguageCode) => {
    setLanguage(lang)
    setShowPanel(false)
  }

  return (
    <div className="relative">
      {/* Toggle Button — white pill with green accent */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-semibold transition-all shadow-sm ${
          showPanel
            ? 'bg-emerald-50 border-emerald-400 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-500 dark:text-emerald-300'
            : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-400 hover:text-emerald-600 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:border-emerald-500'
        }`}
        aria-label="Language selector"
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="uppercase tracking-wide text-xs">{language}</span>
        {/* Tiny green dot indicator */}
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
      </button>

      {/* Dropdown Panel */}
      {showPanel && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setShowPanel(false)} />

          <div className="absolute right-0 top-11 z-50 w-56 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">Language</span>
              </div>
              <button
                onClick={() => setShowPanel(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>

            {/* Language List */}
            <div className="p-2">
              {Object.entries(LANGUAGES).map(([code, lang]) => {
                const isSelected = language === code
                return (
                  <button
                    key={code}
                    onClick={() => handleSelect(code as LanguageCode)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all mb-0.5 last:mb-0 ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700'
                        : 'hover:bg-gray-50 dark:hover:bg-slate-700 border border-transparent'
                    }`}
                  >
                    <div className="text-left">
                      <p className={`text-sm font-semibold ${isSelected ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-700 dark:text-slate-200'}`}>
                        {lang.nativeName}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-slate-500">{lang.name}</p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
