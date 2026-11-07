import { FormEvent, PointerEvent as ReactPointerEvent, ReactNode, TouchEvent as ReactTouchEvent, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { IconType } from "react-icons";
import {
  HiOutlineRocketLaunch,
  HiOutlineSparkles,
  HiOutlineClock,
  HiOutlineBanknotes,
  HiOutlineArrowPath,
  HiOutlineChatBubbleLeftRight,
  HiOutlineFlag,
  HiOutlineCheckCircle,
  HiOutlineGlobeAlt,
  HiOutlinePuzzlePiece,
  HiOutlineDevicePhoneMobile,
  HiOutlineShoppingCart,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineRectangleGroup,
  HiOutlineCodeBracketSquare,
  HiOutlineCircleStack,
  HiOutlineWrenchScrewdriver,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineLightBulb,
  HiOutlineCog6Tooth,
  HiOutlineBeaker,
  HiOutlineUserGroup,
  HiOutlineBriefcase,
  HiOutlineLockClosed,
  HiOutlineQuestionMarkCircle,
  HiOutlineDocumentText,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlinePaperAirplane,
  HiOutlineSwatch,
  HiOutlineStar,
  HiOutlineChartBar,
  HiOutlineBolt,
  HiOutlinePlay,
  HiOutlinePlus,
  HiOutlineMinus,
  HiOutlineHome,
  HiOutlineChevronRight,
  HiOutlineChevronLeft,
  HiOutlineChevronDown,
  HiOutlineXMark,
  HiOutlineArrowUp,
  HiOutlineShieldCheck,
  HiOutlineScale,
} from "react-icons/hi2";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import AdminPanel from "./AdminPanel";
import {
  getProjects as getStoredProjects,
  getServerProjects,
  groupProjects,
  subscribe as subscribeProjects,
} from "./lib/projectsStore";
import {
  GROUP_TO_SERVICE,
  getPricing,
  getServerPricing,
  subscribePricing,
  type PricingGroupData,
} from "./lib/pricingStore";

const CTA_LABEL = "🚀 Dobijte gotovu verziju za 5 dana";

// ── KONFIGURACIJA (popuniti pravim podacima) ───────────────────────────────
// Formspree endpoint za forme. Napravi besplatan form na https://formspree.io,
// pa ovdje zalijepi npr. "https://formspree.io/f/abcdwxyz". Prazno = forme rade
// u demo modu (prikažu success bez stvarnog slanja).
const FORM_ENDPOINT = "";
// ───────────────────────────────────────────────────────────────────────────

type RevealDirection = "up" | "down" | "left" | "right" | "scale";

/**
 * Scroll-reveal koji replicira ponašanje devgen-react (framer-motion `useInView`).
 * Element počinje skriven (opacity 0 + pomak) i animira se kad uđe u viewport.
 * Parametri usklađeni sa AnimatedSection/RevealOnScroll: once, rootMargin "-100px".
 */
function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    // Na stranicama s .anim-rich (home + About) re-animiraj SVAKI put kad sekcija PONOVO uđe
    // u viewport (u oba smjera); na ostalim podstranicama ostaje "otkrij jednom".
    const repeat = !!node.closest(".anim-rich");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (!repeat) observer.disconnect();
        } else if (repeat) {
          // Reset (priprema za ponovnu animaciju) tek kad je sekcija POTPUNO van ekrana.
          // rootMargin 0 + threshold uključuje 0 → isIntersecting postaje false tek na 0% vidljivosti
          // (gore ILI dolje), pa se reset NIKAD ne vidi dok je sekcija još u kadru. Re-animira se
          // pri svakom sljedećem ulasku, bez obzira skrolaš li gore ili dolje.
          setVisible(false);
        }
      },
      { rootMargin: "0px", threshold: [0, 0.1] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal reveal-${direction} ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}s`, transitionDuration: `${duration}s` }}
    >
      {children}
    </Tag>
  );
}

const images = {
  hero:
    "https://images.pexels.com/photos/6804068/pexels-photo-6804068.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  // Zasebna VERTIKALNA fotografija za mobilni hero (druga nego desktop).
  heroMobile:
    "https://images.pexels.com/photos/7988081/pexels-photo-7988081.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1500&w=800",
  web:
    "https://images.pexels.com/photos/16675632/pexels-photo-16675632.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  game:
    "https://images.pexels.com/photos/37694203/pexels-photo-37694203.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  mobile:
    "https://images.pexels.com/photos/12001948/pexels-photo-12001948.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  project1:
    "https://images.pexels.com/photos/7857496/pexels-photo-7857496.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  project2:
    "https://images.pexels.com/photos/37878824/pexels-photo-37878824.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  project3:
    "https://images.pexels.com/photos/20694602/pexels-photo-20694602.png?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  avatar1:
    "https://images.pexels.com/photos/14950779/pexels-photo-14950779.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  avatar2:
    "https://images.pexels.com/photos/7717254/pexels-photo-7717254.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  avatar3:
    "https://images.pexels.com/photos/7562139/pexels-photo-7562139.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

const navItems: { label: string; href: string; icon: IconType }[] = [
  { label: "Početna", href: "/", icon: HiOutlineHome },
  { label: "O nama", href: "/o-nama", icon: HiOutlineSparkles },
  { label: "Usluge", href: "/usluge", icon: HiOutlineCog6Tooth },
  { label: "Projekti", href: "/projekti", icon: HiOutlineBriefcase },
  { label: "Kontakt", href: "/kontakt", icon: HiOutlineEnvelope },
];

const menuInfoLinks: { label: string; href: string; icon: IconType; desc: string }[] = [
  { label: "Utisci", href: "/utisci", icon: HiOutlineStar, desc: "Iskustva naših zadovoljnih klijenata." },
  { label: "Česta pitanja", href: "/cesta-pitanja", icon: HiOutlineQuestionMarkCircle, desc: "Odgovori na najčešća pitanja." },
  { label: "Cijene", href: "/cijene", icon: HiOutlineBanknotes, desc: "Transparentni paketi, bez skrivenih troškova." },
];

const companyLogos = ["React", "Next.js", "TypeScript", "Node.js", "Laravel", "Flutter", "React Native", "PostgreSQL", "Tailwind", "MongoDB"];

const benefits = [
  {
    number: "0 KM",
    label: "Predujma — plaćate tek na kraju",
    short: "Bez predujma",
    icon: HiOutlineBanknotes,
    image: images.project1,
    title: "Bez predujma — plaćate tek kada ste zadovoljni",
    description:
      "Za razliku od većine agencija, ne tražimo nikakav predujam. Razvoj počinjemo na povjerenje, a vi plaćate tek kada je projekat gotov i kada ste u potpunosti zadovoljni rezultatom. Sav rizik je na nama — vi nemate šta izgubiti.",
  },
  {
    number: "5 dana",
    label: "Besplatna gotova verzija bez obaveze",
    short: "Gotova verzija za 5 dana",
    icon: HiOutlineRocketLaunch,
    image: images.web,
    title: "Besplatna gotova verzija za 5 dana — bez obaveze",
    description:
      "Prije nego što se dogovorimo o bilo čemu, izrađujemo besplatnu, funkcionalnu gotovu verziju vašeg projekta u roku od 5 radnih dana. Vidite konkretan dizajn, strukturu i funkcionalnost prije nego što potpišete bilo šta. Nema predujma, nema pritiska.",
  },
  {
    number: "100%",
    label: "Vlastiti admin panel za upravljanje",
    short: "Vlastiti admin panel",
    icon: HiOutlineRectangleGroup,
    image: images.mobile,
    title: "Vlastiti admin panel — sami upravljate sadržajem",
    description:
      "Uz svaki projekt dobijate vlastiti admin panel (CMS) kroz koji sami mijenjate tekst, slike, proizvode i cijene — jednostavno, bez koda i bez plaćanja developera za svaku sitnicu. Potpuna kontrola nad vašom stranicom je u vašim rukama.",
  },
  {
    number: "0",
    label: "Skrivenih troškova — jasne cijene",
    short: "Bez skrivenih troškova",
    icon: HiOutlineBanknotes,
    image: images.hero,
    title: "Transparentne cijene bez skrivenih troškova",
    description:
      "Cijene su javne i jasne od početka: web stranice od 150 KM, web shopovi od 600 KM. Tačnu ponudu dobijate prije početka rada — bez naknadnih iznenađenja, skrivenih stavki ili dodatnih naplata na kraju. Znate tačno za šta plaćate.",
  },
];

const companyStats: { icon: IconType; value: string; label: string }[] = [
  { icon: HiOutlineBriefcase, value: "20+", label: "Realizovanih projekata" },
  { icon: HiOutlineClock, value: "3+", label: "Godine iskustva" },
  { icon: HiOutlineGlobeAlt, value: "BiH + regija", label: "Zadovoljni klijenti" },
  { icon: HiOutlineCheckCircle, value: "Demo", label: "Besplatan — ne plaća se" },
];

const services = [
  {
    title: "Web stranice",
    icon: HiOutlineGlobeAlt,
    image: images.web,
    link: "/usluge/web-stranice",
    description:
      "Moderne, responzivne web stranice koje predstavljaju vaš brand na najbolji način. Od landing page-a do kompleksnih corporate web stranica.",
  },
  {
    title: "2D igrice",
    icon: HiOutlinePuzzlePiece,
    image: images.game,
    link: "/usluge/2d-igrice",
    description:
      "Razvijamo engaging 2D igrice za mobilne platforme i web. Od casual do educational game-ova prilagođenih vašim zahtjevima.",
  },
  {
    title: "Mobilne aplikacije",
    icon: HiOutlineDevicePhoneMobile,
    image: images.mobile,
    link: "/usluge/mobilne-aplikacije",
    description:
      "Native i cross-platform mobilne aplikacije za iOS i Android. Od MVP-a do fully-featured app-a sa backend integracijom.",
  },
];

// Linkovi na detaljne podstranice usluga (koristi se u nav meniju).
const serviceLinks: { label: string; href: string; icon: IconType; desc: string }[] = [
  { label: "Web stranice", href: "/usluge/web-stranice", icon: HiOutlineGlobeAlt, desc: "Landing, korporativne i shop stranice — od 150 KM." },
  { label: "2D igrice", href: "/usluge/2d-igrice", icon: HiOutlinePuzzlePiece, desc: "Web i mobilne 2D igre po mjeri." },
  { label: "Mobilne aplikacije", href: "/usluge/mobilne-aplikacije", icon: HiOutlineDevicePhoneMobile, desc: "Android i iOS aplikacije za vaš biznis." },
];

const serviceList: { icon: IconType; title: string; description: string }[] = [
  { icon: HiOutlineShoppingCart, title: "Web shopovi", description: "E-commerce platforme s korpom, checkoutom i upravljanjem proizvodima." },
  { icon: HiOutlineRectangleGroup, title: "Admin paneli (CMS)", description: "Vlastiti panel za samostalno uređivanje sadržaja, slika i proizvoda." },
  { icon: HiOutlineCodeBracketSquare, title: "API razvoj i integracije", description: "REST i GraphQL API-ji te povezivanje s vanjskim alatima (CRM, ERP, dostava)." },
  { icon: HiOutlineBanknotes, title: "Online plaćanje", description: "Povezujemo vašu trgovinu sa Stripe, PayPal i sličnim servisima koje već koristite." },
  { icon: HiOutlineSwatch, title: "UI/UX dizajn", description: "Wireframing, prototyping i moderan dizajn usmjeren na konverziju." },
  { icon: HiOutlineSparkles, title: "Logo i vizualni identitet", description: "Logo, boje i tipografija — usklađen brend koji izgleda profesionalno." },
  { icon: HiOutlineChartBar, title: "SEO i Google Analytics", description: "Tehnička SEO osnova i mjerenje posjeta da lakše budete pronađeni i znate šta radi." },
  { icon: HiOutlineGlobeAlt, title: "Višejezičnost", description: "Web na više jezika — za klijente iz BiH, regije i inostranstva." },
  { icon: HiOutlineDocumentText, title: "Copywriting i sadržaj", description: "Pišemo jasne, prodajne tekstove i opise proizvoda za vašu stranicu." },
  { icon: HiOutlineEnvelope, title: "Domena, email i SSL", description: "Postavljamo domenu, poslovni email i SSL — plaćate direktno provideru, bez naše marže." },
  { icon: HiOutlineArrowPath, title: "Redizajn stranica", description: "Osvježavamo zastarjele sajtove — moderan dizajn, brzina i mobilna verzija." },
  { icon: HiOutlineWrenchScrewdriver, title: "Održavanje i podrška", description: "Ongoing podrška, ažuriranja i optimizacija nakon isporuke." },
];

const processSteps = [
  {
    step: "01",
    icon: HiOutlineChatBubbleBottomCenterText,
    title: "Inicijalna konsultacija",
    description:
      "Razgovor o vašim potrebama, ciljevima i očekivanjima. Definišemo scope projekta, tehnologije i timeline.",
  },
  {
    step: "02",
    icon: HiOutlineLightBulb,
    title: "Gotova verzija & potvrda",
    description:
      "Izrađujemo besplatnu gotovu verziju u nekoliko dana. Vidite konkretan smjer projekta prije nego što potpišete bilo šta.",
  },
  {
    step: "03",
    icon: HiOutlineCog6Tooth,
    title: "Razvoj & Implementacija",
    description:
      "Razvijamo vaše digitalno rješenje koristeći moderne i provjerene tehnologije prilagođene vašim potrebama.",
  },
  {
    step: "04",
    icon: HiOutlineBeaker,
    title: "Testiranje & Isporuka",
    description:
      "Temeljno testiranje, deployment i predaja projekta sa kompletnom dokumentacijom i obukom za korištenje.",
  },
];

const facts: { target: number; suffix: string; icon: IconType; text: string }[] = [
  { target: 2023, suffix: "", icon: HiOutlineFlag, text: "Godina osnivanja — fokus na kvalitetu od prvog dana" },
  { target: 100, suffix: "%", icon: HiOutlineUserGroup, text: "Zadovoljnih klijenata — svaki projekat isporučen prema dogovoru" },
  { target: 5, suffix: " dana", icon: HiOutlineRocketLaunch, text: "Do prve besplatne gotove verzije vašeg projekta" },
];

// `link` je za sada fejk redirect (#contact) — kasnije zamijeniti pravim URL-om projekta.
// Projekti za home marquee — isti izvor kao /projekti (localStorage store).
type HomeProject = { id: string; title: string; category: string; image: string; imageMobile?: string; link: string; url: string; description: string };

function useHomeProjects(): HomeProject[] {
  const stored = useSyncExternalStore(subscribeProjects, getStoredProjects, getServerProjects);
  return useMemo(
    () =>
      [...stored]
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((p) => ({
          id: p.id,
          title: p.title,
          category: p.service,
          image: p.imageDesktop,
          imageMobile: p.imageMobile,
          link: p.url || "#contact",
          url: (p.url || "").replace(/^https?:\/\//, "").replace(/\/$/, ""),
          description: p.description,
        })),
    [stored],
  );
}

// Projekti grupirani po usluzi — svaka usluga ima više projekata; na stranici
// /projekti svaki red je slajder kroz projekte te usluge. (Slike su placeholder
// dok korisnik ne ubaci prave snimke/URL-ove.)
type ProjectItem = { title: string; tag: string; url: string; image: string; imageMobile?: string; description: string };
// Hook: projekti iz lokalne baze (admin panel /admin) — pretvara se u iste
// grupe po usluzi koje su prije bile hardkodirane.
function useStoredProjects(): { service: string; items: ProjectItem[] }[] {
  const stored = useSyncExternalStore(subscribeProjects, getStoredProjects, getServerProjects);
  return useMemo(
    () =>
      groupProjects(stored).map((group) => ({
        service: group.service,
        items: group.items.map((p) => ({
          title: p.title,
          tag: p.tag,
          url: p.url,
          image: p.imageDesktop,
          imageMobile: p.imageMobile,
          description: p.description,
        })),
      })),
    [stored],
  );
}

const testimonials = [
  {
    name: "Amir Hadžić",
    role: "Osnivač, tech startup · Sarajevo",
    avatar: images.avatar1,
    text: "Gotovu verziju smo dobili za 5 dana i odmah vidjeli da znaju šta rade. MVP aplikacije isporučen je na vrijeme, a komunikacija je tekla kroz cijeli proces. Predujam nismo platili — račun je stigao tek kad smo bili zadovoljni.",
  },
  {
    name: "Selma Kovačević",
    role: "Vlasnica, online shop · Mostar",
    avatar: images.avatar2,
    text: "Web shop sa preko 150 proizvoda i online plaćanjem radi besprijekorno od prvog dana. Besplatna gotova verzija me uvjerila prije nego što sam išta uplatila, a na pitanja odgovaraju isti dan.",
  },
  {
    name: "Enes Softić",
    role: "Marketing manager · Tuzla",
    avatar: images.avatar3,
    text: "Nakon redizajna stranice osjetno nam je porastao broj upita. Brzo, profesionalno i tačno po dogovoru — iskoristili smo i sve 4 besplatne revizije dok nije bilo savršeno.",
  },
];

const faqs = [
  {
    question: "Da li je gotova verzija zaista besplatna?",
    answer:
      "Da, gotova verzija je potpuno besplatna i bez ikakvih obaveza. Izrađujemo funkcionalan prototip vašeg projekta u roku od 5 radnih dana kako biste vidjeli dizajn, strukturu i osnovne funkcionalnosti prije nego što se odlučite za saradnju. Nema skrivenih troškova niti predujma.",
  },
  {
    question: "Koliko traje razvoj projekta?",
    answer:
      "Vrijeme razvoja zavisi od kompleksnosti projekta. Landing page ili jednostavna web stranica - 1-2 sedmice. Web shop sa payment integracijom - 3-4 sedmice. Mobilna aplikacija - 4-8 sedmica. Tačan timeline definišemo nakon inicijalne konsultacije i analize zahtjeva.",
  },
  {
    question: "Da li nudite podršku nakon završetka projekta?",
    answer:
      "Prvo izrađujemo besplatnu demo verziju vašeg projekta i za nju ne plaćate ništa. Plaćate tek kada vam se demo svidi i kada se dogovorimo za puni razvoj — bez predujma i bez rizika.",
  },
  {
    question: "Koje tehnologije koristite?",
    answer:
      "Koristimo moderne, provjerene tehnologije: Next.js i React za frontend, Laravel i Node.js za backend, Flutter i React Native za mobilne aplikacije. Odabiremo stack prema specifičnim zahtjevima projekta, fokusirajući se na performance, scalability i maintainability. Sve što razvijamo je u skladu sa aktuelnim industry standardima.",
  },
  {
    question: "Koliko košta izrada projekta?",
    answer:
      "Cijene su transparentne i počinju od 150 KM za web stranicu, odnosno od 600 KM za web shop. 2D igrice i kompleksniji sistemi imaju custom cijenu. Tačnu ponudu dajemo nakon besplatne konsultacije i analize zahtjeva — bez skrivenih troškova.",
  },
  {
    question: "Kako teče plaćanje?",
    answer:
      "Plaćate tek kada budete zadovoljni rezultatom. Prvo izrađujemo besplatnu gotovu verziju bez ikakvih obaveza, a tek nakon vaše potvrde krećemo u puni razvoj. Nema predujma niti rizika za vas.",
  },
  {
    question: "Da li je kod i projekat u potpunosti moj?",
    answer:
      "Da, nakon isporuke i izmirenja dogovorene cijene, kompletan kod, dizajn i sva prava nad projektom pripadaju isključivo vama. Dobijate i kompletnu dokumentaciju te kratku obuku za korištenje.",
  },
];

const pricing = [
  {
    title: "Web Stranice",
    price: "150 KM",
    icon: HiOutlineGlobeAlt,
    detailLink: "/usluge/web-stranice",
    items: ["Landing page ili jednostavna web stranica", "UI/UX dizajn uključen u cijenu", "Responzivni dizajn", "Kontakt forma", "Demo se ne plaća", "Postavljanje hostinga i domene"],
  },
  {
    title: "Web Shopovi",
    price: "600 KM",
    icon: HiOutlineShoppingCart,
    detailLink: "/usluge/web-stranice",
    items: ["Kompletan e-commerce sistem", "UI/UX dizajn uključen u cijenu", "Online plaćanje (Stripe, PayPal)", "Admin panel", "Inventory management", "Demo se ne plaća"],
  },
  {
    title: "Mobilne Aplikacije",
    price: "Po dogovoru",
    icon: HiOutlineDevicePhoneMobile,
    detailLink: "/usluge/mobilne-aplikacije",
    items: ["iOS i/ili Android development", "UI/UX dizajn uključen u cijenu", "Backend API integracija", "Push notifications", "User authentication", "App Store deployment", "Dokumentacija"],
  },
];

const techGroups: { title: string; icon: IconType; items: string[] }[] = [
  { title: "Frontend", icon: HiOutlineRectangleGroup, items: ["React & Next.js", "TypeScript", "Tailwind CSS", "Animacije i interakcije"] },
  { title: "Backend", icon: HiOutlineCircleStack, items: ["Node.js & Laravel", "PostgreSQL / MySQL", "REST i GraphQL API", "Autentikacija i sigurnost"] },
  { title: "Mobilne", icon: HiOutlineDevicePhoneMobile, items: ["Flutter & React Native", "iOS i Android", "Push notifikacije", "App Store / Google Play"] },
];

const deliverables: { icon: IconType; title: string; text: string }[] = [
  { icon: HiOutlineSwatch, title: "UI/UX dizajn uključen", text: "Profesionalan, moderan dizajn dolazi uz svaki paket — bez doplate i bez kompromisa na izgledu." },
  { icon: HiOutlineDevicePhoneMobile, title: "Responzivno na svim uređajima", text: "Svaki proizvod izgleda i radi besprijekorno na mobitelu, tabletu i desktopu — kao da je rađen baš za taj ekran." },
  { icon: HiOutlineRocketLaunch, title: "Brza i optimizovana izrada", text: "Optimizovan kod koji se brzo učitava — bolji dojam, niža stopa napuštanja i veća konverzija." },
  { icon: HiOutlineCheckCircle, title: "Demo se ne plaća", text: "Prvo dobijate besplatnu demo verziju projekta — za nju ne plaćate ništa. Plaćanje kreće tek kad se dogovorimo za puni razvoj." },
  { icon: HiOutlineCodeBracketSquare, title: "Čist, dokumentiran kod", text: "Predajemo uredan, održiv kod s dokumentacijom — projekt je u potpunosti vaš." },
  { icon: HiOutlineArrowPath, title: "4 besplatne revizije", text: "Doradjujemo dizajn i funkcionalnosti dok rezultat ne odgovara točno vašoj viziji." },
];

const comparison: { feature: string; devforge: string; others: string }[] = [
  { feature: "Predujam prije početka", devforge: "Ne — plaćate tek na kraju", others: "Obavezan, često 30–50%" },
  { feature: "Besplatna gotova verzija", devforge: "Da, za 5 radnih dana", others: "Rijetko ili uz naplatu" },
  { feature: "Besplatne revizije", devforge: "4 uključene u cijenu", others: "Naplata po svakoj izmjeni" },
  { feature: "Transparentne cijene", devforge: "Javne, od 150 KM", others: "Skrivene stavke i doplate" },
  { feature: "Demo verzija", devforge: "Ne plaća se", others: "Rijetko ili uz naplatu" },
  { feature: "Vlasništvo nad kodom", devforge: "100% pripada vama", others: "Ograničeno ili vezano" },
];

const milestones: { year: string; title: string; text: string }[] = [
  { year: "2023", title: "Osnovan DevForge", text: "Krećemo s jasnom misijom: izrada digitalnih proizvoda bez rizika za klijenta i bez predujma." },
  { year: "2024", title: "Prvih 10 projekata", text: "Web stranice, shopovi i mobilne aplikacije za klijente iz BiH i regiona — model bez predujma se pokazao." },
  { year: "2025", title: "20+ isporučenih projekata", text: "Rastemo na preporukama. 100% klijenata zadovoljno, svaki projekt isporučen prema dogovoru." },
  { year: "Danas", title: "Vaš projekt je sljedeći", text: "Spremni smo preuzeti rizik vašeg sljedećeg digitalnog koraka — počevši od besplatne gotove verzije." },
];

const industries: { icon: IconType; name: string }[] = [
  { icon: HiOutlineShoppingCart, name: "E-commerce i trgovine" },
  { icon: HiOutlineRocketLaunch, name: "Startupi i agencije" },
  { icon: HiOutlineGlobeAlt, name: "Lokalni biznisi i obrti" },
  { icon: HiOutlinePuzzlePiece, name: "Edukacija i 2D igre" },
  { icon: HiOutlineWrenchScrewdriver, name: "Uslužne djelatnosti" },
  { icon: HiOutlineChartBar, name: "SaaS i digitalni proizvodi" },
];

// ── Detaljne podstranice usluga ───────────────────────────────────────────
// Svaka usluga (web / igre / mobilno) ima vlastitu, detaljniju podstranicu.
// Sadržaj je u podacima ispod; layout renderiraju generičke ServiceDetail* komponente.
type PricingPlan = { title: string; price: string; icon: IconType; popular?: boolean; tagline?: string; items: string[]; detailLink?: string };
type PricingGroup = { heading?: string; plans: PricingPlan[] };

type ServiceDetail = {
  name: string;
  icon: IconType;
  image: string;
  title: string;
  intro: string;
  chips: string[];
  typesHeading: string;
  typesSubtitle: string;
  types: { icon: IconType; title: string; text: string }[];
  stackHeading: string;
  stackSubtitle: string;
  stack: { title: string; icon: IconType; items: string[] }[];
  pricingGroups: PricingGroup[];
  pricingSubtitle?: string;
  pricingNote?: string;
  /** Kljuc grupe u pricingStore-u — odakle se citaju cijene (admin panel). */
  pricingKey?: "web" | "webShops" | "games" | "mobile";
  faqs: { question: string; answer: string }[];
};

const serviceDetails: Record<"web" | "games" | "mobile", ServiceDetail> = {
  web: {
    name: "Web stranice",
    icon: HiOutlineGlobeAlt,
    image: images.web,
    title: "Web stranice koje pretvaraju posjetitelje u klijente",
    intro:
      "Od jednostavnog landing page-a do kompletnog web shopa — gradimo brze, responzivne i SEO-spremne web stranice koje izgledaju profesionalno i donose rezultate. Bez predujma, uz besplatnu gotovu verziju za 5 dana.",
    chips: ["Landing page", "Web shop", "Korporativne stranice", "Web aplikacije", "Booking & rezervacije", "Redizajn"],
    typesHeading: "Koje web stranice gradimo",
    typesSubtitle: "Bez obzira na veličinu projekta — od prve online prisutnosti do kompleksnog sistema.",
    types: [
      { icon: HiOutlineRocketLaunch, title: "Landing page", text: "Jedna fokusirana stranica za kampanju, proizvod ili uslugu — napravljena da pretvara posjetitelje u upite, s jasnim pozivom na akciju i brzom izradom." },
      { icon: HiOutlineShoppingCart, title: "Web shop / E-commerce", text: "Kompletna online prodavnica s katalogom, korpom, online plaćanjem i admin panelom za upravljanje proizvodima i narudžbama." },
      { icon: HiOutlineBriefcase, title: "Korporativna stranica", text: "Višestranični sajt koji predstavlja firmu, usluge i tim — s blogom, kontakt formama i CMS-om za samostalno uređivanje sadržaja." },
      { icon: HiOutlineRectangleGroup, title: "Web aplikacija", text: "Custom web aplikacije i interni alati — dashboardi, korisnički portali i sistemi, s autentikacijom i bazom podataka." },
      { icon: HiOutlineClock, title: "Booking & rezervacije", text: "Sistemi za zakazivanje termina i rezervacije s kalendarom, potvrdama i obavijestima — idealno za usluge i ugostiteljstvo." },
      { icon: HiOutlineArrowPath, title: "Redizajn & optimizacija", text: "Osvježavamo postojeće stranice — moderniji dizajn, bolje performanse i SEO, bez gubitka onoga što već dobro radi." },
    ],
    stackHeading: "Tehnologije za web",
    stackSubtitle: "Moderan stack za brze, sigurne i lako održive stranice.",
    stack: [
      { title: "Frontend", icon: HiOutlineRectangleGroup, items: ["React & Next.js", "TypeScript", "Tailwind CSS", "Responzivan, animiran UI"] },
      { title: "Backend & CMS", icon: HiOutlineCircleStack, items: ["Node.js & Laravel", "Headless / custom CMS", "PostgreSQL / MySQL", "REST i GraphQL API"] },
      { title: "Performanse & SEO", icon: HiOutlineChartBar, items: ["Optimizacija brzine", "Tehnički SEO", "Analitika i mjerenje", "Hosting i deployment"] },
    ],
    pricingGroups: [
      {
        heading: "Web stranice",
        plans: [
          {
            title: "Start",
            price: "150–250 KM",
            icon: HiOutlineRocketLaunch,
            tagline: "Idealno za prvu online prisutnost",
            items: ["Landing ili do 5 podstranica", "UI/UX dizajn uključen", "Responzivno (mobitel/tablet/desktop)", "Kontakt forma", "Demo se ne plaća", "Postavljanje hostinga i domene"],
          },
          {
            title: "Business",
            price: "300–450 KM",
            icon: HiOutlineBriefcase,
            popular: true,
            tagline: "Najčešći izbor za firme",
            items: ["Do 12 podstranica + blog", "Premium UI/UX dizajn", "Admin panel (CMS) za uređivanje", "Google Analytics i mjerenje", "Brza izrada i optimizacija", "Postavljanje hostinga i domene"],
          },
          {
            title: "Premium",
            price: "500–800 KM",
            icon: HiOutlineSparkles,
            tagline: "Za zahtjevne, custom projekte",
            items: ["Neograničeno podstranica", "Custom dizajn i animacije", "Napredni CMS + više korisnika", "Višejezičnost", "Integracije (API, CRM, alati)", "Prioritetna podrška", "Postavljanje hostinga i domene"],
          },
        ],
      },
      {
        heading: "Web shopovi",
        plans: [
          {
            title: "Shop Start",
            price: "600–1.000 KM",
            icon: HiOutlineShoppingCart,
            tagline: "Pokrenite online prodaju",
            items: ["Do 50 proizvoda", "UI/UX dizajn uključen", "Korpa i checkout", "Online plaćanje (Stripe ili PayPal)", "Admin panel za proizvode", "Postavljanje hostinga i domene"],
          },
          {
            title: "Shop Business",
            price: "1.200–1.800 KM",
            icon: HiOutlineChartBar,
            popular: true,
            tagline: "Za ozbiljne online trgovine",
            items: ["Do 500 proizvoda", "Premium UI/UX dizajn", "Više opcija plaćanja (Stripe, PayPal…)", "Kuponi, popusti i akcije", "Upravljanje zalihama", "Postavljanje hostinga i domene"],
          },
          {
            title: "Shop Premium",
            price: "2.000–3.500 KM",
            icon: HiOutlineSparkles,
            tagline: "Skalabilna e-commerce platforma",
            items: ["Neograničeno proizvoda", "Custom dizajn i funkcionalnosti", "Integracije (ERP, dostava, fiskalizacija)", "Višejezičnost i više valuta", "Marketing i email automatizacija", "Prioritetna podrška", "Postavljanje hostinga i domene"],
          },
        ],
      },
    ],
    pricingKey: "web",
    pricingSubtitle: "Tri paketa za web stranice i tri za web shopove — UI/UX dizajn uključen u svaki paket.",
    pricingNote: "Hosting i domena se plaćaju dodatno (ako ih nemate) — postavljamo ih, a plaćate direktno provideru otprilike 50–100 KM godišnje, ovisno o domeni (uključuje i poslovni email i ostalo što ide uz to), bez naše marže; ako ih već imate, samo se povežemo. Online plaćanje povezujemo sa Stripe, PayPal ili sličnim servisom koji već koristite. Osnovna SEO podešavanja (meta naslovi i opisi) uključena su kao dodatak. Održavanje i podrška: opcionalno, po dogovoru. Tačnu ponudu dobijate nakon besplatne konsultacije, bez skrivenih troškova.",
    faqs: [
      { question: "Koliko košta web stranica?", answer: "Web stranice počinju od 150 KM za landing/jednostavnu stranicu, a web shopovi od 600 KM. Tačnu ponudu dobijate nakon besplatne konsultacije — bez skrivenih troškova." },
      { question: "Koliko traje izrada?", answer: "Landing page ili jednostavna stranica obično 1–2 sedmice, web shop 3–4 sedmice. Prvu besplatnu gotovu verziju vidite već za 5 radnih dana." },
      { question: "Hoće li stranica raditi na mobitelu?", answer: "Da — svaka stranica je u potpunosti responzivna i testirana na mobitelu, tabletu i desktopu, s posebnom pažnjom na brzinu učitavanja." },
      { question: "Mogu li sam uređivati sadržaj?", answer: "Da, ugrađujemo CMS prilagođen vama uz kratku obuku, tako da možete samostalno mijenjati tekstove, slike i proizvode." },
    ],
  },
  games: {
    name: "2D igrice",
    icon: HiOutlinePuzzlePiece,
    image: images.game,
    title: "2D igrice koje zadržavaju pažnju i zabavljaju",
    intro:
      "Razvijamo 2D igrice za web i mobitel — od casual i edukativnih igara do promotivnih i brendiranih iskustava. Engaging mehanike, čist dizajn i glatke performanse na svim uređajima.",
    chips: ["Casual igre", "Edukativne igre", "Advergaming", "Web igre", "Mobilne igre", "Leaderboards"],
    typesHeading: "Kakve igre razvijamo",
    typesSubtitle: "Od jednostavne ideje do gotove igre — prilagođeno cilju i publici.",
    types: [
      { icon: HiOutlinePuzzlePiece, title: "Casual & arcade", text: "Lagane, zarazne igre s jednostavnim pravilima i sistemom nivoa, bodova i nagrada koji vraćaju igrače iznova." },
      { icon: HiOutlineLightBulb, title: "Edukativne igre", text: "Učenje kroz igru — kvizovi, izazovi i nivoi koji djecu i odrasle drže angažiranima dok usvajaju znanje." },
      { icon: HiOutlineSparkles, title: "Advergaming / promo", text: "Brendirane igre za marketinške kampanje — povezuju vaš brand sa zabavom i znatno povećavaju angažman." },
      { icon: HiOutlineGlobeAlt, title: "Web igre", text: "Igre koje rade direktno u browseru, bez instalacije — idealne za kampanje, sajtove i društvene mreže." },
      { icon: HiOutlineDevicePhoneMobile, title: "Mobilne igre", text: "2D igre za Android i iOS s podrškom za touch kontrole, zvuk i offline igranje." },
      { icon: HiOutlineChartBar, title: "Leaderboards & nagrade", text: "Sistemi bodovanja, rang-liste i nagrade koji potiču takmičenje i ponovno igranje." },
    ],
    stackHeading: "Tehnologije za igre",
    stackSubtitle: "Provjereni alati za glatke 2D igre na webu i mobitelu.",
    stack: [
      { title: "Game engine", icon: HiOutlinePuzzlePiece, items: ["Phaser / PixiJS", "Unity (2D)", "Canvas & WebGL", "2D animacije"] },
      { title: "Platforme", icon: HiOutlineDevicePhoneMobile, items: ["Web (browser)", "Android & iOS", "Touch i tastatura", "Offline podrška"] },
      { title: "Mehanike & sistemi", icon: HiOutlineCog6Tooth, items: ["Nivoi i progresija", "Bodovi i nagrade", "Leaderboards", "Zvuk i efekti"] },
    ],
    pricingGroups: [
      {
        plans: [
          {
            title: "Mini",
            price: "Po dogovoru",
            icon: HiOutlineRocketLaunch,
            tagline: "Jednostavna casual ili promo igra",
            items: ["1 igra, jedan nivo/mehanika", "2D grafika i dizajn uključeni", "Web ILI mobitel", "Bodovi i osnovni scoring", "Zvuk i osnovne animacije", "Optimizacija performansi", "Dokumentacija"],
          },
          {
            title: "Standard",
            price: "Po dogovoru",
            icon: HiOutlinePuzzlePiece,
            popular: true,
            tagline: "Igra s više nivoa i sistema",
            items: ["Više nivoa i progresija", "Custom 2D grafika i likovi", "Web I mobitel (Android/iOS)", "Leaderboards i nagrade", "Napredne mehanike", "Zvuk i bogate animacije", "Dokumentacija + upute"],
          },
          {
            title: "Premium",
            price: "Po dogovoru",
            icon: HiOutlineSparkles,
            tagline: "Kompleksna ili brendirana igra",
            items: ["Kompleksne custom mehanike", "Originalni art i animacije", "Multiplatforma + objava u trgovinama", "Online rang-liste i nalozi", "Integracije (analitika, oglasi)", "Prioritetna podrška", "Kontinuirane nadogradnje"],
          },
        ],
      },
    ],
    pricingKey: "games",
    pricingSubtitle: "Tri paketa za 2D igre — od jednostavne promo igre do kompleksnog, brendiranog iskustva. Dizajn i 2D grafika uvijek uključeni.",
    pricingNote: "Cijene zavise od kompleksnosti mehanika, broja nivoa i grafike. Hosting (za web igre): plaćate direktno provideru, od ~50 KM/godišnje, bez naše marže. Održavanje i nove funkcije: opcionalno, po dogovoru. Nakon besplatne konsultacije dajemo tačnu ponudu.",
    faqs: [
      { question: "Za koje platforme razvijate igre?", answer: "Razvijamo 2D igre koje rade u web browseru, kao i mobilne igre za Android i iOS. Istu igru često možemo isporučiti i za web i za mobitel." },
      { question: "Koliko košta izrada igre?", answer: "2D igre imaju cijenu po dogovoru jer ovise o kompleksnosti mehanika, broju nivoa i grafici. Nakon besplatne konsultacije dajemo tačnu ponudu." },
      { question: "Možete li napraviti igru za marketinšku kampanju?", answer: "Da — promotivne (advergaming) igre su odličan način da povežete brand sa zabavom. Pravimo brendirane igre prilagođene vašoj kampanji." },
      { question: "Tko izrađuje grafiku i dizajn igre?", answer: "Dizajn i 2D grafika su uključeni — kreiramo vizuale, likove i animacije u skladu s vašim brendom i ciljanom publikom." },
    ],
  },
  mobile: {
    name: "Mobilne aplikacije",
    icon: HiOutlineDevicePhoneMobile,
    image: images.mobile,
    title: "Mobilne aplikacije za iOS i Android",
    intro:
      "Gradimo brze, pouzdane i lijepe mobilne aplikacije — od MVP-a do potpuno opremljenog proizvoda s backendom. Jedan kod za obje platforme, native osjećaj i fokus na korisničko iskustvo.",
    chips: ["iOS & Android", "MVP za startupe", "Business aplikacije", "E-commerce", "Push notifikacije", "Backend & API"],
    typesHeading: "Kakve aplikacije gradimo",
    typesSubtitle: "Od ideje i MVP-a do skalabilnog proizvoda s integracijama.",
    types: [
      { icon: HiOutlineRocketLaunch, title: "MVP za startupe", text: "Brzo lansiranje prve verzije proizvoda da testirate ideju na tržištu — fokus na ključne funkcije i brzu isporuku." },
      { icon: HiOutlineBriefcase, title: "Business & interne aplikacije", text: "Aplikacije za upravljanje timovima, zadacima i podacima — digitaliziraju procese i ubrzavaju svakodnevni rad." },
      { icon: HiOutlineShoppingCart, title: "E-commerce aplikacije", text: "Mobilne prodavnice s katalogom, korpom, plaćanjem i push obavijestima o akcijama i narudžbama." },
      { icon: HiOutlineUserGroup, title: "Aplikacije s nalozima", text: "Aplikacije s registracijom, profilima i korisničkim sadržajem — društvene, fitness, edukativne i slične." },
      { icon: HiOutlineCodeBracketSquare, title: "Integracije & API", text: "Povezujemo aplikaciju s vašim postojećim sistemima, plaćanjima i servisima trećih strana." },
      { icon: HiOutlineWrenchScrewdriver, title: "Održavanje & nadogradnja", text: "Nakon lansiranja pratimo, ažuriramo i nadograđujemo aplikaciju kako raste broj korisnika." },
    ],
    stackHeading: "Tehnologije za mobilno",
    stackSubtitle: "Cross-platform pristup — jedan kod, obje platforme, native performanse.",
    stack: [
      { title: "Aplikacija", icon: HiOutlineDevicePhoneMobile, items: ["Flutter & React Native", "iOS i Android", "Native osjećaj i animacije", "Offline podrška"] },
      { title: "Backend", icon: HiOutlineCircleStack, items: ["Node.js & Laravel", "REST i GraphQL API", "Baza podataka", "Autentikacija i sigurnost"] },
      { title: "Servisi", icon: HiOutlineCog6Tooth, items: ["Push notifikacije", "Plaćanja u aplikaciji", "Analitika", "App Store & Google Play"] },
    ],
    pricingGroups: [
      {
        plans: [
          {
            title: "MVP",
            price: "Po dogovoru",
            icon: HiOutlineRocketLaunch,
            tagline: "Lansirajte prvu verziju brzo",
            items: ["Ključne funkcije (MVP)", "UI/UX dizajn uključen", "iOS I Android (jedan kod)", "Osnovni backend i baza", "Registracija i prijava", "Objava u trgovinama", "Dokumentacija"],
          },
          {
            title: "Business",
            price: "Po dogovoru",
            icon: HiOutlineDevicePhoneMobile,
            popular: true,
            tagline: "Potpuno opremljena aplikacija",
            items: ["Sve iz MVP paketa", "Napredni backend i API", "Push notifikacije", "Plaćanja u aplikaciji", "Analitika i izvještaji", "Integracije (servisi trećih strana)", "Dokumentacija + upute"],
          },
          {
            title: "Premium",
            price: "Po dogovoru",
            icon: HiOutlineSparkles,
            tagline: "Skalabilan proizvod s podrškom",
            items: ["Custom funkcionalnosti", "Skalabilna arhitektura", "Realtime i offline podrška", "Admin panel za upravljanje", "Napredna sigurnost", "Prioritetna podrška", "Kontinuirane nadogradnje"],
          },
        ],
      },
    ],
    pricingKey: "mobile",
    pricingSubtitle: "Tri paketa za mobilne aplikacije — od brzog MVP-a do skalabilnog proizvoda. UI/UX dizajn uključen u svaki paket.",
    pricingNote: "Cijene zavise od funkcija, integracija i platformi. Objavu na App Store i Google Play radimo mi (uz godišnje naknade trgovina). Backend hosting: plaćate direktno provideru, bez naše marže. Održavanje i nadogradnje: opcionalno, po dogovoru.",
    faqs: [
      { question: "Razvijate li za obje platforme (iOS i Android)?", answer: "Da. Koristimo cross-platform tehnologije (Flutter, React Native) pa istom bazom koda pokrivamo i iOS i Android — brže i povoljnije, uz native osjećaj." },
      { question: "Koliko košta mobilna aplikacija?", answer: "Cijena je po dogovoru jer ovisi o funkcijama i integracijama. Krećemo od besplatne konsultacije i gotove verzije, pa dobijate jasnu ponudu bez skrivenih troškova." },
      { question: "Objavljujete li aplikaciju na App Store i Google Play?", answer: "Da — objavu na App Store i Google Play radimo mi, uključujući pripremu materijala i ispunjavanje tehničkih zahtjeva trgovina." },
      { question: "Mogu li krenuti s MVP-om pa nadograđivati?", answer: "Naravno — preporučujemo da krenete s MVP-om ključnih funkcija, lansirate brzo, pa aplikaciju nadograđujemo na osnovu stvarnih korisnika." },
    ],
  },
};

function Logo() {
  return (
    <a href="/" className="group inline-flex items-center gap-2.5" aria-label="DevForge početna">
      {/* Forge-mark: terminalni prompt >_ , kursor "žari" kao usijani metal = Dev + Forge */}
      <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-[#0B0B0F] transition duration-300 group-hover:border-teal-400/60">
        <svg viewBox="0 0 24 24" className="relative z-10 h-[1.3rem] w-[1.3rem]" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="forgeGrad" x1="5" y1="7" x2="19" y2="17" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2DD4BF" />
              <stop offset="1" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          {/* prompt > */}
          <path d="M6.5 7.5 11 12l-4.5 4.5" stroke="url(#forgeGrad)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          {/* kursor-ember (usijani metal) */}
          <rect x="13" y="14.4" width="5" height="2.3" rx="1.15" fill="url(#forgeGrad)" className="origin-center transition-transform duration-500 group-hover:scale-110" />
        </svg>
        {/* žar koji se rasplamsa na hover */}
        <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.3),transparent_65%)]" aria-hidden="true" />
      </span>
      <span className="text-xl font-extrabold tracking-tight">
        <span className="text-white">Dev</span>
        <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">Forge</span>
      </span>
    </a>
  );
}

function NavLink({ href, label, active = false, hasCaret = false }: { href: string; label: string; active?: boolean; hasCaret?: boolean }) {
  return (
    <a href={href} className={`group relative inline-flex items-center gap-1 py-1 transition ${active ? "text-white" : "text-white/70 hover:text-white"}`}>
      {label}
      {hasCaret && <HiOutlineChevronDown className="text-xs transition group-hover:rotate-180" aria-hidden="true" />}
      <span className={`pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} aria-hidden="true" />
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const route = useAppRoute();

  const isHome = route === "/";
  const isAbout = route.startsWith("/o-nama");
  const isServices = route.startsWith("/usluge");
  const isProjects = route.startsWith("/projekti");
  const isInfo = route.startsWith("/utisci") || route.startsWith("/cijene") || route.startsWith("/cesta-pitanja");
  const isKontakt = route.startsWith("/kontakt");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
    <header className="pt-safe fixed inset-x-0 top-0 z-50 px-3 transition duration-300 md:px-6">
      {/* 2026 floating "island" traka — odvojena od vrha, angularna (oštri uglovi), blur */}
      <div
        className={`navbar-island relative mx-auto flex max-w-7xl items-center justify-between border px-5 transition-all duration-300 md:px-7 ${
          scrolled
            ? "mt-2 border-white/15 bg-[#060606]/85 py-2.5 shadow-2xl shadow-black/40 backdrop-blur-xl md:mt-3"
            : "mt-3 border-white/10 bg-[#0A0A0C]/50 py-3.5 shadow-xl shadow-black/25 backdrop-blur-md md:mt-5"
        }`}
      >
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" aria-hidden="true" />
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex">
          <NavLink href="/" label="Početna" active={isHome} />
          <NavLink href="/o-nama" label="O nama" active={isAbout} />
          <div className="group relative py-2">
            <a className={`relative inline-flex items-center gap-1 py-1 transition ${isServices ? "text-white" : "text-white/70 hover:text-white"}`} href="/usluge">
              Usluge
              <HiOutlineChevronDown className="text-xs transition group-hover:rotate-180" aria-hidden="true" />
              <span className={`pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 transition-transform duration-300 ${isServices ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} aria-hidden="true" />
            </a>
            <div className="invisible absolute left-0 top-full w-[36rem] translate-y-3 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="relative grid grid-cols-[1.5fr_1fr] overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A]/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/60 to-transparent" aria-hidden="true" />
                <div className="p-3">
                  <p className="px-3 pb-1 pt-1 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/40">Usluge</p>
                  {serviceLinks.map((link) => (
                    <a key={link.label} className="group/item flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/[0.05]" href={link.href}>
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500/20 to-cyan-500/15 text-base text-teal-300 ring-1 ring-white/10 transition group-hover/item:from-teal-500/30 group-hover/item:text-white">
                        <link.icon aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-white/90 transition group-hover/item:text-white">{link.label}</span>
                        <span className="mt-0.5 block text-xs leading-snug text-white/45">{link.desc}</span>
                      </span>
                    </a>
                  ))}
                  <a className="mt-1 flex items-center justify-between gap-2 border-t border-white/10 px-3 pt-3 pb-1.5 text-sm font-bold text-teal-200 transition hover:text-white" href="/usluge">
                    Sve usluge
                    <HiOutlineChevronRight className="text-xs" aria-hidden="true" />
                  </a>
                </div>
                <a className="group/feat relative flex flex-col justify-end gap-2 border-l border-white/10 bg-gradient-to-br from-teal-500/15 via-cyan-500/10 to-transparent p-5 transition hover:from-teal-500/25" href="#contact">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-teal-300/30 bg-teal-300/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-teal-200">
                    <HiOutlineRocketLaunch aria-hidden="true" /> Gotovo za 5 dana
                  </span>
                  <p className="text-base font-extrabold leading-tight text-white">Probajte bez rizika</p>
                  <p className="text-xs leading-relaxed text-white/55">Besplatna gotova verzija za 5 dana. Bez predujma — plaćate tek kad ste zadovoljni.</p>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-teal-200 transition group-hover/feat:gap-2.5 group-hover/feat:text-white">
                    Zatražite gotovu verziju <HiOutlineChevronRight className="text-xs" aria-hidden="true" />
                  </span>
                </a>
              </div>
            </div>
          </div>
          <NavLink href="/projekti" label="Projekti" active={isProjects} />
          <div className="group relative py-2">
            <button className={`group relative inline-flex items-center gap-1 py-1 transition ${isInfo ? "text-white" : "text-white/70 hover:text-white"}`} type="button">
              Info
              <HiOutlineChevronDown className="text-xs transition group-hover:rotate-180" aria-hidden="true" />
              <span className={`pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 transition-transform duration-300 ${isInfo ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} aria-hidden="true" />
            </button>
            <div className="invisible absolute left-0 top-full w-[36rem] max-w-[calc(100vw-1.5rem)] translate-y-3 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="relative grid grid-cols-[1.5fr_1fr] overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A]/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/60 to-transparent" aria-hidden="true" />
                <div className="p-3">
                  <p className="px-3 pb-1 pt-1 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/40">Info</p>
                  {menuInfoLinks.map((link) => (
                    <a key={link.label} className="group/item flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/[0.05]" href={link.href}>
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500/20 to-cyan-500/15 text-base text-teal-300 ring-1 ring-white/10 transition group-hover/item:from-teal-500/30 group-hover/item:text-white">
                        <link.icon aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-white/90 transition group-hover/item:text-white">{link.label}</span>
                        <span className="mt-0.5 block text-xs leading-snug text-white/45">{link.desc}</span>
                      </span>
                    </a>
                  ))}
                  <a className="mt-1 flex items-center justify-between gap-2 border-t border-white/10 px-3 pt-3 pb-1.5 text-sm font-bold text-teal-200 transition hover:text-white" href="/kontakt">
                    Kontaktirajte nas
                    <HiOutlineChevronRight className="text-xs" aria-hidden="true" />
                  </a>
                </div>
                <a className="group/feat relative flex flex-col justify-end gap-2 border-l border-white/10 bg-gradient-to-br from-teal-500/15 via-cyan-500/10 to-transparent p-5 transition hover:from-teal-500/25" href="/cijene">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-teal-300/30 bg-teal-300/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-teal-200">
                    <HiOutlineBanknotes aria-hidden="true" /> Cijene
                  </span>
                  <p className="text-base font-extrabold leading-tight text-white">Web već od 150 KM</p>
                  <p className="text-xs leading-relaxed text-white/55">Transparentni paketi bez skrivenih troškova — među najpovoljnijima na tržištu.</p>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-teal-200 transition group-hover/feat:gap-2.5 group-hover/feat:text-white">
                    Pogledajte cijene <HiOutlineChevronRight className="text-xs" aria-hidden="true" />
                  </span>
                </a>
              </div>
            </div>
          </div>
          <NavLink href="/kontakt" label="Kontakt" active={isKontakt} />
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <Magnetic strength={0.4}>
            <a className="group inline-flex items-center gap-2 rounded-none bg-gradient-to-r from-teal-400 to-[#0891B2] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-500/20 transition hover:scale-[1.02] hover:shadow-teal-500/40 focus:outline-none focus:ring-2 focus:ring-teal-300" href="#contact">
              <HiOutlineRocketLaunch className="text-base transition group-hover:rotate-12" aria-hidden="true" />
              Zatražite gotovu verziju
            </a>
          </Magnetic>
        </div>
        <button
          className="navbar-toggle inline-flex h-11 w-11 items-center justify-center border border-white/25 bg-[#060606]/65 text-white shadow-lg shadow-black/40 backdrop-blur-md lg:hidden"
          type="button"
          aria-label="Otvori navigaciju"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-white" />
            <span className="block h-0.5 w-5 bg-white" />
            <span className="block h-0.5 w-5 bg-white" />
          </span>
        </button>
      </div>
    </header>
      {menuOpen && (
        <div className="menu-overlay fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm lg:hidden" onClick={closeMenu} role="dialog" aria-modal="true" aria-label="Glavna navigacija">
          <div
            className="menu-panel pt-safe pb-safe ml-auto flex h-full w-full max-w-[20rem] flex-col border-l border-white/10 bg-[#060608] bg-gradient-to-b from-[#0C0C10] to-[#070708] shadow-2xl shadow-black/60"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <Logo />
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-none border border-white/10 bg-white/[0.03] text-2xl text-white/80 transition hover:border-teal-300/50 hover:bg-white hover:text-black"
                type="button"
                aria-label="Zatvori navigaciju"
                onClick={closeMenu}
              >
                <HiOutlineXMark aria-hidden="true" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-5">
              <p className="px-2 pb-2 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white/35">Navigacija</p>
              <div className="space-y-1.5">
                {navItems.map((item, itemIndex) =>
                  item.label === "Usluge" ? (
                    <div key={item.label} className="menu-item" style={{ animationDelay: `${0.05 + itemIndex * 0.05}s` }}>
                      <button
                        className="group flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-3.5 text-left text-base font-semibold text-white/85 transition hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
                        type="button"
                        aria-expanded={servicesOpen}
                        onClick={() => setServicesOpen((value) => !value)}
                      >
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500/25 to-cyan-500/20 text-lg text-teal-200 ring-1 ring-white/10">
                          <item.icon aria-hidden="true" />
                        </span>
                        <span className="flex-1">{item.label}</span>
                        <HiOutlineChevronDown className={`text-white/40 transition ${servicesOpen ? "rotate-180 text-teal-200" : ""}`} aria-hidden="true" />
                      </button>
                      <div className={`grid transition-all duration-300 ${servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                        <div className="overflow-hidden">
                          <div className="ml-5 space-y-1 border-l border-white/10 pl-3 pt-1">
                            {serviceLinks.map((link) => (
                              <a
                                key={link.label}
                                className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/65 transition hover:bg-white/[0.05] hover:text-white"
                                href={link.href}
                                onClick={closeMenu}
                              >
                                <link.icon className="text-base text-teal-300/80" aria-hidden="true" />
                                {link.label}
                              </a>
                            ))}
                            <a
                              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold text-teal-200 transition hover:bg-white/[0.05] hover:text-white"
                              href="/usluge"
                              onClick={closeMenu}
                            >
                              Sve usluge
                              <HiOutlineChevronRight className="text-xs" aria-hidden="true" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a
                      key={item.label}
                      className="menu-item group flex items-center gap-3 rounded-xl border border-transparent px-3 py-3.5 text-base font-semibold text-white/85 transition hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
                      style={{ animationDelay: `${0.05 + itemIndex * 0.05}s` }}
                      href={item.href}
                      onClick={closeMenu}
                    >
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500/25 to-cyan-500/20 text-lg text-teal-200 ring-1 ring-white/10 transition group-hover:from-teal-500 group-hover:to-[#0E7490] group-hover:text-white">
                        <item.icon aria-hidden="true" />
                      </span>
                      <span className="flex-1">{item.label}</span>
                      <HiOutlineChevronRight className="text-white/25 transition group-hover:translate-x-0.5 group-hover:text-teal-200" aria-hidden="true" />
                    </a>
                  ),
                )}

                <button
                  className="menu-item group flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-3.5 text-left text-base font-semibold text-white/85 transition hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
                  style={{ animationDelay: `${0.05 + navItems.length * 0.05}s` }}
                  type="button"
                  aria-expanded={infoOpen}
                  onClick={() => setInfoOpen((value) => !value)}
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500/25 to-cyan-500/20 text-lg text-teal-200 ring-1 ring-white/10">
                    <HiOutlineRectangleGroup aria-hidden="true" />
                  </span>
                  <span className="flex-1">Info</span>
                  <HiOutlineChevronDown className={`text-white/40 transition ${infoOpen ? "rotate-180 text-teal-200" : ""}`} aria-hidden="true" />
                </button>

                <div className={`grid transition-all duration-300 ${infoOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="ml-5 space-y-1 border-l border-white/10 pl-3 pt-1">
                      {menuInfoLinks.map((link) => (
                        <a
                          key={link.label}
                          className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/65 transition hover:bg-white/[0.05] hover:text-white"
                          href={link.href}
                          onClick={closeMenu}
                        >
                          <link.icon className="text-base text-teal-300/80" aria-hidden="true" />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            <div className="border-t border-white/10 px-4 pb-5 pt-4">
              <a
                className="inline-flex w-full items-center justify-center gap-2 rounded-none bg-gradient-to-r from-teal-400 to-[#0891B2] px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-teal-500/20 transition hover:scale-[1.02]"
                href="#contact"
                onClick={closeMenu}
              >
                <HiOutlineRocketLaunch className="text-base" aria-hidden="true" />
                Zatražite gotovu verziju
              </a>
              <div className="mt-4 flex items-center justify-between px-1">
                <a className="text-sm font-medium text-white/55 transition hover:text-white" href="mailto:info@devforge.ba">
                  info@devforge.ba
                </a>
                <div className="flex gap-2">
                  <a className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-teal-300 hover:bg-white hover:text-black" href="https://www.linkedin.com/company/devforge" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FaLinkedinIn className="text-sm" />
                  </a>
                  <a className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-teal-300 hover:bg-white hover:text-black" href="https://www.instagram.com/devforge.ba" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram className="text-sm" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Preloader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const duration = 1800; // ~1.8s loading

    const tick = (time: number) => {
      const t = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        // kratka pauza na 100%, pa fade-out (kao devgen-react ulazak)
        window.setTimeout(() => setHidden(true), 350);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.body.style.overflow = hidden ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [hidden]);

  return (
    <div className={`preloader ${hidden ? "preloader-hidden" : ""}`} aria-hidden={hidden} role="status">
      <span className="preloader-panel preloader-panel-left" aria-hidden="true" />
      <span className="preloader-panel preloader-panel-right" aria-hidden="true" />
      <div className="preloader-inner">
        <p className="preloader-logo">DevForge</p>
        <div className="preloader-bar">
          <span className="preloader-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="preloader-text">Loading... {progress}%</p>
      </div>
    </div>
  );
}

// Zavjesa pri promjeni stranice (redirect): SAMO ploče (bez logotipa/progress bara) —
// instant prekriju ekran pa se brzo otvore. Prvo učitavanje koristi puni <Preloader/>.
function RouteCurtain({ trigger }: { trigger: string }) {
  const [phase, setPhase] = useState<"idle" | "cover" | "open">("idle");
  const firstRef = useRef(true);

  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false; // prvi mount: Preloader to pokriva, preskoči
      return;
    }
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // bez animacije za reduced-motion
    }
    setPhase("cover"); // instant prekrij (ploče na translateX(0))
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setPhase("open")); // sljedeći frame: otvori zavjesu
    });
    const done = window.setTimeout(() => setPhase("idle"), 650); // po završetku otvaranja ukloni
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(done);
    };
  }, [trigger]);

  if (phase === "idle") return null;
  return (
    <div className={`route-curtain ${phase === "open" ? "route-curtain-open" : ""}`} aria-hidden="true">
      <span className="preloader-panel preloader-panel-left" />
      <span className="preloader-panel preloader-panel-right" />
    </div>
  );
}

function SectionHeading({ title, subtitle, align = "left", icon: Icon, eyebrow, tone = "dark" }: { title: string; subtitle?: string; align?: "left" | "center"; icon?: IconType; eyebrow?: string; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <Reveal direction="up" className={`space-y-4 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      {Icon && (
        <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] ${light ? "border-black/10 bg-black/[0.04] text-teal-700" : "border-white/10 bg-white/[0.04] text-teal-200"} ${align === "center" ? "mx-auto" : ""}`}>
          <Icon className={`text-base ${light ? "text-teal-600" : "text-teal-300"}`} aria-hidden="true" />
          {eyebrow ?? title}
        </span>
      )}
      <h2 className={`text-3xl font-extrabold tracking-tight md:text-5xl ${light ? "text-[#0B0B0F]" : "text-white"}`}>{title}</h2>
      {subtitle && <p className={`text-base leading-7 md:text-lg ${light ? "text-[#5A5D6E]" : "text-[#A7AABB]"}`}>{subtitle}</p>}
    </Reveal>
  );
}

