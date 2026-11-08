// ───────────────────────────────────────────────────────────────────────────
// STORE PROJEKATA — Firebase Realtime Database + lokalni kes (localStorage).
//
// Svi uredjaji vide iste projekte jer je baza izvor istine.
// Lokalni kes postoji da sajt radi i offline i da prikaz bude trenutan.
// Prvi put: lokalni projekti se automatski migriraju u Firebase.
// ───────────────────────────────────────────────────────────────────────────

export type AdminProject = {
  id: string;
  title: string;
  service: string; // grupa na /projekti (Web stranice & shopovi | 2D igrice | Mobilne aplikacije)
  tag: string; // mala oznaka iznad naslova
  url: string; // link projekta (https://...)
  description: string;
  imageDesktop: string; // URL slike za desktop prikaz
  imageMobile: string; // URL slike za mobilni prikaz
  createdAt: number;
  // Ako je false, projekt je sakriven na javnom sajtu (/projekti i home marquee),
  // ali ostaje u admin panelu. Nedefinisano = vidljiv (stari zapisi).
  visible?: boolean;
};

// Početni (fallback) projekti — koriste se samo dok admin ništa ne doda.
export const SERVICE_OPTIONS = [
  "Web shopovi",
  "Web stranice",
  "2D igrice",
  "Mobilne aplikacije",
  "AI sistemi",
];


