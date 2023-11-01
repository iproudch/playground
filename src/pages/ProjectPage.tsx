import { Route, Routes } from "react-router-dom";
import PdfViewer from "../components/pdf/PdfViewerOverviews";

export default function ProjectPage(): JSX.Element {
  return (
    <Routes>
      <Route index element={<p>project main page</p>} />
      <Route path="/pdf" element={<PdfViewer />} />
      {/* <Route path="/projects/2" element={<p>2 content</p>} /> */}
    </Routes>
  );
}
