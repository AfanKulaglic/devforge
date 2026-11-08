// ───────────────────────────────────────────────────────────────────────────
// Analytics — lokalno pracenje posjeta (localStorage).
//
// OGRANICENJE: bez servera ne mozemo vidjeti TUDJE posjete. Ovaj modul biljezi
// samo posjete iz ovog uredjaja/pretrazivaca. Za prave podatke (drzava, uredjaj,
// stvarno trajanje) koristi Vercel Analytics ili Google Analytics — vidi
// `VercelAnalytics` komponentu u App.tsx i uputstvo u STANJE.md.
//
// Ipak, modul je koristan: mjeri stvarno vrijeme na svakoj stranici, pamti
// referrer, uredjaj, jezik i daje realnu sliku kako se sajt koristi.
// ───────────────────────────────────────────────────────────────────────────

import { get, ref, set } from "firebase/database";
import { getDb, firebaseReady } from "./firebase";

const VISITS_KEY = "devforge-visits-v1";
const VISITS_DB_PATH = "analytics/visits";
const MAX_VISITS = 500;

export type DeviceType = "mobile" | "tablet" | "desktop";

export type PageView = {
  path: string;
  title: string;
  // ms provedeno na stranici (mjerеno na leave/visibilitychange)
  durationMs: number;
  enteredAt: number;
};

export type Visit = {
  id: string;
  startedAt: number;
  lastSeenAt: number;
  referrer: string;
  referrerSource: string; // "Google" | "Instagram" | "Direktno" | domena
  country: string; // procjena iz jezika/regije ili "Nepoznato"
  countryCode: string;
  language: string;
  device: DeviceType;
  screen: string; // "390x844"
  timezone: string;
  pages: PageView[];
  totalMs: number;
  isReturning: boolean;
};

// ── Detekcija uredjaja ────────────────────────────────────────────────────
function detectDevice(): { device: DeviceType; screen: string } {
  const w = window.screen?.width ?? window.innerWidth;
  const h = window.screen?.height ?? window.innerHeight;
  const screen = `${Math.round(w)}x${Math.round(h)}`;
  const ua = navigator.userAgent;
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua) || (w >= 768 && w < 1024 && /Mobile/i.test(ua))) {
    return { device: "tablet", screen };
  }
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || w < 768) {
    return { device: "mobile", screen };
  }
  return { device: "desktop", screen };
}

// ── Prepoznavanje izvora posjete ──────────────────────────────────────────
function detectSource(referrer: string): string {
  if (!referrer) return "Direktno";
  const r = referrer.toLowerCase();
  if (r.includes("google")) return "Google";
  if (r.includes("instagram") || r.includes("ig.me")) return "Instagram";
  if (r.includes("facebook") || r.includes("fb.")) return "Facebook";
  if (r.includes("linkedin")) return "LinkedIn";
  if (r.includes("tiktok")) return "TikTok";
  if (r.includes("viber")) return "Viber";
  if (r.includes("whatsapp") || r.includes("wa.me")) return "WhatsApp";
  if (r.includes("bing")) return "Bing";
  if (r.includes("chatgpt") || r.includes("openai")) return "ChatGPT";
  if (r.includes("perplexity")) return "Perplexity";
  try {
    return new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return "Ostalo";
  }
}

