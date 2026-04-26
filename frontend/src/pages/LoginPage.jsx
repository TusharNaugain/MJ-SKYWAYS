import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function LoginPage() {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [step, setStep] = useState(1);        // sign-up sub-step: 1 email -> 2 OTP -> 3 password

  // Shared
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sign-up only
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const getErrorMessage = (err, defaultMsg) => {
    const dataErr = err.response?.data?.error;
    if (typeof dataErr === 'string') return dataErr;
    if (dataErr && typeof dataErr === 'object') return dataErr.message || dataErr.code || defaultMsg;
    return err.message || defaultMsg;
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)', color: '#fff',
    padding: '0.9rem 1.1rem', borderRadius: '8px', outline: 'none',
    transition: 'border 0.3s'
  };
  const labelStyle = {
    display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem',
    marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em'
  };

  const resetState = () => {
    setStep(1);
    setError(''); setMessage('');
    setOtp(''); setPassword(''); setConfirmPassword('');
    setFirstName(''); setLastName('');
  };

  const switchMode = (m) => {
    setMode(m);
    resetState();
  };

  // ─── SIGN IN ────────────────────────────────
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('mjs_access', res.data.accessToken);
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    } catch (err) {
      setError(getErrorMessage(err, 'Invalid email or password.'));
    } finally {
      setLoading(false);
    }
  };

  // ─── SIGN UP — STEP 1: request OTP ──────────
  const handleRequestSignupOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setMessage('');
    try {
      await api.post('/auth/request-otp', { email });
      setMessage('A 6-digit verification code has been sent to your email.');
      setStep(2);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to send OTP.'));
    } finally {
      setLoading(false);
    }
  };

  // ─── SIGN UP — STEP 2: verify OTP ───────────
  const handleVerifySignupOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setMessage('');
    try {
      await api.post('/auth/verify-otp', { email, otp });
      setMessage('Email verified. Set a password to finish creating your account.');
      setStep(3);
    } catch (err) {
      setError(getErrorMessage(err, 'Invalid OTP.'));
    } finally {
      setLoading(false);
    }
  };

  // ─── SIGN UP — STEP 3: set password & create account ──
  const handleCompleteSignup = async (e) => {
    e.preventDefault();
    setError(''); setMessage('');

    if (!firstName.trim() || !lastName.trim()) {
      setError('First and last name are required.');
      return;
    }
    if (password.length < 8 || !/(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setError('Password must be 8+ characters with one uppercase letter and one number.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/signup-otp', {
        firstName, lastName, email, password, confirmPassword
      });
      localStorage.setItem('mjs_access', res.data.accessToken);
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to create account.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050a18', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'url(/images/why-us/feat_tech_1774798067613.png) center/cover no-repeat', opacity: 0.2, filter: 'grayscale(0.5)' }}></div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, #050a18)' }}></div>

      <div className="rv" style={{ position: 'relative', zIndex: 10, background: 'rgba(11, 22, 44, 0.7)', backdropFilter: 'blur(30px)', padding: '3rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', width: '100%', maxWidth: '460px', boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.8)' }}>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ width: '120px', height: '80px', backgroundColor: '#fff', borderRadius: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 10px 20px rgba(0,0,0,0.3)', overflow: 'hidden' }}>
             <img src="/images/logo.jpeg" alt="MJ Skyways" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h2 style={{ color: '#fff', fontFamily: 'var(--ff-display)', fontSize: '2rem', fontWeight: 300, letterSpacing: '-0.02em' }}>
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h2>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <button
              onClick={() => switchMode('signin')}
              style={{ flex: 1, padding: '0.6rem', borderRadius: '6px', border: 'none', background: mode === 'signin' ? 'rgba(255,255,255,0.1)' : 'transparent', color: mode === 'signin' ? '#fff' : 'var(--slate)', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.3s' }}>
              Sign In
            </button>
            <button
              onClick={() => switchMode('signup')}
              style={{ flex: 1, padding: '0.6rem', borderRadius: '6px', border: 'none', background: mode === 'signup' ? 'rgba(255,255,255,0.1)' : 'transparent', color: mode === 'signup' ? '#fff' : 'var(--slate)', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.3s' }}>
              Sign Up
            </button>
          </div>
        </div>

        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '0.8rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</div>}
        {message && <div style={{ background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.2)', color: '#34d399', padding: '0.8rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center' }}>{message}</div>}

        {/* ─── SIGN IN ────────────────────────────── */}
        {mode === 'signin' && (
          <form onSubmit={handleSignIn}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} placeholder="name@company.com" />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <label style={labelStyle}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading} className="btn-p" style={{ width: '100%', justifyContent: 'center', height: '50px', fontSize: '1rem' }}>
              {loading ? 'Authenticating…' : 'Sign In'}
            </button>
          </form>
        )}

        {/* ─── SIGN UP - STEP 1: email -> request OTP ── */}
        {mode === 'signup' && step === 1 && (
          <form onSubmit={handleRequestSignupOtp}>
            <p style={{ color: 'var(--slate)', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              Enter your email to receive a 6-digit verification code.
            </p>
            <div style={{ marginBottom: '2rem' }}>
              <label style={labelStyle}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} placeholder="name@company.com" />
            </div>
            <button type="submit" disabled={loading} className="btn-o" style={{ width: '100%', justifyContent: 'center', height: '50px', borderColor: 'var(--gold)' }}>
              {loading ? 'Sending…' : 'Send Verification Code'}
            </button>
          </form>
        )}

        {/* ─── SIGN UP - STEP 2: verify OTP ── */}
        {mode === 'signup' && step === 2 && (
          <form onSubmit={handleVerifySignupOtp}>
            <p style={{ color: 'var(--slate)', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              Enter the 6-digit code sent to <strong style={{ color: '#fff' }}>{email}</strong>.
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Verification Code</label>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required pattern="\d{6}" maxLength={6}
                style={{ ...inputStyle, letterSpacing: '0.6em', textAlign: 'center', fontSize: '1.4rem' }} placeholder="000000" />
            </div>
            <button type="submit" disabled={loading} className="btn-o" style={{ width: '100%', justifyContent: 'center', height: '50px', borderColor: 'var(--gold)' }}>
              {loading ? 'Verifying…' : 'Verify Code'}
            </button>
            <button type="button" onClick={() => { setStep(1); setOtp(''); setError(''); setMessage(''); }}
              style={{ width: '100%', marginTop: '0.8rem', background: 'transparent', border: 'none', color: 'var(--slate)', fontSize: '0.8rem', cursor: 'pointer' }}>
              ← Use a different email
            </button>
          </form>
        )}

        {/* ─── SIGN UP - STEP 3: name + password + confirm ── */}
        {mode === 'signup' && step === 3 && (
          <form onSubmit={handleCompleteSignup}>
            <p style={{ color: 'var(--slate)', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              Almost there! Set a password to finish creating your account.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <div>
                <label style={labelStyle}>First Name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required style={inputStyle} placeholder="John" />
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required style={inputStyle} placeholder="Doe" />
              </div>
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} placeholder="Min 8 chars, 1 uppercase, 1 number" />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <label style={labelStyle}>Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={inputStyle} placeholder="Re-enter password" />
            </div>
            <button type="submit" disabled={loading} className="btn-p" style={{ width: '100%', justifyContent: 'center', height: '50px', fontSize: '1rem' }}>
              {loading ? 'Creating Account…' : 'Create Account'}
            </button>
          </form>
        )}

        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--slate)', fontSize: '0.8rem' }}>
             By connecting, you agree to our <span style={{ color: '#fff', cursor: 'pointer' }}>Terms of Service</span> and <span style={{ color: '#fff', cursor: 'pointer' }}>Global Privacy Policy</span>.
          </p>
        </div>

      </div>
    </div>
  );
}