function HeroLogos() {
  const logos = useMemo(() => [...companyLogos, ...companyLogos], []);
  return (
    <div className="border-y border-white/10 bg-[#080808] py-7" aria-label="Tehnologije koje koristimo">
      <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.25em] text-white/40">Gradimo modernim, provjerenim tehnologijama</p>
      <div className="mx-auto max-w-7xl overflow-hidden px-5 md:px-8">
        <div className="logo-track flex items-center gap-4">
          {logos.map((logo, index) => (
            <div key={`${logo}-${index}`} className="logo-item flex h-16 shrink-0 items-center justify-center border border-white/10 bg-white/[0.03] text-sm font-extrabold uppercase tracking-[0.25em] text-white/45">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type HeroSlide = {
  image: string;
  imageMobile: string;
  eyebrow: string;
  title: ReactNode;
  subtitle: ReactNode;
  secondaryHref: string;
  secondaryLabel: string;
};

function Hero() {
  // Tri slajda — svaki sa svojom slikom I marketinškom porukom. Prvi je opći
  // (proizvodi), drugi ističe "bez predujma + demo", treći ističe povoljne cijene.
  const heroSlides = useMemo<HeroSlide[]>(
    () => [
      {
        image: images.hero,
        imageMobile: images.heroMobile,
        eyebrow: "DevForge · Digitalna agencija iz BiH",
        title: (
          <>
            Web, mobilne aplikacije i igre koje <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">pokreću vaš biznis</span>
          </>
        ),
        subtitle: (
          <>
            Od ideje do gotovog proizvoda za nekoliko sedmica. Izrađujemo besplatnu gotovu verziju za 5 dana — <span className="font-semibold text-white">plaćate tek kada budete zadovoljni.</span>
          </>
        ),
        secondaryHref: "#services",
        secondaryLabel: "Pogledajte usluge",
      },
      {
        image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
        imageMobile: "https://images.pexels.com/photos/12899162/pexels-photo-12899162.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1500&w=800",
        eyebrow: "Bez rizika za vas",
        title: (
          <>
            Bez predujma — <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">platite tek kad ste zadovoljni</span>
          </>
        ),
        subtitle: (
          <>
            Druge agencije traže 30–50% unaprijed. Mi krećemo na povjerenje i za <span className="font-semibold text-white">5 dana izrađujemo besplatnu gotovu verziju</span> vašeg projekta. Prvo vidite konkretan rezultat — plaćate tek kad ste sigurni. Sav rizik je na nama.
          </>
        ),
        secondaryHref: "#about",
        secondaryLabel: "Zašto baš mi",
      },
      {
        image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
        imageMobile: "https://images.pexels.com/photos/5474282/pexels-photo-5474282.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1500&w=800",
        eyebrow: "Najpovoljniji u BiH",
        title: (
          <>
            Web stranica već <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">od 150 KM</span>
          </>
        ),
        subtitle: (
          <>
            Dok agencije počinju od 1.500 KM, kod nas web stranica kreće od <span className="font-semibold text-white">150 KM</span>, a web shop od <span className="font-semibold text-white">600 KM</span>. Iste provjerene tehnologije i profesionalan dizajn — bez agencijskih cijena i bez skrivenih troškova.
          </>
        ),
        secondaryHref: "#pricing",
        secondaryLabel: "Pogledajte cijene",
      },
    ],
    [],
  );
  const [active, setActive] = useState(0);
  const slide = heroSlides[active];
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  // Mouse-parallax dubina: pozadinski sloj se suptilno pomjera prema mišu (samo desktop).
  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `scale(1.06) translate(${x * -16}px, ${y * -16}px)`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section id="home" className="hero-dvh relative flex min-h-screen items-end overflow-hidden bg-[#060606] pt-28">
      <div ref={bgRef} className="hero-parallax absolute inset-0">
        {heroSlides.map((s, index) => (
          <picture key={s.image} className={`hero-img absolute inset-0 block h-full w-full ${index === active ? "is-active" : ""}`}>
            {/* Mobitel (<640px) dobija portret crop iste fotografije; desktop ostaje isti. */}
            <source media="(max-width: 639px)" srcSet={s.imageMobile} />
            <img
              className="h-full w-full object-cover"
              src={s.image}
              alt="DevForge digitalna rješenja"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </picture>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060606] via-[#060606]/90 to-[#060606]/45 md:via-[#060606]/80 md:to-[#060606]/25" />
        <div className="absolute inset-0 bg-[#060606]/55 md:bg-[#060606]/15" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#060606] to-transparent" />
      </div>
      {/* Carousel indikatori - vertikalno lijevo na desktopu, sakriveni na mobilu (vide se ispod CTA) */}
      <div className="absolute left-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {heroSlides.map((s, index) => (
          <button
            key={s.image}
            type="button"
            aria-label={`Prikaži slajd ${index + 1}`}
            className={`w-2.5 rounded-full transition ${index === active ? "h-8 bg-white" : "h-2.5 bg-white/30 hover:bg-white/55"}`}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 md:px-8 md:pb-28">
        <div key={active} className="hero-copy hero-slide-in max-w-3xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-200 backdrop-blur-sm">
            <HiOutlineSparkles aria-hidden="true" />
            {slide.eyebrow}
          </span>
          <h1 className="hero-headline text-[2rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.03] lg:text-7xl">
            {slide.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#D4D7E3] sm:text-lg sm:leading-8">
            {slide.subtitle}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-8">
            <Magnetic className="w-full sm:w-auto">
              <a className="cta-glow inline-flex w-full items-center justify-center rounded-none bg-gradient-to-r from-teal-400 to-[#0891B2] px-7 py-4 text-sm font-extrabold text-white transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-teal-300 sm:w-auto" href="#contact">
                {CTA_LABEL}
              </a>
            </Magnetic>
            <a className="hidden w-full items-center justify-center gap-2 rounded-none border border-white/20 px-7 py-4 text-sm font-bold text-white transition hover:border-teal-300 hover:bg-white/[0.05] sm:inline-flex sm:w-auto" href={slide.secondaryHref}>
              {slide.secondaryLabel}
            </a>
          </div>
          {/* Indikatori na mobilu - horizontalno ispod CTA */}
          <div className="mt-8 flex gap-3 md:hidden">
            {heroSlides.map((s, index) => (
              <button
                key={s.image}
                type="button"
                aria-label={`Prikaži slajd ${index + 1}`}
                className={`h-2.5 rounded-full transition ${index === active ? "w-8 bg-white" : "w-2.5 bg-white/30"}`}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="border-b border-white/10 bg-[#060606] py-6 md:py-5" aria-label="Brojke">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-5 px-5 md:flex md:flex-wrap md:justify-center md:gap-10 md:px-8">
        {companyStats.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-500/15 ring-1 ring-teal-400/20">
              <item.icon className="text-lg text-teal-300" aria-hidden="true" />
            </span>
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="text-base font-extrabold text-white md:text-lg">{item.value}</span>
              <span className="text-xs font-medium text-white/60 md:text-sm">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  const [activeBenefit, setActiveBenefit] = useState<(typeof benefits)[number] | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveBenefit(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section id="about" className="bg-[#060606] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading title="Zašto DevForge" subtitle="Prednosti koje nas izdvajaju od konkurencije — bez rizika za vas." icon={HiOutlineSparkles} eyebrow="O nama" />
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {benefits.map((benefit, benefitIndex) => (
            <Reveal
              key={benefit.label}
              direction="up"
              delay={benefitIndex * 0.1}
              as="div"
            >
              <button
                type="button"
                className="group about-card flex h-full min-h-44 w-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition duration-300 hover:-translate-y-1.5 hover:border-teal-300/50 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-black/45 sm:p-5 md:min-h-48 md:p-7"
                onClick={() => setActiveBenefit(benefit)}
              >
                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/25 to-cyan-500/20 text-xl text-teal-200 ring-1 ring-white/10 transition group-hover:scale-110 group-hover:text-white md:mb-8 md:h-12 md:w-12 md:text-2xl">
                  <benefit.icon aria-hidden="true" />
                </span>
                <span className="mt-auto block text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-6xl">{benefit.number}</span>
                <span className="mt-2 block text-xs font-semibold leading-5 text-[#A7AABB] sm:text-sm md:mt-4 md:text-base">{benefit.label}</span>
              </button>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a className="inline-flex rounded-none border border-white/15 px-6 py-3 text-sm font-bold text-white transition hover:border-teal-300 hover:bg-white hover:text-black" href="#contact">
            {CTA_LABEL}
          </a>
        </div>
      </div>
      {activeBenefit && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 backdrop-blur sm:p-5" role="dialog" aria-modal="true" aria-labelledby="benefit-title" onMouseDown={() => setActiveBenefit(null)}>
          <div className="modal-in flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0A0A0A] shadow-2xl shadow-black/70" onMouseDown={(event) => event.stopPropagation()}>
            <img className="h-44 w-full shrink-0 object-cover sm:h-56" src={activeBenefit.image} alt={activeBenefit.title} />
            <div className="overflow-y-auto p-5 sm:p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <h3 id="benefit-title" className="text-xl font-extrabold text-white sm:text-2xl md:text-3xl">
                  {activeBenefit.title}
                </h3>
                <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-white/15 text-2xl text-white/80 transition hover:bg-white hover:text-black" type="button" aria-label="Zatvori modal" onClick={() => setActiveBenefit(null)}>
                  ×
                </button>
              </div>
              <p className="mt-5 leading-8 text-[#A7AABB]">{activeBenefit.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="border-y border-black/5 bg-[#F4F5F7] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading title="Naše usluge" subtitle="Digitalna rješenja prilagođena vašem poslovanju" align="center" icon={HiOutlineCog6Tooth} eyebrow="Usluge" tone="light" />
        <div className="mt-14 space-y-10">
          {services.map((service, index) => (
            <Reveal as="article" direction={index % 2 === 1 ? "right" : "left"} key={service.title} className="service-row grid items-center gap-8 border-t border-black/10 pt-10 md:grid-cols-2 md:gap-14">
              <div className={`${index % 2 === 1 ? "md:order-2" : ""} aspect-[16/10] w-full overflow-hidden rounded-2xl`}>
                <img className="h-full w-full object-cover transition duration-700 hover:scale-105" src={service.image} alt={service.title} loading="lazy" />
              </div>
              <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600/15 to-cyan-600/15 text-2xl text-teal-700 ring-1 ring-black/[0.06]">
                    <service.icon aria-hidden="true" />
                  </span>
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-teal-600">0{index + 1}</p>
                </div>
                <h3 className="mt-4 text-2xl font-extrabold text-[#0B0B0F] sm:text-3xl md:text-5xl">{service.title}</h3>
                <p className="mt-4 max-w-2xl leading-7 text-[#5A5D6E] sm:mt-5 sm:leading-8">{service.description}</p>
                <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
                  <a className="inline-flex w-full items-center justify-center gap-2 rounded-none bg-[#0B0B0F] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-teal-600 sm:w-auto" href={service.link}>
                    Detaljnije o usluzi
                    <HiOutlineChevronRight className="text-base" aria-hidden="true" />
                  </a>
                  <a className="inline-flex items-center justify-center gap-1.5 text-sm font-bold text-teal-700 transition hover:text-teal-900" href="#contact">
                    Zatražite gotovu verziju
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-teal-600">Sve na jednom mjestu</p>
          <h3 className="mt-3 text-2xl font-extrabold text-[#0B0B0F] md:text-3xl">I sve ostalo što vaš projekt treba</h3>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {serviceList.map((item, serviceIndex) => (
            <Reveal key={item.title} direction="up" delay={(serviceIndex % 3) * 0.08} className="group h-full rounded-2xl border border-black/10 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-lg hover:shadow-black/5 sm:p-5 md:p-6">
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600/15 to-cyan-600/15 text-lg text-teal-700 ring-1 ring-black/[0.06] sm:mb-4 sm:h-11 sm:w-11 sm:text-xl">
                <item.icon aria-hidden="true" />
              </span>
              <h4 className="font-extrabold text-[#0B0B0F]">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-[#5A5D6E]">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="process" className="relative overflow-hidden bg-[#060606] py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="lg:sticky lg:top-28 lg:h-[620px]">
          <SectionHeading title="Kako radimo" subtitle="Transparentan proces od ideje do gotovog proizvoda" icon={HiOutlineRectangleGroup} eyebrow="Proces" />
          <div className="mt-10 overflow-hidden border border-white/10 bg-black">
            <iframe
              className="aspect-video w-full opacity-70"
              src="https://www.youtube.com/embed/vP8ysciz7iU?autoplay=1&mute=1&loop=1&playlist=vP8ysciz7iU&controls=0&modestbranding=1&playsinline=1"
              title="DevForge proces razvoja"
              allow="autoplay; encrypted-media; picture-in-picture"
            />
          </div>
        </div>
        <div className="space-y-8">
          {processSteps.map((step, stepIndex) => (
            <Reveal key={step.step} direction="up" delay={stepIndex * 0.1} className="border-t border-white/10 pt-8">
              <div className="flex gap-6">
                <span className="text-5xl font-extrabold tracking-tight text-white/10 md:text-7xl">{step.step}</span>
                <div>
                  <h3 className="flex items-center gap-3 text-2xl font-extrabold text-white">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/25 to-cyan-500/20 text-xl text-teal-200 ring-1 ring-white/10">
                      <step.icon aria-hidden="true" />
                    </span>
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-8 text-[#A7AABB]">{step.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const duration = 1400;
        const start = performance.now();
        const tick = (time: number) => {
          const progress = Math.min((time - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(target * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

function Facts() {
  return (
    <section className="border-y border-white/10 bg-[#090909] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading title="Brojke koje govore" align="center" icon={HiOutlineChartBar} eyebrow="Statistika" />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {facts.map((fact, factIndex) => (
            <Reveal key={fact.text} direction="up" delay={factIndex * 0.1} className="border-t border-white/10 pt-6 last:col-span-2 md:last:col-span-1">
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/25 to-cyan-500/20 text-xl text-teal-200 ring-1 ring-white/10">
                <fact.icon aria-hidden="true" />
              </span>
              <p className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl">
                <CountUp target={fact.target} suffix={fact.suffix} />
              </p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-[#A7AABB] md:mt-4 md:text-base">{fact.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// Dugmad ispod svakog projekta.
//
// Marketinski redoslijed (najjaci prvi):
//   1. "Otvori demo"     → primarna akcija, puna boja. Kupac odmah klikne i
//                          proba proizvod. Ovo je ono sto prodaje.
//   2. "Pregled uzivo"   → otvara live preview u MODALU (bez napustanja sajta).
//                          Covjek ostaje na DevForge-u, vidi kako sajt radi u
//                          stvarnom browseru na desktopu I mobitelu.
//   3. "Detalji"         → mali, sekundarni. Za onoga koga zanima tehnologija.
//
// Zasto tako: posetilac ne treba da razmislja. Jedno veliko dugme = odluka
// je laka. "Live preview" je razlika izmedju "pokazi mi" i "vjeruj mi".
// ───────────────────────────────────────────────────────────────────────────

function LivePreviewModal({
  project,
  onClose,
}: {
  project: { title: string; url: string; tag: string; description: string };
  onClose: () => void;
}) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [loaded, setLoaded] = useState(false);
  // Neka sajtu zabranjuju ugradnju (X-Frame-Options). Ako se iframe ne
  // ucita u 4.5s, prikazujemo fallback sa velikim linkom — bolje nego prazan okvir.
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setBlocked(true), 4500);
    return () => window.clearTimeout(timer);
  }, []);
  const host = project.url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");

  // ESC zatvara + blokiraj skrol tijela dok je modal otvoren
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col bg-[#050506]/97 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Pregled uzivo: ${project.title}`}
    >
      {/* Traka gore */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="h-2 w-2 shrink-0 rounded-full bg-teal-400 shadow-[0_0_10px_2px_rgba(45,212,191,0.6)]" aria-hidden="true" />
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold tracking-tight text-white">{project.title}</p>
            <p className="truncate text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-teal-300/80">
              Pregled uzivo · {host}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Prekidac desktop / mobitel */}
          <div className="flex border border-white/15">
            <button
              type="button"
              onClick={() => setDevice("desktop")}
              aria-pressed={device === "desktop"}
              className={`px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.1em] transition ${
                device === "desktop" ? "bg-teal-400 text-black" : "text-white/60 hover:text-white"
              }`}
            >
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setDevice("mobile")}
              aria-pressed={device === "mobile"}
              className={`px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.1em] transition ${
                device === "mobile" ? "bg-teal-400 text-black" : "text-white/60 hover:text-white"
              }`}
            >
              Mobitel
            </button>
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 border border-white/15 px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-white/75 transition hover:border-teal-300 hover:text-white sm:inline-flex"
          >
            Novi tab
            <HiOutlineArrowTopRightOnSquare className="text-sm" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={onClose}
            aria-label="Zatvori pregled"
            className="border border-white/15 p-1.5 text-white/75 transition hover:border-white/40 hover:text-white"
          >
            <HiOutlineXMark className="text-lg" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Sadrzaj */}
      <div className="flex min-h-0 flex-1 items-stretch justify-center overflow-auto p-3 md:p-6">
        <div
          className={`relative flex flex-col bg-[#0E0E12] shadow-2xl shadow-black/80 ${
            device === "desktop"
              ? "w-full max-w-[1400px] border border-white/12"
              : "w-full max-w-[420px] rounded-[2rem] border-[10px] border-[#1A1A20]"
          }`}
        >
          {/* Browser traka samo na desktop prikazu */}
          {device === "desktop" && (
            <div className="flex shrink-0 items-center gap-2 border-b border-white/10 bg-[#141418] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 flex min-w-0 flex-1 items-center gap-1.5 bg-white/[0.05] px-2.5 py-1 text-[11px] text-white/45">
                <HiOutlineLockClosed className="shrink-0 text-[10px]" aria-hidden="true" />
                <span className="truncate">{host}</span>
              </span>
            </div>
          )}

          {!loaded && !blocked && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0E0E12]">
              <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-teal-400" />
                <p className="mt-4 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-white/40">
                  Ucitavam {project.title}…
                </p>
              </div>
            </div>
          )}

          {blocked && !loaded && (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
              <HiOutlineGlobeAlt className="text-4xl text-teal-300/70" aria-hidden="true" />
              <div>
                <p className="text-lg font-extrabold text-white">
                  Ovaj sajt se ne da ugraditi u okvir
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/45">
                  {host} dozvoljava prikaz samo na svojoj adresi. Otvorite ga u novom tabu —
                  radi normalno, samo ne unutar drugog sajta.
                </p>
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-[#0891B2] px-6 py-3 text-sm font-extrabold text-white transition hover:brightness-110"
              >
                Otvori {project.title}
                <HiOutlineArrowTopRightOnSquare className="text-base" aria-hidden="true" />
              </a>
            </div>
          )}

          <iframe
            src={project.url}
            title={`Pregled uzivo: ${project.title}`}
            onLoad={() => setLoaded(true)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            className={`w-full flex-1 border-0 bg-white ${
              device === "desktop" ? "min-h-[60vh] md:min-h-[70vh]" : "min-h-[70vh]"
            } ${blocked && !loaded ? "hidden" : ""}`}
          />
        </div>
      </div>

      {/* Podnozje: opis */}
      <div className="shrink-0 border-t border-white/10 px-4 py-3 md:px-6">
        <p className="mx-auto max-w-3xl text-center text-[0.72rem] leading-5 text-white/40">
          <span className="font-bold text-teal-300">{project.tag}</span> — {project.description}
        </p>
      </div>
    </div>
  );
}

// Tri dugmeta ispod svakog projekta.
function ProjectActions({
  project,
  variant = "row",
}: {
  project: { title: string; url: string; tag: string; description: string };
  variant?: "row" | "compact";
}) {
  const [preview, setPreview] = useState(false);
  const hasUrl = !!project.url && /^https?:\/\//.test(project.url);

  return (
    <>
      <div className={`mt-4 flex flex-wrap items-center gap-2 ${variant === "compact" ? "" : "md:gap-3"}`}>
        {/* 1. Primarna akcija */}
        {hasUrl ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-[#0891B2] px-4 py-2.5 text-[0.72rem] font-extrabold uppercase tracking-[0.1em] text-white transition hover:brightness-110 md:px-5"
          >
            Otvori demo
            <HiOutlineArrowTopRightOnSquare className="text-sm" aria-hidden="true" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 border border-white/12 px-4 py-2.5 text-[0.72rem] font-extrabold uppercase tracking-[0.1em] text-white/30">
            Demo u izradi
          </span>
        )}

        {/* 2. Live preview — ostaje na sajtu */}
        {hasUrl && (
          <button
            type="button"
            onClick={() => setPreview(true)}
            className="inline-flex items-center gap-2 border border-white/25 px-4 py-2.5 text-[0.72rem] font-extrabold uppercase tracking-[0.1em] text-white transition hover:border-teal-300 hover:bg-white hover:text-black md:px-5"
          >
            <HiOutlinePlay className="text-sm" aria-hidden="true" />
            Pregled uzivo
          </button>
        )}

        {/* 3. Sekundarno */}
        {variant === "row" && hasUrl && (
          <span className="hidden items-center gap-1.5 text-[0.68rem] font-semibold text-white/30 md:inline-flex">
            <HiOutlineBolt className="text-sm text-teal-300/60" aria-hidden="true" />
            bez instalacije
          </span>
        )}
      </div>

      {preview && hasUrl && <LivePreviewModal project={project} onClose={() => setPreview(false)} />}
    </>
  );
}

function DeviceMockup({ image, imageMobile, title, url, glow = true }: { image: string; imageMobile?: string; title: string; url?: string; glow?: boolean }) {
  return (
    <div className="relative">
      {glow && <div className="pointer-events-none absolute -inset-4 -z-10 bg-gradient-to-br from-teal-600/20 to-cyan-600/10 blur-3xl" aria-hidden="true" />}
      {/* Browser / monitor */}
      <div className="overflow-hidden border border-white/12 bg-[#0E0E12] shadow-2xl shadow-black/60">
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#141418] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 hidden h-5 flex-1 items-center gap-1.5 rounded-sm bg-white/[0.05] px-2.5 text-[11px] text-white/45 sm:flex">
            <HiOutlineLockClosed className="shrink-0 text-[10px]" aria-hidden="true" />
            <span className="truncate">{url ?? "www.stranica.ba"}</span>
          </span>
        </div>
        <div className="aspect-[16/9] overflow-hidden bg-[#0A0A0E]">
          <img className="h-full w-full object-contain" src={image} alt={title} loading="lazy" draggable={false} />
        </div>
      </div>
      {/* Phone — veci prikaz da se odmah vidi da projekt ima i mobilnu verziju.
          Na malim ekranima je manji da ne prekrije desktop snimku. */}
      <div className="absolute bottom-2 right-2 w-[30%] max-w-[150px] rounded-[1.5rem] border border-white/20 bg-[#0E0E12] p-1.5 shadow-2xl shadow-black/80 ring-1 ring-black/50 sm:bottom-4 sm:right-4 sm:w-[34%] sm:max-w-[165px] sm:rounded-[1.6rem]">
        <div className="relative overflow-hidden rounded-[1.15rem]">
          <span className="absolute left-1/2 top-1.5 z-10 h-1 w-8 -translate-x-1/2 rounded-full bg-white/30" aria-hidden="true" />
          <div className="aspect-[9/18] overflow-hidden">
            <img className="h-full w-full object-cover object-top" src={imageMobile || image} alt="" loading="lazy" draggable={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const projects = useHomeProjects();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const setWidthRef = useRef(0); // širina jedne grupe (1 kopija projekata + gap)
  const pausedRef = useRef(false);
  const stepRef = useRef(0); // rAF id animacije strelica

  // PRAVA beskonačna traka (marquee): renderiramo 3 identične kopije i traka
  // neprekidno klizi. Kad pomakne za jednu grupu, scrollLeft se nevidljivo
  // resetira za istu širinu — pošto su kopije identične, projekti se beskonačno
  // nižu jedan pored drugog (nema "povratka na prvi slajd").
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Preciznu širinu jedne grupe mjerimo iz razmaka između prve kartice
    // kopije 0 i prve kartice kopije 1 — neovisno o paddingu/gapu kontejnera.
    const measure = () => {
      const cards = track.querySelectorAll<HTMLElement>("[data-project-card]");
      const n = cards.length / 3; // broj projekata po kopiji
      if (cards.length < 2 || !Number.isInteger(n)) return;
      setWidthRef.current = cards[n].offsetLeft - cards[0].offsetLeft;
    };

    // Drži scroll unutar srednje kopije; skok je trenutan (nema scroll-smooth)
    // i nevidljiv jer su kopije identične → bešavna petlja u oba smjera.
    const wrap = () => {
      const w = setWidthRef.current;
      if (!w) return;
      if (track.scrollLeft >= w * 2) track.scrollLeft -= w;
      else if (track.scrollLeft < w) track.scrollLeft += w;
    };

    const SPEED = 0.7; // px po frameu — brzina neprekidnog klizanja
    let raf = 0;
    const tick = () => {
      if (!pausedRef.current && setWidthRef.current) {
        track.scrollLeft += SPEED;
        wrap();
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      measure();
      if (setWidthRef.current) track.scrollLeft = setWidthRef.current; // start u srednjoj kopiji
      raf = requestAnimationFrame(tick);
    };
    const startRaf = requestAnimationFrame(start);

    const onScroll = () => wrap(); // manualni swipe / strelice → wrap odmah
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    // Slike utiču na layout → re-mjeri kad se učitaju.
    const imgs = Array.from(track.querySelectorAll("img"));
    imgs.forEach((img) => img.addEventListener("load", measure));
    return () => {
      cancelAnimationFrame(startRaf);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(stepRef.current);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      imgs.forEach((img) => img.removeEventListener("load", measure));
    };
  }, []);

  // Strelice: privremeno pauziraj auto-marquee, animiraj pomak ručno rAF-om
  // (CSS smooth scroll bi se borio sa `tick` loop-om koji piše u scrollLeft),
  // pa nastavi klizanje kad animacija završi.
  const scrollByCard = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>("[data-project-card]");
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    const step = card ? card.offsetWidth + gap : track.clientWidth * 0.7;
    const target = track.scrollLeft + direction * step;
    const from = track.scrollLeft;
    const distance = target - from;
    const duration = 420;
    const t0 = performance.now();

    pausedRef.current = true;
    cancelAnimationFrame(stepRef.current);

    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const animate = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      track.scrollLeft = from + distance * ease(t);
      if (t < 1) {
        stepRef.current = requestAnimationFrame(animate);
      } else {
        pausedRef.current = false; // nastavi marquee
      }
    };
    stepRef.current = requestAnimationFrame(animate);
  };

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return (
    <section id="projects" className="overflow-hidden bg-[#060606] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading title="Naši projekti" subtitle="Realna rješenja za realne biznise" icon={HiOutlineBriefcase} eyebrow="Portfolio" />
          <div className="hidden shrink-0 items-center gap-3 pb-1 md:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Prethodni projekt"
              className="rounded-none border border-white/20 p-3 text-white transition hover:border-teal-300 hover:bg-white hover:text-black"
            >
              <HiOutlineChevronLeft className="text-lg" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Sljedeći projekt"
              className="rounded-none border border-white/20 p-3 text-white transition hover:border-teal-300 hover:bg-white hover:text-black"
            >
              <HiOutlineChevronRight className="text-lg" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-bleed skrolabilna traka — beskonačna (3 kopije), sljedeća kartica viri (peek) */}
      <div
        ref={trackRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        className="mt-12 flex gap-5 overflow-x-auto pb-4 md:mt-16 md:gap-7 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))] md:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
      >
        {[0, 1, 2].map((copy) =>
          projects.map((project) => (
            <article
              key={`${project.id}-${copy}`}
              data-project-card
              className="w-[78%] shrink-0 sm:w-[56%] lg:w-[44%]"
            >
              <DeviceMockup image={project.image} imageMobile={project.imageMobile} title={project.title} url={project.url} />
              <div className="mt-6">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-teal-300">{project.category}</p>
                <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">{project.title}</h3>
                <p className="mt-3 max-w-md text-base leading-7 text-[#A7AABB]">{project.description}</p>
                <div className="mt-6">
                  <ProjectActions
                    project={{
                      title: project.title,
                      url: project.link,
                      tag: project.category,
                      description: project.description,
                    }}
                  />
                </div>
              </div>
            </article>
          )),
        )}
      </div>
    </section>
  );
}

function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % testimonials.length), 7000);
    return () => window.clearInterval(timer);
  }, []);

  const testimonial = testimonials[index];

  return (
    <section id="testimonials" className="border-y border-black/5 bg-[#F4F5F7] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <SectionHeading title="Šta klijenti kažu" subtitle="Povjerenje naših klijenata je naša najveća motivacija" align="center" icon={HiOutlineChatBubbleLeftRight} eyebrow="Utisci" tone="light" />
        <div className="testimonial-fade mt-14" key={testimonial.name}>
          <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border border-black/10">
            <img className="h-full w-full object-cover" src={testimonial.avatar} alt={testimonial.name} loading="lazy" />
          </div>
          <p className="mx-auto mt-8 max-w-4xl text-2xl font-semibold leading-10 text-[#0B0B0F] md:text-4xl md:leading-[1.25]">“{testimonial.text}”</p>
          <div className="mt-6 flex justify-center gap-1 text-amber-400" aria-label="Ocjena 5 od 5">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <HiOutlineStar key={starIndex} className="text-xl" style={{ fill: "currentColor" }} aria-hidden="true" />
            ))}
          </div>
          <p className="mt-5 font-extrabold text-[#0B0B0F]">{testimonial.name}</p>
          <p className="mt-1 text-sm text-[#5A5D6E]">{testimonial.role}</p>
        </div>
        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((item, dotIndex) => (
            <button key={item.name} type="button" aria-label={`Prikaži testimonial ${dotIndex + 1}`} className={`h-2.5 rounded-full transition ${index === dotIndex ? "w-8 bg-[#0B0B0F]" : "w-2.5 bg-black/20 hover:bg-black/40"}`} onClick={() => setIndex(dotIndex)} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Klik na "Pogledajte ostale ponude": zapamti da na ciljnoj podstranici treba skrolati na #pricing.
function markScrollToPricing() {
  try {
    sessionStorage.setItem("dvf-scroll-id", "pricing");
  } catch {
    /* sessionStorage nedostupan */
  }
}

function PricingCard({ plan, delay }: { plan: PricingPlan; delay: number }) {
  return (
    <Reveal
      direction="up"
      delay={delay}
      className={`spotlight group relative flex h-full flex-col border p-7 transition-colors duration-300 sm:p-9 md:p-10 ${
        plan.popular
          ? "border-teal-400/60 bg-gradient-to-b from-teal-500/[0.14] to-white/[0.02] ring-1 ring-teal-400/30 lg:-my-4 lg:py-14"
          : "border-white/12 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3.5 left-7 inline-flex items-center gap-1.5 rounded-none bg-gradient-to-r from-teal-400 to-[#0891B2] px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white shadow-lg shadow-teal-900/40 sm:left-9">
          <HiOutlineSparkles className="text-sm" aria-hidden="true" />
          Najpopularnije
        </span>
      )}

      {/* Header: icon + title + tagline */}
      <div className="flex items-start gap-4">
        <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500/25 to-cyan-500/20 text-2xl text-teal-200 ring-1 ring-white/10">
          <plan.icon aria-hidden="true" />
        </span>
        <div className="min-w-0 pt-0.5">
          <h4 className="text-2xl font-extrabold leading-tight text-white">{plan.title}</h4>
          {plan.tagline && <p className="mt-1.5 text-sm leading-snug text-[#A7AABB]">{plan.tagline}</p>}
        </div>
      </div>

      {/* Price block */}
      <div className="mt-8">
        <p className="text-[2.5rem] font-black leading-none tracking-tight text-white md:text-5xl">{plan.price}</p>
      </div>

      <span className="my-8 h-px w-full bg-gradient-to-r from-white/15 via-white/8 to-transparent" />

      {/* Features */}
      <ul className="flex-1 space-y-4 text-[15px] leading-relaxed text-[#B6B9C9]">
        {plan.items.map((item) => (
          <li key={item} className="flex gap-3">
            <HiOutlineCheckCircle className="mt-0.5 shrink-0 text-lg text-teal-300" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <a
        className={`mt-10 inline-flex w-full items-center justify-center gap-2 rounded-none px-6 py-4 text-sm font-extrabold transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-teal-300 ${
          plan.popular
            ? "bg-gradient-to-r from-teal-400 to-[#0891B2] text-white shadow-lg shadow-teal-900/30"
            : "border border-white/25 text-white hover:bg-white hover:text-black"
        }`}
        href="#contact"
      >
        <HiOutlineRocketLaunch aria-hidden="true" />
        Zatražite ponudu
      </a>

      {plan.detailLink && (
        <a
          className="group/btn mt-3 inline-flex w-full items-center justify-center gap-2 rounded-none border border-white/12 bg-white/[0.02] px-6 py-3 text-[13px] font-bold text-white/75 transition hover:border-teal-300/60 hover:bg-white/[0.05] hover:text-white"
          href={plan.detailLink}
          onClick={markScrollToPricing}
        >
          Pogledajte ostale ponude
          <HiOutlineChevronRight className="text-sm transition group-hover/btn:translate-x-0.5" aria-hidden="true" />
        </a>
      )}
    </Reveal>
  );
}

const defaultPricingGroups: PricingGroup[] = [{ plans: pricing }];

// Mapiranje ikona po nazivu paketa (ikone ne mogu u localStorage, pa se izvode iz naziva/grupe).
function planIcon(title: string, groupHeading?: string): IconType {
  const t = title.toLowerCase();
  const h = (groupHeading ?? "").toLowerCase();
  if (t.includes("premium")) return HiOutlineSparkles;
  if (t.includes("business") || t.includes("standard")) return h.includes("shop") ? HiOutlineChartBar : HiOutlineBriefcase;
  if (t.includes("shop")) return HiOutlineShoppingCart;
  if (t.includes("mini") || t.includes("start") || t.includes("mvp")) return HiOutlineRocketLaunch;
  if (h.includes("igric")) return HiOutlinePuzzlePiece;
  if (h.includes("mobil")) return HiOutlineDevicePhoneMobile;
  return HiOutlineGlobeAlt;
}

// Pretvara grupe iz localStorage store-a u oblik koji Pricing očekuje.
function toPricingGroups(list: PricingGroupData[]): PricingGroup[] {
  return list.map((g) => ({
    heading: g.heading || undefined,
    plans: g.plans.map((p) => ({
      title: p.title,
      price: p.price,
      icon: planIcon(p.title, g.heading),
      popular: p.popular,
      tagline: p.tagline || undefined,
      items: p.items,
    })),
  }));
}

// Hook za cijene (ili podskup za jednu uslugu).
function usePricingGroups(serviceKey?: "web" | "webShops" | "games" | "mobile") {
  const stored = useSyncExternalStore(subscribePricing, getPricing, getServerPricing);
  return useMemo(() => {
    const filtered = serviceKey
      ? stored.filter((g) => GROUP_TO_SERVICE[g.id] === serviceKey)
      : stored;
    return toPricingGroups(filtered);
  }, [stored, serviceKey]);
}

// Vraća podnaslov + napomenu za datu uslugu (id grupe).
function usePricingMeta(serviceKey?: "web" | "webShops" | "games" | "mobile") {
  const stored = useSyncExternalStore(subscribePricing, getPricing, getServerPricing);
  return useMemo(() => {
    const g = serviceKey ? stored.find((x) => GROUP_TO_SERVICE[x.id] === serviceKey) : undefined;
    return { subtitle: g?.subtitle || undefined, note: g?.note || undefined };
  }, [stored, serviceKey]);
}

// Stranica usluge — cijene za tu jednu uslugu iz store-a (uz fallback).
function ServicePricing({
  serviceKey,
  fallbackSubtitle,
  fallbackNote,
}: {
  serviceKey: "web" | "webShops" | "games" | "mobile";
  fallbackSubtitle?: string;
  fallbackNote?: string;
}) {
  const groups = usePricingGroups(serviceKey);
  const meta = usePricingMeta(serviceKey);
  if (groups.length === 0) return null;
  return <Pricing groups={groups} subtitle={meta.subtitle ?? fallbackSubtitle} note={meta.note ?? fallbackNote} />;
}

// /cijene — sve grupe iz store-a.
function AllPricing() {
  const groups = usePricingGroups();
  return <Pricing groups={groups} subtitle={undefined} note={undefined} />;
}

function Pricing({ groups, subtitle, note }: { groups?: PricingGroup[]; subtitle?: string; note?: string } = {}) {
  const groupList = groups ?? defaultPricingGroups;
  return (
    <section id="pricing" className="bg-[#060606] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading title="Cijene" subtitle={subtitle ?? "Transparentne početne cijene, sa profesionalnim UI/UX dizajnom uključenim u svaki paket."} icon={HiOutlineBanknotes} eyebrow="Cijene" />
        <div className="mt-14 space-y-16 md:space-y-20">
          {groupList.map((group) => (
            <div key={group.heading ?? "plans"}>
              {group.heading && (
                <div className="mb-9 flex items-center gap-4">
                  <h3 className="text-lg font-extrabold uppercase tracking-[0.18em] text-teal-300">{group.heading}</h3>
                  <span className="h-px flex-1 bg-white/10" />
                </div>
              )}
              <div className="grid gap-6 sm:gap-7 lg:grid-cols-3 lg:gap-8">
                {group.plans.map((plan, planIndex) => (
                  <PricingCard key={plan.title} plan={plan} delay={planIndex * 0.1} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-7 text-sm leading-7 text-[#A7AABB]">
          <p>{note ?? "Hosting i domena se plaćaju dodatno (ako ih nemate): plaćate direktno provideru otprilike 50–100 KM godišnje ovisno o domeni (uključuje poslovni email i ostalo), bez naše marže. Osnovna SEO podešavanja (meta naslovi i opisi) uključena su kao dodatak. Dodatne usluge: logo i identitet od 100 KM · 2D igrice i mobilne aplikacije po dogovoru · održavanje po dogovoru."}</p>
          <p className="mt-2">Dizajn je uvijek uključen, bez skrivenih troškova. Izmjene dizajna možete zatražiti u bilo koje vrijeme tokom razvoja.</p>
        </div>
      </div>
    </section>
  );
}

function FAQs() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faqs" className="border-y border-black/5 bg-[#F4F5F7] py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading title="Česta pitanja" subtitle="Odgovori na najčešća pitanja o našim uslugama" icon={HiOutlineQuestionMarkCircle} eyebrow="FAQ" tone="light" />
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="border-b border-black/10">
                <button className="flex w-full items-center justify-between gap-6 py-6 text-left" type="button" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? -1 : index)}>
                  <span className="flex items-center gap-3 text-lg font-extrabold text-[#0B0B0F] md:text-xl">
                    <HiOutlineQuestionMarkCircle className="shrink-0 text-xl text-teal-600" aria-hidden="true" />
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <HiOutlineMinus className="shrink-0 text-2xl text-teal-600" aria-hidden="true" />
                  ) : (
                    <HiOutlinePlus className="shrink-0 text-2xl text-black/40" aria-hidden="true" />
                  )}
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="leading-8 text-[#5A5D6E]">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Footer navigacija. `soon: true` = stranica još ne postoji → prikaži "Uskoro" + disable.
const footerColumns: { title: string; links: { label: string; href?: string; soon?: boolean }[] }[] = [
  {
    title: "Stranice",
    links: [
      { label: "Početna", href: "/" },
      { label: "O nama", href: "/o-nama" },
      { label: "Projekti", href: "/projekti" },
      { label: "Utisci", href: "/utisci" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    title: "Usluge",
    links: [
      { label: "Web stranice", href: "/usluge/web-stranice" },
      { label: "2D igrice", href: "/usluge/2d-igrice" },
      { label: "Mobilne aplikacije", href: "/usluge/mobilne-aplikacije" },
      { label: "Cijene", href: "/cijene" },
      { label: "Sve usluge", href: "/usluge" },
    ],
  },
  {
    title: "Kompanija",
    links: [
      { label: "Česta pitanja", href: "/cesta-pitanja" },
      { label: "Blog", soon: true },
      { label: "Karijere", soon: true },
      { label: "Partneri", soon: true },
      { label: "Press kit", soon: true },
    ],
  },
  {
    title: "Pravno",
    links: [
      { label: "Politika privatnosti", href: "/privatnost" },
      { label: "Uslovi korištenja", href: "/uslovi" },
      { label: "Politika kolačića", href: "/kolacici" },
      { label: "GDPR usklađenost", soon: true },
    ],
  },
];

function ContactAndFooter() {
  const [contactSent, setContactSent] = useState(false);
  const [contactSending, setContactSending] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);

  // Šalje formu na Formspree ako je FORM_ENDPOINT postavljen; inače demo-success.
  const sendForm = async (
    form: HTMLFormElement,
    setSent: (v: boolean) => void,
    setSending?: (v: boolean) => void,
    setError?: (v: boolean) => void,
  ) => {
    setError?.(false);
    if (!FORM_ENDPOINT) {
      setSent(true);
      form.reset();
      return;
    }
    const data = new FormData(form);
    setSending?.(true);
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: data });
      if (!res.ok) throw new Error("Slanje nije uspjelo");
      setSent(true);
      form.reset();
    } catch {
      setError?.(true);
    } finally {
      setSending?.(false);
    }
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendForm(event.currentTarget, setContactSent, setContactSending, setContactError);
  };

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendForm(event.currentTarget, setNewsletterSent);
  };

  return (
    <footer id="contact" className="bg-[#060606]">
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-6xl">Počnimo raditi zajedno!</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#A7AABB]">Nudimo moderna digitalna rješenja prilagođena vašim potrebama, brzu isporuku i besplatnu gotovu verziju.</p>
          <a className="mt-8 inline-flex items-center gap-2 rounded-none bg-gradient-to-r from-teal-400 to-[#0891B2] px-7 py-4 text-sm font-extrabold text-white" href="mailto:info@devforge.ba">
            <HiOutlineRocketLaunch className="text-lg" aria-hidden="true" />
            Dobijte gotovu verziju
          </a>
          <div className="mt-10 space-y-3 text-[#A7AABB]">
            <p className="flex items-center gap-3"><HiOutlinePhone className="text-lg text-teal-300" aria-hidden="true" /><span className="font-bold text-white">Telefon:</span> (+387) 61 000 000</p>
            <p className="flex items-center gap-3"><HiOutlineEnvelope className="text-lg text-teal-300" aria-hidden="true" /><span className="font-bold text-white">Email:</span> info@devforge.ba</p>
            <p className="flex items-center gap-3"><HiOutlineMapPin className="text-lg text-teal-300" aria-hidden="true" /><span className="font-bold text-white">Lokacija:</span> Marsala Tita 28, Sarajevo, BiH</p>
          </div>
          <div className="mt-6 flex gap-3">
            <a className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-teal-300 hover:bg-white hover:text-black" href="https://www.linkedin.com/company/devforge" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-teal-300 hover:bg-white hover:text-black" href="https://www.instagram.com/devforge.ba" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
        <form className="space-y-4 border border-white/10 bg-white/[0.03] p-5 md:p-8" onSubmit={submitContact}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-bold text-white">
              Ime
              <input className="mt-2 w-full border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-teal-300" name="name" required />
            </label>
            <label className="text-sm font-bold text-white">
              Email
              <input className="mt-2 w-full border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-teal-300" name="email" type="email" required />
            </label>
          </div>
          <label className="block text-sm font-bold text-white">
            Telefon
            <input className="mt-2 w-full border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-teal-300" name="phone" type="tel" />
          </label>
          <label className="block text-sm font-bold text-white">
            Poruka
            <textarea className="mt-2 min-h-36 w-full border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-teal-300" name="message" required />
          </label>
          <input type="hidden" name="_subject" value="Nova poruka sa devforge.ba" />
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-none bg-white px-6 py-3 font-extrabold text-black transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={contactSending}>
            <HiOutlinePaperAirplane aria-hidden="true" />
            {contactSending ? "Šaljem..." : "Pošalji poruku"}
          </button>
          {contactSent && <p className="text-sm font-semibold text-teal-200">Hvala! Vaša poruka je poslana — javljamo se uskoro.</p>}
          {contactError && <p className="text-sm font-semibold text-red-300">Slanje trenutno nije uspjelo. Pokušajte ponovo ili pišite na info@devforge.ba.</p>}
        </form>
      </section>
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* Newsletter banner */}
          <div className="flex flex-col gap-6 border-b border-white/10 py-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <p className="text-xl font-extrabold text-white">Ostanite u toku</p>
              <p className="mt-1.5 text-sm text-[#A7AABB]">Povremeni savjeti, novi projekti i posebne ponude — bez spama.</p>
            </div>
            <div className="w-full max-w-md">
              <form className="flex flex-col gap-2 sm:flex-row" onSubmit={submitNewsletter}>
                <input className="min-w-0 flex-1 border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-teal-300" type="email" name="email" required placeholder="Email adresa" aria-label="Email adresa" />
                <button className="inline-flex items-center justify-center gap-2 rounded-none bg-gradient-to-r from-teal-400 to-[#0891B2] px-5 py-3 text-sm font-extrabold text-white transition hover:brightness-110" type="submit">
                  <HiOutlineEnvelope aria-hidden="true" /> Pretplati se
                </button>
              </form>
              {newsletterSent && <p className="mt-3 text-sm text-teal-200">Hvala na pretplati.</p>}
            </div>
          </div>

          {/* Brand + link kolone */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-2 lg:grid-cols-6">
            <div className="col-span-2">
              <Logo />
              <p className="mt-4 max-w-xs text-sm leading-6 text-[#A7AABB]">DevForge — web stranice, shopovi i mobilne aplikacije iz Sarajeva. Bez predujma, uz besplatnu gotovu verziju.</p>
              <div className="mt-5 space-y-2 text-sm text-[#A7AABB]">
                <a className="flex items-center gap-2.5 transition hover:text-white" href="tel:+38761000000"><HiOutlinePhone className="text-teal-300" aria-hidden="true" /> (+387) 61 000 000</a>
                <a className="flex items-center gap-2.5 transition hover:text-white" href="mailto:info@devforge.ba"><HiOutlineEnvelope className="text-teal-300" aria-hidden="true" /> info@devforge.ba</a>
                <p className="flex items-center gap-2.5"><HiOutlineMapPin className="text-teal-300" aria-hidden="true" /> Maršala Tita 28, Sarajevo, BiH</p>
              </div>
              <div className="mt-5 flex gap-3">
                <a className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-teal-300 hover:bg-white hover:text-black" href="https://www.linkedin.com/company/devforge" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-teal-300 hover:bg-white hover:text-black" href="https://www.instagram.com/devforge.ba" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a>
              </div>
            </div>

            {footerColumns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-white">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) =>
                    link.soon ? (
                      <li key={link.label}>
                        <span className="inline-flex cursor-not-allowed items-center gap-2 text-sm text-white/35" title="Uskoro dostupno" aria-disabled="true">
                          {link.label}
                          <span className="rounded-full border border-teal-300/30 bg-teal-300/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-teal-300/80">Uskoro</span>
                        </span>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <a className="group inline-flex items-center gap-2 text-sm text-[#A7AABB] transition hover:text-white" href={link.href}>
                          <span className="h-px w-0 bg-teal-300 transition-all duration-300 group-hover:w-3" aria-hidden="true" />
                          {link.label}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="pb-safe mx-auto max-w-7xl px-5 py-6 text-center text-sm text-white/40 md:px-8">
            <p>© 2025 DevForge. Sva prava zadržana.</p>
          </div>
        </div>
      </section>
    </footer>
  );
}

// `long` + `points` koristi SAMO istaknuta (najveća) bento kartica u WhyUs (home "Zašto DevForge").
// AboutStory (/o-nama) i manje bento kartice koriste kratki `text` → grid ostaje ujednačen.
const aboutValues: { icon: IconType; number: string; title: string; text: string; long?: string; points?: string[] }[] = [
  {
    icon: HiOutlineBanknotes,
    number: "0 KM",
    title: "Bez predujma",
    text: "Ne tražimo predujam i izrađujemo besplatnu gotovu verziju. Plaćate tek kada ste u potpunosti zadovoljni — sav rizik preuzimamo mi.",
    long: "Ovo je razlog zašto nas klijenti biraju. Druge agencije traže 30–50% cijene unaprijed — prije nego išta vidite. Mi radimo potpuno obrnuto: ne tražimo ni marku predujma, nego prvo besplatno izradimo funkcionalnu gotovu verziju vašeg projekta. Tek kada je vidite uživo, isprobate i budete sigurni da je baš ono što ste željeli — tada plaćate. Ako niste zadovoljni, ne plaćate ništa. Cijeli rizik je na nama, a ne na vama — vi nemate šta izgubiti.",
    points: [
      "Nula unaprijed — krećemo na povjerenje",
      "Prvo vidite gotov rezultat, pa plaćate",
      "Niste zadovoljni? Ne plaćate ništa",
    ],
  },
  {
    icon: HiOutlineRocketLaunch,
    number: "5 dana",
    title: "Gotova verzija za 5 dana",
    text: "Funkcionalnu gotovu verziju vašeg projekta isporučujemo u roku od 5 radnih dana, bez dugih čekanja i praznih obećanja.",
    long: "Funkcionalnu gotovu verziju vašeg projekta — pravu, klikabilnu, ne skicu — isporučujemo u roku od 5 radnih dana. Za manje od sedmice vidite kako vaš sajt zaista izgleda i radi, pa tek onda odlučujete. Bez dugih čekanja i bez praznih obećanja.",
  },
  {
    icon: HiOutlineRectangleGroup,
    number: "100%",
    title: "Potpuna kontrola",
    text: "Kroz vlastiti admin panel sami mijenjate sadržaj i slike (CMS) te proizvode i cijene (web shop) — bez koda i bez plaćanja developera.",
  },
  {
    icon: HiOutlineDocumentText,
    number: "2",
    title: "Dokumentacija i upute",
    text: "Uz svaki projekt dobijate dokumentaciju o izradi i jasne upute za admin panel — koje opcije postoje i šta sve možete sami mijenjati.",
  },
];

// 3D dekoracija hero-a podstranica — transparentni PNG (apstraktna 3D spirala,
// teal/cyan ili bijelo). KAKO DODATI:
//   1. Skini PNG (Freepik/Vecteezy/Pngtree → traži "3d abstract spiral png").
//   2. Spremi ga u: E:\0_Downloads\devgen11\public\hero-3d.png
//   3. Niže ostavi "/hero-3d.png" (već postavljeno).
// Dok fajl ne postoji slika se neće učitati — promijeni naziv ako koristiš drugi.
const HERO_DECOR_IMG = "/hero-3d.png";

function HeroDecor() {
  if (!HERO_DECOR_IMG) return null;
  return (
    <div
      className="hero-decor pointer-events-none absolute right-0 top-1/2 z-0 h-[180%] max-h-[40rem] w-[85%] max-w-xl -translate-y-[73%] translate-x-[46%] sm:-translate-y-[66%] sm:w-[70%] sm:max-w-2xl sm:translate-x-[42%] md:w-[62%] md:max-h-[46rem] md:-translate-y-[72%] md:translate-x-[38%] lg:w-[54%] lg:max-w-3xl lg:translate-x-[34%]"
      aria-hidden="true"
    >
      <img
        src={HERO_DECOR_IMG}
        alt=""
        loading="lazy"
        className="hero-decor-img h-full w-full object-contain object-center"
        onError={(e) => {
          (e.currentTarget.closest(".hero-decor") as HTMLElement | null)?.style.setProperty("display", "none");
        }}
      />
    </div>
  );
}

function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#060606] pt-32 pb-12 md:pt-36 md:pb-16">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -top-16 left-1/4 h-48 w-48 -translate-x-1/2 rounded-full bg-teal-600/10 blur-3xl" />
      </div>
      <HeroDecor />
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <Reveal direction="up" className="max-w-2xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-200 backdrop-blur-sm">
            <HiOutlineSparkles aria-hidden="true" />
            O nama
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Tko smo mi
          </h1>
          <p className="mt-4 text-base leading-7 text-[#A7AABB] md:text-lg">
            DevForge je tim za izradu web stranica, web shopova, mobilnih aplikacija i 2D igrica — spajamo
            moderan dizajn s pouzdanim razvojem, bez predujma i uz besplatnu gotovu verziju.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function AboutStory() {
  return (
    <section className="border-y border-black/5 bg-[#F4F5F7] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          title="Naša priča"
          subtitle="Krenuli smo s jednostavnom idejom: izrada digitalnih proizvoda ne mora biti rizik za klijenta."
          icon={HiOutlineFlag}
          eyebrow="Tko smo mi"
          tone="light"
        />
        <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-[#5A5D6E] md:text-lg">
          <p>
            Od osnivanja 2023. godine izradili smo 20+ projekata za klijente različitih veličina —
            od malih obrta do firmi koje su trebale kompletnu digitalnu prisutnost. Kroz svaki projekt
            vodi nas isto načelo: vi ne plaćate dok niste sigurni da je rezultat vrijedan toga.
          </p>
          <p>
            Zato radimo drugačije od većine agencija — bez predujma, s besplatnom gotovom verzijom u 5 dana
            i transparentnim cijenama. Tako rizik preuzimamo mi, a vi donosite odluku tek kada vidite
            konkretan rezultat.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          {aboutValues.map((value, valueIndex) => (
            <Reveal
              key={value.title}
              direction="up"
              delay={valueIndex * 0.1}
              as="div"
              className="h-full rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-teal-300/60 hover:shadow-xl hover:shadow-black/[0.06] md:p-7"
            >
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600/15 to-cyan-600/15 text-2xl text-teal-600 ring-1 ring-black/[0.06]">
                <value.icon aria-hidden="true" />
              </span>
              <h3 className="text-lg font-extrabold tracking-tight text-[#0B0B0F] md:text-xl">{value.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#5A5D6E] md:text-base">{value.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesHero() {
  const chips = ["Web stranice", "Web shopovi", "Mobilne aplikacije", "2D igrice", "UI/UX dizajn", "API razvoj"];
  return (
    <section className="relative overflow-hidden bg-[#060606] pt-32 pb-12 md:pt-36 md:pb-16">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -top-16 right-1/4 h-48 w-48 translate-x-1/2 rounded-full bg-teal-600/10 blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <Reveal direction="up" className="max-w-2xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-200 backdrop-blur-sm">
            <HiOutlineCog6Tooth aria-hidden="true" />
            Usluge
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Što gradimo za vas
          </h1>
          <p className="mt-4 text-base leading-7 text-[#A7AABB] md:text-lg">
            Od ideje do isporuke pokrivamo cijeli razvojni proces — dizajn, izradu, integracije i podršku.
            Bez predujma, s besplatnom gotovom verzijom u 5 dana i jasnim cijenama.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span key={chip} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-white/75">
                <HiOutlineCheckCircle className="text-teal-300" aria-hidden="true" />
                {chip}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesTech() {
  return (
    <section className="relative overflow-hidden bg-[#060606] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading title="Tehnologije koje koristimo" subtitle="Moderan, provjeren stack odabran prema potrebama svakog projekta — za performanse, sigurnost i dugovječnost." icon={HiOutlineCodeBracketSquare} eyebrow="Tech stack" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {techGroups.map((group, groupIndex) => (
            <Reveal key={group.title} direction="up" delay={groupIndex * 0.1} className="spotlight rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1.5 hover:border-teal-300/50 hover:bg-white/[0.06] md:p-7">
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/25 to-cyan-500/20 text-2xl text-teal-200 ring-1 ring-white/10">
                <group.icon aria-hidden="true" />
              </span>
              <h3 className="text-xl font-extrabold text-white">{group.title}</h3>
              <ul className="mt-5 space-y-3 text-[#A7AABB]">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <HiOutlineCheckCircle className="mt-0.5 shrink-0 text-lg text-teal-300" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function IncludedSplit() {
  return (
    <section className="overflow-hidden border-y border-black/5 bg-[#F4F5F7] py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal direction="left">
          <SectionHeading title="Što dobijate u svakom projektu" subtitle="Bez obzira na uslugu, ovo je uvijek uključeno — bez skrivenih troškova i bez doplata." icon={HiOutlineCheckCircle} eyebrow="Uključeno" tone="light" />
          <ul className="mt-9 space-y-5">
            {deliverables.map((item) => (
              <li key={item.title} className="flex gap-4">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-600/10 text-teal-600 ring-1 ring-teal-600/20">
                  <HiOutlineCheckCircle className="text-lg" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-extrabold text-[#0B0B0F]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#5A5D6E] md:text-base">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal direction="right" className="relative">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl border border-black/10 shadow-2xl shadow-black/10 sm:aspect-square lg:aspect-[4/5]">
            <img className="h-full w-full object-cover" src={images.mobile} alt="DevForge tim u radu na projektu" loading="lazy" />
          </div>
          <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-black/10 bg-white/95 p-4 shadow-xl shadow-black/10 backdrop-blur sm:left-8 sm:right-auto sm:w-64">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">Uvijek uključeno</p>
            <p className="mt-1 text-sm font-semibold leading-6 text-[#0B0B0F]">Profesionalan UI/UX dizajn, bez doplate u svakom paketu.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section className="relative overflow-hidden bg-[#060606] py-20 md:py-28">
      <div className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-teal-600/10 blur-3xl" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading title="Za koga gradimo" subtitle="Radimo s klijentima različitih veličina i djelatnosti — od prve web stranice do kompletnog digitalnog proizvoda." icon={HiOutlineUserGroup} eyebrow="Klijenti" />
          <a className="mt-8 inline-flex items-center gap-2 rounded-none border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:border-teal-300 hover:bg-white hover:text-black" href="#contact">
            <HiOutlineChatBubbleLeftRight className="text-base" aria-hidden="true" />
            Razgovarajmo o vašem projektu
          </a>
        </div>
        <div className="flex flex-wrap gap-3 md:gap-4">
          {industries.map((item, itemIndex) => (
            <Reveal
              key={item.name}
              direction="up"
              delay={itemIndex * 0.06}
              as="div"
              className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition duration-300 hover:-translate-y-1 hover:border-teal-300/50 hover:bg-white/[0.06]"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/25 to-cyan-500/20 text-lg text-teal-200 ring-1 ring-white/10 transition group-hover:text-white">
                <item.icon aria-hidden="true" />
              </span>
              <span className="text-sm font-bold text-white md:text-base">{item.name}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompareTable() {
  return (
    <section className="bg-[#060606] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionHeading title="DevForge vs. tipična agencija" subtitle="Bez sitnih slova. Evo točno po čemu se razlikujemo — i zašto rizik preuzimamo mi, a ne vi." align="center" icon={HiOutlineSparkles} eyebrow="Transparentno" />

        {/* Desktop: tablica */}
        <div className="mt-12 hidden overflow-hidden rounded-2xl border border-white/10 md:block">
          <div className="grid grid-cols-[1.3fr_1fr_1fr] bg-white/[0.03] text-xs font-bold uppercase tracking-[0.15em] text-white/50">
            <div className="px-6 py-4">Stavka</div>
            <div className="border-l border-white/10 bg-teal-500/10 px-6 py-4 text-teal-200">DevForge</div>
            <div className="border-l border-white/10 px-6 py-4">Tipična agencija</div>
          </div>
          {comparison.map((row) => (
            <div key={row.feature} className="grid grid-cols-[1.3fr_1fr_1fr] border-t border-white/10 text-sm">
              <div className="px-6 py-5 font-semibold text-white">{row.feature}</div>
              <div className="flex items-start gap-2 border-l border-white/10 bg-teal-500/[0.06] px-6 py-5 text-white">
                <HiOutlineCheckCircle className="mt-0.5 shrink-0 text-lg text-teal-300" aria-hidden="true" />
                <span>{row.devforge}</span>
              </div>
              <div className="flex items-start gap-2 border-l border-white/10 px-6 py-5 text-[#9A9DAE]">
                <HiOutlineXMark className="mt-0.5 shrink-0 text-lg text-white/30" aria-hidden="true" />
                <span>{row.others}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobitel: kartice po stavci */}
        <div className="mt-10 space-y-4 md:hidden">
          {comparison.map((row) => (
            <div key={row.feature} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <p className="border-b border-white/10 px-5 py-3 text-sm font-extrabold text-white">{row.feature}</p>
              <div className="flex items-start gap-2 bg-teal-500/[0.06] px-5 py-3.5">
                <HiOutlineCheckCircle className="mt-0.5 shrink-0 text-lg text-teal-300" aria-hidden="true" />
                <div>
                  <span className="block text-[0.7rem] font-bold uppercase tracking-[0.15em] text-teal-200/80">DevForge</span>
                  <span className="text-sm text-white">{row.devforge}</span>
                </div>
              </div>
              <div className="flex items-start gap-2 border-t border-white/10 px-5 py-3.5">
                <HiOutlineXMark className="mt-0.5 shrink-0 text-lg text-white/30" aria-hidden="true" />
                <div>
                  <span className="block text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/40">Tipična agencija</span>
                  <span className="text-sm text-[#9A9DAE]">{row.others}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="border-y border-black/5 bg-[#F4F5F7] py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionHeading title="Naš put do danas" subtitle="Kratka priča o tome kako smo izrasli — korak po korak, projekt po projekt." icon={HiOutlineFlag} eyebrow="Priča" tone="light" />
        <ol className="relative mt-12 ml-2 border-l-2 border-teal-600/20">
          {milestones.map((milestone, milestoneIndex) => (
            <Reveal as="li" key={milestone.year} direction="up" delay={milestoneIndex * 0.1} className="relative mb-10 pl-8 last:mb-0">
              <span className="absolute -left-[0.5625rem] top-1.5 h-4 w-4 rounded-full border-2 border-[#F4F5F7] bg-teal-600 ring-2 ring-teal-600/30" aria-hidden="true" />
              <span className="inline-flex items-center rounded-full bg-teal-600/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.15em] text-teal-700">{milestone.year}</span>
              <h3 className="mt-3 text-xl font-extrabold text-[#0B0B0F] md:text-2xl">{milestone.title}</h3>
              <p className="mt-2 leading-7 text-[#5A5D6E]">{milestone.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ServicesPage() {
  return (
    <main className="anim-rich">
      <ServicesHero />
      <Services />
      <ServicesTech />
      <IncludedSplit />
      <Industries />
      <HowItWorks />
      <Pricing />
      <FAQs />
    </main>
  );
}

function HomePage() {
  return (
    <main className="anim-rich">
      <Hero />
      <HeroLogos />
      <TrustBar />
      <WhyUs />
      <Services />
      <Pricing />
      <HowItWorks />
      <Facts />
      <Projects />
      <Testimonials />
      <FAQs />
    </main>
  );
}

function AboutPage() {
  return (
    <main className="anim-rich">
      <AboutHero />
      <AboutStory />
      <CompareTable />
      <Timeline />
      <About />
      <Facts />
    </main>
  );
}

function ProjectsHero() {
  return (
    <section className="relative overflow-hidden bg-[#060606] pt-32 pb-12 md:pt-36 md:pb-16">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -top-16 left-1/4 h-48 w-48 -translate-x-1/2 rounded-full bg-teal-600/10 blur-3xl" />
      </div>
      <HeroDecor />
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <Reveal direction="up" className="max-w-2xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-200 backdrop-blur-sm">
            <HiOutlineBriefcase aria-hidden="true" />
            Portfolio
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Naši projekti
          </h1>
          <p className="mt-4 text-base leading-7 text-[#A7AABB] md:text-lg">
            Pogledajte šta smo gradili — web stranice i shopovi, mobilne aplikacije i 2D igrice. Svaki
            projekt je krenuo besplatnom gotovom verzijom u 5 dana, bez predujma i bez rizika za klijenta.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// Jedan red = jedna usluga; slajder kroz projekte te usluge (strelice, tačkice,
// touch swipe). Strana mockupa se naizmjenično mijenja (flip) radi ritma.
// Carousel sa susjednim karticama: aktivna kartica je centrirana, a lijevo i
// desno se vidi po jedna trecina susjedne — tako se odmah vidi da ima jos
// projekata. Fluidno: koristi se stvarna sirina kontejnera (ResizeObserver),
// pa se na svakom ekranu prikaze ista proporcija.
function ProjectRow({ group, rowIndex }: { group: { service: string; items: ProjectItem[] }; rowIndex: number }) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0); // px, za vrijeme povlacenja prstom/misem
  const [dragging, setDragging] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const touchX = useRef<number | null>(null);
  const pointerStart = useRef<number | null>(null);
  const count = group.items.length;

  // Stvarna sirina kartice = 70% viewporta (na mobilnom 86%).
  // Time se lijevo/desno vidi ~15% / ~15% susjedne kartice na desktopu.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const isSmall = window.innerWidth < 768;
      setViewportWidth(w);
      // 46% desktop / 72% mobilni. Uz gap ovo daje: aktivna kartica veca,
      // susjed vidljiv skoro cijeli, a nazire se i treca kartica — pa se
      // odmah vidi da ima vise projekata.
      setCardWidth(Math.round(w * (isSmall ? 0.72 : 0.46)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const go = (dir: number) =>
    setIndex((value) => Math.min(count - 1, Math.max(0, value + dir)));
  const goTo = (target: number) => setIndex(Math.min(count - 1, Math.max(0, target)));

  // Razmak izmedju kartica (u px) — cita se iz stvarnog CSS-a da se ne
  // desi da se pomjeraj i prikaz razidju.
  const [gap, setGap] = useState(20);
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const read = () => {
      const g = parseFloat(getComputedStyle(el).columnGap || "0");
      if (!Number.isNaN(g)) setGap(g);
    };
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  // Pomak tako da aktivna kartica bude centrirana u viewportu.
  const step = cardWidth + gap;
  // Centriranje iz STATE-a (ne iz ref-a — ref je null na prvom renderu).
  const centering = cardWidth > 0 && viewportWidth > 0 ? viewportWidth / 2 - cardWidth / 2 : 0;
  const translate = centering - index * step + drag;

  const clampDrag = (dx: number) => {
    // Otpor na krajevima (wrap je beskonacan pa nema tvrdih granica) — samo
    // malo usporimo da ne izgleda "gumeno".
    return dx * 0.85;
  };

  const finishDrag = (dx: number) => {
    if (Math.abs(dx) > Math.max(40, cardWidth * 0.14)) {
      go(dx < 0 ? 1 : -1);
    }
    setDrag(0);
    setDragging(false);
  };

  const onTouchStart = (event: ReactTouchEvent) => {
    touchX.current = event.touches[0].clientX;
    setDragging(true);
  };
  const onTouchMove = (event: ReactTouchEvent) => {
    if (touchX.current === null) return;
    setDrag(clampDrag(event.touches[0].clientX - touchX.current));
  };
  const onTouchEnd = () => {
    if (touchX.current === null) return;
    finishDrag(drag);
    touchX.current = null;
  };

  // Mis (drag na desktopu)
  const onPointerDown = (event: ReactPointerEvent) => {
    if (event.pointerType === "touch") return;
    pointerStart.current = event.clientX;
    setDragging(true);
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
  };
  const onPointerMove = (event: ReactPointerEvent) => {
    if (pointerStart.current === null) return;
    setDrag(clampDrag(event.clientX - pointerStart.current));
  };
  const onPointerUp = () => {
    if (pointerStart.current === null) return;
    finishDrag(drag);
    pointerStart.current = null;
  };

  const arrowBtn =
    "rounded-none border border-white/20 p-2.5 text-white transition hover:border-teal-300 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:border-white/20 disabled:hover:bg-transparent disabled:hover:text-white";

  // Traka je samo stvarna lista projekata — bez klonova. Klonovi su pravili
  // duple "aktivne" kartice i pogresan odsjaj/blur. Prikaz je centriran, a
  // lijevo/desno se prirodno vide susjedi (na krajevima se ne vidi nista,
  // sto je i logicno: nema sta dalje).
  const looped = group.items;

  return (
    <Reveal direction="up" as="div" delay={0.05}>
      {/* Zaglavlje reda: usluga + brojac + strelice */}
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <span className="text-sm font-black tracking-[0.3em] text-white/25">0{rowIndex + 1}</span>
          <div>
            <h3 className="text-xl font-extrabold tracking-tight text-white md:text-2xl">{group.service}</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
              {count} {count === 1 ? "projekt" : "projekta"}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-sm font-semibold tabular-nums text-white/40">
            {index + 1} / {count}
          </span>
          <button type="button" onClick={() => go(-1)} aria-label="Prethodni projekt" className={arrowBtn} disabled={count < 2 || index === 0}>
            <HiOutlineChevronLeft className="text-lg" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Sljedeci projekt" className={arrowBtn} disabled={count < 2 || index === count - 1}>
            <HiOutlineChevronRight className="text-lg" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Viewport sa susjednim karticama */}
      <div
        ref={viewportRef}
        className="relative -mx-5 overflow-hidden px-0 md:-mx-0"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ touchAction: "pan-y", cursor: dragging ? "grabbing" : "grab" }}
      >
        {/* Ivice bez maske — susjedne kartice treba da se jasno vide, a ne da
            se gube u mraku. Zatamnjenje nosi sama kartica (opacity). */}

        <div
          className="flex items-start gap-5 md:gap-7"
          style={{
            transform: `translate3d(${translate}px, 0, 0)`,
            transition: dragging ? "none" : "transform 520ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {looped.map((project, i) => {
            const active = i === index;
            return (
              <div
                key={`${project.title}-${i}`}
                className="shrink-0"
                style={{ width: cardWidth > 0 ? `${cardWidth}px` : "100%" }}
                aria-hidden={!active}
              >
                {/* Klik na susjednu karticu je centrira — tako covjek moze
                    da predje na ono sto vidi sa strane. */}
                <div
                  role={active ? undefined : "button"}
                  tabIndex={active ? undefined : 0}
                  onClick={active ? undefined : () => goTo(i)}
                  onKeyDown={
                    active
                      ? undefined
                      : (event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            goTo(i);
                          }
                        }
                  }
                  className={`relative transition-opacity duration-500 ${
                    active ? "opacity-100" : "cursor-pointer opacity-75 hover:opacity-95"
                  }`}
                >
                  <DeviceMockup
                    image={project.image}
                    imageMobile={project.imageMobile}
                    title={project.title}
                    url={project.url}
                    glow={false}
                  />

                  {/* Tekst ispod slike — vidljiv i kad je kartica susjedna */}
                  <div className="mt-5 md:mt-6">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-teal-300">{project.tag}</p>
                    <h4 className="mt-2 text-lg font-extrabold tracking-tight text-white md:text-2xl">{project.title}</h4>
                    <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-[#A7AABB] md:text-base md:leading-7">
                      {project.description}
                    </p>
                    <ProjectActions
                      project={{
                        title: project.title,
                        url: project.url,
                        tag: project.tag,
                        description: project.description,
                      }}
                      variant="compact"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tackice */}
      {count > 1 && (
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
          {group.items.map((project, dotIndex) => (
            <button
              key={project.title}
              type="button"
              onClick={() => goTo(dotIndex)}
              aria-label={`Projekt ${dotIndex + 1}: ${project.title}`}
              aria-current={dotIndex === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                dotIndex === index ? "w-8 bg-teal-400" : "w-2 bg-white/25 hover:bg-white/45"
              }`}
            />
          ))}
        </div>
      )}
    </Reveal>
  );
}

// Galerija projekata — po jedan red (slajder) za svaku uslugu, isti DeviceMockup
// kao na home stranici radi konzistentnosti.
function ProjectsGallery() {
  const projectGroups = useStoredProjects();
  return (
    <section className="overflow-hidden bg-[#060606] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          title="Odabrani radovi"
          subtitle="Po svakoj usluzi vise projekata. Listajte strelicama, tackicama ili prevucite prstom — susjedni projekti se naziru sa strane."
          icon={HiOutlineRectangleGroup}
          eyebrow="Radovi"
        />
        <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          {projectGroups.filter((group) => group.items.length > 0).map((group, groupIndex) => (
            <ProjectRow key={group.service} group={group} rowIndex={groupIndex} />
          ))}
        </div>
      </div>

      {/* Zatvarajući CTA — reuse komponenta, konzistentan oštri teal stil */}
      <ClosingCTA
        title="Imate projekt na umu?"
        text="Krenimo s besplatnom gotovom verzijom — vidite rezultat prije nego išta platite."
      />
    </section>
  );
}

function ProjectsPage() {
  return (
    <main className="anim-rich">
      <ProjectsHero />
      <ProjectsGallery />
    </main>
  );
}

// Zatvarajući CTA blok — isti oštri teal stil kao u ProjectsGallery, izdvojen u
// reuse komponentu za Info podstranice. Tamna ili svijetla varijanta (tone).
function ClosingCTA({ title, text, tone = "dark" }: { title: string; text: string; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <section className={light ? "bg-[#F4F5F7] py-16 md:py-20" : "bg-[#060606] py-16 md:py-20"}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className={`flex flex-col items-start justify-between gap-6 border-t pt-12 md:flex-row md:items-center ${light ? "border-black/10" : "border-white/10"}`}>
          <div>
            <h3 className={`text-2xl font-extrabold tracking-tight md:text-3xl ${light ? "text-[#0B0B0F]" : "text-white"}`}>{title}</h3>
            <p className={`mt-2 max-w-xl text-base leading-7 ${light ? "text-[#5A5D6E]" : "text-[#A7AABB]"}`}>{text}</p>
          </div>
          <a
            className="group inline-flex shrink-0 items-center gap-2 rounded-none bg-gradient-to-r from-teal-400 to-[#0891B2] px-7 py-4 text-sm font-extrabold text-white shadow-lg shadow-teal-500/20 transition hover:scale-[1.02] hover:shadow-teal-500/40 focus:outline-none focus:ring-2 focus:ring-teal-300"
            href="#contact"
          >
            <HiOutlineRocketLaunch className="text-base transition group-hover:rotate-12" aria-hidden="true" />
            {CTA_LABEL}
          </a>
        </div>
      </div>
    </section>
  );
}

// Kompaktni tamni uvod-hero za Info podstranice (isti obrazac kao ProjectsHero).
function InfoHero({ eyebrow, icon: Icon, title, intro }: { eyebrow: string; icon: IconType; title: string; intro: string }) {
  return (
    <section className="relative overflow-hidden bg-[#060606] pt-32 pb-12 md:pt-36 md:pb-16">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -top-16 left-1/4 h-48 w-48 -translate-x-1/2 rounded-full bg-teal-600/10 blur-3xl" />
      </div>
      <HeroDecor />
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <Reveal direction="up" className="max-w-2xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-200 backdrop-blur-sm">
            <Icon aria-hidden="true" />
            {eyebrow}
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">{title}</h1>
          <p className="mt-4 text-base leading-7 text-[#A7AABB] md:text-lg">{intro}</p>
        </Reveal>
      </div>
    </section>
  );
}

// NOVA sekcija — svi utisci odjednom u gridu (distinktno od home Testimonials koji rotira jedan po jedan).
function TestimonialsGrid() {
  return (
    <section className="border-y border-black/5 bg-[#F4F5F7] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          title="Svi utisci na jednom mjestu"
          subtitle="Iskustva klijenata iz cijele BiH — od MVP-a i web shopova do redizajna stranica."
          icon={HiOutlineChatBubbleLeftRight}
          eyebrow="Utisci"
          tone="light"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} direction="up" as="div" delay={index * 0.08}>
              <figure className="flex h-full flex-col border border-black/10 bg-white p-7 shadow-sm">
                <div className="flex gap-1 text-amber-400" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <HiOutlineStar key={starIndex} className="text-lg" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-base leading-8 text-[#3A3D4A]">“{item.text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-black/10 pt-5">
                  <img src={item.avatar} alt={item.name} className="h-11 w-11 rounded-full object-cover" loading="lazy" />
                  <div>
                    <div className="font-extrabold text-[#0B0B0F]">{item.name}</div>
                    <div className="text-sm text-[#5A5D6E]">{item.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function UtisciPage() {
  return (
    <main className="anim-rich">
      <InfoHero
        eyebrow="Utisci"
        icon={HiOutlineChatBubbleLeftRight}
        title="Šta kažu naši klijenti"
        intro="Ne vjerujte nama na riječ — pogledajte iskustva klijenata koji su krenuli besplatnom gotovom verzijom i platili tek kad su bili zadovoljni."
      />
      <TestimonialsGrid />
      <ClosingCTA
        title="Želite biti sljedeća priča?"
        text="Krenimo s besplatnom gotovom verzijom — vidite rezultat prije nego išta platite."
      />
    </main>
  );
}

function CijenePage() {
  return (
    <main className="anim-rich">
      <InfoHero
        eyebrow="Cijene"
        icon={HiOutlineBanknotes}
        title="Transparentne cijene, bez iznenađenja"
        intro="Plaćate kad ste zadovoljni — bez predujma i bez skrivenih troškova. Cijene počinju od 150 KM, a tačnu ponudu dajemo nakon besplatne konsultacije."
      />
      <AllPricing />
      <CompareTable />
      <ClosingCTA
        title="Niste sigurni koji paket?"
        text="Javite nam šta vam treba — predlažemo najbolje rješenje i izrađujemo besplatnu gotovu verziju."
      />
    </main>
  );
}

// NOVA sekcija — jasan izlaz na kontakt kad odgovor nije pronađen u FAQ-u.
function FaqStillQuestions() {
  return (
    <section className="bg-[#060606] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-8 border border-white/10 bg-white/[0.02] p-8 md:flex-row md:items-center md:p-12">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-200">
              <HiOutlineChatBubbleLeftRight aria-hidden="true" />
              Podrška
            </span>
            <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-white md:text-3xl">Niste našli odgovor?</h3>
            <p className="mt-3 text-base leading-7 text-[#A7AABB]">
              Pišite nam — odgovaramo isti dan i rado pojašnjavamo sve oko procesa, rokova i cijena, bez ikakvih obaveza.
            </p>
          </div>
          <a
            className="group inline-flex shrink-0 items-center gap-2 rounded-none bg-gradient-to-r from-teal-400 to-[#0891B2] px-7 py-4 text-sm font-extrabold text-white shadow-lg shadow-teal-500/20 transition hover:scale-[1.02] hover:shadow-teal-500/40 focus:outline-none focus:ring-2 focus:ring-teal-300"
            href="#contact"
          >
            <HiOutlineRocketLaunch className="text-base transition group-hover:rotate-12" aria-hidden="true" />
            Kontaktirajte nas
          </a>
        </div>
      </div>
    </section>
  );
}

function FaqPage() {
  return (
    <main className="anim-rich">
      <InfoHero
        eyebrow="FAQ"
        icon={HiOutlineQuestionMarkCircle}
        title="Česta pitanja"
        intro="Odgovori na najčešća pitanja o gotovoj verziji, rokovima, plaćanju i tehnologijama. Ako nešto nedostaje, javite nam se."
      />
      <FAQs />
      <FaqStillQuestions />
    </main>
  );
}

// NOVA sekcija — direktni načini kontakta u karticama (distinktno od forme u footeru
// koja se ionako prikazuje ispod). Svaka kartica je klikabilna (tel/mailto/maps).
const contactMethods: { icon: IconType; label: string; value: string; href: string; note: string }[] = [
  { icon: HiOutlinePhone, label: "Telefon", value: "(+387) 61 000 000", href: "tel:+38761000000", note: "Pon–Pet, 09–17h" },
  { icon: HiOutlineEnvelope, label: "Email", value: "info@devforge.ba", href: "mailto:info@devforge.ba", note: "Odgovaramo isti dan" },
  { icon: HiOutlineMapPin, label: "Lokacija", value: "Maršala Tita 28, Sarajevo", href: "https://maps.google.com/?q=Marsala+Tita+28+Sarajevo", note: "BiH + cijela regija" },
];

function ContactMethods() {
  return (
    <section className="border-y border-black/5 bg-[#F4F5F7] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          title="Javite nam se"
          subtitle="Odaberite što vam najviše odgovara — telefon, email ili obrazac ispod. Odgovaramo brzo i bez obaveza."
          icon={HiOutlineChatBubbleLeftRight}
          eyebrow="Kontakt"
          tone="light"
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {contactMethods.map((method, index) => (
            <Reveal
              key={method.label}
              direction="up"
              as="div"
              delay={index * 0.08}
              className={index === contactMethods.length - 1 && contactMethods.length % 2 === 1 ? "max-sm:col-span-2" : undefined}
            >
              <a
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex h-full flex-col border border-black/10 bg-white p-5 shadow-sm transition hover:border-teal-400 hover:shadow-md sm:p-7"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/15 to-cyan-500/10 text-2xl text-teal-600 ring-1 ring-black/[0.06]">
                  <method.icon aria-hidden="true" />
                </span>
                <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-teal-700">{method.label}</p>
                <p className="mt-2 text-lg font-extrabold text-[#0B0B0F] transition group-hover:text-teal-700">{method.value}</p>
                <p className="mt-1 text-sm text-[#5A5D6E]">{method.note}</p>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-[#5A5D6E]">
          <span className="font-bold text-[#0B0B0F]">Pratite nas:</span>
          <a className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#0B0B0F] transition hover:border-teal-500 hover:bg-teal-500 hover:text-white" href="https://www.linkedin.com/company/devforge" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#0B0B0F] transition hover:border-teal-500 hover:bg-teal-500 hover:text-white" href="https://www.instagram.com/devforge.ba" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
      </div>
    </section>
  );
}

function KontaktPage() {
  return (
    <main className="anim-rich">
      <InfoHero
        eyebrow="Kontakt"
        icon={HiOutlineEnvelope}
        title="Razgovarajmo o vašem projektu"
        intro="Imate ideju, pitanje ili ste spremni za besplatnu gotovu verziju? Javite nam se — bez obaveza i bez predujma. Ispunite obrazac ispod ili nas kontaktirajte direktno."
      />
      <ContactMethods />
    </main>
  );
}

// Home "Zašto DevForge" — širi pogled (rizik/brzina/dizajn/komunikacija) umjesto
// ponavljanja istih 4 kratka benefita iz heroja. Detaljni benefiti (0 KM, 5 dana...)
// uz modal žive na zasebnoj "O nama" stranici (komponenta About).
function WhyUs() {
  return (
    <section id="about" className="bg-[#060606] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          title="Zašto DevForge"
          subtitle="Ne prodajemo samo izradu — preuzimamo rizik, dizajn i komunikaciju na sebe, da vi dobijete rezultat bez brige."
          icon={HiOutlineSparkles}
          eyebrow="Zašto mi"
        />
        {/* Bento raspored (2026): istaknuta velika pločica + manje uz nju (samo lg; mobitel/sm ostaju čitljivi). */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:grid-rows-2">
          {aboutValues.map((value, valueIndex) => {
            const featured = valueIndex === 0;
            const wide = valueIndex === 1;
            const rich = featured || wide; // kartice koje dobijaju duži tekst + tačke
            const span = valueIndex === 0 ? "lg:col-span-2 lg:row-span-2" : valueIndex === 1 ? "lg:col-span-2" : "lg:col-span-1";
            return (
              <Reveal
                key={value.title}
                direction="up"
                delay={valueIndex * 0.1}
                as="div"
                className={`spotlight group flex h-full flex-col rounded-2xl border p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/45 md:p-7 ${span} ${
                  featured
                    ? "justify-center border-teal-400/30 bg-gradient-to-br from-teal-500/[0.12] to-white/[0.02] ring-1 ring-teal-400/20 lg:p-9"
                    : "border-white/10 bg-white/[0.03] hover:border-teal-300/50 hover:bg-white/[0.06]"
                }`}
              >
                <span className={`mb-4 block bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text font-black leading-none tracking-tight text-transparent ${featured ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl"}`}>
                  {value.number}
                </span>
                <div>
                  <h3 className={`font-extrabold tracking-tight text-white ${featured ? "text-xl md:text-2xl" : "text-lg md:text-xl"}`}>{value.title}</h3>
                  <p className={`mt-3 leading-7 text-[#A7AABB] ${featured ? "text-base md:text-lg" : "text-sm md:text-base"}`}>
                    {rich ? value.long ?? value.text : value.text}
                  </p>
                  {wide && value.points && (
                    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                      {value.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-white/85 md:text-base">
                          <HiOutlineCheckCircle className="mt-0.5 shrink-0 text-lg text-teal-300" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* Istaknuta kartica: tačke odmah ispod teksta; cijeli blok je vertikalno centriran (justify-center). */}
                {featured && value.points && (
                  <ul className="mt-6 space-y-2.5">
                    {value.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-white/85 md:text-base">
                        <HiOutlineCheckCircle className="mt-0.5 shrink-0 text-lg text-teal-300" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Magnetic>
            <a className="inline-flex rounded-none border border-white/15 px-6 py-3 text-sm font-bold text-white transition hover:border-teal-300 hover:bg-white hover:text-black" href="#contact">
              {CTA_LABEL}
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

// ── Generičke komponente za detaljne podstranice usluga ───────────────────
function ServiceDetailHero({ detail }: { detail: ServiceDetail }) {
  // In-page CTA na cijene: skrol unutar trenutne (detaljne) stranice, bez promjene rute.
  const toPricing = () => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="relative overflow-hidden bg-[#060606] pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="absolute inset-0" aria-hidden="true">
        <img src={detail.image} className="absolute right-0 top-0 h-full w-full object-cover opacity-20 md:w-3/5 md:opacity-25" alt="" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060606] via-[#060606]/92 to-[#060606]/55 md:to-[#060606]/30" />
        <div className="absolute -top-16 right-1/4 h-56 w-56 rounded-full bg-teal-600/15 blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <Reveal direction="up" className="max-w-3xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-200 backdrop-blur-sm">
            <detail.icon aria-hidden="true" />
            {detail.name}
          </span>
          <h1 className="text-[2rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {detail.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#D4D7E3] sm:text-lg sm:leading-8">{detail.intro}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a className="cta-glow inline-flex w-full items-center justify-center rounded-none bg-gradient-to-r from-teal-400 to-[#0891B2] px-7 py-4 text-sm font-extrabold text-white transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-teal-300 sm:w-auto" href="#contact">
              {CTA_LABEL}
            </a>
            <button type="button" onClick={toPricing} className="inline-flex w-full items-center justify-center gap-2 rounded-none border border-white/20 px-7 py-4 text-sm font-bold text-white transition hover:border-teal-300 hover:bg-white/[0.05] sm:w-auto">
              Pogledajte cijene
            </button>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {detail.chips.map((chip) => (
              <span key={chip} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-white/75">
                <HiOutlineCheckCircle className="text-teal-300" aria-hidden="true" />
                {chip}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceTypes({ detail }: { detail: ServiceDetail }) {
  return (
    <section className="border-y border-black/5 bg-[#F4F5F7] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading title={detail.typesHeading} subtitle={detail.typesSubtitle} align="center" icon={detail.icon} eyebrow={detail.name} tone="light" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {detail.types.map((type, typeIndex) => (
            <Reveal
              key={type.title}
              direction="up"
              delay={typeIndex * 0.05}
              as="div"
              className="h-full rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-teal-300/60 hover:shadow-xl hover:shadow-black/[0.06] md:p-7"
            >
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600/15 to-cyan-600/15 text-2xl text-teal-600 ring-1 ring-black/[0.06]">
                <type.icon aria-hidden="true" />
              </span>
              <h3 className="text-lg font-extrabold tracking-tight text-[#0B0B0F] md:text-xl">{type.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#5A5D6E] md:text-base">{type.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceStack({ detail }: { detail: ServiceDetail }) {
  return (
    <section className="bg-[#060606] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading title={detail.stackHeading} subtitle={detail.stackSubtitle} icon={HiOutlineCodeBracketSquare} eyebrow="Tech stack" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {detail.stack.map((group, groupIndex) => (
            <Reveal key={group.title} direction="up" delay={groupIndex * 0.1} className="spotlight rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1.5 hover:border-teal-300/50 hover:bg-white/[0.06] md:p-7">
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/25 to-cyan-500/20 text-2xl text-teal-200 ring-1 ring-white/10">
                <group.icon aria-hidden="true" />
              </span>
              <h3 className="text-xl font-extrabold text-white">{group.title}</h3>
              <ul className="mt-5 space-y-3 text-[#A7AABB]">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <HiOutlineCheckCircle className="mt-0.5 shrink-0 text-lg text-teal-300" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceFAQ({ detail }: { detail: ServiceDetail }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="faqs" className="border-y border-black/5 bg-[#F4F5F7] py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionHeading title="Česta pitanja" subtitle={`Najčešća pitanja o usluzi: ${detail.name}.`} align="center" icon={HiOutlineQuestionMarkCircle} eyebrow="FAQ" tone="light" />
        <div className="mt-12 space-y-3">
          {detail.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="border-b border-black/10">
                <button className="flex w-full items-center justify-between gap-6 py-6 text-left" type="button" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? -1 : index)}>
                  <span className="flex items-center gap-3 text-lg font-extrabold text-[#0B0B0F] md:text-xl">
                    <HiOutlineQuestionMarkCircle className="shrink-0 text-xl text-teal-600" aria-hidden="true" />
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <HiOutlineMinus className="shrink-0 text-2xl text-teal-600" aria-hidden="true" />
                  ) : (
                    <HiOutlinePlus className="shrink-0 text-2xl text-black/40" aria-hidden="true" />
                  )}
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="leading-8 text-[#5A5D6E]">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceDetailPage({ detail }: { detail: ServiceDetail }) {
  return (
    <main className="anim-rich">
      <ServiceDetailHero detail={detail} />
      <ServiceTypes detail={detail} />
      <ServiceStack detail={detail} />
      <IncludedSplit />
      <HowItWorks />
      <ServicePricing serviceKey={detail.pricingKey ?? "web"} fallbackSubtitle={detail.pricingSubtitle} fallbackNote={detail.pricingNote} />
      <ServiceFAQ detail={detail} />
    </main>
  );
}

// Path-based (history) router — čisti URL-ovi (npr. /usluge) koji rade i na direktan unos
// uz Vercel SPA rewrite (vercel.json). navigate() radi pushState + javlja svim slušaocima.
function navigate(to: string, scrollToId?: string) {
  if (typeof window === "undefined") return;
  if (scrollToId) {
    try {
      sessionStorage.setItem("dvf-scroll-id", scrollToId);
    } catch {
      /* sessionStorage nedostupan */
    }
  }
  if (to !== window.location.pathname) window.history.pushState({}, "", to);
  window.dispatchEvent(new Event("dvf:locationchange"));
}

function useAppRoute() {
  const [path, setPath] = useState(() => (typeof window !== "undefined" ? window.location.pathname : "/"));
  useEffect(() => {
    const onChange = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onChange);
    window.addEventListener("dvf:locationchange", onChange);
    return () => {
      window.removeEventListener("popstate", onChange);
      window.removeEventListener("dvf:locationchange", onChange);
    };
  }, []);
  return path;
}

// Nazad-na-vrh dugme (pojavi se nakon scrolla). `raised` ga podiže iznad cookie banera na dnu.
function FloatingActions({ raised = false }: { raised?: boolean }) {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`fixed right-4 z-40 flex flex-col items-end gap-3 lg:bottom-6 ${raised ? "bottom-[72px]" : "bottom-5"}`}>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Nazad na vrh"
        className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0A0A0A]/90 text-white shadow-lg shadow-black/40 backdrop-blur-md transition hover:border-teal-300 hover:text-teal-300 ${showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
      >
        <HiOutlineArrowUp className="text-lg" aria-hidden="true" />
      </button>
    </div>
  );
}

// Cookie consent — kompaktna traka. Stanje je u App-u (da FloatingActions zna podići se).
function CookieConsent({ visible, onAccept }: { visible: boolean; onAccept: () => void }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-[45] px-3 pb-3" role="dialog" aria-live="polite" aria-label="Obavijest o kolačićima">
      <div className="cookie-banner mx-auto flex max-w-2xl items-center gap-3 rounded-xl border border-white/10 bg-[#0A0A0A]/95 px-4 py-2.5 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <p className="flex-1 text-xs leading-5 text-[#C7CAD6]">
          Koristimo kolačiće za bolje iskustvo.{" "}
          <a href="/kolacici" className="font-semibold text-teal-300 hover:underline">Saznajte više</a>
        </p>
        <button type="button" onClick={onAccept} className="shrink-0 rounded-none bg-gradient-to-r from-teal-400 to-[#0891B2] px-4 py-2 text-xs font-extrabold text-white transition hover:brightness-110">
          Prihvatam
        </button>
      </div>
    </div>
  );
}

// 404 stranica (nepoznata #/ ruta).
function NotFoundPage() {
  return (
    <main className="anim-rich">
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#060606] pt-32 pb-20 md:pt-40">
        <HeroDecor />
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-8">
          <Reveal direction="up">
            <p className="text-[5rem] font-black leading-none text-white/10 md:text-[8rem]">404</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-5xl">Stranica nije pronađena</h1>
            <p className="mt-4 text-base leading-7 text-[#A7AABB]">Tražena stranica ne postoji ili je premještena. Vratite se na početnu ili nas kontaktirajte.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a className="inline-flex items-center justify-center gap-2 rounded-none bg-gradient-to-r from-teal-400 to-[#0891B2] px-7 py-4 text-sm font-extrabold text-white transition hover:scale-[1.02]" href="/">
                <HiOutlineHome aria-hidden="true" /> Početna
              </a>
              <a className="inline-flex items-center justify-center gap-2 rounded-none border border-white/20 px-7 py-4 text-sm font-bold text-white transition hover:border-teal-300 hover:bg-white/[0.05]" href="/kontakt">
                Kontakt
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

// Pravne stranice (predlošci — prilagoditi uz pravnu pomoć prije objave).
type LegalSection = { heading: string; body: string[] };
type LegalDoc = { icon: IconType; eyebrow: string; title: string; updated: string; intro: string; sections: LegalSection[] };

const legalDocs: Record<"privatnost" | "uslovi" | "kolacici", LegalDoc> = {
  privatnost: {
    icon: HiOutlineShieldCheck,
    eyebrow: "Pravno",
    title: "Politika privatnosti",
    updated: "18.06.2026.",
    intro: "Vaša privatnost nam je važna. Ovdje objašnjavamo koje podatke prikupljamo, zašto i kako ih štitimo.",
    sections: [
      { heading: "1. Koje podatke prikupljamo", body: ["Kada nas kontaktirate putem forme ili newslettera, prikupljamo podatke koje sami unesete: ime, email adresu, broj telefona i sadržaj poruke.", "Automatski možemo prikupljati tehničke podatke (tip uređaja, preglednik, približnu lokaciju) putem kolačića radi statistike posjeta."] },
      { heading: "2. Svrha obrade", body: ["Podatke koristimo isključivo da odgovorimo na vaš upit, pripremimo ponudu, isporučimo dogovorene usluge i, ako ste se pretplatili, šaljemo povremene novosti."] },
      { heading: "3. Pravni osnov", body: ["Obrada se temelji na vašem pristanku i na legitimnom interesu pružanja usluga koje ste zatražili. Pristanak možete povući u svakom trenutku."] },
      { heading: "4. Dijeljenje podataka", body: ["Vaše podatke ne prodajemo niti iznajmljujemo trećim stranama. Možemo ih dijeliti s pouzdanim obrađivačima (npr. hosting i email servisi) isključivo radi pružanja usluge."] },
      { heading: "5. Vaša prava", body: ["Imate pravo na pristup, ispravku i brisanje svojih podataka, kao i na prigovor na obradu. Za ostvarivanje prava javite se na info@devforge.ba."] },
      { heading: "6. Kontakt", body: ["Za sva pitanja o privatnosti kontaktirajte nas na info@devforge.ba."] },
    ],
  },
  uslovi: {
    icon: HiOutlineScale,
    eyebrow: "Pravno",
    title: "Uslovi korištenja",
    updated: "18.06.2026.",
    intro: "Korištenjem ove stranice i naših usluga prihvatate sljedeće uslove.",
    sections: [
      { heading: "1. Opšte odredbe", body: ["DevForge pruža usluge izrade web stranica, web shopova, mobilnih aplikacija i 2D igara. Korištenjem stranice potvrđujete da ste pročitali i prihvatili ove uslove."] },
      { heading: "2. Usluge i ponuda", body: ["Svaki projekat započinje besplatnom konsultacijom i gotovom verzijom. Tačan obim, rok i cijena definišu se ponudom prije početka rada."] },
      { heading: "3. Cijene i plaćanje", body: ["Ne tražimo predujam — plaćate tek kada ste zadovoljni rezultatom. Cijene su navedene u KM i mogu varirati ovisno o obimu projekta. Hosting i domena plaćaju se direktno provideru."] },
      { heading: "4. Intelektualno vlasništvo", body: ["Nakon isporuke i izmirenja dogovorene cijene, kompletan kod, dizajn i prava nad projektom pripadaju klijentu."] },
      { heading: "5. Odgovornost", body: ["Demo verzija projekta je besplatna i za nju se ne plaća ništa. Ne odgovaramo za štetu nastalu nepravilnim korištenjem ili izmjenama izvršenim od strane trećih lica nakon isporuke."] },
      { heading: "6. Izmjene uslova", body: ["Zadržavamo pravo izmjene ovih uslova. Aktuelna verzija uvijek je dostupna na ovoj stranici."] },
      { heading: "7. Kontakt", body: ["Za pitanja o uslovima korištenja javite se na info@devforge.ba."] },
    ],
  },
  kolacici: {
    icon: HiOutlineDocumentText,
    eyebrow: "Pravno",
    title: "Politika kolačića",
    updated: "18.06.2026.",
    intro: "Objašnjavamo šta su kolačići i kako ih koristimo na ovoj stranici.",
    sections: [
      { heading: "1. Šta su kolačići", body: ["Kolačići su male tekstualne datoteke koje se pohranjuju na vašem uređaju kako bi stranica radila ispravno i pamtila vaše postavke."] },
      { heading: "2. Koje kolačiće koristimo", body: ["Neophodni kolačići omogućavaju osnovno funkcionisanje stranice (npr. pamćenje vašeg pristanka na kolačiće).", "Analitički kolačići pomažu nam da razumijemo kako se stranica koristi, isključivo u zbirnom i anonimnom obliku."] },
      { heading: "3. Upravljanje kolačićima", body: ["Kolačiće možete u svakom trenutku obrisati ili blokirati u postavkama svog preglednika. Imajte na umu da bez nekih kolačića dijelovi stranice možda neće raditi ispravno."] },
      { heading: "4. Pristanak", body: ["Nastavkom korištenja stranice i klikom na „Prihvatam” na baneru o kolačićima dajete pristanak na korištenje kolačića opisanih ovdje."] },
      { heading: "5. Kontakt", body: ["Za pitanja o kolačićima kontaktirajte nas na info@devforge.ba."] },
    ],
  },
};

function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <main className="anim-rich">
      <InfoHero eyebrow={doc.eyebrow} icon={doc.icon} title={doc.title} intro={doc.intro} />
      <section className="bg-[#F4F5F7] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal direction="up">
            <p className="mb-8 text-sm text-[#5A5D6E]">Posljednja izmjena: {doc.updated}</p>
            <div className="space-y-8">
              {doc.sections.map((s) => (
                <div key={s.heading}>
                  <h2 className="text-xl font-extrabold text-[#0B0B0F] md:text-2xl">{s.heading}</h2>
                  {s.body.map((p, i) => (
                    <p key={i} className="mt-3 text-sm leading-7 text-[#3A3D4A] md:text-base">{p}</p>
                  ))}
                </div>
              ))}
            </div>
            <p className="mt-10 rounded-xl border border-black/10 bg-white p-4 text-xs leading-6 text-[#5A5D6E]">
              Napomena: ovaj dokument je opšti predložak i ne predstavlja pravni savjet. Preporučujemo da ga prilagodite uz pravnu pomoć prije objave.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

// Scroll-progress traka (teal) na vrhu — standardni 2026 micro-indikator.
function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? (window.scrollY || h.scrollTop) / max : 0;
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={ref} className="scroll-progress-bar" />
    </div>
  );
}

// Spotlight: radijalni teal sjaj prati miš preko bilo koje kartice s klasom `.spotlight`.
// Jedan globalni listener postavlja CSS varijable; sam sjaj radi CSS ::before (screen blend → ne zatamnjuje tekst).
function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest(".spotlight") as HTMLElement | null;
      if (!target) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = target.getBoundingClientRect();
        target.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
        target.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return null;
}

// Magnetic: element se "privlači" mišu dok je u blizini (proximity). Omota se oko CTA-a.
// Samo fine-pointer + poštuje reduced-motion. Transform ide na wrapper → ne dira hover:scale djeteta.
function Magnetic({ children, strength = 0.35, radius = 80, className }: { children: ReactNode; strength?: number; radius?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const reach = Math.max(r.width, r.height) / 2 + radius;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (Math.hypot(dx, dy) < reach) {
          el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
        } else {
          el.style.transform = "translate(0px, 0px)";
        }
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      el.style.transform = "";
    };
  }, [strength, radius]);
  return (
    <span ref={ref} className={`inline-flex transition-transform duration-300 ease-out will-change-transform ${className ?? ""}`}>
      {children}
    </span>
  );
}

// Custom cursor: dot prati pointer 1:1, prsten ga slijedi s blagim laganjem (lerp).
// Na hoveru interaktivnog elementa prsten naraste i postane oštri kvadrat (angular brend) s teal glowom.
// Aktivan samo na fine-pointer uređajima (desktop/miš); na touchu se ne renderira (CSS + early return).
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let visible = false;
    let raf = 0;

    const interactiveSel =
      'a, button, [role="button"], input, textarea, select, label[for], summary, [data-cursor]';

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      const target = e.target as Element | null;
      const interactive = !!target?.closest(interactiveSel);
      ring.classList.toggle("is-hover", interactive);
      dot.classList.toggle("is-hover", interactive);
    };
    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");
    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const render = () => {
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      const ease = reduce ? 1 : 0.18;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

// ════════════════════════════════════════════════════════════════════
// REKLAMA (#/reklama) — 9:16 IG Reels/Story okvir za screen-recording.
// Voice-over se dodaje naknadno; tajming scena ostavlja prostora za naraciju.
// ════════════════════════════════════════════════════════════════════

// Forge-mark (>_ ) u verziji za reklamu (skalabilan preko `size`).
function AdMark({ size = 40 }: { size?: number | string }) {
  return (
    <span
      className="relative flex items-center justify-center overflow-hidden rounded-[28%] border border-white/15 bg-[#0B0B0F]"
      style={{ height: size, width: size }}
    >
      <svg viewBox="0 0 24 24" style={{ height: "62%", width: "62%" }} fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="adForgeGrad" x1="5" y1="7" x2="19" y2="17" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2dd4bf" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <path d="M6.5 7.5 11 12l-4.5 4.5" stroke="url(#adForgeGrad)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="13" y="14.4" width="5" height="2.3" rx="1.15" fill="url(#adForgeGrad)" />
      </svg>
    </span>
  );
}

function AdWordmark({ className = "text-xl" }: { className?: string }) {
  return (
    <span className={`font-extrabold tracking-tight ${className}`}>
      <span className="text-white">Dev</span>
      <span className="ad-grad">Forge</span>
    </span>
  );
}


const AD_SCENES = 7;
const AD_SVC_STEP = 720; // ms po koraku scene Usluge (build-up usluga, pa pečati cijena)
const AD_DUR = [3800, 3800, 4800, 3800, 3800, 3800, 3800]; // ms po sceni; scena 2 (Usluge) malo duža: 4 usluge (ikona+cijena zajedno)

// Tip prijelazne animacije (zavjesa/iris/wipe/blinds) koji se odigra na ULASKU u svaku scenu.
// Različiti tipovi → reklama "diše", svaka scena se otkriva drugačije. Re-okida se preko key={scene}.
// Svi prijelazi = "tr-wipe" (animacija 2→3), OSIM 5→6 (tr-curtain) i 6→7 (tr-wipe) koji ostaju.
// Scena 0 (brand) bez prijelaza — ima vlastiti logo/word-by-word ulaz.
const AD_TRANS = ["", "tr-wipe", "tr-wipe", "tr-wipe", "tr-wipe", "tr-curtain", "tr-wipe"];

// Lebdeće čestice — fiksni (deterministički) raspored: l=lijevo%, s=veličina(cqh), d=delay, dur=trajanje.
const AD_PARTICLES = [
  { l: 8, s: 0.7, d: 0, dur: 9 }, { l: 18, s: 1.1, d: 3.2, dur: 12 }, { l: 27, s: 0.5, d: 1.5, dur: 8 },
  { l: 36, s: 0.9, d: 5, dur: 11 }, { l: 45, s: 1.3, d: 2.2, dur: 13 }, { l: 53, s: 0.6, d: 6.4, dur: 9.5 },
  { l: 62, s: 1.0, d: 0.8, dur: 12.5 }, { l: 70, s: 0.7, d: 4.1, dur: 10 }, { l: 78, s: 1.2, d: 2.8, dur: 11.5 },
  { l: 86, s: 0.5, d: 5.6, dur: 8.5 }, { l: 92, s: 0.9, d: 1.2, dur: 12 }, { l: 14, s: 0.6, d: 7, dur: 10.5 },
  { l: 40, s: 0.8, d: 8.2, dur: 13.5 }, { l: 58, s: 0.5, d: 3.7, dur: 9 }, { l: 74, s: 0.8, d: 6.9, dur: 11 },
  { l: 32, s: 1.1, d: 9, dur: 12.8 },
];

// Bosanski voice-over tekst po sceni (prati ono što se prikazuje).
const AD_NARRATION = [
  "DevForge — izrađujemo web stranice, mobilne aplikacije i igre po vašoj mjeri.",
  "Gotovu verziju vašeg projekta izrađujemo za pet dana, a plaćate tek kad ste zadovoljni. Bez predujma.",
  "Sve na jednom mjestu: web stranice trideset devet, web shopovi sto devedeset devet maraka, a mobilne aplikacije i igre po dogovoru.",
  "Uz svaki projekt dobijate vlastiti admin panel — sami mijenjate tekst, slike, proizvode i cijene, bez koda.",
  "Do šezdeset posto jeftinije od agencija — uz isti vrhunski kvalitet i iste provjerene tehnologije.",
  "Zatražite svoju besplatnu gotovu verziju na devforge.ba.",
  "DevForge. Bez rizika, bez predujma.",
];

// Frosted-glass ikona — glavni vizual scene (Spacemail stil). Pop ulaz + lebdenje.
function AdGlass({ icon: Icon, sm = false, delay = 0, warn = false }: { icon: IconType; sm?: boolean; delay?: number; warn?: boolean }) {
  return (
    <span className="ad-pop" style={{ animationDelay: `${delay}s` }}>
      <span className={`ad-glass-wrap ${warn ? "ad-warn" : ""}`}>
        <span className={`ad-glass ad-breathe ${sm ? "ad-glass-sm" : ""} ${warn ? "ad-glass-warn" : ""}`}>
          <Icon aria-hidden="true" />
          <span className="ad-glass-sheen" aria-hidden="true" />
        </span>
      </span>
    </span>
  );
}

// Naslov koji ulazi RIJEČ-PO-RIJEČ (kao u Spacemail videu): svaka riječ fade+rise+blur.
// `parts`: niz {t, grad?} — grad označava teal-gradient riječi. start = početni delay (s).
function AdWords({ parts, start = 0.1, step = 0.13, className = "" }: { parts: { t: string; grad?: boolean; warn?: boolean }[]; start?: number; step?: number; className?: string }) {
  return (
    <span className={className}>
      {parts.map((p, i) => (
        <span key={i} className={`ad-word ${p.grad ? "ad-grad" : ""} ${p.warn ? "ad-grad-warn" : ""}`} style={{ animationDelay: `${start + i * step}s` }}>
          {p.t}
          {i < parts.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

// Usluge u 2×2 gridu — svaka ima cijenu (najniži paket) koja se "pečatira" na kraju.
const AD_SERVICES = [
  { icon: HiOutlineGlobeAlt, label: "Web stranice", price: "150 KM" },
  { icon: HiOutlineShoppingCart, label: "Web shopovi", price: "600 KM" },
  { icon: HiOutlineDevicePhoneMobile, label: "Mobilne aplikacije", price: "Po dogovoru" },
  { icon: HiOutlinePuzzlePiece, label: "2D igrice", price: "Po dogovoru" },
];

// Scena "Usluge" — ćelije se pojave JEDNA PO JEDNA, a cijena (pečat) dolazi ODMAH sa ikonom (ne poslije).
// step = koliko je ćelija otkriveno (0..N-1); svaka vidljiva ćelija prikazuje ikonu I pečat zajedno.
function AdServices({ paused }: { paused: boolean }) {
  const N = AD_SERVICES.length;
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (paused || step >= N - 1) return;
    const t = window.setTimeout(() => setStep((s) => s + 1), AD_SVC_STEP);
    return () => window.clearTimeout(t);
  }, [step, paused, N]);
  return (
    <div className="ad-box ad-box-wide">
      <h3 className="ad-h3 text-white">
        <AdWords parts={[{ t: "Sve" }, { t: "na" }, { t: "jednom", grad: true }, { t: "mjestu", grad: true }]} />
      </h3>
      <div className="ad-svc-grid">
        {AD_SERVICES.map((s, i) => (
          <div key={i} className={`ad-svc-cell ad-cell ${i <= step ? "is-in" : ""}`}>
            <span className="ad-svc-iconwrap">
              <AdGlass icon={s.icon} sm />
              <span className={`ad-stamp ${i <= step ? "is-in" : ""}`}>{s.price}</span>
            </span>
            <span className="ad-svc-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdReel() {
  const [scene, setScene] = useState(0);
  const [paused, setPaused] = useState(false);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => setScene((s) => (s + 1) % AD_SCENES), AD_DUR[scene]);
    return () => window.clearTimeout(t);
  }, [scene, paused]);

  // voice-over: izgovori naraciju trenutne scene (bs/hr/sr glas ako postoji)
  useEffect(() => {
    if (!sound || paused || typeof window === "undefined" || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(AD_NARRATION[scene]);
    u.lang = "hr-HR";
    u.rate = 0.98;
    const voices = synth.getVoices();
    const v = voices.find((x) => /^(bs|hr|sr)/i.test(x.lang)) || voices.find((x) => /^(sl|mk)/i.test(x.lang));
    if (v) u.voice = v;
    synth.cancel();
    synth.speak(u);
  }, [scene, sound, paused]);

  useEffect(() => {
    if ((paused || !sound) && typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
  }, [paused, sound]);
  useEffect(() => () => { if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel(); }, []);

  function renderScene() {
    switch (scene) {
      case 0: // BRAND OPEN — logo + tekst (kao na stranici) + hero naslov
        return (
          <div className="ad-box">
            <span className="ad-rise ad-pill">
              <span className="ad-type">devforge.ba</span>
            </span>
            <div className="ad-pop flex items-center" style={{ gap: "1.8cqh" }}>
              <AdMark size="11cqh" />
              <AdWordmark className="ad-wm-xl" />
            </div>
            <h2 className="ad-h2">
              <AdWords
                start={0.4}
                parts={[
                  { t: "Izrađujemo" }, { t: "web" }, { t: "stranice," }, { t: "mobilne" }, { t: "aplikacije" }, { t: "i" }, { t: "igre" },
                  { t: "po", grad: true }, { t: "vašoj", grad: true }, { t: "mjeri.", grad: true },
                ]}
              />
            </h2>
          </div>
        );
      case 1: // KLJUČNI BENEFIT — gotova verzija za 5 dana, plaćate tek kad ste zadovoljni
        return (
          <div className="ad-box">
            <AdGlass icon={HiOutlineShieldCheck} />
            <h2 className="ad-h2 text-white">
              <AdWords parts={[{ t: "Plaćate" }, { t: "tek" }, { t: "kad" }, { t: "ste" }, { t: "zadovoljni.", grad: true }]} />
            </h2>
            <p className="ad-rise ad-lead text-white/60" style={{ animationDelay: ".7s" }}>
              Gotovu verziju izrađujemo za 5 dana — 0 KM unaprijed.
            </p>
          </div>
        );
      case 2: // ŠTA DOBIJATE — usluge JEDNA PO JEDNA (fokus + tekst prati svaku)
        return <AdServices paused={paused} />;
      case 3: // CMS / ADMIN PANEL — sami uređujete sajt
        return (
          <div className="ad-box">
            <AdGlass icon={HiOutlineRectangleGroup} />
            <h2 className="ad-h2 text-white">
              <AdWords parts={[{ t: "Potpuna" }, { t: "kontrola.", grad: true }]} />
            </h2>
            <p className="ad-rise ad-lead text-white/60" style={{ animationDelay: ".55s" }}>
              Vlastiti admin panel (CMS) — sami mijenjate sadržaj, slike i cijene, bez koda.
            </p>
          </div>
        );
      case 4: // BENEFIT — povoljnije od agencija, isti kvalitet
        return (
          <div className="ad-box">
            <AdGlass icon={HiOutlineSparkles} />
            <h2 className="ad-h2 text-white">
              <AdWords parts={[{ t: "Do" }, { t: "60%", grad: true }, { t: "jeftinije." }]} />
            </h2>
            <p className="ad-rise ad-lead text-white/60" style={{ animationDelay: ".55s" }}>
              Iste tehnologije, isti kvalitet — bez agencijskih cijena.
            </p>
          </div>
        );
      case 5: // CTA s kursorom
        return (
          <div className="ad-box ad-box-wide">
            <h2 className="ad-h2 text-white">
              <AdWords parts={[{ t: "Zatražite" }, { t: "gotovu", grad: true }, { t: "verziju.", grad: true }]} />
            </h2>
            <div className="ad-rise relative" style={{ animationDelay: ".45s", marginTop: "1cqh", display: "inline-flex" }}>
              <span className="ad-glow absolute inset-0 rounded-none bg-teal-400/40 blur-xl" aria-hidden="true" />
              <span className="ad-cta ad-cta-live relative">
                <HiOutlineRocketLaunch aria-hidden="true" />
                Besplatno za 5 dana
              </span>
              <svg className="ad-cursor" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M5 3l14 8-6 1.5L9.5 19 5 3z" stroke="#04100e" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="ad-rise ad-eyebrow text-white/55" style={{ animationDelay: ".7s" }}>
              devforge.ba
            </p>
          </div>
        );
      default: // END CARD
        return (
          <div className="ad-box">
            <div className="ad-pop flex items-center" style={{ gap: "1.8cqh" }}>
              <AdMark size="9cqh" />
              <AdWordmark className="ad-wm-xl" />
            </div>
            <p className="ad-rise ad-eyebrow text-teal-300/70" style={{ animationDelay: ".35s" }}>
              Bez rizika · Bez predujma
            </p>
          </div>
        );
    }
  }

  return (
    <div className="ad-stage">
      {/* 9:16 OKVIR — snima se samo ovo */}
      <div className="ad-reel ad-clean">
        {/* pozadina koja se MIJENJA po sceni (re-fade preko key) */}
        <div className={`ad-bg ad-bg-${scene}`} key={`bg-${scene}`} aria-hidden="true" />
        <div className="ad-fold" aria-hidden="true" />

        {/* lebdeće čestice (atmosfera) */}
        <div className="ad-particles" aria-hidden="true">
          {AD_PARTICLES.map((p, i) => (
            <span
              key={i}
              className="ad-dot"
              style={{ left: `${p.l}%`, width: `${p.s}cqh`, height: `${p.s}cqh`, animationDuration: `${p.dur}s`, animationDelay: `${p.d}s` }}
            />
          ))}
        </div>

        <div className="ad-scene ad-scene-enter" key={scene}>
          {renderScene()}
        </div>

        {/* ZAVJESA / prijelaz — pokrije pa otkrije scenu (tip ovisi o sceni). Re-okida preko key. */}
        <div className={`ad-trans ${AD_TRANS[scene]}`} key={`tr-${scene}`} aria-hidden="true">
          <span className="ad-trans-a" />
          <span className="ad-trans-b" />
          <span className="ad-trans-bars"><i /><i /><i /><i /><i /></span>
        </div>

        {/* filmski grade */}
        <div className="ad-filmgrain" aria-hidden="true" />
        <div className="ad-vignette" aria-hidden="true" />
      </div>

      {/* BOČNI PANEL (desno) — voice-over skripta + kontrole. NE snima se. */}
      <div className="ad-side">
        <div className="ad-side-title">🎙️ Voice-over (BS) — prati scene</div>
        <div className="ad-vo">
          {AD_NARRATION.map((t, i) => (
            <p key={i} className={`ad-vo-line ${i === scene ? "is-current" : ""}`}>
              <span className="ad-vo-num">{i + 1}</span>
              {t}
            </p>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 pt-1 text-sm">
          <button
            onClick={() => setSound((s) => !s)}
            className={`rounded-full border px-4 py-2 font-semibold transition ${sound ? "border-teal-400/60 bg-teal-400/15 text-teal-200" : "border-white/15 bg-white/5 text-white hover:bg-white/10"}`}
          >
            {sound ? "🔊 Glas uključen" : "🔇 Uključi glas"}
          </button>
          <button
            onClick={() => setPaused((p) => !p)}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-semibold text-white transition hover:bg-white/10"
          >
            {paused ? "▶ Nastavi" : "⏸ Pauza"}
          </button>
          <button
            onClick={() => { setScene(0); setPaused(false); }}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-semibold text-white transition hover:bg-white/10"
          >
            ↺ Ispočetka
          </button>
          <a href="/" className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-semibold text-white transition hover:bg-white/10">
            ← Stranica
          </a>
        </div>
        <p className="text-xs leading-relaxed text-white/40">Snimi screen-recorderom samo teal okvir (9:16). Ovaj panel se ne snima.</p>
      </div>
    </div>
  );
}
export default function App() {
  const rawPath = useAppRoute();
  // normaliziraj trailing slash (/usluge/ → /usluge), osim korijena
  const path = rawPath.length > 1 && rawPath.endsWith("/") ? rawPath.replace(/\/+$/, "") : rawPath;
  const routeMap: Record<string, string> = {
    "/o-nama": "about",
    "/usluge": "services",
    "/projekti": "projects",
    "/usluge/web-stranice": "svc-web",
    "/usluge/2d-igrice": "svc-games",
    "/usluge/mobilne-aplikacije": "svc-mobile",
    "/utisci": "utisci",
    "/cijene": "cijene",
    "/cesta-pitanja": "faq",
    "/kontakt": "kontakt",
    "/privatnost": "privatnost",
    "/uslovi": "uslovi",
    "/kolacici": "kolacici",
    "/reklama": "reklama",
    "/admin": "admin",
  };
  // "/" → home; poznata putanja → njena vrijednost; sve ostalo → 404.
  const route = path === "/" ? "home" : routeMap[path] ?? "notfound";

  const [cookieVisible, setCookieVisible] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem("devforge-cookie-consent")) setCookieVisible(true);
    } catch {
      setCookieVisible(true);
    }
  }, []);
  const acceptCookies = () => {
    try {
      localStorage.setItem("devforge-cookie-consent", "1");
    } catch {
      /* localStorage nedostupan */
    }
    setCookieVisible(false);
  };

  useEffect(() => {
    // Tražena in-page meta (npr. #pricing) postavljena preko navigate(to, id) ili anchor-klika.
    let scrollId = "";
    try {
      scrollId = sessionStorage.getItem("dvf-scroll-id") || "";
      if (scrollId) sessionStorage.removeItem("dvf-scroll-id");
    } catch {
      /* sessionStorage nedostupan */
    }
    if (scrollId) {
      const t = window.setTimeout(() => {
        document.getElementById(scrollId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 220);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0 });
  }, [path, route]);

  // Globalni interceptor klikova na interne linkove → history navigacija (bez reloada).
  // Interni "/..." linkovi idu kroz navigate(); "#..." anchori skrolaju (s home-a) ili vode home + skrol.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("//") || /^https?:\/\//.test(href)) return;
      if (href.startsWith("#")) {
        e.preventDefault();
        const id = href.slice(1);
        if (!id) {
          navigate("/");
        } else if (window.location.pathname === "/") {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        } else {
          navigate("/", id);
        }
        return;
      }
      if (href.startsWith("/")) {
        e.preventDefault();
        navigate(href);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // SEO: dinamički <title> po stranici (kad JS radi) — svaka ruta dobije svoj naslov.
  useEffect(() => {
    const titles: Record<string, string> = {
      home: "DevForge — Web stranice, shopovi i aplikacije | Sarajevo, BiH",
      about: "O nama — DevForge | Digitalna agencija iz Sarajeva",
      services: "Usluge — web, shopovi, aplikacije i 2D igre | DevForge",
      "svc-web": "Izrada web stranica od 150 KM | DevForge Sarajevo",
      "svc-games": "Izrada 2D igara | DevForge",
      "svc-mobile": "Izrada mobilnih aplikacija (Android & iOS) | DevForge",
      projects: "Projekti — naš rad | DevForge",
      utisci: "Utisci klijenata | DevForge",
      cijene: "Cijene — web od 150 KM, shop od 600 KM | DevForge",
      faq: "Česta pitanja | DevForge",
      kontakt: "Kontakt — zatražite gotovu verziju | DevForge Sarajevo",
      privatnost: "Politika privatnosti | DevForge",
      uslovi: "Uslovi korištenja | DevForge",
      kolacici: "Kolačići | DevForge",
      notfound: "Stranica nije pronađena | DevForge",
    };
    document.title = titles[route] ?? titles.home;
    // Canonical + og:url po ruti (čisti URL-ovi → svaka stranica ima svoj kanonski URL).
    const url = "https://devforge.ba" + (path === "/" ? "/" : path);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
  }, [route, path]);

  // Reklama: samostalan 9:16 okvir bez headera/footera/kursora (čist za snimanje).
  if (route === "reklama") return <AdReel />;

  // Admin panel: samostalan prikaz bez headera, footera, kursora i cookie banera.
  if (route === "admin") return <AdminPanel />;

  return (
    <div className="min-h-screen bg-[#060606] font-sans text-white selection:bg-teal-400 selection:text-black">
      <CustomCursor />
      <ScrollProgress />
      <Spotlight />
      <div className="grain-overlay" aria-hidden="true" />
      <Preloader />
      <RouteCurtain trigger={route} />
      <Header />
      {route === "about" ? (
        <AboutPage />
      ) : route === "services" ? (
        <ServicesPage />
      ) : route === "projects" ? (
        <ProjectsPage />
      ) : route === "svc-web" ? (
        <ServiceDetailPage detail={serviceDetails.web} />
      ) : route === "svc-games" ? (
        <ServiceDetailPage detail={serviceDetails.games} />
      ) : route === "svc-mobile" ? (
        <ServiceDetailPage detail={serviceDetails.mobile} />
      ) : route === "utisci" ? (
        <UtisciPage />
      ) : route === "cijene" ? (
        <CijenePage />
      ) : route === "faq" ? (
        <FaqPage />
      ) : route === "kontakt" ? (
        <KontaktPage />
      ) : route === "privatnost" ? (
        <LegalPage doc={legalDocs.privatnost} />
      ) : route === "uslovi" ? (
        <LegalPage doc={legalDocs.uslovi} />
      ) : route === "kolacici" ? (
        <LegalPage doc={legalDocs.kolacici} />
      ) : route === "notfound" ? (
        <NotFoundPage />
      ) : (
        <HomePage />
      )}
      <ContactAndFooter />
      <FloatingActions raised={cookieVisible} />
      <CookieConsent visible={cookieVisible} onAccept={acceptCookies} />
    </div>
  );
}