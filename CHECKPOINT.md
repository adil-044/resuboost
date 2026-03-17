# Checkpoint: ResumeATS V8 - Next-Gen Sales Funnel

**Status:** WORKING (Verified on March 14, 2026)
**Git Commit:** `54f3771`

---

## 🚀 Technical Configuration

### Backend (FastAPI)
- **Host:** `127.0.0.1`
- **Port:** `9000`
- **Model:** `gemini-flash-latest` (Locked via Google GenAI SDK)
- **New Features:** Pre-cleaning protocol for raw text, DOCX header extraction.

### Frontend (Next.js)
- **Framework:** Next.js 15+ (App Router)
- **3D Engine:** Three.js + @react-three/fiber
- **Funnel Logic:** Teaser Scan -> Conversion Modal -> Auth Redirect
- **Auth:** Supabase OAuth + Profile Sync (Name/Location)

---

## 🛠️ Restoration Steps

### 1. Environment Variables
**Frontend (.env.local):**
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

**Backend (Terminal):**
```powershell
$env:GOOGLE_API_KEY="your_key"
```

### 2. Run Servers
```powershell
# Backend
cd resume-ats/backend
python -m uvicorn app.main:app --host 127.0.0.1 --port 9000

# Frontend
cd resume-ats/frontend
npm run dev
```

---

## 💎 Features Locked In (V8)
- [x] **3D Immersive Hero:** Dynamic background for "Next-Gen" feel.
- [x] **Conversion Funnel:** Teaser scan widget on Home page to drive signups.
- [x] **Executive Vault:** Persistent history with Before/After scores.
- [x] **Advanced Cleaning:** AI protocol to strip duplicate headers/contact info.
- [x] **Mobile Responsive:** Clean professional UI across devices.
