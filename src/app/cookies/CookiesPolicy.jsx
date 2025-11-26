'use client';

import React from 'react';
import './cookies.css';

export default function CookiesPolicy({ section = [] }) {
 
  const decodeHtml = (str) =>
  str
    ?.replace(/\\u003C/g, '<')
    .replace(/\\u003E/g, '>')
    .replace(/className=['"]([^'"]+)['"]/g, 'class="$1"')
    .replace(/&quot;/g, '"')
    // Bold → white
    .replace(/\*\*(.*?)\*\*/g, '<strong class="white-text">$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Restore line breaks
    .replace(/\n/g, '<br/>');

  return (
    <div className="cookies-container">
      {/* Logo */}
      <center>
        <div className="image-div-1">
          <img src="/logo.png" alt="Xclusive 3D Logo" className="cookies-logo" />
        </div>
      </center>

      <div className="cookies-content">
        {section.length > 0 ? (
          section.map((item, idx) => (
            <div key={item._id || idx} className="cookies-item">
              {/* First section title as <h1> */}
              {idx === 0 ? (
                <h1
                  className="cookies-title"
                  dangerouslySetInnerHTML={{ __html: decodeHtml(item.title || '') }}
                />
              ) : (
                <h3
                  dangerouslySetInnerHTML={{ __html: decodeHtml(item.title || '') }}
                />
              )}

              {/* Description */}
              {item.description && (
                <p
                  className="cookies-description"
                  dangerouslySetInnerHTML={{ __html: decodeHtml(item.description) }}
                />
              )}

              {/* Sub-description */}
              {item.subDescription && (
                <p
                  className="cookies-subdescription"
                  dangerouslySetInnerHTML={{ __html: decodeHtml(item.subDescription) }}
                />
              )}

              {/* FAQs */}
              {item.faqs?.length > 0 && (
                <ul className="faq-list">
                  {item.faqs.map((faq, i) => (
                    <li key={i}>
                      <strong>{faq.q}</strong>
                      <p>{faq.a}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p>No cookie policy sections found.</p>
        )}
      </div>
    </div>
  );
}
