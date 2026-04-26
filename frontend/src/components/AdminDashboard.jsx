import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function AdminDashboard({ isOpen, onClose, showToast }) {
  const [tab, setTab] = useState('users');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);

  const fetchData = async () => {
    try {
      const [st, usr, con] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users?limit=50'),
        api.get('/admin/contacts?limit=50')
      ]);
      setStats(st.data);
      setUsers(usr.data.users);
      setContacts(con.data.contacts);
    } catch (err) {
      showToast('Error fetching dashboard data', 'err');
    }
  };

  useEffect(() => {
    if (isOpen) fetchData();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogout = () => {
    localStorage.removeItem('mjs_access');
    window.location.reload();
  };

  const toggleUser = async (id, isActive) => {
    try {
      await api.patch(`/admin/users/${id}/status`);
      showToast(`User ${isActive ? 'deactivated' : 'activated'}`, 'ok');
      fetchData();
    } catch (e) { showToast('Error toggling user', 'err'); }
  };

  return (
    <div className="dash-ov open">
      <div className="dash">
        <div className="dash-header">
          <div>
            <div className="s-label">Admin Panel</div>
            <h1>MJ <span>Skyways</span> Dashboard</h1>
          </div>
          <div style={{display: 'flex', gap: '.8rem', flexWrap: 'wrap'}}>
            <button className="btn-portal" onClick={onClose}>← Back to Site</button>
            <button className="btn-portal" onClick={handleLogout}>Sign Out</button>
          </div>
        </div>
        
        {stats && (
          <div className="dash-stats">
            <div className="ds-card"><div className="ds-num">{stats.totalUsers}</div><div className="ds-label">Total Users</div></div>
            <div className="ds-card"><div className="ds-num">{stats.activeUsers}</div><div className="ds-label">Active Users</div></div>
            <div className="ds-card"><div className="ds-num">{stats.totalContacts}</div><div className="ds-label">Total Inquiries</div></div>
            <div className="ds-card"><div className="ds-num">{stats.newContacts}</div><div className="ds-label">New Inquiries</div></div>
          </div>
        )}
        
        <div className="dash-tabs">
          <button className={`dash-tab ${tab === 'users' ? 'active' : ''}`} onClick={() => setTab('users')}>Users</button>
          <button className={`dash-tab ${tab === 'contacts' ? 'active' : ''}`} onClick={() => setTab('contacts')}>Inquiries</button>
        </div>
        
        <div>
          {tab === 'users' && (
            users.length === 0 ? <div className="dash-empty">No users yet.</div> :
            <div style={{overflowX: 'auto'}}>
              <table className="dash-table">
                <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Company</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td><strong>{u.firstName} {u.lastName}</strong></td>
                      <td>{u.email}</td>
                      <td><span className={`badge ${u.role==='admin'?'badge-gold':'badge-slate'}`}>{u.role}</span></td>
                      <td>{u.company || '—'}</td>
                      <td><span className={`badge ${u.isActive?'badge-green':'badge-red'}`}>{u.isActive?'Active':'Inactive'}</span></td>
                      <td style={{fontSize: '.75rem'}}>{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td>
                        {u.role !== 'admin' ? 
                          <button className="btn-sm" onClick={() => toggleUser(u.id, u.isActive)}>{u.isActive ? 'Deactivate' : 'Activate'}</button>
                          : <span style={{fontSize:'.72rem', color:'var(--slate)'}}>Protected</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'contacts' && (
            contacts.length === 0 ? <div className="dash-empty">No inquiries yet.</div> :
            <div style={{overflowX: 'auto'}}>
              <table className="dash-table">
                <thead><tr><th>Name</th><th>Email</th><th>Service</th><th>Message</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>
                  {contacts.map(c => (
                    <tr key={c.id}>
                      <td><strong>{c.firstName} {c.lastName}</strong></td>
                      <td>{c.email}</td>
                      <td><span className="badge badge-gold">{c.service || 'General'}</span></td>
                      <td style={{maxWidth:'220px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{c.message}</td>
                      <td><span className={`badge ${c.status==='new'?'badge-green':c.status==='replied'?'badge-slate':'badge-red'}`}>{c.status}</span></td>
                      <td style={{fontSize: '.75rem'}}>{new Date(c.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
