import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useState, useEffect } from 'react'

export default function StudentDashboard() {
  const { user, logout } = useAuth()
  const [counts, setCounts] = useState({ mental: 0, fitness: 0, nutrition: 0 })

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${baseUrl}/api/resources`);
        const data = await res.json();
        
        const m = data.filter(r => r.cat === 'MENTAL_HEALTH').length;
        const f = data.filter(r => r.cat === 'FITNESS').length;
        const n = data.filter(r => r.cat === 'NUTRITION').length;
        
        setCounts({ mental: m, fitness: f, nutrition: n });
      } catch (err) {
        console.error(err);
      }
    };
    fetchResources();
  }, [])

  return (
    <div className="page">
      <div className="container">
        <div className="pg-header">
          <div>
            <h1 className="pg-title">Good Day! 👋</h1>
            <p className="pg-sub">Welcome back, <strong>{user?.name || 'Student'}</strong></p>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline" onClick={logout}>Logout</button>
            <div className="score-wrap">
              <div className="score-ring"><span className="score-num">85</span></div>
              <p className="score-lbl">Wellness Score</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="qstats">
          {[['🧠', counts.mental, 'Mental Resources'], ['💪', counts.fitness, 'Fitness Programs'], ['🥗', counts.nutrition, 'Nutrition Guides'], ['⭐', 8, 'Active Programs']].map(([icon, n, label]) => (
            <div className="qstat" key={label}>
              <span className="qstat-icon">{icon}</span>
              <div><strong>{n}</strong><p>{label}</p></div>
            </div>
          ))}
        </div>

        {/* Main cards */}
        <h2 className="sec-title">Your Wellness Areas</h2>
        <div className="dash-cards">
          {[
            { cls: 'dc-mental', icon: '🧠', title: 'Mental Health', desc: 'Access stress management guides, anxiety support resources, and connect with certified campus counselors for professional help.', tags: ['Stress Relief', 'Anxiety Support', 'Counseling'], n: counts.mental, to: '/student/mental-health' },
            { cls: 'dc-fitness', icon: '💪', title: 'Fitness Programs', desc: 'Stay active with home workout plans, yoga for students, and structured 7-day fitness challenges — no gym required.', tags: ['Home Workouts', 'Yoga', '7-Day Challenge'], n: counts.fitness, to: '/student/fitness' },
            { cls: 'dc-nutrition', icon: '🥗', title: 'Nutrition Advice', desc: 'Eat well on a student budget with balanced diet plans, quick healthy recipes, whey protein guide, and our interactive BMI calculator.', tags: ['Diet Plans', 'Healthy Meals', 'Whey Protein 🏋️'], n: counts.nutrition, to: '/student/nutrition' },
          ].map(c => (
            <Link to={c.to} className={`dash-card ${c.cls}`} key={c.title}>
              <div className="dc-icon">{c.icon}</div>
              <div className="dc-body">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="dc-tags">{c.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
              </div>
              <div className="dc-foot">
                <span className="rc-count">{c.n} Resources</span>
                <span className="btn btn-primary btn-sm">View Details →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Daily Tips */}
        <h2 className="sec-title">Today&apos;s Wellness Tips 💡</h2>
        <div className="tips-grid">
          {[
            ['🌅', 'Start with 5 Minutes', 'Begin your day with 5 minutes of mindful breathing to set a calm, focused tone for classes ahead.'],
            ['💧', 'Stay Hydrated', 'Drink at least 8 glasses of water daily. Dehydration reduces focus and energy levels significantly.'],
            ['🚶', 'Walk Between Classes', 'Take the long route between classes. Even 10 minutes of walking boosts mood and reduces stress.'],
            ['😴', 'Sleep 7–9 Hours', 'Consistent sleep is the #1 factor in academic performance and overall wellbeing. Prioritize it!'],
          ].map(([emoji, title, desc]) => (
            <div className="tip-card" key={title}>
              <span className="tip-emoji">{emoji}</span>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="sec-title">Quick Actions ⚡</h2>
        <div className="qa-list">
          <Link to="/student/mental-health" className="qa-btn">
            <span className="qa-icon">🧠</span>
            <div><span className="qa-strong">Take Mental Health Assessment</span><span className="qa-sub">Evaluate your current wellbeing</span></div>
          </Link>
          <Link to="/student/fitness" className="qa-btn">
            <span className="qa-icon">💪</span>
            <div><span className="qa-strong">Start Workout</span><span className="qa-sub">Begin your daily fitness routine</span></div>
          </Link>
          <Link to="/student/nutrition" className="qa-btn">
            <span className="qa-icon">🥗</span>
            <div><span className="qa-strong">Calculate BMI</span><span className="qa-sub">Check your nutrition status</span></div>
          </Link>
        </div>
      </div>
    </div>
  )
}
