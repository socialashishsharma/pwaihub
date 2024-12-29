import * as PDFJS from 'pdfjs-dist';
import { DocumentProcessingError } from '../documentProcessor';

export async function extractPDFText(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFJS.getDocument({
      data: arrayBuffer,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true
    }).promise;
    
    const textContents = await Promise.all(
      Array.from(
        { length: pdf.numPages },
        (_, i) => extractPageText(pdf, i + 1)
      )
    );
    
    return textContents.join('\n');
  } catch (error) {
    throw new DocumentProcessingError(
      `Failed to extract PDF text: ${
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