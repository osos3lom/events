'use client';

import { useEffect, useState } from 'react';

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

const split = (msRemaining: number): Countdown => {
  const clamped = Math.max(0, msRemaining);
  const totalSeconds = Math.floor(clamped / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isPast: msRemaining <= 0,
  };
};

/**
 * Ticks down to a real calendar date.
 *
 * Returns null until mounted so the server and the first client render agree —
 * the caller renders a placeholder for that first frame. Never invents a
 * deadline: if there is no target, there is no countdown.
 */
export function useCountdown(target: Date | null): Countdown | null {
  const [remaining, setRemaining] = useState<Countdown | null>(null);

  useEffect(() => {
    if (!target) return;

    const update = () => setRemaining(split(target.getTime() - Date.now()));

    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  // Derived, so a null target never needs a state write.
  return target ? remaining : null;
}
