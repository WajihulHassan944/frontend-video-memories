"use client";

import { Play, Star } from "lucide-react";
import "./CustomerTransformations.css";

export default function CustomerTransformations() {
  const cards = [
    {
      tag: "Family Memories",
      title: "Family Wedding Restoration",
      description: "1987 wedding video enhanced from VHS to 4K",
      before: ["480p", "Heavy noise", "Faded colors"],
      after: ["4K UHD", "Crystal clear", "Vibrant colors"],
      rating: 5,
      package: "Full Enhancement Package",
      highlighted: true,
    },
    {
      tag: "Home Movies",
      title: "Childhood Home Movies",
      description: "1990s family vacation memories transformed",
      before: ["720p", "Grainy", "Shaky footage"],
      after: ["1080p", "Noise-free", "Stabilized"],
      rating: 5,
      package: "Denoising + Color Enhancement",
    },
    {
      tag: "Events",
      title: "Concert Performance",
      description: "Low-light concert footage enhanced dramatically",
      before: ["1080p", "Dark", "Poor quality"],
      after: ["4K", "Bright details", "Professional look"],
      rating: 4.8,
      package: "Face Enhancement + HDR",
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="star filled" size={16} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="star half" size={16} />);
      } else {
        stars.push(<Star key={i} className="star empty" size={16} />);
      }
    }
    return stars;
  };

  return (
    <section className="transformations-section">
      <h2 className="section-title">Real Customer Transformations</h2>
      <p className="section-subtitle">
        Every video tells a story. See how we help preserve and enhance precious memories.
      </p>

      <div className="cards-wrapper">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`card ${card.highlighted ? "highlighted" : ""}`}
          >
            <div className="video-placeholder">
              <span className="tag">{card.tag}</span>
              <Play size={64} strokeWidth={1.5} className="play-icon" />
            </div>

            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>

            <div className="before-after">
              <div className="space-between">
                <span className="label">BEFORE:</span>{" "}
                <div>
                {card.before.map((b, i) => (
                  <span key={i} className="before-text">
                    {b}
                    {i < card.before.length - 1 && " • "}
                  </span>
                ))} </div>
              </div>
              <div className="space-between">
                <span className="label">AFTER:</span>{" "}
               <div> {card.after.map((a, i) => (
                  <span key={i} className="after-text">
                    {a}
                    {i < card.after.length - 1 && " • "}
                  </span>
                ))}</div>
              </div>
            </div>

            <div className="card-footer">
            <div className="space-between">
             <div className="flexed-div"> <div className="stars">{renderStars(card.rating)}</div>
              <span className="rating">{card.rating}</span>
              </div>
              <span className="package">{card.package}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
