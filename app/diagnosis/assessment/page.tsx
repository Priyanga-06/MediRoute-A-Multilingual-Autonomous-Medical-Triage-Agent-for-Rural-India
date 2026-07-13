'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, AlertCircle, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'

const SYMPTOMS_LIST = [
  'Fever','Cough','Headache','Fatigue','Body Aches','Sore Throat','Runny Nose',
  'Chest Pain','Shortness of Breath','Nausea','Vomiting','Diarrhea',
  'Abdominal Pain','Joint Pain','Skin Rash','Dizziness','Back Pain',
  'Loss of Appetite','Swollen Lymph Nodes','Night Sweats','Chills',
  'Vision Changes','Hearing Loss','Frequent Urination','Weakness',
]

const BLOOD_GROUPS = ['A+','A-','B+','B-','AB+','AB-','O+','O-']

const MEDICAL_CONDITIONS = [
  'Diabetes','Hypertension','Heart Disease','Asthma','Thyroid Issues',
  'Arthritis','Depression','Anxiety','COPD','Kidney Disease','Liver Disease',
]

const COMMON_ALLERGIES = [
  'Penicillin','Aspirin','Ibuprofen','Sulfa Drugs','Pollen',
  'Dust','Shellfish','Peanuts','Milk','Gluten','Latex',
]

const DURATION_OPTIONS = [
  { value: 'less_than_24h', labelEn: 'Less than 24 hours' },
  { value: '1_3_days', labelEn: '1–3 days' },
  { value: '4_7_days', labelEn: '4–7 days' },
  { value: '1_2_weeks', labelEn: '1–2 weeks' },
  { value: 'more_than_2_weeks', labelEn: 'More than 2 weeks' },
  { value: 'chronic', labelEn: 'Chronic (ongoing)' },
]

