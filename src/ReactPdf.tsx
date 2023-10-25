import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Document, Outline, Page, Thumbnail, pdfjs } from "react-pdf";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { type PDFDocumentProxy } from "pdfjs-dist";
import styled from "styled-components";
import clsx from "clsx";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

type PdfViewerProps = {
  file?: Uint8Array;
};
export default function PdfViewer(props: PdfViewerProps): JSX.Element {
  const { file } = props;
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
  const [pageNumber, setPageNumber] = useState<number | undefined>(undefined);
  const [pageScale, setPageScale] = useState(1);
  const [manualZoom, setManualZoom] = useState<boolean>(false);

  const zoomIn = () => {
    if (pageScale < 3) setPageScale(pageScale + 0.2);
  };

  const zoomOut = () => {
    if (pageScale > 0.3) setPageScale(pageScale - 0.2);
  };

  useEffect(() => {
    if (pageScale !== 1) setManualZoom(true);
  }, [pageScale]);

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  const onDocumentLoadSuccess = useCallback(
    ({ numPages: nextNumPages }: PDFDocumentProxy) => {
      setTotalPages(nextNumPages);
      setPageNumber(pageNumber ?? 1);
    },
    [pageNumber]
  );

  const previousPage = () => {
    if (pageNumber && pageNumber > 1) handlePageChange(pageNumber - 1);
  };

  const nextPage = () => {
    if (pageNumber && totalPages && pageNumber < totalPages)
      handlePageChange(pageNumber + 1);
  };

  const PDFDocument = useMemo(() => {
    <Document
      file="sample.pdf"
      onLoadSuccess={onDocumentLoadSuccess}
      options={{ withCredentials: true }}
      error="Error occurs during fetch document."
    >
      <Page pageNumber={pageNumber} />
      <ThumbnailContainer>
        {Array.from(new Array(totalPages), (el, index) => (
          <Thumbnail
            key={index}
            pageNumber={pageNumber}
            onItemClick={() => handlePageChange(index + 1)}
          />
        ))}
      </ThumbnailContainer>
    </Document>;
  }, [onDocumentLoadSuccess, pageNumber, totalPages]);

  return (
    <PDFViewerContainer>
      <ZoomActions className="zoom">
        <button onClick={zoomIn} disabled={pageScale >= 3}>
          Zoom +
        </button>
        <button onClick={zoomOut} disabled={pageScale <= 0.3}>
          Zoom -
        </button>
      </ZoomActions>
      <PdfContainer
        className={clsx({
          defaultScale: !manualZoom,
        })}
      >
        <Document
          file="sample.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          options={{ withCredentials: true }}
          error="Error occurs during fetch document."
        >
          <Page pageNumber={pageNumber} />
          <ThumbnailContainer>
            {Array.from(new Array(totalPages), (el, index) => (
              <Thumbnail
                key={index}
                pageNumber={pageNumber}
                onItemClick={() => handlePageChange(index + 1)}
              />
            ))}
          </ThumbnailContainer>
        </Document>
      </PdfContainer>

      <Pagination className="pagination">
        <button onClick={previousPage}>{"<"}</button>
        <span>
          {pageNumber} of {totalPages}
        </span>
        <button onClick={nextPage}>{">"}</button>
      </Pagination>
    </PDFViewerContainer>
  );
}

const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: center;
    align-items: center;
}
`;
const PDFViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const ZoomActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  z-index: 10;
  flex-direction: column;
  gap: 8px;
  background: transparent;
  height: 100%;
`;

const PdfContainer = styled.div`
  width: 100%;
  margin: 0;
  border: none;
  position: relative;
  display: block;
  .react-pdf__Page__canvas {
    display: flex;
    user-select: none;
    width: 99% !important;
    height: auto !important;
  }

  &.defaultScale {
    // .react-pdf__Page__canvas {
    //   display: flex;
    //   user-select: none;
    //   width: 99% !important;
    //   height: auto !important;
    // }

    .react-pdf__Page__textContent {
      width: 100% !important;
      height: auto !important;
    }
  }

  .react-pdf__Page {
    display: flex;
    margin-left: 104px;
    justify-content: center;
    align-items: center;
  }

  .react-pdf__Thumbnail__page__canvas {
    border-radius: 2px;
    border: 1px solid grey;
    width: 80px !important;
    height: auto !important;
  }

  &.isLoading {
    display: none;
  }

  body {
    background-color: white;
  }
`;
