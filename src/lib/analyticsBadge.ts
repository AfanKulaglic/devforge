// ───────────────────────────────────────────────────────────────────────────
// "Novo od zadnjeg pregleda" — brojač nepročitanih analitičkih događaja.
//
// Ideja: admin zapamti koliko je događaja/posjeta bilo kad je ZADNJI put
// otvorio tab Analitika. Sve što je došlo poslije toga = "novo".
// Broj se prikazuje kao crveni okrugli badge na kartici "Analitika".
//
// Pamti se lokalno (localStorage) — badge je per-uređaj, jer je i pitanje
// "šta sam ja vidio" per-uređaj. Sami podaci su globalni (Firebase).
// ───────────────────────────────────────────────────────────────────────────

import { useSyncExternalStore } from "react";
import { getVisits, subscribeVisits, type Visit } from "./analytics";

const SEEN_KEY = "devforge-analytics-seen-v1";

// ── Koliko ukupno signala ima u datom skupu posjeta ───────────────────────
// Jedan signal = jedna posjeta ILI jedan događaj unutar nje. Tako novi
// posjetilac koji je kliknuo 4 stvari daje +5, a nova posjeta bez akcija +1.
function countSignals(visits: Visit[]): number {
  let n = 0;
  for (const v of visits) {
    n += 1; // sama posjeta
    n += Array.isArray(v.events) ? v.events.length : 0;
  }
  return n;
}

// ── Stanje "zadnje viđeno" ────────────────────────────────────────────────
type SeenState = {
  count: number; // broj signala u trenutku zadnjeg pregleda
  at: number; // kada je pregledano
};

function readSeen(): SeenState {
  try {
    const raw = window.localStorage.getItem(SEEN_KEY);
    if (!raw) return { count: 0, at: 0 };
    const parsed = JSON.parse(raw);
    return {
      count: typeof parsed?.count === "number" ? parsed.count : 0,
      at: typeof parsed?.at === "number" ? parsed.at : 0,
    };
  } catch {
    return { count: 0, at: 0 };
  }
}

let seen: SeenState | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export function subscribeNewCount(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function currentSeen(): SeenState {
  if (seen === null) seen = readSeen();
  return seen;
}

// ── Vanjski store: broj novih signala ─────────────────────────────────────
// Musi biti stabilna referenca (number je primitiv, pa je to automatski).
export function getNewCount(): number {
  const total = countSignals(getVisits());
  const s = currentSeen();
  return Math.max(0, total - s.count);
}

export function getServerNewCount(): number {
  return 0;
}

// ── Oznaci kao procitano (kad se otvori tab Analitika) ────────────────────
export function markAnalyticsSeen() {
  const total = countSignals(getVisits());
  seen = { count: total, at: Date.now() };
  try {
    window.localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
  } catch {
    /* kvota — ignorisi */
  }
  notify();
}

// ── Reset (npr. kad se obrisu svi podaci) ─────────────────────────────────
export function resetAnalyticsSeen() {
  seen = { count: 0, at: 0 };
  try {
    window.localStorage.removeItem(SEEN_KEY);
  } catch {
    /* ignorisi */
  }
  notify();
}

// ── Periodično osvjezavanje (badge prati bazu i bez reload-a) ────────────
let pollStarted = false;

/**
 * Pokreni lagano osvjezavanje broja novih dogadjaja.
 * Zove se jednom iz admin panela; zaustavlja se kad tab nije vidljiv.
 */
export function startAnalyticsBadgePolling(intervalMs = 30_000) {
  if (pollStarted || typeof window === "undefined") return;
  pollStarted = true;
  window.setInterval(() => {
    if (document.visibilityState !== "visible") return;
    // Re-render hook-ova (broj se racuna iz trenutnih posjeta).
    notify();
  }, intervalMs);
}

// ── Hook za badge ─────────────────────────────────────────────────────────
/** Vraća broj NOVIH događaja/posjeta od zadnjeg otvaranja taba Analitika. */
export function useNewAnalyticsCount(): number {
  const visits = useSyncExternalStore(subscribeVisits, getVisits, getVisits);
  const seenState = useSyncExternalStore(subscribeNewCount, currentSeen, currentSeen);

  const total = countSignals(visits);
  return Math.max(0, total - seenState.count);
}