const SEED: AdminProject[] = [
  {
    id: "seed-elesonic",
    title: "ELESONIC",
    service: "Web shopovi",
    tag: "Web shop",
    url: "https://www.elesonic.ba",
    description:
      "Online prodavnica elektronike i sigurnosne opreme za tržište Bosne i Hercegovine — nadzorne " +
      "kamere, noćna optika, dronovi, projektori i pametni uređaji. Katalog od preko 30 proizvoda " +
      "razvrstanih u 7 kategorija, sa korpom, online plaćanjem i dostavom na cijelom području BiH. " +
      "Brza pretraga, jasne specifikacije i podrška pri odabiru opreme.",
    imageDesktop: "https://picturetolink.com/i/WgFlob4ttz.png",
    imageMobile: "https://picturetolink.com/i/EjgxGl6Qn0.png",
    createdAt: 1,
  },
  {
    id: "seed-myicon",
    title: "MYICON",
    service: "Web shopovi",
    tag: "Print shop",
    url: "https://www.my-icon.shop",
    description:
      "Njemački online shop za digitalni i tekstilni print — majice, duksevi, kape, flyeri, brošure, " +
      "vizit karte i reklamni materijal. Ugrađeni online dizajner dopušta pripremu materijala bez " +
      "poznavanja grafičkih alata, ekspresna produkcija završava za 24 sata, a dostava je besplatna " +
      "iznad 99 €. Katalog od 34 proizvoda sa fotografijama i cijenama.",
    imageDesktop: "https://i.ibb.co/Q3tJF0Np/0a2d8fa2d3f5.png",
    imageMobile: "https://i.ibb.co/60ff2bwD/logo-text-1.png",
    createdAt: 2,
  },
  {
    id: "seed-formula1",
    title: "Formula Racers",
    service: "2D igrice",
    tag: "Racing igra",
    url: "https://formula1-unbranded.vercel.app/",
    description:
      "Arkadna trkaća igra u pregledniku — voziš bolid iz ptičje perspektive, savladavaš krivine i " +
      "obaraš najbolje vrijeme kruga. Igra je napravljena u Next.js-u na canvas platnu, sa vlastitom " +
      "fizikom kretanja i kontrolama prilagođenim tipkovnici i ekranu osjetljivom na dodir. Radi na " +
      "računaru i mobitelu, bez instalacije, bez naloga i bez čekanja — otvoriš i igraš.",
    imageDesktop: "https://image.thum.io/get/width/1200/crop/675/https://formula1-unbranded.vercel.app/",
    imageMobile: "https://image.thum.io/get/width/400/crop/800/https://formula1-unbranded.vercel.app/",
    createdAt: 3,
  },
  {
    id: "seed-qiro",
    title: "Qiro",
    service: "Web stranice",
    tag: "Web alat",
    url: "https://qiro-tools.vercel.app/",
    description:
      "Sve-u-jednom studio za kratke linkove, QR kodove i konverziju fajlova. Brendirani short " +
      "linkovi sa analitikom klikova, instant QR generator za linkove i tekst, te konverzija slika, " +
      "videa, audija i GIF-ova. Obrada se odvija u pregledniku preko WebAssembly tehnologije, pa " +
      "fajlovi nikada ne napuštaju tvoj računar — privatnost je zajamčena.",
    imageDesktop: "https://qiro-tools.vercel.app/hero-main.png",
    imageMobile: "https://qiro-tools.vercel.app/hero-main.png",
    createdAt: 4,
  },
  {
    id: "seed-gamelauncher",
    title: "RivalHub — Game Launcher",
    service: "Mobilne aplikacije",
    tag: "React Native",
    // Bez linka na GitHub — projekat se prikazuje bez otkrivanja repozitorija.
    // Kad ga postavis na Vercel/Expo, zamijeni ovo svojom live adresom u /admin.
    url: "",
    description:
      "Multiplayer launcher za društvene igre na ploči za 2–4 igrača. Pretražiš biblioteku " +
      "(Battleship, Ludo, Slagalica, Runbound Rivals), dodaš prijatelje i pratiš njihov online status, " +
      "pošalješ pozivnicu i čekaš u zajedničkom lobiju — host pokreće partiju i svi igrači ulaze u isti " +
      "ekran. Napravljeno u React Native + Expo, uz Firebase Realtime Database za sinhronizaciju u " +
      "realnom vremenu.",
    imageDesktop: "",
    imageMobile: "",
    createdAt: 5,
  },
  {
    id: "seed-ljaljevic",
    title: "Ljaljević Dental",
    service: "Web stranice",
    tag: "Stomatologija",
    url: "https://ljaljevic-dental.vercel.app/",
    description:
      "Web stranica specijalističke stomatološke ordinacije u Sarajevu — protetika, cirkonske i " +
      "metalokeramičke krunice, proteze, estetska stomatologija, endodoncija i oralna hirurgija. " +
      "Sekcije za usluge, tim, tehnologiju i rezultate prije i poslije zahvata, uz online zakazivanje. " +
      "Napravljeno u React + Vite + Tailwind, sa SEO optimizacijom i schema.org podacima za lokalno " +
      "pretraživanje.",
    imageDesktop: "https://ljaljevic-dental.vercel.app/images/hero/dental-clinic.jpg",
    imageMobile: "https://ljaljevic-dental.vercel.app/images/hero/dental-clinic.jpg",
    createdAt: 6,
  },
  {
    id: "seed-sarajevo-visit",
    title: "Saraya Hotspot — Sarajevo Visit",
    service: "Mobilne aplikacije",
    tag: "Turizam · GPS · 3D",
    url: "https://sarajevo-visit.vercel.app/map",
    description:
      "Turistička aplikacija koja Sarajevo pretvara u igru otkrivanja. Radi kao web aplikacija (PWA) " +
      "— instaliraš je na telefon kao pravu aplikaciju, bez Play Storea i App Storea. GPS prepozna kad " +
      "si blizu znamenitosti, potvrdiš posjetu i otključa ti se priča, fotografije i 3D model koji " +
      "okrećeš prstom. Digitalni vodič na 9 jezika, sa navigacijom pješice ili autom.",
    imageDesktop: "https://sarajevo-visit.vercel.app/logos/logo.png",
    imageMobile: "https://sarajevo-visit.vercel.app/icons/icon-512.png",
    createdAt: 7,
  },
];

// ───────────────────────────────────────────────────────────────────────────
// STORE PROJEKATA — Firebase Realtime Database + lokalni kes.
//
// Arhitektura:
//   1. Lokalni `localStorage` je KES (brz prikaz, radi offline).
//   2. Firebase RTDB je IZVOR ISTINE (svi uredjaji vide isto).
//   3. Na prvo pokretanje: ako baza je prazna a lokalno ima podataka →
//      automatska MIGRACIJA lokalnih projekata u Firebase.
//   4. Svaka izmjena: pise u Firebase, pa u lokalni kes.
//
// Kljuc u bazi: /projects/{projectId} = AdminProject
// ───────────────────────────────────────────────────────────────────────────