export default function AssessmentPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [step, setStep] = useState(1)
  const totalSteps = 5
  const [customSymptomInput, setCustomSymptomInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    name: '', age: '', gender: '', weight: '', bloodGroup: '', phone: '',
    symptoms: [] as string[], customSymptoms: [] as string[],
    duration: '', severity: 'moderate',
    medicalHistory: [] as string[], allergies: [] as string[],
    currentMedications: '', recentExams: '',
    smoking: false, alcohol: false, pregnant: false,
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData(p => ({ ...p, [name]: val }))
    if (errors[name]) setErrors(p => { const n = { ...p }; delete n[name]; return n })
  }

  const toggle = (field: 'symptoms' | 'medicalHistory' | 'allergies', val: string) => {
    setFormData(p => ({
      ...p,
      [field]: p[field].includes(val) ? p[field].filter(x => x !== val) : [...p[field], val],
    }))
  }

  const addCustomSymptom = () => {
    const s = customSymptomInput.trim()
    if (s && !formData.customSymptoms.includes(s)) {
      setFormData(p => ({ ...p, customSymptoms: [...p.customSymptoms, s] }))
      setCustomSymptomInput('')
    }
  }

  const removeCustomSymptom = (s: string) => {
    setFormData(p => ({ ...p, customSymptoms: p.customSymptoms.filter(x => x !== s) }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (step === 1) {
      if (!formData.name.trim()) e.name = t('common.required')
      if (!formData.age || Number(formData.age) < 1 || Number(formData.age) > 120) e.age = 'Enter a valid age (1-120)'
      if (!formData.gender) e.gender = t('common.required')
      if (!formData.phone.trim()) e.phone = t('common.required')
    }
    if (step === 2) {
      if (formData.symptoms.length === 0 && formData.customSymptoms.length === 0) e.symptoms = 'Select at least one symptom'
      if (!formData.duration) e.duration = t('common.required')
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => { if (validate()) setStep(s => Math.min(s + 1, totalSteps)) }
  const handleBack = () => setStep(s => Math.max(s - 1, 1))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      sessionStorage.setItem('patientData', JSON.stringify(formData))
      router.push('/diagnosis/chat')
    } catch {
      setLoading(false)
    }
  }

  const stepLabels = [
    t('assessment.step1'), t('assessment.step2'),
    t('assessment.step3'), t('assessment.step4'), t('assessment.step5'),
  ]

  return (
    <main className="min-h-screen bg-gradient-ocean-light py-8">
      <div className="container-md mx-auto px-4">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 text-sm">
            <Link href="/diagnosis" className="text-primary hover:underline">Diagnosis</Link>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground">{t('assessment.title')}</span>
          </div>
          <h1 className="text-3xl font-bold mb-1">{t('assessment.title')}</h1>
          <p className="text-muted-foreground">{t('assessment.subtitle')}</p>
        </div>

        {/* Disclaimer */}
        <div className="flex gap-3 p-4 border-l-4 border-l-warning bg-warning/5 rounded-lg mb-6">
          <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">This AI assessment is for informational purposes only and does NOT replace professional medical advice. In emergencies, call <strong>112</strong> immediately.</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex gap-1.5 mb-2">
            {stepLabels.map((label, i) => (
              <div key={i} className="flex-1">
                <div className={`h-1.5 rounded-full transition-all duration-300 ${i + 1 <= step ? 'bg-primary' : 'bg-muted'}`} />
                <p className="text-xs text-muted-foreground mt-1 text-center hidden sm:block">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center sm:hidden">Step {step} of {totalSteps}: {stepLabels[step - 1]}</p>
        </div>

        <form onSubmit={handleSubmit} className="card-lg">

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold">{t('assessment.step1')}</h2>
              <div>
                <label className="block text-sm font-medium mb-1.5">{t('assessment.fullName')} <span className="text-destructive">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleInput} className="input-field" placeholder={t('assessment.namePlaceholder')} />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t('assessment.age')} <span className="text-destructive">*</span></label>
                  <input type="number" name="age" value={formData.age} onChange={handleInput} className="input-field" min="1" max="120" placeholder={t('assessment.agePlaceholder')} />
                  {errors.age && <p className="text-destructive text-xs mt-1">{errors.age}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t('assessment.gender')} <span className="text-destructive">*</span></label>
                  <select name="gender" value={formData.gender} onChange={handleInput} className="input-field">
                    <option value="">Select</option>
                    <option value="male">{t('common.male')}</option>
                    <option value="female">{t('common.female')}</option>
                    <option value="other">{t('common.other')}</option>
                  </select>
                  {errors.gender && <p className="text-destructive text-xs mt-1">{errors.gender}</p>}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t('assessment.weight')}</label>
                  <input type="number" name="weight" value={formData.weight} onChange={handleInput} className="input-field" placeholder={t('assessment.weightPlaceholder')} min="1" max="500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t('assessment.bloodGroup')}</label>
                  <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInput} className="input-field">
                    <option value="">Select blood group</option>
                    {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">{t('assessment.phone')} <span className="text-destructive">*</span></label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInput} className="input-field" placeholder={t('assessment.phonePlaceholder')} />
                {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Symptoms */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold">{t('assessment.step2')}</h2>
              <div>
                <label className="block text-sm font-medium mb-3">{t('assessment.symptoms')} <span className="text-destructive">*</span></label>
                <div className="grid sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                  {SYMPTOMS_LIST.map(s => (
                    <label key={s} className={`flex items-center gap-2.5 p-2.5 border rounded-lg cursor-pointer transition-colors ${formData.symptoms.includes(s) ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}>
                      <input type="checkbox" checked={formData.symptoms.includes(s)} onChange={() => toggle('symptoms', s)} className="w-4 h-4 accent-primary" />
                      <span className="text-sm">{s}</span>
                    </label>
                  ))}
                </div>
                {errors.symptoms && <p className="text-destructive text-xs mt-1">{errors.symptoms}</p>}
              </div>
              {/* Custom symptoms */}
              <div>
                <label className="block text-sm font-medium mb-1.5">{t('assessment.customSymptom')}</label>
                <div className="flex gap-2">
                  <input type="text" value={customSymptomInput} onChange={e => setCustomSymptomInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCustomSymptom())} className="input-field" placeholder={t('assessment.customSymptomPlaceholder')} />
                  <button type="button" onClick={addCustomSymptom} className="btn btn-outline px-3"><Plus className="w-4 h-4" /></button>
                </div>
                {formData.customSymptoms.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.customSymptoms.map(s => (
                      <span key={s} className="flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                        {s}<button type="button" onClick={() => removeCustomSymptom(s)}><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t('assessment.duration')} <span className="text-destructive">*</span></label>
                  <select name="duration" value={formData.duration} onChange={handleInput} className="input-field">
                    <option value="">Select duration</option>
                    {DURATION_OPTIONS.map(d => <option key={d.value} value={d.value}>{d.labelEn}</option>)}
                  </select>
                  {errors.duration && <p className="text-destructive text-xs mt-1">{errors.duration}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t('assessment.severity')}</label>
                  <select name="severity" value={formData.severity} onChange={handleInput} className="input-field">
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Medical History */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold">{t('assessment.step3')}</h2>
              <div>
                <label className="block text-sm font-medium mb-3">{t('assessment.medHistory')}</label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {MEDICAL_CONDITIONS.map(c => (
                    <label key={c} className={`flex items-center gap-2.5 p-2.5 border rounded-lg cursor-pointer transition-colors ${formData.medicalHistory.includes(c) ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}>
                      <input type="checkbox" checked={formData.medicalHistory.includes(c)} onChange={() => toggle('medicalHistory', c)} className="w-4 h-4 accent-primary" />
                      <span className="text-sm">{c}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3">{t('assessment.allergies')}</label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {COMMON_ALLERGIES.map(a => (
                    <label key={a} className={`flex items-center gap-2.5 p-2.5 border rounded-lg cursor-pointer transition-colors ${formData.allergies.includes(a) ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}>
                      <input type="checkbox" checked={formData.allergies.includes(a)} onChange={() => toggle('allergies', a)} className="w-4 h-4 accent-primary" />
                      <span className="text-sm">{a}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">{t('assessment.medications')}</label>
                <textarea name="currentMedications" value={formData.currentMedications} onChange={handleInput} className="textarea-field" placeholder={t('assessment.medPlaceholder')} />
              </div>
            </div>
          )}

          {/* Step 4: Lifestyle */}
          {step === 4 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold">{t('assessment.step4')}</h2>
              <div className="space-y-3">
                {[
                  { name: 'smoking', label: t('assessment.smoking') },
                  { name: 'alcohol', label: t('assessment.alcohol') },
                ].map(item => (
                  <label key={item.name} className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/30">
                    <span className="font-medium">{item.label}</span>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="radio" name={item.name} value="yes" checked={(formData as any)[item.name] === true}
                          onChange={() => setFormData(p => ({ ...p, [item.name]: true }))} className="accent-primary" />
                        <span className="text-sm">{t('common.yes')}</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="radio" name={item.name} value="no" checked={(formData as any)[item.name] === false}
                          onChange={() => setFormData(p => ({ ...p, [item.name]: false }))} className="accent-primary" />
                        <span className="text-sm">{t('common.no')}</span>
                      </label>
                    </div>
                  </label>
                ))}
                {formData.gender === 'female' && (
                  <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/30">
                    <span className="font-medium">{t('assessment.pregnant')}</span>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="radio" name="pregnant" value="yes" checked={formData.pregnant === true}
                          onChange={() => setFormData(p => ({ ...p, pregnant: true }))} className="accent-primary" />
                        <span className="text-sm">{t('common.yes')}</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="radio" name="pregnant" value="no" checked={formData.pregnant === false}
                          onChange={() => setFormData(p => ({ ...p, pregnant: false }))} className="accent-primary" />
                        <span className="text-sm">{t('common.no')}</span>
                      </label>
                    </div>
                  </label>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">{t('assessment.step5')}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: t('assessment.fullName'), value: formData.name },
                  { label: t('assessment.age'), value: `${formData.age} years` },
                  { label: t('assessment.gender'), value: formData.gender },
                  { label: t('assessment.weight'), value: formData.weight ? `${formData.weight} kg` : 'N/A' },
                  { label: t('assessment.bloodGroup'), value: formData.bloodGroup || 'N/A' },
                  { label: t('assessment.phone'), value: formData.phone },
                ].map(item => (
                  <div key={item.label} className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                    <p className="font-semibold capitalize">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-xs font-medium text-muted-foreground mb-1">{t('assessment.symptoms')}</p>
                <div className="flex flex-wrap gap-1.5">
                  {[...formData.symptoms, ...formData.customSymptoms].map(s => (
                    <span key={s} className="badge text-xs">{s}</span>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-xs font-medium text-muted-foreground">{t('assessment.duration')}</p>
                <p className="font-semibold">{formData.duration.replace(/_/g, ' ')}</p>
              </div>
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm font-medium text-primary">✓ After submission, our AI medical agent will analyze your data and begin an interactive consultation.</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8 pt-5 border-t border-border">
            {step > 1 && (
              <button type="button" onClick={handleBack} className="btn btn-ghost">
                {t('common.previous')}
              </button>
            )}
            {step < totalSteps ? (
              <button type="button" onClick={handleNext} className="btn btn-primary ml-auto">
                {t('common.next')}
              </button>
            ) : (
              <button type="submit" disabled={loading} className="btn btn-primary ml-auto disabled:opacity-50">
                {loading ? t('assessment.analyzing') : t('assessment.analyze')}
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}
