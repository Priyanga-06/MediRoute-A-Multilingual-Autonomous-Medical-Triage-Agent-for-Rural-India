'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  Send, Mic, MicOff, Volume2, VolumeX, RefreshCw,
  AlertCircle, Bot, User, FileText, ChevronRight, Loader2,
} from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { speak, stopSpeaking, startListening } from '@/lib/languages'
import { PatientData } from '@/lib/medical-service'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

function renderInline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
    p.startsWith('**') && p.endsWith('**')
      ? <strong key={i}>{p.slice(2, -2)}</strong>
      : <span key={i}>{p}</span>
  )
}

function MarkdownText({ text }: { text: string }) {
  return (
    <div className="space-y-0.5 text-sm leading-relaxed text-slate-800 font-medium">
      {text.split('\n').map((line, i) => {
        if (line.startsWith('## ')) return <p key={i} className="font-extrabold text-base mt-2 text-slate-900">{line.slice(3)}</p>
        if (line.startsWith('# '))  return <p key={i} className="font-extrabold text-lg mt-2 text-slate-900">{line.slice(2)}</p>
        if (line.startsWith('- ') || line.startsWith('• ')) return <div key={i} className="flex gap-2"><span className="text-primary font-bold mt-0.5">•</span><span className="text-slate-800">{renderInline(line.slice(2))}</span></div>
        if (/^\d+\. /.test(line)) return <div key={i} className="flex gap-2"><span className="text-primary font-bold">{line.match(/^\d+/)?.[0]}.</span><span className="text-slate-800">{renderInline(line.replace(/^\d+\. /, ''))}</span></div>
        if (!line.trim()) return <br key={i} />
        return <p key={i} className="text-slate-800">{renderInline(line)}</p>
      })}
    </div>
  )
}

