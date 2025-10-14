'use client';

import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import './contact.css';
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import HeroSection from '../home/page';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
const [captchaToken, setCaptchaToken] = useState("");
const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

  if (!captchaToken) {
  toast.error("Please complete the CAPTCHA.");
  setLoading(false);
  return;
}

try {
  const res = await fetch(`${baseUrl}/users/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...formData, captcha: captchaToken }), // send token
   });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Message sent successfully!');
             toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
        router.push('/contact-response');
      } else {
        setErrorMsg('Failed to send message. Please try again.');
             toast.error('Failed to send message. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Something went wrong.');
           toast.error('Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <div className="contact-container">
     
     
<HeroSection 
  subtitle="Get In Touch"
  title={[
    { text: "Let's talk about", className: "outline" },
    { text: "your video", className: "bold" },
    { text: "project", className: "gradient" },
  ]}
   description={`<span className='highlight'>Have questions</span> about video enhancement? Need help with a custom \n project? We're here to help.`}

  descColor="#ababba" 
/>  


  <div className="contact-sec-outer">
    <div className="contact-sec-wrapper">
      
      {/* Left: Contact Form */}
      <div className="contact-sec-form-box">
        <h2 className="contact-sec-heading">Send us <span className='highlight'>a message</span></h2>
        <form onSubmit={handleSubmit} className="contact-sec-form">
          <div className="contact-sec-input-row">
            <div className="contact-sec-input-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-sec-input-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="contact-sec-input-group">
            <label>Subject *</label>
            <input
              type="text"
              name="subject"
              placeholder="What's this about?"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact-sec-input-group">
            <label>Message *</label>
            <textarea
              name="message"
              placeholder="Tell us more about how we can help you…"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
<ReCAPTCHA
  sitekey="6Ld7y-QrAAAAADGeCJxFZDFYceApbGo8_zd7VEPu" // replace with real key
  onChange={(token) => setCaptchaToken(token)}
/>
          <button type="submit" className="contact-sec-send-btn" disabled={loading}>
            {loading ? <div className="spinner white"></div> : 'Send Message'}
          </button>
        </form>
      </div>

      {/* Right: Contact Info and Response Time */}
      <div className="contact-sec-info-wrapper">
       

        {/* Response Time */}
<div className="contact-card">
  <h2 className="contact-heading">Get in touch</h2>

  <div className="contact-item">
    <div className="contact-icon">📧</div>
    <div className="contact-info">
      <h3>Email</h3>
      <p className="contact-main">support@videomemories.eu</p>
      <p className="contact-sub">We'll respond within 24 hours</p>
    </div>
  </div>

  <div className="contact-item">
    <div className="contact-icon">⏰</div>
    <div className="contact-info">
      <h3>Response Time</h3>
      <p className="contact-main">24 hours or less</p>
      <p className="contact-sub">Monday - Friday, 9AM - 6PM CET</p>
    </div>
  </div>
</div>




      </div>
    </div>
  </div>

      






    </div>
  );
};

export default Contact;
