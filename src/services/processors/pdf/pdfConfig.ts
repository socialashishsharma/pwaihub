import * as PDFJS from 'pdfjs-dist';

// Import worker directly from node_modules
PDFJS.GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/build/pdf.worker.min.js';

export { PDFJS }; 