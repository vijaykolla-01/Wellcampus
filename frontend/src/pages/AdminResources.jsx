import { useState, useEffect } from 'react';

export default function AdminResources() {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState('');
  const [cat,   setCat]   = useState('MENTAL_HEALTH');
  const [desc,  setDesc]  = useState('');
  const [icon,  setIcon]  = useState('📄');
  const [msg,   setMsg]   = useState('');

  const fetchResources = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${baseUrl}/api/resources`);
      const data = await res.json();
      setResources(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const addResource = async () => {
    if (!title.trim()) { setMsg('❌ Please enter a title.'); return }
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${baseUrl}/api/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, desc, cat, icon })
      });
      if (!res.ok) throw new Error('Failed to add resource');
      setTitle(''); setDesc(''); setIcon('📄');
      setMsg('✅ Resource added successfully!');
      fetchResources();
    } catch(err) {
      setMsg('❌ Error adding resource');
    }
    setTimeout(() => setMsg(''), 3000);
  }

  const deleteResource = async (id) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${baseUrl}/api/resources/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete resource');
      setMsg('🗑️ Resource deleted.');
      fetchResources();
    } catch(err) {
      setMsg('❌ Error deleting resource');
    }
    setTimeout(() => setMsg(''), 3000);
  }

  return (
    <div className="page">
      <div className="container">
        <div className="pg-header-simple">
          <div className="ph-icon bg-nutrition" style={{ background: 'linear-gradient(135deg,#1a2e3b,#2a9d8f)', fontSize:'2rem' }}>🛡️</div>
          <div>
            <h1 className="pg-title" style={{ fontSize: '1.9rem' }}>Manage Resources</h1>
            <p className="pg-sub">Add or remove wellness resources available to students</p>
          </div>
        </div>

        {msg && <div className={`alert ${msg.startsWith('❌') ? 'alert-error' : 'alert-success'}`}><span>{msg.charAt(0)}</span>{msg.slice(2)}</div>}

        {/* Add Form */}
        <div className="panel" style={{ marginBottom: '2rem' }}>
          <p className="panel-title">➕ Add New Resource</p>
          <div className="add-form-row">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Title *</label>
              <input className="form-input form-input-plain" placeholder="Resource title"
                value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Category *</label>
              <select className="form-input form-input-plain form-select" value={cat} onChange={e => setCat(e.target.value)}>
                <option value="MENTAL_HEALTH">🧠 Mental Health</option>
                <option value="FITNESS">💪 Fitness</option>
                <option value="NUTRITION">🥗 Nutrition</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Icon</label>
              <input className="form-input form-input-plain" placeholder="📖" maxLength={2}
                value={icon} onChange={e => setIcon(e.target.value)} style={{ textAlign: 'center' }} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-input form-textarea" placeholder="Brief description..."
              value={desc} onChange={e => setDesc(e.target.value)} rows={3} />
          </div>
          <button className="btn btn-primary" onClick={addResource}>Add Resource →</button>
        </div>

        {/* Table */}
        <div className="panel">
          <div className="panel-hdr">
            <p className="panel-title" style={{ marginBottom: 0 }}>📋 All Resources ({resources.length})</p>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="res-table">
              <thead>
                <tr><th>#</th><th>Icon</th><th>Title</th><th>Category</th><th>Description</th><th>Views</th><th>Action</th></tr>
              </thead>
              <tbody>
                {resources.map((r, i) => (
                  <tr key={r.id}>
                    <td>{i + 1}</td>
                    <td>{r.icon}</td>
                    <td><strong>{r.title}</strong></td>
                    <td><span className={`cat-badge ${r.cat === 'MENTAL_HEALTH' ? 'cb-mental' : r.cat === 'FITNESS' ? 'cb-fitness' : 'cb-nutrition'}`}>{r.cat.replace('_', ' ')}</span></td>
                    <td style={{ maxWidth: 200, fontSize: '.8rem', color: 'var(--g400)' }}>{r.desc?.slice(0, 60)}{r.desc?.length > 60 ? '...' : ''}</td>
                    <td>{r.views}</td>
                    <td><button className="btn btn-sm btn-danger" onClick={() => deleteResource(r.id)}>🗑️ Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
