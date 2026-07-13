'use client'

import { useState } from 'react'
import { Stethoscope, Heart, Zap, Microscope, Brain, Activity, X, Calendar } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Heart,
    title: 'Cardiology',
    description: 'Expert heart care with advanced diagnostic and treatment options',
    features: ['ECG Testing', 'Echocardiography', 'Cardiac Surgery', 'Preventive Care'],
    details: 'Our Cardiology department offers comprehensive heart care including diagnosis and treatment of coronary artery disease, heart failure, arrhythmias, and congenital heart conditions. Our team of board-certified cardiologists use the latest imaging and intervention technologies.',
    department: 'Cardiology',
  },
  {
    icon: Brain,
    title: 'Neurology',
    description: 'Specialized neurological care for brain and nervous system disorders',
    features: ['MRI Scans', 'EEG Testing', 'Neurosurgery', 'Therapy'],
    details: 'Our Neurology team specializes in diagnosing and treating conditions affecting the brain, spinal cord, and nervous system — including stroke, epilepsy, Parkinson\'s disease, multiple sclerosis, and headache disorders.',
    department: 'Neurology',
  },
  {
    icon: Microscope,
    title: 'Pathology',
    description: 'Comprehensive laboratory services and diagnostic testing',
    features: ['Blood Tests', 'Tissue Analysis', 'Genetic Testing', 'Culture & Sensitivity'],
    details: 'Our state-of-the-art pathology lab provides rapid and accurate diagnostic services including complete blood counts, biochemistry panels, histopathology, cytology, microbiology, and advanced genetic testing.',
    department: 'Pathology',
  },
  {
    icon: Zap,
    title: 'Emergency Medicine',
    description: '24/7 emergency response with trauma and critical care',
    features: ['Trauma Care', 'Critical Care', 'Ambulance Service', 'ICU Support'],
    details: 'Our Emergency Department is open 24 hours a day, 7 days a week, staffed by experienced emergency physicians and nurses. We handle everything from minor injuries to life-threatening emergencies with rapid triage and advanced life support.',
    department: 'Emergency Medicine',
  },
  {
    icon: Activity,
    title: 'Orthopedics',
    description: 'Bone, joint and muscle specialist care',
    features: ['Joint Replacement', 'Sports Medicine', 'Fracture Care', 'Rehabilitation'],
    details: 'Our Orthopedic specialists treat disorders of the musculoskeletal system including fractures, arthritis, sports injuries, and spine conditions. We offer both surgical and non-surgical treatment options with dedicated physiotherapy support.',
    department: 'Orthopedics',
  },
  {
    icon: Stethoscope,
    title: 'General Practice',
    description: 'Primary care and health management for all ages',
    features: ['Check-ups', 'Vaccinations', 'Chronic Disease', 'Health Counseling'],
    details: 'Our General Practice physicians provide comprehensive primary care for patients of all ages. Services include routine check-ups, immunizations, management of chronic conditions like diabetes and hypertension, and preventive health screenings.',
    department: 'General Practice',
  },
]

export default function Services() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)

  return (
    <main className="min-h-screen bg-gradient-ocean-light">
      {/* Header */}
      <section className="section border-b border-border">
        <div className="container-lg mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive medical services delivered by our expert team with state-of-the-art facilities
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container-lg mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon
              return (
                <div key={idx} className="card-lg group hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-5">{service.description}</p>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="btn btn-primary w-full"
                  >
                    Learn More
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedService(null)}>
          <div className="bg-card rounded-2xl border border-border shadow-2xl w-full max-w-lg p-7 relative animate-fade-in" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedService(null)} className="absolute top-4 right-4 p-1.5 hover:bg-muted rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white">
                <selectedService.icon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">{selectedService.title}</h2>
            </div>
            <p className="text-muted-foreground mb-5 leading-relaxed">{selectedService.details}</p>
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Key Services:</p>
              <div className="flex flex-wrap gap-2">
                {selectedService.features.map(f => (
                  <span key={f} className="badge text-xs">{f}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setSelectedService(null)} className="btn btn-ghost flex-1">Close</button>
              <Link
                href={`/appointments?department=${encodeURIComponent(selectedService.department)}`}
                className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                onClick={() => setSelectedService(null)}
              >
                <Calendar className="w-4 h-4" /> Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}


      {/* Additional Info */}
      <section className="section bg-card/50 border-t border-b border-border">
        <div className="container-lg mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Modern Facilities</h3>
              <p className="text-muted-foreground">Latest medical equipment and technology for accurate diagnostics and treatment</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Team</h3>
              <p className="text-muted-foreground">Highly qualified doctors and medical professionals with extensive experience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Rapid Response</h3>
              <p className="text-muted-foreground">Quick appointments and 24/7 emergency services to ensure your health needs are met</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-md mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Need Medical Assistance?</h2>
          <p className="text-lg text-muted-foreground">Schedule an appointment with our specialists today</p>
          <Link href="/appointments" className="btn btn-primary btn-lg inline-flex">
            Book Appointment
          </Link>
        </div>
      </section>
    </main>
  )
}
