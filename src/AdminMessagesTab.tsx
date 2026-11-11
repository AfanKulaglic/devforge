import { useEffect, useState } from "react";
import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineCheck,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClipboardDocument,
  HiOutlineEnvelope,
  HiOutlineTrash,
} from "react-icons/hi2";
import {
  Inquiry,
  deleteInquiry,
  loadInquiries,
  setInquiryHandled,
  unhandledCount,
} from "./lib/inquiries";

// ───────────────────────────────────────────────────────────────────────────
// Tab "Poruke" — upiti koje su ljudi poslali kroz kontakt formu.
//
// Zašto postoji: mail na kontakt@devlab.cc.cd stiže odmah, ali se u sandučetu
// utopi među ostalim. Ovdje su SAMO upiti sa sajta, najnoviji prvi, sa jasnom
// oznakom "novo" dok se ne označe kao odgovoreni.
//
// Podaci: localStorage (src/lib/inquiries.ts). Ista poruka ide i na mejl.
// ───────────────────────────────────────────────────────────────────────────

function when(iso: string): string {
  try {
    const d = new Date(iso);
    const now = Date.now();
    const diff = Math.floor((now - d.getTime()) / 60000);
    if (diff < 1) return "upravo sad";
    if (diff < 60) return `prije ${diff} min`;
    if (diff < 60 * 24) return `prije ${Math.floor(diff / 60)} h`;
    return d.toLocaleString("bs-BA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function InquiryCard({ item, onChange }: { item: Inquiry; onChange: () => void }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        [
          `Ime: ${item.name || "(nije upisano)"}`,
          `Telefon: ${item.contact}`,
          ...(item.email ? [`Email: ${item.email}`] : []),
          `Usluga: ${item.service}`,
          `Budžet: ${item.budget}`,
          "",
          item.message,
        ].join("\n"),
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blokiran — nije kritično */
    }
  };

  // Email je OPCIONALAN — dugme za mejl postoji samo ako ga je čovjek ostavio.
  const isEmail = !!item.email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(item.email);
  const mailTo = isEmail
    ? `mailto:${item.email}?subject=${encodeURIComponent(`Odgovor na vaš upit — ${item.service}`)}`
    : undefined;

  return (
    <article
      className={`border bg-white/[0.02] p-4 transition ${
        item.handled ? "border-white/8 opacity-60" : "border-teal-400/30"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-[0.95rem] font-extrabold text-white">
              {item.name || "Bez imena"}
            </h3>
            {!item.handled && (
              <span className="inline-flex items-center gap-1 bg-teal-400/20 px-1.5 py-0.5 text-[0.58rem] font-black uppercase tracking-[0.12em] text-teal-200">
                Novo
              </span>
            )}
          </div>
          <p className="mt-0.5 text-[0.68rem] text-white/35">{when(item.at)}</p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setInquiryHandled(item.id, !item.handled);
              onChange();
            }}
            title={item.handled ? "Označi kao novo" : "Označi kao odgovoreno"}
            className="inline-flex h-8 w-8 items-center justify-center border border-white/10 text-white/50 transition hover:border-teal-400/50 hover:text-teal-200"
          >
            <HiOutlineCheck className="text-base" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={copy}
            title="Kopiraj poruku"
            className="inline-flex h-8 w-8 items-center justify-center border border-white/10 text-white/50 transition hover:border-white/30 hover:text-white"
          >
            {copied ? (
              <HiOutlineCheck className="text-base" aria-hidden="true" />
            ) : (
              <HiOutlineClipboardDocument className="text-base" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Obrisati ovu poruku?")) {
                deleteInquiry(item.id);
                onChange();
              }
            }}
            title="Obriši"
            className="inline-flex h-8 w-8 items-center justify-center border border-white/10 text-white/50 transition hover:border-red-400/50 hover:text-red-300"
          >
            <HiOutlineTrash className="text-base" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Podaci u redovima — brže se čita od pasusa. */}
      <dl className="mt-3 grid gap-x-5 gap-y-1.5 text-[0.72rem] sm:grid-cols-2">
        <div className="flex gap-2">
          <dt className="shrink-0 font-bold text-white/30">Telefon</dt>
          <dd className="min-w-0 truncate text-white/70">{item.contact}</dd>
        </div>
        {item.email && (
          <div className="flex gap-2">
            <dt className="shrink-0 font-bold text-white/30">Email</dt>
            <dd className="min-w-0 truncate text-white/70">{item.email}</dd>
          </div>
        )}
        <div className="flex gap-2">
          <dt className="shrink-0 font-bold text-white/30">Usluga</dt>
          <dd className="min-w-0 truncate text-white/70">{item.service}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="shrink-0 font-bold text-white/30">Budžet</dt>
          <dd className="min-w-0 truncate text-white/70">{item.budget}</dd>
        </div>
      </dl>

      <p className="mt-3 whitespace-pre-wrap border-l-2 border-teal-400/40 bg-white/[0.02] px-3 py-2.5 text-[0.8rem] leading-6 text-white/75">
        {item.message}
      </p>

      {(mailTo || item.contact || item.email) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {mailTo && (
            <a
              href={mailTo}
              className="inline-flex items-center gap-1.5 bg-teal-400/15 px-3 py-1.5 text-[0.68rem] font-bold text-teal-200 transition hover:bg-teal-400/25"
            >
              <HiOutlineEnvelope className="text-sm" aria-hidden="true" />
              Odgovori mejlom
            </a>
          )}
          {/^\+?[\d\s/-]{6,}$/.test(item.contact) && (
            <a
              href={`tel:${item.contact.replace(/[^\d+]/g, "")}`}
              className="inline-flex items-center gap-1.5 bg-white/[0.06] px-3 py-1.5 text-[0.68rem] font-bold text-white/70 transition hover:bg-white/[0.12]"
            >
              <HiOutlineArrowTopRightOnSquare className="text-sm" aria-hidden="true" />
              Pozovi
            </a>
          )}
          <a
            href={`https://wa.me/${item.contact.replace(/[^\d]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white/[0.06] px-3 py-1.5 text-[0.68rem] font-bold text-white/70 transition hover:bg-white/[0.12]"
          >
            <HiOutlineChatBubbleLeftRight className="text-sm" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      )}
    </article>
  );
}

