'use client';
import React from 'react';
import './CustomerTestimonials.css';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import StatsCounter from './StatsCounter'; // ✅ import stats

const testimonials = [
  {
    img: '/testimonials/maria.jpg',
    name: 'Maria Johnson',
    role: 'Family Photographer',
    quote:
      "Incredible! My old family videos are now crystal clear in 4K. It feels like those memories come alive again. My children were speechless.",
  },
  {
    img: '/testimonials/john.jpg',
    name: 'John Baker',
    role: 'Video Producer',
    quote:
      'My 20-year-old wedding video now looks like it was filmed yesterday! The colors are so vivid and all noise is gone. Pure magic!',
  },
  {
    img: '/testimonials/linda.jpg',
    name: 'Linda Smith',
    role: 'Mother of 3',
    quote:
      "Old home movies of my children are now clear and stable. It's like having a time machine - beautiful memories in top quality!",
  },
];

// Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const CustomerTestimonials = () => {
  return (
    <div className="testimonial-wrapper">
      <div className="testimonails-main">
        <motion.h2
          className="testimonial-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          What our customers say
        </motion.h2>

        <motion.p
          className="testimonial-subtitle"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          Thousands of users brought their memories back to life
        </motion.p>

        {/* Animated testimonials */}
        <motion.div
          className="testimonial-cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((t, i) => (
            <motion.div key={i} className="testimonial-card" variants={itemVariants}>
              <div className="stars">
                {[...Array(5)].map((_, idx) => (
                  <FaStar key={idx} color="#FFD700" size={16} />
                ))}
              </div>
              <p className="quote">"{t.quote}"</p>
              <div className="user">
                <div className="avatar">
                  <img src={t.img} alt={t.name} className="avatar-img" />
                </div>
                <div>
                  <div className="username">{t.name}</div>
                  <div className="role">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ✅ Call stats component here */}
        <StatsCounter
  stats={[
    { target: 15000, suffix: '+', label: 'Videos Converted' },
    { start: 0.1, target: 4.9, decimals: 1, label: 'Average Rating', extra: '★' },
    { target: 99.8, decimals: 1, suffix: '%', label: 'Customer Satisfaction' },
  ]}
/>

      </div>
    </div>
  );
};

export default CustomerTestimonials;
