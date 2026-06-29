import { useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Dynasty, Work } from "../../types/zhaojing";

type DynastyWorkCarouselProps = {
  dynasty: Dynasty;
  hasNextDynasty: boolean;
  hasPreviousDynasty: boolean;
  onNextDynasty: () => void;
  onPreviousDynasty: () => void;
  works: Work[];
};

type CarouselCardStyle = CSSProperties & {
  "--drag-offset": string;
  "--stack-index": number;
  "--stack-offset": number;
};

const MIN_STACK_SIZE = 8;
const DRAG_THRESHOLD = 48;

function buildCarouselItems(works: Work[]) {
  if (works.length === 0) {
    return [];
  }

  return Array.from({ length: Math.max(MIN_STACK_SIZE, works.length) }, (_, index) => {
    const work = works[index % works.length];
    return {
      ...work,
      stackKey: `${work.id}-${index}`,
    };
  });
}

export function DynastyWorkCarousel({
  dynasty,
  hasNextDynasty,
  hasPreviousDynasty,
  onNextDynasty,
  onPreviousDynasty,
  works,
}: DynastyWorkCarouselProps) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const suppressClickRef = useRef(false);
  const items = useMemo(() => buildCarouselItems(works), [works]);
  const realWorkCount = Math.max(works.length, 1);

  if (items.length === 0) {
    return (
      <div className="dynasty-carousel-empty">
        <p className="eyebrow">Dynasty Atlas</p>
        <h1>{dynasty.name}</h1>
        <p>该朝代暂未录入藻井作品。</p>
      </div>
    );
  }

  const activeItem = items[activeIndex % realWorkCount];

  const goPreviousWork = () => {
    if (realWorkCount <= 1) {
      return;
    }
    setActiveIndex((current) => (current - 1 + realWorkCount) % realWorkCount);
  };

  const goNextWork = () => {
    if (realWorkCount <= 1) {
      return;
    }
    setActiveIndex((current) => (current + 1) % realWorkCount);
  };

  const startDrag = (clientY: number) => {
    setDragStartY(clientY);
    setDragOffset(0);
  };

  const updateDrag = (clientY: number) => {
    if (dragStartY === null) {
      return;
    }
    setDragOffset(clientY - dragStartY);
  };

  const finishDrag = () => {
    suppressClickRef.current = Math.abs(dragOffset) > 8;
    if (dragOffset < -DRAG_THRESHOLD) {
      goNextWork();
    }
    if (dragOffset > DRAG_THRESHOLD) {
      goPreviousWork();
    }
    setDragStartY(null);
    setDragOffset(0);
  };

  return (
    <div className="dynasty-carousel-shell">
      <div className="dynasty-carousel-topbar" aria-hidden="true">
        {works.map((item, index) => (
          <span
            className={index === activeIndex % realWorkCount ? "is-active" : ""}
            key={item.id}
          />
        ))}
      </div>

      <button
        aria-label="上一个朝代"
        className="dynasty-carousel-nav dynasty-carousel-nav-left"
        disabled={!hasPreviousDynasty}
        onClick={onPreviousDynasty}
        type="button"
      >
        <ChevronLeft className="dynasty-carousel-nav-icon" size={32} strokeWidth={1.5} />
      </button>

      <div className="dynasty-card-stack" aria-label={`${dynasty.name}藻井图鉴`}>
        {items.map((item, index) => {
          const relativeIndex = (index - activeIndex + items.length) % items.length;
          const isVisible = relativeIndex < 8;
          const isActive = relativeIndex === 0;

          return (
            <div
              aria-hidden={!isVisible}
              className={`dynasty-work-slide ${isActive ? "is-active" : ""} ${
                dragStartY !== null && isActive ? "is-dragging" : ""
              }`}
              key={item.stackKey}
              onClick={(event) => {
                if (suppressClickRef.current) {
                  event.preventDefault();
                  suppressClickRef.current = false;
                }
              }}
              onMouseDown={(event) => {
                if (isActive) {
                  event.preventDefault();
                  startDrag(event.clientY);
                }
              }}
              onMouseLeave={() => {
                if (isActive && dragStartY !== null) {
                  finishDrag();
                }
              }}
              onMouseMove={(event) => {
                if (isActive) {
                  updateDrag(event.clientY);
                }
              }}
              onMouseUp={(event) => {
                if (isActive && dragStartY !== null) {
                  event.preventDefault();
                  finishDrag();
                }
              }}
              onTouchEnd={() => {
                if (isActive && dragStartY !== null) {
                  finishDrag();
                }
              }}
              onTouchMove={(event) => {
                if (isActive) {
                  updateDrag(event.touches[0].clientY);
                }
              }}
              onTouchStart={(event) => {
                if (isActive) {
                  startDrag(event.touches[0].clientY);
                }
              }}
              style={
                {
                  "--drag-offset": `${isActive ? dragOffset : 0}px`,
                  "--stack-index": relativeIndex,
                  "--stack-offset": Math.min(relativeIndex, 7),
                } as CarouselCardStyle
              }
              tabIndex={relativeIndex === 0 ? 0 : -1}
            >
              <span className="dynasty-work-image">
                <img alt={item.images.alt} draggable={false} src={item.images.thumbnail} />
              </span>
              <span className="dynasty-work-caption">
                <small>{dynasty.periodLabel}</small>
                <strong>{item.shortTitle}</strong>
                <em>{item.cave}</em>
              </span>
              <button
                aria-label={`查看${item.shortTitle}详情`}
                className="dynasty-work-detail-button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  navigate(`/work/${item.id}`);
                }}
                type="button"
              >
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          );
        })}
      </div>

      <button
        aria-label="下一个朝代"
        className="dynasty-carousel-nav dynasty-carousel-nav-right"
        disabled={!hasNextDynasty}
        onClick={onNextDynasty}
        type="button"
      >
        <ChevronRight className="dynasty-carousel-nav-icon" size={32} strokeWidth={1.5} />
      </button>

      <div className="dynasty-carousel-current">
        <p className="eyebrow">Dynasty Atlas</p>
        <h1>{dynasty.name}</h1>
        <p>{activeItem.shortTitle}</p>
      </div>
    </div>
  );
}
