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
