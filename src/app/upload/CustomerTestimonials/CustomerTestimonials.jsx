'use client';
import React, { useEffect, useRef, useState } from 'react';
import './CustomerTestimonials.css';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import StatsCounter from './StatsCounter';
import { baseUrl } from '@/const';

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
  const [animate, setAnimate] = useState(false);
  const statsRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [cards, setCards] = useState([]);
  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${baseUrl}/reviews/all`);
        const data = await res.json();
        if (data.success && Array.isArray(data.reviews)) {
          setCards(data.reviews.filter((r) => r.featured === true));
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Intersection Observer for stats animation (same as your reference)
  useEffect(() => {
    let triggerCount = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (triggerCount < 2) {
            setAnimate(false);
            setTimeout(() => setAnimate(true), 50);
            triggerCount++;
          }
        }
      },
      { threshold: 0.3 }
    );

    const current = statsRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="testimonial-wrapper">
      <div className="testimonails-main">

        {/* Title */}
        <motion.h2
          className="testimonial-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          What our <span className="highlight">customers say</span>
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

        {/* Testimonials */}
        {isClient && (
          <motion.div
            className="testimonial-cards"
            variants={containerVariants}
            initial="hidden"
            animate={animate ? 'show' : 'hidden'}
            viewport={{ once: true, amount: 0.2 }}
          >
            {cards.map((t, i) => (
              <motion.div key={t._id || i} className="testimonial-card" variants={itemVariants}>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      color={star <= t.rating ? '#FFD700' : '#ccc'}
                      size={16}
                    />
                  ))}
                </div>

                <p className="quote">"{t.reviewText}"</p>

                <div className="user">
                  <div className="avatar">
                    <img
                      src={t.photoUrl || '/testimonials/default.jpg'}
                      alt={t.userName}
                      className="avatar-img"
                      onError={(e) => (e.target.src = '/testimonials/default.jpg')}
                    />
                  </div>
                  <div>
                    <div className="username">{t.userName}</div>
                    <div className="role">{t.roleOrProfession}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Stats */}
        <div ref={statsRef}>
          {animate && (
            <StatsCounter
              stats={[
                { target: 15000, suffix: '+', label: 'Videos Converted' },
                { start: 0.1, target: 4.9, decimals: 1, label: 'Average Rating', extra: '★' },
                { target: 99.8, decimals: 1, suffix: '%', label: 'Customer Satisfaction' },
              ]}
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default CustomerTestimonials;
