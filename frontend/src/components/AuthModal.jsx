import { useState } from 'react';
import api from '../utils/api';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, showToast }) {
  const [tab, setTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', company: '', phone: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    if (!formData.email || !formData.password) { showToast('Email and password required.', 'err'); return; }
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email: formData.email, password: formData.password });
      localStorage.setItem('mjs_access', res.data.accessToken);
      onLoginSuccess(res.data.user);
      showToast(`Welcome back, ${res.data.user.firstName}! 👋`, 'ok');
      onClose();
    } catch (err) {
      showToast(err.response?.data?.error || 'Invalid credentials.', 'err');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', formData);
      localStorage.setItem('mjs_access', res.data.accessToken);
      onLoginSuccess(res.data.user);
      showToast(`Account created! Welcome, ${res.data.user.firstName}! 🎉`, 'ok');
      onClose();
    } catch (err) {
      showToast(err.response?.data?.error || 'Registration failed.', 'err');
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e, action) => { if(e.key === 'Enter') action(); };

  return (
    <div className="modal-ov open" onClick={(e) => { if(e.target.className.includes('modal-ov')) onClose(); }}>
      <div className="modal">
        <button className="modal-x" onClick={onClose}>✕</button>
        <h2>{tab === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
        <p style={{color: 'var(--slate)', fontSize: '.85rem', marginBottom: '1.8rem'}}>
          {tab === 'login' ? 'Sign in to your M Jayalakshmi Skyway account' : 'Join the M Jayalakshmi Skyway network'}
        </p>
        
        <div className="m-tabs">
          <button className={`m-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Sign In</button>
          <button className={`m-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => setTab('register')}>Register</button>
        </div>

        {tab === 'login' ? (
          <div className="auth-form">
            <div className="fg"><label>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" /></div>
            <div className="fg"><label>Password</label><input type="password" name="password" value={formData.password} onChange={handleChange} onKeyDown={(e)=>onKeyDown(e, handleLogin)} placeholder="••••••••" /></div>
            <button className="btn-p btn-full" onClick={handleLogin} disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</button>
            <div className="auth-div">— or browse as guest —</div>
            <button className="btn-o btn-full" onClick={onClose}>Continue Browsing</button>
          </div>
        ) : (
          <div className="auth-form">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.8rem'}}>
              <div className="fg"><label>First Name</label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" /></div>
              <div className="fg"><label>Last Name</label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" /></div>
            </div>
            <div className="fg"><label>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" /></div>
            <div className="fg"><label>Password</label><input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Min 8 chars, 1 uppercase, 1 number" /></div>
            <div className="fg"><label>Company</label><input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Your Company Name" /></div>
            <div className="fg"><label>Phone</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} onKeyDown={(e)=>onKeyDown(e, handleRegister)} placeholder="+91 00000 00000" /></div>
            <button className="btn-p btn-full" onClick={handleRegister} disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
          </div>
        )}
      </div>
    </div>
  );
}
