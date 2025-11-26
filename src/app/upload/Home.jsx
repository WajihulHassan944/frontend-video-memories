'use client';

import React, { useState, useRef, useEffect } from 'react';
import './upload.css';
import { FiUpload } from 'react-icons/fi';
import { baseUrl } from '@/const';
import { useRouter } from 'next/navigation';
import { refreshAndDispatchUser } from '@/utils/refreshUser';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Whycloud from './Whycloud/Whycloud';
import Whatexpect from './Whatexpect/Whatexpect';
import PricingSectionInPricing from '../pricing/PricingSection/PricingSection';
import CustomerTestimonials from './CustomerTestimonials/CustomerTestimonials';
import NewsletterSignup from './NewsletterSignup/NewsletterSignup';
import EnhancementOptions from './EnhancementOptions/EnhancementOptions';
import EnhancementDemo from './EnhancementDemo/EnhancementDemo';
import toast from 'react-hot-toast';


const Home = ({seeDifference, whyUpgrade, whatExpect, updates}) => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const inputRef = useRef(null);
const [dragActive, setDragActive] = useState(false);
const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);
const dispatch = useDispatch();
 const user = useSelector((state) => state.user);
 const [videoMeta, setVideoMeta] = useState(null); // holds calculated info
const [showVideoNote, setShowVideoNote] = useState(false); // controls div
const videoNoteRef = useRef(null);
const [enhancements, setEnhancements] = useState([]);
const [progress, setProgress] = useState(0);
 const router = useRouter();
// inside Home component

useEffect(() => {
  // Try restoring metadata from localStorage (not actual file)
  const savedMeta = localStorage.getItem("tempVideoMeta");
  if (savedMeta && !videoFile) {
    try {
      const { name, size, type } = JSON.parse(savedMeta);

      // Show only filename & placeholder message until user reselects
      setVideoMeta({
        fileName: name,
        fileSize: formatFileSize(size),
        type,
        error: "Please reselect the video file to continue.",
      });

      setShowVideoNote(true);
    } catch (err) {
      console.error("Failed to parse saved video metadata:", err);
      localStorage.removeItem("tempVideoMeta");
    }
  }
}, [videoFile]);

const handleFileChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // URL for preview
  const fileURL = URL.createObjectURL(file);
  setVideoFile(file);
  setVideoPreview(fileURL);
  setUploadStatus("");
  setShowVideoNote(false);

  // Save metadata only (not file!)
  localStorage.setItem(
    "tempVideoMeta",
    JSON.stringify({ name: file.name, size: file.size, type: file.type })
  );

  // Extract video metadata (duration, resolution, etc.)
  try {
    const { duration, width, height } = await getVideoMetadata(file);
    const quality = `${height}p`;
    const durationMinutes = Math.ceil(duration / 60);

    // Pricing logic
    let costPerMinute = 1;
    if (height >= 2160 && height < 4320) costPerMinute = 6;
    const cost = durationMinutes * costPerMinute;

    const hasFreeMinute =
      user?.hasFreeConversion &&
      user?.newsletterOptIn === true &&
      height < 4320; // disallow 8K free
    const isUsingFreeMinute = hasFreeMinute && durationMinutes <= 1;

    const balance = user?.wallet?.balance || 0;

    setVideoMeta({
      fileName: file.name,
      fileSize: formatFileSize(file.size),
      duration: durationMinutes,
      quality,
      cost,
      balance,
      isUsingFreeMinute,
      canProceed: isUsingFreeMinute || balance >= cost,
    });

    setShowVideoNote(true);
    setTimeout(() => {
      videoNoteRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  } catch (err) {
    console.error("Metadata extraction error:", err);
    setVideoMeta({ error: "Failed to read video metadata." });
    setShowVideoNote(true);
  }
};


  const getVideoMetadata = (file) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');

    video.preload = 'metadata';
    video.src = url;

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      const duration = video.duration;
      const width = video.videoWidth;
      const height = video.videoHeight;
      resolve({ duration, width, height });
    };

    video.onerror = () => {
      reject(new Error('Failed to load video metadata'));
    };
  });
  function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
}


