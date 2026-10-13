import React, { useEffect, useState } from 'react';

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const ClockDisplay: React.FC = () => {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="clock-display" aria-label="Current local time">
      <div className="clock-time">{formatTime(now)}</div>
      <div className="clock-meta">Local time</div>
    </div>
  );
};
