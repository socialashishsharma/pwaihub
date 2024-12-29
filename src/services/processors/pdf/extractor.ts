import * as PDFJS from 'pdfjs-dist';
import { DocumentProcessingError } from '../../documentProcessor';

PDFJS.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export async function extractText(file: File): Promise<string> {
  try {
    const pdf = await loadPDF(file);
    const pages = await extractPages(pdf);
    return pages.join('\n');
  } catch (error) {
    handleExtractionError(error);
  }
}

async function loadPDF(file: File): Promise<PDFJS.PDFDocumentProxy> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = PDFJS.getDocument({ data: arrayBuffer });
  return loadingTask.promise;
}

async function extractPages(pdf: PDFJS.PDFDocumentProxy): Promise<string[]> {
  const pagePromises = Array.from(
    { length: pdf.numPages },
    (_, i) => extractPageText(pdf, i + 1)
  );
  return Promise.all(pagePromises);
}

async function extractPageText(
  pdf: PDFJS.PDFDocumentProxy,
  pageNumber: number
): Promise<string> {
  const page = await pdf.getPage(pageNumber);
  const textContent = await page.getTextContent();
  return textContent.items
    .map((item) => 'str' in item ? item.str : '')
    .join(' ');
}

function handleExtractionError(error: unknown): never {
  throw new DocumentProcessingError(
    `Failed to extract PDF text: ${
      error instanceof Error ? error.message : 'Unknown error'
    }`
  );
}