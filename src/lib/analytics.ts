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

import { get, onValue, ref, set, update } from "firebase/database";
import { getDb, firebaseReady } from "./firebase";

const VISITS_KEY = "devforge-visits-v1";
const VISITS_DB_PATH = "analytics/visits";
const MAX_VISITS = 500;

// Sesijska deduplikacija: ako ista osoba osvjezi stranicu ili prekuca
// kroz sajt u roku od 30 min, to je ISTA posjeta (ne nova). Bez ovoga
// jedan posjetilac koji osvjezi 5 puta izgleda kao 5 razlicitih ljudi.
const SESSION_KEY = "devforge-analytics-session-v1";
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minuta

function readSessionId(): string | null {
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.id !== "string" || typeof parsed?.at !== "number") return null;
    if (Date.now() - parsed.at > SESSION_TTL_MS) return null;
    return parsed.id;
  } catch {
    return null;
  }
}

function writeSessionId(id: string) {
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id, at: Date.now() }));
  } catch {
    /* ignore */
  }
}

export type DeviceType = "mobile" | "tablet" | "desktop";

export type PageView = {
  path: string;
  title: string;
  // ms provedeno na stranici (mjerеno na leave/visibilitychange)
  durationMs: number;
  enteredAt: number;
};

// ── Događaji (klikovi, skrol, forme, otvaranja) ───────────────────────────
export type EventKind =
  | "cta" // CTA dugme ("Zatražite gotovu verziju", "Pogledajte cijene")
  | "contact_open" // otvoren kontakt modal
  | "contact_channel" // klik na Viber / WhatsApp / Instagram / telefon / email
  | "form_start" // počeo pisati u kontakt formu
  | "form_submit" // poslao kontakt formu
  | "project_click" // klik na karticu projekta
  | "pricing_click" // klik na paket / "Pogledaj cijene"
  | "faq_open" // otvorio FAQ pitanje
  | "scroll" // dubina skrola 25/50/75/100
  | "social_click" // social link u footeru
  | "external_click" // odlazak na drugi sajt
  | "dead_click" // klik koji ništa nije uradio
  | "rage_click"; // 3+ klika brzo na isto mjesto

