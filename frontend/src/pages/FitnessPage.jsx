import { useState, useEffect } from 'react'

const DAY_DATA = [
  '🚶 30 min walk', '💪 15 push-ups + 20 squats', '🧘 20 min yoga',
  '🏃 25 min jog', '🏋️ Full body strength', '🤸 Flexibility session', '🎉 Rest & celebrate!',
]

export default function FitnessPage() {
  const [resources, setResources] = useState([])
  const [done, setDone] = useState(Array(7).fill(false))

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${baseUrl}/api/resources`);
        const data = await res.json();
        setResources(data.filter(r => r.cat === 'FITNESS'));
      } catch (err) {
        console.error(err);
      }
    };
    fetchResources();
  }, [])
  const completed = done.filter(Boolean).length

  const toggleDay = (i) => setDone(d => { const n = [...d]; n[i] = !n[i]; return n })

  return (
    <div className="page">
      <div className="container">
        <div className="pg-header-simple">
          <div className="ph-icon bg-fitness">💪</div>
          <div>
            <h1 className="pg-title" style={{ fontSize: '1.9rem' }}>Fitness Programs</h1>
            <p className="pg-sub">Stay active and energized with student-friendly workout plans</p>
          </div>
        </div>

        {/* Home Workout Plan */}
        <div className="res-section">
          <div className="res-sec-hdr"><h2>🏠 Home Workout Plan</h2><span className="badge badge-fitness">No Equipment</span></div>
          <div className="workout-grid">
            {[
              { day: 'Monday',  type: 'Upper Body', cls: 'wt-push', items: ['Push-ups: 3×15', 'Tricep Dips: 3×12', 'Shoulder Press: 3×10', 'Plank: 3×30s'] },
              { day: 'Wednesday', type: 'Lower Body', cls: 'wt-pull', items: ['Squats: 3×20', 'Lunges: 3×15', 'Glute Bridges: 3×15', 'Calf Raises: 3×20'] },
              { day: 'Friday',  type: 'Core & Cardio', cls: 'wt-core', items: ['Burpees: 3×10', 'Mountain Climbers: 3×30s', 'Bicycle Crunches: 3×20', 'Jump Rope: 5 min'] },
              { day: 'Weekend', type: 'Active Recovery', cls: 'wt-rest', items: ['Light Walk: 20 min', 'Stretching: 15 min', 'Foam Rolling', 'Rest & Recovery'] },
            ].map(w => (
              <div className="wd-card" key={w.day}>
                <div className="wd-day">{w.day}</div>
                <div className={`wtype ${w.cls}`}>{w.type}</div>
                <ul className="wlist">{w.items.map(i => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>

        {/* Yoga */}
        <div className="res-section">
          <div className="res-sec-hdr"><h2>🧘 Yoga Program for Students</h2><span className="badge badge-sage">Beginner Friendly</span></div>
          <div className="res-grid">
            {[
              ['🌅', 'Morning Energizer (10 min)', 'Sun salutations and energizing poses to wake up your body before morning lectures.', '10 min'],
              ['📚', 'Study Break Yoga (5 min)', 'Quick desk yoga and neck/shoulder stretches after long hours of studying.', '5 min'],
              ['🌙', 'Sleep Yoga (15 min)', 'Calming evening yoga sequence to relax your body and prepare for deep, restful sleep.', '15 min'],
            ].map(([icon, title, desc, tag]) => (
              <div className="res-card" key={title}>
                <span className="rc-icon">{icon}</span><h4>{title}</h4><p>{desc}</p>
                <div className="rc-foot"><span className="tag">{tag}</span><button className="btn btn-sm btn-primary">Start →</button></div>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Challenge */}
        <div className="res-section">
          <div className="res-sec-hdr"><h2>🏆 7-Day Fitness Challenge</h2><span className="badge badge-sky">Track Progress</span></div>
          <div className="challenge-grid">
            {DAY_DATA.map((text, i) => (
              <div className="ch-day" key={i}>
                <div className="ch-num">Day {i + 1}</div>
                <div className="ch-content">{text}</div>
                <button className={`ch-btn${done[i] ? ' done' : ''}`} onClick={() => toggleDay(i)}>
                  {done[i] ? '✅ Done!' : '☐ Mark Done'}
                </button>
              </div>
            ))}
          </div>
          <div className="prog-bar-wrap">
            <div className="prog-track"><div className="prog-fill" style={{ width: `${(completed / 7) * 100}%` }} /></div>
            <span className="prog-text">{completed} / 7 days completed</span>
          </div>
        </div>

        {/* All Resources */}
        <div className="res-section">
          <div className="res-sec-hdr"><h2>📚 All Fitness Resources</h2><span className="badge badge-fitness">{resources.length} available</span></div>
          <div className="res-grid">
            {resources.map(r => (
              <div className="res-card" key={r.id}>
                <span className="rc-icon">{r.icon}</span><h4>{r.title}</h4><p>{r.desc}</p>
                <div className="rc-foot"><span className="tag">{r.views} views</span><button className="btn btn-sm btn-primary">View →</button></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
