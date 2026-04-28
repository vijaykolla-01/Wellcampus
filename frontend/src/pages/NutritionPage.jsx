import { useState, useEffect } from 'react'

const WHEY_BRANDS = [
  { name: 'MuscleBlaze Whey',              protein: '25g / scoop', cal: '130 kcal', price: '₹3,499 / kg', rating: '⭐ 4.4', flavours: ['Rich Chocolate', 'Cookies & Cream', 'Unflavoured'], best: 'Best for Indian students — excellent value for money', icon: '🏆', badge: 'Most Popular', badgeCls: 'wb-popular' },
  { name: 'Optimum Nutrition Gold Standard', protein: '24g / scoop', cal: '120 kcal', price: '₹6,999 / kg', rating: '⭐ 4.8', flavours: ['Double Rich Chocolate', 'Vanilla Ice Cream', 'Strawberry'], best: 'Premium quality, globally trusted brand with best taste', icon: '👑', badge: 'Premium Pick', badgeCls: 'wb-premium' },
  { name: 'MyProtein Impact Whey',          protein: '21g / scoop', cal: '103 kcal', price: '₹2,800 / kg', rating: '⭐ 4.3', flavours: ['Chocolate Brownie', 'Natural Chocolate', 'Unflavoured'], best: 'Budget-friendly with clean macros and wide flavour range', icon: '💰', badge: 'Best Budget', badgeCls: 'wb-budget' },
  { name: 'Dymatize ISO100',               protein: '25g / scoop', cal: '110 kcal', price: '₹7,500 / kg', rating: '⭐ 4.7', flavours: ['Gourmet Chocolate', 'Birthday Cake', 'Fruity Pebbles'], best: 'Hydrolyzed — fastest absorption, ideal post-workout', icon: '⚡', badge: 'Fast Absorb', badgeCls: 'wb-fast' },
  { name: 'AS-IT-IS Whey',                 protein: '24g / scoop', cal: '118 kcal', price: '₹2,200 / kg', rating: '⭐ 4.2', flavours: ['Unflavoured only'], best: 'Raw, unprocessed — lab-tested, no additives or fillers', icon: '🧪', badge: 'Clean Label', badgeCls: 'wb-clean' },
  { name: 'Wellcore Whey Isolate',         protein: '27g / scoop', cal: '108 kcal', price: '₹4,200 / kg', rating: '⭐ 4.5', flavours: ['Café Mocha', 'Mango Delight', 'Unflavoured'], best: 'High protein %, low fat — ideal for cutting phase', icon: '🎯', badge: 'High Protein', badgeCls: 'wb-high' },
]

const WHEY_TIPS = [
  { icon: '⏰', title: 'Timing Matters',    desc: 'Consume within 30 minutes after your gym session for maximum muscle protein synthesis.' },
  { icon: '💧', title: 'Mix it Right',      desc: 'Use 200–250ml cold water or milk. A shaker bottle gives the best lump-free consistency.' },
  { icon: '🍌', title: 'Post-Workout Shake', desc: 'Add banana + oats + whey + milk for a complete post-workout recovery meal (~500 kcal).' },
  { icon: '😴', title: 'Pre-Bed Casein',   desc: 'For overnight muscle repair, consider casein protein instead of whey before sleeping.' },
  { icon: '🥗', title: 'Food First',        desc: 'Whey supplements your diet — aim to get 60% of protein from whole foods like eggs, chicken, dal.' },
  { icon: '🚫', title: 'Avoid Overloading', desc: 'More than 2 scoops/day is rarely beneficial. Excess protein gets converted to fat or excreted.' },
]

