// ───────────────────────────────────────────────────────────────────────────
// Lokalna "baza" cijena paketa — isti princip kao projectsStore (localStorage).
// Admin panel (/admin → tab Cijene) piše ovdje; /cijene i stranice usluga čitaju.
// ───────────────────────────────────────────────────────────────────────────

export type PricingPlanData = {
  id: string;
  title: string;
  price: string;
  tagline: string;
  items: string[];
  popular: boolean;
};

export type PricingGroupData = {
  id: string;
  heading: string; // npr. "Web stranice" — koristi se i na /cijene i na detaljima usluge
  subtitle: string;
  note: string;
  plans: PricingPlanData[];
  // Redoslijed grupe u bazi (Firebase cuva objekat, ne niz — `order` cuva red).
  order?: number;
};

export const DEFAULT_PRICING: PricingGroupData[] = [
  {
    id: "web-sites",
    heading: "Web stranice",
    subtitle: "Tri paketa za web stranice i tri za web shopove — UI/UX dizajn uključen u svaki paket.",
    note: "Hosting i domena se plaćaju dodatno (ako ih nemate) — postavljamo ih, a plaćate direktno provideru otprilike 50–100 KM godišnje, ovisno o domeni (uključuje i poslovni email i ostalo što ide uz to), bez naše marže; ako ih već imate, samo se povežemo. Online plaćanje povezujemo sa Stripe, PayPal ili sličnim servisom koji već koristite. Osnovna SEO podešavanja (meta naslovi i opisi) uključena su kao dodatak. Održavanje i podrška: opcionalno, po dogovoru. Tačnu ponudu dobijate nakon besplatne konsultacije, bez skrivenih troškova.",
    plans: [
      {
        id: "ws-start",
        title: "Start",
        price: "150–250 KM",
        tagline: "Idealno za prvu online prisutnost",
        popular: false,
        items: ["Landing ili do 5 podstranica", "UI/UX dizajn uključen", "Responzivno (mobitel/tablet/desktop)", "Kontakt forma", "Demo se ne plaća", "Postavljanje hostinga i domene"],
      },
      {
        id: "ws-business",
        title: "Business",
        price: "300–450 KM",
        tagline: "Najčešći izbor za firme",
        popular: true,
        items: ["Do 12 podstranica + blog", "Premium UI/UX dizajn", "Admin panel (CMS) za uređivanje", "Google Analytics i mjerenje", "Brza izrada i optimizacija", "Postavljanje hostinga i domene"],
      },
      {
        id: "ws-premium",
        title: "Premium",
        price: "500–800 KM",
        tagline: "Za zahtjevne, custom projekte",
        popular: false,
        items: ["Neograničeno podstranica", "Custom dizajn i animacije", "Napredni CMS + više korisnika", "Višejezičnost", "Integracije (API, CRM, alati)", "Prioritetna podrška", "Postavljanje hostinga i domene"],
      },
    ],
  },
  {
    id: "web-shops",
    heading: "Web shopovi",
    subtitle: "",
    note: "Hosting i domena se plaćaju dodatno (ako ih nemate) — plaćate direktno provideru otprilike 50–100 KM godišnje, bez naše marže. Online plaćanje povezujemo sa Stripe, PayPal ili sličnim servisom. Održavanje i podrška: opcionalno, po dogovoru.",
    plans: [
      {
        id: "sh-start",
        title: "Shop Start",
        price: "600–1.000 KM",
        tagline: "Pokrenite online prodaju",
        popular: false,
        items: ["Do 50 proizvoda", "UI/UX dizajn uključen", "Korpa i checkout", "Online plaćanje (Stripe ili PayPal)", "Admin panel za proizvode", "Postavljanje hostinga i domene"],
      },
      {
        id: "sh-business",
        title: "Shop Business",
        price: "1.200–1.800 KM",
        tagline: "Za ozbiljne online trgovine",
        popular: true,
        items: ["Do 500 proizvoda", "Premium UI/UX dizajn", "Više opcija plaćanja (Stripe, PayPal…)", "Kuponi, popusti i akcije", "Upravljanje zalihama", "Postavljanje hostinga i domene"],
      },
      {
        id: "sh-premium",
        title: "Shop Premium",
        price: "2.000–3.500 KM",
        tagline: "Skalabilna e-commerce platforma",
        popular: false,
        items: ["Neograničeno proizvoda", "Custom dizajn i funkcionalnosti", "Integracije (ERP, dostava, fiskalizacija)", "Višejezičnost i više valuta", "Marketing i email automatizacija", "Prioritetna podrška", "Postavljanje hostinga i domene"],
      },
    ],
  },
  {
    id: "games",
    heading: "2D igrice",
    subtitle: "Tri paketa za 2D igre — od jednostavne promo igre do kompleksnog, brendiranog iskustva. Dizajn i 2D grafika uvijek uključeni.",
    note: "Cijene zavise od kompleksnosti mehanika, broja nivoa i grafike. Hosting (za web igre): plaćate direktno provideru, od ~50 KM/godišnje, bez naše marže. Održavanje i nove funkcije: opcionalno, po dogovoru. Nakon besplatne konsultacije dajemo tačnu ponudu.",
    plans: [
      {
        id: "gm-mini",
        title: "Mini",
        price: "Po dogovoru",
        tagline: "Jednostavna casual ili promo igra",
        popular: false,
        items: ["1 igra, jedan nivo/mehanika", "2D grafika i dizajn uključeni", "Web ILI mobitel", "Bodovi i osnovni scoring", "Zvuk i osnovne animacije", "Optimizacija performansi", "Dokumentacija"],
      },
      {
        id: "gm-standard",
        title: "Standard",
        price: "Po dogovoru",
        tagline: "Igra s više nivoa i sistema",
        popular: true,
        items: ["Više nivoa i progresija", "Custom 2D grafika i likovi", "Web I mobitel (Android/iOS)", "Leaderboards i nagrade", "Napredne mehanike", "Zvuk i bogate animacije", "Dokumentacija + upute"],
      },
      {
        id: "gm-premium",
        title: "Premium",
        price: "Po dogovoru",
        tagline: "Kompleksna ili brendirana igra",
        popular: false,
        items: ["Kompleksne custom mehanike", "Originalni art i animacije", "Multiplatforma + objava u trgovinama", "Online rang-liste i nalozi", "Integracije (analitika, oglasi)", "Prioritetna podrška", "Kontinuirane nadogradnje"],
      },
    ],
  },
  {
    id: "mobile",
    heading: "Mobilne aplikacije",
    subtitle: "Tri paketa za mobilne aplikacije — od brzog MVP-a do skalabilnog proizvoda. UI/UX dizajn uključen u svaki paket.",
    note: "Cijene zavise od funkcija, integracija i kompleksnosti. Objava u App Store / Google Play je uključena u sve pakete (developerski računi se plaćaju direktno provajderu). Održavanje i nadogradnje: opcionalno, po dogovoru.",
    plans: [
      {
        id: "mb-mvp",
        title: "MVP",
        price: "Po dogovoru",
        tagline: "Lansirajte prvu verziju brzo",
        popular: false,
        items: ["Ključne funkcije (MVP)", "UI/UX dizajn uključen", "iOS I Android (jedan kod)", "Osnovni backend i baza", "Registracija i prijava", "Objava u trgovinama", "Dokumentacija"],
      },
      {
        id: "mb-business",
        title: "Business",
        price: "Po dogovoru",
        tagline: "Potpuno opremljena aplikacija",
        popular: true,
        items: ["Sve iz MVP paketa", "Napredni backend i API", "Push notifikacije", "Plaćanja u aplikaciji", "Analitika i izvještaji", "Integracije (servisi trećih strana)", "Dokumentacija + upute"],
      },
      {
        id: "mb-premium",
        title: "Premium",
        price: "Po dogovoru",
        tagline: "Skalabilan proizvod s podrškom",
        popular: false,
        items: ["Custom funkcionalnosti", "Skalabilna arhitektura", "Realtime i offline podrška", "Admin panel za upravljanje", "Napredna sigurnost", "Prioritetna podrška", "Kontinuirane nadogradnje"],
      },
    ],
  },
  {
    id: "ai",
    heading: "AI sistemi",
    subtitle: "AI sistemi se naplaćuju izradom + mjesečnom naknadom — asistent troši AI resurse svaki put kad razgovara s kupcem.",
    note: "Pored izrade postoji mjesečna naknada jer glasovni i jezički modeli imaju stalne troškove po razgovoru. Broj telefona, hosting i AI potrošnja se plaćaju direktno provideru, bez naše marže.",
    plans: [
      {
        id: "ai-start",
        title: "AI Start",
        price: "Po dogovoru",
        tagline: "AI chat na sajtu ili baza znanja",
        popular: false,
        items: ["AI chat asistent na sajtu", "Baza znanja o firmi (usluge, cijene)", "Obuka asistenta na Vaš sadržaj", "Upis upita i razgovora", "Mjesečna naknada za AI", "Mjesečno održavanje"],
      },
      {
        id: "ai-business",
        title: "AI Business",
        price: "Po dogovoru",
        tagline: "AI recepcionar koji prima pozive",
        popular: true,
        items: ["AI telefonski recepcionar 24/7", "Prirodan glas na Vašem jeziku", "Sve iz AI Start paketa", "Automatske narudžbe i termini", "Pametno preusmjeravanje na Vas", "Mjesečna naknada za AI"],
      },
      {
        id: "ai-premium",
        title: "AI Premium",
        price: "Po dogovoru",
        tagline: "Kompletan AI sistem s aplikacijom",
        popular: false,
        items: ["Sve iz AI Business paketa", "Web i mobilna aplikacija", "AI analitika i izvještaji", "Više brojeva i korisnika", "Integracije (CRM, kalendar, plaćanje)", "Prioritetna podrška"],
      },
    ],
  },
];

