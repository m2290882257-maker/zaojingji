import { Link, useParams } from "react-router-dom";

export function WorkPage() {
  const { workId } = useParams();

  return (
    <section className="page-section animate-fade-in">
      <div className="page-panel">
        <p className="eyebrow">Round 02 / 具体藻井介绍</p>
        <h1>{workId ?? "unknown-work"}</h1>
        <p className="lead">
          这里将承载概览、投影、色彩、结构与视觉基因卡。本轮只为详情页建立基础视觉语言。
        </p>
        <div className="tab-placeholder" aria-label="详情页内部模块占位">
          <span>概览</span>
          <span>投影</span>
          <span>色彩</span>
          <span>结构</span>
          <span>视觉基因卡</span>
        </div>
        <Link className="action-link action-link-muted" to="/atlas/early-tang">
          返回朝代图鉴
        </Link>
      </div>
    </section>
  );
}
