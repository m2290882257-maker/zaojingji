type GestureHintProps = {
  progress: number;
};

export function GestureHint({ progress }: GestureHintProps) {
  return (
    <div className="gesture-hint" style={{ opacity: 1 - progress * 0.85 }}>
      <span className="gesture-hint-line" aria-hidden="true" />
      <span>向下滑动，进入藻井图鉴</span>
    </div>
  );
}
