import * as PDFJS from 'pdfjs-dist';
import { DocumentProcessingError } from '../documentProcessor';

// Import worker directly
import 'pdfjs-dist/build/pdf.worker.mjs';

export async function processPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFJS.getDocument({ data: arrayBuffer }).promise;
    
    const textContents = await Promise.all(
      Array.from(
        { length: pdf.numPages },
        (_, i) => extractPageText(pdf, i + 1)
      )
    );
    
    const fullText = textContents.join('\n');
    
    if (!fullText.trim()) {
      throw new DocumentProcessingError('No text content found in PDF');
    }
    
    return fullText;
  } catch (error) {
    throw new DocumentProcessingError(
      `Failed to process PDF: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
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