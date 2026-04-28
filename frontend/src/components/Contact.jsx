import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import api from '../utils/api';

export default function Contact({ showToast }) {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', service: '', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [resMsg, setResMsg] = useState(null);
  const [resType, setResType] = useState('ok');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setResType('err');
      setResMsg('Please fill in all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setResType('err');
      setResMsg('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setResMsg(null);
    try {
      await addDoc(collection(db, 'contactSubmissions'), {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        service: formData.service || 'General Inquiry',
        message: formData.message.trim(),
        status: 'new',
        createdAt: serverTimestamp(),
      });

      try {
        await api.post('/contact', formData);
      } catch (apiErr) {
        console.warn('Backend email dispatch failed (Firestore record saved):', apiErr?.message);
      }

      setResType('ok');
      setResMsg(`✓ Message received! We'll get back to you at ${formData.email} within 24 hours.`);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', service: '', message: '' });
      showToast('Message sent successfully! ✉️', 'ok');
    } catch (err) {
      console.error('Contact submit error:', err);
      setResType('err');
      setResMsg('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <p className="s-label rv">Get in Touch</p>
        <h2 className="s-title rv">Contact <strong>Us</strong></h2>
        <div className="divider rv"></div>
        <div className="contact-g">
          <div className="contact-info">
            <div className="ci rv"><div className="ci-icon">📧</div><div><h4>Email</h4><p>info@mjskyways.com</p></div></div>
            <div className="ci rv"><div className="ci-icon">📞</div><div><h4>Phone</h4><p><a href="tel:+919289080349" style={{color: 'inherit', textDecoration: 'none'}}>+91 92890 80349</a></p></div></div>
            <div className="ci rv"><div className="ci-icon">🏢</div><div><h4>Headquarters</h4><p>India — Serving Global Markets<br/>Available 24/7 for international clients</p></div></div>
            <div className="ci rv"><div className="ci-icon">🕐</div><div><h4>Business Hours</h4><p>Mon – Sat: 9:00 AM – 7:00 PM IST<br/>Emergency line available 24/7</p></div></div>
          </div>
          <div className="cf rv">
            <h3>Send a Message</h3>
            <div className="f-row">
              <div className="fg"><label>First Name *</label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" /></div>
              <div className="fg"><label>Last Name *</label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" /></div>
            </div>
            <div className="fg"><label>Email Address *</label><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" /></div>
            <div className="fg"><label>Phone Number</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 00000 00000" /></div>
            <div className="fg">
              <label>Service of Interest</label>
              <select name="service" value={formData.service} onChange={handleChange}>
                <option value="">Select a service…</option>
                <option>Logistics</option><option>Aviation Support</option>
                <option>Hospitality</option><option>PSU Services</option>
                <option>International Trade</option><option>General Inquiry</option>
              </select>
            </div>
            <div className="fg"><label>Message *</label><textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your requirements…"></textarea></div>
            <button className="btn-submit" onClick={handleSubmit} disabled={loading}>{loading ? 'Sending…' : 'Send Message'}</button>
            {resMsg && <div className={`f-msg ${resType}`}>{resMsg}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
