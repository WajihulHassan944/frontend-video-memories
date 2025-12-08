import React, { useEffect } from 'react';
import './Whatexpect.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWebsiteMedia } from '@/redux/features/websiteMedia';
import { getVimeoEmbedUrl } from '@/utils/getVimeoEmbedUrl';

const Whatexpect = ({ sectionData }) => {
  const dispatch = useDispatch();
  const { media } = useSelector(state => state.websiteMedia);

  useEffect(() => {
    dispatch(fetchWebsiteMedia());
  }, [dispatch]);

  if (!sectionData) return null;

  // Find the video with identifier "what-to-expect"
  const videoItem = media.find(item => item.identifier === "what-to-expect");

  // Build final embed URL
  let finalVideoUrl = null;

  if (videoItem) {
    if (videoItem.platform === "vimeo") {
      finalVideoUrl = getVimeoEmbedUrl(videoItem.url);
    } else if (videoItem.platform === "youtube") {
      // Convert youtube watch url → embed
      const urlObj = new URL(videoItem.url);
      const videoId = urlObj.searchParams.get("v");
      finalVideoUrl = `https://www.youtube.com/embed/${videoId}`;
    } else {
      // mp4 file or other direct link
      finalVideoUrl = videoItem.url;
    }
  }

  return (
    <div className="expect-wrapper">
      <h2
        className="expect-heading"
        dangerouslySetInnerHTML={{
          __html: sectionData.title
            ?.replace(/\\u003C/g, "<")
            .replace(/\\u003E/g, ">")
            .replace(/className=/g, "class="),
        }}
      />

      {sectionData.description && (
        <p className="expect-subtext">{sectionData.description}</p>
      )}

      <div className="video-container">

        {/* If Vimeo or YouTube → iframe */}
        {finalVideoUrl?.includes("embed") || finalVideoUrl?.includes("vimeo.com") ? (
          <iframe
            src={finalVideoUrl}
            title="What to Expect Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ) : (
          // Fallback direct video file
          <video src={finalVideoUrl} controls />
        )}
      </div>
    </div>
  );
};

export default Whatexpect;
