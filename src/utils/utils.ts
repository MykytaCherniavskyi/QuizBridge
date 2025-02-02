const quizletUrlPattern = /^https?:\/\/(?:www\.)?quizlet\.com(?:\/[a-zA-Z]{2})?\/(\d+)(?:[^\s]*)?$/;

// Utility function to extract Quizlet set ID from URL
export function extractQuizletSetId(url: string): string | null {
  const match = url.match(quizletUrlPattern);

  if (match && match[1]) {
    return match[1];
  }
  return null;
}

// Function to wait for a specified time
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));