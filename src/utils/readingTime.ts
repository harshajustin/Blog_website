export function calculateReadingTime(content: string): number {
  // Average reading speed (words per minute)
  const wordsPerMinute = 200;
  
  // Count words in content
  const words = content.trim().split(/\s+/).length;
  
  // Calculate reading time in minutes
  const readingTime = Math.ceil(words / wordsPerMinute);
  
  // Return at least 1 minute
  return Math.max(1, readingTime);
}