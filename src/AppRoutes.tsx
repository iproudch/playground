import { Navigate, Route, Routes } from "react-router-dom";
import ApplicationLayout from "./layouts/ApplicationLayout";
import DashboardPage from "./pages/DashboardPage";
import ProjectPage from "./pages/ProjectPage";

export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route element={<ApplicationLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/project/*" element={<ProjectPage />} />
        <Route path="/library" element={<p>library content</p>} />
      </Route>
    </Routes>
  );
}
