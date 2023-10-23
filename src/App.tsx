import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import PdfViewer from "./ReactPdf";
// import Layout from "./Layout";
// import UploadFile from "./UploadFile";
// import PdfViewer from "./PdfViewer";
// import PdfViewer2 from "./PdfViewer2";

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/* <Layout /> */}
        {/* pdf.js library */}
        {/* <PdfViewer /> */}
        {/* react-pdf library */}
        {/* <PdfViewer /> */}
        {/* <UploadFile /> */}
      </div>
    </>
  );
}

export default App;
