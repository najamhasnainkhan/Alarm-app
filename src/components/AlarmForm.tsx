import React, { useState } from 'react';
import type { Alarm } from '../types';
import { RINGTONES } from '../data/ringtones';

interface AlarmFormProps {
  onAddAlarm: (alarm: Alarm) => void;
}

export const AlarmForm: React.FC<AlarmFormProps> = ({ onAddAlarm }) => {
  const [time, setTime] = useState<string>('');
  const [label, setLabel] = useState<string>('');
  const [ringtoneId, setRingtoneId] = useState<string>(RINGTONES[0]?.id ?? '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!time || !ringtoneId) return;

    const trimmedLabel = label.trim();

    const newAlarm: Alarm = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      time,
      label: trimmedLabel || 'Alarm',
      timezone: 'local',
      ringtoneId,
    };

    onAddAlarm(newAlarm);
    setTime('');
    setLabel('');
    setRingtoneId(RINGTONES[0]?.id ?? '');
  };

  return (
    <form className="alarm-form" onSubmit={handleSubmit}>
      <div className="field-group">
        <label className="field-label" htmlFor="alarm-time">
          Time
        </label>
        <input
          id="alarm-time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="field-input"
        />
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="alarm-label">
          Label (optional)
        </label>
        <input
          id="alarm-label"
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Morning alarm"
          className="field-input"
        />
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="alarm-timezone">
          Time zone
        </label>
        <select
          id="alarm-timezone"
          value="local"
          disabled
          className="field-input"
        >
          <option value="local">Local time only</option>
        </select>
        <p className="field-help">
          World-time-aware alarms will be added in a later phase.
        </p>
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="alarm-ringtone">
          Ringtone
        </label>
        <select
          id="alarm-ringtone"
          className="field-input"
          value={ringtoneId}
          onChange={(e) => setRingtoneId(e.target.value)}
        >
          {RINGTONES.map((tone) => (
            <option key={tone.id} value={tone.id}>
              {tone.name} 
            </option>
          ))}
        </select>
        <p className="field-help">
          Choose from a small curated list of alarm sounds.
        </p>
      </div>

      <button type="submit" className="primary-button">
        Add alarm
      </button>
    </form>
  );
};
