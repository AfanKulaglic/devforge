// ───────────────────────────────────────────────────────────────────────────
// POST /api/inquiry — prima poruku iz kontakt forme i šalje je na mejl.
//
// Razlika od /api/send-mail:
//   • send-mail je za VAS (admin šalje ponudu kupcu, mora biti ulogovan u smislu
//     poznavanja adrese primaoca i dozvoljenog pošiljaoca).
//   • inquiry je za KUPCA — primalac je UVIJEK naš kontakt, pošiljalac je Brevo
//     (jer kupac nema nalog kod nas), a njegova adresa ide u `replyTo`. Tako
//     kad kliknete "Odgovori", odgovor ide direktno njemu.
//
// Sigurnost (endpoint je javno dostupan):
//   1. Primalac je fiksan — ne može se poslati nikome drugom.
//   2. Rate limit po IP — 6 poruka / 10 min.
//   3. Honeypot polje `website` — botovi ga popune, ljudi ne vide.
//   4. Dužine se sijeku na serveru.
//   5. Sav tekst se escape-uje prije nego uđe u HTML.
//
// Zašto ne čuvamo u bazi: nema baze, a poruke treba da stižu na mejl odmah.
// Admin ih vidi i u tabu "Poruke" (localStorage) i u sandučetu.
// ───────────────────────────────────────────────────────────────────────────

export const config = { runtime: "nodejs" };

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

/**
 * Primaoc poruke — UVIJEK mi, korisnik ne bira.
 *
 * PRIJE: hardkodirano na "info@devlab.cc.cd". Taj alias zivi na
 * ImprovMX-u, koji SAMO forwarduje na neku drugu adresu. Ako taj forward
 * nije podesen (ili vodi na adresu koja ne postoji), Brevo kaze "ok",
 * ali mail se izgubi i NIKAD ne dode. Tano to se desavalo.
 *
 * SADA: primaoc se cita iz MAIL_INBOX env varijable na Vercelu. Upisi
 * tamo svoj stvarni mailbox (npr. tvoj Hotmail) i mail ide DIREKTNO —
 * nema forwarda, nema gubljenja. Ako varijabla nije postavljena, pada
 * nazad na staru adresu (da nista ne pukne).
 */
const INBOX = process.env.MAIL_INBOX || "info@devlab.cc.cd";
/** Brevo posiljalac (mora biti verifikovan u Brevo). */
const FROM = process.env.MAIL_FROM || "info@devlab.cc.cd";

const RATE_LIMIT = 6;
const RATE_WINDOW_MS = 10 * 60 * 1000;

