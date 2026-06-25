import { Link, useParams } from "react-router-dom";
import { getWorkById } from "../utils/getWorkById";

export function WorkPage() {
  const { workId } = useParams();
  const work = workId ? getWorkById(workId) : null;

  if (!work) {
    return (
      <section className="page-section animate-fade-in">
        <div className="page-panel">
          <p className="eyebrow">Work Detail</p>
          <h1>未知作品</h1>
          <p className="lead">当前作品条目不存在，请返回朝代图鉴重新选择。</p>
          <Link className="action-link action-link-muted" to="/atlas?view=dynasty-index">
            返回朝代图鉴
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section animate-fade-in">
      <div className="work-detail-panel">
        <div className="work-detail-image">
          <img alt={work.images.alt} src={work.images.original} />
        </div>
        <div className="work-detail-copy">
          <p className="eyebrow">Work Detail</p>
          <h1>{work.shortTitle}</h1>
          <p className="lead">{work.oneLineSummary}</p>
          <dl className="work-meta-list">
            <div>
              <dt>朝代</dt>
              <dd>{work.periodLabel}</dd>
            </div>
            <div>
              <dt>洞窟</dt>
              <dd>{work.cave}</dd>
            </div>
            <div>
              <dt>地点</dt>
              <dd>{work.location}</dd>
            </div>
          </dl>
          <div className="dynasty-keywords">
            {work.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <Link className="action-link action-link-muted" to={`/atlas/${work.dynastyId}`}>
            返回朝代图鉴
          </Link>
        </div>
      </div>
    </section>
  );
}
