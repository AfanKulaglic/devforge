// ───────────────────────────────────────────────────────────────────────────
// /objave — galerija 60 marketinskih objava za Instagram.
//
// Sve slike se generisu kodom (SVG) iz podataka u posts1/2/3.ts, pa je
// dizajn po definiciji konzistentan. Svaka objava se moze:
//   - pregledati uvecana (modal)
//   - preuzeti kao .svg (otvoriti u browseru ili pretvoriti u PNG)
//   - kopirati caption + hashtagove jednim klikom
// ───────────────────────────────────────────────────────────────────────────

import { useMemo, useState } from "react";
import {
  HiOutlineArrowDownTray,
  HiOutlineCheck,
  HiOutlineClipboardDocument,
  HiOutlineMagnifyingGlassPlus,
  HiOutlineXMark,
} from "react-icons/hi2";
import { CATEGORY_LABEL, TEMPLATE_LABEL, ALL_POSTS } from "./lib/postsIndex";
import type { AdPost, PostCategory } from "./lib/postsData";
import { postSvgDataUri, renderPostSlides } from "./lib/postRender";

const FILTERS: (PostCategory | "sve")[] = ["sve", "sadrzaj", "edukacija", "ponuda", "dokaz", "brend"];

// ── Preuzimanje SVG-a kao fajl ────────────────────────────────────────────
function downloadSvg(post: AdPost, slideIdx = 0) {
  const slides = renderPostSlides(post);
  const svg = slides[slideIdx] ?? slides[0];
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const total = slides.length;
  a.download = total > 1
    ? `devforge-objava-${post.id}-slika-${slideIdx + 1}-od-${total}.svg`
    : `devforge-objava-${post.id}.svg`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// ── Kopiranje teksta objave ───────────────────────────────────────────────
function copyCaption(post: AdPost) {
  const text = `${post.caption}\n\n${post.tags.map((t) => `#${t}`).join(" ")}`;
  void navigator.clipboard?.writeText(text);
}

// ── Kartica jedne objave ──────────────────────────────────────────────────
function PostCard({ post, onOpen }: { post: AdPost; onOpen: () => void }) {
  const slides = useMemo(() => renderPostSlides(post), [post]);
  const src = useMemo(() => postSvgDataUri(slides[0]), [slides]);
  const total = slides.length;

  return (
    <figure className="group relative overflow-hidden border border-white/10 bg-white/[0.02]">
      <button
        type="button"
        onClick={onOpen}
        className="relative block w-full focus:outline-none focus:ring-2 focus:ring-teal-300"
        aria-label={`Otvori objavu: ${post.title}`}
      >
        <img
          src={src}
          alt={post.title}
          width={1080}
          height={1080}
          loading="lazy"
          className="block w-full transition group-hover:opacity-85"
        />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition group-hover:opacity-100">
          <HiOutlineMagnifyingGlassPlus className="text-3xl text-white" aria-hidden="true" />
        </span>
        {total > 1 && (
          <span className="pointer-events-none absolute right-2 top-2 inline-flex items-center gap-1 bg-black/75 px-2 py-1 text-[0.62rem] font-extrabold text-white backdrop-blur-sm">
            {total} slika
          </span>
        )}
      </button>
      <figcaption className="flex items-center justify-between gap-2 border-t border-white/10 px-3 py-2">
        <span className="truncate text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white/45">
          {CATEGORY_LABEL[post.category]}
        </span>
        <span className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={() => copyCaption(post)}
            className="border border-white/12 p-1.5 text-white/50 transition hover:border-teal-300 hover:text-teal-300"
            aria-label="Kopiraj tekst objave"
            title="Kopiraj tekst"
          >
            <HiOutlineClipboardDocument className="text-sm" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => downloadSvg(post, 0)}
            className="border border-white/12 p-1.5 text-white/50 transition hover:border-teal-300 hover:text-teal-300"
            aria-label="Preuzmi sliku"
            title="Preuzmi SVG"
          >
            <HiOutlineArrowDownTray className="text-sm" aria-hidden="true" />
          </button>
        </span>
      </figcaption>
    </figure>
  );
}