const GYM_PLAN = [
  { time: '7:00 AM',  icon: '🌅', label: 'Wake Up & Pre-Workout',          items: ['🍌 1 Banana', '☕ Black coffee or green tea', '🥚 2 boiled eggs'], kcal: '~200 kcal | Protein: 13g' },
  { time: '8:00 AM',  icon: '🏋️', label: 'Gym Session',                    items: ['Weight training 45–60 min', 'Compound lifts: Squats, Bench, Deadlift', 'Keep water bottle handy 💧'], kcal: 'Burns: ~400–600 kcal' },
  { time: '9:15 AM',  icon: '🥤', label: 'Post-Workout Shake ⚡ (Critical!)', items: ['💪 1–2 scoops Whey Protein (25–50g)', '🥛 250ml cold milk or water', '🍌 1 banana for carbs', '⏱️ Consume within 30 min of workout!'], kcal: '~350 kcal | Protein: 30–50g' },
  { time: '1:00 PM',  icon: '🍽️', label: 'High-Protein Lunch',             items: ['🍗 150g grilled chicken / paneer', '🍚 1 cup brown rice', '🥗 Salad with olive oil dressing', '🫘 Dal or rajma on side'], kcal: '~700 kcal | Protein: 45g' },
  { time: '4:00 PM',  icon: '🥜', label: 'Evening Snack',                   items: ['🥜 30g mixed nuts (almonds, walnuts)', '🫐 Greek yogurt or cottage cheese', '🍎 1 seasonal fruit'], kcal: '~250 kcal | Protein: 12g' },
  { time: '8:00 PM',  icon: '🌙', label: 'Dinner',                          items: ['🐟 Fish / Eggs / Tofu', '🥦 Steamed vegetables', '🫓 2 multigrain rotis', '🥛 Optional: casein shake before bed'], kcal: '~550 kcal | Protein: 35g' },
]

