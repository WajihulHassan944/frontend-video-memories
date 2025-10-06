// EnhancementDemo.jsx
import React from 'react';
import './EnhancementDemo.css';

export default function EnhancementDemo() {
  return (
    <section className="example-section">
      <div className="example-inner">
        <h2 className="hero-title">See the difference in action</h2>
        <p className="hero-sub">Old family videos transformed from poor to perfect quality</p>

        <div className="device-frame">
          <div className="device-inner">
            {/* video path provided by user */}
            <video
              className="demo-video"
              src="/assets/enhancement-demo.mp4"
              poster="/assets/poster-enhancement.jpg"
              controls
              preload="metadata"
            />
          </div>
       
        <div className="comparison-row">
          <div className="comparison-card before-card">
            <h3>Before</h3>
            <ul>
              <li>480p resolution</li>
              <li>Noise and grain</li>
              <li>Blurry images</li>
              <li>Faded colors</li>
            </ul>
          </div>

          <div className="comparison-card after-card">
            <h3>After</h3>
            <ul>
              <li>4K UHD resolution</li>
              <li>Completely noise-free</li>
              <li>Crystal clear details</li>
              <li>Vibrant colors</li>
            </ul>
          </div>
        </div>
         </div>

      </div>
    </section>
  );
}