// ───────────────────────────────────────────────────────────────────────────
// STORE CIJENA — Firebase Realtime Database + lokalni kes.
//
// Isti princip kao projectsStore: baza je izvor istine, localStorage je kes
// (brz prikaz + offline). Prvi put se lokalne cijene automatski migriraju.
// Kljuc u bazi: /pricing/{groupId} = PricingGroupData
// ───────────────────────────────────────────────────────────────────────────

import { get, onValue, ref, set, remove } from "firebase/database";
import { getDb, firebaseReady } from "./firebase";

const STORAGE_KEY = "devforge-pricing-v1";
const MIGRATED_KEY = "devforge-pricing-migrated-v1";
const DB_PATH = "pricing";

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

// ── Stanje ────────────────────────────────────────────────────────────────
let cache: PricingGroupData[] | null = null;
const listeners = new Set<() => void>();

export type PricingSyncState = "idle" | "connecting" | "live" | "offline" | "error";
let syncState: PricingSyncState = "idle";
let syncError: string | null = null;
const syncListeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}
function notifySync() {
  syncListeners.forEach((l) => l());
}
function setSync(next: PricingSyncState, err?: string) {
  syncState = next;
  if (err !== undefined) syncError = err;
  notifySync();
}

export function getPricingSyncState(): PricingSyncState {
  return syncState;
}
export function getPricingSyncError(): string | null {
  return syncError;
}
export function subscribePricingSync(cb: () => void) {
  syncListeners.add(cb);
  return () => {
    syncListeners.delete(cb);
  };
}

