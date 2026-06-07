import { Routes, Route } from "react-router-dom";
import SpecList from "./pages/SpecList";
import SpecShow from "./pages/SpecShow";
import SpecCreate from "./components/SpecCreate";
import SpecEdit from "./pages/SpecEdit";
import PageNotFound from "./pages/PageNotFound";
import HomePage from "./pages/homePage";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./pages/ProjectsPage";
import SpecLibrary from "./pages/SpecLibrary";



function AppRoutes() {
  return (
    <Routes>
      
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/library" element={<SpecLibrary />} />
      <Route path="/projects-page" element={<ProjectsPage />} />
      <Route path="/specs" element={<SpecList />} />
      <Route path="/specs/new" element={<SpecCreate />} />
      <Route path="/specs/:SpecId" element={<SpecShow />} />
      <Route path="/specs/:SpecId/edit" element={<SpecEdit />} />
      <Route path="*" element={<PageNotFound />} />
      
    </Routes>
  );
}

export default AppRoutes;