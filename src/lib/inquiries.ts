// ───────────────────────────────────────────────────────────────────────────
// PORUKE — upiti koje ljudi šalju kroz kontakt formu.
//
// Kako radi:
//   1. Korisnik popuni formu i klikne "Pošalji".
//   2. `POST /api/inquiry` šalje mail na info@devlab.cc.cd preko Brevoa
//      — korisnik NE mora imati mail klijent, ništa se ne otvara.
//   3. Ista poruka se upiše u Firebase (`devforge/inquiries`), pa je vidiš
//      u admin panelu sa BILO KOJEG uređaja.
//
// ZAŠTO FIREBASE A NE localStorage:
//   localStorage živi u pregledniku POSJETIOCA. Kad je poruka tamo upisana,
//   admin u SVOM pregledniku je nikad ne vidi — to je bio bug: "popunim i
//   pošaljem, ali mi ne dođe ni u hotmail ni u admin". Sada svi uređaji
//   gledaju isti izvor (Firebase), a localStorage je samo rezerva offline.
// ───────────────────────────────────────────────────────────────────────────

import { get, onValue, push, ref, remove, set } from "firebase/database";
import { getDb, firebaseReady } from "./firebase";

export type Inquiry = {
  id: string;
  /** Kad je poruka poslana (ISO string). */
  at: string;
  name: string;
  /** TELEFON — obavezan, jedini kanal kojim stvarno dobijemo čovjeka. */
  contact: string;
  /** Email — opcionalan. Ako postoji, "Odgovori" u adminu ide na njega. */
  email?: string;
  service: string;
  budget: string;
  message: string;
  /** Da li je admin označio da je odgovoreno. */
  handled?: boolean;
};

const KEY = "devforge-inquiries";
const DB_PATH = "devforge/inquiries";

// ── Normalizacija (Firebase vraća objekat, ne tipizirane vrijednosti) ─────
function normalize(id: string, v: unknown): Inquiry | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const at = typeof o.at === "string" ? o.at : "";
  if (!at) return null;
  return {
    id,
    at,
    name: typeof o.name === "string" ? o.name : "",
    contact: typeof o.contact === "string" ? o.contact : "",
    email: typeof o.email === "string" && o.email ? o.email : undefined,
    service: typeof o.service === "string" ? o.service : "",
    budget: typeof o.budget === "string" ? o.budget : "",
    message: typeof o.message === "string" ? o.message : "",
    handled: o.handled === true,
  };
}

const sortNewest = (a: Inquiry, b: Inquiry) => b.at.localeCompare(a.at);

// ── localStorage rezerva (radi i bez mreže) ──────────────────────────────
export function loadLocalInquiries(): Inquiry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const list = JSON.parse(raw) as Inquiry[];
    return Array.isArray(list) ? list.sort(sortNewest) : [];
  } catch {
    return [];
  }
}

function saveLocal(list: Inquiry[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, 500)));
  } catch {
    /* pun localStorage — ne rušimo formu zbog toga */
  }
}

