import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'student' });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const parseResponse = async (res) => {
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return res.json();
    }
    const text = await res.text();
    return { message: text || 'Unexpected response from server' };
  };

  const fetchUsers = async () => {
    setError(null);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${baseUrl}/api/auth/users`);
      const data = await parseResponse(res);
      if (!res.ok) throw new Error(data.message || 'Unable to load users');
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreate = async () => {
    setMessage(null);
    setError(null);
    setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      const data = await parseResponse(res);
      if (!res.ok) throw new Error(data.message || 'Unable to create user');
      setMessage(data.message);
      setNewUser({ name: '', email: '', password: '', role: 'student' });
      fetchUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setMessage(null);
    setError(null);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${baseUrl}/api/auth/users/${id}`, {
        method: 'DELETE',
      });
      const data = await parseResponse(res);
      if (!res.ok) throw new Error(data.message || 'Unable to delete user');
      setMessage(data.message);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const students = users.filter((u) => u.role === 'student').length;
  const admins = users.filter((u) => u.role === 'admin').length;

  return (
    <div className="page">
      <div className="container">
        <div className="pg-header">
          <div>
            <h1 className="pg-title">Admin Dashboard 🛡️</h1>
            <p className="pg-sub">Manage users and oversee the WellCampus platform</p>
          </div>
          <button className="btn btn-outline" onClick={logout}>Logout</button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <div className="metrics-grid">
          <div className="met-card">
            <span className="met-icon">👥</span>
            <div>
              <div className="met-num">{users.length}</div>
              <div className="met-lbl">Total Users</div>
            </div>
          </div>
          <div className="met-card">
            <span className="met-icon">👤</span>
            <div>
              <div className="met-num">{students}</div>
              <div className="met-lbl">Students</div>
            </div>
          </div>
          <div className="met-card">
            <span className="met-icon">🛡️</span>
            <div>
              <div className="met-num">{admins}</div>
              <div className="met-lbl">Admins</div>
            </div>
          </div>
        </div>

        <section className="section">
          <h2 className="sec-title">Create New User</h2>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
            <button className="btn btn-primary" onClick={handleCreate} disabled={loading}>
              {loading ? 'Creating…' : 'Create User'}
            </button>
          </div>
        </section>

        <section className="section">
          <h2 className="sec-title">All Users</h2>
          <div className="table-wrap">
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
