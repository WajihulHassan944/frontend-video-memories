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
  descColor
}) => {

  // ✅ Helper: Render text or highlight spans safely
  const parseTextWithHighlight = (text) => {
    const lines = text.replace(/\\n/g, "\n").split("\n");

    return lines.map((line, i) => {
      const parts = [];
      const regex = /<span[^>]*class(Name)?=['"]highlight['"][^>]*>(.*?)<\/span>/gi;
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.slice(lastIndex, match.index));
        }
        parts.push(<span key={`${i}-h-${match.index}`} className="highlight">{match[2]}</span>);
        lastIndex = regex.lastIndex;
      }

      if (lastIndex < line.length) {
        parts.push(line.slice(lastIndex));
      }

      return (
        <React.Fragment key={i}>
          {parts.length ? parts : line}
          {i < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  // ✅ Helper: smart subtitle renderer
  const renderSubtitle = (sub) => {
    // Detect if it includes a span tag — only then parse
    if (typeof sub === 'string' && sub.includes('<span')) {
      const match = /<span[^>]*class(Name)?=['"]highlight['"][^>]*>(.*?)<\/span>/i.exec(sub);
      if (match) {
        const before = sub.slice(0, match.index);
        const after = sub.slice(match.index + match[0].length);
        return (
          <>
            {before}
            <span className="highlight">{match[2]}</span>
            {after}
          </>
        );
      }
    }
    // Otherwise render as plain text
    return sub;
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        {/* ✅ Subtitle */}
        {subtitle && (
          <p className="hero-subtitle">
            {renderSubtitle(subtitle)}
          </p>
        )}

        {/* Title */}
        <h1 className="hero-title">
          {title.map((part, index) => (
            <span key={index} className={part.className || ""}>
              {part.text}
              {index < title.length - 1 && <br />}
            </span>
          ))}
        </h1>

        {/* ✅ Description */}
        {description && (
          <p
            className="hero-description"
            style={{ color: descColor || "white" }}
          >
            {parseTextWithHighlight(description)}
          </p>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
