// ───────────────────────────────────────────────────────────────────────────
// Lokalna "baza" projekata — običan localStorage, bez servera i bez baze.
// Admin panel piše ovdje, /projekti stranica čita odavde.
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
};

const STORAGE_KEY = "devforge-projects-v1";

// Početni (fallback) projekti — koriste se samo dok admin ništa ne doda.
export const SERVICE_OPTIONS = [
  "Web shopovi",
  "Web stranice",
  "2D igrice",
  "Mobilne aplikacije",
];

const SEED: AdminProject[] = [
  {
    id: "seed-elesonic",
    title: "ELESONIC",
    service: "Web shopovi",
    tag: "Web shop",
    url: "https://www.elesonic.ba",
    description:
      "Online prodavnica elektronike i sigurnosne opreme za BiH — kamere za nadzor, špijunska oprema, noćna optika, dronovi, projektori i pametni gadgeti. Katalog od 30+ proizvoda, korpa, online plaćanje i dostava širom Bosne i Hercegovine. Kontakt: myicon2025@gmail.com",
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
      "Nemački online shop za digitalni i tekstilni print — majice, polo majice, duksevi, kape, flyeri, brošure, vizit karte, plakati i reklamni materijal. Sopstveni online dizajner, ekspres produkcija za 24h, besplatna dostava od 99 €. Kontakt: myicon2025@gmail.com",
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
      "Top-down formula racing igra u browseru — vozi bolid po stazi, savladavaj krivine i obaraj najbolje vrijeme kruga. Radi na računaru i mobitelu, bez instalacije i bez naloga, direktno u pregledniku.",
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
      "Sve-u-jednom studio za kratke linkove, QR kodove i konverziju fajlova. Brendirani short linkovi sa analitikom klikova, instant QR generator, te konverzija slika, videa, audija i GIF-ova — sve u browseru preko WebAssembly, fajlovi se nikad ne šalju na server. Besplatno za početak, bez naloga.",
    imageDesktop: "https://qiro-tools.vercel.app/hero-main.png",
    imageMobile: "https://qiro-tools.vercel.app/hero-main.png",
    createdAt: 4,
  },
  {
    id: "seed-gamelauncher",
    title: "RivalHub — Game Launcher",
    service: "Mobilne aplikacije",
    tag: "React Native",
    url: "https://github.com/AfanKulaglic/GameLauncher",
    description:
      "Multiplayer launcher za igre na ploči i društvene igre za 2–4 igrača. Pretraži biblioteku igara (Battleship, Ludo, Slagalica, Runbound Rivals), dodaj prijatelje i prati njihov online status, pošalji pozivnicu i čekaj u zajedničkom lobiju dok se svi ne okupe — host pokreće partiju i svi igrači ulaze u isti ekran. Napravljeno u React Native + Expo, backend Firebase Realtime Database (lobi i gameState u realnom vremenu), Auth sa email/šifrom i Google prijavom, navigacija stack + bottom tabs i custom SVG ikone.",
    imageDesktop: "https://opengraph.githubassets.com/1/AfanKulaglic/GameLauncher",
    imageMobile: "https://opengraph.githubassets.com/1/AfanKulaglic/GameLauncher",
    createdAt: 5,
  },
  {
    id: "seed-ljaljevic",
    title: "Ljaljević Dental",
    service: "Web stranice",
    tag: "Stomatologija",
    url: "https://ljaljevic-dental.vercel.app/",
    description:
      "Web stranica specijalističke stomatološke ordinacije u Sarajevu — protetika, cirkonske i metalokeramičke krunice, proteze, estetska stomatologija, endodoncija i oralna hirurgija. Sekcije: usluge, o nama, rezultati prije/poslije, tim, tehnologija i zakazivanje. Adresa Bardakčije 23, telefon +387 33 567 890, info@ljaljevic-dental.ba. Napravljeno u React + Vite + Tailwind, animacije Framer Motion, SEO sa schema.org Dentist structured data.",
    imageDesktop: "https://ljaljevic-dental.vercel.app/images/hero/dental-clinic.jpg",
    imageMobile: "https://ljaljevic-dental.vercel.app/images/hero/dental-clinic.jpg",
    createdAt: 6,
  },
];

