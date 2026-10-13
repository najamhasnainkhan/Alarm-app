export type AlarmTimezone = 'local';

export interface Alarm {
  id: string;
  label: string;
  time: string; // HH:MM (24h) in the selected timezone
  timezone: AlarmTimezone;
  ringtoneId: string; // ID from the curated ringtone list
  isRinging?: boolean; // Set when this alarm is currently firing
  lastTriggeredAt?: string | null; // HH:MM of the last time this alarm fired (guards against repeat triggers within the same minute)
}
