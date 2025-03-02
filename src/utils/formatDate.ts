import { format, formatDistanceToNow } from 'date-fns';

export function formatDate(dateString: string, formatString: string = 'MMMM dd, yyyy'): string {
  const date = new Date(dateString);
  return format(date, formatString);
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}