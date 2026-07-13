'use client'

import { Heart, Target, Award, Users } from 'lucide-react'
import Link from 'next/link'

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-ocean-light">
      {/* Header */}
      <section className="section border-b border-border">
        <div className="container-lg mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            About MedCare Hospital
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Excellence in healthcare for over 25 years
          </p>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="section">
        <div className="container-lg mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide world-class healthcare services that are accessible, affordable, and compassionate. We are committed to treating every patient with dignity and respect while delivering the highest standards of medical care.
              </p>
            </div>

            <div className="card-lg">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading healthcare provider in the region, known for innovation, excellence, and patient-centered care. We strive to make advanced medical treatments available to everyone in our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-card/50 border-t border-b border-border">
        <div className="container-lg mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Compassion', desc: 'Patient-centered care with empathy' },
              { icon: Award, title: 'Excellence', desc: 'Highest standards of medical care' },
              { icon: Users, title: 'Integrity', desc: 'Honest and transparent practices' },
              { icon: Target, title: 'Innovation', desc: 'Latest technology and techniques' },
            ].map((value, idx) => {
              const Icon = value.icon
              return (
                <div key={idx} className="card text-center">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section">
        <div className="container-lg mx-auto">
          <h2 className="text-4xl font-bold mb-8">Our History</h2>
          <div className="card-lg">
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Founded in 1998, MedCare Hospital started as a small clinic with a vision to provide quality healthcare to the community. Over the past 25 years, we have grown into a fully-equipped, multi-specialty hospital with state-of-the-art facilities and a team of over 150 expert doctors.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              What started with just two doctors and a handful of staff members has now transformed into a healthcare institution serving over 50,000 patients annually. We pride ourselves on our commitment to continuous improvement and adoption of the latest medical technologies.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, MedCare Hospital is recognized for its excellence in patient care, medical research, and community health initiatives. We continue to expand our services and maintain our reputation as a trusted healthcare provider.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-card/50 border-t border-b border-border">
        <div className="container-lg mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Dr. Jonathan Wells', role: 'Chief Medical Officer', exp: '25+ years' },
              { name: 'Dr. Patricia Moore', role: 'Head of Surgery', exp: '20+ years' },
              { name: 'Mr. David Harrison', role: 'Hospital Director', exp: '18+ years' },
            ].map((member, idx) => (
              <div key={idx} className="card text-center">
                <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {member.name.split(' ')[1][0]}
                </div>
                <h3 className="font-bold mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-semibold mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.exp} experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-md mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Experience Excellence?</h2>
          <p className="text-lg text-muted-foreground">
            Schedule an appointment with our expert team today
          </p>
          <Link href="/appointments" className="btn btn-primary btn-lg inline-flex">
            Book Now
          </Link>
        </div>
      </section>
    </main>
  )
}
