import * as PDFJS from 'pdfjs-dist';

export async function initializeWorker(): Promise<void> {
  const workerUrl = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString();
  
  PDFJS.GlobalWorkerOptions.workerSrc = workerUrl;
} 