import { get, onValue, ref, set, remove, update } from "firebase/database";
import { getDb, firebaseReady } from "./firebase";

// Lokalni kes i zastita od visestrukog upisa.
const STORAGE_KEY = "devforge-projects-v1";
const SEED_VERSION_KEY = "devforge-projects-seed-version";
const SEED_VERSION = "9";
// Oznaka da je migracija u Firebase vec uradjena (sprecava ponovni upis).
const MIGRATED_KEY = "devforge-projects-migrated-v1";

const DB_PATH = "projects";

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

// ── Stanje ────────────────────────────────────────────────────────────────
let cache: AdminProject[] | null = null;
let listeners = new Set<() => void>();
let firebaseError: string | null = null;

export type SyncState = "idle" | "connecting" | "live" | "offline" | "error";
let syncState: SyncState = "idle";
let syncListeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

function notifySync() {
  syncListeners.forEach((l) => l());
}

function setSync(next: SyncState) {
  syncState = next;
  notifySync();
}

export function getSyncState(): SyncState {
  return syncState;
}

export function getSyncError(): string | null {
  return firebaseError;
}

export function subscribeSync(cb: () => void) {
  syncListeners.add(cb);
  return () => {
    syncListeners.delete(cb);
  };
}

// ── Lokalni kes ───────────────────────────────────────────────────────────
function readLocal(): AdminProject[] {
  if (!isBrowser()) return SEED;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return SEED;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((p): p is AdminProject => !!p && typeof p.id === "string");
  } catch {
    return SEED;
  }
}

function writeLocal(next: AdminProject[]) {
  cache = next;
  if (isBrowser()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* pun localStorage — podaci ostaju u memoriji i u Firebaseu */
    }
  }
  notify();
}

// ── Normalizacija liste ───────────────────────────────────────────────────
function sortByCreated(list: AdminProject[]): AdminProject[] {
  return [...list].sort((a, b) => a.createdAt - b.createdAt);
}

// ── Firebase: pretvori objekat iz baze u listu ────────────────────────────
function fromDbObject(obj: Record<string, AdminProject> | null): AdminProject[] {
  if (!obj) return [];
  return sortByCreated(
    Object.entries(obj)
      .filter(([, v]) => v && typeof v === "object")
      .map(([id, v]) => ({ ...v, id })),
  );
}

// ── Firebase: upis cijele liste ───────────────────────────────────────────
async function pushAll(next: AdminProject[]) {
  if (!firebaseReady) return;
  try {
    const db = getDb();
    const payload: Record<string, AdminProject> = {};
    for (const p of next) payload[p.id] = p;
    await set(ref(db, DB_PATH), payload);
  } catch (e) {
    firebaseError = e instanceof Error ? e.message : String(e);
    setSync("error");
  }
}

// ── MIGRACIJA: lokalno → Firebase ─────────────────────────────────────────
// Pokrece se ako:
//   - Firebase je prazan (nema /projects)
//   - a lokalno ima projekata (bilo seed ili korisnikovi)
// Tada upisuje SVE lokalne projekte u bazu, jednom zauvijek.
async function migrateLocalToFirebase(): Promise<AdminProject[] | null> {
  if (!firebaseReady || !isBrowser()) return null;
  try {
    const db = getDb();
    const snap = await get(ref(db, DB_PATH));
    const remote = snap.exists() ? (snap.val() as Record<string, AdminProject>) : null;
    const remoteCount = remote ? Object.keys(remote).length : 0;

    if (remoteCount > 0) {
      // Baza vec ima podatke → ona je izvor istine, lokalno se samo uskladi.
      return null;
    }

    // Baza prazna → migriraj lokalno (KES ili SEED).
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
    firebaseError = e instanceof Error ? e.message : String(e);
    setSync("error");
    return null;
  }
}

