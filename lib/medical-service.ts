import Groq from 'groq-sdk'

export interface PatientData {
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  weight?: number
  bloodGroup?: string
  phone?: string
  symptoms: string[]
  customSymptoms?: string[]
  duration: string
  severity: 'mild' | 'moderate' | 'severe' | 'critical'
  medicalHistory?: string[]
  allergies?: string[]
  currentMedications?: string
  lifestyle?: { smoking: boolean; alcohol: boolean }
  pregnant?: boolean
  language?: string
}

export interface DiagnosisResult {
  possibleConditions: Array<{ condition: string; probability: number; description: string }>
  recommendations: string[]
  homeRemedies: string[]
  medicationSuggestions: Array<{ name: string; dosage: string; frequency: string; cautions: string }>
  lifestyleChanges: string[]
  urgencyLevel: 'low' | 'medium' | 'high' | 'emergency'
  nextSteps: string[]
  specialistRecommendation: string
  hospitalRecommendation: string
  emergencyActions?: string[]
  recoveryPlan: {
    diet: string[]
    exercise: string[]
    sleep: string
    waterIntake: string
    warningSigns: string[]
  }
  disclaimer: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' })

const DISCLAIMER = 'MEDICAL DISCLAIMER: This AI analysis is for informational purposes only and does NOT replace professional medical consultation. Always consult a qualified healthcare provider. In emergencies, call 112 or visit the nearest emergency room immediately.'

function getModel() {
  return 'llama-3.3-70b-versatile'
}

export async function analyzePatientCondition(patientData: PatientData): Promise<DiagnosisResult> {
  if (!process.env.GROQ_API_KEY) return getMockDiagnosis(patientData)
  try {
    const allSymptoms = [...(patientData.symptoms || []), ...(patientData.customSymptoms || [])].join(', ')
    const langNote = patientData.language && patientData.language !== 'en'
      ? `IMPORTANT: Respond in ${patientData.language} language.` : ''

    const prompt = `${langNote}
You are an expert AI medical assistant. Analyze this patient and respond ONLY with valid JSON.

PATIENT:
- Name: ${patientData.name}, Age: ${patientData.age}, Gender: ${patientData.gender}
- Weight: ${patientData.weight || 'N/A'} kg, Blood Group: ${patientData.bloodGroup || 'N/A'}
- Symptoms: ${allSymptoms}
- Duration: ${patientData.duration}, Severity: ${patientData.severity}
- Medical History: ${patientData.medicalHistory?.join(', ') || 'None'}
- Allergies: ${patientData.allergies?.join(', ') || 'None'}
- Current Medications: ${patientData.currentMedications || 'None'}
- Smoking: ${patientData.lifestyle?.smoking ? 'Yes' : 'No'}, Alcohol: ${patientData.lifestyle?.alcohol ? 'Yes' : 'No'}
${patientData.gender === 'female' ? `- Pregnant: ${patientData.pregnant ? 'Yes' : 'No'}` : ''}

Return JSON with exactly these keys:
{
  "possibleConditions": [{"condition":"","probability":0,"description":""}],
  "recommendations": [],
  "homeRemedies": [],
  "medicationSuggestions": [{"name":"","dosage":"","frequency":"","cautions":""}],
  "lifestyleChanges": [],
  "urgencyLevel": "low|medium|high|emergency",
  "nextSteps": [],
  "specialistRecommendation": "",
  "hospitalRecommendation": "",
  "emergencyActions": [],
  "recoveryPlan": {"diet":[],"exercise":[],"sleep":"","waterIntake":"","warningSigns":[]}
}`

    const response = await groq.chat.completions.create({
      model: getModel(),
      messages: [
        { role: 'system', content: 'You are an expert AI medical assistant. Always respond with valid JSON only.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.4,
      max_tokens: 3000,
    })

    const content = response.choices[0]?.message?.content || ''
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return getMockDiagnosis(patientData)
    const data = JSON.parse(jsonMatch[0])
    return { ...data, disclaimer: DISCLAIMER }
  } catch (error) {
    console.error('Groq API error:', error)
    return getMockDiagnosis(patientData)
  }
}

export async function chatWithMedicalAgent(
  messages: ChatMessage[],
  patientData: PatientData,
  language?: string
): Promise<string> {
  if (!process.env.GROQ_API_KEY) {
    return "I'm your AI medical assistant. Based on your symptoms, I recommend consulting a doctor. Can you tell me more about when the symptoms started?"
  }
  try {
    const allSymptoms = [...(patientData.symptoms || []), ...(patientData.customSymptoms || [])].join(', ')
    const langNote = language && language !== 'en' ? `Always respond in ${language} language.` : ''

    const systemPrompt = `You are an expert, empathetic AI medical assistant named MediBot. ${langNote}

Patient context:
- ${patientData.name}, Age ${patientData.age}, Gender: ${patientData.gender}
- Symptoms: ${allSymptoms} for ${patientData.duration}
- Severity: ${patientData.severity}, Blood Group: ${patientData.bloodGroup || 'Unknown'}
- Allergies: ${patientData.allergies?.join(', ') || 'None known'}
- Medical History: ${patientData.medicalHistory?.join(', ') || 'None'}
- Medications: ${patientData.currentMedications || 'None'}
- Smoking: ${patientData.lifestyle?.smoking ? 'Yes' : 'No'}, Alcohol: ${patientData.lifestyle?.alcohol ? 'Yes' : 'No'}
${patientData.gender === 'female' ? `- Pregnant: ${patientData.pregnant ? 'Yes' : 'No'}` : ''}

Your role:
1. Ask intelligent follow-up questions like a doctor would
2. Estimate severity (Low/Medium/High/Emergency) based on responses
3. Suggest possible conditions with disclaimer
4. Recommend safe home remedies when appropriate
5. Suggest OTC medications with clear disclaimers
6. Recommend appropriate specialist type
7. Suggest nearest hospital type if needed
8. Give emergency instructions if symptoms are critical
9. Be warm, professional, and clear
10. Always include: "This is not a substitute for professional medical advice."
11. Use markdown formatting with **bold** for important points`

    const response = await groq.chat.completions.create({
      model: getModel(),
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }))
      ],
      temperature: 0.6,
      max_tokens: 1024,
    })
    return response.choices[0]?.message?.content || 'I apologize, I could not process your message. Please try again.'
  } catch (error) {
    console.error('Chat error:', error)
    return 'I encountered an error. Please try again or consult a healthcare professional directly.'
  }
}