// ── Modal s velikim prikazom ──────────────────────────────────────────────
function PostModal({ post, onClose }: { post: AdPost; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const [slide, setSlide] = useState(0);
  const slides = useMemo(() => renderPostSlides(post), [post]);
  const src = useMemo(() => postSvgDataUri(slides[slide] ?? slides[0]), [slides, slide]);
  const total = slides.length;

  const doCopy = () => {
    copyCaption(post);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-[140] overflow-y-auto bg-black/90 p-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <img
            src={src}
            alt={`${post.title} — slika ${slide + 1}`}
            className="w-full border border-white/10"
            width={1080}
            height={1080}
          />
          {total > 1 && (
            <div className="mt-3 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setSlide((v) => Math.max(0, v - 1))}
                disabled={slide === 0}
                className="border border-white/15 px-3 py-1.5 text-xs font-bold text-white/60 transition hover:border-teal-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Prethodna slika"
              >
                ←
              </button>
              <div className="flex gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSlide(i)}
                    aria-label={`Slika ${i + 1}`}
                    aria-current={i === slide}
                    className={`h-1.5 transition-all ${i === slide ? "w-7 bg-teal-400" : "w-3 bg-white/25 hover:bg-white/50"}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setSlide((v) => Math.min(total - 1, v + 1))}
                disabled={slide === total - 1}
                className="border border-white/15 px-3 py-1.5 text-xs font-bold text-white/60 transition hover:border-teal-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Sljedeća slika"
              >
                →
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-teal-300">
                {total > 1 ? `Karusel · slika ${slide + 1} / ${total}` : "Jedna slika"}
              </p>
              <p className="mt-1 text-xs text-white/40">
                {CATEGORY_LABEL[post.category]} · {TEMPLATE_LABEL[post.template]}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="border border-white/15 p-2 text-white/60 transition hover:border-teal-300 hover:text-white"
              aria-label="Zatvori"
            >
              <HiOutlineXMark className="text-lg" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-5 border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-white/40">
              Tekst objave
            </p>
            <p className="mt-2 max-h-64 overflow-y-auto whitespace-pre-wrap text-[0.82rem] leading-6 text-white/80">
              {post.caption}
            </p>
            <p className="mt-3 text-[0.72rem] leading-5 text-teal-300/70">
              {post.tags.map((t) => `#${t}`).join(" ")}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={doCopy}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-[#0891B2] px-4 py-2.5 text-xs font-extrabold text-white"
            >
              {copied ? (
                <HiOutlineCheck className="text-sm" aria-hidden="true" />
              ) : (
                <HiOutlineClipboardDocument className="text-sm" aria-hidden="true" />
              )}
              {copied ? "Kopirano!" : "Kopiraj tekst"}
            </button>
            <button
              type="button"
              onClick={() => downloadSvg(post, slide)}
              className="inline-flex items-center gap-2 border border-white/20 px-4 py-2.5 text-xs font-bold text-white/80 transition hover:border-teal-300 hover:text-white"
            >
              <HiOutlineArrowDownTray className="text-sm" aria-hidden="true" />
              Preuzmi sliku
            </button>
          </div>

          <p className="mt-4 text-[0.7rem] leading-5 text-white/35">
            Slika je vektorska (SVG) — savršeno oštra u bilo kojoj veličini. Za PNG/JPG otvorite
            preuzeti fajl u browseru i sačuvajte kao sliku, ili pretvorite online.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Stranica ──────────────────────────────────────────────────────────────
export default function PostsPage() {
  const [filter, setFilter] = useState<PostCategory | "sve">("sve");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      ALL_POSTS.map((p, i) => ({ post: p, index: i })).filter(
        (x) => filter === "sve" || x.post.category === filter,
      ),
    [filter],
  );

  return (
    <main id="content" className="bg-[#060606] pb-24 pt-28 md:pt-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h1 className="sr-only">Objave za Instagram — DevForge</h1>

        <header className="max-w-3xl">
          <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.22em] text-teal-300">
            Interna galerija
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            60 objava za Instagram
          </h2>
          <p className="mt-4 text-base leading-7 text-[#A7AABB]">
            Svaka slika je generisana iz koda — isti dizajn jezik, ista paleta, ista tipografija.
            Kliknite na objavu da je vidite uvećanu, kopirate tekst ili preuzmete sliku.
          </p>
        </header>

        {/* Filter po kategoriji */}
        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f;
            const count = f === "sve" ? ALL_POSTS.length : ALL_POSTS.filter((p) => p.category === f).length;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={`inline-flex items-center gap-2 border px-3.5 py-2 text-xs font-bold transition ${
                  active
                    ? "border-teal-300 bg-teal-400/15 text-teal-200"
                    : "border-white/12 text-white/50 hover:border-white/30 hover:text-white/80"
                }`}
              >
                {f === "sve" ? "Sve" : CATEGORY_LABEL[f]}
                <span className="text-[0.62rem] tabular-nums text-white/35">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Galerija */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {visible.map(({ post, index }) => (
            <PostCard key={post.id} post={post} onOpen={() => setOpenIndex(index)} />
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-white/30">
          Prikazano {visible.length} od {ALL_POSTS.length} objava
        </p>
      </div>

      {openIndex !== null && ALL_POSTS[openIndex] && (
        <PostModal post={ALL_POSTS[openIndex]} onClose={() => setOpenIndex(null)} />
      )}
    </main>
  );
}
