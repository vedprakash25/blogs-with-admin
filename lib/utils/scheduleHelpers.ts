export function isValidScheduleDate(date: Date): boolean {
  return date > new Date()
}

export function formatScheduleDate(date: Date): string {
  return date.toISOString()
}

export function isScheduledAndDue(scheduledAt: string): boolean {
  return new Date(scheduledAt) <= new Date()
}
