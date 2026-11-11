// ───────────────────────────────────────────────────────────────────────────
// PORUKE — upiti koje ljudi šalju kroz kontakt formu.
//
// Kako radi (namjerno jednostavno, bez baze):
//   1. Korisnik popuni formu na sajtu i klikne "Pošalji".
//   2. `POST /api/inquiry` šalje mail na kontakt@devlab.cc.cd preko Brevoa
//      — korisnik NE mora imati mail klijent, ništa se ne otvara.
//   3. Ista poruka se upiše u `inquiries` listu.
//
// Lista se čuva na dva mjesta:
//   • localStorage — uvijek, pa admin vidi poruku i bez servera.
//   • server      — kad je /api/inquiry konfigurisan (Vercel + Brevo).
//
// Zašto oba: lokalno je trenutno i radi offline; server je jedino mjesto koje
// vidi PORUKU OD DRUGOG ČOVJEKA. Bez servera bi admin vidio samo svoje testove.
// ───────────────────────────────────────────────────────────────────────────

export type Inquiry = {
  id: string;
  /** Kad je poruka poslana (ISO string). */
  at: string;
  name: string;
  /** Telefon ili email — šta god je čovjek ostavio. */
  contact: string;
  service: string;
  budget: string;
  message: string;
  /** Da li je admin označio da je odgovoreno. */
  handled?: boolean;
};

const KEY = "devforge-inquiries";

/** Pročitaj sve poruke, najnovije prve. */
export function loadInquiries(): Inquiry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const list = JSON.parse(raw) as Inquiry[];
    if (!Array.isArray(list)) return [];
    return list.sort((a, b) => b.at.localeCompare(a.at));
  } catch {
    return [];
  }
}

function save(list: Inquiry[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, 500)));
  } catch {
    /* pun localStorage — ne rušimo formu zbog toga */
  }
}

/** Dodaj poruku lokalno (poziva se i kad server ne odgovori). */
export function addInquiryLocally(data: Omit<Inquiry, "id" | "at">): Inquiry {
  const item: Inquiry = {
    ...data,
    id: `inq_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    at: new Date().toISOString(),
  };
  save([item, ...loadInquiries()]);
  return item;
}

/** Označi poruku kao odgovorenu / neodgovorenu. */
export function setInquiryHandled(id: string, handled: boolean): void {
  const list = loadInquiries().map((x) => (x.id === id ? { ...x, handled } : x));
  save(list);
}

/** Obriši poruku. */
export function deleteInquiry(id: string): void {
  save(loadInquiries().filter((x) => x.id !== id));
}

/** Koliko je neodgovorenih — za badge na tabu. */
export function unhandledCount(): number {
  return loadInquiries().filter((x) => !x.handled).length;
}

/**
 * Pošalji poruku na server.
 *
 * Vraća `true` ako je mail zaista poslan. Ako server nije dostupan (lokalni
 * razvoj bez Vercela), vraća `false` — pozivalac tada samo sačuva poruku
 * lokalno, da korisnik ne vidi grešku za nešto što nije njegova krivica.
 */
export async function sendInquiryToServer(
  data: Omit<Inquiry, "id" | "at">,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const r = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!r.ok) {
      // 404 = endpoint ne postoji (lokalni dev). To nije greška korisnika.
      if (r.status === 404) return { ok: false };
      const j = await r.json().catch(() => ({}));
      return { ok: false, error: (j as { error?: string }).error ?? "Slanje nije uspjelo." };
    }
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
