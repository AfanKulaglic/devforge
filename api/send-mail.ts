// ───────────────────────────────────────────────────────────────────────────
// POST /api/send-mail — šalje mail kroz Brevo sa Dev Lab potpisom.
//
// Sigurnosne mjere (obavezno — endpoint je javno dostupan):
//   1. API ključ živi SAMO na serveru (process.env), nikad u browseru.
//   2. Rate limit po IP adresi — sprječava da neko potroši dnevnu kvotu.
//   3. Honeypot polje — botovi ga popune, ljudi ne vide.
//   4. Validacija: primalac, tema, dužina teksta.
//   5. Dozvoljeni pošiljaoci su fiksna lista — ne može se poslati "kao bilo ko".
//
// Zašto bez SDK-a: Brevo REST API je običan fetch. Bez dodatne zavisnosti.
// ───────────────────────────────────────────────────────────────────────────

export const config = { runtime: "nodejs" };

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

/** Dozvoljeni pošiljaoci — moraju biti verifikovani u Brevo. */
const ALLOWED_SENDERS = ["kontakt@devlab.cc.cd", "info@devlab.cc.cd"] as const;

/** Maksimalan broj poslanih mailova po IP adresi u 10 minuta. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

/**
 * Rate limit u memoriji funkcije.
 *
 * Napomena: Vercel serverless instance se pale i gase, pa ovo nije savršeno
 * globalno brojanje — ali za jednu osobu koja šalje ponude je više nego dovoljno.
 * Za strogi limit trebao bi Redis. Ovdje je cilj spriječiti slučajnu/botsku
 * zloupotrebu, ne napadački scenarij.
 */
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

/** Minimalno čišćenje tekstualnog sadržaja (HTML se gradi na serveru). */
const clean = (v: string): string => v.trim().slice(0, 8000);

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Gradi HTML tijelo: tekst poruke + potpis na dnu.
 * Potpis je isti vizualni jezik kao /mail stranica (tabela, inline stilovi).
 */
