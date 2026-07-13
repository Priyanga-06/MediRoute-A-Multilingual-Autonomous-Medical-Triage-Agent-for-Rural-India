'use client'

import { useState } from 'react'
import { Search, Star, MapPin } from 'lucide-react'
import Link from 'next/link'

const doctorsData = [
  {
    id: 1,
    name: 'Dr. Sarah Mitchell',
    specialty: 'Cardiology',
    rating: 4.8,
    patients: 1250,
    experience: 12,
    image: 'SM',
    bio: 'Expert in cardiac care with 12 years of experience',
  },
  {
    id: 2,
    name: 'Dr. James Chen',
    specialty: 'Neurology',
    rating: 4.9,
    patients: 980,
    experience: 15,
    image: 'JC',
    bio: 'Specializing in neurological disorders and surgery',
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'General Practice',
    rating: 4.7,
    patients: 2100,
    experience: 8,
    image: 'ER',
    bio: 'Comprehensive primary care and health management',
  },
  {
    id: 4,
    name: 'Dr. Michael Thompson',
    specialty: 'Orthopedics',
    rating: 4.8,
    patients: 750,
    experience: 10,
    image: 'MT',
    bio: 'Joint replacement and sports medicine specialist',
  },
  {
    id: 5,
    name: 'Dr. Lisa Anderson',
    specialty: 'Cardiology',
    rating: 4.9,
    patients: 1100,
    experience: 14,
    image: 'LA',
    bio: 'Interventional cardiology and preventive care',
  },
  {
    id: 6,
    name: 'Dr. Robert Kumar',
    specialty: 'Emergency Medicine',
    rating: 4.6,
    patients: 1890,
    experience: 11,
    image: 'RK',
    bio: 'Trauma care and emergency response specialist',
  },
]

const specialties = ['All', 'Cardiology', 'Neurology', 'General Practice', 'Orthopedics', 'Emergency Medicine']

export default function Doctors() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')

  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  return (
    <main className="min-h-screen bg-gradient-ocean-light">
      {/* Header */}
      <section className="section border-b border-border">
        <div className="container-lg mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Our Doctors
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet our highly qualified and experienced medical professionals
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="section-compact bg-card/50 border-b border-border sticky top-20 z-40">
        <div className="container-lg mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search doctors by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12"
              />
            </div>
          </div>

          {/* Specialty Filter */}
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`btn ${
                  selectedSpecialty === specialty
                    ? 'btn-primary'
                    : 'btn-outline'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mt-4">
            Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="section">
        <div className="container-lg mx-auto">
          {filteredDoctors.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor, idx) => (
                <div
                  key={doctor.id}
                  className="card-lg group hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{
                    animationDelay: `${idx * 0.1}s`,
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-ocean rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                      {doctor.image}
                    </div>
                    <div className="flex items-center gap-1 bg-accent/10 px-3 py-1 rounded-lg">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm font-semibold text-accent">{doctor.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-2">{doctor.specialty}</p>
                  <p className="text-muted-foreground text-sm mb-4">{doctor.bio}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                    <div className="bg-muted/30 rounded-lg p-2">
                      <p className="text-lg font-bold text-primary">{doctor.experience}+</p>
                      <p className="text-xs text-muted-foreground">Years Experience</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-2">
                      <p className="text-lg font-bold text-secondary">{doctor.patients}</p>
                      <p className="text-xs text-muted-foreground">Patients</p>
                    </div>
                  </div>

                  <Link href="/appointments" className="btn btn-primary w-full">
                    Book Appointment
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No doctors found matching your criteria</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
