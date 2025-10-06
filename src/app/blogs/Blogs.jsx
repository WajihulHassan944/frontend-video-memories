'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import './blogs.css';
import HeroSection from '../home/page';

const blogs = [
  {
    title: "🎬 How AI Video Enhancement Works – The Science Behind Bette...",
    type: "Tutorial",
    date: "1/15/2024",
    readTime: "8 min",
    summary:
      "A deep dive into the AI-driven pipeline that transforms low-quality videos into stunning high-resolution content, and why it requires...",
    image: "/blogs/one.jpg",
    path: "/blogs/vr-conversion-process",
  },
  {
    title: "🚀 Unlocking the Power of Video Enhancement in Business:...",
    type: "Insights",
    date: "1/10/2024",
    readTime: "6 min",
    summary:
      "How AI video enhancement technology is revolutionizing business communication, marketing campaigns, and training materials...",
    image: "/blogs/two.jpg",
    path: "/blogs/vr-client-expectations",
  },
  {
    title:
      "📊 Video Upscaling vs Color Enhancement: What's the...",
    type: "Tutorial",
    date: "1/8/2024",
    readTime: "7 min",
    summary:
      "Understanding the differences between video upscaling, color correction, and quality enhancement techniques for professional...",
    image: "/blogs/three.jpg",
    path: "/blogs/vr-business-advantages",
  },
  {
    title: "🎥 Top 5 Video Enhancement Applications: From Restoration to...",
    type: "Technology",
    date: "1/5/2024",
    readTime: "6 min",
    summary:
      "Exploring the most effective video enhancement techniques including noise reduction, sharpening, color grading, and...",
    image: "/blogs/four.jpg",
    path: "/blogs/top-vr-applications",
  },
  {
    title: "🔮 The Future of Video Quality: Why AI Enhancement Is Revolutionizing...",
    type: "Business",
    date: "1/3/2024",
    readTime: "6 min",
    summary:
      "Exploring how AI-powered video enhancement technology is transforming content creation and bridging the gap between old footage and...",
    image: "/blogs/five.jpg",
    path: "/blogs/vr-business-opportunities",
  },
];

const Blogs = () => {
  const router = useRouter();

  return (
    <div className="blog-section">
    
    
<HeroSection 
  subtitle="Insights & Knowledge"
  title={[
    { text: "Video", className: "outline" },
    { text: "Enhancement", className: "bold" },
    { text: "Blog", className: "gradient" },
  ]}
  description="Discover everything about video enhancement, upscaling, and quality \n improvement. From restoration to optimization."
  descColor="#ababba" 
/>  
      <div className="blog-grid">
        {blogs.map((blog, index) => (
          <div key={index} className="blog-card" onClick={() => router.push(blog.path)}>
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <div className="blog-content">
              <div className="blog-meta">
                <span className={`blog-tag ${blog.type.toLowerCase()}`}>{blog.type}</span>
                <span>📅 {blog.date}</span>
                <span>⏱ {blog.readTime}</span>
              </div>
              <h3 className="blog-heading">{blog.title}</h3>
              <p className="blog-summary">{blog.summary}</p>
              <p className="blog-readmore">Read more →</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
