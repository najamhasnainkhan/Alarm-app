import React, { useEffect, useState } from 'react';
import { ClockDisplay } from './components/ClockDisplay';
import { AlarmForm } from './components/AlarmForm';
import { AlarmList } from './components/AlarmList';
import { WorldTimeBrowser } from './components/WorldTimeBrowser';
import type { Alarm } from './types';
import { useRingtonePlayer } from './hooks/useRingtonePlayer';

const getNowHHMM = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const App: React.FC = () => {
  const SNOOZE_MINUTES = 5;

  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const { play, stop, isPlaying, currentRingtoneId } = useRingtonePlayer();

  const handleAddAlarm = (alarm: Alarm) => {
    setAlarms((prev) => [...prev, alarm]);
  };

  const handleDeleteAlarm = (id: string) => {
    setAlarms((prev) => prev.filter((a) => a.id !== id));
  };

  // Check alarms every second and trigger when time matches.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAlarms((prev) => {
        const nowHHMM = getNowHHMM();
        let updated = prev;

        prev.forEach((alarm, index) => {
          const shouldTrigger = alarm.time === nowHHMM && alarm.lastTriggeredAt !== nowHHMM;

          if (shouldTrigger && !alarm.isRinging) {
            // Mark alarm as ringing and start the ringtone.
            if (updated === prev) {
              updated = [...prev];
            }
            updated[index] = { ...alarm, isRinging: true, lastTriggeredAt: nowHHMM };
            play(alarm.ringtoneId);
          }
        });

        return updated;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [play]);

  const handleStopRinging = () => {
    stop();
    setAlarms((prev) => prev.map((a) => (a.isRinging ? { ...a, isRinging: false } : a)));
  };

  const handleSnooze = () => {
    // Stop current sound and reschedule any ringing alarms a few minutes into the future.
    stop();

    setAlarms((prev) => {
      const now = new Date();
      const snoozedDate = new Date(now.getTime() + SNOOZE_MINUTES * 60 * 1000);
      const hours = String(snoozedDate.getHours()).padStart(2, '0');
      const minutes = String(snoozedDate.getMinutes()).padStart(2, '0');
      const snoozedTime = `${hours}:${minutes}`;

      return prev.map((alarm) => {
        if (!alarm.isRinging) return alarm;
        return {
          ...alarm,
          isRinging: false,
          time: snoozedTime,
          // Clear lastTriggeredAt so the snoozed time can fire later.
          lastTriggeredAt: null,
        };
      });
    });
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Simple Alarm Clock</h1>
        <p className="app-subtitle">Phase 5: Stop and snooze controls for ringing alarms</p>
      </header>

      <main className="app-main">
        <section className="card">
          <h2>Current Local Time</h2>
          <ClockDisplay />
        </section>

        <section className="card">
          <h2>Set a New Alarm</h2>
          <AlarmForm onAddAlarm={handleAddAlarm} />
        </section>

        <section className="card card-full-width">
          <WorldTimeBrowser />
        </section>

        <section className="card">
          <h2>Scheduled Alarms</h2>
          <AlarmList alarms={alarms} onDeleteAlarm={handleDeleteAlarm} />
          {alarms.length === 0 && (
            <p className="empty-state">No alarms yet. Add one above.</p>
          )}

          {isPlaying && (
            <div className="active-alarm-banner" role="status" aria-live="assertive">
              <div className="active-alarm-text">
                Alarm is ringing{currentRingtoneId ? ` (${currentRingtoneId})` : ''}. You can
                stop it or snooze for {SNOOZE_MINUTES} minutes.
              </div>
              <div className="active-alarm-actions">
                <button type="button" className="secondary-button" onClick={handleSnooze}>
                  Snooze {SNOOZE_MINUTES} min
                </button>
                <button type="button" className="primary-button" onClick={handleStopRinging}>
                  Stop alarm
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
