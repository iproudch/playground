import React, { useEffect, useRef, useState } from "react";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";
import "pdfjs-dist/build/pdf.worker.entry";
import { GlobalWorkerOptions, getDocument, version } from "pdfjs-dist";
GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${version}/legacy/build/pdf.worker.min.js`;

export default function PdfJsViewer() {
  const canvasRefs = useRef<Array<React.RefObject<HTMLCanvasElement>>>([]);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event?.target?.files?.length) return;
    const file = event.target.files[0];

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await getDocument({ data: arrayBuffer }).promise;
      setPdfDoc(pdfDoc);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error loading PDF:", error);
    }
  };

  useEffect(() => {
    if (!pdfDoc) return;

    const renderPage = async (pageNumber: number) => {
      try {
        const page = await pdfDoc.getPage(pageNumber);

        const canvas = canvasRefs.current[pageNumber - 1].current;
        const context = canvas?.getContext("2d");

        const viewport = page.getViewport({ scale: 1 });

        if (!canvas || !context) return;
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
      } catch (error) {
        console.error("Error rendering PDF page:", error);
      }
    };

    renderPage(currentPage);
  }, [pdfDoc, currentPage]);

  const nextPage = () => {
    if (pdfDoc && currentPage < pdfDoc.numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderAllPages = () => {
    const pages = [];
    for (let i = 1; i <= (pdfDoc ? pdfDoc.numPages : 0); i++) {
      canvasRefs.current[i - 1] = React.createRef<HTMLCanvasElement>();
      pages.push(
        <div key={i}>
          <canvas ref={canvasRefs.current[i - 1]}></canvas>
        </div>
      );
    }
    return pages;
  };

  return (
    <>
      <input
        type="file"
        accept=".pdf, .jpg, .png"
        onChange={(e) => handleFileSelect(e)}
      />
      {pdfDoc && (
        <div>
          {renderAllPages()}
          <div>
            <button onClick={prevPage}>Previous Page</button>
            <span>
              Page {currentPage} of {pdfDoc.numPages}
            </span>
            <button onClick={nextPage}>Next Page</button>
          </div>
        </div>
      )}
    </>
  );
}