const EVENT = "devforge:projects-changed";
const EMPTY: AdminProject[] = [];

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

// Keširani snapshot — getSnapshot za useSyncExternalStore mora vraćati
// istu referencu dok se podaci ne promijene (inače React uđe u petlju).
let cache: AdminProject[] | null = null;

// Kljuc do verzije seed-a: kad se u kodu pojavi novi seed projekt, ovaj broj
// se poveca i novi seed-ovi se automatski dodaju i u postojecu lokalnu bazu
// (bez brisanja onoga sto je korisnik sam dodao/uredio).
const SEED_VERSION_KEY = "devforge-projects-seed-version";
const SEED_VERSION = "6";

function readRaw(): AdminProject[] {
  if (!isBrowser()) return SEED;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    // Ključ ne postoji → prvi posjet: prikaži seed (ali ga NE upisuj).
    if (raw === null) return SEED;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    const stored = parsed.filter((p): p is AdminProject => !!p && typeof p.id === "string");

    // Nadogradi lokalnu bazu novim seed projektima (po id-u) kad se verzija promijeni.
    const seenVersion = window.localStorage.getItem(SEED_VERSION_KEY);
    if (seenVersion !== SEED_VERSION) {
      const storedIds = new Set(stored.map((p) => p.id));
      const missing = SEED.filter((p) => !storedIds.has(p.id));
      const merged = missing.length > 0 ? [...stored, ...missing] : stored;
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        window.localStorage.setItem(SEED_VERSION_KEY, SEED_VERSION);
      } catch {
        /* localStorage pun — vrati samo procitano */
      }
      return merged;
    }

    return stored;
  } catch {
    return SEED;
  }
}

export function getProjects(): AdminProject[] {
  if (cache === null) cache = readRaw();
  return cache;
}

export function getServerProjects(): AdminProject[] {
  return SEED;
}

function write(next: AdminProject[]) {
  cache = next;
  if (isBrowser()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* localStorage pun / blokiran — podaci ostaju samo u memoriji */
    }
    window.dispatchEvent(new Event(EVENT));
  }
}

export function subscribe(listener: () => void) {
  if (!isBrowser()) return () => {};
  const handler = () => listener();
  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export function newProjectId(): string {
  return `p-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function saveProject(project: AdminProject) {
  const list = getProjects();
  const exists = list.some((p) => p.id === project.id);
  write(exists ? list.map((p) => (p.id === project.id ? project : p)) : [...list, project]);
}

export function deleteProject(id: string) {
  write(getProjects().filter((p) => p.id !== id));
}

// Promijeni redoslijed projekata unutar jedne kategorije.
// `orderedIds` je nova lista id-eva SAMO za tu kategoriju — ostali projekti
// (druge kategorije) zadrzavaju svoj redoslijed.
// Redoslijed se cuva preko `createdAt`: dodjeljujemo nove, strogo rastuce
// vrijednosti unutar te kategorije, tako da sortiranje po createdAt radi.
export function reorderProjects(service: string, orderedIds: string[]) {
  const list = getProjects();
  const inGroup = list
    .filter((p) => p.service === service)
    .sort((a, b) => a.createdAt - b.createdAt);

  // Osnovica: najmanji createdAt u kategoriji, korak 1.
  const base =
    inGroup.length > 0
      ? Math.min(...inGroup.map((p) => p.createdAt))
      : 1;

  const newOrder = new Map<string, number>();
  orderedIds.forEach((id, index) => newOrder.set(id, base + index));

  const next = list.map((p) =>
    p.service === service && newOrder.has(p.id)
      ? { ...p, createdAt: newOrder.get(p.id) as number }
      : p,
  );
  write(next);
}

export function resetProjects() {
  if (isBrowser()) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(SEED_VERSION_KEY);
    } catch {
      /* ignore */
    }
  }
  cache = SEED;
  if (isBrowser()) window.dispatchEvent(new Event(EVENT));
}

// Grupisanje za /projekti: uvijek iste tri grupe, u istom redu, i prazne se prikazuju.
export function groupProjects(list: AdminProject[]) {
  return SERVICE_OPTIONS.map((service) => ({
    service,
    items: list
      .filter((p) => p.service === service)
      .sort((a, b) => a.createdAt - b.createdAt),
  }));
}
