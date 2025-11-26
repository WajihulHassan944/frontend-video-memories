'use client';

import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import './contact.css';
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import HeroSection from '../home/page';
import { parseDynamicTitle } from '@/utils/parseTitle';
const Contact = ({ page }) => {
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
const hero = page?.sections?.find(s => s.sectionId === "hero");
const contactSection = page?.sections?.find(s => s.sectionId === "section-1");
const parsedHeroTitle = parseDynamicTitle(hero?.description);

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
  subtitle={hero?.title}
  title={parsedHeroTitle}
  description={hero?.subDescription}
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
  <h2 className="contact-heading">{contactSection?.title}</h2>

  {contactSection?.cards?.map((c) => (
    <div className="contact-item" key={c._id}>
      <div className="contact-icon">
        {c.title === "Email" ? "📧" : "⏰"}
      </div>

      <div className="contact-info">
        <h3>{c.title}</h3>
        <p className="contact-main">{c.description}</p>
        <p className="contact-sub">{c.subDescription}</p>
      </div>
    </div>
  ))}
</div>





      </div>
    </div>
  </div>

      






    </div>
  );
};

export default Contact;
