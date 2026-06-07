import { Routes, Route } from "react-router-dom";
import SpecList from "./SpecList";
import SpecShow from "./SpecShow";
import SpecCreate from "./SpecCreate";
import SpecEdit from "./SpecEdit";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/specs" element={<SpecList />} />
      <Route path="/specs/new" element={<SpecCreate />} />
      <Route path="/specs/:SpecId" element={<SpecShow />} />
      <Route path="/specs/:SpecId/edit" element={<SpecEdit />} />
      <Route path="*" element={<SpecList />} />
    </Routes>
  );
}

export default AppRoutes;