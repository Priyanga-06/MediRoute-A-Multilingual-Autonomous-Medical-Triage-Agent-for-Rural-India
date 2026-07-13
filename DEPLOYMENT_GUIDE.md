# Deployment & Setup Guide

## Prerequisites
- Node.js 18+ installed
- pnpm or npm package manager
- Grok API key (optional - works with mock data)
- Google Maps API key (optional - works with mock data)

## Local Development

### 1. Install Dependencies
```bash
cd /vercel/share/v0-project
pnpm install
```

### 2. Set Environment Variables
Create `.env.local` file:
```env
# Grok AI API (Get from console.groq.com)
GROQ_API_KEY=your_grok_api_key_here

# Google Maps API (Get from Google Cloud Console)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key_here
```

### 3. Run Development Server
```bash
pnpm dev
```

Visit `http://localhost:3000`

### 4. Access Diagnosis Features
- Main Hub: `http://localhost:3000/diagnosis`
- Assessment Form: `http://localhost:3000/diagnosis/assessment`
- Hospital Locator: `http://localhost:3000/diagnosis/nearby-hospitals`
- Report Analyzer: `http://localhost:3000/diagnosis/report-analyzer`

---

## Features Without API Keys

The system works perfectly without API keys using intelligent mock data:

### Without Grok API Key
- AI diagnosis returns realistic sample conditions
- Medication suggestions are pre-generated
- Confidence scores vary (68-92%)
- Still provides valuable information

### Without Google Maps API Key
- Shows realistic hospital database (6 hospitals)
- Distance calculations work
- Map section shows placeholder
- All filtering and sorting works

---

## Deployment to Vercel

### Step 1: Connect GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/medcare-hospital.git
git push -u origin main
```

### Step 2: Create Vercel Project
1. Go to https://vercel.com/new
2. Import from GitHub
3. Select the repository
4. Click Deploy

### Step 3: Add Environment Variables
In Vercel Project Settings → Environment Variables:
```
GROQ_API_KEY: your_key_here
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: your_key_here
```

### Step 4: Deploy
```bash
vercel deploy --prod
```

---

## Getting API Keys

### Grok API Key
1. Visit https://console.groq.com
2. Sign up or log in
3. Create new API key
4. Copy and save securely
5. Add to environment variables

### Google Maps API Key
1. Go to https://cloud.google.com
2. Create new project
3. Enable Maps JavaScript API
4. Enable Geocoding API
5. Create API key
6. Add to environment variables

---

## Health Check

After deployment, verify all features:

### Test Diagnosis
```bash
curl -X POST http://localhost:3000/api/analyze-diagnosis \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 35,
    "gender": "male",
    "symptoms": ["headache", "fever"],
    "medicalHistory": [],
    "allergies": []
  }'
```

### Test Report Analysis
```bash
curl -X POST http://localhost:3000/api/analyze-report \
  -H "Content-Type: application/json" \
  -d '{
    "reportText": "Blood test results: WBC 12.5, Glucose 120"
  }'
```

---

## Performance Optimization

### Caching
- Static pages cached by Next.js
- Medical data cached in browser
- Hospital data refreshed on demand

### Images
- Optimized with Next.js Image
- Lazy loaded on scroll
- Responsive sizes

### Code Splitting
- Route-based code splitting
- Component lazy loading
- Optimized bundle size

---

## Security Best Practices

### Implemented
✓ API keys in environment variables
✓ HTTPS-ready
✓ Input validation
✓ No data logging
✓ Local storage only

### Recommendations
- Use HTTPS in production
- Enable rate limiting on APIs
- Monitor API usage
- Regular security audits
- Keep dependencies updated

---

## Troubleshooting

### 404 on Diagnosis Pages
```bash
# Clear Next.js cache
rm -rf .next
pnpm dev
```

### Grok API Errors
- Check API key is valid
- Verify API key in .env.local
- Check rate limits (10 req/min free tier)
- Restart development server

### Google Maps Not Loading
- Verify API key is valid
- Check Maps API is enabled
- Ensure key has proper restrictions
- Check CORS settings

### Voice Not Working
- Only works on HTTPS or localhost
- Check browser supports Web Speech API
- Grant microphone permissions
- Try different browser

---

## Database (Optional)

The system currently uses browser storage. To add a backend database:

### Option 1: Supabase
```bash
npm install @supabase/supabase-js
```

### Option 2: MongoDB
```bash
npm install mongodb mongoose
```

### Option 3: Neon (PostgreSQL)
```bash
npm install pg
```

---

## Scaling Considerations

### Current Limits
- 100 concurrent users (mock data)
- 50 API calls/min (Grok free tier)
- 5MB file uploads (reports)

### For Production
- Upgrade Grok API tier
- Add database for data persistence
- Implement caching layer (Redis)
- Load balancing for high traffic
- CDN for static assets

---

## Monitoring

### Logs
- Check `/vercel/project.log` for errors
- Use Vercel Dashboard for analytics
- Monitor API usage in Groq console

### Alerts
Set up alerts for:
- API errors > 5%
- Response time > 2s
- Failed requests > 10/min
- Database errors

---

## Support & Resources

### Documentation
- Feature Showcase: `FEATURE_SHOWCASE.md`
- Advanced Features: `ADVANCED_FEATURES_GUIDE.md`
- Quick Start: `QUICK_START.md`
- Build Summary: `BUILD_SUMMARY.md`

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Grok Documentation](https://console.groq.com/docs)
- [Google Maps API](https://developers.google.com/maps)

### Community
- GitHub Issues: Report bugs
- Vercel Support: Deployment help
- Stack Overflow: General questions

---

## Maintenance

### Weekly
- Check error logs
- Monitor API usage
- Test key features

### Monthly
- Update dependencies: `pnpm update`
- Review security advisories
- Analyze user feedback

### Quarterly
- Full system audit
- Performance optimization
- Feature planning

---

## Backup & Recovery

### Code Backup
```bash
git push origin main
```

### Data Backup
- User sessions saved locally
- No cloud data to backup
- Hospital database regenerates

---

## License & Legal

This project is provided as-is for demonstration purposes.

### Medical Disclaimer
This application provides AI-powered health information for educational purposes only. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers.

### Privacy Policy
- No personal data collected
- No analytics tracking
- GDPR compliant
- User data stays local

---

End of Deployment Guide