// ── Lokalni kes ───────────────────────────────────────────────────────────
function readLocal(): PricingGroupData[] {
  if (!isBrowser()) return DEFAULT_PRICING;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return DEFAULT_PRICING;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_PRICING;
    return parsed.filter(
      (g): g is PricingGroupData => !!g && typeof g.id === "string" && Array.isArray(g.plans),
    );
  } catch {
    return DEFAULT_PRICING;
  }
}

function writeLocal(next: PricingGroupData[]) {
  cache = next;
  if (isBrowser()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* pun localStorage */
    }
  }
  notify();
}

// ── Konverzija ────────────────────────────────────────────────────────────
// Grupe imaju eksplicitni `order` da bi redoslijed bio isti svima. Ako ga
// stari zapis nema, koristimo indeks u listi (lokalna baza je vec uredjena).
function withOrder(list: PricingGroupData[]): PricingGroupData[] {
  return list.map((g, i) => ({ ...g, order: typeof g.order === "number" ? g.order : i }));
}

function fromDbObject(obj: Record<string, PricingGroupData> | null): PricingGroupData[] {
  if (!obj) return [];
  return Object.entries(obj)
    .filter(([, v]) => v && typeof v === "object" && Array.isArray((v as PricingGroupData).plans))
    .map(([id, v], i) => ({ ...v, id, order: typeof v.order === "number" ? v.order : i }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

// ── Firebase upis cijele liste ────────────────────────────────────────────
async function pushAll(next: PricingGroupData[]) {
  if (!firebaseReady) return;
  try {
    const db = getDb();
    const payload: Record<string, PricingGroupData> = {};
    withOrder(next).forEach((g, i) => {
      payload[g.id] = { ...g, order: i };
    });
    await set(ref(db, DB_PATH), payload);
  } catch (e) {
    setSync("error", e instanceof Error ? e.message : String(e));
  }
}

// ── MIGRACIJA lokalno → Firebase ──────────────────────────────────────────
async function migrateLocalToFirebase(): Promise<PricingGroupData[] | null> {
  if (!firebaseReady || !isBrowser()) return null;
  try {
    const snap = await get(ref(getDb(), DB_PATH));
    const remote = snap.exists() ? (snap.val() as Record<string, PricingGroupData>) : null;
    const remoteCount = remote ? Object.keys(remote).length : 0;
    if (remoteCount > 0) return null; // baza vec ima cijene

    const local = readLocal();
    if (local.length === 0) return null;

    await pushAll(local);
    try {
      window.localStorage.setItem(MIGRATED_KEY, new Date().toISOString());
    } catch {
      /* ignore */
    }
    return local;
  } catch (e) {
    setSync("error", e instanceof Error ? e.message : String(e));
    return null;
  }
}

// ── Start sync ────────────────────────────────────────────────────────────
let started = false;

export function startPricingSync() {
  if (started || !isBrowser()) return;
  started = true;

  cache = readLocal();
  notify();

  if (!firebaseReady) {
    setSync("offline");
    return;
  }

  setSync("connecting");

  void (async () => {
    const migrated = await migrateLocalToFirebase();
    if (migrated) writeLocal(migrated);

    try {
      onValue(
        ref(getDb(), DB_PATH),
        (snap) => {
          const list = fromDbObject(snap.exists() ? (snap.val() as Record<string, PricingGroupData>) : null);
          const resolved = list.length > 0 ? list : DEFAULT_PRICING;
          setSync("live");
          writeLocal(resolved);
        },
        (err) => setSync("error", err.message),
      );
    } catch (e) {
      setSync("error", e instanceof Error ? e.message : String(e));
    }
  })();
}

// ── Snapshot za useSyncExternalStore ──────────────────────────────────────
export function getPricing(): PricingGroupData[] {
  if (cache === null) cache = readLocal();
  return cache;
}

export function getServerPricing(): PricingGroupData[] {
  return DEFAULT_PRICING;
}

export function subscribePricing(listener: () => void) {
  if (!isBrowser()) return () => {};
  listeners.add(listener);
  const handler = () => {
    cache = readLocal();
    notify();
  };
  window.addEventListener("storage", handler);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handler);
  };
}

// ── Upis (lokalno + Firebase) ─────────────────────────────────────────────
function persist(next: PricingGroupData[]) {
  const ordered = withOrder(next).map((g, i) => ({ ...g, order: i }));
  writeLocal(ordered);

  if (firebaseReady) {
    void (async () => {
      try {
        const db = getDb();
        const payload: Record<string, PricingGroupData> = {};
        for (const g of ordered) payload[g.id] = g;
        await set(ref(db, DB_PATH), payload);
      } catch (e) {
        setSync("error", e instanceof Error ? e.message : String(e));
      }
    })();
  }
}

// ── CRUD ──────────────────────────────────────────────────────────────────
export function newPricingId(prefix = "pg"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function saveGroup(group: PricingGroupData) {
  const list = getPricing();
  const exists = list.some((g) => g.id === group.id);
  persist(exists ? list.map((g) => (g.id === group.id ? group : g)) : [...list, group]);
}

export function deleteGroup(id: string) {
  persist(getPricing().filter((g) => g.id !== id));
  if (firebaseReady) {
    void (async () => {
      try {
        await remove(ref(getDb(), `${DB_PATH}/${id}`));
      } catch (e) {
        setSync("error", e instanceof Error ? e.message : String(e));
      }
    })();
  }
}

export function moveGroup(id: string, direction: -1 | 1) {
  const list = [...getPricing()];
  const i = list.findIndex((g) => g.id === id);
  const j = i + direction;
  if (i < 0 || j < 0 || j >= list.length) return;
  [list[i], list[j]] = [list[j], list[i]];
  persist(list);
}

export function resetPricing() {
  if (isBrowser()) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(MIGRATED_KEY);
    } catch {
      /* ignore */
    }
  }
  cache = DEFAULT_PRICING;
  notify();
  if (firebaseReady) void pushAll(DEFAULT_PRICING);
}

