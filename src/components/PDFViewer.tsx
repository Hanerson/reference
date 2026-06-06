// src/components/PDFViewer.tsx
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
    fileUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
    const [numPages, setNumPages] = useState<number | null>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <div className="flex flex-col items-center">
            <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className="text-sm text-gray-400 py-20">
                        加载中...
                    </div>
                }
                error={
                    <div className="text-sm text-red-500 py-10">
                        加载失败
                    </div>
                }
                className="flex flex-col gap-4 w-full items-center"
            >
                {Array.from(new Array(numPages), (_, index) => (
                    <div
                        key={`page_${index + 1}`}
                        className="w-full flex flex-col items-center"
                    >
                        <div className="border border-gray-200">
                            <Page
                                pageNumber={index + 1}
                                width={Math.min(window.innerWidth - 64, 960)}
                                renderAnnotationLayer={true}
                                renderTextLayer={true}
                            />
                        </div>
                    </div>
                ))}
            </Document>
        </div>
    );
};

export default PDFViewer;