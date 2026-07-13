# INTERACTIVE TESTING GUIDE

## How to Test the AI Health Assistant

### Getting Started

1. Open your browser and go to: http://localhost:3000/diagnosis

2. You'll see the Diagnosis Hub with 3 main features:
   - AI Health Assessment
   - Nearby Hospitals
   - Report Analyzer

---

## TEST 1: AI HEALTH ASSESSMENT

### Step-by-Step Testing

**Path:** http://localhost:3000/diagnosis/assessment

1. **Click "Get Started" on AI Health Assessment card**
   - You'll see a 4-step form wizard
   - Progress indicator shows: Personal Info → Symptoms → Medical History → Review

2. **Fill in Personal Information (Step 1)**
   ```
   Full Name: John Doe
   Age: 35
   Gender: Male
   ```
   - Click "Next"

3. **Select Symptoms (Step 2)**
   ```
   Check boxes for: Fever, Cough
   Duration: 3 days
   ```
   - Click "Next"

4. **Add Medical History (Step 3)**
   ```
   Conditions: Diabetes
   Allergies: Penicillin
   Medications: Metformin
   ```
   - Click "Next"

5. **Review Your Information (Step 4)**
   - Verify all data is correct
   - Click "Analyze My Health 🔍"

6. **See AI Results**
   - System analyzes patient data
   - Shows possible conditions with probabilities
   - Displays medication suggestions
   - Provides lifestyle recommendations
   - Shows urgency level

### Expected Output
```
Possible Conditions:
- Common Cold (68%)
- Influenza (24%)
- Bronchitis (8%)

Medication Suggestions:
- Ibuprofen 400mg every 6 hours
- Cough suppressant as needed
- Stay hydrated

Lifestyle Recommendations:
- Get adequate rest (7-9 hours)
- Drink warm fluids
- Use humidifier
- Avoid dairy products

Urgency Level: LOW
Next Steps: Self-care, monitor symptoms
```

---

## TEST 2: NEARBY HOSPITALS

### Step-by-Step Testing

**Path:** http://localhost:3000/diagnosis/nearby-hospitals

1. **Click "Get Started" on Nearby Hospitals card**
   - Shows "Enable Location Services" message
   - Browser may ask for location permission
   - Falls back to mock hospitals for demo

2. **See Hospital List**
   ```
   Each hospital shows:
   - Name & Rating (e.g., ⭐ City General Hospital ★ 4.8)
   - Address & Phone
   - Operating Hours
   - Number of beds
   - Specialties
   - Distance (km)
   - Emergency services badge
   ```

3. **Test Filters**
   - Click "All Hospitals" to see all
   - Click "Emergency Services Only" to filter
   - List updates to show only 24/7 emergency facilities

4. **Get Directions**
   - Click "Directions" button on any hospital
   - Opens Google Maps in new tab
   - Shows navigation to that hospital

### Hospital Examples in Demo
```
1. City General Hospital (4.8⭐) - 2.4 km away
   - Cardiology, Neurology, Orthopedics

2. Medical Center Prime (4.6⭐) - 3.1 km away
   - Pediatrics, Obstetrics, Dermatology

3. Research Hospital (4.9⭐) - 4.7 km away
   - Oncology, Cardiothoracic, Transplant

4. Community Health Clinic (4.5⭐) - 5.2 km away
   - General Practice, Family Medicine

5. Emergency Care Unit (4.7⭐) - 5.8 km away
   - 24/7 Emergency, Trauma Center
```

---

## TEST 3: MEDICAL REPORT ANALYZER

### Step-by-Step Testing

**Path:** http://localhost:3000/diagnosis/report-analyzer

1. **Click "Get Started" on Report Analyzer card**
   - Shows upload page with 3 steps

2. **Upload Medical Report (Option A: File Upload)**
   ```
   - Click on upload area or drag & drop
   - Supported: JPG, PNG, GIF, PDF
   - Max file size: 10MB
   ```

3. **Or Paste Report Content (Option B: Text)**
   ```
   Example Lab Results:
   
   Blood Test Results - Date: 2024-01-15
   
   Test Name          Result    Normal Range
   Hemoglobin         13.5      12.0-17.5 g/dL
   Blood Pressure     128/85    <120/80 mmHg
   Cholesterol        210       <200 mg/dL
   Glucose            105       70-100 mg/dL
   ```

4. **Review Your Upload (Step 2)**
   - See file preview
   - Confirm content
   - Click "Review & Analyze"

5. **Get AI Analysis (Step 3)**
   ```
   Key Findings:
   - Blood Pressure: 128/85 mmHg (Slightly elevated)
   - Cholesterol: 210 mg/dL (Borderline high)
   - Glucose: 105 mg/dL (Slightly elevated)
   
   Abnormal Values Detected:
   ⚠️ Blood Pressure - 128/85 mmHg
   ⚠️ Cholesterol - 210 mg/dL
   
   AI Interpretation:
   Your report shows mildly elevated blood pressure
   and borderline high cholesterol. This may increase
   cardiovascular risk. Consider lifestyle changes.
   
   Recommendations:
   - Reduce sodium intake
   - Increase physical activity
   - Maintain healthy weight
   - Follow up with doctor in 4-6 weeks
   ```

---

## TEST 4: LANGUAGE & VOICE FEATURES

### Step-by-Step Testing

**Location:** Click 🌐 icon in navigation bar

1. **Select Language**
   ```
   Available Languages:
   - English (default)
   - Spanish
   - Hindi
   - Tamil
   - French
   - German
   - Mandarin
   - Portuguese
   ```
   - Choose language
   - UI updates instantly
   - Language preference saved

