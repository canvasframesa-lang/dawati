'use client';

import { useSyncExternalStore } from 'react';

/**
 * Single master clock for the hero phone demo.
 *
 * Drives both the lock-screen notification stack and the floating
 * counter/message cards so they never drift. One setInterval, shared
 * via useSyncExternalStore so every subscriber re-renders on the same
 * tick.
 *
 * Phase script (each step = TICK_MS):
 *   tick 0  →  notification 1 arrives, counter +1
 *   tick 1  →  notification 2 arrives, counter +1
 *   tick 2  →  notification 3 arrives, counter +1
 *   tick 3  →  notification 4 arrives, counter +1
 *   tick 4  →  notification 5 arrives, counter +1
 *   tick 5  →  all fade out (and 1 tick of empty hold)
 *   wrap   →  cycle++, tick=0, start over
 *
 * The empty beat is intentional — without it the loop reads as a glitch.
 */

export const TOTAL_NOTIFS = 5;
export const TICK_MS = 1400;
export const COUNTER_START = 140;

const FADE_TICK = TOTAL_NOTIFS; // == 5

export type HeroState = {
  tick: number;          // 0..FADE_TICK
  cycle: number;         // monotonically increasing (re-key trigger)
  arrivedCount: number;  // how many notifications are currently visible (1..TOTAL_NOTIFS)
  isFading: boolean;     // true on the fade-out tick
  counter: number;       // RSVP confirmed count for this cycle
};

function compute(tick: number, cycle: number): HeroState {
  const isFading = tick >= FADE_TICK;
  const arrivedCount = isFading ? TOTAL_NOTIFS : Math.min(tick + 1, TOTAL_NOTIFS);
  return {
    tick,
    cycle,
    arrivedCount,
    isFading,
    counter: COUNTER_START + arrivedCount,
  };
}

let state: HeroState = compute(0, 0);
const listeners = new Set<() => void>();
let intervalId: ReturnType<typeof setInterval> | null = null;

function ensureInterval() {
  if (intervalId !== null) return;
  intervalId = setInterval(() => {
    if (state.tick >= FADE_TICK) {
      state = compute(0, state.cycle + 1);
    } else {
      state = compute(state.tick + 1, state.cycle);
    }
    listeners.forEach((l) => l());
  }, TICK_MS);
}

const serverSnapshot = compute(0, 0);

export function useHeroTick(): HeroState {
  return useSyncExternalStore(
    (cb) => {
      ensureInterval();
      listeners.add(cb);
      return () => {
        listeners.delete(cb);
      };
    },
    () => state,
    () => serverSnapshot,
  );
}
