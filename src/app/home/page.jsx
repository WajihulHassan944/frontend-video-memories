'use client';

import React from 'react';
import './home.css';

const HeroSection = ({
  subtitle = "AI-POWERED VIDEO ENHANCEMENT",
  title = [
    { text: "Transform your", className: "outline" },
    { text: "old videos into", className: "bold" },
    { text: "stunning memories", className: "gradient" },
  ],
  description = "Professional-grade AI enhancement that brings your precious \n moments back to life with crystal-clear quality and vibrant colors.",
  descColor // optional prop
}) => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        {/* Subtitle */}
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}

        {/* Title */}
        <h1 className="hero-title">
          {title.map((part, index) => (
            <span key={index} className={part.className || ""}>
              {part.text}
              {index < title.length - 1 && <br />}
            </span>
          ))}
        </h1>

        {/* Description */}
       {description && (
  <p 
    className="hero-description" 
    style={{ color: descColor || "white" }}
  >
    {description.replace(/\\n/g, "\n").split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < description.replace(/\\n/g, "\n").split("\n").length - 1 && <br />}
      </React.Fragment>
    ))}
  </p>
)}
      </div>
    </section>
  );
};

export default HeroSection;
