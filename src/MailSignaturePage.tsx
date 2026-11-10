// ───────────────────────────────────────────────────────────────────────────
// /mail — sastavi i POŠALJI mail sa Dev Lab potpisom.
//
// Ne kopira potpis ručno: forma šalje poruku kroz /api/send-mail (Brevo),
// a server dodaje potpis na dno. Tako svaki poslani mail izgleda isto.
//
// Zaštita: stranica je noindex; endpoint ima rate limit + honeypot + fiksnu
// listu dozvoljenih pošiljalaca (vidi api/send-mail.ts).
// ───────────────────────────────────────────────────────────────────────────

import { useMemo, useState } from "react";
import {
  HiOutlineCheck,
  HiOutlineEnvelope,
  HiOutlinePaperAirplane,
  HiOutlineExclamationTriangle,
  HiOutlineGlobeAlt,
  HiOutlinePhone,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { FaInstagram } from "react-icons/fa6";

const BRAND = {
  site: "devlab.cc.cd",
  siteUrl: "https://devlab.cc.cd",
  phone: "+387 62 576 456",
  instagram: "@devlab.cc.cd",
  address: "Maršala Tita 28, 71000 Sarajevo",
  logoUrl: "https://devlab.cc.cd/images/logo-icon.png",
};

const TEAL = "#0f766e";
const TEAL_BRIGHT = "#14b8a6";
const INK = "#111827";
const SOFT = "#6b7280";

const SENDERS = ["kontakt@devlab.cc.cd", "info@devlab.cc.cd"] as const;

/** Gotove teme — da ne počinješ od praznog polja. */
const SUBJECT_PRESETS = [
  "Ponuda za izradu web stranice",
  "Ponuda za web shop",
  "Ponuda za mobilnu aplikaciju",
  "Besplatna demo verzija — sljedeći korak",
  "Odgovor na vaš upit",
];

/** Gotov tekst — realan predložak koji se samo dopuni. */
function presetBody(kind: "ponuda" | "demo" | "odgovor"): string {
  if (kind === "ponuda") {
    return `Poštovani,

hvala na interesu za saradnju. U prilogu je ponuda za izradu vaše web stranice.

Šta je uključeno:
— UI/UX dizajn prilagođen vašem brendu
— Prilagodba za mobitel, tablet i desktop
— Admin panel za samostalno uređivanje sadržaja
— Osnovna SEO optimizacija
— Postavljanje na hosting i domenu

Rok izrade: 5 radnih dana za prvu gotovu verziju.
Plaćanje: bez predujma — plaćate tek kada ste zadovoljni rezultatom.

Ako imate pitanja ili želite nešto promijeniti, slobodno mi pišite.`;
  }
  if (kind === "demo") {
    return `Poštovani,

vaša besplatna demo verzija je spremna za pregled.

Šta možete pogledati:
— Izgled naslovne stranice
— Raspored sekcija i navigaciju
— Prikaz na mobitelu

Demo je u potpunosti besplatan i bez obaveze. Ako vam se svidi, dogovaramo puni razvoj. Ako ne — ne plaćate ništa.

Recite mi šta biste mijenjali, pa šaljem ažuriranu verziju.`;
  }
  return `Poštovani,

hvala na vašoj poruci.

Da bih vam dao tačnu ponudu, trebaju mi još dvije informacije:
1. Čime se tačno bavite i šta želite da posjetilac uradi na sajtu?
2. Imate li već domenu i hosting, ili to treba riješiti?

Na osnovu toga vam u roku od 24 sata šaljem konkretan predlog sa cijenom i rokom.`;
}

/** Pregled potpisa — identičan onome što server ugradi u mail. */
function signaturePreview(name: string, role: string, sender: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td style="padding:0 22px 0 0;vertical-align:top;border-right:3px solid ${TEAL_BRIGHT};">
      <img src="${BRAND.logoUrl}" width="64" height="64" alt="Dev Lab"
        style="display:block;width:64px;height:64px;border:0;outline:none;" />
      <div style="font-size:11px;font-weight:bold;color:${INK};text-align:center;padding-top:6px;letter-spacing:-0.2px;">
        Dev<span style="color:${TEAL_BRIGHT};">Lab</span>
      </div>
    </td>
    <td style="padding:0 0 0 22px;vertical-align:top;">
      <div style="font-size:17px;font-weight:bold;color:${INK};line-height:1.3;">${name || "Vaše ime"}</div>
      <div style="font-size:12px;font-weight:bold;color:${TEAL};line-height:1.4;padding-top:2px;text-transform:uppercase;letter-spacing:0.6px;">${role || "Web developer"}</div>
      <div style="font-size:11px;color:${SOFT};line-height:1.6;padding-top:12px;">
        <a href="mailto:${sender}" style="color:${INK};text-decoration:none;">${sender}</a><br>
        <a href="tel:+38762576456" style="color:${INK};text-decoration:none;">${BRAND.phone}</a><br>
        <a href="${BRAND.siteUrl}" style="color:${TEAL};font-weight:bold;text-decoration:none;">${BRAND.site}</a>
      </div>
      <div style="font-size:10px;color:#9ca3af;line-height:1.5;padding-top:10px;">
        Web stranice · Shopovi · Aplikacije · AI
      </div>
    </td>
  </tr>
</table>`;
}

export default function MailSignaturePage() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState(SUBJECT_PRESETS[0]);
  const [message, setMessage] = useState(presetBody("ponuda"));
  const [sender, setSender] = useState<string>(SENDERS[0]);
  const [sigName, setSigName] = useState("Afan Kulaglić");
  const [sigRole, setSigRole] = useState("Web developer");
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  const sig = useMemo(() => signaturePreview(sigName, sigRole, sender), [sigName, sigRole, sender]);

  const send = async () => {
    setStatus("sending");
    setError("");
    try {
      const r = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ to, subject, message, sender, sigName, sigRole, website: honey }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) {
        setError(data.error || "Slanje nije uspjelo.");
        setStatus("error");
        return;
      }
      setStatus("ok");
    } catch {
      setError("Nema veze sa serverom. Provjerite internet.");
      setStatus("error");
    }
  };

  const canSend = to.trim() !== "" && subject.trim().length >= 2 && message.trim().length >= 2 && status !== "sending";

  return (
    <main id="content" className="min-h-screen bg-[#060606] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Zaglavlje */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <a href="/" className="text-xs font-bold uppercase tracking-[0.22em] text-teal-300/70 hover:text-teal-300">
              ← Dev Lab
            </a>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Pošalji mail</h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
              Napišite poruku — potpis se dodaje automatski. Šalje se sa{" "}
              <span className="font-semibold text-teal-300">{sender}</span>.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <HiOutlineEnvelope className="text-lg text-teal-300" aria-hidden="true" />
            <div className="text-xs leading-tight">
              <div className="font-bold text-white">{BRAND.site}</div>
              <div className="text-white/40">autentifikovana domena</div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* ── Forma ── */}
          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-white/45">Primalac</span>
              <input
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="klijent@primjer.com"
                className="w-full rounded-lg border border-white/12 bg-black/40 px-3 py-2.5 text-sm text-white outline-none focus:border-teal-400/60"
              />
            </label>

            <div>
              <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-white/45">Šalje se sa</span>
              <div className="grid gap-1.5 sm:grid-cols-2">
                {SENDERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSender(s)}
                    className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition ${
                      sender === s
                        ? "border-teal-400/60 bg-teal-400/10 text-white"
                        : "border-white/10 bg-black/30 text-white/60 hover:border-white/25"
                    }`}
                  >
                    <span className="font-medium">{s}</span>
                    {sender === s && <HiOutlineCheck className="text-teal-300" aria-hidden="true" />}
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-white/45">Tema</span>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-lg border border-white/12 bg-black/40 px-3 py-2.5 text-sm text-white outline-none focus:border-teal-400/60"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {SUBJECT_PRESETS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSubject(s)}
                    className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] text-white/55 transition hover:border-teal-400/50 hover:text-white"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-white/45">Sadržaj poruke</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={14}
                className="w-full resize-y rounded-lg border border-white/12 bg-black/40 px-3 py-2.5 font-sans text-sm leading-relaxed text-white outline-none focus:border-teal-400/60"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="text-[11px] text-white/30">Predložak:</span>
                {([["ponuda", "Ponuda"], ["demo", "Demo spreman"], ["odgovor", "Odgovor na upit"]] as const).map(([k, label]) => (
                  <button
                    key={k}
                    onClick={() => setMessage(presetBody(k))}
                    className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] text-white/55 transition hover:border-teal-400/50 hover:text-white"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </label>

            <div className="grid gap-2 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-white/45">Ime u potpisu</span>
                <input
                  value={sigName}
                  onChange={(e) => setSigName(e.target.value)}
                  className="w-full rounded-lg border border-white/12 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-teal-400/60"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-white/45">Pozicija</span>
                <input
                  value={sigRole}
                  onChange={(e) => setSigRole(e.target.value)}
                  className="w-full rounded-lg border border-white/12 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-teal-400/60"
                />
              </label>
            </div>

            {/* Honeypot — skriveno od ljudi, botovi ga popune */}
            <input
              tabIndex={-1}
              autoComplete="off"
              value={honey}
              onChange={(e) => setHoney(e.target.value)}
              name="website"
              aria-hidden="true"
              className="pointer-events-none absolute h-0 w-0 opacity-0"
            />

            <button
              onClick={send}
              disabled={!canSend}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 px-4 py-3.5 text-sm font-extrabold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <HiOutlinePaperAirplane className="text-lg" aria-hidden="true" />
              {status === "sending" ? "Šaljem…" : "Pošalji mail"}
            </button>

            {status === "ok" && (
              <div className="flex items-center gap-2 rounded-lg border border-teal-400/40 bg-teal-400/10 px-3 py-2.5 text-sm font-semibold text-teal-200">
                <HiOutlineCheck className="text-lg" aria-hidden="true" /> Mail je poslan.
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2.5 text-sm font-semibold text-red-200">
                <HiOutlineExclamationTriangle className="text-lg" aria-hidden="true" /> {error}
              </div>
            )}
          </div>

          {/* ── Pregled ── */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white p-5">
              <div className="mb-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Pregled poruke</div>
              <div className="mb-3 border-b border-gray-200 pb-2 text-[11px] text-gray-500">
                <div><b className="text-gray-800">Od:</b> {sender}</div>
                <div><b className="text-gray-800">Za:</b> {to || "—"}</div>
                <div><b className="text-gray-800">Tema:</b> {subject || "—"}</div>
              </div>
              <div className="max-h-[340px] overflow-y-auto text-[13px] leading-relaxed text-gray-700">
                {message.split(/\n{2,}/).map((p, i) => (
                  <p key={i} className="mb-3 whitespace-pre-line">{p}</p>
                ))}
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <div dangerouslySetInnerHTML={{ __html: sig }} />
              </div>
            </div>

            <div className="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-xs">
              <div className="flex items-center gap-2 text-white/55"><HiOutlineGlobeAlt className="text-teal-300" aria-hidden="true" /> {BRAND.siteUrl}</div>
              <div className="flex items-center gap-2 text-white/55"><HiOutlinePhone className="text-teal-300" aria-hidden="true" /> {BRAND.phone}</div>
              <div className="flex items-center gap-2 text-white/55"><FaInstagram className="text-teal-300" aria-hidden="true" /> {BRAND.instagram}</div>
              <div className="flex items-center gap-2 text-white/55"><HiOutlineMapPin className="text-teal-300" aria-hidden="true" /> {BRAND.address}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
