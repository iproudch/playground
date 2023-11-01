import { useState } from "react";
import { Title } from "../../styles/styles";
import ReactPdfViewer from "./ReactPdf";
import PdfJsViewer from "./PdfJsViewer";
import styled from "styled-components";
import clsx from "clsx";

export enum EPdfLibrary {
  REACT_PDF = "react-pdf",
  PDF_JS = "pdf-js",
}

export default function PdfViewer(): JSX.Element {
  const [pdfLibrary, setPdfLibrary] = useState<EPdfLibrary>(
    EPdfLibrary.REACT_PDF
  );

  return (
    <PDFViewerContainer>
      <div>
        <Title>PDF Viewer</Title>
        <div>
          This is basic example of how we render pdf in react <br />
          <PDFOptions>
            <Chip
              className={clsx({ active: pdfLibrary === EPdfLibrary.REACT_PDF })}
              onClick={() => setPdfLibrary(EPdfLibrary.REACT_PDF)}
            >
              react-pdf
            </Chip>
            <br />
            <Chip
              className={clsx({ active: pdfLibrary === EPdfLibrary.PDF_JS })}
              onClick={() => setPdfLibrary(EPdfLibrary.PDF_JS)}
            >
              pdf-js
            </Chip>
          </PDFOptions>
        </div>
      </div>
      {pdfLibrary === EPdfLibrary.REACT_PDF ? (
        <ReactPdfViewer />
      ) : pdfLibrary === EPdfLibrary.PDF_JS ? (
        <PdfJsViewer />
      ) : null}
    </PDFViewerContainer>
  );
}

const PDFViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PDFOptions = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
`;

const Chip = styled.div`
  display: inline-block;
  padding: 4px;
  font-size: 14px;
  line-height: 1;
  border-radius: 4px;
  background-color: #e2e8f0;
  &.active {
    background-color: #9aeccd;
  }
  cursor: pointer;
`;
