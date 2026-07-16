'use client'

import { useEffect, useState } from 'react'
import {
  AlertCircle, Download, MapPin, ChevronRight, Printer,
  Activity, Pill, Heart, Home, ArrowRight, Loader2,
  MessageCircle, ClipboardList,
} from 'lucide-react'
import Link from 'next/link'
import { DiagnosisResult, PatientData } from '@/lib/medical-service'
import { useLanguage } from '@/lib/language-context'

const URGENCY_STYLES = {
  low:       { bg: 'bg-success/10 border-success/30',   text: 'text-success',      label: '🟢 Low'       },
  medium:    { bg: 'bg-warning/10 border-warning/30',   text: 'text-warning',      label: '🟡 Medium'    },
  high:      { bg: 'bg-destructive/10 border-destructive/30', text: 'text-destructive', label: '🔴 High' },
  emergency: { bg: 'bg-destructive/20 border-destructive',    text: 'text-destructive', label: '🚨 Emergency' },
}

export default function ResultsPage() {
  const { t } = useLanguage()
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null)
  const [patientData, setPatientData] = useState<PatientData | null>(null)
  const [loading, setLoading] = useState(true)
  const [downloadLoading, setDownloadLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'recovery' | 'medications'>('overview')

  useEffect(() => {
    const run = async () => {
      const dataStr = sessionStorage.getItem('patientData')
      if (!dataStr) { window.location.href = '/diagnosis/assessment'; return }
      const data = JSON.parse(dataStr) as PatientData
      setPatientData(data)

      const cached = sessionStorage.getItem('diagnosisResult')
      if (cached) { setDiagnosis(JSON.parse(cached)); setLoading(false); return }

      try {
        const res = await fetch('/api/analyze-diagnosis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (!res.ok) throw new Error()
        const result = await res.json()
        setDiagnosis(result)
        sessionStorage.setItem('diagnosisResult', JSON.stringify(result))
      } catch {
        console.error('Failed to load diagnosis')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  const generatePDF = async () => {
    if (!diagnosis || !patientData) return
    setDownloadLoading(true)
    try {
      const chatRaw = sessionStorage.getItem('chatMessages')
      const chatMessages = chatRaw ? JSON.parse(chatRaw) : []
      const chatSummary = chatMessages.slice(1).map((m: any) => `${m.role === 'user' ? 'Patient' : 'MediBot'}: ${m.content.replace(/\*\*/g, '')}`).join('\n\n')
      const allSymptoms = [...(patientData.symptoms || []), ...(patientData.customSymptoms || [])].join(', ')
      const now = new Date()
      const dateStr = now.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
      const timeStr = now.toLocaleTimeString('en-IN')

      const content = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         MEDIROUTE AI HEALTH REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated: ${dateStr} at ${timeStr}
Report ID: MR-${Date.now().toString(36).toUpperCase()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PATIENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:         ${patientData.name}
Age:          ${patientData.age} years
Gender:       ${patientData.gender}
Weight:       ${patientData.weight ? patientData.weight + ' kg' : 'N/A'}
Blood Group:  ${patientData.bloodGroup || 'N/A'}
Phone:        ${patientData.phone || 'N/A'}
Allergies:    ${patientData.allergies?.join(', ') || 'None'}
Smoking:      ${patientData.lifestyle?.smoking ? 'Yes' : 'No'}
Alcohol:      ${patientData.lifestyle?.alcohol ? 'Yes' : 'No'}
${patientData.gender === 'female' ? `Pregnant:     ${patientData.pregnant ? 'Yes' : 'No'}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SYMPTOMS & ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Symptoms:     ${allSymptoms}
Duration:     ${patientData.duration?.replace(/_/g, ' ')}
Severity:     ${patientData.severity?.toUpperCase()}
Urgency:      ${diagnosis.urgencyLevel?.toUpperCase()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POSSIBLE CONDITIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${diagnosis.possibleConditions?.map((c, i) => `${i + 1}. ${c.condition} (${c.probability}% probability)\n   ${c.description}`).join('\n\n') || 'N/A'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RECOMMENDATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${diagnosis.recommendations?.map((r, i) => `${i + 1}. ${r}`).join('\n') || 'N/A'}

HOME REMEDIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${diagnosis.homeRemedies?.map((r, i) => `${i + 1}. ${r}`).join('\n') || 'N/A'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MEDICATION SUGGESTIONS (OTC GUIDANCE ONLY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${diagnosis.medicationSuggestions?.map((m, i) => `${i + 1}. ${m.name}\n   Dosage: ${m.dosage}\n   Frequency: ${m.frequency}\n   Cautions: ${m.cautions}`).join('\n\n') || 'N/A'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RECOVERY PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Diet:
${diagnosis.recoveryPlan?.diet?.map(d => '  • ' + d).join('\n') || 'N/A'}

Exercise:
${diagnosis.recoveryPlan?.exercise?.map(e => '  • ' + e).join('\n') || 'N/A'}

Sleep:        ${diagnosis.recoveryPlan?.sleep || 'N/A'}
Water Intake: ${diagnosis.recoveryPlan?.waterIntake || 'N/A'}

Warning Signs (seek immediate care):
${diagnosis.recoveryPlan?.warningSigns?.map(w => '  ⚠ ' + w).join('\n') || 'N/A'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPECIALIST & HOSPITAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Recommended Specialist: ${diagnosis.specialistRecommendation || 'General Physician'}
Hospital Recommendation: ${diagnosis.hospitalRecommendation || 'Visit nearest clinic'}
${diagnosis.emergencyActions?.length ? '\nEMERGENCY ACTIONS:\n' + diagnosis.emergencyActions.map(a => '  🚨 ' + a).join('\n') : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LIFESTYLE CHANGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${diagnosis.lifestyleChanges?.map((l, i) => `${i + 1}. ${l}`).join('\n') || 'N/A'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AI CONSULTATION SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${chatSummary || 'No consultation recorded.'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPORTANT DISCLAIMER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${diagnosis.disclaimer}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MediRoute AI Health Platform | Powered by Groq AI
For emergencies call: 112
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `MediRoute_Report_${patientData.name.replace(/\s+/g, '_')}_${now.toISOString().slice(0, 10)}.txt`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setDownloadLoading(false)
    }
  }

  const handlePrint = () => window.print()

  if (loading) return (
    <main className="min-h-screen bg-gradient-ocean-light flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <Activity className="w-8 h-8 text-primary absolute inset-0 m-auto" />
        </div>
        <p className="text-lg font-medium">{t('assessment.analyzing')}</p>
        <p className="text-sm text-muted-foreground mt-1">This may take a moment…</p>
      </div>
    </main>
  )

  if (!diagnosis || !patientData) return (
    <main className="min-h-screen bg-gradient-ocean-light flex items-center justify-center">
      <div className="card-lg text-center">
        <p className="mb-4">Could not load results.</p>
        <Link href="/diagnosis/assessment" className="btn btn-primary">Start Assessment</Link>
      </div>
    </main>
  )

  const urgencyStyle = URGENCY_STYLES[diagnosis.urgencyLevel] || URGENCY_STYLES.medium
  const allSymptoms = [...(patientData.symptoms || []), ...(patientData.customSymptoms || [])].join(', ')

  return (
    <main className="min-h-screen bg-gradient-ocean-light py-8 print:bg-white">
      <div className="container-md mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-sm mb-2">
              <Link href="/diagnosis" className="text-primary hover:underline">Diagnosis</Link>
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">Results</span>
            </div>
            <h1 className="text-2xl font-bold">{t('results.title')}</h1>
          </div>
          <div className="flex gap-2 print:hidden">
            <button onClick={handlePrint} className="btn btn-outline text-sm flex items-center gap-1.5">
              <Printer className="w-4 h-4" /> {t('common.print')}
            </button>
            <button onClick={generatePDF} disabled={downloadLoading} className="btn btn-primary text-sm flex items-center gap-1.5">
              {downloadLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {t('common.download')} Report
            </button>
          </div>
        </div>

        {/* Urgency Banner */}
        {(diagnosis.urgencyLevel === 'emergency' || diagnosis.urgencyLevel === 'high') && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-xl mb-6 flex gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-destructive">{diagnosis.urgencyLevel === 'emergency' ? '🚨 SEEK EMERGENCY CARE NOW' : '⚠️ Consult a doctor soon'}</p>
              {diagnosis.emergencyActions?.length ? (
                <ul className="mt-1 space-y-0.5">{diagnosis.emergencyActions.map((a, i) => <li key={i} className="text-sm text-destructive">• {a}</li>)}</ul>
              ) : null}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="p-4 bg-warning/5 border-l-4 border-l-warning rounded-lg mb-6">
          <p className="text-xs text-muted-foreground">{diagnosis.disclaimer}</p>
        </div>

        {/* Patient Summary + Urgency */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="p-5 rounded-2xl border-2 border-sky-200 bg-sky-50 shadow-sm">
            <h2 className="font-bold mb-3 text-sky-800 text-base">👤 Patient Summary</h2>
            <div className="space-y-2 text-sm">
              {[
                ['Name', patientData.name],
                ['Age / Gender', `${patientData.age} yrs / ${patientData.gender}`],
                ['Blood Group', patientData.bloodGroup || 'N/A'],
                ['Symptoms', allSymptoms],
                ['Duration', patientData.duration?.replace(/_/g, ' ')],
                ['Severity', patientData.severity],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="text-sky-600 font-semibold w-28 flex-shrink-0">{k}:</span>
                  <span className="font-bold text-slate-800 capitalize">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`p-5 rounded-2xl border-2 ${urgencyStyle.bg} shadow-sm`}>
            <h2 className="font-bold mb-3 text-base">⚡ Urgency Level</h2>
            <p className={`text-3xl font-extrabold ${urgencyStyle.text} mb-2`}>{urgencyStyle.label}</p>
            <p className="text-sm font-semibold text-slate-700 mb-2">Specialist: <strong className="text-slate-900">{diagnosis.specialistRecommendation}</strong></p>
            <p className="text-sm font-semibold text-slate-700">Hospital: <strong className="text-slate-900">{diagnosis.hospitalRecommendation}</strong></p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 bg-muted/50 p-1 rounded-xl print:hidden">
          {(['overview', 'recovery', 'medications'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              {t(`results.tab.${tab}`)}
            </button>
          ))}
        </div>

        {(activeTab === 'overview') && (
          <div className="space-y-5">
            {/* Possible Conditions */}
            <div className="p-5 rounded-2xl border-2 border-indigo-200 bg-indigo-50 shadow-sm">
              <h2 className="font-bold mb-4 flex items-center gap-2 text-indigo-800"><Activity className="w-4 h-4" /> {t('results.conditions')}</h2>
              <div className="space-y-3">
                {diagnosis.possibleConditions?.map((c, i) => (
                  <div key={i} className="p-3 bg-white border border-indigo-100 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-slate-800">{c.condition}</h3>
                      <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">{c.probability}%</span>
                    </div>
                    <div className="w-full bg-indigo-100 rounded-full h-2 mb-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${c.probability}%` }} />
                    </div>
                    <p className="text-sm text-slate-700 font-medium">{c.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50 shadow-sm">
              <h2 className="font-bold mb-4 flex items-center gap-2 text-emerald-800"><ClipboardList className="w-4 h-4" /> {t('results.recommendations')}</h2>
              <ul className="space-y-2">
                {diagnosis.recommendations?.map((r, i) => (
                  <li key={i} className="flex gap-2 text-sm font-semibold text-slate-800"><span className="text-emerald-600 font-bold flex-shrink-0">✓</span>{r}</li>
                ))}
              </ul>
            </div>

            {/* Home Remedies */}
            {diagnosis.homeRemedies?.length > 0 && (
              <div className="p-5 rounded-2xl border-2 border-teal-200 bg-teal-50 shadow-sm">
                <h2 className="font-bold mb-4 flex items-center gap-2 text-teal-800"><Home className="w-4 h-4" /> {t('results.homeRemedies')}</h2>
                <ul className="space-y-2">
                  {diagnosis.homeRemedies.map((r, i) => (
                    <li key={i} className="flex gap-2 text-sm font-semibold text-slate-800"><span className="text-teal-600 font-bold flex-shrink-0">🌿</span>{r}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Lifestyle Changes */}
            <div className="p-5 rounded-2xl border-2 border-orange-200 bg-orange-50 shadow-sm">
              <h2 className="font-bold mb-4 flex items-center gap-2 text-orange-800"><Heart className="w-4 h-4" /> {t('results.lifestyle')}</h2>
              <ul className="space-y-2">
                {diagnosis.lifestyleChanges?.map((l, i) => (
                  <li key={i} className="flex gap-2 text-sm font-semibold text-slate-800"><span className="text-orange-500 flex-shrink-0 font-bold">•</span>{l}</li>
                ))}
              </ul>
            </div>

            {/* Next Steps */}
            <div className="p-5 rounded-2xl border-2 border-blue-200 bg-blue-50 shadow-sm">
              <h2 className="font-bold mb-4 flex items-center gap-2 text-blue-800"><ArrowRight className="w-4 h-4" /> {t('results.nextSteps')}</h2>
              <ol className="space-y-2">
                {diagnosis.nextSteps?.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm font-semibold text-slate-800"><span className="text-blue-600 font-extrabold flex-shrink-0">{i + 1}.</span>{s}</li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* Recovery Tab */}
        {activeTab === 'recovery' && diagnosis.recoveryPlan && (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border-2 border-green-200 bg-green-50 shadow-sm">
                <h3 className="font-bold mb-3 text-green-800">🥗 {t('results.diet')}</h3>
                <ul className="space-y-1.5">{diagnosis.recoveryPlan.diet?.map((d, i) => <li key={i} className="text-sm font-semibold text-slate-800 flex gap-2"><span className="text-green-600">•</span>{d}</li>)}</ul>
              </div>
              <div className="p-5 rounded-2xl border-2 border-blue-200 bg-blue-50 shadow-sm">
                <h3 className="font-bold mb-3 text-blue-800">🏃 {t('results.exercise')}</h3>
                <ul className="space-y-1.5">{diagnosis.recoveryPlan.exercise?.map((e, i) => <li key={i} className="text-sm font-semibold text-slate-800 flex gap-2"><span className="text-blue-600">•</span>{e}</li>)}</ul>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border-2 border-purple-200 bg-purple-50 shadow-sm">
                <h3 className="font-bold mb-2 text-purple-800">😴 {t('results.sleep')}</h3>
                <p className="text-sm font-semibold text-slate-800">{diagnosis.recoveryPlan.sleep}</p>
              </div>
              <div className="p-5 rounded-2xl border-2 border-sky-200 bg-sky-50 shadow-sm">
                <h3 className="font-bold mb-2 text-sky-800">💧 {t('results.water')}</h3>
                <p className="text-sm font-semibold text-slate-800">{diagnosis.recoveryPlan.waterIntake}</p>
              </div>
            </div>
            <div className="p-5 rounded-2xl border-2 border-red-200 bg-red-50 shadow-sm">
              <h3 className="font-bold mb-3 text-red-700">⚠️ {t('results.warningSigns')}</h3>
              <ul className="space-y-1.5">{diagnosis.recoveryPlan.warningSigns?.map((w, i) => <li key={i} className="text-sm font-bold text-red-800 flex gap-2"><span>!</span>{w}</li>)}</ul>
            </div>
          </div>
        )}

        {/* Medications Tab */}
        {activeTab === 'medications' && (
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
              <p className="text-sm font-bold text-amber-800">⚠️ {t('results.otcNote')}</p>
            </div>
            {diagnosis.medicationSuggestions?.map((m, i) => (
              <div key={i} className="p-5 rounded-2xl border-2 border-violet-200 bg-violet-50 shadow-sm">
                <h3 className="font-bold mb-3 flex items-center gap-2 text-violet-800"><Pill className="w-4 h-4" />{m.name}</h3>
                <div className="grid sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-white rounded-lg p-3 border border-violet-100">
                    <p className="text-violet-600 text-xs font-bold mb-0.5">Dosage</p>
                    <p className="font-bold text-slate-800">{m.dosage}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-violet-100">
                    <p className="text-violet-600 text-xs font-bold mb-0.5">Frequency</p>
                    <p className="font-bold text-slate-800">{m.frequency}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-violet-100">
                    <p className="text-violet-600 text-xs font-bold mb-0.5">Cautions</p>
                    <p className="font-bold text-amber-700">{m.cautions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-8 print:hidden">
          <Link href="/diagnosis/chat" className="btn btn-primary flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> {t('results.continueChat')}
          </Link>
          <Link href="/diagnosis/nearby-hospitals" className="btn btn-secondary flex items-center gap-2">
            <MapPin className="w-4 h-4" /> {t('results.findHospitals')}
          </Link>
          <Link href="/diagnosis/report-analyzer" className="btn btn-outline flex items-center gap-2">
            <ClipboardList className="w-4 h-4" /> {t('results.uploadReport')}
          </Link>
          <Link href="/diagnosis/recovery" className="btn btn-outline flex items-center gap-2">
            <Heart className="w-4 h-4" /> {t('results.recoveryPlan')}
          </Link>
        </div>
      </div>
    </main>
  )
}
