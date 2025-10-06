'use client';
import React from 'react';
import './CtaSection.css';
import { ArrowRight, Zap } from 'lucide-react';

const CtaSection = () => {
  return (
    <div className="cta-container">
      <div className="cta-content">
        {/* Icon + Heading */}
        <h2 className="cta-heading">
          <Zap className="cta-icon" />
          Ready to Transform Your Videos?
        </h2>

        {/* Subheading */}
       <center> <p className="cta-subheading">
          Join thousands of satisfied customers who have already restored their precious memories.
          Your videos deserve the same amazing transformation.
        </p></center>

        {/* Button */}
       <center> <button className="cta-button">
          <span>Start Your Enhancement</span>
          <ArrowRight className="cta-btn-icon" />
        </button></center>


        {/* Disclaimer */}
        <p className="cta-note">
          🎁 Get 1 free video enhancement after registration • Newsletter sign up required
        </p>
      </div>
    </div>
  );
};

export default CtaSection;
