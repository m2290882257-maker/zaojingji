import { Navigate, Route, Routes } from "react-router-dom";
import { SiteShell } from "./components/layout/SiteShell";
import { AtlasPage } from "./routes/AtlasPage";
import { IntroPage } from "./routes/IntroPage";
import { SelectedDynastyPage } from "./routes/SelectedDynastyPage";
import { WorkPage } from "./routes/WorkPage";

export default function App() {
  return (
    <SiteShell>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/atlas" element={<AtlasPage />} />
        <Route path="/atlas/:dynastyId" element={<SelectedDynastyPage />} />
        <Route path="/work/:workId" element={<WorkPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteShell>
  );
}
