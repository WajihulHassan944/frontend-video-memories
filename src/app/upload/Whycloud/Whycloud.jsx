'use client';

import React from 'react';
import './Whycloud.css';
import { motion } from 'framer-motion';
import {  Download, Play, Youtube, Zap } from 'lucide-react';

// Parent container animation (stagger children)
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // delay between cards
    },
  },
};

// Each card animation
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Whycloud = () => {
  return (
    <div className="why-cloud-wrapper">
      <h2 className="why-heading">Why upgrade your video content with VideoMemories.eu</h2>

      <motion.div
        className="features"
        variants={containerVariants}
        initial="hidden"
        whileInView="show" // animates only when in viewport
        viewport={{ once: true, amount: 0.2 }} // triggers when 20% in view
      >
        <motion.div className="feature-item" variants={itemVariants}>
          <div className="icon-circle">
            <Zap className="why-icons" />
          </div>
          <div className="feature-text">
         <h3>AI-Powered Enhancement</h3>
            <p>Advanced AI algorithms restore and enhance video quality with professional results</p>
          </div>
        </motion.div>

        <motion.div className="feature-item" variants={itemVariants}>
          <div className="icon-circle">
            <Play className="why-icons" />
          </div>
          <div className="feature-text">
           <h3>Restore Precious Memories</h3>
            <p>Bring old family videos back to life with crystal clear upscaling and noise reduction</p>
          </div>
        </motion.div>

        <motion.div className="feature-item" variants={itemVariants}>
          <div className="icon-circle">
            <Youtube className="why-icons" />
          </div>
          <div className="feature-text">
            <h3>Professional Quality</h3>
            <p>Get studio-grade results with color grading and stabilization features</p>
          </div>
        </motion.div>

        <motion.div className="feature-item" variants={itemVariants}>
          <div className="icon-circle">
            <Download className="why-icons" />
          </div>
          <div className="feature-text">
            <h3>Easy & Fast Processing</h3>
            <p>Cloud-based processing means no software installation and lightning-fast results</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Whycloud;
