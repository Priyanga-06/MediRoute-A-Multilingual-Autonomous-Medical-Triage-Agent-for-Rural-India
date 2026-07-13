import { analyzePatientCondition, PatientData } from '@/lib/medical-service'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const patientData = (await request.json()) as PatientData
    const diagnosis = await analyzePatientCondition(patientData)
    return NextResponse.json(diagnosis)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Failed to analyze patient condition' }, { status: 500 })
  }
}