export default function MessagesTab() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<"sve" | "novo">("sve");

  const reload = () => setItems(loadInquiries());

  useEffect(() => {
    reload();
    // Druga kartica / drugi tab može dodati poruku — osvježi kad se vratiš.
    const onFocus = () => reload();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const shown = filter === "novo" ? items.filter((x) => !x.handled) : items;
  const novih = unhandledCount();

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-white">Poruke</h2>
          <p className="mt-0.5 text-[0.72rem] text-white/40">
            Upiti poslani kroz formu na sajtu. Isti upit stiže i na mejl.
          </p>
        </div>

        <div className="flex items-center gap-1">
          {(["sve", "novo"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.1em] transition ${
                filter === f
                  ? "bg-teal-400/20 text-teal-200"
                  : "text-white/35 hover:text-white/70"
              }`}
            >
              {f === "sve" ? `Sve (${items.length})` : `Novo (${novih})`}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="border border-white/10 bg-white/[0.015] px-6 py-14 text-center">
          <HiOutlineEnvelope className="mx-auto text-3xl text-white/15" aria-hidden="true" />
          <p className="mt-3 text-sm font-bold text-white/50">
            {filter === "novo" ? "Nema novih poruka" : "Još nema poruka"}
          </p>
          <p className="mx-auto mt-1 max-w-sm text-[0.72rem] leading-5 text-white/30">
            {filter === "novo"
              ? "Sve poruke su označene kao odgovorene."
              : "Kad neko pošalje upit kroz formu na sajtu, pojavit će se ovdje — i stići na tvoj mejl."}
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {shown.map((item) => (
            <InquiryCard key={item.id} item={item} onChange={reload} />
          ))}
        </div>
      )}
    </div>
  );
}
