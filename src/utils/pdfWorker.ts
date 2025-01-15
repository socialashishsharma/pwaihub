import { GlobalWorkerOptions } from 'pdfjs-dist';

// Set the worker source path
GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.js`;