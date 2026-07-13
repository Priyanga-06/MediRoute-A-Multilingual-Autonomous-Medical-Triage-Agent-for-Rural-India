'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, MapPin, Phone, Clock, AlertCircle, Navigation, Search, Star } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'

interface Hospital {
  id: string; name: string; address: string; phone: string; distance: number
  rating: number; emergencyServices: boolean; bedCount: number
  specialties: string[]; hours: string; latitude: number; longitude: number
}

const MOCK_HOSPITALS: Hospital[] = [
  { id: '1', name: 'City General Hospital', address: '123 Medical Ave, Downtown', phone: '044-2345-6789', distance: 2.4, rating: 4.8, emergencyServices: true, bedCount: 450, specialties: ['Cardiology', 'Neurology', 'Orthopedics'], hours: '24/7', latitude: 13.0827, longitude: 80.2707 },
  { id: '2', name: 'Apollo Hospitals', address: '456 Health Blvd, Greams Road', phone: '044-2829-3333', distance: 3.1, rating: 4.9, emergencyServices: true, bedCount: 560, specialties: ['Multi-Specialty', 'Oncology', 'Cardiac'], hours: '24/7', latitude: 13.0565, longitude: 80.2420 },
  { id: '3', name: 'MIOT International', address: '4/112 Mount Poonamallee Rd', phone: '044-4200-2288', distance: 4.7, rating: 4.7, emergencyServices: true, bedCount: 520, specialties: ['Orthopedics', 'Transplant', 'Neurosciences'], hours: '24/7', latitude: 13.0358, longitude: 80.1844 },
  { id: '4', name: 'Community Health Clinic', address: '321 Care St, West Side', phone: '044-2345-1122', distance: 1.8, rating: 4.3, emergencyServices: false, bedCount: 80, specialties: ['General Practice', 'Family Medicine'], hours: 'Mon–Sat 8AM–8PM', latitude: 13.0600, longitude: 80.2300 },
  { id: '5', name: 'Emergency Care Unit', address: '654 Crisis Way, North Side', phone: '044-2345-5566', distance: 3.8, rating: 4.6, emergencyServices: true, bedCount: 200, specialties: ['Emergency Medicine', 'Trauma', 'Critical Care'], hours: '24/7', latitude: 13.1200, longitude: 80.2900 },
  { id: '6', name: 'Fortis Malar Hospital', address: '52 1st Main Road, Gandhi Nagar', phone: '044-4289-2222', distance: 5.2, rating: 4.5, emergencyServices: true, bedCount: 180, specialties: ['Cardiology', 'Pediatrics', 'Gynecology'], hours: '24/7', latitude: 13.0200, longitude: 80.2600 },
]

export default function NearbyHospitalsPage() {
  const { t } = useLanguage()
  const [hospitals] = useState<Hospital[]>(MOCK_HOSPITALS)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'emergency'>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => { setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setLoading(false) },
        () => setLoading(false)
      )
    } else setLoading(false)
  }, [])

  const filtered = hospitals
    .filter(h => filter === 'emergency' ? h.emergencyServices : true)
    .filter(h => search === '' || h.name.toLowerCase().includes(search.toLowerCase()) || h.specialties.some(s => s.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => a.distance - b.distance)

  const handleDirections = (h: Hospital) => {
    const origin = userLocation ? `${userLocation.lat},${userLocation.lng}` : 'Current+Location'
    window.open(`https://www.google.com/maps/dir/${origin}/${h.latitude},${h.longitude}`, '_blank')
  }

  return (
    <main className="min-h-screen bg-gradient-ocean-light py-8">
      <div className="container-lg mx-auto px-4">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Link href="/diagnosis" className="text-primary hover:underline">Diagnosis</Link>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground">Nearby Hospitals</span>
          </div>
          <h1 className="text-3xl font-bold mb-1">{t('hospitals.title')}</h1>
          <p className="text-muted-foreground">{t('hospitals.subtitle')}</p>
        </div>

        {!userLocation && !loading && (
          <div className="flex gap-3 p-4 border-l-4 border-l-warning bg-warning/5 rounded-lg mb-5">
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0" />
            <p className="text-sm">Enable location services for accurate distances. Showing sample hospital data.</p>
          </div>
        )}

        {/* Filters + Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            <input type="text" placeholder={t('hospitals.searchPlaceholder')} value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-9" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}>{t('hospitals.all')}</button>
            <button onClick={() => setFilter('emergency')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'emergency' ? 'bg-destructive text-white' : 'bg-muted hover:bg-muted/80'}`}>{t('hospitals.emergency')}</button>
          </div>
        </div>

        {/* Hospital List */}
        <div className="space-y-4">
          {filtered.map(h => (
            <div key={h.id} className="card-lg p-5 hover:shadow-xl transition-all">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-bold">{h.name}</h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-sm">{h.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 flex-shrink-0" />{h.address}</div>
                    <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 flex-shrink-0" />{h.phone}</div>
                    <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 flex-shrink-0" />{h.hours}</div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {h.specialties.map(s => <span key={s} className="badge-secondary text-xs">{s}</span>)}
                  </div>
                  {h.emergencyServices && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-destructive/10 text-destructive text-xs font-semibold rounded-full">
                      🚨 24/7 Emergency
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-end justify-between gap-3">
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">{h.distance}</p>
                    <p className="text-xs text-muted-foreground">km away</p>
                    <p className="text-xs text-muted-foreground">{h.bedCount} beds</p>
                  </div>
                  <button onClick={() => handleDirections(h)} className="btn btn-primary text-sm flex items-center gap-1.5 w-full md:w-auto justify-center">
                    <Navigation className="w-4 h-4" /> {t('hospitals.directions')}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="card-lg text-center py-12">
              <p className="text-muted-foreground">No hospitals found. Try adjusting your search or filter.</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <Link href="/diagnosis/results" className="btn btn-outline">← Back to Results</Link>
        </div>
      </div>
    </main>
  )
}