const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const isEmail = (v: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

const clip = (v: unknown, max: number): string =>
  (v ?? "").toString().trim().slice(0, max);

const esc = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Red "labela — vrijednost" u mailu. */
function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:0 16px 10px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;color:#6b7280;vertical-align:top;white-space:nowrap;text-transform:uppercase;letter-spacing:0.5px;">${esc(label)}</td>
    <td style="padding:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111827;vertical-align:top;">${esc(value)}</td>
  </tr>`;
}

function buildHtml(f: {
  name: string;
  contact: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  at: string;
}): string {
  const TEAL = "#0f766e";
  const TEAL_BRIGHT = "#14b8a6";
  const INK = "#111827";

  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background:#ffffff;">
  <tr><td align="left" style="padding:24px 24px 0;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;max-width:600px;">

      <tr><td style="padding:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;color:${TEAL_BRIGHT};text-transform:uppercase;letter-spacing:0.8px;">
        Nova poruka sa sajta
      </td></tr>
      <tr><td style="padding:0 0 22px;font-family:Arial,Helvetica,sans-serif;font-size:21px;font-weight:bold;color:${INK};line-height:1.3;">
        ${esc(f.name || "Nepoznat pošiljalac")}
      </td></tr>

      <tr><td style="padding:0 0 20px;">
        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;">
          ${row("Telefon", f.contact)}
          ${f.email ? row("Email", f.email) : ""}
          ${row("Usluga", f.service)}
          ${row("Budžet", f.budget)}
          ${row("Vrijeme", f.at)}
        </table>
      </td></tr>

      <tr><td style="padding:0 0 26px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
          <tr><td style="background:#f3f4f6;border-left:3px solid ${TEAL_BRIGHT};padding:16px 18px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.65;color:${INK};white-space:pre-wrap;">${esc(f.message)}</td></tr>
        </table>
      </td></tr>

      <tr><td style="border-top:1px solid #e5e7eb;font-size:0;line-height:0;height:1px;">&nbsp;</td></tr>
      <tr><td style="padding:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#9ca3af;line-height:1.6;">
        Poslano sa <a href="https://devlab.cc.cd" style="color:${TEAL};font-weight:bold;text-decoration:none;">devlab.cc.cd</a>
        · Klikni „Odgovori" da pišeš direktno pošiljaocu.
      </td></tr>

    </table>
  </td></tr>
  <tr><td style="padding:0 0 32px;font-size:0;line-height:0;">&nbsp;</td></tr>
</table>
</body></html>`;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Metoda nije dozvoljena." });
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    // U lokalnom razvoju ključa nema. Vraćamo 404 da klijent zna da je
    // server nedostupan i da samo sačuva poruku lokalno (bez greške korisniku).
    res.status(404).json({ ok: false, error: "Slanje na server nije konfigurisano." });
    return;
  }

  const ip =
    (req.headers["x-forwarded-for"] ?? "").toString().split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  let body: any = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body || "{}");
    } catch {
      body = {};
    }
  }
  body = body ?? {};

  // Honeypot — skriveno polje. Bot ga popuni, čovjek nikad.
  if (clip(body.website, 200)) {
    res.status(200).json({ ok: true });
    return;
  }

  const name = clip(body.name, 120);
  const contact = clip(body.contact, 40);
  const email = clip(body.email, 200);
  const service = clip(body.service, 120) || "Nije navedeno";
  const budget = clip(body.budget, 120) || "Nije naveden";
  const message = clip(body.message, 4000);

  if (message.length < 3) {
    res.status(400).json({ ok: false, error: "Poruka je prekratka." });
    return;
  }
  // TELEFON JE OBAVEZAN i mora biti BROJ. Server ne vjeruje klijentu,
  // pa provjerava i ovdje — inače bi se POST mogao poslati direktno.
  const telDigits = contact.replace(/[^0-9]/g, "");
  if (telDigits.length < 6) {
    res.status(400).json({ ok: false, error: "Broj telefona je obavezan." });
    return;
  }
  if (rateLimited(ip)) {
    res.status(429).json({ ok: false, error: "Previše poruka. Pokušajte za 10 minuta." });
    return;
  }

  const at = new Date().toLocaleString("bs-BA", {
    timeZone: "Europe/Sarajevo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Ako je ostavio email, "Odgovori" ide njemu; ako je telefon — nama
  // (i tada je telefon jedini način da ga dobijemo, a vidi se u mailu).
  const replyTo = isEmail(email) ? { email, name: name || "Kupac" } : undefined;

  const subject = `Nova poruka: ${name || "bez imena"} — ${service}`.slice(0, 190);

  try {
    const r = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "DevLab sajt", email: FROM },
        to: [{ email: INBOX }],
        ...(replyTo ? { replyTo } : {}),
        subject,
        textContent: [
          `Nova poruka sa sajta`,
          ``,
          `Ime: ${name || "(nije upisano)"}`,
          `Telefon: ${contact}`,
          email ? `Email: ${email}` : "",
          `Usluga: ${service}`,
          `Budžet: ${budget}`,
          `Vrijeme: ${at}`,
          ``,
          `Poruka:`,
          message,
        ].filter(Boolean).join("\n"),
        htmlContent: buildHtml({ name, contact, email, service, budget, message, at }),
        headers: { "X-Mailin-custom": "devlab-inquiry" },
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error("Brevo inquiry error", r.status, detail.slice(0, 500));
      res.status(502).json({ ok: false, error: "Slanje nije uspjelo. Pokušajte ponovo." });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (e) {
    console.error("inquiry exception", e);
    res.status(500).json({ ok: false, error: "Greška na serveru." });
  }
}
