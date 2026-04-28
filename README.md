# 🌿 WellCampus – Student Health & Wellness Platform
### Online Platform for Student Health and Wellness Resources
**B.Tech Full Stack Application Development (FSAD) Project**

---

## ✨ Latest Updates (2026)

### 🆕 Mental Health Self-Assessment Module
- **10-question scientifically structured assessment** based on PHQ-9 and GAD-7 screening tools
- **Auto-scoring system** with range 0-30
- **Real-time mental health categorization**:
  - Healthy (0-7): Maintain good habits
  - Mild Stress (8-14): Relaxation & time management
  - Moderate Stress (15-21): Guided exercises & mentor support
  - High Risk (22-30): Counselor appointment recommended
- **Assessment history tracking** with visual progress monitoring
- **Automatic alerts** for high-risk students (score > 22)
- **Actionable recommendations** tailored to each student's needs

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🗄️ Database Configuration

By default, the platform is designed to effortlessly run out-of-the-box using an auto-generated local **SQLite** database (`backend/database.sqlite`). This allows you to run `npm run dev` instantly without needing MySQL installed on your laptop!

### Switching to MySQL

If you want to connect to a real MySQL database locally or for deployment, create a `.env` file inside the `backend/` directory.

Add your database connection credentials by defining a `DATABASE_URL` or defining specific MySQL environment variables:

```env
# Option A: Universal Connection String (Recommended for cloud/Vercel/Render)
DATABASE_URL=mysql://username:password@localhost:3306/wellcampus

# Option B: Specific MySQL Variables
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=wellcampus
```

**How to change Username & Password:**
Simply modify the `DB_USER` and `DB_PASSWORD` variables in your `backend/.env` file to match your personal MySQL server structure. The server will automatically detect the credentials and instantly shift from the SQLite fallback to your native MySQL database upon restart.

---

## 🗂️ Project Structure

```
wellcampus-react/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Navbar.jsx                  ← Navigation bar component
│   │   └── MentalHealthAssessment.jsx  ← NEW: Mental health self-assessment module
│   ├── context/
│   │   └── AuthContext.jsx             ← Auth state (role, login, logout)
│   ├── pages/
│   │   ├── LandingPage.jsx             ← Home / Landing screen
│   │   ├── LoginPage.jsx               ← Login with role selection
│   │   ├── StudentDashboard.jsx
│   │   ├── MentalHealthPage.jsx        ← UPDATED: Includes assessment module
│   │   ├── FitnessPage.jsx
│   │   ├── NutritionPage.jsx           ← Includes Whey Protein section
│   │   ├── AdminDashboard.jsx
│   │   └── AdminResources.jsx
│   ├── App.jsx                         ← Routes + layout
│   ├── main.jsx                        ← React DOM entry point
│   └── index.css                       ← Global styles (updated with assessment styles)
├── index.html
├── vite.config.js
├── package.json
├── .eslintrc.cjs
└── .gitignore
```

---

## 🧠 Mental Health Self-Assessment Feature

### Overview
The WellCampus platform now includes a comprehensive **Mental Health Self-Assessment** module designed to help students monitor their emotional wellbeing and receive personalized recommendations.

### Assessment Structure

**Instructions:** Students are asked about their experiences over the last 2 weeks.

**Questions (10 Total):**
1. I feel nervous, anxious, or on edge.
2. I find it hard to control my worrying.
3. I feel little interest or pleasure in doing things.
4. I feel down, depressed, or hopeless.
5. I have trouble sleeping (too little or too much).
6. I feel tired or have low energy.
7. I have difficulty concentrating on studies.
8. I feel overwhelmed by academic pressure.
9. I feel isolated or disconnected from friends/family.
10. I feel confident in handling my daily responsibilities. *(Reverse scored)*

**Scoring System:**
- Not at all → 0 points
- Several days → 1 point
- More than half the days → 2 points
- Nearly every day → 3 points

**Result Categories:**

| Score Range | Status | Recommendation |
|-------------|--------|----------------|
| 0 – 7       | Healthy | Keep maintaining good habits |
| 8 – 14      | Mild Stress | Practice relaxation & time management |
| 15 – 21     | Moderate Stress | Try guided exercises & talk to mentor |
| 22 – 30     | High Risk | Recommend counselor appointment |

### Key Features

✅ **Auto-scoring** – Instant calculation with reverse scoring for question 10  
✅ **Progress tracking** – View assessment history with dates and scores  
✅ **Smart alerts** – Automatic notification for high-risk scores (>22)  
✅ **Personalized recommendations** – Action items based on stress level  
✅ **Professional design** – Evidence-based questions inspired by PHQ-9 & GAD-7  
✅ **Visual feedback** – Color-coded results for easy interpretation  

### Monitoring Capabilities

For faculty and administrators:
- Track student mental health trends over time
- Receive alerts for students at high risk
- Access assessment history for early intervention
- Data-driven approach to student wellness support

---

## 🔑 Demo Credentials

| Role    | Email                   | Password    |
|---------|-------------------------|-------------|
| Student | arjun@student.edu       | student123  |
| Admin   | admin@wellcampus.edu    | admin123    |

---

## 🛠️ Tech Stack

- **React 18** with Hooks
- **React Router DOM v6** (client-side routing)
- **Vite** (build tool)
- **CSS** (custom design system — no UI library)

---

## 📱 Pages

| Route                   | Page                  |
|-------------------------|-----------------------|
| `/`                     | Landing Page          |
| `/login`                | Login Page            |
| `/student/dashboard`    | Student Dashboard     |
| `/student/mental-health`| Mental Health         |
| `/student/fitness`      | Fitness Programs      |
| `/student/nutrition`    | Nutrition + Whey      |
| `/admin/dashboard`      | Admin Dashboard       |
| `/admin/resources`      | Manage Resources      |

---

## 📊 Project Highlights

- **Student-Centered Design**: Intuitive interface tailored for college students
- **Evidence-Based Approach**: Mental health assessment based on clinical screening tools
- **Role-Based Access**: Separate dashboards for students and administrators
- **Comprehensive Wellness**: Covers mental health, fitness, and nutrition
- **Real-Time Monitoring**: Track student wellbeing with automated alerts
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern Tech Stack**: Built with React 18, Vite, and modern CSS

---

*© 2026 WellCampus — B.Tech FSAD Project. Last updated: February 2026*
