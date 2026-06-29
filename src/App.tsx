import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteShell } from "./components/layout/SiteShell";
import { IntroPage } from "./routes/IntroPage";
import { AtlasPage } from "./routes/AtlasPage";
import { SelectedDynastyPage } from "./routes/SelectedDynastyPage";
import { WorkPage } from "./routes/WorkPage";

export default function App() {
  return (
    <BrowserRouter>
      <SiteShell>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/atlas" element={<AtlasPage />} />
          <Route path="/atlas/:dynastyId" element={<SelectedDynastyPage />} />
          <Route path="/work/:workId" element={<WorkPage />} />
        </Routes>
      </SiteShell>
    </BrowserRouter>
  );
}
