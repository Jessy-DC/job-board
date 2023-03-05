export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        dateStyle: 'medium',
        timeZone: 'America/Montreal'
    });
}
