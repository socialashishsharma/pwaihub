export class TextSanitizer {
  static sanitize(text: string): string {
    return text
      // Remove special characters and control characters
      .replace(/[\x00-\x1F\x7F-\x9F]/g, '')
      // Replace multiple spaces with single space
      .replace(/\s+/g, ' ')
      // Remove non-printable characters
      .replace(/[^\x20-\x7E\s]/g, '')
      // Trim whitespace
      .trim();
  }

  static validateText(text: string): string | null {
    const sanitized = this.sanitize(text);
    
    // Check if text is too short
    if (sanitized.length < 10) {
      return 'Text is too short for processing';
    }

    // Check if text contains mostly gibberish
    const wordPattern = /\b\w{2,}\b/g;
    const words = sanitized.match(wordPattern) || [];
    if (words.length < 5) {
      return 'Text appears to be invalid or contains insufficient content';
    }

    return null;
  }
}