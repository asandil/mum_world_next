"use client";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// CDN worker for v10
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfModal({ pdfUrl, onClose }) {
  const [numPages, setNumPages] = useState(null);
  if (!pdfUrl) return null;

  // Convert relative path to absolute URL
  const absoluteUrl = typeof window !== "undefined"
    ? `${window.location.origin}${pdfUrl}`
    : null;

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-4 w-[95%] md:w-[80%] lg:w-[70%] max-h-[90%] overflow-auto">
        <button className="mb-4 text-red-500 font-bold" onClick={onClose}>
          Close
        </button>

        {absoluteUrl && (
          <Document file={absoluteUrl} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={Math.min(800, window.innerWidth * 0.8)}
              />
            ))}
          </Document>
        )}
      </div>
    </div>
  );
}
