import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setMessage(null);
    setError(null);
    setLoading(true);

    const baseUrl = import.meta.env.VITE_API_URL || '';
    const url = isLogin
      ? `${baseUrl}/api/auth/login`
      : `${baseUrl}/api/auth/register`;

    const body = isLogin
      ? { email: form.email, password: form.password }
      : { name: form.name, email: form.email, password: form.password, role: form.role };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        throw new Error(data.message || `Request failed with status ${res.status}`);
      }

      setMessage(data.message || 'Success');

      if (data.user) {
        // Pass both user data and token to AuthContext
        login(data.user, data.token);

        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/student");
        }
      } else if (!isLogin) {
        // Registration success — switch to login view
        setIsLogin(true);
        setForm({ ...form, password: "" });
      }
    } catch (err) {
      setError(err.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div style={styles.page}>
      {/* Left Panel */}
      <div style={styles.left}>
        <h1 style={styles.brand}>🌿 WellCampus</h1>
        <h2 style={styles.heading}>Welcome to<br /><em>Your Wellness Hub</em></h2>
        <p style={styles.sub}>Access personalized health resources, fitness programs, and wellness tools.</p>
        <ul style={styles.features}>
          <li>🧠 Mental Health Support</li>
          <li>💪 Fitness Programs</li>
          <li>🥗 Nutrition &amp; Whey Guide</li>
        </ul>
        <div style={styles.demoBox}>
          <strong>Demo Accounts:</strong><br />
          Student: <code>arjun@student.edu</code> / <code>student123</code><br />
          Admin: <code>admin@wellcampus.edu</code> / <code>admin123</code>
        </div>
      </div>

      {/* Right Panel */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>{isLogin ? "Sign In" : "Sign Up"}</h2>
          <p style={styles.cardSub}>
            {isLogin ? "Enter your credentials to access the platform" : "Create your WellCampus account"}
          </p>

          {error && <div style={styles.error}>⚠️ {error}</div>}
          {message && !error && <div style={styles.success}>✅ {message}</div>}

          {!isLogin && (
            <input
              style={styles.input}
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          )}

          <input
            style={styles.input}
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <input
            style={styles.input}
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          {!isLogin && (
            <select style={styles.input} name="role" value={form.role} onChange={handleChange}>
              <option value="student">👤 Student</option>
              <option value="admin">🛡️ Admin</option>
            </select>
          )}

          <button style={styles.btn} onClick={handleSubmit} disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Sign In to WellCampus →" : "Create Account →"}
          </button>

          <p style={styles.toggle}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              style={styles.link}
              onClick={() => { setIsLogin(!isLogin); setError(null); setMessage(null); }}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page:     { display: "flex", minHeight: "100vh", fontFamily: "sans-serif" },
  left:     { flex: 1, background: "linear-gradient(135deg, #2d6a4f, #52b788)", color: "#fff", padding: "60px 40px", display: "flex", flexDirection: "column", justifyContent: "center" },
  brand:    { fontSize: "1.4rem", marginBottom: "30px" },
  heading:  { fontSize: "2rem", fontWeight: "bold", lineHeight: 1.4, marginBottom: "16px" },
  sub:      { fontSize: "0.95rem", opacity: 0.85, marginBottom: "24px" },
  features: { listStyle: "none", padding: 0, lineHeight: 2.2, fontSize: "1rem" },
  demoBox:  { marginTop: "30px", background: "rgba(255,255,255,0.15)", borderRadius: "10px", padding: "16px", fontSize: "0.85rem", lineHeight: 2 },
  right:    { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" },
  card:     { background: "#fff", borderRadius: "16px", padding: "40px", width: "100%", maxWidth: "420px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" },
  cardTitle:{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "6px" },
  cardSub:  { color: "#888", fontSize: "0.9rem", marginBottom: "24px" },
  input:    { width: "100%", padding: "12px 14px", marginBottom: "14px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "0.95rem", boxSizing: "border-box" },
  btn:      { width: "100%", padding: "13px", background: "#2d6a4f", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1rem", cursor: "pointer", fontWeight: "600" },
  error:    { background: "#fff0f0", color: "#cc0000", padding: "10px 14px", borderRadius: "8px", marginBottom: "14px", fontSize: "0.9rem" },
  success:  { background: "#f0fff4", color: "#276749", padding: "10px 14px", borderRadius: "8px", marginBottom: "14px", fontSize: "0.9rem" },
  toggle:   { textAlign: "center", marginTop: "18px", fontSize: "0.9rem", color: "#555" },
  link:     { color: "#2d6a4f", fontWeight: "600", cursor: "pointer" },
};
