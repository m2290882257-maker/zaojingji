import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CeilingReveal } from "../components/intro/CeilingReveal";
import { GestureHint } from "../components/intro/GestureHint";

const clampProgress = (value: number) => Math.max(0, Math.min(1, value));

export function IntroPage() {
  const [revealProgress, setRevealProgress] = useState(0.12);
  const navigate = useNavigate();

  const addProgress = useCallback((delta: number) => {
    setRevealProgress((current) => clampProgress(current + delta));
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (revealProgress >= 0.96 && event.deltaY > 18) {
        navigate("/atlas");
        return;
      }

      addProgress(event.deltaY * 0.0017);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const viewportHeight = window.innerHeight || 1;
      const verticalProgress = 1 - event.clientY / viewportHeight;
      setRevealProgress((current) =>
        Math.max(current, clampProgress(verticalProgress * 0.78)),
      );
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "PageDown") {
        addProgress(0.14);
      }
      if (event.key === "ArrowDown" || event.key === "PageUp") {
        addProgress(-0.08);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [addProgress, navigate, revealProgress]);

  const contentReady = revealProgress > 0.46;

  return (
    <section className="intro-stage intro-stage-reference" data-ready={contentReady}>
      <div className="intro-ambient" aria-hidden="true" />
      <div className="intro-visual-field" aria-hidden="true">
        <CeilingReveal progress={revealProgress} />
      </div>
      <GestureHint progress={revealProgress} />

      <div
        className="intro-copy intro-copy-reference"
        style={{
          opacity: 0.18 + revealProgress * 0.82,
          transform: `translateY(${contentReady ? 0 : 18}px)`,
        }}
      >
        <p className="eyebrow intro-kicker">DUNHUANG ZAOJING ATLAS</p>
        <img
          className="intro-title-image"
          src="/assets/title/title.svg"
          alt="藻井集"
        />
        <p className="lead intro-subtitle">面向设计转译的敦煌藻井视觉图鉴</p>
        <p className="intro-description">
          从仰望进入图鉴，再把藻井的纹样、结构与色彩转译为可继续创作的视觉资源。
        </p>
        <div className="intro-actions">
          <button
            className="action-link intro-scroll-action"
            type="button"
            onClick={() => setRevealProgress(1)}
          >
            向下滚动进入图鉴
          </button>
          <button
            className="action-link action-link-muted intro-progress-button"
            type="button"
            onClick={() => navigate("/atlas")}
          >
            直接进入
          </button>
        </div>
      </div>

      <div className="intro-meter" aria-label="藻井显现进度">
        <span style={{ transform: `scaleX(${revealProgress})` }} />
      </div>
    </section>
  );
}
