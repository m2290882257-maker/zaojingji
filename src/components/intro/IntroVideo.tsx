import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { VolumeX, SkipForward } from "lucide-react";
import introVideoSrc from "../../utils/6月25日.mp4";

type IntroVideoProps = {
  onComplete: () => void;
};

export function IntroVideo({ onComplete }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showTapIndicator, setShowTapIndicator] = useState(true);

  // Attempt autoplay
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Autoplay blocked or failed. Waiting for user interaction.", err);
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setShowTapIndicator(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    setShowTapIndicator(false);
  };

  const handleScreenClick = () => {
    // If screen is tapped, unmute or toggle play to give direct interaction
    if (isMuted && videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      setShowTapIndicator(false);
      if (!isPlaying) {
        videoRef.current.play().then(() => setIsPlaying(true));
      }
    } else {
      togglePlay();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  return (
    <motion.div
      id="intro-video-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      onClick={handleScreenClick}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#050403",
        zIndex: 9990,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Cinematic Fullscreen Video */}
      <video
        ref={videoRef}
        src={introVideoSrc}
        autoPlay
        muted={isMuted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={onComplete}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      {/* Decorative Dark Vignette edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle, transparent 30%, rgba(5,4,3,0.85) 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Ambient Pulsing Audio Sound Prompt in center if muted */}
      <AnimatePresence>
        {showTapIndicator && isMuted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            style={{
              position: "absolute",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              padding: "24px 36px",
              borderRadius: "16px",
              background: "rgba(5, 4, 3, 0.75)",
              border: "1px solid rgba(201, 166, 70, 0.35)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(201, 166, 70, 0.1)",
            }}
          >
            {/* Pulsing Audio Icon Ring */}
            <div style={{ position: "relative", width: "64px", height: "64px" }}>
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "2px solid #c9a646",
                }}
              />
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "rgba(201, 166, 70, 0.15)",
                  border: "1px solid #c9a646",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#f5ead7",
                }}
              >
                <VolumeX size={28} />
              </div>
            </div>
            
            <div style={{ textAlign: "center" }}>
              <h3
                style={{
                  margin: "0 0 4px 0",
                  fontFamily: '"Noto Serif SC", serif',
                  color: "#f5ead7",
                  fontSize: "16px",
                  letterSpacing: "0.1em",
                }}
              >
                点击开启声音
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: "sans-serif",
                  color: "rgba(245, 234, 215, 0.5)",
                  fontSize: "12px",
                  letterSpacing: "0.05em",
                }}
              >
                聆听敦煌空灵乐章与画卷之美
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Overlay UI */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "40px",
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        {/* Top Header Controls: Skip Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
            pointerEvents: "auto",
          }}
        >
          {/* Golden Skip Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
            style={{
              background: "rgba(5, 4, 3, 0.6)",
              border: "1px solid rgba(201, 166, 70, 0.4)",
              borderRadius: "999px",
              color: "#f5ead7",
              fontFamily: '"Noto Serif SC", serif',
              fontSize: "13px",
              padding: "8px 22px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              letterSpacing: "0.1em",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#c9a646";
              e.currentTarget.style.background = "rgba(201, 166, 70, 0.15)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(201, 166, 70, 0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(201, 166, 70, 0.4)";
              e.currentTarget.style.background = "rgba(5, 4, 3, 0.6)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            跳过前导 <SkipForward size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
