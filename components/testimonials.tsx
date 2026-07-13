'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Rajesh Kumar',
    title: 'IT Professional',
    text: 'MedCare Hospital provided exceptional care during my heart surgery. The doctors were highly skilled and the staff was incredibly supportive. I couldn&apos;t have recovered better.',
    rating: 5,
    image: 'RK',
  },
  {
    name: 'Priya Sharma',
    title: 'Entrepreneur',
    text: 'The appointment booking system is so convenient! I was able to schedule a consultation within 24 hours. The entire experience was smooth and professional.',
    rating: 5,
    image: 'PS',
  },
  {
    name: 'Amit Patel',
    title: 'Business Owner',
    text: 'My family has been using MedCare Hospital for over 5 years. The consistency in quality care and attention to detail is remarkable. Highly recommended!',
    rating: 5,
    image: 'AP',
  },
  {
    name: 'Meera Desai',
    title: 'Teacher',
    text: 'After my surgery, the follow-up care from MedCare was outstanding. The doctors checked on me regularly and the staff made sure I was comfortable throughout recovery.',
    rating: 5,
    image: 'MD',
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <section className="section bg-card/50 border-t border-b border-border">
      <div className="container-lg mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">What Our Patients Say</h2>

        <div className="max-w-3xl mx-auto">
          {/* Testimonial Card */}
          <div className="card-lg mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center text-white font-bold text-lg">
                {current.image}
              </div>
              <div>
                <h3 className="text-lg font-bold">{current.name}</h3>
                <p className="text-sm text-muted-foreground">{current.title}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>

            {/* Text */}
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{current.text}</p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevTestimonial}
              className="btn btn-outline p-2 rounded-full"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="btn btn-outline p-2 rounded-full"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
