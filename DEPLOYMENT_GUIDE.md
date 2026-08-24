# 🚀 TatkalEasy Deployment Guide

## ✅ GITHUB - DONE!
Repo: https://github.com/uurbanbuddha/TatkalEasy

---

## 🎨 FRONTEND - DEPLOY TO VERCEL (5 MINUTES)

### Step 1: Import Project
1. **Vercel page is open** → Click "Add New..." → "Project"
2. **Import Git Repository** → Select `uurbanbuddha/TatkalEasy`
3. **Framework Preset:** Vite
4. **Root Directory:** `frontend`
5. **Build Command:** `npm run build`
6. **Output Directory:** `dist`

### Step 2: Environment Variables
Add this in "Environment Variables" section:
```
VITE_API_URL = https://tatkaleasy-backend.onrender.com
```
(We'll update this after backend deployment)

### Step 3: Deploy!
- Click "Deploy"
- Wait 2-3 minutes
- Copy the Vercel URL (will be like `tatkaleasy.vercel.app`)

---

## ⚙️ BACKEND - DEPLOY TO RENDER (10 MINUTES)

### Step 1: Create Web Service
1. **Render dashboard is open** → Click "New +" → "Web Service"
2. **Connect Repository:** `uurbanbuddha/TatkalEasy`
3. **Name:** `tatkaleasy-backend`
4. **Region:** Oregon (US West)
5. **Root Directory:** `backend`
6. **Runtime:** Python 3
7. **Build Command:** `pip install -r requirements.txt`
8. **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Step 2: Environment Variables
Click "Advanced" → Add Environment Variables:

```
OPENAI_API_KEY = [Your OpenAI API key - check backend/.env.example]

AWS_ACCESS_KEY_ID = [Your AWS Access Key - check backend/.env.example]

AWS_SECRET_ACCESS_KEY = [Your AWS Secret Key - check backend/.env.example]

AWS_DEFAULT_REGION = ap-south-1

ENVIRONMENT = production

FRONTEND_URL = https://tatkaleasy.vercel.app
```

**Note:** Copy your actual keys from `backend/.env.example` on your local machine.
(We'll update FRONTEND_URL after Vercel deployment)

### Step 3: Free Instance Settings
- **Instance Type:** Free
- **Auto-Deploy:** Yes

### Step 4: Deploy!
- Click "Create Web Service"
- Wait 5-10 minutes for build
- Copy the Render URL (will be like `tatkaleasy-backend.onrender.com`)

---

## 🔄 FINAL STEP: UPDATE URLS

### After Both Deploy:

1. **Update Vercel Environment Variable:**
   - Go to Vercel project → Settings → Environment Variables
   - Change `VITE_API_URL` to your Render URL: `https://tatkaleasy-backend.onrender.com`
   - Redeploy frontend

2. **Update Render Environment Variable:**
   - Go to Render service → Environment
   - Change `FRONTEND_URL` to your Vercel URL: `https://tatkaleasy.vercel.app`
   - Click "Save Changes" (auto-redeploys)

---

## ✅ TEST THE APP

1. Open Vercel URL: `https://tatkaleasy.vercel.app`
2. Try the flow:
   - Landing page → Start Booking
   - Search: Bangalore to Mumbai
   - Select train
   - Select seat
   - See confetti!
3. Try AI Chat widget (bottom-right bubble)

---

## 🎯 SUBMISSION DETAILS

**Live URLs:**
- Frontend: https://tatkaleasy.vercel.app
- Backend: https://tatkaleasy-backend.onrender.com

**Test Credentials:**
- Username: `judge@tatkal.com`
- Password: `demo123`
(For future auth features - not implemented yet)

**GitHub:** https://github.com/uurbanbuddha/TatkalEasy

---

## 🎥 NEXT STEPS

1. ✅ Deploy (you're doing this now!)
2. 📹 Record 2-minute demo video
3. ✍️ Write 250-word summary
4. 📤 Submit to hackathon

---

**Last Updated:** August 24, 2026
