import { analyzeReport } from '@/lib/medical-service'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { reportText, reportImage, language } = await request.json()
    const analysis = await analyzeReport(reportText, reportImage, language)
    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Report analysis error:', error)
    return NextResponse.json({ error: 'Failed to analyze medical report' }, { status: 500 })
  }
}
