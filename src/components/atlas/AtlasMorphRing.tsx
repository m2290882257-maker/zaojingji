import { motion } from "motion/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { OverviewImageSlot } from "../../data/overviewImages";

type AtlasMorphRingProps = {
  images: OverviewImageSlot[];
  onSelect: () => void;
};

type ContainerSize = {
  width: number;
  height: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const getInitialOffset = (index: number) => {
  const row = index % 5;
  const column = index % 7;

  return {
    x: (column - 3) * 42,
    y: (row - 2) * 24,
    rotate: (index % 2 === 0 ? -1 : 1) * (8 + (index % 4) * 2),
  };
};

export function AtlasMorphRing({ images, onSelect }: AtlasMorphRingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<ContainerSize>({
    width: 960,
    height: 720,
  });
  const [scrollRotation, setScrollRotation] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const element = containerRef.current;
    const syncSize = () => {
      setContainerSize({
        width: element.offsetWidth,
        height: element.offsetHeight,
      });
    };

    syncSize();
    const observer = new ResizeObserver(syncSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const cardTargets = useMemo(() => {
    const total = images.length;
    const isCompact = containerSize.width < 760;
    const radius = Math.min(
      containerSize.width * (isCompact ? 0.42 : 0.38),
      containerSize.height * (isCompact ? 0.38 : 0.47),
      isCompact ? 260 : 410,
    );
    const centerLift = isCompact ? -18 : -4;

    return images.map((image, index) => {
      const angle = (index / total) * 360 + scrollRotation;
      const radians = (angle * Math.PI) / 180;
      const initial = getInitialOffset(index);

      return {
        image,
        x: Math.cos(radians) * radius + mouseOffset.x + initial.x * 0.08,
        y: Math.sin(radians) * radius + centerLift + mouseOffset.y + initial.y * 0.08,
        rotate: angle + 90 + initial.rotate * 0.14,
        scale: isCompact ? 0.9 : 1,
      };
    });
  }, [containerSize, images, mouseOffset, scrollRotation]);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 0) {
      setScrollRotation((current) => current - clamp(event.deltaY * 0.055, 4, 18));
      return;
    }

    setScrollRotation((current) => current + clamp(Math.abs(event.deltaY) * 0.045, 3, 14));
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 34;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;
    setMouseOffset({ x, y });
  };

  return (
    <div
      className="atlas-morph-ring"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouseOffset({ x: 0, y: 0 })}
      onWheel={handleWheel}
      ref={containerRef}
    >
      <div className="atlas-morph-orbit" aria-hidden="true" />
      <div className="atlas-morph-center">
        <p>Atlas Overview</p>
        <strong>藻井总览</strong>
      </div>

      {cardTargets.map(({ image, x, y, rotate, scale }) => (
        <motion.button
          animate={{ opacity: 1, x, y, rotate, scale }}
          className="atlas-ring-card"
          initial={{ opacity: 0, scale: 0.58, x: 0, y: 0, rotate: 0 }}
          key={image.id}
          onClick={onSelect}
          title={`${image.periodLabel} · ${image.title}`}
          transition={{ type: "spring", stiffness: 56, damping: 18 }}
          type="button"
        >
          <span className="atlas-ring-card-inner">
            <span className="atlas-ring-image">
              <img alt={image.alt} loading="lazy" src={image.imagePath} />
            </span>
            <span className="atlas-ring-card-copy">
              <small>{String(image.index).padStart(2, "0")}</small>
              <strong>{image.title}</strong>
              <em>{image.periodLabel}</em>
            </span>
          </span>
        </motion.button>
      ))}
    </div>
  );
}