// ── Procjena drzave iz jezika + vremenske zone ────────────────────────────
// Bez GeoIP servisa ovo je najbliza procjena koja ne trazi mrezu.
// Za tacnu drzavu koristi Vercel Analytics (ima ugradjen GeoIP).
const TZ_MAP: Record<string, { country: string; code: string }> = {
  "Europe/Sarajevo": { country: "Bosna i Hercegovina", code: "BA" },
  "Europe/Belgrade": { country: "Srbija", code: "RS" },
  "Europe/Zagreb": { country: "Hrvatska", code: "HR" },
  "Europe/Ljubljana": { country: "Slovenija", code: "SI" },
  "Europe/Podgorica": { country: "Crna Gora", code: "ME" },
  "Europe/Skopje": { country: "Sjeverna Makedonija", code: "MK" },
  "Europe/Vienna": { country: "Austrija", code: "AT" },
  "Europe/Berlin": { country: "Njemačka", code: "DE" },
  "Europe/Zurich": { country: "Švicarska", code: "CH" },
  "Europe/Stockholm": { country: "Švedska", code: "SE" },
  "Europe/Oslo": { country: "Norveška", code: "NO" },
  "Europe/Copenhagen": { country: "Danska", code: "DK" },
  "Europe/Amsterdam": { country: "Nizozemska", code: "NL" },
  "Europe/Brussels": { country: "Belgija", code: "BE" },
  "Europe/Luxembourg": { country: "Luksemburg", code: "LU" },
  "Europe/Paris": { country: "Francuska", code: "FR" },
  "Europe/Rome": { country: "Italija", code: "IT" },
  "Europe/Madrid": { country: "Španija", code: "ES" },
  "Europe/Lisbon": { country: "Portugal", code: "PT" },
  "Europe/London": { country: "Velika Britanija", code: "GB" },
  "Europe/Dublin": { country: "Irska", code: "IE" },
  "Europe/Prague": { country: "Češka", code: "CZ" },
  "Europe/Bratislava": { country: "Slovačka", code: "SK" },
  "Europe/Budapest": { country: "Mađarska", code: "HU" },
  "Europe/Warsaw": { country: "Poljska", code: "PL" },
  "Europe/Bucharest": { country: "Rumunija", code: "RO" },
  "Europe/Sofia": { country: "Bugarska", code: "BG" },
  "Europe/Athens": { country: "Grčka", code: "GR" },
  "Europe/Istanbul": { country: "Turska", code: "TR" },
  "Europe/Kiev": { country: "Ukrajina", code: "UA" },
  "Europe/Moscow": { country: "Rusija", code: "RU" },
  "America/New_York": { country: "SAD", code: "US" },
  "America/Chicago": { country: "SAD", code: "US" },
  "America/Denver": { country: "SAD", code: "US" },
  "America/Los_Angeles": { country: "SAD", code: "US" },
  "America/Toronto": { country: "Kanada", code: "CA" },
  "Australia/Sydney": { country: "Australija", code: "AU" },
  "Australia/Melbourne": { country: "Australija", code: "AU" },
};

function detectCountry(): { country: string; countryCode: string; timezone: string; language: string } {
  let tz = "";
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {
    tz = "";
  }
  const language = navigator.language || "bs-BA";
  const hit = TZ_MAP[tz];
  if (hit) return { country: hit.country, countryCode: hit.code, timezone: tz, language };

  // Fallback: iz jezika
  const lang = language.toLowerCase();
  if (lang.startsWith("bs")) return { country: "Bosna i Hercegovina", countryCode: "BA", timezone: tz, language };
  if (lang.startsWith("hr")) return { country: "Hrvatska", countryCode: "HR", timezone: tz, language };
  if (lang.startsWith("sr")) return { country: "Srbija", countryCode: "RS", timezone: tz, language };
  if (lang.startsWith("sl")) return { country: "Slovenija", countryCode: "SI", timezone: tz, language };
  if (lang.startsWith("de")) return { country: "Njemačka", countryCode: "DE", timezone: tz, language };
  if (lang.startsWith("en")) return { country: "Engleski govorno područje", countryCode: "EN", timezone: tz, language };
  return { country: "Nepoznato", countryCode: "—", timezone: tz, language };
}

