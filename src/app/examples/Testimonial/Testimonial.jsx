'use client';
import React from 'react';
import './Testimonial.css';
import { Star } from 'lucide-react';

const Testimonial = () => {
  return (
    <div className="testimonial-wrapper">
      <div className="testimonial-card-example">
        {/* Left Side - Text */}
        <div className="testimonial-left">
          <h3 className="testimonial-title">Family Wedding Restoration</h3>
          <p className="testimonial-quote">
            "I couldn't believe my eyes! My parents' wedding video looked better than when it was
            originally filmed. The AI brought back details I never knew existed."
          </p>

          <div className="testimonial-profile">
            <img
              src="/testimonials/sarah.jpg"
              alt="Sarah Morrison"
              className="testimonial-avatar"
            />
            <div>
              <p className="testimonial-name">Sarah Morrison</p>
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-icon" fill="#FFD700" stroke="#FFD700" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Video */}
        <div className="testimonial-video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/76MVs_AkjTY"
            title="Family Wedding Restoration"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
