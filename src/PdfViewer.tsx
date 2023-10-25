// import React, { useEffect, useRef, useState } from "react";

// import "pdfjs-dist/build/pdf.worker.entry";
// import {
//   GlobalWorkerOptions,
//   PDFDocumentProxy,
//   getDocument,
//   version,
//   PDFPageProxy,
// } from "pdfjs-dist";
// GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${version}/legacy/build/pdf.worker.min.js`;

// function PdfViewer() {
//   const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   const loadPdf = async (file: File) => {
//     try {
//       // Read the PDF file as a TypedArray
//       const arrayBuffer = await file.arrayBuffer();

//       const pdf = await getDocument({ data: arrayBuffer }).promise;
//       setPdfDoc(pdf);
//     } catch (error) {
//       console.error("Error loading PDF:", error);
//     }
//   };

//   //   useEffect(() => {
//   //     if (!pdfDoc) return;

//   //     const renderPage = async (pageNumber: number) => {
//   //       const page: PDFPageProxy | null = await pdfDoc.getPage(pageNumber);

//   //       if (page) {
//   //         const canvas = canvasRef.current;
//   //         const context = canvas?.getContext("2d");
//   //         const viewport = page.getViewport({ scale: 1.0 });

//   //         if (canvas && context) {
//   //           canvas.width = viewport.width;
//   //           canvas.height = viewport.height;

//   //           const renderContext = {
//   //             canvasContext: context,
//   //             viewport: viewport,
//   //           };

//   //           await page.render(renderContext).promise;
//   //         }
//   //       }
//   //     };

//   //     renderPage(currentPage);
//   //   }, [pdfDoc, currentPage]);

//   //   useEffect(() => {
//   //     if (!pdfDoc) return;

//   //     const renderPage = async (pageNumber: number) => {
//   //       const page: PDFPageProxy | null = await pdfDoc.getPage(pageNumber);

//   //       if (page) {
//   //         const canvas = canvasRef.current;
//   //         const context = canvas?.getContext("2d");
//   //         const viewport = page.getViewport({ scale: 1.0 });

//   //         if (canvas && context) {
//   //           canvas.width = viewport.width;
//   //           canvas.height = viewport.height;

//   //           const renderContext = {
//   //             canvasContext: context,
//   //             viewport: viewport,
//   //           };

//   //           await page.render(renderContext).promise;
//   //         }
//   //       }
//   //     };
//   //     renderPage(currentPage);
//   //   }, [pdfDoc, currentPage]);

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (!event?.target?.files?.length) return;
//     const file = event.target.files[0];
//     loadPdf(file);
//   };

//   const nextPage = () => {
//     if (pdfDoc && currentPage < pdfDoc.numPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept=".pdf" onChange={handleFileSelect} />
//       {pdfDoc && (
//         <div>
//           <canvas ref={canvasRef}></canvas>
//           <div>
//             <button onClick={prevPage}>Previous Page</button>
//             <span>Page {currentPage}</span>
//             <button onClick={nextPage}>Next Page</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PdfViewer;

import "pdfjs-dist/build/pdf.worker.entry";
import { GlobalWorkerOptions, getDocument, version } from "pdfjs-dist";
import { useRef, useState } from "react";
GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${version}/legacy/build/pdf.worker.min.js`;

export default function PdfViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files?.length) return;
    const file = event.target.files[0];
    setSelectedFile(file);
    renderPdf(file);
  };

  const renderPdf = async (file: File) => {
    try {
      // Read the PDF file as a TypedArray
      const arrayBuffer = await file.arrayBuffer();

      // Fetch the PDF document from the TypedArray data
      const pdfDoc = await getDocument({ data: arrayBuffer }).promise;

      // Get the first page
      const page = await pdfDoc.getPage(1);

      // Set the canvas for rendering the page
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      // Get the viewport for the page
      const viewport = page.getViewport({ scale: 1.5 });

      // Set the canvas dimensions to match the viewport
      if (!canvas || !context) return;
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Render the PDF page on the canvas
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await page.render(renderContext).promise;
    } catch (error) {
      console.error("Error rendering PDF:", error);
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".pdf, .jpg, .png"
        onChange={(e) => handleFileSelect(e)}
      />
      <canvas ref={canvasRef}></canvas>
      selectedFile: {selectedFile?.name}
    </>
  );
}
