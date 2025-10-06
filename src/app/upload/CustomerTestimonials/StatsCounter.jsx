'use client';
import React, { useState, useEffect, useRef } from 'react';
import './CustomerTestimonials.css';

// Reusable Counter component
const Counter = ({ start = 0, target, suffix = '', duration = 2000, decimals = 0 }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const startTime = performance.now();
    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = start + (target - start) * progress;
      setCount(Number(value.toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration, decimals]);

  return (
    <span>
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
};

// ✅ Dynamic StatsCounter
const StatsCounter = ({
  stats = [],
  containerColor = '#0003',       // default background
  labelColor = '#fff',            // default label color
  valueColor = '#d1d5db',         // default value color
  border = '1px solid #ffffff1a', // default border
  marginTop = '20px',             // default margin-top
  valueFontSize = '24px',         // default value font-size
  labelFontSize = '14px',         // default label font-size
  marginBottom = "auto"
}) => {
  const [animate, setAnimate] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="stats-bar"
      ref={statsRef}
      style={{
        background: containerColor,
        border,
        marginTop,
        marginBottom
      }}
    >
      {stats.map((stat, i) => (
        <div key={i} className="stat">
          <div
            className="value"
            style={{ color: valueColor, fontSize: valueFontSize }}
          >
            {animate && (
              <Counter
                start={stat.start ?? 0}
                target={stat.target}
                suffix={stat.suffix || ''}
                duration={stat.duration || 2000}
                decimals={stat.decimals || 0}
              />
            )}
            {stat.extra && <span>{stat.extra}</span>}
          </div>
          <div
            className="label"
            style={{ color: labelColor, fontSize: labelFontSize }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCounter;