const handleUpload = async () => {
  if (!videoFile) return;

  if (!isLoggedIn) {
    router.push('/signup');
    return;
  }

  setUploading(true);
  setUploadStatus('');
  setProgress(0);

  try {
    const { duration, width, height } = await getVideoMetadata(videoFile);
    const quality = `${height}p`;
    const durationMinutes = Math.ceil(duration / 60);
    const balance = user?.wallet?.balance || 0;


     const totalEnhancementCredits = Array.isArray(enhancements)
      ? enhancements.reduce((sum, item) => sum + (item.creditsUsed || 0), 0)
      : 0;


    // ✅ Add free minute logic (if applicable)
    const hasFreeMinute =
      user?.hasFreeConversion &&
      user?.newsletterOptIn === true &&
      height < 4320;

    const isUsingFreeMinute = hasFreeMinute && durationMinutes <= 1;
    const totalCost = isUsingFreeMinute ? 0 : totalEnhancementCredits;

    if (isUsingFreeMinute) {
      alert("🎁 Using free 1-minute conversion.");
    } else if (balance < totalCost) {
      alert(`❌ Not enough credits. You need ${totalCost} credits for selected enhancements.`);
      setUploading(false);
      return;
    }

    // ✅ 1. Get signed URL
    const res = await fetch(`${baseUrl}/b2/sign-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        fileName: videoFile.name,
        fileType: videoFile.type,
        usingFreeConversion: isUsingFreeMinute,
        cost: totalCost,
      }),
    });

    const { signedUrl, key } = await res.json();
console.log(signedUrl);
    // ✅ 2. Upload with progress
    await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", signedUrl);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve();
        else reject(new Error("Upload failed"));
      };

      xhr.onerror = () => reject(new Error("Upload error"));
      xhr.send(videoFile);
    });

    // ✅ 3. Save metadata
    const saveRes = await fetch(`${baseUrl}/b2/save-metadata`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originalFileName: videoFile.name,
        key,
        quality,
        lengthInSeconds: Math.round(duration),
        fileSize: formatFileSize(videoFile.size),
        creditsUsed: totalCost,
        conversionFormat: enhancements, // selected features
      }),
    });

    if (!saveRes.ok) throw new Error('Metadata save failed');

    localStorage.removeItem('tempVideoMeta');
    await refreshAndDispatchUser(dispatch);
    router.push('/dashboard');
    toast.success('Upload successful!');
  } catch (err) {
    console.error(err);
    setUploadStatus(`❌ Upload failed: ${err.message}`);
  } finally {
    setUploading(false);
  }
};


  return (
    <div className="xclusive-container">
<h1 className='uploadTitle'><span className='highlight'>Upload Your Video</span> and See the Difference</h1>
    <center>  <div className="upload-section">
 
    <>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="video/*"
        style={{ display: 'none' }}
      />


      {/* Desktop Drop Zone */}
      <label
        className={`upload-box desktop-only ${dragActive ? 'dragging' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
        }}
        onDrop={async (e) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);

  const file = e.dataTransfer.files?.[0];
  if (file && file.type.startsWith("video/")) {
    const fileURL = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoPreview(fileURL);
    setUploadStatus("");
    setShowVideoNote(false);

    // ✅ Save metadata only (not base64!)
    localStorage.setItem(
      "tempVideoMeta",
      JSON.stringify({ name: file.name, size: file.size, type: file.type })
    );

    try {
      const { duration, width, height } = await getVideoMetadata(file);
      const quality = `${height}p`;
      const durationMinutes = Math.ceil(duration / 60);

      // Pricing logic
      let costPerMinute = 1;
      if (height >= 2160 && height < 4320) costPerMinute = 6;
      const cost = durationMinutes * costPerMinute;

      const hasFreeMinute =
        user?.hasFreeConversion &&
        user?.newsletterOptIn === true &&
        height < 4320;
      const isUsingFreeMinute = hasFreeMinute && durationMinutes <= 1;

      const balance = user?.wallet?.balance || 0;

      setVideoMeta({
        fileName: file.name,
        fileSize: formatFileSize(file.size),
        duration: durationMinutes,
        quality,
        cost,
        balance,
        isUsingFreeMinute,
        canProceed: isUsingFreeMinute || balance >= cost,
      });

      setShowVideoNote(true);
      setTimeout(() => {
        videoNoteRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    } catch (err) {
      console.error("Metadata extraction error:", err);
      setVideoMeta({ error: "Failed to read video metadata." });
      setShowVideoNote(true);
    }
  } else {
    alert("Please drop a valid video file.");
  }
}}

      >
        <div className="upload-icon">
          <FiUpload size={32} />
        </div>
        <h1 className='dropHeading'>Drag & drop your video</h1>
        <p className='dropPara'>Upload your video to enhance with AI</p>
        <button className='upload-input-btn' onClick={() => inputRef.current?.click()}>Choose File</button>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            ref={inputRef}
            style={{ display: 'none' }}
          />
      </label>
    </>


  {/* Video preview after selection */}
  {videoPreview && (
    <div className="preview-box">
      <video src={videoPreview} controls width="100%" />
    </div>
  )}
  {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
  <EnhancementOptions
    videoTime={videoMeta?.duration}
    onChange={(selected) => setEnhancements(selected)}
  />

{uploading && (
  <div className="upload-progress-container-new">
    <div 
      className="upload-progress-bar-new"
      style={{
        width: `${progress}%`,
        borderRadius: progress === 100 
          ? "10px"          // fully rounded if 100%
          : "10px 0 0 10px" // only left rounded while loading
      }}
    >
      <span className="upload-progress-thumb">{progress}%</span>
    </div>
  </div>
)}

{(() => {
  const noEnhancementSelected =
    !enhancements || Object.values(enhancements).every((v) => v === false);

  const isDisabled =
    uploading ||
    (isLoggedIn && showVideoNote && videoMeta && !videoMeta.canProceed) ||
    !videoFile ||
    noEnhancementSelected;
console.log("=== Button Disable Debug ===");
  console.log("uploading:", uploading);
  console.log("isLoggedIn:", isLoggedIn);
  console.log("showVideoNote:", showVideoNote);
  console.log("videoMeta:", videoMeta);
  console.log("videoMeta.canProceed:", videoMeta?.canProceed);
  console.log("videoFile:", videoFile);
  console.log("noEnhancementSelected:", noEnhancementSelected);
  console.log("isDisabled (final):", isDisabled);
  console.log("============================");
  return (
    <button
      className="convert-btn"
      onClick={handleUpload}
      disabled={isDisabled}
      style={{
        opacity: isDisabled ? 0.6 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}
    >
      {uploading ? <div className="btn-spinner" /> : 'Enhance Video'}
    </button>
  );
})()}


  
</div>
</center>

<EnhancementDemo sectionData={seeDifference} />

      <CustomerTestimonials />
   

      {!isLoggedIn && <center><div className="free-minute" style={{marginBottom:'100px'}}>🎁 Get 1 free video enhancement after registration
      <br /><span>Newsletter signup required</span>
      </div></center>}
{/* {isLoggedIn && <center><Credits /></center>} */}
    <PricingSectionInPricing />
    <Whycloud sectionData={whyUpgrade} />
    {/* <ImmersiveThreeD /> */}
    <Whatexpect sectionData={whatExpect} />
    <NewsletterSignup sectionData={updates} />
    </div>
  );
};

export default Home;
