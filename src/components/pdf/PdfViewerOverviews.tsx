import { useState } from "react";
import { Title } from "../../styles/styles";
import { PDFDocumentProxy } from "pdfjs-dist";
import ReactPdfViewer from "./ReactPdf";
import PdfJsViewer from "./PdfJsViewer";

export enum EPdfLibrary {
  REACT_PDF = "react-pdf",
  PDF_JS = "pdf-js",
}

export type PdfViewerProps = {
  file?: Uint8Array | PDFDocumentProxy;
};
export default function PdfViewer(): JSX.Element {
  const [pdfLibrary, setPdfLibrary] = useState<EPdfLibrary>(
    EPdfLibrary.REACT_PDF
  );

  return (
    <>
      <div>
        <Title>PDF Viewer</Title>
        <p>
          This is basic example of how we render pdf in react currently we have
          2 options examples <br />
          <span onClick={() => setPdfLibrary(EPdfLibrary.REACT_PDF)}>
            react-pdf
          </span>
          <br />
          <span onClick={() => setPdfLibrary(EPdfLibrary.PDF_JS)}>pdf-js </span>
        </p>
      </div>
      current library is {pdfLibrary}
      {pdfLibrary === EPdfLibrary.REACT_PDF ? (
        <ReactPdfViewer />
      ) : pdfLibrary === EPdfLibrary.PDF_JS ? (
        <PdfJsViewer />
      ) : null}
    </>
  );
}
