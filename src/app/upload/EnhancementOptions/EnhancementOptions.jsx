'use client';

import React, { useState, useEffect } from 'react';
import './enhancement.css';
import { Sparkles, Eye, Palette, Sun, MonitorUp } from 'lucide-react';

const EnhancementOptions = ({ onChange, videoTime = 0 }) => {
  const [selected, setSelected] = useState({
    denoising: false,
    face: false,
    color: false,
    hdr: false,
    upscaling: false,
  });

  const [colorMode, setColorMode] = useState('Realistic');
  const [upscaleQuality, setUpscaleQuality] = useState('1080p');

  const creditRates = {
    denoising: { hd: 2, fourK: 6 },
    face: { hd: 3, fourK: 8 },
    color: { hd: 2, fourK: 5 },
    hdr: { hd: 4, fourK: 10 },
    upscaling: { hd: 5, fourK: 15 },
  };

  const videoMinutes = videoTime > 0 ? Math.ceil(videoTime) : 1;

  const getCredits = (type) => {
    const is4K = upscaleQuality === '4K' || upscaleQuality === '8K';
    const rate = is4K ? creditRates[type].fourK : creditRates[type].hd;
    return rate * videoMinutes;
  };

  const enhancementList = [
    { type: 'Video Denoising', key: 'denoising', selected: selected.denoising, creditsUsed: getCredits('denoising') },
    { type: 'Face Enhancement', key: 'face', selected: selected.face, creditsUsed: getCredits('face') },
    { type: 'Color Enhancement', key: 'color', selected: selected.color, mode: colorMode, creditsUsed: getCredits('color') },
    { type: 'SDR → HDR Conversion', key: 'hdr', selected: selected.hdr, creditsUsed: getCredits('hdr') },
    { type: 'Video Upscaling', key: 'upscaling', selected: selected.upscaling, quality: upscaleQuality, creditsUsed: getCredits('upscaling') },
  ];

  const selectedEnhancements = enhancementList.filter((e) => e.selected);
  const totalCredits = selectedEnhancements.reduce((sum, e) => sum + e.creditsUsed, 0);

  useEffect(() => {
    onChange(selectedEnhancements, totalCredits);
  }, [selected, colorMode, upscaleQuality, videoTime]);

  const toggleOption = (key) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDropdownSelect = (key, valueSetter) => (e) => {
    e.stopPropagation(); // prevent parent <li> click
    const newValue = e.target.value;
    valueSetter(newValue);
    // ✅ auto-select the parent option if not selected
    setSelected((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
  };

  return (
    <div className="enhancement-card">
      <div className="enhancement-header">
        <h2>Enhancement Options</h2>
        <div className="enhancement-summary">
          <span>{selectedEnhancements.length} selected</span>
          <span>{totalCredits} credits</span>
        </div>
      </div>

      <ul className="enhancement-list">
        {/* Video Denoising */}
        <li onClick={() => toggleOption('denoising')} className="enhancement-row">
          <span className={`checkbox ${selected.denoising ? 'checked' : ''}`}></span>
          <div className="enhancement-item">
            <h3><Sparkles size={17} className="enhancement-icon" /> Video Denoising</h3>
            <p>Remove noise and grain from your video</p>
          </div>
        </li>

        {/* Face Enhancement */}
        <li onClick={() => toggleOption('face')} className="enhancement-row">
          <span className={`checkbox ${selected.face ? 'checked' : ''}`}></span>
          <div className="enhancement-item">
            <h3><Eye size={17} className="enhancement-icon" /> Face Enhancement</h3>
            <p>Enhance facial details and reduce blur in faces</p>
          </div>
        </li>

        {/* Color Enhancement */}
        <li onClick={() => toggleOption('color')} className="enhancement-row">
          <span className={`checkbox ${selected.color ? 'checked' : ''}`}></span>
          <div className="enhancement-item">
            <h3>
              <Palette size={17} className="enhancement-icon" /> Color Enhancement
              <select
                value={colorMode}
                onClick={(e) => e.stopPropagation()}
                onChange={handleDropdownSelect('color', setColorMode)}
                className="enhancement-select"
              >
                <option value="Realistic">Realistic</option>
                <option value="Vivid">Vivid</option>
                <option value="Cinematic">Cinematic</option>
              </select>
            </h3>
            <p>Enhance colors with AI-powered correction and grading</p>
          </div>
        </li>

        {/* SDR → HDR */}
        <li onClick={() => toggleOption('hdr')} className="enhancement-row">
          <span className={`checkbox ${selected.hdr ? 'checked' : ''}`}></span>
          <div className="enhancement-item">
            <h3>
              <Sun size={17} className="enhancement-icon" /> SDR to HDR{' '}
              <span className="badge">HDR10</span>
            </h3>
            <p>Convert standard dynamic range to high dynamic range for richer colors</p>
          </div>
        </li>

        {/* Video Upscaling */}
        <li onClick={() => toggleOption('upscaling')} className="enhancement-row">
          <span className={`checkbox ${selected.upscaling ? 'checked' : ''}`}></span>
          <div className="enhancement-item">
            <h3>
              <MonitorUp size={17} className="enhancement-icon" /> Video Upscaling
              <select
                value={upscaleQuality}
                onClick={(e) => e.stopPropagation()}
                onChange={handleDropdownSelect('upscaling', setUpscaleQuality)}
                className="enhancement-select"
              >
                <option value="1080p">1080p</option>
                <option value="4K">4K</option>
                <option value="8K">8K</option>
              </select>
            </h3>
            <p>Enhance video resolution up to 8K using AI upscaling</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default EnhancementOptions;