function buildHtml(bodyText: string, sigName: string, sigRole: string, sender: string): string {
  const paragraphs = bodyText
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.65;color:#111827;">${esc(p).replace(/\n/g, "<br>")}</p>`)
    .join("");

  const TEAL = "#0f766e";
  const TEAL_BRIGHT = "#14b8a6";
  const INK = "#111827";
  const SOFT = "#6b7280";

  // Mail klijenti (Gmail, Outlook) odsijecaju dno poruke ako nema "disanja":
  //   - bez vanjske tabele fiksne širine sadržaj se rasteže i lomi
  //   - bez donjeg paddinga potpis se zalijepi za ivicu i bude odrezan
  //   - bez spacer reda na kraju Gmail odsijece zadnjih ~30px ("Message clipped")
  // Zato: tabela 600px, padding 24px svuda, i eksplicitan spacer na dnu.
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background:#ffffff;">
  <tr>
    <td align="left" style="padding:24px 24px 0;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;max-width:600px;">
        <tr>
          <td style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.65;color:#111827;padding:0 0 4px;">
${paragraphs}
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td align="left" style="padding:26px 24px 0;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;max-width:600px;">
        <tr><td style="border-top:1px solid #e5e7eb;font-size:0;line-height:0;height:1px;">&nbsp;</td></tr>
      </table>
    </td>
  </tr>
  <tr>
    <td align="left" style="padding:18px 24px 0;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td style="padding:0 22px 0 0;vertical-align:top;border-right:3px solid ${TEAL_BRIGHT};">
      <img src="https://devlab.cc.cd/images/logo-icon.png" width="64" height="64" alt="Dev Lab"
        style="display:block;width:64px;height:64px;border:0;outline:none;" />
      <div style="font-size:11px;font-weight:bold;color:${INK};text-align:center;padding-top:6px;letter-spacing:-0.2px;">
        Dev<span style="color:${TEAL_BRIGHT};">Lab</span>
      </div>
    </td>
    <td style="padding:0 0 0 22px;vertical-align:top;">
      <div style="font-size:17px;font-weight:bold;color:${INK};line-height:1.3;">${esc(sigName)}</div>
      <div style="font-size:12px;font-weight:bold;color:${TEAL};line-height:1.4;padding-top:2px;text-transform:uppercase;letter-spacing:0.6px;">${esc(sigRole)}</div>
      <div style="font-size:11px;color:${SOFT};line-height:1.6;padding-top:12px;">
        <a href="mailto:${esc(sender)}" style="color:${INK};text-decoration:none;">${esc(sender)}</a><br>
        <a href="tel:+38762576456" style="color:${INK};text-decoration:none;">+387 62 576 456</a><br>
        <a href="https://devlab.cc.cd" style="color:${TEAL};font-weight:bold;text-decoration:none;">devlab.cc.cd</a>
      </div>
      <div style="font-size:10px;color:#9ca3af;line-height:1.5;padding-top:10px;">
        Web stranice · Shopovi · Aplikacije · AI
      </div>
    </td>
  </tr>
</table>
    </td>
  </tr>
  <!-- Spacer: spriecava da Gmail/Outlook odsijece dno potpisa -->
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
    res.status(500).json({ ok: false, error: "Server nije konfigurisan (nedostaje BREVO_API_KEY)." });
    return;
  }

  // Vercel postavlja x-forwarded-for; prva adresa je klijent.
  const ip =
    (req.headers["x-forwarded-for"] ?? "").toString().split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body ?? {};

  const to: string = (body.to ?? "").toString().trim();
  const subject: string = (body.subject ?? "").toString().trim();
  const message: string = (body.message ?? "").toString();
  const sender: string = (body.sender ?? "").toString().trim();
  const sigName: string = (body.sigName ?? "Dev Lab").toString().trim().slice(0, 80);
  const sigRole: string = (body.sigRole ?? "").toString().trim().slice(0, 80);
  const honey: string = (body.website ?? "").toString();

  // Honeypot: polje "website" je skriveno u formi. Ako je popunjeno — bot.
  // Vraćamo 200 da bot ne zna da je uhvaćen (ne pokušava zaobići).
  if (honey) {
    res.status(200).json({ ok: true });
    return;
  }

  if (!isEmail(to)) {
    res.status(400).json({ ok: false, error: "Adresa primaoca nije ispravna." });
    return;
  }
  if (subject.length < 2 || subject.length > 200) {
    res.status(400).json({ ok: false, error: "Tema mora imati 2–200 znakova." });
    return;
  }
  const text = clean(message);
  if (text.length < 2) {
    res.status(400).json({ ok: false, error: "Poruka je prekratka." });
    return;
  }
  if (!(ALLOWED_SENDERS as readonly string[]).includes(sender)) {
    res.status(400).json({ ok: false, error: "Pošiljalac nije dozvoljen." });
    return;
  }

  if (rateLimited(ip)) {
    res.status(429).json({ ok: false, error: "Previše poruka. Pokušajte za 10 minuta." });
    return;
  }

  try {
    const r = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Dev Lab", email: sender },
        to: [{ email: to }],
        replyTo: { email: sender, name: sigName },
        subject,
        textContent: text,
        htmlContent: buildHtml(text, sigName, sigRole, sender),
        // Brevo zahtijeva headers da bi DKIM potpis bio primijenjen.
        headers: { "X-Mailin-custom": "devlab-mail" },
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      // Ne vraćamo sirovi odgovor Brevoa klijentu (može sadržavati interne info),
      // ali ga logujemo da se vidi u Vercel logovima.
      console.error("Brevo error", r.status, detail.slice(0, 500));
      res.status(502).json({ ok: false, error: "Slanje nije uspjelo. Pokušajte ponovo." });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (e) {
    console.error("send-mail exception", e);
    res.status(500).json({ ok: false, error: "Greška na serveru." });
  }
}
