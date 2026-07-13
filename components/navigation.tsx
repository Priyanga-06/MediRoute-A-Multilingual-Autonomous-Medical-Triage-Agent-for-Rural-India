'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Brain } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { LanguageSwitcher } from './language-switcher'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  const navItems = [
    { href: '/', labelKey: 'nav.home' },
    { href: '/diagnosis', labelKey: 'nav.diagnosis', highlight: true },
    { href: '/services', labelKey: 'nav.services' },
    { href: '/doctors', labelKey: 'nav.doctors' },
    { href: '/appointments', labelKey: 'nav.appointments' },
    { href: '/about', labelKey: 'nav.about' },
    { href: '/contact', labelKey: 'nav.contact' },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container-lg mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:shadow-lg transition-shadow">
              M
            </div>
            <span className="text-lg md:text-xl font-bold text-foreground hidden sm:inline">
              MediRoute
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-1.5 ${
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground'
                    : item.highlight
                    ? 'text-primary border border-primary/30 hover:bg-primary/10'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {item.highlight && <Brain className="w-3.5 h-3.5" />}
                {t(item.labelKey)}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-border pb-4 pt-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {item.highlight && <Brain className="w-4 h-4" />}
                {t(item.labelKey)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
