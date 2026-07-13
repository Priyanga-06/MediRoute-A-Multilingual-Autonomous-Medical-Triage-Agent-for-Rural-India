import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-ocean-light flex items-center justify-center">
      <div className="container-md mx-auto text-center space-y-6 py-12 px-4">
        <div className="text-6xl font-bold text-muted-foreground mb-4">404</div>
        
        <h1 className="text-4xl md:text-5xl font-bold">Page Not Found</h1>
        
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Sorry, the page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/" className="btn btn-primary btn-lg inline-flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Go Home
          </Link>
          <Link href="/contact" className="btn btn-outline btn-lg">
            Contact Us
          </Link>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Quick Links:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/services" className="link">Services</Link>
            <Link href="/doctors" className="link">Doctors</Link>
            <Link href="/appointments" className="link">Appointments</Link>
            <Link href="/about" className="link">About</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
