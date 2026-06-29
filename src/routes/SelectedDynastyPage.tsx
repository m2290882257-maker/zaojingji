import { Link, useNavigate, useParams } from "react-router-dom";
import { DynastyWorkCarousel } from "../components/atlas/DynastyWorkCarousel";
import { dynasties } from "../data/dynasties";
import { getDynastyById } from "../utils/getDynastyById";
import { getWorksByDynasty } from "../utils/getWorksByDynasty";

export function SelectedDynastyPage() {
  const { dynastyId } = useParams();
  const navigate = useNavigate();
  const dynasty = dynastyId ? getDynastyById(dynastyId) : null;
  const works = dynastyId ? getWorksByDynasty(dynastyId) : [];
  const orderedDynasties = [...dynasties].sort((a, b) => a.order - b.order);
  const dynastyIndex = dynasty
    ? orderedDynasties.findIndex((item) => item.id === dynasty.id)
    : -1;
  const previousDynasty =
    dynastyIndex > 0 ? orderedDynasties[dynastyIndex - 1] : null;
  const nextDynasty =
    dynastyIndex >= 0 && dynastyIndex < orderedDynasties.length - 1
      ? orderedDynasties[dynastyIndex + 1]
      : null;

  if (!dynasty) {
    return (
      <section className="page-section animate-fade-in">
        <div className="page-panel page-panel-narrow">
          <p className="eyebrow">Dynasty Atlas</p>
          <h1>未知朝代</h1>
          <p className="lead">当前朝代条目不存在，请返回总览重新选择。</p>
          <Link className="action-link action-link-muted" to="/atlas">
            返回总览
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="selected-dynasty-stage animate-fade-in">
      <DynastyWorkCarousel
        dynasty={dynasty}
        hasNextDynasty={Boolean(nextDynasty)}
        hasPreviousDynasty={Boolean(previousDynasty)}
        onNextDynasty={() => {
          if (nextDynasty) {
            navigate(`/atlas/${nextDynasty.id}`);
          }
        }}
        onPreviousDynasty={() => {
          if (previousDynasty) {
            navigate(`/atlas/${previousDynasty.id}`);
          }
        }}
        works={works}
      />
    </section>
  );
}
