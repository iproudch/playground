import { Route, Routes } from "react-router-dom";

export default function ProjectPage(): JSX.Element {
  return (
    <Routes>
      <Route index element={<p>project main page</p>} />
      <Route path="/projects/pdf" element={<p>pdf content</p>} />
      {/* <Route path="/projects/2" element={<p>2 content</p>} /> */}
    </Routes>
  );
}