/** Upisi poruku lokalno (rezerva) i vrati je sa id-jem. */
export function addInquiryLocally(data: Omit<Inquiry, "id" | "at">): Inquiry {
  const item: Inquiry = {
    ...data,
    id: `inq_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    at: new Date().toISOString(),
  };
  saveLocal([item, ...loadLocalInquiries()]);
  return item;
}

// ── Firebase: upis / čitanje / brisanje ──────────────────────────────────

/**
 * Upiši poruku u Firebase. Vraća true ako je uspjelo.
 *
 * Poziva se POSLIJE uspješnog maila — ako mail prođe a ovo padne, poruka
 * je ipak u mailu, pa korisnik ne vidi grešku.
 */
export async function saveInquiryRemote(data: Omit<Inquiry, "id" | "at">): Promise<boolean> {
  if (!firebaseReady) return false;

  // Firebase može visjeti (loša mreža, ad-blocker). Bez timeouta forma
  // čeka neograničeno na ovom `await` PRIJE nego uopšte pozove
  // `/api/inquiry`, pa dugme vrti "Šaljem…" i modal ne reaguje.
  // 6s: ako do tada ne prođe, nastavi dalje — mail je važniji.
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("firebase-timeout")), 6000),
  );

  try {
    const node = push(ref(getDb(), DB_PATH));
    await Promise.race([set(node, {
      at: new Date().toISOString(),
      name: data.name,
      contact: data.contact,
      email: data.email ?? "",
      service: data.service,
      budget: data.budget,
      message: data.message,
      handled: false,
    }), timeout]);
    return true;
  } catch {
    // Timeout ili prava greška — oboje znači "nije potvrđeno".
    // Forma zato ne smije tvrditi da je poslano.
    return false;
  }
}

/** Učitaj sve poruke iz Firebase. */
export async function loadRemoteInquiries(): Promise<Inquiry[]> {
  if (!firebaseReady) return [];
  try {
    const snap = await get(ref(getDb(), DB_PATH));
    if (!snap.exists()) return [];
    const obj = snap.val() as Record<string, unknown>;
    return Object.entries(obj)
      .map(([id, raw]) => normalize(id, raw))
      .filter((x): x is Inquiry => x !== null)
      .sort(sortNewest);
  } catch {
    return [];
  }
}

/**
 * Spoji Firebase i lokalne poruke, bez duplikata.
 *
 * Dedup po `at + contact` — lokalna kopija i Firebase zapis iste poruke
 * imaju isto vrijeme u sekundi, a id se razlikuje.
 */
function merge(remote: Inquiry[], local: Inquiry[]): Inquiry[] {
  const seen = new Set(remote.map((x) => `${x.at}|${x.contact}`));
  return [...remote, ...local.filter((x) => !seen.has(`${x.at}|${x.contact}`))].sort(sortNewest);
}

/** Sve poruke: Firebase + lokalna rezerva. */
export async function loadInquiries(): Promise<Inquiry[]> {
  const [remote, local] = await Promise.all([loadRemoteInquiries(), Promise.resolve(loadLocalInquiries())]);
  return merge(remote, local);
}

/** Označi poruku kao odgovorenu. */
export async function setInquiryHandled(id: string, handled: boolean): Promise<void> {
  // Lokalno uvijek (odmah se vidi u UI).
  saveLocal(loadLocalInquiries().map((x) => (x.id === id ? { ...x, handled } : x)));
  if (!firebaseReady || id.startsWith("inq_")) return; // lokalna kopija nema Firebase zapis
  try {
    await set(ref(getDb(), `${DB_PATH}/${id}/handled`), handled);
  } catch {
    /* offline — lokalno je već sačuvano */
  }
}

/** Obriši poruku. */
export async function deleteInquiry(id: string): Promise<void> {
  saveLocal(loadLocalInquiries().filter((x) => x.id !== id));
  if (!firebaseReady || id.startsWith("inq_")) return;
  try {
    await remove(ref(getDb(), `${DB_PATH}/${id}`));
  } catch {
    /* offline */
  }
}

/** Pretplata na promjene — admin vidi novu poruku bez osvježavanja. */
export function subscribeInquiries(cb: (list: Inquiry[]) => void): () => void {
  if (!firebaseReady) return () => {};
  const r = ref(getDb(), DB_PATH);
  return onValue(r, (snap) => {
    if (!snap.exists()) {
      cb(loadLocalInquiries());
      return;
    }
    const obj = snap.val() as Record<string, unknown>;
    const remote = Object.entries(obj)
      .map(([id, raw]) => normalize(id, raw))
      .filter((x): x is Inquiry => x !== null);
    cb(merge(remote, loadLocalInquiries()));
  });
}

/** Koliko je neodgovorenih — za badge na tabu. */
export function unhandledCount(list: Inquiry[]): number {
  return list.filter((x) => !x.handled).length;
}

// ── Slanje na server (mail) ──────────────────────────────────────────────

/**
 * Pošalji poruku na server (Brevo -> mail).
 *
 * Vraća `true` ako je mail zaista poslan. Ako server nije dostupan (lokalni
 * razvoj bez Vercela), vraća `false` — pozivalac tada samo sačuva poruku
 * lokalno, da korisnik ne vidi grešku za nešto što nije njegova krivica.
 */
export async function sendInquiryToServer(
  data: Omit<Inquiry, "id" | "at">,
): Promise<{ ok: boolean; error?: string; offline?: boolean }> {
  // ── TIMEOUT ────────────────────────────────────────────────────────────
  //
  // Bez ovoga, ako Brevo/Vercel ne odgovori, dugme vrti "Šaljem…"
  // neograničeno i modal nikad ne reaguje. Čovjek misli da je aplikacija
  // mrtva. 8s je dovoljno za normalan mail, a ne drži nikoga zauvijek.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const r = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (r.ok) return { ok: true };

    // 404 = endpoint ne postoji (lokalni razvoj bez Vercela).
    // To nije korisnikova greška — poruka se čuva lokalno i u Firebase.
    if (r.status === 404) {
      return { ok: false, offline: true };
    }

    const j = await r.json().catch(() => ({}));
    // SVAKI neuspjeh mora imati poruku. Prije je funkcija vraćala
    // `{ok:false}` bez `error`, pa je forma prikazivala "poslano"
    // iako mail nije otišao — korisnik je mislio da je sve u redu.
    return {
      ok: false,
      error: (j as { error?: string }).error ?? "Slanje mejla nije uspjelo. Pokušajte ponovo.",
    };
  } catch (e) {
    clearTimeout(timer);
    // AbortError = istekao timeout; ostalo = mreža pala / ad-blocker.
    if (e instanceof Error && e.name === "AbortError") {
      return { ok: false, error: "Server ne odgovara. Pokušajte ponovo ili nas pozovite." };
    }
    return { ok: false, error: "Nema veze sa serverom. Provjerite internet i pokušajte ponovo." };
  }
}
