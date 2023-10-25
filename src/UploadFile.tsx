import { useState } from "react";
import PdfViewer from "./ReactPdf";

export default function UploadFile(): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<Uint8Array | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files?.length) return;
    const file = event.target.files[0];

    // Create a new FileReader
    const reader = new FileReader();

    // Set up an event listener for when the file is loaded
    reader.onload = (e) => {
      const result = e?.target?.result as ArrayBuffer; // Cast to ArrayBuffer

      // Convert ArrayBuffer to Uint8Array
      const uint8Array = new Uint8Array(result);

      setSelectedFile(uint8Array);
    };

    // Read the file as an ArrayBuffer
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <input
        type="file"
        accept=".pdf, .jpg, .png"
        onChange={(e) => handleFileSelect(e)}
      />
      {selectedFile && <PdfViewer file={selectedFile} />}
    </>
  );
}