// ── Rucna migracija / status ──────────────────────────────────────────────
/** Prisilno posalji lokalne cijene u Firebase (prepisuje bazu). */
export async function forcePushPricingToFirebase(): Promise<{ ok: boolean; count: number; error?: string }> {
  if (!firebaseReady) return { ok: false, count: 0, error: "Firebase nije konfigurisan." };
  try {
    const local = readLocal();
    await pushAll(local);
    try {
      window.localStorage.setItem(MIGRATED_KEY, new Date().toISOString());
    } catch {
      /* ignore */
    }
    return { ok: true, count: local.length };
  } catch (e) {
    return { ok: false, count: 0, error: e instanceof Error ? e.message : String(e) };
  }
}

/** Koliko grupa cijena ima u bazi. */
export async function countRemotePricing(): Promise<number | null> {
  if (!firebaseReady) return null;
  try {
    const snap = await get(ref(getDb(), DB_PATH));
    if (!snap.exists()) return 0;
    return Object.keys(snap.val() as Record<string, unknown>).length;
  } catch {
    return null;
  }
}

// Mapiranje grupe na ključ usluge (za /usluge/* stranice) — po id-u.
export const GROUP_TO_SERVICE: Record<string, "web" | "webShops" | "games" | "mobile" | "ai"> = {
  "web-sites": "web",
  "web-shops": "webShops",
  games: "games",
  mobile: "mobile",
  ai: "ai",
};