export default function NutritionPage() {
  const [resources, setResources] = useState([])
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${baseUrl}/api/resources`);
        const data = await res.json();
        setResources(data.filter(r => r.cat === 'NUTRITION'));
      } catch (err) {
        console.error(err);
      }
    };
    fetchResources();
  }, [])

  // BMI state
  const [height, setHeight]   = useState('')
  const [weight, setWeight]   = useState('')
  const [age, setAge]         = useState('')
  const [bmiResult, setBmi]   = useState(null)

  // Protein calculator state
  const [protWeight, setProtWeight] = useState('')
  const [goal, setGoal]             = useState('muscle')
  const [activity, setActivity]     = useState('moderate')
  const [protResult, setProtResult] = useState(null)

  // Whey brand accordion
  const [activeWhey, setActiveWhey] = useState(null)

  const calcBmi = () => {
    const h = parseFloat(height), w = parseFloat(weight)
    if (!h || !w || h <= 0 || w <= 0) return
    const bmi = (w / ((h / 100) ** 2)).toFixed(1)
    let cat, color, advice, emoji
    if      (bmi < 18.5) { cat = 'Underweight';  color = '#3b82f6'; advice = 'Consider increasing caloric intake with nutrient-dense foods.'; emoji = '⚠️' }
    else if (bmi < 25)   { cat = 'Normal Weight'; color = '#22c55e'; advice = 'Maintain your current healthy diet and exercise routine!'; emoji = '✅' }
    else if (bmi < 30)   { cat = 'Overweight';   color = '#f59e0b'; advice = 'Consider reducing processed foods and increasing physical activity.'; emoji = '⚠️' }
    else                  { cat = 'Obese';         color = '#ef4444'; advice = 'Please consult a healthcare professional for personalized guidance.'; emoji = '🏥' }
    setBmi({ bmi, cat, color, advice, emoji })
  }

  const calcProtein = () => {
    const w = parseFloat(protWeight)
    if (!w || w <= 0) return
    const multipliers = {
      muscle:    { sedentary: 1.6, moderate: 1.8, active: 2.0, athlete: 2.2 },
      strength:  { sedentary: 1.8, moderate: 2.0, active: 2.2, athlete: 2.4 },
      endurance: { sedentary: 1.4, moderate: 1.6, active: 1.8, athlete: 2.0 },
      maintain:  { sedentary: 1.0, moderate: 1.2, active: 1.4, athlete: 1.6 },
    }
    const mult     = multipliers[goal][activity]
    const daily    = Math.round(w * mult)
    const fromFood = Math.round(daily * 0.6)
    const fromWhey = Math.round(daily * 0.4)
    const scoops   = Math.round(fromWhey / 25)
    const timing   = (goal === 'muscle' || goal === 'strength')
      ? 'Post-workout within 30 min, and optionally pre-bed'
      : 'Post-workout or as a morning protein boost'
    setProtResult({ daily, fromFood, fromWhey, scoops, mult, timing })
  }

  return (
    <div className="page">
      <div className="container">

        {/* Page Header */}
        <div className="pg-header-simple">
          <div className="ph-icon bg-nutrition">🥗</div>
          <div>
            <h1 className="pg-title" style={{ fontSize: '1.9rem' }}>Nutrition Advice</h1>
            <p className="pg-sub">Smart eating habits for a healthier, more energized student life</p>
          </div>
        </div>

        {/* ── Balanced Diet Plan ── */}
        <div className="res-section">
          <div className="res-sec-hdr">
            <h2>🍽️ Balanced Diet Plan for Students</h2>
            <span className="badge badge-nutrition">Nutritionist Approved</span>
          </div>
          <div className="meal-grid">
            {[
              { time: '🌅 Breakfast', title: 'Power Start Meal',       items: ['🥣 Oats with banana & honey', '🥚 2 boiled eggs', '🥛 1 glass milk or smoothie', '🫐 Handful of berries'], macros: ['~450 kcal', 'Protein: 22g', 'Carbs: 65g'] },
              { time: '☀️ Lunch',    title: 'Balanced Midday Meal',   items: ['🍚 Brown rice or 2 chapatis', '🫘 Dal or legume curry', '🥗 Mixed vegetable salad', '🥬 Leafy green sabzi'], macros: ['~600 kcal', 'Protein: 18g', 'Carbs: 80g'] },
              { time: '🌙 Dinner',   title: 'Light & Nourishing Dinner', items: ['🍲 Vegetable soup', '🫓 2 multigrain chapatis', '🐔 Grilled chicken / paneer', '🥒 Cucumber & curd'], macros: ['~500 kcal', 'Protein: 25g', 'Carbs: 55g'] },
              { time: '🍎 Snacks',   title: 'Healthy Snack Ideas',    items: ['🥜 Mixed nuts & seeds', '🍌 Fresh fruits', '🫐 Greek yogurt', '🫙 Hummus & veggies'], macros: ['~200 kcal', 'Protein: 8g', 'Healthy fats'] },
            ].map(m => (
              <div className="meal-card" key={m.title}>
                <div className="mtime">{m.time}</div>
                <h4>{m.title}</h4>
                <ul className="mlist">{m.items.map(i => <li key={i}>{i}</li>)}</ul>
                <div className="mmacros">{m.macros.map(x => <span key={x}>{x}</span>)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Quick Meals ── */}
        <div className="res-section">
          <div className="res-sec-hdr"><h2>⚡ Quick Healthy Meals</h2><span className="badge badge-sage">Under 20 Minutes</span></div>
          <div className="res-grid">
            {[
              ['🥗', '5-Minute Protein Salad', 'Chickpeas, cucumber, tomato, onion, lemon. No cooking needed!', '5 min | 320 kcal'],
              ['🍳', 'Egg Fried Rice',          'Leftover rice, eggs, soy sauce, and veggies. Budget-friendly, high protein.', '15 min | 480 kcal'],
              ['🥤', 'Power Smoothie Bowl',     'Blend banana, oats, milk, peanut butter. Top with granola and fruits.', '10 min | 380 kcal'],
            ].map(([icon, title, desc, tag]) => (
              <div className="res-card" key={title}>
                <span className="rc-icon">{icon}</span><h4>{title}</h4><p>{desc}</p>
                <div className="rc-foot"><span className="tag">{tag}</span><button className="btn btn-sm btn-primary">Recipe →</button></div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            WHEY PROTEIN SECTION — For Gym Students
            ═══════════════════════════════════════════ */}
        <div className="whey-section">

          {/* Hero Banner */}
          <div className="whey-hero">
            <div className="whey-hero-left">
              <span className="whey-eyebrow">🏋️ For Gym-Going Students</span>
              <h2 className="whey-title">Whey Protein Guide</h2>
              <p className="whey-subtitle">
                Everything you need to know about supplementing your gym gains with the right protein
                — from daily dosage calculation to brand comparison and timing tips.
              </p>
              <div className="whey-stats">
                {[['25g', 'Protein per scoop'], ['30 min', 'Post-workout window'], ['0.8–2.2g', 'Per kg body weight / day']].map(([n, l]) => (
                  <div className="whey-stat" key={l}><strong>{n}</strong><span>{l}</span></div>
                ))}
              </div>
            </div>
            <div className="whey-hero-right">
              <div className="whey-shake">🥤</div>
              <div className="whey-particles">
                {['💪', '⚡', '🏋️', '🎯', '🔥'].map((e, i) => (
                  <span key={i} className="wp" style={{ animationDelay: `${i * 0.4}s` }}>{e}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Protein Calculator ── */}
          <div className="prot-calc-card">
            <div className="prot-calc-header">
              <h3>🧮 Daily Protein & Whey Calculator</h3>
              <p>Find out exactly how much protein you need and how many scoops of whey to take daily</p>
            </div>
            <div className="prot-calc-body">
              <div className="prot-inputs">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Body Weight (kg)</label>
                  <input type="number" className="form-input form-input-plain" placeholder="e.g. 72"
                    value={protWeight} onChange={e => setProtWeight(e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Fitness Goal</label>
                  <select className="form-input form-input-plain form-select" value={goal} onChange={e => setGoal(e.target.value)}>
                    <option value="muscle">💪 Muscle Building</option>
                    <option value="strength">🏋️ Strength Gains</option>
                    <option value="endurance">🏃 Endurance Training</option>
                    <option value="maintain">⚖️ Maintain / Tone</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Activity Level</label>
                  <select className="form-input form-input-plain form-select" value={activity} onChange={e => setActivity(e.target.value)}>
                    <option value="sedentary">🛋️ Light (1–2 days/week)</option>
                    <option value="moderate">🚶 Moderate (3–4 days/week)</option>
                    <option value="active">🏃 Active (5–6 days/week)</option>
                    <option value="athlete">⚡ Athlete (2× daily)</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button className="btn btn-primary btn-full" onClick={calcProtein}>Calculate →</button>
                </div>
              </div>

              {protResult && (
                <div className="prot-result fade-up">
                  <div className="prot-result-header">
                    <span className="prot-result-emoji">💪</span>
                    <div>
                      <h4>Your Daily Protein Target</h4>
                      <p style={{ fontSize: '.82rem', color: 'var(--g400)' }}>Based on {protResult.mult}g per kg body weight</p>
                    </div>
                  </div>
                  <div className="prot-result-nums">
                    <div className="prn"><strong>{protResult.daily}g</strong><span>Total / Day</span></div>
                    <div className="prn-div">→</div>
                    <div className="prn food"><strong>{protResult.fromFood}g</strong><span>From Food (60%)</span></div>
                    <div className="prn-div">+</div>
                    <div className="prn whey"><strong>{protResult.fromWhey}g</strong><span>From Whey (40%)</span></div>
                    <div className="prn-div">=</div>
                    <div className="prn scoops"><strong>{protResult.scoops} scoop{protResult.scoops !== 1 ? 's' : ''}</strong><span>Whey / Day</span></div>
                  </div>
                  <div className="prot-timing">
                    <span>⏰</span>
                    <p><strong>Best timing:</strong> {protResult.timing}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Brand Comparison ── */}
          <div className="res-section">
            <div className="res-sec-hdr">
              <h2>🏷️ Top Whey Protein Brands Compared</h2>
              <span className="badge badge-sky">Click to Expand</span>
            </div>
            <div className="whey-brands-grid">
              {WHEY_BRANDS.map((b, i) => (
                <div className={`whey-brand-card${activeWhey === i ? ' wbc-open' : ''}`} key={b.name}
                  onClick={() => setActiveWhey(activeWhey === i ? null : i)}>
                  <div className="wbc-header">
                    <span className="wbc-icon">{b.icon}</span>
                    <div className="wbc-info">
                      <h4>{b.name}</h4>
                      <p>{b.protein} &nbsp;·&nbsp; {b.cal} &nbsp;·&nbsp; {b.rating}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                      <span className={`wbc-badge ${b.badgeCls}`}>{b.badge}</span>
                      <span className="wbc-chevron">{activeWhey === i ? '▲' : '▼'}</span>
                    </div>
                  </div>
                  {activeWhey === i && (
                    <div className="wbc-detail fade-up">
                      <div className="wbc-detail-row">
                        <div><span className="wbc-dl">💰 Price</span><strong>{b.price}</strong></div>
                        <div><span className="wbc-dl">🧪 Protein</span><strong>{b.protein}</strong></div>
                        <div><span className="wbc-dl">🔥 Calories</span><strong>{b.cal}</strong></div>
                      </div>
                      <div style={{ marginTop: '1rem' }}>
                        <span className="wbc-dl">🍫 Flavours</span>
                        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginTop: '.4rem' }}>
                          {b.flavours.map(f => <span className="tag" key={f}>{f}</span>)}
                        </div>
                      </div>
                      <div className="wbc-verdict">💡 {b.best}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Gym Day Nutrition Timeline ── */}
          <div className="res-section">
            <div className="res-sec-hdr">
              <h2>🗓️ Sample Gym-Day Nutrition Plan</h2>
              <span className="badge badge-fitness">High Protein</span>
            </div>
            <div className="gym-day-timeline">
              {GYM_PLAN.map((step, i) => (
                <div className="gym-step" key={i}>
                  <div className="gym-step-time">{step.time}</div>
                  <div className="gym-step-dot"><span>{step.icon}</span></div>
                  <div className="gym-step-card">
                    <h4>{step.label}</h4>
                    <ul className="mlist" style={{ marginBottom: '.7rem' }}>
                      {step.items.map(it => <li key={it}>{it}</li>)}
                    </ul>
                    <span className="tag" style={{ background: 'var(--teal-pale)', color: 'var(--teal-dark)' }}>{step.kcal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Whey Tips ── */}
          <div className="res-section">
            <div className="res-sec-hdr">
              <h2>💡 Whey Protein Pro Tips</h2>
              <span className="badge badge-gym">Gym Bros Must Read</span>
            </div>
            <div className="whey-tips-grid">
              {WHEY_TIPS.map(t => (
                <div className="whey-tip-card" key={t.title}>
                  <span className="wt-icon">{t.icon}</span>
                  <div><h4>{t.title}</h4><p>{t.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* ═══════ END WHEY PROTEIN SECTION ═══════ */}

        {/* ── BMI Calculator ── */}
        <div className="res-section">
          <div className="res-sec-hdr"><h2>📊 BMI Calculator</h2><span className="badge badge-sky">Interactive</span></div>
          <div className="bmi-card">
            <div>
              <h3 style={{ marginBottom: '.5rem', fontSize: '1.2rem' }}>Calculate Your BMI</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '.88rem' }}>Body Mass Index (BMI) is a simple measure of body fat based on height and weight.</p>
              {[['Height (cm)', height, setHeight, 'e.g. 170'], ['Weight (kg)', weight, setWeight, 'e.g. 65'], ['Age', age, setAge, 'e.g. 20']].map(([label, val, setVal, ph]) => (
                <div className="form-group" key={label}>
                  <label className="form-label">{label}</label>
                  <input type="number" className="form-input form-input-plain" placeholder={ph}
                    value={val} onChange={e => setVal(e.target.value)} />
                </div>
              ))}
              <button className="btn btn-primary btn-full" onClick={calcBmi}>Calculate BMI</button>
            </div>
            <div>
              <div className="bmi-result-box">
                {!bmiResult ? (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '.7rem' }}>📊</div>
                    <p style={{ color: 'var(--g400)', fontSize: '.88rem' }}>Enter your details and click Calculate</p>
                  </div>
                ) : (
                  <div style={{ width: '100%' }}>
                    <div style={{ fontSize: '3.5rem', fontWeight: 800, color: bmiResult.color, lineHeight: 1, marginBottom: '.5rem' }}>{bmiResult.bmi}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: bmiResult.color, marginBottom: '1rem' }}>{bmiResult.emoji} {bmiResult.cat}</div>
                    <p style={{ color: 'var(--g600)', fontSize: '.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>{bmiResult.advice}</p>
                    <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      {[`Height: ${height}cm`, `Weight: ${weight}kg`, ...(age ? [`Age: ${age}`] : [])].map(x => <span key={x} className="tag">{x}</span>)}
                    </div>
                  </div>
                )}
              </div>
              <div className="bmi-scale">
                {[['Underweight', '<18.5', 'br-under'], ['Normal', '18.5–24.9', 'br-normal'], ['Overweight', '25–29.9', 'br-over'], ['Obese', '≥30', 'br-obese']].map(([cat, range, cls]) => (
                  <div className={`bmi-range ${cls}`} key={cat}>{cat}<br />{range}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── All Nutrition Resources ── */}
        <div className="res-section">
          <div className="res-sec-hdr">
            <h2>📚 All Nutrition Resources</h2>
            <span className="badge badge-nutrition">{resources.length} available</span>
          </div>
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
