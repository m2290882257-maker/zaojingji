import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { IntroLoading } from "../components/intro/IntroLoading";
import { IntroVideo } from "../components/intro/IntroVideo";

const titleCalligraphy = "https://i.ibb.co/7JhkjF5Q/image-55.png";
const zaojingDome = "https://i.ibb.co/wN4JS6fB/3.png";

const DESIGN_W = 1920;
const DESIGN_H = 1080;

export function IntroPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"loading" | "video" | "main">("loading");

  useEffect(() => {
    function updateScale() {
      if (!containerRef.current || !innerRef.current) return;
      const scaleX = window.innerWidth / DESIGN_W;
      const scaleY = window.innerHeight / DESIGN_H;
      const scale = Math.min(scaleX, scaleY);
      innerRef.current.style.transform = `scale(${scale})`;
      const scaledW = DESIGN_W * scale;
      const scaledH = DESIGN_H * scale;
      innerRef.current.style.left = `${(window.innerWidth - scaledW) / 2}px`;
      innerRef.current.style.top = `${(window.innerHeight - scaledH) / 2}px`;
    }
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <IntroLoading onComplete={() => setPhase("video")} />
        )}
        {phase === "video" && (
          <IntroVideo onComplete={() => setPhase("main")} />
        )}
      </AnimatePresence>

      {/* Traditional Scroll Unfolding Roller Shafts (Aesthetic physical guide) */}
      {phase === "main" && (
        <>
          {/* Left scroll shaft */}
          <motion.div
            initial={{ left: "50%", opacity: 1 }}
            animate={{ left: "0%", opacity: [1, 1, 0.8, 0] }}
            transition={{ duration: 2.5, ease: [0.25, 1, 0.5, 1] }}
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              width: "14px",
              background: "linear-gradient(to right, #735928 0%, #c9a646 50%, #735928 100%)",
              boxShadow: "-6px 0 20px rgba(0,0,0,0.6), 0 0 15px rgba(201,166,70,0.35)",
              zIndex: 100,
              pointerEvents: "none",
            }}
          />

          {/* Right scroll shaft */}
          <motion.div
            initial={{ left: "50%", opacity: 1 }}
            animate={{ left: "100%", opacity: [1, 1, 0.8, 0] }}
            transition={{ duration: 2.5, ease: [0.25, 1, 0.5, 1] }}
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              width: "14px",
              marginLeft: "-14px",
              background: "linear-gradient(to right, #735928 0%, #c9a646 50%, #735928 100%)",
              boxShadow: "6px 0 20px rgba(0,0,0,0.6), 0 0 15px rgba(201,166,70,0.35)",
              zIndex: 100,
              pointerEvents: "none",
            }}
          />
        </>
      )}

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, clipPath: "inset(0% 50% 0% 50%)" }}
        animate={{ 
          opacity: phase === "main" ? 1 : 0,
          clipPath: phase === "main" ? "inset(0% 0% 0% 0%)" : "inset(0% 50% 0% 50%)"
        }}
        transition={{ 
          duration: 2.5, 
          ease: [0.25, 1, 0.5, 1] // Custom unrolling scroll curve
        }}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#000",
          overflow: "hidden",
          zIndex: 1,
          pointerEvents: phase === "main" ? "auto" : "none"
        }}
      >
        {/* 背景：藻井图 铺满整个画面 (object-fit: cover) */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 1 }}>
          <motion.img
            src={zaojingDome}
            alt="Dunhuang Zaojing Dome"
            referrerPolicy="no-referrer"
            initial={{ scale: 1.15 }}
            animate={{ scale: phase === "main" ? 1.0 : 1.15 }}
            transition={{ duration: 4.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
          />
        </div>

        {/* 黑色半透明遮罩 - 增强文字对比度，铺满整个画面 */}
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.64)", zIndex: 2 }} />

        <div
          ref={innerRef}
          style={{
            position: "absolute",
            width: DESIGN_W,
            height: DESIGN_H,
            transformOrigin: "top left",
            zIndex: 3
          }}
        >

          {/* 核心书法字标题居中 */}
          <motion.div
            initial={{ opacity: 0, scale: 1.15, filter: "brightness(0.5) blur(10px)" }}
            animate={{ 
              opacity: phase === "main" ? 1 : 0, 
              scale: phase === "main" ? 1.25 : 1.15, 
              filter: phase === "main" ? "brightness(1) blur(0px)" : "brightness(0.5) blur(10px)" 
            }}
            transition={{ delay: 0.8, duration: 2.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: 0,
              top: 240,
              width: 1920,
              height: 480,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pointerEvents: "none"
            }}
          >
            <img
              src={titleCalligraphy}
              alt="藻井集"
              referrerPolicy="no-referrer"
              style={{
                maxHeight: "100%",
                maxWidth: "95%",
                objectFit: "contain",
                filter: "drop-shadow(0px 12px 36px rgba(0, 0, 0, 0.98)) drop-shadow(0px 2px 6px rgba(201, 166, 70, 0.5))",
                userSelect: "none"
              }}
            />
          </motion.div>

          {/* 底部描述文字 */}
          <motion.p
            initial={{ opacity: 0, x: "-50%", y: 30 }}
            animate={{ opacity: phase === "main" ? 1 : 0, x: "-50%", y: phase === "main" ? 0 : 30 }}
            transition={{ delay: 1.4, duration: 1.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: "50%",
              top: 711,
              width: 995,
              wordBreak: "break-word",
              color: "#a48d5f",
              fontSize: 16,
              textAlign: "center",
              fontStyle: "normal",
              margin: 0,
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.9))"
            }}
          >
            <span style={{ fontFamily: "sans-serif", fontWeight: 500, lineHeight: "32.538px", display: "block" }}>
              藻井是中国传统建筑中极具审美价值和文化象征的装饰形式，承载着宗教信仰、空间秩序、纹样寓意和地域工艺特色。
            </span>
            <span style={{ fontFamily: "sans-serif", fontWeight: 400, lineHeight: "32.538px", display: "block", marginTop: "4px" }}>
              以"仰望—解构—读纹—拾色—再造"为核心路径，用交互方式呈现藻井之美，并将藻井中的色彩、纹样与文化信息转译为可用于设计创作的数字视觉基因卡。
            </span>
          </motion.p>

          {/* 交互式进入按钮 */}
          <motion.div
            initial={{ opacity: 0, x: "-50%", y: 20 }}
            animate={{ opacity: phase === "main" ? 1 : 0, x: "-50%", y: phase === "main" ? 0 : 20 }}
            transition={{ delay: 1.9, duration: 1.5, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: 60,
              left: "50%",
              zIndex: 10
            }}
          >
            <button
              onClick={() => navigate("/atlas")}
              style={{
                background: "rgba(201, 166, 70, 0.12)",
                border: "1px solid rgba(201, 166, 70, 0.5)",
                borderRadius: "0px",
                color: "#f5ead7",
                fontFamily: '"Noto Serif SC", serif',
                fontSize: "16px",
                fontWeight: 500,
                padding: "11px 40px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.15em",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.6)",
                transform: "scale(1.5)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(201, 166, 70, 0.24)";
                e.currentTarget.style.borderColor = "#c9a646";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(201, 166, 70, 0.25)";
                e.currentTarget.style.transform = "scale(1.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(201, 166, 70, 0.12)";
                e.currentTarget.style.borderColor = "rgba(201, 166, 70, 0.5)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.6)";
                e.currentTarget.style.transform = "scale(1.5)";
              }}
            >
              点击进入图鉴 ➔
            </button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
