'use client';

import React from 'react';
import './Whycloud.css';
import { motion } from 'framer-motion';
import { Download, Play, Youtube, Zap } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Icon map (1-to-1 with your cards)
const iconMap = {
  0: Zap,
  1: Play,
  2: Youtube,
  3: Download,
};

const Whycloud = ({ sectionData }) => {
  if (!sectionData) return null;

  return (
    <div className="why-cloud-wrapper">

      {/* 🔥 Dynamic H2 with HTML spans */}
      <h2
        className="why-heading"
        dangerouslySetInnerHTML={{
          __html: (sectionData?.title ||
            "Why upgrade your video <span class='highlight'>content</span>")
            .replace(/\\u003C/g, '<')
            .replace(/\\u003E/g, '>')
            .replace(/className=/g, 'class='),
        }}
      />

      {/* Features List */}
      <motion.div
        className="features"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {sectionData?.cards?.map((card, index) => {
          const Icon = iconMap[index] || Zap; // fallback

          return (
            <motion.div key={card._id} className="feature-item" variants={itemVariants}>
              <div className="icon-circle">
                <Icon className="why-icons" />
              </div>

              <div className="feature-text">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Whycloud;
