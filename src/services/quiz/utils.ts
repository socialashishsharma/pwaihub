export function chunk(items: string[], maxLength: number): string[] {
  const chunks: string[] = [];
  let currentChunk = '';

  for (const item of items) {
    if (currentChunk.length + item.length <= maxLength) {
      currentChunk += (currentChunk ? '\n\n' : '') + item;
    } else {
      if (currentChunk) chunks.push(currentChunk);
      currentChunk = item;
    }
  }

  if (currentChunk) chunks.push(currentChunk);
  return chunks;
}