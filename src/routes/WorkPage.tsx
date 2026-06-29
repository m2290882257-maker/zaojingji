import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Page11 } from "../components/work/Page11";
import { Page18 } from "../components/work/Page18";
import { PageArtGenerator } from "../components/work/PageArtGenerator";
import { works } from "../data/works";

export function WorkPage() {
  const { workId } = useParams();
  const work = works.find((w) => w.id === workId) || works.find((w) => w.id === "sui-407-three-hares-feitian");

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth;
        // Standard design width of the Figma layout is 1920px
        const newScale = parentWidth / 1920;
        setScale(newScale);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    // Trigger after a short timeout to make sure DOM is fully measured
    const timer = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="work-page-section relative min-h-screen bg-black overflow-x-hidden text-white" ref={containerRef}>
      {/* Scaled Figma Viewport Center */}
      <div className="w-full flex flex-col items-center justify-start bg-black overflow-hidden" style={{ height: `${3240 * scale}px` }}>
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            width: "1920px",
            height: "3240px",
            transition: "transform 0.15s ease-out",
          }}
          className="relative select-none"
        >
          <Page11 />
          <Page18 />
          <PageArtGenerator />
        </div>
      </div>
    </section>
  );
}