2. **Test Voice Input**
   ```
   - Click 🎤 "Start Speaking"
   - Say: "I have a fever and cough"
   - System transcribes speech to text
   - Text appears in form field
   ```

3. **Test Voice Output**
   ```
   - Click 🔊 "Speak Results"
   - System reads analysis results aloud
   - Works in selected language
   ```

4. **Stop Voice**
   ```
   - Click 🔇 "Stop Speaking"
   - Stops audio playback
   - Clears transcription
   ```

---

## TEST 5: DARK MODE TOGGLE

### Step-by-Step Testing

1. **Click 🌙 icon in navigation (top right)**
   - Theme switches to dark mode
   - All text remains readable
   - Colors adjust for better contrast

2. **Colors in Dark Mode**
   ```
   Background: Deep Navy (#0f172a)
   Cards: Dark Slate (#1e293b)
   Text: Light Gray (#f1f5f9)
   Primary: Sky Blue (#38bdf8)
   Secondary: Turquoise (#2dd4bf)
   ```

3. **Switch Back to Light Mode**
   - Click 🌙 again to toggle back
   - Preference is saved

---

## TEST 6: RESPONSIVE DESIGN

### Mobile Testing (375px width)

1. **Open DevTools** (F12)
2. **Toggle Device Toolbar** (Ctrl+Shift+M)
3. **Set to iPhone 12 (390x844)**

Test these:
- Navigation hamburger menu appears
- Buttons are full width and touch-friendly
- Cards stack vertically
- Text is readable
- Images scale properly

### Tablet Testing (768px width)

1. **Set viewport to iPad (768x1024)**
2. Verify:
   - Two-column grid layouts
   - Better spacing
   - Readable font sizes
   - All buttons accessible

### Desktop Testing (1920px width)

1. **Set viewport to full width**
2. Verify:
   - Multi-column layouts
   - All features visible
   - Professional appearance
   - Animations smooth

---

## TEST 7: FORM VALIDATION

### Test Invalid Input

**On Assessment Form:**
```
1. Leave Name empty → Click Next
   Result: Form shows required field warning

2. Enter Age as "abc" → Click Next
   Result: Shows error (must be number)

3. Don't select Gender → Click Next
   Result: Shows required field warning

4. Select symptoms but no duration → Click Next
   Result: Shows required field warning
```

### Test Valid Input

```
All fields correctly filled:
- Name: Non-empty string ✓
- Age: 1-150 ✓
- Gender: Selected ✓
- Symptoms: At least one checked ✓
- Duration: Selected ✓
- Medical History: Can be empty ✓

Result: "Next" button enables and form proceeds
```

---

## TEST 8: MEDICAL DISCLAIMERS

### Verify Safety Content

1. **Go to** http://localhost:3000/diagnosis
2. **See disclaimer:**
   ```
   "This AI health assistant is for informational 
   purposes only. It does NOT provide professional 
   medical diagnosis or replace consultation with 
   healthcare providers. Always consult with 
   qualified doctors before making medical 
   decisions. In emergencies, call 911 immediately."
   ```

3. **Appears on all pages:**
   - Diagnosis Hub
   - Assessment Form
   - Report Analyzer
   - Results Page

---

## TEST 9: DATA PERSISTENCE

### Test Session Storage

1. **Fill Assessment Form**
   ```
   - Enter: Name, Age, Gender
   - Proceed through steps
   ```

2. **Refresh Browser** (F5)
   ```
   - Data persists during same session
   - Can continue form
   ```

3. **Close Browser Tab**
   ```
   - Session data cleared (security)
   - New session starts fresh
   ```

4. **Language Preference**
   ```
   - Change language to Spanish
   - Refresh page
   - Language remains Spanish (saved)
   ```

---

## TEST 10: NAVIGATION & LINKS

### Test All Navigation Links

**From Navigation Bar:**
- Home → Works ✓
- Services → Works ✓
- Doctors → Works ✓
- Appointments → Works ✓
- About → Works ✓
- Contact → Works ✓

**From Diagnosis Hub:**
- AI Health Assessment → Assessment Form ✓
- Nearby Hospitals → Hospital List ✓
- Report Analyzer → Upload Form ✓

**From Results Page:**
- "Find Nearby Hospitals" button → Hospital Locator ✓
- "Upload a Report" button → Report Analyzer ✓
- Back button → Previous page ✓

---

## QUICK TEST CHECKLIST

```
□ Diagnosis Hub loads correctly
□ Assessment form collects all data
□ AI returns analysis results
□ Hospital locator shows 6+ hospitals
□ Report analyzer accepts files
□ Language switcher works
□ Voice input/output functions
□ Dark mode toggle works
□ Responsive on mobile/tablet/desktop
□ Medical disclaimers visible
□ All links work
□ Form validation works
□ Data persists in session
□ No console errors
□ Smooth animations
□ Professional appearance
```

---

## TROUBLESHOOTING

### Issue: "Cannot find module"
**Solution:** Run `pnpm install` again

### Issue: Server not running
**Solution:** Run `pnpm dev` in terminal

### Issue: Voice not working
**Solution:** Check browser permissions for microphone

### Issue: Language not changing
**Solution:** Refresh page, check browser local storage

### Issue: Form data lost
**Solution:** Data only persists in current session tab

---

## DEMO FLOW (5 Minutes)

1. Show Diagnosis Hub overview (30 sec)
2. Complete Assessment Form demo (2 min)
3. Show AI Results (30 sec)
4. Show Hospital Locator (1 min)
5. Show Report Analyzer UI (1 min)

**Total: ~5 minutes for complete demo**

