import { useEffect, useRef, useState } from 'react';

/**
 * Simple Web Audio based ringtone player.
 * For this phase we synthesize basic tones with different patterns
 * instead of loading external audio files.
 */
export type RingtoneId = string;

interface UseRingtonePlayerResult {
  play: (ringtoneId: RingtoneId) => void;
  stop: () => void;
  isPlaying: boolean;
  currentRingtoneId: RingtoneId | null;
}

export function useRingtonePlayer(): UseRingtonePlayerResult {
  const audioContextRef = useRef<AudioContext | null>(null);
  const stopFnsRef = useRef<(() => void) | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRingtoneId, setCurrentRingtoneId] = useState<RingtoneId | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      stopInternal();
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOrCreateContext = () => {
    if (audioContextRef.current) return audioContextRef.current;
    try {
      const Ctor = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext | undefined;
      if (!Ctor) return null;
      const ctx = new Ctor();
      audioContextRef.current = ctx;
      return ctx;
    } catch {
      return null;
    }
  };

  const stopInternal = () => {
    if (stopFnsRef.current) {
      stopFnsRef.current();
      stopFnsRef.current = null;
    }
    setIsPlaying(false);
    setCurrentRingtoneId(null);
  };

  const play = (ringtoneId: RingtoneId) => {
    const ctx = getOrCreateContext();
    if (!ctx) {
      // Audio not supported or blocked.
      return;
    }

    stopInternal();

    // Ensure context is running (required by some browsers)
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {
        /* ignored */
      });
    }

    const stop = startPatternForRingtone(ctx, ringtoneId);
    stopFnsRef.current = stop;
    setIsPlaying(true);
    setCurrentRingtoneId(ringtoneId);
  };

  const stop = () => {
    stopInternal();
  };

  return { play, stop, isPlaying, currentRingtoneId };
}

function startPatternForRingtone(ctx: AudioContext, ringtoneId: RingtoneId): () => void {
  switch (ringtoneId) {
    case 'bright-chime':
      return playChimePattern(ctx);
    case 'gentle-waves':
      return playWavesPattern(ctx);
    case 'digital-beeps':
      return playDigitalBeeps(ctx);
    case 'morning-birds':
      return playBirdsPattern(ctx);
    case 'bold-buzzer':
      return playBuzzerPattern(ctx);
    default:
      return playDigitalBeeps(ctx);
  }
}

// Patterns implement their own looping behaviour and return a stop function.

function playChimePattern(ctx: AudioContext): () => void {
  let stopped = false;

  const schedule = () => {
    if (stopped) return;
    const now = ctx.currentTime;
    const baseFreq = 880;

    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = baseFreq * (1 + i * 0.12);
      gain.gain.value = 0.0;
      gain.gain.linearRampToValueAtTime(0.5, now + 0.05 + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45 + i * 0.15);

      osc.connect(gain).connect(ctx.destination);
      osc.start(now + i * 0.15);
      osc.stop(now + 0.6 + i * 0.15);
    }

    setTimeout(schedule, 1200);
  };

  schedule();

  return () => {
    stopped = true;
  };
}

function playWavesPattern(ctx: AudioContext): () => void {
  let stopped = false;

  const schedule = () => {
    if (stopped) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(260, now + 2.5);
    gain.gain.setValueAtTime(0.0, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 1.2);
    gain.gain.linearRampToValueAtTime(0.05, now + 3);

    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 3.1);

    setTimeout(schedule, 3200);
  };

  schedule();

  return () => {
    stopped = true;
  };
}

function playDigitalBeeps(ctx: AudioContext): () => void {
  let stopped = false;

  const schedule = () => {
    if (stopped) return;
    const now = ctx.currentTime;

    for (let i = 0; i < 4; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = 1200;
      gain.gain.setValueAtTime(0, now + i * 0.25);
      gain.gain.linearRampToValueAtTime(0.6, now + i * 0.25 + 0.02);
      gain.gain.linearRampToValueAtTime(0.0, now + i * 0.25 + 0.18);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + i * 0.25);
      osc.stop(now + i * 0.25 + 0.2);
    }

    setTimeout(schedule, 1400);
  };

  schedule();

  return () => {
    stopped = true;
  };
}

function playBirdsPattern(ctx: AudioContext): () => void {
  let stopped = false;

  const schedule = () => {
    if (stopped) return;
    const now = ctx.currentTime;

    const chirp = (startOffset: number, freq: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + startOffset);
      osc.frequency.linearRampToValueAtTime(freq + 600, now + startOffset + 0.18);
      gain.gain.setValueAtTime(0, now + startOffset);
      gain.gain.linearRampToValueAtTime(0.4, now + startOffset + 0.05);
      gain.gain.linearRampToValueAtTime(0.0, now + startOffset + 0.25);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + startOffset);
      osc.stop(now + startOffset + 0.3);
    };

    chirp(0, 1400);
    chirp(0.35, 1100);
    chirp(0.7, 1600);

    setTimeout(schedule, 1700);
  };

  schedule();

  return () => {
    stopped = true;
  };
}

function playBuzzerPattern(ctx: AudioContext): () => void {
  let stopped = false;

  const schedule = () => {
    if (stopped) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 400;
    gain.gain.setValueAtTime(0.0, now);
    gain.gain.linearRampToValueAtTime(0.7, now + 0.05);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.4);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);

    setTimeout(schedule, 600);
  };

  schedule();

  return () => {
    stopped = true;
  };
}
