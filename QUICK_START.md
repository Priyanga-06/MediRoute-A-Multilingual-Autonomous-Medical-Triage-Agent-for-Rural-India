# Quick Start Guide - AI Health Assistant

Get up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- pnpm or npm package manager
- (Optional) Grok API key for enhanced AI features

## Installation

### 1. Install Dependencies
```bash
pnpm install
# or
npm install
```

### 2. Set Environment Variables

Create a `.env.local` file in the project root:

```env
# Optional - for AI-powered diagnosis
GROQ_API_KEY=your_grok_api_key_here

# Optional - for interactive hospital maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key_here
```

**Note**: The app works without these keys using mock data!

### 3. Start Development Server

```bash
pnpm dev
# or
npm run dev
```

The app will be available at `http://localhost:3000`

## First Steps

### Access the Diagnosis System
1. Click "Get Started" button or navigate to `/diagnosis`
2. Choose from 4 main features:
   - **AI Health Assessment** - Symptom checker
   - **Nearby Hospitals** - Find healthcare facilities
   - **Report Analyzer** - Analyze medical documents
   - **Language Settings** - Change language

### Try the Assessment
1. Go to `/diagnosis/assessment`
2. Fill out the 4-step form:
   - Step 1: Personal information
   - Step 2: Symptoms & duration
   - Step 3: Medical history & allergies
   - Step 4: Review & submit
3. Get instant AI-powered diagnosis on results page

### Find Nearby Hospitals
1. Go to `/diagnosis/nearby-hospitals`
2. Allow location access when prompted
3. View hospitals with distance, rating, specialties
4. Click "Directions" for navigation

### Analyze Medical Reports
1. Go to `/diagnosis/report-analyzer`
2. Upload image/PDF or paste text content
3. System analyzes and provides interpretation
4. Get recommendations and findings

## Features Overview

| Feature | Location | Requires API Key |
|---------|----------|-----------------|
| Health Assessment | `/diagnosis/assessment` | GROQ_API_KEY (optional) |
| Nearby Hospitals | `/diagnosis/nearby-hospitals` | GOOGLE_MAPS_API_KEY (optional) |
| Report Analysis | `/diagnosis/report-analyzer` | GROQ_API_KEY (optional) |
| Multi-Language | Globe icon in header | None |
| Voice Input/Output | Throughout app | None (browser built-in) |

## Configuration

### Add API Keys for Full Features

#### Getting Grok API Key
1. Go to https://console.groq.com
2. Create account or sign in
3. Generate API key
4. Add to `.env.local`: `GROQ_API_KEY=your_key`

#### Getting Google Maps Key
1. Go to https://console.cloud.google.com
2. Create new project
3. Enable Maps API
4. Create API key
5. Add to `.env.local`: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key`

## Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Run production server
pnpm start

# Run linter
pnpm lint
```

## Supported Languages

- English
- Spanish
- Hindi
- Tamil
- French
- German
- Mandarin Chinese
- Portuguese

Click the globe icon (🌐) in the header to switch languages.

## Keyboard Shortcuts

- `Alt+L` - Switch language (on most pages)
- `Esc` - Close modals/dropdowns
- `Tab` - Navigate form fields

## Demo Mode

The app includes intelligent mock data when API keys aren't set:

- **Symptoms → Conditions**: "Fever + Cough" suggests "Cold" or "Flu"
- **Hospitals**: Shows 6 realistic hospital records
- **Reports**: Analyzes text for keywords like "high", "low", "normal"

Perfect for testing and demonstration!

## Troubleshooting

### Issue: Blank page
- Check browser console for errors
- Clear browser cache and reload
- Verify all imports are correct

### Issue: Forms not submitting
- Check form validation (all fields required)
- Check browser console for JavaScript errors
- Try different browser

### Issue: Voice not working
- Allow microphone permission when prompted
- Use Chrome or Edge browser
- Check browser's privacy settings

### Issue: Maps not showing
- Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to env
- Verify API key is valid
- Wait for page to fully load

## Project Structure

```
app/
├── diagnosis/              # Main diagnosis system
│   ├── assessment/        # Symptom checker form
│   ├── results/           # AI diagnosis results
│   ├── report-analyzer/   # Medical report upload
│   └── nearby-hospitals/  # Hospital locator
└── api/                   # Backend API routes
    ├── analyze-diagnosis/ # AI analysis endpoint
    └── analyze-report/    # Report analysis endpoint

components/               # Reusable React components
lib/                     # Utilities and services
```

## Next Steps

1. **Customize Branding**: Update colors in `globals.css`
2. **Add More Languages**: Extend `lib/languages.ts`
3. **Integrate Real Data**: Connect to actual hospital APIs
4. **Add Authentication**: Implement user login
5. **Deploy**: Push to Vercel with environment variables

## Documentation

- Full Feature Guide: `ADVANCED_FEATURES_GUIDE.md`
- Original Features: `DIAGNOSIS_FEATURES.md`

## Important Disclaimers

⚠️ **Medical Disclaimer**: This application is for informational purposes only and should NOT replace professional medical consultation. Always consult qualified healthcare providers before making medical decisions. In case of emergency, call 911 immediately.

## Support

For issues or questions:
1. Check browser console for error messages
2. Review documentation files
3. Test with mock data first
4. Verify environment variables are set

## What's Next?

- Deploy to Vercel: `vercel deploy`
- Share with healthcare professionals
- Gather feedback for improvements
- Expand hospital database
- Add more AI features

---

**Happy Diagnosing! 🏥**

Remember: Always consult with qualified healthcare professionals for medical advice.
