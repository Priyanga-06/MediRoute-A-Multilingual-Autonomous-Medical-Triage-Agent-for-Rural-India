# MedCare Hospital - Advanced Healthcare Management System

A modern, fully-responsive hospital management and appointment booking system built with Next.js 16, React, and Tailwind CSS. The application features an ocean blue-green color scheme with dark mode support, comprehensive doctor directory, service listings, and appointment booking functionality.

## Features

### 🏥 Core Functionality
- **Home Page**: Hero section with statistics, services preview, and patient testimonials
- **Services Directory**: Comprehensive list of medical services with detailed descriptions
- **Doctor Directory**: Search and filter doctors by specialty with ratings and experience
- **Appointment Booking**: Online appointment scheduling with form validation
- **About Page**: Hospital information, mission, vision, and team details
- **Contact Page**: Contact form with business hours and FAQ section
- **404 Page**: Custom error page with navigation

### 🎨 Design Features
- **Ocean Blue-Green Color System**: Professional healthcare color palette with smooth gradients
- **Dark Mode Support**: Full theme switching capability using Context API
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Modern UI Components**: Clean, accessible card-based layouts
- **Interactive Elements**: Testimonial carousel, smooth transitions, and hover effects
- **Accessibility**: Semantic HTML, ARIA labels, and screen reader support

### ⚙️ Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 with custom theme
- **UI Components**: shadcn/ui
- **State Management**: React Hooks (useState)
- **Theme Management**: Custom Context API
- **Icons**: Lucide React
- **Animations**: CSS animations and transitions

## Project Structure

```
/app
  ├── page.tsx                 # Home page with hero and services
  ├── layout.tsx               # Root layout with theme provider
  ├── globals.css              # Global styles and theme tokens
  ├── providers.tsx            # Theme context provider
  ├── not-found.tsx            # 404 page
  ├── about/page.tsx           # About hospital page
  ├── appointments/page.tsx    # Appointment booking page
  ├── contact/page.tsx         # Contact form page
  ├── doctors/page.tsx         # Doctor directory with search/filter
  └── services/page.tsx        # Services listing page

/components
  ├── navigation.tsx           # Header navigation with theme toggle
  └── testimonials.tsx         # Testimonial carousel component

/lib
  └── utils.ts                 # Utility functions (cn for classnames)
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd medcare-hospital
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Start development server**
```bash
pnpm dev
```

4. **Open in browser**
Navigate to `http://localhost:3000`

## Color System

The application uses a sophisticated ocean blue-green color palette:

- **Primary**: `#0369a1` (Sky Blue)
- **Secondary**: `#06b6d4` (Cyan)
- **Accent**: `#14b8a6` (Teal)
- **Background Light**: Gradient from blue-50 → cyan-50 → teal-50
- **Background Dark**: Slate gray with ocean tones

All colors are defined as CSS variables in `globals.css` for easy customization.

## Dark Mode

The application supports light and dark modes with:
- System preference detection
- Manual theme toggle in navigation
- Persistent theme selection using localStorage
- Smooth color transitions

## Responsive Design

The app follows mobile-first design principles with breakpoints at:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

All components adapt seamlessly across screen sizes.

## Key Pages

### Home (`/`)
- Hero section with gradient background
- Key statistics (patients, doctors, success rate)
- Service preview cards
- Testimonial carousel with navigation
- Call-to-action section

### Services (`/services`)
- 6 medical specialties with detailed descriptions
- Features for each service
- Information sections (facilities, team, response)
- CTA to book appointments

### Doctors (`/doctors`)
- Doctor cards with ratings and experience
- Search by doctor name
- Filter by specialty
- Display doctor statistics (experience, patients)
- Quick appointment booking links

### Appointments (`/appointments`)
- Form with validation
- Department selection
- Date and time picker
- Working hours information
- Emergency contact information
- Success confirmation message

### About (`/about`)
- Mission and vision statements
- Core values section
- Hospital history
- Leadership team profiles
- CTA to book appointments

### Contact (`/contact`)
- Contact form with validation
- Phone, email, and address information
- Business hours
- FAQ section
- Emergency services info

## Customization

### Colors
Edit CSS variables in `/app/globals.css` under `@theme inline`:
```css
--primary: #0369a1;
--secondary: #06b6d4;
--accent: #14b8a6;
```

### Fonts
Modify fonts in `/app/layout.tsx`:
```tsx
import { Geist, Geist_Mono } from 'next/font/google'
```

### Data
Update doctor and service data directly in component files:
- Doctors: `/app/doctors/page.tsx`
- Services: `/app/services/page.tsx`
- Team: `/app/about/page.tsx`

## Performance Optimizations

- Server-side rendering with Next.js
- Image optimization with next/image
- CSS-in-JS with Tailwind for minimal bundle size
- Lazy component loading
- Responsive image handling

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Screen reader text with `sr-only` class
- Keyboard navigation support
- Color contrast compliance
- Form field labels and validation

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Backend API integration for real appointment booking
- Doctor availability calendar
- Patient portal with appointment history
- Online consultation booking
- Payment integration
- SMS/Email notifications
- Analytics dashboard

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or feature requests, please contact support@medcare.com or use the contact form on the website.

---


