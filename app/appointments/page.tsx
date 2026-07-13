'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Calendar, Clock, Phone } from 'lucide-react'

const departments = ['Cardiology','Neurology','General Practice','Orthopedics','Emergency Medicine','Pathology']
const timeSlots = ['09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM']

function AppointmentForm() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', date: '', time: '',
    department: searchParams.get('department') || '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  // Update department if URL param changes
  useEffect(() => {
    const dept = searchParams.get('department')
    if (dept) setFormData(p => ({ ...p, department: dept }))
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(p => ({ ...p, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ fullName: '', email: '', phone: '', date: '', time: '', department: '', message: '' })
    }, 3000)
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <div className="card-lg">
      {submitted ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Appointment Confirmed!</h3>
          <p className="text-muted-foreground">We've received your request. You'll receive a confirmation shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="input-field" placeholder="Enter your full name" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="your@email.com" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number *</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-field" placeholder="+91 98765 43210" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Department *</label>
            <select name="department" value={formData.department} onChange={handleChange} className="input-field" required>
              <option value="">Select a department</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            {formData.department && (
              <p className="text-xs text-primary mt-1">✓ {formData.department} selected</p>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Preferred Date *</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="input-field" min={minDate} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Preferred Time *</label>
              <select name="time" value={formData.time} onChange={handleChange} className="input-field" required>
                <option value="">Select a time</option>
                {timeSlots.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Additional Notes</label>
            <textarea name="message" value={formData.message} onChange={handleChange} className="textarea-field" placeholder="Any specific concerns or medical history?" />
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-full">Confirm Appointment</button>
          <p className="text-xs text-muted-foreground">* Required fields. We'll confirm within 24 hours.</p>
        </form>
      )}
    </div>
  )
}

export default function Appointments() {
  return (
    <main className="min-h-screen bg-gradient-ocean-light">
      <section className="section border-b border-border">
        <div className="container-lg mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Book an Appointment
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Schedule your visit with our expert doctors. Fill out the form and we'll confirm your appointment.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-md mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              <div className="card-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" /> Working Hours
                </h3>
                <ul className="space-y-3 text-sm">
                  <li><p className="font-semibold">Monday – Friday</p><p className="text-muted-foreground">9:00 AM – 6:00 PM</p></li>
                  <li><p className="font-semibold">Saturday</p><p className="text-muted-foreground">9:00 AM – 2:00 PM</p></li>
                  <li><p className="font-semibold">Sunday</p><p className="text-muted-foreground">Emergency Only</p></li>
                </ul>
              </div>
              <div className="card-lg bg-secondary/5 border-secondary/20">
                <h3 className="text-lg font-bold mb-3 text-secondary flex items-center gap-2">
                  <Phone className="w-5 h-5" /> Emergency
                </h3>
                <p className="text-2xl font-bold text-secondary">112</p>
                <p className="text-sm text-muted-foreground mt-2">Available 24/7 for emergencies</p>
              </div>
            </div>
            <div className="md:col-span-2">
              <Suspense fallback={<div className="card-lg animate-pulse h-96" />}>
                <AppointmentForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-card/50 border-t border-b border-border">
        <div className="container-lg mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Other Ways to Reach Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center"><div className="text-4xl mb-4">📞</div><h3 className="text-lg font-bold mb-2">Call Us</h3><p className="text-muted-foreground text-sm">For immediate assistance, call our helpline anytime</p></div>
            <div className="card text-center"><div className="text-4xl mb-4">📧</div><h3 className="text-lg font-bold mb-2">Email Us</h3><p className="text-muted-foreground text-sm">Send your queries to support@mediroute.com</p></div>
            <div className="card text-center"><div className="text-4xl mb-4">🚑</div><h3 className="text-lg font-bold mb-2">Emergency</h3><p className="text-muted-foreground text-sm">Call 112 for urgent emergency care</p></div>
          </div>
        </div>
      </section>
    </main>
  )
}

