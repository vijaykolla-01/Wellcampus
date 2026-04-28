import { useState, useRef, useEffect } from 'react';
import MentalHealthAssessment from '../components/MentalHealthAssessment';

export default function MentalHealthPage() {
  const [resources, setResources] = useState([])
  const [breathText, setBreathText] = useState('Press Start')
  const [breathCls,  setBreathCls]  = useState('')

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${baseUrl}/api/resources`);
        const data = await res.json();
        setResources(data.filter(r => r.cat === 'MENTAL_HEALTH'));
      } catch (err) {
        console.error(err);
      }
    };
    fetchResources();
  }, [])
  const [running,    setRunning]    = useState(false)
  const [showAssessment, setShowAssessment] = useState(false)
  const [assessmentResult, setAssessmentResult] = useState(null)
  const [assessmentHistory, setAssessmentHistory] = useState([])
  const timerRef = useRef(null)
  const phaseRef = useRef(0)
  const cycleRef = useRef(0)

  const phases = [
    { text: 'Inhale...', dur: 4000, cls: 'bc-expand' },
    { text: 'Hold...',   dur: 7000, cls: 'bc-hold' },
    { text: 'Exhale...', dur: 8000, cls: 'bc-contract' },
  ]

  const runPhase = () => {
    const p = phases[phaseRef.current]
    setBreathText(p.text); setBreathCls(p.cls)
    timerRef.current = setTimeout(() => {
      phaseRef.current = (phaseRef.current + 1) % 3
      if (phaseRef.current === 0) {
        cycleRef.current++
        if (cycleRef.current >= 3) {
          setBreathText('Done! 😊'); setBreathCls('')
          setRunning(false); phaseRef.current = 0; cycleRef.current = 0
          return
        }
      }
      runPhase()
    }, p.dur)
  }

  const toggleBreath = () => {
    if (running) {
      clearTimeout(timerRef.current)
      setRunning(false); setBreathText('Press Start'); setBreathCls('')
      phaseRef.current = 0; cycleRef.current = 0
    } else {
      setRunning(true); runPhase()
    }
  }

  const handleAssessmentComplete = (result) => {
    setAssessmentResult(result);
    // Add to assessment history
    const newHistory = [...assessmentHistory, {...result, date: new Date().toLocaleDateString()}];
    setAssessmentHistory(newHistory);
    
    // Check if score is high risk (> 22) to trigger alert
    if (result.score > 22) {
      alert("⚠️ High Risk Alert: This student may need immediate attention. Please contact counseling services.");
    }
    
    setShowAssessment(false);
  };

  const startAssessment = () => {
    setShowAssessment(true);
    setAssessmentResult(null);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="pg-header-simple">
          <div className="ph-icon bg-mental">🧠</div>
          <div>
            <h1 className="pg-title" style={{ fontSize: '1.9rem' }}>Mental Health Resources</h1>
            <p className="pg-sub">Evidence-based tools and support for your mental wellbeing</p>
          </div>
        </div>

        <div className="emerg">🆘 <span>In crisis? Call the Student Helpline: <strong>1800-599-0019</strong> (24/7, Free)</span></div>

        {/* Stress Management */}
        <div className="res-section">
          <div className="res-sec-hdr"><h2>😰 Stress Management</h2><span className="badge badge-mental">Evidence-Based</span></div>
          <div className="res-grid">
            {[
              ['📖', 'Stress Management Guide', 'Practical techniques including breathing, time management, and mindfulness practices.', '15 min read'],
              ['🎯', 'Exam Stress Toolkit', 'Targeted strategies for managing academic pressure during exams and deadlines.', 'Interactive'],
              ['⏱️', '4-7-8 Breathing Exercise', 'A clinically proven technique to reduce acute stress in under 2 minutes.', '2 min'],
            ].map(([icon, title, desc, tag]) => (
              <div className="res-card" key={title}>
                <span className="rc-icon">{icon}</span><h4>{title}</h4><p>{desc}</p>
                <div className="rc-foot"><span className="tag">{tag}</span><button className="btn btn-sm btn-primary">Read Now →</button></div>
              </div>
            ))}
          </div>
        </div>

        {/* Anxiety Support */}
        <div className="res-section">
          <div className="res-sec-hdr"><h2>💚 Anxiety Support</h2><span className="badge badge-sage">Self-Help</span></div>
          <div className="res-grid">
            {[
              ['🧩', 'Understanding Anxiety', 'Learn to identify anxiety triggers and develop healthy coping strategies using CBT.', '20 min read'],
              ['📔', 'CBT Workbook for Students', 'A self-guided cognitive behavioral therapy workbook designed for college-age students.', 'Downloadable'],
              ['🧘', 'Mindfulness for Anxiety', 'Guided mindfulness sessions of 5, 10, and 20 minutes to calm anxious thoughts.', 'Audio + Text'],
            ].map(([icon, title, desc, tag]) => (
              <div className="res-card" key={title}>
                <span className="rc-icon">{icon}</span><h4>{title}</h4><p>{desc}</p>
                <div className="rc-foot"><span className="tag">{tag}</span><button className="btn btn-sm btn-primary">Start →</button></div>
              </div>
            ))}
          </div>
        </div>

        {/* All DB Resources */}
        <div className="res-section">
          <div className="res-sec-hdr"><h2>📚 All Mental Health Resources</h2><span className="badge badge-sky">{resources.length} available</span></div>
          <div className="res-grid">
            {resources.map(r => (
              <div className="res-card" key={r.id}>
                <span className="rc-icon">{r.icon}</span><h4>{r.title}</h4><p>{r.desc}</p>
                <div className="rc-foot"><span className="tag">{r.views} views</span><button className="btn btn-sm btn-primary">View →</button></div>
              </div>
            ))}
          </div>
        </div>

        {/* Counseling */}
        <div className="counsel-sec">
          <div className="counsel-hdr"><h2>🤝 Counseling & Professional Support</h2><p>Connecting you with professional help when you need it most</p></div>
          <div className="counsel-grid">
            {[
              { cls: 'ccard primary', title: '📞 Campus Counseling Center', d1: 'Mon – Fri, 9:00 AM – 5:00 PM', d2: '📍 Student Services Building, Room 201', btn: 'Call: +91 12345 67890', btnCls: 'btn btn-white btn-sm' },
              { cls: 'ccard', title: '💬 Online Chat Support', d1: 'Available 24/7 via campus portal', d2: 'Anonymous and confidential', btn: 'Start Chat', btnCls: 'btn btn-primary btn-sm' },
              { cls: 'ccard', title: '📧 Email a Counselor', d1: 'Response within 24 hours', d2: 'wellness@university.edu', btn: 'Send Email', btnCls: 'btn btn-primary btn-sm' },
              { cls: 'ccard emrg', title: '🆘 Crisis Helpline', d1: '24/7 Free National Crisis Helpline', d2: 'Immediate support available', btn: 'Call: 1800-599-0019', btnCls: 'btn btn-danger btn-sm' },
            ].map(c => (
              <div className={c.cls} key={c.title}>
                <h4>{c.title}</h4><p className="cdet">{c.d1}</p><p className="cdet">{c.d2}</p>
                <button className={c.btnCls}>{c.btn}</button>
              </div>
            ))}
          </div>
        </div>

        {/* Breathing Exercise */}
        <div className="breath-card">
          <h3>🌬️ Try: 4-7-8 Breathing Exercise</h3>
          <p>Press Start and follow the guided breathing pattern. Takes less than 2 minutes.</p>
          <div className={`breath-circle ${breathCls}`}>{breathText}</div>
          <button className="btn btn-primary" onClick={toggleBreath}>
            {running ? 'Stop Exercise' : 'Start Exercise'}
          </button>
        </div>

        {/* Mental Health Assessment */}
        <div className="assessment-section">
          <div className="res-sec-hdr">
            <h2>📋 Mental Health Self-Assessment</h2>
            <span className="badge badge-mental">Evidence-Based</span>
          </div>
          <p>Take this brief assessment to monitor your mental health and get personalized recommendations.</p>
          
          {!showAssessment && !assessmentResult && (
            <button className="btn btn-primary" onClick={startAssessment}>
              Start Assessment
            </button>
          )}
          
          {showAssessment && (
            <div className="assessment-container">
              <MentalHealthAssessment onComplete={handleAssessmentComplete} />
            </div>
          )}
          
          {assessmentResult && (
            <div className="assessment-result-summary">
              <h3>Your Assessment Results</h3>
              <p>Score: {assessmentResult.score}/{assessmentResult.maxScore} ({assessmentResult.percentage}%)</p>
              <button className="btn btn-secondary" onClick={startAssessment}>
                Retake Assessment
              </button>
            </div>
          )}
          
          {/* Assessment History */}
          {assessmentHistory.length > 0 && (
            <div className="assessment-history">
              <h4>Assessment History</h4>
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Score</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {assessmentHistory.map((result, index) => (
                    <tr key={index}>
                      <td>{result.date}</td>
                      <td>{result.score}/{result.maxScore}</td>
                      <td>
                        <span className={`status-badge ${
                          result.score <= 7 ? 'status-healthy' : 
                          result.score <= 14 ? 'status-mild' : 
                          result.score <= 21 ? 'status-moderate' : 'status-high'
                        }`}>
                          {result.score <= 7 ? 'Healthy' : 
                           result.score <= 14 ? 'Mild Stress' : 
                           result.score <= 21 ? 'Moderate Stress' : 'High Risk'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
