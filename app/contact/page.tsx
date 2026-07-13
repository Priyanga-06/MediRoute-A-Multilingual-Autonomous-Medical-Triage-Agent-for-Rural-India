'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Contact form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-gradient-ocean-light">
      {/* Header */}
      <section className="section border-b border-border">
        <div className="container-lg mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Get in touch with us today.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container-lg mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Phone */}
            <div className="card-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p className="text-muted-foreground mb-3">
                Call us for immediate assistance
              </p>
              <p className="text-lg font-semibold text-primary">+1 (555) 123-4567</p>
            </div>

            {/* Email */}
            <div className="card-lg">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-muted-foreground mb-3">
                Send us your inquiries anytime
              </p>
              <p className="text-lg font-semibold text-secondary">support@medcare.com</p>
            </div>

            {/* Address */}
            <div className="card-lg">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Address</h3>
              <p className="text-muted-foreground mb-3">
                Visit us at our main facility
              </p>
              <p className="text-sm font-semibold">123 Healthcare Ave, Medical City, MC 12345</p>
            </div>
          </div>

          {/* Contact Form and Hours */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Form */}
            <div className="md:col-span-2">
              <div className="card-lg">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We'll get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>

                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="What is this about?"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="textarea-field"
                        placeholder="Your message here..."
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg w-full">
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Hours */}
            <div>
              <div className="card-lg sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">Business Hours</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="font-semibold">Monday - Friday</p>
                    <p className="text-muted-foreground">9:00 AM - 6:00 PM</p>
                  </div>
                  <div>
                    <p className="font-semibold">Saturday</p>
                    <p className="text-muted-foreground">9:00 AM - 2:00 PM</p>
                  </div>
                  <div>
                    <p className="font-semibold">Sunday</p>
                    <p className="text-muted-foreground">Closed</p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold text-accent">Emergency Services</p>
                    <p className="text-muted-foreground">Available 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-card/50 border-t border-b border-border">
        <div className="container-md mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'How can I schedule an appointment?',
                a: 'You can book an appointment through our website, call us directly, or visit us in person at our main facility.',
              },
              {
                q: 'Do you accept insurance?',
                a: 'Yes, we accept most major insurance plans. Please contact us for specific details about your coverage.',
              },
              {
                q: 'What should I bring for my appointment?',
                a: 'Please bring your insurance card, a valid ID, and any relevant medical records or test results.',
              },
              {
                q: 'Can I reschedule my appointment?',
                a: 'Yes, you can reschedule by calling us at least 24 hours before your appointment time.',
              },
            ].map((item, idx) => (
              <div key={idx} className="card">
                <h4 className="font-bold mb-2">{item.q}</h4>
                <p className="text-muted-foreground text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
