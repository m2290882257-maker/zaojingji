type CeilingRevealProps = {
  progress: number;
};

export function CeilingReveal({ progress }: CeilingRevealProps) {
  const scale = 0.9 + progress * 0.16;
  const translateY = 48 - progress * 74;
  const opacity = 0.18 + progress * 0.74;
  const glowOpacity = 0.06 + progress * 0.18;

  return (
    <div
      className="ceiling-reveal"
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
      }}
      aria-label="逐渐呈现的藻井线稿"
      role="img"
    >
      <div
        className="ceiling-reveal-glow"
        style={{ opacity: glowOpacity }}
        aria-hidden="true"
      />
      <svg
        className="ceiling-svg"
        viewBox="0 0 720 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="82" y="82" width="556" height="556" stroke="currentColor" />
        <rect
          x="130"
          y="130"
          width="460"
          height="460"
          stroke="currentColor"
          opacity="0.62"
        />
        <rect
          x="180"
          y="180"
          width="360"
          height="360"
          stroke="currentColor"
          opacity="0.44"
        />
        <circle cx="360" cy="360" r="128" stroke="currentColor" opacity="0.7" />
        <circle cx="360" cy="360" r="66" stroke="currentColor" opacity="0.85" />
        {Array.from({ length: 12 }).map((_, index) => {
          const rotation = index * 30;
          return (
            <g
              key={rotation}
              transform={`rotate(${rotation} 360 360)`}
              opacity={index % 2 === 0 ? 0.86 : 0.56}
            >
              <path
                d="M360 206C392 244 392 276 360 314C328 276 328 244 360 206Z"
                fill="currentColor"
                fillOpacity="0.08"
                stroke="currentColor"
              />
              <path
                d="M360 136L374 180H346L360 136Z"
                fill="currentColor"
                fillOpacity="0.18"
              />
            </g>
          );
        })}
        {Array.from({ length: 8 }).map((_, index) => {
          const rotation = index * 45;
          return (
            <g key={rotation} transform={`rotate(${rotation} 360 360)`}>
              <path
                d="M360 88C386 122 386 158 360 194C334 158 334 122 360 88Z"
                stroke="currentColor"
                opacity="0.48"
              />
              <path
                d="M360 526C386 562 386 598 360 632C334 598 334 562 360 526Z"
                stroke="currentColor"
                opacity="0.32"
              />
            </g>
          );
        })}
        <path d="M82 360H638" stroke="currentColor" opacity="0.2" />
        <path d="M360 82V638" stroke="currentColor" opacity="0.2" />
        <circle cx="360" cy="360" r="18" fill="currentColor" opacity="0.62" />
      </svg>
    </div>
  );
}
