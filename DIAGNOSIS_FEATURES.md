# AI-Powered Health Assistant - Advanced Features

## Overview

This advanced healthcare platform includes comprehensive features for medical diagnosis, hospital locating, report analysis, and multi-language support with voice interaction capabilities.

## Features

### 1. AI-Powered Health Assessment (`/diagnosis/assessment`)

**Patient Intake Form with 4-Step Process:**
- **Step 1: Personal Information** - Collect patient name, age, and gender
- **Step 2: Symptoms & Duration** - Select from 16+ common symptoms with duration tracking
- **Step 3: Medical History** - Select from 8+ medical conditions, allergies, and current medications
- **Step 4: Review** - Verify all information before submission

**Technology:**
- Grok AI (via Vercel AI Gateway) for intelligent disease analysis
- Fallback to mock AI for demonstration without API keys
- SessionStorage for temporary data persistence during the assessment flow

### 2. AI Diagnosis Results (`/diagnosis/results`)

**Comprehensive Analysis Provided:**
- **Possible Conditions** - List of potential diagnoses with probability percentages
- **Medication Suggestions** - Recommended medications with dosage, frequency, and cautions
- **Recommendations** - Evidence-based health suggestions
- **Lifestyle Changes** - Actionable lifestyle modifications
- **Next Steps** - Clear guidance for professional medical consultation
- **Urgency Level** - Risk assessment (low/medium/high/critical)

**Features:**
- Download health report as text file
- Emergency contact information for critical cases
- Medical disclaimer on all pages
- Links to nearby hospitals and report analyzer

### 3. Nearby Hospital Locator (`/diagnosis/nearby-hospitals`)

**Real-Time Location Services:**
- Browser geolocation integration (with fallback mock data)
- Display of 5+ nearby hospitals with:
  - Distance in kilometers
  - Contact information
  - Operating hours
  - Bed capacity
  - Medical specialties
  - Emergency services availability
  - Star ratings

**Features:**
- Filter by emergency services only
- Get directions via Google Maps integration
- Mock hospital database for demonstration
- Add your Google Maps API key for real location mapping

**To Enable Google Maps:**
```bash
# Add to environment variables
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### 4. Medical Report Analyzer (`/diagnosis/report-analyzer`)

**Multi-Format Report Support:**
- **Images** - JPG, PNG, GIF (medical scans, photos of reports)
- **PDF** - Lab reports, prescriptions, medical documents
- **Text** - Direct paste of medical report content

**Analysis Provided:**
- Key findings extraction
- Identification of abnormal values
- Professional interpretation
- Recommendations for follow-up
- Uses Grok AI for intelligent analysis

**Workflow:**
1. Upload file or paste text content
2. Review the report
3. Submit for AI analysis
4. Receive interpreted findings and recommendations

### 5. Multi-Language Support & Voice Features

**Supported Languages (8 total):**
- English
- Spanish (Español)
- Hindi (हिंदी)
- Tamil (தமிழ்)
- French (Français)
- German (Deutsch)
- Mandarin (中文)
- Portuguese (Português)

**Voice Features:**
- **Web Speech API** - Browser-native speech recognition and synthesis
- **Voice Input** - Dictate information instead of typing
- **Voice Output** - Text-to-speech for results and guidance
- **Language Switcher** - Accessible from navigation bar

**Language Switcher Usage:**
1. Click the globe icon in the navigation
2. Select preferred language
3. Voice controls available in the panel
4. Settings saved to localStorage

### 6. Medical Disclaimer

All pages include prominent medical disclaimers emphasizing:
- AI analysis is for informational purposes only
- Always consult with qualified healthcare providers
- Emergency protocol (call 911)
- No replacement for professional medical advice

## Setup Instructions

### Installation

```bash
# Install dependencies
pnpm install

# Install additional packages
pnpm add ai groq-sdk pdfjs-dist papaparse
```

### Environment Variables

**Required:**
```env
# For Grok AI medical analysis
GROQ_API_KEY=your_groq_api_key

# For Google Maps (optional but recommended)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

