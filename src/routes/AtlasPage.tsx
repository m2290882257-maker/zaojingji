import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AtlasMorphRing } from "../components/atlas/AtlasMorphRing";
import { dynasties } from "../data/dynasties";
import { overviewImageSlots } from "../data/overviewImages";

type AtlasView = "overview" | "dynasty-index";
type DynastyCardStyle = CSSProperties & {
  "--dynasty-color": string;
};

export function AtlasPage() {
  const [searchParams] = useSearchParams();
  const [atlasView, setAtlasView] = useState<AtlasView>(
    searchParams.get("view") === "dynasty-index" ? "dynasty-index" : "overview",
  );
  const navigate = useNavigate();
  const upwardScrollRef = useRef(0);
  const sortedDynasties = useMemo(
    () => [...dynasties].sort((a, b) => a.order - b.order),
    [],
  );

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (atlasView !== "overview") {
        return;
      }

      if (event.deltaY >= 0) {
        upwardScrollRef.current = 0;
        return;
      }

      const isAtPageTop = window.scrollY <= 4;
      if (!isAtPageTop) {
        upwardScrollRef.current = 0;
        return;
      }

      upwardScrollRef.current += Math.abs(event.deltaY);
      if (upwardScrollRef.current > 280) {
        upwardScrollRef.current = 0;
        navigate("/");
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [atlasView, navigate]);

  useEffect(() => {
    if (searchParams.get("view") === "dynasty-index") {
      setAtlasView("dynasty-index");
    }
  }, [searchParams]);

  return (
    <section className="atlas-stage animate-fade-in" data-view={atlasView}>
      {atlasView === "overview" ? (
        <div className="atlas-reference-overview atlas-reference-overview-morph">
          <AtlasMorphRing
            images={overviewImageSlots}
            onSelect={() => setAtlasView("dynasty-index")}
          />
        </div>
      ) : (
        <div className="dynasty-index-layout">
          <div className="dynasty-index-header">
            <div>
              <p className="eyebrow">Dynasty Index</p>
              <h1>藻井图鉴</h1>
              <p className="lead">
                选择一个朝代，观察藻井结构、纹样与色彩秩序的变化。
              </p>
            </div>
            <button
              className="action-link action-link-muted"
              type="button"
              onClick={() => setAtlasView("overview")}
            >
              返回总览
            </button>
          </div>

          <div className="dynasty-grid">
            {sortedDynasties.map((dynasty) => (
              <Link
                className="dynasty-card"
                key={dynasty.id}
                style={
                  { "--dynasty-color": dynasty.themeColor } as DynastyCardStyle
                }
                to={`/atlas/${dynasty.id}`}
              >
                <span className="dynasty-card-index">
                  {String(dynasty.order).padStart(2, "0")}
                </span>
                <div className="dynasty-card-visual">
                  {dynasty.coverImage ? (
                    <img
                      alt={`${dynasty.name}代表藻井`}
                      loading="lazy"
                      src={dynasty.coverImage}
                    />
                  ) : null}
                </div>
                <div className="dynasty-card-copy">
                  <small>{dynasty.englishName}</small>
                  <strong>{dynasty.name}</strong>
                  <p>{dynasty.summary}</p>
                  <div className="dynasty-keywords">
                    {dynasty.visualKeywords.map((keyword) => (
                      <span key={keyword}>{keyword}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