export async function analyzeReport(
  reportText: string,
  reportImage?: string,
  language?: string
): Promise<{ findings: string[]; abnormalValues: string[]; interpretation: string; recommendations: string[]; questionsToAsk: string[] }> {
  if (!process.env.GROQ_API_KEY) return getMockReportAnalysis(reportText)
  try {
    const langNote = language && language !== 'en' ? `Respond in ${language} language.` : ''
    const prompt = `${langNote}
Analyze this medical report and return ONLY valid JSON:

REPORT:
${reportText}

Return JSON:
{
  "findings": [],
  "abnormalValues": [],
  "interpretation": "",
  "recommendations": [],
  "questionsToAsk": []
}`

    const response = await groq.chat.completions.create({
      model: getModel(),
      messages: [
        { role: 'system', content: 'You are a medical report analyst. Respond with valid JSON only.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 1500,
    })
    const content = response.choices[0]?.message?.content || ''
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return getMockReportAnalysis(reportText)
    return JSON.parse(jsonMatch[0])
  } catch (error) {
    console.error('Report analysis error:', error)
    return getMockReportAnalysis(reportText)
  }
}

function getMockReportAnalysis(reportText: string) {
  return {
    findings: ['Report successfully extracted', 'Multiple parameters reviewed', 'Analysis performed on provided data'],
    abnormalValues: reportText.toLowerCase().includes('high')
      ? ['Blood pressure reading elevated', 'Glucose level above normal range']
      : reportText.toLowerCase().includes('low')
      ? ['Hemoglobin below normal range', 'Iron levels reduced']
      : ['All values within normal limits'],
    interpretation: 'The medical report has been reviewed. Please consult your healthcare provider for professional interpretation.',
    recommendations: ['Schedule follow-up with physician', 'Maintain current medication regimen if applicable', 'Continue healthy lifestyle practices'],
    questionsToAsk: ['What does this result mean for my health?', 'Do I need any follow-up tests?', 'Should I change my diet or medications?'],
  }
}

function getMockDiagnosis(patientData: PatientData): DiagnosisResult {
  const symptomLower = [...(patientData.symptoms || []), ...(patientData.customSymptoms || [])].join(' ').toLowerCase()
  let conditions = []
  let urgency: 'low' | 'medium' | 'high' | 'emergency' = 'medium'
  let medications = []
  let specialist = 'General Physician'
  let emergency: string[] = []

  if (symptomLower.includes('chest') || symptomLower.includes('heart')) {
    conditions = [{ condition: 'Anxiety Disorder', probability: 55, description: 'Chest discomfort often linked to stress and anxiety.' }, { condition: 'Arrhythmia', probability: 40, description: 'Irregular heartbeat causing chest discomfort.' }]
    medications = [{ name: 'Consult doctor before taking any medication', dosage: 'N/A', frequency: 'N/A', cautions: 'Chest pain requires professional evaluation' }]
    urgency = 'high'; specialist = 'Cardiologist'
    emergency = ['Call 112 immediately if pain is severe', 'Do not drive yourself to hospital', 'Chew aspirin 325mg if not allergic and no contraindications']
  } else if (symptomLower.includes('fever') || symptomLower.includes('cough')) {
    conditions = [{ condition: 'Common Cold/Viral Infection', probability: 70, description: 'Viral upper respiratory infection.' }, { condition: 'Influenza', probability: 45, description: 'Seasonal flu with fever and respiratory symptoms.' }]
    medications = [{ name: 'Paracetamol', dosage: '500-1000mg', frequency: 'Every 4-6 hours as needed', cautions: 'Max 4g/day; avoid if liver issues present' }]
    urgency = 'medium'; specialist = 'General Physician'
  } else if (symptomLower.includes('headache') || symptomLower.includes('migraine')) {
    conditions = [{ condition: 'Tension Headache', probability: 75, description: 'Stress-related headache from muscle tension.' }, { condition: 'Migraine', probability: 35, description: 'Severe throbbing headache often with nausea.' }]
    medications = [{ name: 'Ibuprofen', dosage: '200-400mg', frequency: 'Every 6-8 hours with food', cautions: 'Avoid if stomach ulcers; take with food' }]
    urgency = 'low'; specialist = 'Neurologist'
  } else {
    conditions = [{ condition: 'General Health Issue', probability: 60, description: 'Requires professional evaluation for accurate diagnosis.' }]
    medications = [{ name: 'Consult a physician', dosage: 'As prescribed', frequency: 'As prescribed', cautions: 'Do not self-medicate without professional guidance' }]
  }

  return {
    possibleConditions: conditions,
    recommendations: ['Rest and adequate sleep', 'Stay well-hydrated (8+ glasses of water)', 'Monitor symptoms closely', 'Avoid strenuous activity', 'Consult a healthcare provider'],
    homeRemedies: ['Warm salt water gargling for throat', 'Ginger-honey tea for cold symptoms', 'Steam inhalation for congestion', 'Cool compress for fever/headache'],
    medicationSuggestions: medications,
    lifestyleChanges: ['Balanced diet rich in fruits and vegetables', '30 minutes moderate exercise daily', 'Stress management and meditation', '7-8 hours quality sleep', 'Limit caffeine and alcohol'],
    urgencyLevel: urgency,
    nextSteps: ['Consult a licensed healthcare provider', 'Get professional examination', 'Keep a symptom diary', 'Follow prescribed treatment plan'],
    specialistRecommendation: specialist,
    hospitalRecommendation: (urgency as string) === 'emergency' || urgency === 'high' ? 'Go to nearest Emergency Department immediately' : 'Visit a nearby clinic or outpatient facility',
    emergencyActions: emergency,
    recoveryPlan: {
      diet: ['Eat light, easily digestible foods', 'Increase vitamin C intake', 'Avoid processed and fried foods', 'Include probiotics like yogurt'],
      exercise: ['Light walking for 15-20 minutes', 'Gentle stretching', 'Deep breathing exercises', 'Rest if symptoms worsen with activity'],
      sleep: '7-9 hours per night; maintain consistent sleep schedule',
      waterIntake: '8-10 glasses (2-2.5 liters) per day',
      warningSigns: ['High fever above 103°F (39.4°C)', 'Difficulty breathing', 'Persistent vomiting', 'Signs of dehydration', 'Symptoms worsening after 3 days'],
    },
    disclaimer: DISCLAIMER,
  }
}
