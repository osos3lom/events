'use client';

import { useEffect, useRef, useState } from 'react';

const EASE_OUT_EXPO = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Grace period after the animation should have finished before we force the value. */
const SETTLE_BUFFER_MS = 300;

/**
 * Counts from 0 up to `target` after mount.
 *
 * Starts at 0 on both server and client so hydration always matches, then
 * animates on the client only.
 *
 * requestAnimationFrame does not fire while a tab is backgrounded or otherwise
 * not compositing, which would strand the counter at 0 — and "0 places remain"
 * is a materially wrong claim, not just a missed animation. A timer guarantees
 * the true value lands regardless of whether a single frame was ever painted.
 */
export function useCountUp(target: number, durationMs = 1600, enabled = true): number {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number | null>(null);
  const settleRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      setValue(Math.round(EASE_OUT_EXPO(progress) * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    settleRef.current = window.setTimeout(() => setValue(target), durationMs + SETTLE_BUFFER_MS);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      if (settleRef.current !== null) window.clearTimeout(settleRef.current);
    };
  }, [target, durationMs, enabled]);

  // Derived rather than stored, so a reduced-motion visitor never needs a render pass.
  return enabled ? value : target;
}
