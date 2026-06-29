import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
const zaojingDome = "https://i.ibb.co/wN4JS6fB/3.png";

type IntroLoadingProps = {
  onComplete: () => void;
};

export function IntroLoading({ onComplete }: IntroLoadingProps) {
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [dots, setDots] = useState(".");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set up backup timer in case video doesn't load or play
  useEffect(() => {
    // If video is not ready after 3 seconds, or fails, we use our beautiful interactive loading screen
    // It will automatically complete after 5.5 seconds (matching the 5-second video length)
    const totalDuration = 5500;
    const timer = setTimeout(() => {
      onComplete();
    }, totalDuration);

    const dotsTimer = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(dotsTimer);
    };
  }, [onComplete]);

  // Attempt to play the video once it's ready
  useEffect(() => {
    if (videoReady && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy blocker
        console.log("Autoplay was blocked or failed, continuing with visual animation.");
      });
    }
  }, [videoReady]);

  return (
    <div
      id="intro-loading-screen"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#050403",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Video layer */}
      <video
        ref={videoRef}
        src="/assets/loding/loading.mp4"
        autoPlay
        muted
        playsInline
        onCanPlay={() => setVideoReady(true)}
        onError={() => setVideoError(true)}
        onEnded={onComplete}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
          opacity: videoReady && !videoError ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          pointerEvents: "none",
        }}
      />

      {/* Decorative Golden Ambient Fallback & Overlay */}
      <AnimatePresence>
        {(!videoReady || videoError) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              background: "radial-gradient(circle at center, rgba(16, 12, 8, 0.98) 0%, #050403 100%)",
            }}
          >
            {/* Ambient gold glow in center */}
            <div
              style={{
                position: "absolute",
                width: "600px",
                height: "600px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(201, 166, 70, 0.1) 0%, transparent 70%)",
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />

            {/* Rotating Starry Zaojing Dome Container */}
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{
                scale: [0.85, 1.05],
                rotate: 15,
              }}
              transition={{
                duration: 5.5,
                ease: "easeOut",
              }}
              style={{
                position: "relative",
                width: "480px",
                height: "480px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Outer Golden Sacred Rings */}
              <svg
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  color: "rgba(201, 166, 70, 0.45)",
                }}
                viewBox="0 0 500 500"
                fill="none"
              >
                {/* Elegant Concentric Circles */}
                <circle cx="250" cy="250" r="240" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
                <circle cx="250" cy="250" r="220" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="250" cy="250" r="180" stroke="currentColor" strokeWidth="1" />
                <circle cx="250" cy="250" r="140" stroke="currentColor" strokeWidth="2" strokeDasharray="15 5" />
                
                {/* Starry geometry points */}
                <path d="M250 10 L250 490 M10 250 L490 250" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                <path d="M80 80 L420 420 M80 420 L420 80" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              </svg>

              {/* Real Zaojing Dome Image inside rotating ring */}
              <motion.div
                animate={{ rotate: -30 }}
                transition={{
                  duration: 5.5,
                  ease: "easeOut",
                }}
                style={{
                  width: "360px",
                  height: "360px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "4px double rgba(201, 166, 70, 0.7)",
                  boxShadow: "0 0 50px rgba(201, 166, 70, 0.3), inset 0 0 30px rgba(0,0,0,0.8)",
                  position: "relative",
                  zIndex: 3,
                }}
              >
                <img
                  src={zaojingDome}
                  alt="藻井穹顶"
                  referrerPolicy="no-referrer"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(0.95) contrast(1.1)",
                  }}
                />
                
                {/* Celestial Overlay to make the center starry deep blue */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(circle at center, rgba(10, 24, 47, 0.4) 0%, transparent 60%)",
                    mixBlendMode: "color-dodge",
                  }}
                />
              </motion.div>

              {/* Floating golden spark elements */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                const radius = 200;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                return (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [0.5, 1.2, 0.5],
                      opacity: [0.3, 0.9, 0.3],
                      y: [y, y - 20, y],
                    }}
                    transition={{
                      duration: 2 + (i % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      position: "absolute",
                      width: "6px",
                      height: "6px",
                      backgroundColor: "#c9a646",
                      borderRadius: "50%",
                      boxShadow: "0 0 10px #c9a646",
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      zIndex: 4,
                    }}
                  />
                );
              })}
            </motion.div>

            {/* Pure aesthetic loading text */}
            <div
              style={{
                marginTop: "48px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                zIndex: 10,
              }}
            >
              <p
                style={{
                  fontFamily: "sans-serif",
                  color: "rgba(245, 234, 215, 0.55)",
                  fontSize: "14px",
                  letterSpacing: "0.15em",
                  margin: 0,
                }}
              >
                画卷舒展中{dots}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}
