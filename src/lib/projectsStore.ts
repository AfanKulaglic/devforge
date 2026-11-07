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
const SEED_VERSION = "9";

function readRaw(): AdminProject[] {
  if (!isBrowser()) return SEED;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    // Ključ ne postoji → prvi posjet: prikaži seed (ali ga NE upisuj).
    if (raw === null) return SEED;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    const stored = parsed.filter((p): p is AdminProject => !!p && typeof p.id === "string");

    // Kad se SEED_VERSION promijeni:
    //  1) dodaj seed projekte kojih nema u lokalnoj bazi,
    //  2) osvjezi TEKST (opis, tag, kategoriju, URL) postojecih seed projekata,
    //     ali NE diraj slike — korisnik ih je mozda zamijenio svojim.
    //  3) projekte koje je korisnik sam dodao (nije seed) ne diraj nikako.
    const seenVersion = window.localStorage.getItem(SEED_VERSION_KEY);
    if (seenVersion !== SEED_VERSION) {
      const seedById = new Map(SEED.map((p) => [p.id, p]));
      const storedIds = new Set(stored.map((p) => p.id));

      const refreshed = stored.map((p) => {
        const seed = seedById.get(p.id);
        if (!seed) return p; // korisnikov vlastiti projekt — ne diraj
        return {
          ...p,
          title: seed.title,
          service: seed.service,
          tag: seed.tag,
          url: seed.url,
          description: seed.description,
          // imageDesktop / imageMobile ostaju korisnikove ako ih je mijenjao
          imageDesktop: p.imageDesktop || seed.imageDesktop,
          imageMobile: p.imageMobile || seed.imageMobile,
        };
      });

      const missing = SEED.filter((p) => !storedIds.has(p.id));
      const merged = missing.length > 0 ? [...refreshed, ...missing] : refreshed;

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