// ── Start sync (poziva se jednom iz App.tsx) ──────────────────────────────
let started = false;

export function startProjectsSync() {
  if (started || !isBrowser()) return;
  started = true;

  // 1) Odmah prikazi lokalni kes (nema cekanja, nema praznog ekrana).
  cache = readLocal();
  notify();

  if (!firebaseReady) {
    setSync("offline");
    return;
  }

  setSync("connecting");

  // 2) Migracija (ako baza prazna a lokalno ima podataka), pa slusaj bazu.
  void (async () => {
    const migrated = await migrateLocalToFirebase();
    if (migrated) {
      // Migracija uspjesna — lokalni podaci su sada u bazi.
      writeLocal(migrated);
    }

    // 3) Real-time slusanje: svaka promjena u bazi azurira sajt svima.
    try {
      const db = getDb();
      onValue(
        ref(db, DB_PATH),
        (snap) => {
          const list = fromDbObject(snap.exists() ? (snap.val() as Record<string, AdminProject>) : null);
          // Ako baza je prazna a mi imamo seed — prikazi seed (prvi posjet).
          const resolved = list.length > 0 ? list : SEED;
          setSync("live");
          writeLocal(resolved);
        },
        (err) => {
          firebaseError = err.message;
          setSync("error");
        },
      );
    } catch (e) {
      firebaseError = e instanceof Error ? e.message : String(e);
      setSync("error");
    }
  })();
}

// ── Snapshot za useSyncExternalStore ──────────────────────────────────────
export function getProjects(): AdminProject[] {
  if (cache === null) cache = readLocal();
  return cache;
}

export function getServerProjects(): AdminProject[] {
  return SEED;
}

