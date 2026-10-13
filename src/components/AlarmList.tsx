import React from 'react';
import type { Alarm } from '../types';

interface AlarmListProps {
  alarms: Alarm[];
  onDeleteAlarm: (id: string) => void;
}

export const AlarmList: React.FC<AlarmListProps> = ({ alarms, onDeleteAlarm }) => {
  if (alarms.length === 0) {
    return null;
  }

  return (
    <ul className="alarm-list" aria-label="Scheduled alarms">
      {alarms.map((alarm) => (
        <li
          key={alarm.id}
          className={`alarm-item${alarm.isRinging ? ' alarm-item--ringing' : ''}`}
        >
          <div className="alarm-main">
            <div className="alarm-time">{alarm.time}</div>
            <div className="alarm-label">{alarm.label}</div>
          </div>
          <div className="alarm-meta">
            Local time · Ringtone: {alarm.ringtoneId}
            {alarm.isRinging && ' · Ringing now'}
          </div>
          <button
            type="button"
            className="secondary-button"
            onClick={() => onDeleteAlarm(alarm.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
