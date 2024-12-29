import * as PDFJS from 'pdfjs-dist';

// Initialize PDF.js worker
export function initializePDFWorker(): void {
  const workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.mjs',
    import.meta.url
  ).toString();

  // Set worker source
  PDFJS.GlobalWorkerOptions.workerSrc = workerSrc;
}