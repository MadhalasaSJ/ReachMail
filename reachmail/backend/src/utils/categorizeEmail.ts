export function categorizeEmail(subject: string, body: string): string {
  const text = `${subject} ${body}`.toLowerCase();

  if (text.includes('meeting') || text.includes('schedule')) return 'Meeting Booked';
  if (text.includes('interested') || text.includes('let\'s talk')) return 'Interested';
  if (text.includes('not interested') || text.includes('no longer')) return 'Not Interested';
  if (text.includes('spam') || text.includes('unsubscribe')) return 'Spam';
  if (text.includes('out of office') || text.includes('ooo')) return 'Out of Office';

  return 'Not Categorized';
}
