import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="blob blob1" /><div className="blob blob2" /><div className="blob blob3" />
        <div className="hero-content">
          <span className="hero-badge">🎓 For College Students</span>
          <h1 className="hero-title">Your Wellness Journey<br /><em>Starts Here</em></h1>
          <p className="hero-desc">
            WellCampus is a comprehensive health and wellness platform designed exclusively
            for college students — combining mental health support, fitness programs, and
            nutrition advice in one place.
          </p>
          <div className="hero-actions">
            <Link to="/login" className="btn btn-primary btn-lg">Get Started →</Link>
            <a href="#features" className="btn btn-outline btn-lg">Learn More</a>
          </div>
          <div className="hero-stats">
            <div className="stat"><strong>120+</strong><span>Students</span></div>
            <div className="stat-div" />
            <div className="stat"><strong>25+</strong><span>Resources</span></div>
            <div className="stat-div" />
            <div className="stat"><strong>8</strong><span>Programs</span></div>
          </div>
        </div>
        <div className="hero-ill">
          <div className="float-card fc1"><span>🧠</span><p>Mental Health</p></div>
          <div className="float-card fc2"><span>💪</span><p>Fitness</p></div>
          <div className="float-card fc3"><span>🥗</span><p>Nutrition</p></div>
          <div className="hero-circle"><div className="hero-circle-inner">🌿</div></div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="sec-hdr">
            <h2>Everything You Need to <em>Thrive</em></h2>
            <p>Three pillars of wellness, all in one platform</p>
          </div>
          <div className="feat-grid">
            {[
              { cls: 'mental', icon: '🧠', title: 'Mental Health',
                desc: 'Access stress management tools, anxiety support resources, and connect with certified campus counselors whenever you need help.',
                items: ['Stress Management Guides', 'Anxiety Support Resources', 'Counseling Services', 'Mindfulness Programs'] },
              { cls: 'fitness', icon: '💪', title: 'Fitness Programs',
                desc: 'Stay active with home workout plans, yoga sessions, and structured fitness challenges tailored for busy college students.',
                items: ['Home Workout Plans', 'Yoga for Students', '7-Day Fitness Challenge', 'Cardio Programs'] },
              { cls: 'nutrition', icon: '🥗', title: 'Nutrition Advice',
                desc: 'Eat smart on a student budget. Explore balanced diet plans, quick healthy recipes, and our interactive BMI calculator.',
                items: ['Balanced Diet Plans', 'Budget-Friendly Recipes', 'BMI Calculator', 'Whey Protein Guide 🏋️'] },
            ].map(f => (
              <div className={`feat-card ${f.cls}`} key={f.cls}>
                <span className="feat-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <ul className="feat-list">{f.items.map(i => <li key={i}>✓ {i}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            <div>
              <h2>Built for <em>Students</em>, By Students</h2>
              <p style={{ marginTop: '1rem', lineHeight: 1.85 }}>
                WellCampus was created as part of a B.Tech Full Stack Application Development project
                to address the growing need for accessible health and wellness resources in academic environments.
              </p>
              <p style={{ marginTop: '1rem', marginBottom: '1.5rem', lineHeight: 1.85 }}>
                Our platform provides a safe, private, and supportive environment where students can access
                evidence-based health information and connect with professional support.
              </p>
              <Link to="/login" className="btn btn-primary">Join WellCampus →</Link>
            </div>
            <div className="about-cards">
              {[
                ['🎯', 'Evidence-Based', 'All resources curated from trusted health organizations'],
                ['🔒', 'Private & Secure', 'Health data protected with role-based access control'],
                ['📱', 'Always Accessible', 'Access resources anytime from any device on campus'],
                ['👨‍⚕️', 'Expert Support', 'Connect with campus counselors and wellness experts'],
              ].map(([icon, title, desc]) => (
                <div className="acard" key={title}>
                  <span className="acard-icon">{icon}</span>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Start Your Wellness Journey?</h2>
            <p>Join 120+ students already using WellCampus to live healthier, happier campus lives.</p>
            <Link to="/login" className="btn btn-white btn-lg">Get Started Today →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
