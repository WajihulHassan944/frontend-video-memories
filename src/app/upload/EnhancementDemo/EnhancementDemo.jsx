'use client';
import React, { useEffect } from 'react';
import './EnhancementDemo.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWebsiteMedia } from '@/redux/features/websiteMedia';
import { getVimeoEmbedUrl } from '@/utils/getVimeoEmbedUrl';

export default function EnhancementDemo() {
  const dispatch = useDispatch();
  const { media } = useSelector(state => state.websiteMedia);

  useEffect(() => {
    dispatch(fetchWebsiteMedia());
  }, [dispatch]);

  const enhancementMedia = media.find(item => item.identifier === "Enhancement Demo");


  const embedUrl = enhancementMedia?.platform === "vimeo"
    ? getVimeoEmbedUrl(enhancementMedia.url)
    : null;

  return (
    <section className="example-section">
      <div className="example-inner">
        <h2 className="hero-title">
          <span className='highlight'>See the difference</span> in action
        </h2>
        <p className="hero-sub">Old family videos transformed from poor to perfect quality</p>

        <div className="device-frame">
          <div className="device-inner">
            
            {/* Vimeo iframe */}
            {embedUrl ? (
              <div className="vimeo-wrapper">
                <iframe
                  src={embedUrl}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Enhancement Demo"
                  style={{ width: "100%", height: "100%" }}
                ></iframe>
              </div>
            ) : (
              // Fallback video
              <video
                className="demo-video"
                src={enhancementMedia ? enhancementMedia.url : "/assets/enhancement-demo.mp4"}
                poster="/assets/poster-enhancement.jpg"
                controls
                preload="metadata"
              />
            )}
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