**How to Get Keys:**
1. **Groq API Key:**
   - Visit [console.groq.com](https://console.groq.com)
   - Create account and generate API key
   - Use Mixtral-8x7b model for medical analysis

2. **Google Maps API Key:**
   - Visit [Google Cloud Console](https://console.cloud.google.com)
   - Enable Maps JavaScript API and Places API
   - Create API key with appropriate restrictions

### Running the Development Server

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

## File Structure

```
app/
├── diagnosis/
│   ├── page.tsx                    # Main diagnosis hub
│   ├── assessment/
│   │   └── page.tsx               # Patient intake form
│   ├── results/
│   │   └── page.tsx               # Diagnosis results
│   ├── nearby-hospitals/
│   │   └── page.tsx               # Hospital locator
│   └── report-analyzer/
│       └── page.tsx               # Medical report analyzer

lib/
├── medical-service.ts              # Grok AI integration & analysis
└── languages.ts                    # Multi-language & voice support

components/
└── language-switcher.tsx           # Language & voice UI
```

## API Integration

### Grok AI Medical Analysis

```typescript
import { analyzePatientCondition } from '@/lib/medical-service'

const result = await analyzePatientCondition(patientData)
// Returns: DiagnosisResult with conditions, medications, recommendations
```

### Medical Report Analysis

```typescript
import { analyzeReport } from '@/lib/medical-service'

const analysis = await analyzeReport(reportText, reportImage)
// Returns: { findings, abnormalValues, interpretation, recommendations }
```

## Data Privacy

- **No data persistence** - Patient information is stored in sessionStorage only during the session
- **No third-party sharing** - Data is never sent to external services (except Grok AI for analysis)
- **Client-side processing** - Language and voice features run entirely in the browser
- **localStorage only** - Language preference is saved locally to the user's device

## Voice & Accessibility

### Web Speech API Support

Browser support for voice features varies:
- **Chrome/Chromium** - Full support
- **Safari** - Partial support (voice output works better)
- **Firefox** - Limited support
- **Mobile** - Varies by browser

### Keyboard Navigation

All pages include:
- Proper heading hierarchy (h1, h2, h3)
- Semantic HTML elements
- Tab navigation support
- Focus indicators for accessibility

## Troubleshooting

### AI Analysis Returns Mock Data
- Check if `GROQ_API_KEY` is set in environment variables
- Verify Groq API key is valid and has available quota
- Check browser console for detailed error messages

### Voice Features Not Working
- Ensure browser supports Web Speech API (Chrome/Safari recommended)
- Check microphone permissions in browser settings
- Test in incognito mode to rule out extensions

### Hospital Locator Shows Mock Data
- Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to environment variables
- Verify Google Maps API is enabled in Google Cloud Console
- Check geolocation permissions in browser

### Language Changes Not Persisting
- Clear browser localStorage if issues occur
- Check browser privacy settings for localStorage access
- Ensure cookies are not blocked

## Performance Optimization

- **Lazy loading** - Pages use dynamic imports where applicable
- **Image optimization** - Medical images are compressed before analysis
- **SessionStorage** - Patient data cleared after session ends
- **API caching** - Groq responses are efficiently handled

## Future Enhancements

Potential features to add:
- User authentication and persistent medical records
- PDF OCR with document extraction
- Real-time appointment scheduling
- Telemedicine consultation integration
- Multi-user access with role-based permissions
- Advanced analytics and medical history tracking
- Integration with electronic health records (EHR)

## Security Considerations

- Always validate user input on the server side
- Implement rate limiting for AI API calls
- Use HTTPS for all communications
- Secure API keys using environment variables
- Implement CORS policies if needed
- Consider HIPAA compliance for production use

## Support & Resources

- **Groq Documentation:** https://console.groq.com/docs
- **Web Speech API:** https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- **Google Maps API:** https://developers.google.com/maps/documentation
- **Next.js 16:** https://nextjs.org/docs

## Medical Disclaimer

This application is for educational and informational purposes only. It should not be used for:
- Medical diagnosis without professional consultation
- Emergency treatment decisions
- Replacement of professional medical advice
- Treatment of acute medical conditions

Always consult with qualified healthcare providers for proper medical care.

---

**Last Updated:** June 30, 2026
**Version:** 1.0.0