export default function ChatPage() {
  const router = useRouter()
  // Always read fresh language from context — use ref so async callbacks see latest value
  const { language, t } = useLanguage()
  const languageRef = useRef(language)
  const tRef = useRef(t)
  useEffect(() => { languageRef.current = language }, [language])
  useEffect(() => { tRef.current = t }, [t])

  const [patientData, setPatientData] = useState<PatientData | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [recognitionInst, setRecognitionInst] = useState<any>(null)
  const [dots, setDots] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const patientRef = useRef<PatientData | null>(null)
  const messagesRef = useRef<Message[]>([])

  // Keep refs in sync so sendMessage never has stale closure values
  useEffect(() => { patientRef.current = patientData }, [patientData])
  useEffect(() => { messagesRef.current = messages }, [messages])

  useEffect(() => {
    const saved = sessionStorage.getItem('patientData')
    if (!saved) { router.push('/diagnosis/assessment'); return }
    const data = JSON.parse(saved) as PatientData
    setPatientData(data)
    const savedMsgs = sessionStorage.getItem('chatMessages')
    if (savedMsgs) {
      setMessages(JSON.parse(savedMsgs).map((m: Message) => ({ ...m, timestamp: new Date(m.timestamp) })))
    } else {
      const allSymptoms = [...(data.symptoms || []), ...(data.customSymptoms || [])].join(', ')
      const greeting: Message = {
        id: '0', role: 'assistant', timestamp: new Date(),
        content: `Hello **${data.name}**! 👋 I'm **MediBot**, your AI medical assistant.\n\nI've reviewed your assessment:\n- **Age:** ${data.age} | **Gender:** ${data.gender}\n- **Symptoms:** ${allSymptoms}\n- **Duration:** ${data.duration.replace(/_/g, ' ')}\n- **Severity:** ${data.severity}\n\n**Can you describe your main symptom in more detail?**\n- Where exactly do you feel it?\n- Is it constant or comes and goes?\n- What makes it better or worse?\n\n*This is not a substitute for professional medical advice.*`,
      }
      setMessages([greeting])
      sessionStorage.setItem('chatMessages', JSON.stringify([greeting]))
    }
  }, [router])

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  useEffect(() => {
    if (!loading) { setDots(''); return }
    const id = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 400)
    return () => clearInterval(id)
  }, [loading])

  // sendMessage reads from refs — always gets fresh language + messages
  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim()
    const patient = patientRef.current
    const currentMsgs = messagesRef.current
    const currentLang = languageRef.current

    if (!content || loading || !patient) return
    setInput('')

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content, timestamp: new Date() }
    const newMessages = [...currentMsgs, userMsg]
    setMessages(newMessages)
    messagesRef.current = newMessages
    sessionStorage.setItem('chatMessages', JSON.stringify(newMessages))
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          patientData: patient,
          language: currentLang !== 'en' ? currentLang : undefined,
        }),
      })
      const data = await res.json()
      const reply = data.reply || 'Sorry, I could not process your request. Please try again.'
      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: reply, timestamp: new Date() }
      const updated = [...newMessages, assistantMsg]
      setMessages(updated)
      messagesRef.current = updated
      sessionStorage.setItem('chatMessages', JSON.stringify(updated))
      if (voiceEnabled) { speak(reply.replace(/\*\*/g, '').replace(/\n/g, ' '), currentLang); setIsSpeaking(true) }
    } catch {
      const errMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Sorry, an error occurred. Please try again.', timestamp: new Date() }
      setMessages(prev => { const u = [...prev, errMsg]; messagesRef.current = u; return u })
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const toggleVoiceInput = () => {
    if (isListening) { recognitionInst?.stop(); setIsListening(false); return }
    const rec = startListening(transcript => { setInput(transcript); setIsListening(false) }, languageRef.current)
    setRecognitionInst(rec); setIsListening(true)
  }

  const speakLast = () => {
    const last = [...messages].reverse().find(m => m.role === 'assistant')
    if (last) { speak(last.content.replace(/\*\*/g, '').replace(/\n/g, ' '), languageRef.current); setIsSpeaking(true) }
  }

  const clearChat = () => { sessionStorage.removeItem('chatMessages'); window.location.reload() }
  const goToResults = () => { sessionStorage.setItem('chatMessages', JSON.stringify(messages)); router.push('/diagnosis/results') }

  if (!patientData) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-ocean-light">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  )

  const quickPrompts = ['chat.prompt1','chat.prompt2','chat.prompt3','chat.prompt4','chat.prompt5']

  return (
    <main className="min-h-screen bg-gradient-ocean-light flex flex-col">
      <div className="container-md mx-auto px-4 py-4 flex flex-col" style={{ height: '100dvh' }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/diagnosis" className="text-primary hover:underline">Diagnosis</Link>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground">{t('chat.title')}</span>
          </div>
          <div className="flex gap-1.5">
            <button onClick={speakLast} title={t('chat.speakLast')}
              className={`p-2 rounded-lg transition-colors ${isSpeaking ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}`}>
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button onClick={clearChat} title={t('chat.clearChat')} className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={goToResults} className="btn btn-primary text-xs px-3 py-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> {t('chat.viewReport')}
            </button>
          </div>
        </div>

        {/* Patient bar */}
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border mb-3 flex-shrink-0 overflow-x-auto shadow-sm">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {patientData.name[0]?.toUpperCase()}
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground min-w-max">
            <span><strong className="text-foreground">{patientData.name}</strong></span>
            <span>Age: <strong>{patientData.age}</strong></span>
            <span className="capitalize">Gender: <strong>{patientData.gender}</strong></span>
            {patientData.bloodGroup && <span>Blood: <strong>{patientData.bloodGroup}</strong></span>}
            <span>Severity: <strong className={`capitalize ${patientData.severity === 'critical' || patientData.severity === 'severe' ? 'text-destructive' : patientData.severity === 'moderate' ? 'text-warning' : 'text-success'}`}>{patientData.severity}</strong></span>
            {/* Live language indicator */}
            <span className="ml-2 px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full font-semibold uppercase">{language}</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 pb-3 pr-1 min-h-0">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-fade-in`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-emerald-500 text-white'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-tr-sm'
                  : 'bg-sky-50 border border-sky-200 rounded-tl-sm text-slate-800'
              }`}>
                {msg.role === 'assistant'
                  ? <MarkdownText text={msg.content} />
                  : <p className="text-sm font-medium">{msg.content}</p>
                }
                <p className={`text-xs mt-1.5 ${msg.role === 'user' ? 'text-white/70 text-right' : 'text-slate-500'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-2.5 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-sky-50 border border-sky-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1.5">
                  {[0,150,300].map(delay => (
                    <div key={delay} className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                  ))}
                  <span className="text-xs text-slate-600 font-medium ml-1">{t('chat.typing')}{dots}</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Disclaimer */}
        <div className="flex gap-2 items-center p-2.5 bg-amber-50 border-2 border-amber-200 rounded-xl mb-2 flex-shrink-0">
          <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <p className="text-xs text-amber-800 font-semibold">{t('chat.disclaimer')}</p>
        </div>

        {/* Quick prompts — re-render on language change */}
        <div key={language} className="flex gap-2 mb-2 overflow-x-auto pb-1 flex-shrink-0 scrollbar-hide">
          {quickPrompts.map(key => (
            <button key={key} onClick={() => sendMessage(t(key))} disabled={loading}
              className="flex-shrink-0 text-xs px-4 py-2 bg-emerald-50 border-2 border-emerald-300 text-emerald-800 font-semibold rounded-full hover:bg-emerald-100 hover:border-emerald-400 transition-colors disabled:opacity-40 whitespace-nowrap shadow-sm">
              {t(key)}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-3 flex gap-2 items-end flex-shrink-0 shadow-md">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('chat.placeholder')}
            className="flex-1 bg-transparent resize-none outline-none text-sm leading-relaxed min-h-[40px] max-h-32 text-slate-800 placeholder:text-slate-400 font-medium"
            rows={1}
          />
          <div className="flex gap-1.5 items-center flex-shrink-0">
            <button onClick={toggleVoiceInput}
              className={`p-2 rounded-xl transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}>
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
              className="p-2 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-40 transition-colors">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>
    </main>
  )
}
