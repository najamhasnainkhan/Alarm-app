export interface Ringtone {
  id: string;
  name: string;
  description: string;
}

// Curated small set of distinct alarm ringtones.
export const RINGTONES: Ringtone[] = [
  {
    id: 'bright-chime',
    name: 'Bright Chime',
    description: 'Short, crisp chimes ideal for light sleepers.',
  },
  {
    id: 'gentle-waves',
    name: 'Gentle Waves',
    description: 'Soft ocean-style waves that fade in smoothly.',
  },
  {
    id: 'digital-beeps',
    name: 'Digital Beeps',
    description: 'Classic repeating digital alarm beeps.',
  },
  {
    id: 'morning-birds',
    name: 'Morning Birds',
    description: 'Birdsong-style chirps to ease into the day.',
  },
  {
    id: 'bold-buzzer',
    name: 'Bold Buzzer',
    description: 'Loud, attention-grabbing buzzer for heavy sleepers.',
  },
];
