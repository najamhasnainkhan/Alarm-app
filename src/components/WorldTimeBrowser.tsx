import React, { useEffect, useMemo, useState } from 'react';
import { COUNTRY_TIMEZONES } from '../data/worldTimeZones';

const formatTimeInZone = (date: Date, timeZone: string): string => {
  try {
    return new Intl.DateTimeFormat([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone,
    }).format(date);
  } catch {
    // Fallback: if the time zone ID is not supported, fall back to local time.
    return new Intl.DateTimeFormat([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  }
};

export const WorldTimeBrowser: React.FC = () => {
  const [now, setNow] = useState<Date>(new Date());
  const [query, setQuery] = useState('');

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const filteredCountries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRY_TIMEZONES;
    return COUNTRY_TIMEZONES.filter((c) =>
      c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="world-time-browser">
      <div className="world-time-header">
        <div>
          <h2>World time by country</h2>
          <p className="world-time-subtitle">
            Browse and search common countries to see their current time zones.
          </p>
        </div>
        <div className="world-time-search">
          <label className="field-label" htmlFor="world-time-search-input">
            Search country
          </label>
          <input
            id="world-time-search-input"
            type="text"
            className="field-input"
            placeholder="Start typing a country name (e.g. Japan, Brazil)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="world-time-list" aria-label="World time by country">
        {filteredCountries.map((country) => (
          <div key={country.code} className="world-time-country">
            <div className="world-time-country-header">
              <div className="world-time-country-name">{country.name}</div>
              <div className="world-time-country-code">{country.code}</div>
            </div>
            <ul className="world-time-zones">
              {country.timezones.map((tz) => (
                <li key={tz} className="world-time-zone-row">
                  <div className="world-time-zone-label">{tz}</div>
                  <div className="world-time-zone-time">{formatTimeInZone(now, tz)}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {filteredCountries.length === 0 && (
          <p className="empty-state">No matching countries found.</p>
        )}
      </div>
    </div>
  );
};
