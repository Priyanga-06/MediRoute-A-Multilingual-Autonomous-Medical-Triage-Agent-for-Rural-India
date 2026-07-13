'use client'
import Link from 'next/link'
import { Stethoscope, MapPin, FileText, AlertCircle, ArrowRight, Brain, Heart, Activity } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export default function DiagnosisHub() {
  const { t } = useLanguage()
  const features = [
    { icon: Stethoscope, titleKey: 'diagnosis.feature1.title', descKey: 'diagnosis.feature1.desc', link: '/diagnosis/assessment', badgeKey: 'diagnosis.badge' },
    { icon: MapPin, titleKey: 'diagnosis.feature2.title', descKey: 'diagnosis.feature2.desc', link: '/diagnosis/nearby-hospitals', badgeKey: null },
    { icon: FileText, titleKey: 'diagnosis.feature3.title', descKey: 'diagnosis.feature3.desc', link: '/diagnosis/report-analyzer', badgeKey: null },
    { icon: Heart, titleKey: 'diagnosis.feature4.title', descKey: 'diagnosis.feature4.desc', link: '/diagnosis/recovery', badgeKey: null },
  ]
  const steps = [
    { step: '01', icon: Stethoscope, titleKey: 'diagnosis.step1.title', descKey: 'diagnosis.step1.desc' },
    { step: '02', icon: Brain, titleKey: 'diagnosis.step2.title', descKey: 'diagnosis.step2.desc' },
    { step: '03', icon: Activity, titleKey: 'diagnosis.step3.title', descKey: 'diagnosis.step3.desc' },
    { step: '04', icon: MapPin, titleKey: 'diagnosis.step4.title', descKey: 'diagnosis.step4.desc' },
  ]
  return (
    <main className="min-h-screen bg-gradient-ocean-light">
      <section className="section">
        <div className="container-lg mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Brain className="w-4 h-4" /> {t('diagnosis.powered')}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('diagnosis.title')}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('diagnosis.subtitle')}</p>
          </div>
          <div className="flex gap-3 p-4 border border-warning/30 bg-warning/5 rounded-xl mb-10 items-start">
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">{t('diagnosis.disclaimer')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {features.map(f => {
              const Icon = f.icon
              return (
                <Link key={f.titleKey} href={f.link} className="group">
                  <div className="card-lg bg-gradient-to-br from-primary/10 to-primary/5 hover:shadow-xl transition-all duration-300 h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-white/60 dark:bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        {f.badgeKey && <span className="badge text-xs">{t(f.badgeKey)}</span>}
                      </div>
                      <h3 className="text-lg font-bold mb-2">{t(f.titleKey)}</h3>
                      <p className="text-muted-foreground text-sm mb-5 flex-grow">{t(f.descKey)}</p>
                      <div className="flex items-center gap-2 text-primary text-sm font-semibold group-hover:translate-x-1 transition-transform">
                        {t('common.getStarted')} <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
      <section className="section bg-card/50 border-t border-border">
        <div className="container-lg mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">{t('diagnosis.how.title')}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map(item => {
              const Icon = item.icon
              return (
                <div key={item.step} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-3 text-sm font-bold">{item.step}</div>
                  <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <h3 className="font-bold mb-1">{t(item.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(item.descKey)}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-sm mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t('diagnosis.ready.title')}</h2>
          <p className="text-muted-foreground mb-6">{t('diagnosis.ready.subtitle')}</p>
          <Link href="/diagnosis/assessment" className="btn btn-primary btn-lg">
            <Stethoscope className="w-5 h-5" /> {t('common.beginAssessment')}
          </Link>
        </div>
      </section>
    </main>
  )
}
