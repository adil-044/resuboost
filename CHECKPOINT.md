# Checkpoint: ResumeATS V6 - Executive Platform

**Status:** WORKING (Verified on March 14, 2026)
**Git Commit:** `b4a8396`

---

## 🚀 Technical Configuration

### Backend (FastAPI)
- **Host:** `127.0.0.1`
- **Port:** `9000`
- **Model:** `gemini-flash-latest` (Locked via Google GenAI SDK)
- **SDK:** `google-genai` (New version)
- **Python Version:** 3.13+

### Frontend (Next.js)
- **URL:** `http://localhost:3000`
- **Framework:** Next.js 15+ (App Router)
- **Styling:** Tailwind CSS v4 + @tailwindcss/typography
- **State:** Zustand
- **Auth:** Supabase OAuth (Google/GitHub)

---

## 🛠️ Restoration Steps

If the system stops working or you move to a new machine:

### 1. Backend Setup
```powershell
cd resume-ats/backend
python -m pip install -r requirements.txt
python -m pip install google-genai
```

### 2. Set Environment Variables
```powershell
# Windows (PowerShell)
$env:GOOGLE_API_KEY="your_actual_key"

# Mac/Linux
export GOOGLE_API_KEY="your_actual_key"
```

### 3. Run Servers
**Backend:**
```powershell
python -m uvicorn app.main:app --host 127.0.0.1 --port 9000
```

**Frontend:**
```powershell
cd resume-ats/frontend
npm run dev
```

---

## 💎 Features Locked In
- [x] **DOCX Deep Parsing:** Header/Footer extraction fixed.
- [x] **Zero Redundancy:** AI protocol for deduplicating name/contact info.
- [x] **Executive PDF:** High-end ReportLab styling with horizontal dividers.
- [x] **Bridge the Gap:** Targeted keystring interview flow.
- [x] **SaaS UI:** Three-pane workspace with real-time match meter.
