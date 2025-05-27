export function abbreviate(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
        return text;
    }

    // Find the last space within character limit and truncate there
    const lastSpace = text.substring(0, maxLength).lastIndexOf(' ');
    if (lastSpace !== -1 && lastSpace < maxLength-3) {  // Avoid breaking in middle of a word
        return text.substring(0, lastSpace) + '...';
    } else {
        return text.substring(0, maxLength-3) + '...';
    }
}

export function levenshteinDistance(a: string, b: string): number {
    const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  
    for (let i = 0; i <= a.length; i++) {
      for (let j = 0; j <= b.length; j++) {
        if (i === 0) {
          matrix[i][j] = j;
        } else if (j === 0) {
          matrix[i][j] = i;
        } else if (a[i - 1] === b[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j], // deletion
            matrix[i][j - 1], // insertion
            matrix[i - 1][j - 1] // substitution
          ) + 1;
        }
      }
    }
  
    return matrix[a.length][b.length];
  }