import { Navigate, Route, Routes } from "react-router-dom";
import ApplicationLayout from "./layouts/ApplicationLayout";
import ColorExample from "./ColorExample";
import Dashboard from "./pages/Dashboard";

export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route element={<ApplicationLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<ColorExample />} />
        <Route path="/library" element={<p>library content</p>} />
      </Route>
    </Routes>
  );
}
