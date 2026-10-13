# Simple Web Alarm Clock (Phase 4)

This is Phase 4 of a simple web-based alarm clock built with React and TypeScript.

Phase 4 adds **alarm trigger and notification** on top of the earlier phases.

Core so far:

- Current **local time** display, updating every second.
- Basic **alarm setup**: add one or more alarms with a time and optional label.
- Local-time-only alarms for now (world time-aware alarms will come in a later phase).

New in this phase:

- **Curated ringtones**: a small set of 5 distinct alarm sounds (by name and description).
- **Ringtone selection when creating an alarm**.
- **Actual ringtone playback** when an alarm time is reached, using simple synthesized tones.
- **Visual highlighting** of any alarm that is currently ringing.
- **On-screen banner** letting you stop the ringing alarm.

World time (from Phase 2):

- **World time browser**: scrollable list of countries, each showing its main time zones and the current time in each.
- **Country search**: filter the list by typing part of the country name or its 2-letter code.

## Features in this phase

- Prominent live clock using your browser's local time.
- Add alarms using a time picker, plus a free-text label.
- Choose a ringtone from a curated list when adding an alarm.
- View scheduled alarms with their associated ringtone.
- Remove alarms as needed.
- Browse and search world times by country.
- When an alarm time is reached:
  - Its row in the list is visually highlighted.
  - A banner appears with a **Stop alarm** button.
  - A simple synthesized ringtone pattern plays in a loop until you stop it.

> Note: Snooze controls will be added in a later phase.

## Tech stack

- React 18
- TypeScript
- Vite

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173) in your browser.

## Data persistence

In this phase, alarms are kept only in the browser's memory. Reloading the page will clear them. A future phase can add localStorage or a real database if needed.

## Audio behaviour and browser limitations

- The app uses the Web Audio API to synthesize simple tones for ringtones.
- Many browsers require **user interaction** (like clicking anywhere on the page) before audio can play. If an alarm seems silent, click once in the page area; subsequent alarms should play correctly.
- There is no volume control yet; use your system volume for adjustments.
