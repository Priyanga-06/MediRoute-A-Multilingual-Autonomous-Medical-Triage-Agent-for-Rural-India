'use client'
import { Heart, Clock, Stethoscope, Calendar, MapPin, Brain, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Testimonials } from '@/components/testimonials'
import { useLanguage } from '@/lib/language-context'

export default function Home() {
  const { t } = useLanguage()
  const stats = [
    { labelKey: 'home.stat.patients', value: '50K+' },
    { labelKey: 'home.stat.doctors', value: '150+' },
    { labelKey: 'home.stat.treatments', value: '98%' },
    { labelKey: 'home.stat.years', value: '25+' },
  ]
  const services = [
    { icon: Stethoscope, titleKey: 'home.service.doctors', descKey: 'home.service.doctors.desc' },
    { icon: Calendar, titleKey: 'home.service.appointments', descKey: 'home.service.appointments.desc' },
    { icon: Clock, titleKey: 'home.service.emergency', descKey: 'home.service.emergency.desc' },
    { icon: Heart, titleKey: 'home.service.care', descKey: 'home.service.care.desc' },
    { icon: Brain, titleKey: 'home.service.ai', descKey: 'home.service.ai.desc' },
    { icon: MapPin, titleKey: 'home.service.hospitals', descKey: 'home.service.hospitals.desc' },
  ]
  return (
    <main className="min-h-screen bg-gradient-ocean-light">
      <section className="section relative overflow-hidden">
        <div className="container-lg mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <div>
                <div className="inline-block mb-4"><span className="badge">{t('home.badge')}</span></div>
                <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{t('home.hero.title')}</h1>
              </div>
              <p className="text-xl text-muted-foreground">{t('home.hero.subtitle')}</p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/diagnosis" className="btn btn-primary btn-lg flex items-center gap-2"><Brain className="w-5 h-5" />{t('common.aiHealthCheck')}</Link>
                <Link href="/appointments" className="btn btn-outline btn-lg">{t('common.bookAppointment')}</Link>
              </div>
            </div>
            <div className="hidden md:block relative h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl border border-border bg-card p-8 shadow-2xl h-full flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center"><Brain className="w-10 h-10 text-white" /></div>
                <p className="text-lg font-bold text-center">AI-Powered Health Assistant</p>
                <p className="text-sm text-muted-foreground text-center">Multilingual · Real-time · Voice Enabled</p>
                <div className="flex gap-2 flex-wrap justify-center">
                  {['English','हिंदी','தமிழ்','മലയാളം','తెలుగు','ಕನ್ನಡ'].map(l => <span key={l} className="badge text-xs">{l}</span>)}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
            {stats.map((s, i) => (
              <div key={i} className="card text-center">
                <p className="text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground">{t(s.labelKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-y border-border">
        <div className="container-lg mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">{t('home.cta.title')}</h2>
              <p className="text-muted-foreground mt-1">{t('home.cta.subtitle')}</p>
            </div>
            <Link href="/diagnosis" className="btn btn-primary btn-lg flex items-center gap-2 flex-shrink-0">
              {t('common.aiHealthCheck')} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-card/50 border-b border-border">
        <div className="container-lg mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-3">{t('home.services.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('home.services.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} className="card hover:-translate-y-1 transition-transform group">
                  <div className="w-11 h-11 bg-primary/10 group-hover:bg-primary/20 rounded-lg flex items-center justify-center mb-3 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{t(s.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm">{t(s.descKey)}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="section">
        <div className="container-sm mx-auto text-center space-y-5">
          <h2 className="text-4xl font-bold">{t('home.ready.title')}</h2>
          <p className="text-lg text-muted-foreground">{t('home.ready.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnosis" className="btn btn-primary btn-lg flex items-center gap-2"><Brain className="w-5 h-5" />{t('common.aiHealthCheck')}</Link>
            <Link href="/appointments" className="btn btn-outline btn-lg flex items-center gap-2"><Calendar className="w-5 h-5" />{t('common.bookAppointment')}</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