// ── Storage ───────────────────────────────────────────────────────────────
function readVisits(): Visit[] {
  try {
    const raw = window.localStorage.getItem(VISITS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((v, i) => normalizeVisit(v, `local_${i}`))
      .filter((v): v is Visit => v !== null);
  } catch {
    return [];
  }
}

function writeVisits(visits: Visit[]) {
  const capped = visits.slice(-MAX_VISITS);
  try {
    window.localStorage.setItem(VISITS_KEY, JSON.stringify(capped));
  } catch {
    /* quota — ignorisi */
  }
  listeners.forEach((l) => l());

  // Upisi i u Firebase (zadnjih 100 — da baza ne raste beskonacno).
  if (firebaseReady) {
    void (async () => {
      try {
        const recent = capped.slice(-100);
        const payload: Record<string, Visit> = {};
        for (const v of recent) payload[v.id] = v;
        await set(ref(getDb(), VISITS_DB_PATH), payload);
      } catch {
        /* offline — lokalni kes ostaje */
      }
    })();
  }
}

// ── Normalizacija zapisa ─────────────────────────────────────────────────
// Firebase cuva JSON koji moze biti nepotpun (prazna polja se izostavljaju),
// pa posjeta iz baze ume doci bez `pages`. Bez ovoga `summarize()` puca na
// `v.pages` i cijeli tab Analitika padne. Zato svaki zapis prolazi kroz ovu
// funkciju prije nego udje u aplikaciju.
function normalizeVisit(raw: unknown, fallbackId: string): Visit | null {
  if (!raw || typeof raw !== "object") return null;
  const v = raw as Partial<Visit>;

  const startedAt = typeof v.startedAt === "number" ? v.startedAt : null;
  if (startedAt === null) return null; // bez vremena posjeta nema smisla

  const pages: PageView[] = Array.isArray(v.pages)
    ? v.pages
        .filter((p) => p && typeof p === "object")
        .map((p) => ({
          path: typeof p.path === "string" ? p.path : "/",
          title: typeof p.title === "string" ? p.title : "",
          durationMs: typeof p.durationMs === "number" && p.durationMs >= 0 ? p.durationMs : 0,
          enteredAt: typeof p.enteredAt === "number" ? p.enteredAt : startedAt,
        }))
    : [];

  return {
    id: typeof v.id === "string" && v.id ? v.id : fallbackId,
    startedAt,
    lastSeenAt: typeof v.lastSeenAt === "number" ? v.lastSeenAt : startedAt,
    pages,
    referrer: typeof v.referrer === "string" ? v.referrer : "",
    referrerSource: typeof v.referrerSource === "string" ? v.referrerSource : "Direktno",
    device: v.device === "mobile" || v.device === "tablet" || v.device === "desktop" ? v.device : "desktop",
    screen: typeof v.screen === "string" ? v.screen : "",
    country: typeof v.country === "string" ? v.country : "Nepoznato",
    countryCode: typeof v.countryCode === "string" ? v.countryCode : "",
    timezone: typeof v.timezone === "string" ? v.timezone : "",
    language: typeof v.language === "string" ? v.language : "",
    totalMs: typeof v.totalMs === "number" && v.totalMs >= 0 ? v.totalMs : 0,
    isReturning: v.isReturning === true,
  };
}

// ── Ucitaj posjete iz Firebase (svi uredjaji vide iste brojke) ────────────
export async function loadRemoteVisits(): Promise<Visit[]> {
  if (!firebaseReady) return [];
  try {
    const snap = await get(ref(getDb(), VISITS_DB_PATH));
    if (!snap.exists()) return [];
    const obj = snap.val() as Record<string, unknown>;
    return Object.entries(obj)
      .map(([id, raw]) => normalizeVisit(raw, id))
      .filter((v): v is Visit => v !== null)
      .sort((a, b) => a.startedAt - b.startedAt);
  } catch {
    return [];
  }
}

/** Spoji lokalne i Firebase posjete (bez duplikata po id-u). */
export async function mergeRemoteVisits(): Promise<Visit[]> {
  const local = readVisits();
  const remote = await loadRemoteVisits();
  const byId = new Map<string, Visit>();
  for (const v of remote) byId.set(v.id, v);
  for (const v of local) byId.set(v.id, v);
  const merged = [...byId.values()].sort((a, b) => a.startedAt - b.startedAt).slice(-MAX_VISITS);
  // Postavi NOVU referencu direktno u keš — inace useSyncExternalStore ne vidi
  // promjenu (invalidate() bi vratio novi objekat iz localStorage, ali bi
  // React mogao zadrzati staru referencu i ne re-renderovati).
  cachedVisits = merged;
  try {
    window.localStorage.setItem(VISITS_KEY, JSON.stringify(merged));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
  return merged;
}

const listeners = new Set<() => void>();
export function subscribeVisits(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

let cachedVisits: Visit[] | null = null;
export function getVisits(): Visit[] {
  if (!cachedVisits) cachedVisits = readVisits();
  return cachedVisits;
}
export function getServerVisits(): Visit[] {
  return [];
}

function invalidate() {
  cachedVisits = null;
}

// ── Aktivna sesija ────────────────────────────────────────────────────────
let activeVisitId: string | null = null;
let pageEnteredAt = 0;
let currentPath = "/";
let currentTitle = "";

function newId() {
  return `v_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function upsertVisit(patch: (v: Visit) => Visit) {
  const visits = readVisits();
  const idx = visits.findIndex((v) => v.id === activeVisitId);
  if (idx === -1) return;
  visits[idx] = patch(visits[idx]);
  invalidate();
  writeVisits(visits);
}

function flushPage() {
  if (!activeVisitId || !pageEnteredAt) return;
  const durationMs = Math.max(0, Date.now() - pageEnteredAt);
  const path = currentPath;
  const title = currentTitle;
  pageEnteredAt = 0;

  upsertVisit((v) => {
    const pages = Array.isArray(v.pages) ? [...v.pages] : [];
    const existing = pages.findIndex((p) => p.path === path && p.enteredAt === pageEnteredAt);
    // uvijek dodaj novi zapis posjete stranice (i ako je ista ruta ponovo otvorena)
    const entry: PageView = { path, title, durationMs, enteredAt: Date.now() - durationMs };
    if (existing >= 0) pages[existing] = entry;
    else pages.push(entry);
    const totalMs = pages.reduce((sum, p) => sum + p.durationMs, 0);
    return { ...v, pages, totalMs, lastSeenAt: Date.now() };
  });
}

export function trackPageView(path: string, title: string) {
  flushPage();
  currentPath = path;
  currentTitle = title;
  pageEnteredAt = Date.now();

  if (!activeVisitId) {
    // nova posjeta
    const { device, screen } = detectDevice();
    const geo = detectCountry();
    const isReturning = readVisits().length > 0;
    const visit: Visit = {
      id: newId(),
      startedAt: Date.now(),
      lastSeenAt: Date.now(),
      referrer: document.referrer || "",
      referrerSource: detectSource(document.referrer || ""),
      ...geo,
      device,
      screen,
      pages: [],
      totalMs: 0,
      isReturning,
    };
    activeVisitId = visit.id;
    invalidate();
    writeVisits([...readVisits(), visit]);
  } else {
    upsertVisit((v) => ({ ...v, lastSeenAt: Date.now() }));
  }
}

// ── Inicijalizacija (poziva se jednom iz App.tsx) ─────────────────────────
export function initAnalytics() {
  const flush = () => flushPage();
  window.addEventListener("beforeunload", flush);
  window.addEventListener("pagehide", flush);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
    else if (activeVisitId) pageEnteredAt = Date.now();
  });
}

// ── Agregacije za admin panel ─────────────────────────────────────────────
export type AnalyticsSummary = {
  totalVisits: number;
  uniqueDays: number;
  avgSessionMs: number;
  totalTimeMs: number;
  byCountry: { label: string; code: string; count: number }[];
  bySource: { label: string; count: number }[];
  byDevice: { label: string; count: number }[];
  byPage: { path: string; title: string; views: number; avgMs: number; totalMs: number }[];
  recent: Visit[];
  daily: { day: string; visits: number }[];
};

export function summarize(rawVisits: Visit[]): AnalyticsSummary {
  // Normalizuj SVE na ulazu — bez ovoga nepotpun zapis (bez `pages`) prodje
  // do tabele "Nedavne posjete" i srusi tab na `v.pages.length`.
  const visits = (Array.isArray(rawVisits) ? rawVisits : [])
    .map((v, i) => normalizeVisit(v, `n_${i}`))
    .filter((v): v is Visit => v !== null);

  const totalVisits = visits.length;
  const totalTimeMs = visits.reduce((s, v) => s + v.totalMs, 0);
  const avgSessionMs = totalVisits ? Math.round(totalTimeMs / totalVisits) : 0;

  const countryMap = new Map<string, { label: string; code: string; count: number }>();
  const sourceMap = new Map<string, number>();
  const deviceMap = new Map<string, number>();
  const pageMap = new Map<string, { path: string; title: string; views: number; totalMs: number }>();
  const dayMap = new Map<string, number>();

  for (const v of visits) {
    const ck = v.countryCode || "—";
    const c = countryMap.get(ck) ?? { label: v.country || "Nepoznato", code: ck, count: 0 };
    c.count += 1;
    countryMap.set(ck, c);

    sourceMap.set(v.referrerSource, (sourceMap.get(v.referrerSource) ?? 0) + 1);
    deviceMap.set(v.device, (deviceMap.get(v.device) ?? 0) + 1);

    const day = new Date(v.startedAt).toISOString().slice(0, 10);
    dayMap.set(day, (dayMap.get(day) ?? 0) + 1);

    for (const p of Array.isArray(v.pages) ? v.pages : []) {
      const e = pageMap.get(p.path) ?? { path: p.path, title: p.title, views: 0, totalMs: 0 };
      e.views += 1;
      e.totalMs += p.durationMs;
      pageMap.set(p.path, e);
    }
  }

  return {
    totalVisits,
    uniqueDays: dayMap.size,
    avgSessionMs,
    totalTimeMs,
    byCountry: [...countryMap.values()].sort((a, b) => b.count - a.count),
    bySource: [...sourceMap.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count),
    byDevice: [...deviceMap.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count),
    byPage: [...pageMap.values()]
      .map((p) => ({ path: p.path, title: p.title, views: p.views, totalMs: p.totalMs, avgMs: p.views ? Math.round(p.totalMs / p.views) : 0 }))
      .sort((a, b) => b.views - a.views),
    recent: [...visits].sort((a, b) => b.startedAt - a.startedAt).slice(0, 40),
    daily: [...dayMap.entries()]
      .map(([day, count]) => ({ day, visits: count }))
      .sort((a, b) => a.day.localeCompare(b.day))
      .slice(-14),
  };
}

export function clearVisits() {
  invalidate();
  try {
    window.localStorage.removeItem(VISITS_KEY);
  } catch {
    /* ignore */
  }
  activeVisitId = null;
  pageEnteredAt = 0;
  listeners.forEach((l) => l());
}

// ── Formatiranje ──────────────────────────────────────────────────────────
export function fmtDuration(ms: number): string {
  if (!ms || ms < 1000) return "0 s";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s} s`;
  const m = Math.floor(s / 60);
  const rest = s % 60;
  if (m < 60) return rest ? `${m} min ${rest} s` : `${m} min`;
  const h = Math.floor(m / 60);
  return `${h} h ${m % 60} min`;
}

export function fmtDateTime(ts: number): string {
  try {
    return new Intl.DateTimeFormat("bs-BA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(ts));
  } catch {
    return new Date(ts).toLocaleString();
  }
}

export const DEVICE_LABEL: Record<DeviceType, string> = {
  mobile: "Mobitel",
  tablet: "Tablet",
  desktop: "Desktop",
};