export function subscribe(listener: () => void) {
  if (!isBrowser()) return () => {};
  listeners.add(listener);
  // `storage` event pokriva promjene iz drugog taba istog preglednika.
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
function persist(next: AdminProject[]) {
  writeLocal(next);
  if (firebaseReady) {
    void (async () => {
      try {
        const db = getDb();
        const payload: Record<string, AdminProject> = {};
        for (const p of next) payload[p.id] = p;
        await set(ref(db, DB_PATH), payload);
      } catch (e) {
        firebaseError = e instanceof Error ? e.message : String(e);
        setSync("error");
      }
    })();
  }
}

// ── CRUD ──────────────────────────────────────────────────────────────────
export function newProjectId(): string {
  return `p-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function saveProject(project: AdminProject) {
  const list = getProjects();
  const exists = list.some((p) => p.id === project.id);
  const next = exists ? list.map((p) => (p.id === project.id ? project : p)) : [...list, project];

  const sorted = sortByCreated(next);
  writeLocal(sorted);

  if (firebaseReady) {
    void (async () => {
      try {
        const db = getDb();
        await set(ref(db, `${DB_PATH}/${project.id}`), project);
      } catch (e) {
        firebaseError = e instanceof Error ? e.message : String(e);
        setSync("error");
      }
    })();
  }
}

export function toggleProjectVisibility(id: string) {
  const list = getProjects();
  const target = list.find((p) => p.id === id);
  if (!target) return;
  const updated = { ...target, visible: target.visible === false ? true : false };
  writeLocal(list.map((p) => (p.id === id ? updated : p)));

  if (firebaseReady) {
    void (async () => {
      try {
        await update(ref(getDb(), `${DB_PATH}/${id}`), { visible: updated.visible });
      } catch (e) {
        firebaseError = e instanceof Error ? e.message : String(e);
        setSync("error");
      }
    })();
  }
}

export function deleteProject(id: string) {
  writeLocal(getProjects().filter((p) => p.id !== id));

  if (firebaseReady) {
    void (async () => {
      try {
        await remove(ref(getDb(), `${DB_PATH}/${id}`));
      } catch (e) {
        firebaseError = e instanceof Error ? e.message : String(e);
        setSync("error");
      }
    })();
  }
}

// Promijeni redoslijed projekata unutar jedne kategorije.
// `orderedIds` je nova lista id-eva SAMO za tu kategoriju — ostali projekti
// (druge kategorije) zadrzavaju svoj redoslijed.
// Redoslijed se cuva preko `createdAt`: dodjeljujemo nove, strogo rastuce
// vrijednosti unutar te kategorije, tako da sortiranje po createdAt radi.
export function reorderProjects(service: string, orderedIds: string[]) {
  const list = getProjects();
  const inGroup = list.filter((p) => p.service === service).sort((a, b) => a.createdAt - b.createdAt);

  const base = inGroup.length > 0 ? Math.min(...inGroup.map((p) => p.createdAt)) : 1;

  const newOrder = new Map<string, number>();
  orderedIds.forEach((id, index) => newOrder.set(id, base + index));

  const next = list.map((p) =>
    p.service === service && newOrder.has(p.id) ? { ...p, createdAt: newOrder.get(p.id) as number } : p,
  );
  persist(sortByCreated(next));
}

export function resetProjects() {
  if (isBrowser()) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(SEED_VERSION_KEY);
      window.localStorage.removeItem(MIGRATED_KEY);
    } catch {
      /* ignore */
    }
  }
  cache = SEED;
  notify();

  if (firebaseReady) {
    void pushAll(SEED);
  }
}

// ── Pomocne ───────────────────────────────────────────────────────────────
export function visibleProjects(list: AdminProject[]): AdminProject[] {
  return list.filter((p) => p.visible !== false);
}

export function groupProjects(list: AdminProject[]) {
  return SERVICE_OPTIONS.map((service) => ({
    service,
    items: list.filter((p) => p.service === service).sort((a, b) => a.createdAt - b.createdAt),
  }));
}

// ── BACKUP / IZVOZ / UVOZ ─────────────────────────────────────────────────
export type BackupFile = {
  kind: "devforge-projects-backup";
  version: 1;
  exportedAt: string;
  seedVersion: string;
  projects: AdminProject[];
};

export function makeBackup(): BackupFile {
  return {
    kind: "devforge-projects-backup",
    version: 1,
    exportedAt: new Date().toISOString(),
    seedVersion: SEED_VERSION,
    projects: getProjects(),
  };
}

export function downloadBackup() {
  const data = makeBackup();
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
  a.href = url;
  a.download = `devforge-projekti-backup-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parseBackup(text: string): BackupFile {
  const parsed = JSON.parse(text);
  if (!parsed || parsed.kind !== "devforge-projects-backup") {
    throw new Error("Fajl nije DevForge backup.");
  }
  if (!Array.isArray(parsed.projects)) {
    throw new Error("Backup ne sadrzi listu projekata.");
  }
  return parsed as BackupFile;
}

/**
 * Vrati projekte iz backupa.
 * `mode: "replace"` — obrisi sve trenutno i upisi iz backupa.
 * `mode: "merge"`   — zadrzi trenutno, dodaj/azuriraj iz backupa (po id-u).
 */
export function restoreBackup(backup: BackupFile, mode: "replace" | "merge") {
  if (mode === "replace") {
    persist(backup.projects);
    return;
  }
  const current = getProjects();
  const byId = new Map(current.map((p) => [p.id, p]));
  for (const p of backup.projects) byId.set(p.id, p);
  persist(sortByCreated([...byId.values()]));
}

export function backupToJson(): string {
  return JSON.stringify(makeBackup(), null, 2);
}

// ── Rucna migracija iz admin panela ───────────────────────────────────────
/** Prisilno posalji sve lokalne projekte u Firebase (prepisuje bazu). */
export async function forcePushToFirebase(): Promise<{ ok: boolean; count: number; error?: string }> {
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

/** Koliko projekata ima u Firebase bazi (za prikaz u adminu). */
export async function countRemote(): Promise<number | null> {
  if (!firebaseReady) return null;
  try {
    const snap = await get(ref(getDb(), DB_PATH));
    if (!snap.exists()) return 0;
    return Object.keys(snap.val() as Record<string, unknown>).length;
  } catch {
    return null;
  }
}
