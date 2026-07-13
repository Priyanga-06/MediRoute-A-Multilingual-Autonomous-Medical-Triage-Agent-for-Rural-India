'use client'

import { useEffect, useState } from 'react'
import { ChevronRight, Droplets, Moon, Dumbbell, Salad, AlertTriangle, Bell, CheckCircle2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { DiagnosisResult, PatientData } from '@/lib/medical-service'
import { useLanguage } from '@/lib/language-context'

export default function RecoveryPage() {
  const { t } = useLanguage()
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null)
  const [patient, setPatient] = useState<PatientData | null>(null)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const pRaw = sessionStorage.getItem('patientData')
    const dRaw = sessionStorage.getItem('diagnosisResult')
    if (pRaw) setPatient(JSON.parse(pRaw))
    if (dRaw) { setDiagnosis(JSON.parse(dRaw)); setLoading(false) }
    else setLoading(false)
  }, [])

  const toggle = (key: string) => setCheckedItems(p => ({ ...p, [key]: !p[key] }))

  const totalItems = diagnosis ? (
    (diagnosis.recoveryPlan?.diet?.length || 0) +
    (diagnosis.recoveryPlan?.exercise?.length || 0) + 2
  ) : 0
  const completed = Object.values(checkedItems).filter(Boolean).length
  const progress = totalItems > 0 ? Math.round((completed / totalItems) * 100) : 0

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  )

  if (!diagnosis) return (
    <main className="min-h-screen bg-gradient-ocean-light flex items-center justify-center">
      <div className="card-lg text-center max-w-md">
        <p className="mb-4 text-muted-foreground">Please complete an AI health assessment first to get your personalized recovery plan.</p>
        <Link href="/diagnosis/assessment" className="btn btn-primary">Start Assessment</Link>
      </div>
    </main>
  )

  const { recoveryPlan } = diagnosis
  if (!recoveryPlan) return null

  return (
    <main className="min-h-screen bg-gradient-ocean-light py-8">
      <div className="container-md mx-auto px-4">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Link href="/diagnosis" className="text-primary hover:underline">Diagnosis</Link>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <Link href="/diagnosis/results" className="text-primary hover:underline">Results</Link>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground">Recovery Plan</span>
          </div>
          <h1 className="text-3xl font-bold mb-1">{t('recovery.title')}</h1>
          {patient && <p className="text-muted-foreground">Tailored for {patient.name}, {patient.age} yrs</p>}
        </div>

        {/* Progress Tracker */}
        <div className="card-lg p-5 mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold">Today's Recovery Progress</h2>
            <span className="text-2xl font-bold text-primary">{progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 mb-2">
            <div className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm text-muted-foreground">{completed} of {totalItems} daily tasks completed</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Water Intake */}
          <div className="card-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="font-bold">💧 Water Intake</h3>
            </div>
            <p className="text-lg font-semibold text-primary mb-2">{recoveryPlan.waterIntake}</p>
            <label className="flex items-center gap-2 cursor-pointer mt-3 p-2.5 border border-border rounded-lg hover:bg-muted/30">
              <input type="checkbox" checked={!!checkedItems['water']} onChange={() => toggle('water')} className="w-4 h-4 accent-primary" />
              <span className="text-sm">Mark water goal as completed today</span>
            </label>
          </div>

          {/* Sleep */}
          <div className="card-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Moon className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="font-bold">😴 Sleep Recommendation</h3>
            </div>
            <p className="text-lg font-semibold text-primary mb-2">{recoveryPlan.sleep}</p>
            <label className="flex items-center gap-2 cursor-pointer mt-3 p-2.5 border border-border rounded-lg hover:bg-muted/30">
              <input type="checkbox" checked={!!checkedItems['sleep']} onChange={() => toggle('sleep')} className="w-4 h-4 accent-primary" />
              <span className="text-sm">Good sleep last night</span>
            </label>
          </div>

          {/* Diet Plan */}
          <div className="card-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Salad className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="font-bold">🥗 Diet Plan</h3>
            </div>
            <ul className="space-y-2">
              {recoveryPlan.diet?.map((d, i) => (
                <li key={i}>
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-muted/30">
                    <input type="checkbox" checked={!!checkedItems[`diet-${i}`]} onChange={() => toggle(`diet-${i}`)} className="w-4 h-4 accent-primary flex-shrink-0" />
                    <span className={`text-sm ${checkedItems[`diet-${i}`] ? 'line-through text-muted-foreground' : ''}`}>{d}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Exercise Plan */}
          <div className="card-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="font-bold">🏃 Exercise Plan</h3>
            </div>
            <ul className="space-y-2">
              {recoveryPlan.exercise?.map((e, i) => (
                <li key={i}>
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-muted/30">
                    <input type="checkbox" checked={!!checkedItems[`exercise-${i}`]} onChange={() => toggle(`exercise-${i}`)} className="w-4 h-4 accent-primary flex-shrink-0" />
                    <span className={`text-sm ${checkedItems[`exercise-${i}`] ? 'line-through text-muted-foreground' : ''}`}>{e}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Medicine Reminders */}
        {diagnosis.medicationSuggestions?.length > 0 && (
          <div className="card-lg p-5 mt-5">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-primary" />
              <h3 className="font-bold">💊 Medicine Reminders</h3>
            </div>
            <div className="space-y-3">
              {diagnosis.medicationSuggestions.map((m, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.dosage} · {m.frequency}</p>
                  </div>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" checked={!!checkedItems[`med-${i}`]} onChange={() => toggle(`med-${i}`)} className="w-4 h-4 accent-primary" />
                    <span className="text-xs text-muted-foreground">Taken</span>
                  </label>
                </div>
              ))}
            </div>
            <p className="text-xs text-warning mt-3 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> Always follow your doctor's prescription. Do not self-medicate.</p>
          </div>
        )}

        {/* Warning Signs */}
        <div className="card-lg p-5 mt-5 border-l-4 border-l-destructive bg-destructive/5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <h3 className="font-bold text-destructive">⚠️ Seek Immediate Medical Attention If:</h3>
          </div>
          <ul className="space-y-2">
            {recoveryPlan.warningSigns?.map((w, i) => (
              <li key={i} className="flex gap-2 text-sm items-start">
                <span className="text-destructive font-bold flex-shrink-0 mt-0.5">!</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 p-3 bg-destructive/10 rounded-lg">
            <p className="text-sm font-semibold text-destructive">Emergency: Call <strong>112</strong> or go to the nearest hospital</p>
          </div>
        </div>

        {/* Completion Banner */}
        {progress === 100 && (
          <div className="card-lg p-5 mt-5 bg-success/10 border border-success/30 flex items-center gap-4">
            <CheckCircle2 className="w-10 h-10 text-success flex-shrink-0" />
            <div>
              <p className="font-bold text-success text-lg">Great job! 🎉</p>
              <p className="text-sm text-muted-foreground">You've completed all your recovery tasks for today. Keep it up!</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Link href="/diagnosis/results" className="btn btn-outline">← Back to Results</Link>
          <Link href="/diagnosis/chat" className="btn btn-primary">Chat with AI Doctor</Link>
        </div>
      </div>
    </main>
  )
}
