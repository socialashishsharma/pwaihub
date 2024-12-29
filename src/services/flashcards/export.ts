import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Flashcard } from '../../types/flashcard';

export async function exportAsImage(flashcard: Flashcard): Promise<void> {
  // Create a temporary div to render the flashcard
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = `
    <div style="padding: 20px; background: white; width: 600px;">
      <h3 style="font-size: 24px; margin-bottom: 16px;">${flashcard.front}</h3>
      <div style="font-size: 16px;">${flashcard.back}</div>
    </div>
  `;
  document.body.appendChild(tempDiv);

  try {
    const canvas = await html2canvas(tempDiv);
    const link = document.createElement('a');
    link.download = `flashcard-${flashcard.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } finally {
    document.body.removeChild(tempDiv);
  }
}

export async function exportAsPDF(flashcards: Flashcard[]): Promise<void> {
  const pdf = new jsPDF();
  let currentPage = 1;

  for (const card of flashcards) {
    if (currentPage > 1) {
      pdf.addPage();
    }

    // Add front side
    pdf.setFontSize(20);
    pdf.text(card.front, 20, 20);

    // Add back side
    pdf.setFontSize(12);
    const backContent = stripHtml(card.back);
    const splitText = pdf.splitTextToSize(backContent, 170);
    pdf.text(splitText, 20, 40);

    currentPage++;
  }

  pdf.save('flashcards.pdf');
}

function stripHtml(html: string): string {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
}