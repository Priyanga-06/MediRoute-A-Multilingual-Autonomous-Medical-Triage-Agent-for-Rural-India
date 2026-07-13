import { chatWithMedicalAgent, PatientData, ChatMessage } from '@/lib/medical-service'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { messages, patientData, language } = (await request.json()) as {
      messages: ChatMessage[]
      patientData: PatientData
      language?: string
    }

    const reply = await chatWithMedicalAgent(messages, patientData, language)
    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 })
  }
}