export type TrackEvent = {
  kind: EventKind;
  path: string;
  // Slobodna oznaka — npr. "viber", "instagram", "Business", "Elesonic", "100".
  label?: string;
  // Dodatni kontekst (npr. trajanje, indeks pitanja).
  value?: number;
  at: number;
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
  // Novo: sta je posjetilac konkretno radio.
  events?: TrackEvent[];
  // Najdublji skrol na sesiji (0..100).
  maxScroll?: number;
  // Da li je posjetilac napustio sajt bez ijedne akcije.
  bounced?: boolean;
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

// ── ZASTITA BAZE OD TESTNIH POSJETA ─────────────────────────────────────
//
// Uslovi pod kojima posjeta NE ide u Firebase. Lokalni kes je i dalje pun
// (da dev radi normalno), ali baza ostaje cista pa admin Analitika
// pokazuje stvarne brojke.
function jeTestnaPosjeta(v: Visit): boolean {
  // 1) Lokalni razvoj — nikad u bazu.
  try {
    const h = window.location.hostname;
    if (h === "localhost" || h === "127.0.0.1" || h === "0.0.0.0" || h.endsWith(".local")) {
      return true;
    }
  } catch {
    return true;
  }

  // 2) Automatizovani pretrazivac (Playwright, Selenium, headless Chrome).
  try {
    if ((navigator as { webdriver?: boolean }).webdriver) return true;
    if (/HeadlessChrome|PhantomJS|Puppeteer/i.test(navigator.userAgent)) return true;
  } catch {
    /* ignore */
  }

  // 3) Nema nijedne zabiljezene stranice — covjek uvijek otvori barem jednu.
  if (!v.pages || v.pages.length === 0) return true;

  // 4) Krace od 3 sekunde I bez ijedne akcije — bot ili slucajan otvarac
  //    koji je odmah zatvorio tab. Covjek koji je stvarno gledao ostane
  //    duze ili barem klikne nesto.
  const kratko = (v.totalMs ?? 0) < 3000;
  const bezAkcije = !v.events || v.events.length === 0;
  if (kratko && bezAkcije) return true;

  return false;
}
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

  // Upisi u Firebase — SAMO svoju posjetu, pod njenim kljucem.
  //
  // RANIJE: set(ref(db, VISITS_DB_PATH), payload) je PREPISIVAO cijelu
  // granu svojim lokalnim setom, pa je svaki novi posjetilac brisao tude
  // posjete. Zato baza nikad nije imala podatke sa svih uredjaja.
  // SADA: update() po kljucu — svako pise samo svoje, nista se ne brise.
  if (firebaseReady && activeVisitId) {
    const mine = capped.find((v) => v.id === activeVisitId);
    // Testne posjete (localhost, bot, prekratke) ostaju samo u lokalnom
    // kesu — baza sluzi za stvarne brojke u admin panelu.
    if (mine && !jeTestnaPosjeta(mine)) {
      void (async () => {
        try {
          await update(ref(getDb(), VISITS_DB_PATH), { [mine.id]: mine });
        } catch {
          /* offline — lokalni kes ostaje */
        }
      })();
    }
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
    events: Array.isArray(v.events)
      ? v.events
          .filter((e) => e && typeof e === "object" && typeof e.at === "number")
          .map((e) => ({
            kind: (typeof e.kind === "string" ? e.kind : "cta") as EventKind,
            path: typeof e.path === "string" ? e.path : "/",
            label: typeof e.label === "string" ? e.label : undefined,
            value: typeof e.value === "number" ? e.value : undefined,
            at: e.at,
          }))
      : [],
    maxScroll: typeof v.maxScroll === "number" ? v.maxScroll : 0,
    bounced: v.bounced === true,
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

// ── Događaji — praćenje šta posjetilac konkretno radi ────────────────────
const MAX_EVENTS = 120; // po sesiji, da zapis ne naraste

// Najdublji skrol na trenutnoj stranici — mora biti deklarisan PRIJE
// trackEvent() (u suprotnom temporal dead zone baca gresku).
let lastScrollDepth = 0;

function pushEvent(ev: TrackEvent) {
  if (!activeVisitId) return;
  upsertVisit((v) => {
    const events = Array.isArray(v.events) ? [...v.events] : [];
    events.push(ev);
    return { ...v, events: events.slice(-MAX_EVENTS), lastSeenAt: Date.now() };
  });
}

/** Zabilježi događaj (klik, skrol, otvaranje). Zove se iz UI komponenti. */
export function trackEvent(kind: EventKind, label?: string, value?: number, path?: string) {
  if (typeof window === "undefined") return;
  const p = path ?? currentPath ?? "/";
  // Skrol šaljemo samo kad pređe novi prag (25/50/75/100) — bez duplikata.
  if (kind === "scroll") {
    const depth = Math.max(0, Math.min(100, Math.round(value ?? 0)));
    if (depth <= lastScrollDepth) return;
    lastScrollDepth = depth;
    upsertVisit((v) => ({ ...v, maxScroll: Math.max(v.maxScroll ?? 0, depth), lastSeenAt: Date.now() }));
  }
  pushEvent({ kind, path: p, label, value, at: Date.now() });
}

/** Resetuj prag skrola pri promjeni stranice. */
export function resetScrollDepth() {
  lastScrollDepth = 0;
}

/** Oznaci sesiju kao "bounce" ako nije bilo nijedne akcije. */
export function markBounceIfIdle() {
  if (!activeVisitId) return;
  upsertVisit((v) => {
    const hasAction = (v.events ?? []).some(
      (e) => e.kind !== "scroll" && e.kind !== "dead_click",
    );
    const visitedPages = (v.pages ?? []).length;
    const spentEnough = (v.totalMs ?? 0) > 8000;
    return { ...v, bounced: !hasAction && visitedPages <= 1 && !spentEnough };
  });
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
  resetScrollDepth();
  currentPath = path;
  currentTitle = title;
  pageEnteredAt = Date.now();

  if (!activeVisitId) {
    // Nastavi postojecu sesiju ako je ista osoba (refresh / navigacija).
    const existingId = readSessionId();
    if (existingId) {
      const found = readVisits().find((v) => v.id === existingId);
      if (found) {
        // Ista sesija — samo nastavi, ne pravi novu posjetu.
        activeVisitId = existingId;
        upsertVisit((v) => ({ ...v, lastSeenAt: Date.now() }));
        return;
      }
      activeVisitId = existingId; // zapis je u bazi, ne u lokalnom kesu
      return;
    }

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
    writeSessionId(visit.id);
    invalidate();
    writeVisits([...readVisits(), visit]);
  } else {
    upsertVisit((v) => ({ ...v, lastSeenAt: Date.now() }));
  }
}

// ── Inicijalizacija (poziva se jednom iz App.tsx) ─────────────────────────
// ── Automatsko pracenje klikova i skrola ─────────────────────────────────
// Globalni listeneri: nista ne treba rucno dodavati u komponente. Klik se
// klasifikuje na osnovu `data-track` atributa ili sadrzaja (href, tekst).
let autoStarted = false;

function classifyClick(el: HTMLElement): { kind: EventKind; label: string } | null {
  const tracked = el.closest<HTMLElement>("[data-track]");
  if (tracked) {
    return {
      kind: (tracked.dataset.track as EventKind) || "cta",
      label: tracked.dataset.trackLabel ?? (tracked.textContent ?? "").trim().slice(0, 60),
    };
  }

  const link = el.closest<HTMLAnchorElement>("a[href]");
  if (link) {
    const href = link.getAttribute("href") ?? "";
    if (href.startsWith("tel:")) return { kind: "contact_channel", label: "telefon" };
    if (href.startsWith("mailto:")) return { kind: "contact_channel", label: "email" };
    if (/viber:/i.test(href)) return { kind: "contact_channel", label: "viber" };
    if (/wa\.me|whatsapp/i.test(href)) return { kind: "contact_channel", label: "whatsapp" };
    if (/ig\.me|instagram\.com/i.test(href)) return { kind: "contact_channel", label: "instagram" };
    if (/facebook\.com|fb\.me/i.test(href)) return { kind: "contact_channel", label: "facebook" };
    if (/linkedin\.com/i.test(href)) return { kind: "contact_channel", label: "linkedin" };
    if (/^https?:\/\//i.test(href) && !href.includes(window.location.hostname)) {
      try {
        return { kind: "external_click", label: new URL(href).hostname.replace(/^www\./, "") };
      } catch {
        return { kind: "external_click", label: "vanjski link" };
      }
    }
    return null; // interni link — pokriva ga page view
  }

  const btn = el.closest<HTMLElement>("button");
  if (btn) {
    const text = (btn.textContent ?? "").trim().slice(0, 60);
    if (!text) return null;
    if (/viber|whatsapp|instagram|pozovi|telefon|nazovi/i.test(text)) {
      return { kind: "contact_channel", label: text.toLowerCase() };
    }
    if (/cijen|paket|izaberi|odaberi/i.test(text)) return { kind: "pricing_click", label: text };
    if (/pošalji|posalji|zatraži|zatrazite|kontakt|javite/i.test(text)) return { kind: "cta", label: text };
    return { kind: "cta", label: text };
  }

  return null;
}

function onGlobalClick(ev: MouseEvent) {
  const target = ev.target as HTMLElement | null;
  if (!target) return;

  // ── Rage click: 3+ klika na istom mjestu unutar 1.2s ──
  const now = Date.now();
  const x = Math.round(ev.clientX / 20);
  const y = Math.round(ev.clientY / 20);
  const key = `${x},${y}`;
  if (now - lastClickAt < 1200 && key === lastClickKey) {
    clickStreak += 1;
    if (clickStreak === 3) {
      trackEvent("rage_click", (target.textContent ?? "").trim().slice(0, 40) || "klik");
    }
  } else {
    clickStreak = 1;
  }
  lastClickAt = now;
  lastClickKey = key;

  const hit = classifyClick(target);
  if (hit) trackEvent(hit.kind, hit.label);

  // ── Dead click: klik na element koji nema href/onClick/data-track ──
  const interactive = target.closest("a[href], button, [role='button'], [data-track], input, select, textarea, label");
  if (!interactive) {
    const tag = target.tagName.toLowerCase();
    if (["img", "svg", "path", "span", "p", "div", "h1", "h2", "h3", "h4"].includes(tag)) {
      deadClickBuf.push(now);
    }
  }
}

let lastClickAt = 0;
let lastClickKey = "";
let clickStreak = 0;
const deadClickBuf: number[] = [];

function onScroll() {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return;
  const pct = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
  // Salji samo kad predje prag (25/50/75/100).
  const nextThreshold = [25, 50, 75, 100].find((t) => pct >= t && t > lastScrollDepth);
  if (nextThreshold !== undefined) trackEvent("scroll", String(nextThreshold), nextThreshold);
}

function onFormFocus(ev: Event) {
  const t = ev.target as HTMLElement | null;
  if (!t) return;
  if (t.matches("input, textarea, select") && !formStarted) {
    formStarted = true;
    const form = t.closest("form");
    const name = form?.getAttribute("data-form-name") ?? "kontakt forma";
    trackEvent("form_start", name);
  }
}

let formStarted = false;

export function initAnalytics() {
  const flush = () => {
    markBounceIfIdle();
    flushPage();
  };
  window.addEventListener("beforeunload", flush);
  window.addEventListener("pagehide", flush);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
    else if (activeVisitId) pageEnteredAt = Date.now();
  });

  if (autoStarted) return;
  autoStarted = true;

  document.addEventListener("click", onGlobalClick, true);
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("focusin", onFormFocus, true);
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
  // ── Novo: događaji i angažman ──
  byEvent: { kind: EventKind; label: string; count: number }[];
  byChannel: { label: string; count: number }[];
  byEventDay: { day: string; counts: Record<string, number> }[];
  scrollFunnel: { depth: number; count: number; percent: number }[];
  bounceRate: number;
  bouncedCount: number;
  avgPagesPerVisit: number;
  returningCount: number;
  paths: { path: string; count: number; percent: number }[];
  allEvents: TrackEvent[];
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

    // ── Događaji ──
    byEvent: (() => {
      const counts = new Map<string, number>();
      for (const v of visits) for (const e of v.events ?? []) {
        const key = `${e.kind}|${e.label ?? ""}`;
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
      return [...counts.entries()]
        .map(([key, count]) => {
          const [kind, label] = key.split("|");
          return { kind: kind as EventKind, label, count };
        })
        .sort((a, b) => b.count - a.count);
    })(),

    // Kanal kontakta: samo contact_channel događaji grupisani po labeli.
    byChannel: (() => {
      const counts = new Map<string, number>();
      for (const v of visits) for (const e of v.events ?? []) {
        if (e.kind !== "contact_channel") continue;
        const label = e.label ?? "ostalo";
        counts.set(label, (counts.get(label) ?? 0) + 1);
      }
      return [...counts.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count);
    })(),

    // Događaji po danu — za graf trenda.
    byEventDay: (() => {
      const map = new Map<string, Record<string, number>>();
      for (const v of visits) {
        const day = new Date(v.startedAt).toISOString().slice(0, 10);
        const entry = map.get(day) ?? {};
        for (const e of v.events ?? []) entry[e.kind] = (entry[e.kind] ?? 0) + 1;
        map.set(day, entry);
      }
      return [...map.entries()]
        .map(([day, counts]) => ({ day, counts }))
        .sort((a, b) => a.day.localeCompare(b.day))
        .slice(-14);
    })(),

    // Koliko posjetilaca je doslo do 25/50/75/100% skrola.
    scrollFunnel: (() => {
      const total = visits.length || 1;
      return [25, 50, 75, 100].map((depth) => {
        const count = visits.filter((v) => (v.maxScroll ?? 0) >= depth).length;
        return { depth, count, percent: Math.round((count / total) * 100) };
      });
    })(),

    bouncedCount: visits.filter((v) => v.bounced === true).length,
    bounceRate: totalVisits ? Math.round((visits.filter((v) => v.bounced === true).length / totalVisits) * 100) : 0,
    avgPagesPerVisit: totalVisits
      ? Math.round((visits.reduce((n, v) => n + (v.pages?.length ?? 0), 0) / totalVisits) * 10) / 10
      : 0,
    returningCount: visits.filter((v) => v.isReturning).length,

    // Najčešće putanje kroz sajt (redoslijed stranica po sesiji).
    paths: (() => {
      const map = new Map<string, number>();
      for (const v of visits) {
        const seq = (v.pages ?? []).map((p) => p.path);
        if (seq.length === 0) continue;
        const key = seq.join(" → ");
        map.set(key, (map.get(key) ?? 0) + 1);
      }
      const total = totalVisits || 1;
      return [...map.entries()]
        .map(([path, count]) => ({ path, count, percent: Math.round((count / total) * 100) }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 12);
    })(),

    // Svi događaji hronoloski (najnovije prvo) — za tabelu "Događaji".
    allEvents: visits
      .flatMap((v) => (v.events ?? []).map((e) => ({ ...e })))
      .sort((a, b) => b.at - a.at)
      .slice(0, 60),
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
  // Obrisi i u bazi — inace bi se vratile pri sljedecem citanju.
  if (firebaseReady) {
    void set(ref(getDb(), VISITS_DB_PATH), null).catch(() => {
      /* offline */
    });
  }
  listeners.forEach((l) => l());
}

// ── REALTIME SLUSALAC ─────────────────────────────────────────────────────
// Bez ovoga admin vidi samo ono sto je ucitano pri otvaranju stranice.
// Sada: cim bilo ko na bilo kojoj mrezi otvori sajt, zapis se pojavi
// u adminu bez klikanja "Osvjezi".
let realtimeStarted = false;

/** Slusaj /analytics/visits uzivo (poziva se iz admin panela). */
export function startVisitsRealtime() {
  if (!firebaseReady || realtimeStarted) return;
  realtimeStarted = true;
  try {
    onValue(ref(getDb(), VISITS_DB_PATH), (snap) => {
      if (!snap.exists()) return;
      const obj = snap.val() as Record<string, unknown>;
      const remote = Object.entries(obj)
        .map(([id, raw]) => normalizeVisit(raw, id))
        .filter((v): v is Visit => v !== null)
        .sort((a, b) => a.startedAt - b.startedAt);

      // Spoji s lokalnim (lokalni su svjeziji za ovu sesiju).
      const byId = new Map<string, Visit>();
      for (const v of remote) byId.set(v.id, v);
      for (const v of readVisits()) byId.set(v.id, v);
      const merged = [...byId.values()].sort((a, b) => a.startedAt - b.startedAt).slice(-MAX_VISITS);

      cachedVisits = merged;
      try {
        window.localStorage.setItem(VISITS_KEY, JSON.stringify(merged));
      } catch {
        /* ignore */
      }
      listeners.forEach((l) => l());
    });
  } catch {
    realtimeStarted = false;
  }
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
