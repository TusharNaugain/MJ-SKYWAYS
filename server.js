/**
 * MJ Skyways — Backend Server
 * Node.js + Express + Firestore + JWT Authentication
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin
let serviceAccount;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    serviceAccount = require('./serviceAccountKey.json');
  }
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('Firebase Admin initialized successfully.');
} catch (e) {
  console.error('Failed to initialize Firebase Admin:', e.message);
}

let db, usersCol, contactsCol, refreshTokensCol, otpVerificationsCol;
try {
  db = admin.firestore();
  // The Firebase project's database has the literal id "default" (not "(default)").
  // Pin the Admin SDK to it before any reads/writes.
  db.settings({ databaseId: process.env.FIRESTORE_DB_ID || 'default' });
  usersCol = db.collection('users');
  contactsCol = db.collection('contactSubmissions');
  refreshTokensCol = db.collection('refreshTokens');
  otpVerificationsCol = db.collection('otpVerifications');
} catch (e) {
  console.error('Failed to initialize Firestore collections:', e.message);
}

const app = express();
const PORT = process.env.PORT || 5002;
const JWT_SECRET = process.env.JWT_SECRET || 'mjs_kway_global_super_secret_key_2025';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'mjs_kway_refresh_secret_2025';

// In-memory OTP store
const otpStore = new Map();

// Tracks emails that recently passed OTP verification (used by sign-up flow).
const verifiedEmails = new Map();
const VERIFIED_TTL_MS = 15 * 60 * 1000;

// ─────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.static('public'));

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: { error: 'Too many attempts, please try again later.' } });
const contactLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 10, message: { error: 'Too many contact submissions.' } });
const generalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use('/api/', generalLimiter);
app.use('/api/auth/', authLimiter);

// ─────────────────────────────────────────
// FIRESTORE HELPERS
// ─────────────────────────────────────────
const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

const generateTokens = (user) => {
  const payload = { id: user.id, email: user.email, role: user.role };
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...safe } = user;
  return safe;
};

const findUserByEmail = async (email) => {
  const snap = await usersCol.where('email', '==', email.toLowerCase()).limit(1).get();
  if (snap.empty) return null;
  return snap.docs[0].data();
};

const findUserById = async (id) => {
  const doc = await usersCol.doc(id).get();
  return doc.exists ? doc.data() : null;
};

const updateUser = async (id, patch) => {
  const ref = usersCol.doc(id);
  await ref.update({ ...patch, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
  const doc = await ref.get();
  return doc.data();
};

const createUser = async (data) => {
  const id = data.id || generateId();
  const now = admin.firestore.FieldValue.serverTimestamp();
  const userDoc = {
    id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email.toLowerCase(),
    password: data.password,
    company: data.company || '',
    phone: data.phone || '',
    role: data.role || 'client',
    isActive: data.isActive !== undefined ? data.isActive : true,
    lastLogin: null,
    createdAt: now,
    updatedAt: now,
  };
  await usersCol.doc(id).set(userDoc);
  return userDoc;
};

// Seed admin user
(async () => {
  try {
    const existing = await findUserByEmail('admin@mjskyways.com');
    if (!existing) {
      const hashedPassword = await bcrypt.hash('Admin@123', 12);
      await createUser({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@mjskyways.com',
        password: hashedPassword,
        company: 'MJ Skyways',
        role: 'admin',
        isActive: true,
      });
      console.log('Admin user seeded into Firestore.');
    } else {
      console.log('Admin user already present in Firestore.');
    }
  } catch (e) {
    console.error('Error seeding admin user:', e.message);
  }
})();

// ─────────────────────────────────────────
// MIDDLEWARE — Auth Guard
// ─────────────────────────────────────────
const authGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') return res.status(401).json({ error: 'Token expired.' });
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

const adminGuard = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Access denied. Admins only.' });
  next();
};

// ─────────────────────────────────────────
// EMAIL TRANSPORTER
// ─────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error('SMTP Configuration Error:', error.message);
  } else {
    console.log('SMTP Server is ready to deliver messages');
  }
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    const fromAddress = process.env.SMTP_USER || 'info@mjskyways.com';
    await transporter.sendMail({
      from: `"MJ Skyways" <${fromAddress}>`,
      to,
      subject,
      html
    });
    return true;
  } catch (err) {
    console.error('Email error:', err.message);
    return false;
  }
};

// ─────────────────────────────────────────
// ROUTES — HEALTH
// ─────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), version: '2.0.0', store: 'firestore' });
});

// ─────────────────────────────────────────
// ROUTES — AUTH
// ─────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, company, phone } = req.body;

    if (!firstName || !lastName || !email || !password) return res.status(400).json({ error: 'All required fields must be provided.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email format.' });
    if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    if (!/(?=.*[A-Z])(?=.*\d)/.test(password)) return res.status(400).json({ error: 'Password must contain at least one uppercase letter and one number.' });

    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(409).json({ error: 'An account with this email already exists.' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await createUser({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password: hashedPassword,
      company: company?.trim() || '',
      phone: phone?.trim() || '',
      role: 'client',
      isActive: true,
    });

    const { accessToken, refreshToken } = generateTokens(newUser);
    await refreshTokensCol.doc(refreshToken).set({ token: refreshToken, userId: newUser.id, createdAt: admin.firestore.FieldValue.serverTimestamp() });

    sendEmail({
      to: newUser.email,
      subject: 'Welcome to MJ Skyways',
      html: `<h2>Welcome, ${firstName}!</h2><p>Your account has been created successfully. We're glad to have you in the MJ Skyways network.</p><p>Best regards,<br>The MJ Skyways Team</p>`,
    });

    res.status(201).json({ message: 'Account created successfully.', user: sanitizeUser(newUser), accessToken, refreshToken });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials.' });
    if (!user.isActive) return res.status(403).json({ error: 'Account has been deactivated. Contact support.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials.' });

    await updateUser(user.id, { lastLogin: admin.firestore.FieldValue.serverTimestamp() });

    const { accessToken, refreshToken } = generateTokens(user);
    await refreshTokensCol.doc(refreshToken).set({ token: refreshToken, userId: user.id, createdAt: admin.firestore.FieldValue.serverTimestamp() });

    res.json({ message: 'Login successful.', user: sanitizeUser(user), accessToken, refreshToken });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/auth/request-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required.' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    const key = email.toLowerCase();

    otpStore.set(key, { otp, expiresAt });

    // Log the OTP request to Firestore (one doc per email; updated on each request).
    try {
      await otpVerificationsCol.doc(key).set({
        email: key,
        status: 'requested',
        lastRequestedAt: admin.firestore.FieldValue.serverTimestamp(),
        requestCount: admin.firestore.FieldValue.increment(1),
      }, { merge: true });
    } catch (logErr) {
      console.warn('Failed to log OTP request to Firestore:', logErr.message);
    }

    const sent = await sendEmail({
      to: email,
      subject: 'Your MJ Skyways Verification Code',
      html: `
        <h2>Verification Code</h2>
        <p>Your one-time password (OTP) is: <strong style="font-size: 24px;">${otp}</strong></p>
        <p>This code will expire in 10 minutes.</p>
        <p>If you did not request this, please safely ignore this email.</p>
      `
    });

    if (!sent) {
      return res.status(500).json({ error: 'Failed to send OTP email. Please ensure SMTP is configured.' });
    }

    res.json({ message: 'OTP sent successfully.' });
  } catch (err) {
    console.error('Request OTP Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required.' });

    const key = email.toLowerCase();
    const record = otpStore.get(key);

    if (!record) return res.status(400).json({ error: 'No active OTP found for this email. Please request a new one.' });
    if (Date.now() > record.expiresAt) {
      otpStore.delete(key);
      return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }
    if (record.otp !== otp) return res.status(401).json({ error: 'Invalid OTP code.' });

    otpStore.delete(key);
    verifiedEmails.set(key, Date.now() + VERIFIED_TTL_MS);

    // Mark this email as verified in Firestore.
    try {
      await otpVerificationsCol.doc(key).set({
        email: key,
        status: 'verified',
        verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
    } catch (logErr) {
      console.warn('Failed to log OTP verification to Firestore:', logErr.message);
    }

    // Best-effort: issue Firebase custom token for legacy clients (optional).
    let customToken = null;
    try {
      let userRecord;
      try {
        userRecord = await admin.auth().getUserByEmail(key);
      } catch (firebaseErr) {
        userRecord = await admin.auth().createUser({ email: key, emailVerified: false });
      }
      customToken = await admin.auth().createCustomToken(userRecord.uid);
    } catch (firebaseFatal) {
      console.warn('Firebase custom-token issuance skipped:', firebaseFatal.message);
    }

    res.json({ message: 'Verification successful.', customToken });
  } catch (err) {
    console.error('Verify OTP Error:', err);
    res.status(500).json({ error: 'Internal server error while verifying OTP.' });
  }
});

// Complete sign-up after OTP verification: set a password and create the account.
app.post('/api/auth/signup-otp', async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, company, phone } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }
    if (password !== confirmPassword) return res.status(400).json({ error: 'Passwords do not match.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email format.' });
    if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    if (!/(?=.*[A-Z])(?=.*\d)/.test(password)) return res.status(400).json({ error: 'Password must contain at least one uppercase letter and one number.' });

    const key = email.toLowerCase().trim();
    const verifiedAt = verifiedEmails.get(key);
    if (!verifiedAt || Date.now() > verifiedAt) {
      verifiedEmails.delete(key);
      return res.status(403).json({ error: 'Email is not verified. Please request and verify an OTP first.' });
    }

    const existingUser = await findUserByEmail(key);
    if (existingUser) {
      verifiedEmails.delete(key);
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await createUser({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: key,
      password: hashedPassword,
      company: company?.trim() || '',
      phone: phone?.trim() || '',
      role: 'client',
      isActive: true,
    });

    verifiedEmails.delete(key);

    const { accessToken, refreshToken } = generateTokens(newUser);
    await refreshTokensCol.doc(refreshToken).set({ token: refreshToken, userId: newUser.id, createdAt: admin.firestore.FieldValue.serverTimestamp() });

    sendEmail({
      to: newUser.email,
      subject: 'Welcome to MJ Skyways',
      html: `<h2>Welcome, ${firstName}!</h2><p>Your account has been created successfully. We're glad to have you in the MJ Skyways network.</p><p>Best regards,<br>The MJ Skyways Team</p>`,
    });

    res.status(201).json({ message: 'Account created successfully.', user: sanitizeUser(newUser), accessToken, refreshToken });
  } catch (err) {
    console.error('Signup-OTP error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/auth/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ error: 'Refresh token required.' });

    const tokenDoc = await refreshTokensCol.doc(refreshToken).get();
    if (!tokenDoc.exists) return res.status(403).json({ error: 'Invalid refresh token.' });

    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user = await findUserById(decoded.id);
    if (!user) return res.status(403).json({ error: 'User not found.' });

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
    await refreshTokensCol.doc(refreshToken).delete();
    await refreshTokensCol.doc(newRefreshToken).set({ token: newRefreshToken, userId: user.id, createdAt: admin.firestore.FieldValue.serverTimestamp() });

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired refresh token.' });
  }
});

app.post('/api/auth/logout', authGuard, async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) await refreshTokensCol.doc(refreshToken).delete();
    res.json({ message: 'Logged out successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/auth/me', authGuard, async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json({ user: sanitizeUser(user) });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/auth/profile', authGuard, async (req, res) => {
  try {
    const { firstName, lastName, company, phone } = req.body;
    const patch = {};
    if (firstName) patch.firstName = firstName.trim();
    if (lastName) patch.lastName = lastName.trim();
    if (company !== undefined) patch.company = company.trim();
    if (phone !== undefined) patch.phone = phone.trim();

    const updated = await updateUser(req.user.id, patch);
    res.json({ message: 'Profile updated.', user: sanitizeUser(updated) });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.put('/api/auth/change-password', authGuard, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await findUserById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Current password is incorrect.' });
    if (newPassword.length < 8) return res.status(400).json({ error: 'New password must be at least 8 characters.' });

    const hashed = await bcrypt.hash(newPassword, 12);
    await updateUser(user.id, { password: hashed });
    res.json({ message: 'Password changed successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ─────────────────────────────────────────
// ROUTES — CONTACT
// ─────────────────────────────────────────
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, service, message } = req.body;
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'Required fields missing.' });
    }

    const id = generateId();
    await contactsCol.doc(id).set({
      id,
      firstName, lastName, email,
      phone: phone || '',
      service: service || 'General Inquiry',
      message,
      status: 'new',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    sendEmail({
      to: process.env.SMTP_USER || 'info@mjskyways.com',
      subject: `New Inquiry: ${service || 'General'} — ${firstName} ${lastName}`,
      html: `<h3>New Contact Form Submission</h3><p><b>Name:</b> ${firstName} ${lastName}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone || 'N/A'}</p><p><b>Service:</b> ${service || 'General'}</p><p><b>Message:</b><br>${message}</p>`,
    });

    sendEmail({
      to: email,
      subject: 'Thank you for contacting MJ Skyways',
      html: `<p>Dear ${firstName},</p><p>Thank you for reaching out. We have received your inquiry regarding <b>${service}</b>. We will get back to you within 24 business hours.</p>`,
    });

    res.status(201).json({ message: 'Your message has been sent.', id });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ─────────────────────────────────────────
// ROUTES — ADMIN
// ─────────────────────────────────────────
app.get('/api/admin/users', authGuard, adminGuard, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const snap = await usersCol.get();
    const allUsers = snap.docs.map(d => d.data());
    const total = allUsers.length;
    const start = (page - 1) * limit;
    const users = allUsers.slice(start, start + limit).map(sanitizeUser);
    res.json({ users, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('Admin users error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/admin/contacts', authGuard, adminGuard, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const snap = await contactsCol.orderBy('createdAt', 'desc').get();
    const all = snap.docs.map(d => d.data());
    const total = all.length;
    const start = (page - 1) * limit;
    const contacts = all.slice(start, start + limit);
    res.json({ contacts, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('Admin contacts error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.patch('/api/admin/users/:id/status', authGuard, adminGuard, async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    const updated = await updateUser(user.id, { isActive: !user.isActive });
    res.json({ message: `User ${updated.isActive ? 'activated' : 'deactivated'}.`, user: sanitizeUser(updated) });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/admin/stats', authGuard, adminGuard, async (req, res) => {
  try {
    const usersSnap = await usersCol.get();
    const totalUsers = usersSnap.size;
    const activeUsers = usersSnap.docs.filter(d => d.data().isActive).length;
    const contactsSnap = await contactsCol.get();
    const totalContacts = contactsSnap.size;
    const newContacts = contactsSnap.docs.filter(d => d.data().status === 'new').length;

    res.json({
      totalUsers, activeUsers, totalContacts, newContacts,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─────────────────────────────────────────
// ERROR & START
// ─────────────────────────────────────────
app.use((req, res) => res.status(404).json({ error: 'Route not found.' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong.' });
});

app.listen(PORT, () => {
  console.log(`\nMJ Skyways Server running on port ${PORT}`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
  console.log(`Admin login: admin@mjskyways.com / Admin@123\n`);
});

module.exports = app;
