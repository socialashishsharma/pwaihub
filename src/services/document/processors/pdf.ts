import * as PDFJS from 'pdfjs-dist';
import { ProcessedDocument } from '../types';
import { DocumentProcessingError } from '../errors';

let isWorkerInitialized = false;

async function initializeWorker() {
  if (!isWorkerInitialized) {
    const workerUrl = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url
    ).toString();
    PDFJS.GlobalWorkerOptions.workerSrc = workerUrl;
    isWorkerInitialized = true;
  }
}

export async function processPDF(file: File): Promise<ProcessedDocument> {
  try {
    await initializeWorker();
    
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

    const content = textContents.join('\n').trim();
    
    if (!content) {
      throw new DocumentProcessingError('No text content found in PDF');
    }

    return {
      content,
      metadata: {
        fileName: file.name,
        fileType: file.type as any,
        fileSize: file.size,
        pageCount: pdf.numPages
      }
    };
  } catch (error) {
    console.error('PDF Processing Error:', error);
    throw new DocumentProcessingError(
      error instanceof Error ? error.message : 'Failed to process PDF'
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