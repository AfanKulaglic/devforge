import { FormEvent, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineBanknotes,
  HiOutlineCheck,
  HiOutlineChevronRight,
  HiOutlineDevicePhoneMobile,
  HiOutlineGlobeAlt,
  HiOutlineLockClosed,
  HiOutlinePencilSquare,
  HiOutlinePlus,
  HiOutlineRectangleGroup,
  HiOutlineTrash,
  HiOutlineXMark,
} from "react-icons/hi2";
import {
  AdminProject,
  SERVICE_OPTIONS,
  deleteProject,
  getProjects,
  getServerProjects,
  newProjectId,
  resetProjects,
  saveProject,
  subscribe,
} from "./lib/projectsStore";
import PricingTab from "./AdminPricingTab";

// ───────────────────────────────────────────────────────────────────────────
// Admin panel — lokalna prijava (sessionStorage) + jedan tab: Projekti.
// Podaci žive u localStorage (src/lib/projectsStore.ts), bez baze i servera.
// ───────────────────────────────────────────────────────────────────────────

const AUTH_KEY = "devforge-admin-session";
const USERNAME = "afan";
const PASSWORD = "080513";

function useProjects() {
  return useSyncExternalStore(subscribe, getProjects, getServerProjects);
}

function isAuthed() {
  try {
    return window.sessionStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
}

// Zajednička polja — isti oštri, tamni stil kao ostatak sajta.
const inputCls =
  "mt-2 w-full border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-teal-300";
const labelCls = "block text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/45";

type Draft = {
  id: string | null;
  title: string;
  service: string;
  tag: string;
  url: string;
  description: string;
  imageDesktop: string;
  imageMobile: string;
};

const EMPTY_DRAFT: Draft = {
  id: null,
  title: "",
  service: SERVICE_OPTIONS[0],
  tag: "",
  url: "",
  description: "",
  imageDesktop: "",
  imageMobile: "",
};

function draftFrom(p: AdminProject): Draft {
  return {
    id: p.id,
    title: p.title,
    service: p.service,
    tag: p.tag,
    url: p.url,
    description: p.description,
    imageDesktop: p.imageDesktop,
    imageMobile: p.imageMobile,
  };
}

// ── Login ──────────────────────────────────────────────────────────────────
function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (user.trim().toLowerCase() === USERNAME && pass === PASSWORD) {
      try {
        window.sessionStorage.setItem(AUTH_KEY, "1");
      } catch {
        /* sessionStorage blokiran */
      }
      setError("");
      onSuccess();
      return;
    }
    setError("Pogrešno korisničko ime ili šifra.");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060606] px-5 py-16">
      {/* Isti teal glow kao hero na sajtu */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-teal-500/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="w-full max-w-md">
        <a
          href="/"
          className="group inline-flex items-center gap-2.5 text-sm font-bold text-white/50 transition hover:text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center border border-white/15 bg-white/[0.04] text-teal-300 transition group-hover:border-teal-300/60">
            <HiOutlineArrowLeft className="text-base" aria-hidden="true" />
          </span>
          Nazad na sajt
        </a>

        <div className="mt-8 border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center border border-teal-400/30 bg-teal-500/10 text-teal-300">
              <HiOutlineLockClosed className="text-lg" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-teal-300">DevForge</p>
              <h1 className="text-xl font-extrabold tracking-tight text-white">Admin panel</h1>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-[#A7AABB]">
            Prijavite se za upravljanje sadržajem. Projekti se čuvaju lokalno u ovom pregledniku.
          </p>

          <form className="mt-7 space-y-5" onSubmit={submit}>
            <label className="block">
              <span className={labelCls}>Korisničko ime</span>
              <input
                className={inputCls}
                type="text"
                name="username"
                autoComplete="username"
                autoFocus
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="afan"
              />
            </label>

            <label className="block">
              <span className={labelCls}>Šifra</span>
              <div className="relative">
                <input
                  className={inputCls + " pr-16"}
                  type={show ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/45 transition hover:text-teal-300"
                >
                  {show ? "Sakrij" : "Prikaži"}
                </button>
              </div>
            </label>

            {error && (
              <p className="border-l-2 border-red-400 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-[#0891B2] px-6 py-3.5 text-sm font-extrabold text-white transition hover:brightness-110"
            >
              Prijavi se
              <HiOutlineChevronRight className="text-base" aria-hidden="true" />
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-xs text-white/30">
          Pristup je dozvoljen samo vlasniku sajta.
        </p>
      </div>
    </div>
  );
}

// ── Forma za projekat ──────────────────────────────────────────────────────
function ProjectForm({
  draft,
  onCancel,
  onSaved,
}: {
  draft: Draft;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Draft>(draft);
  const [error, setError] = useState("");

  useEffect(() => setForm(draft), [draft]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.title.trim()) return setError("Naslov projekta je obavezan.");
    if (!form.imageDesktop.trim()) return setError("Link slike za desktop je obavezan.");
    if (form.url.trim() && !/^https?:\/\//i.test(form.url.trim()))
      return setError("Link projekta mora počinjati sa https:// ili http://");

    const project: AdminProject = {
      id: form.id ?? newProjectId(),
      title: form.title.trim(),
      service: form.service,
      tag: form.tag.trim(),
      url: form.url.trim(),
      description: form.description.trim(),
      imageDesktop: form.imageDesktop.trim(),
      imageMobile: form.imageMobile.trim() || form.imageDesktop.trim(),
      createdAt: Date.now(),
    };
    saveProject(project);
    setError("");
    onSaved();
  };

  return (
    <form className="border border-white/10 bg-white/[0.03] p-5 md:p-7" onSubmit={submit}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-teal-300">
            {form.id ? "Uredi projekt" : "Novi projekt"}
          </p>
          <h2 className="mt-1 text-lg font-extrabold tracking-tight text-white">
            {form.id ? form.title || "Projekt" : "Dodaj projekt"}
          </h2>
        </div>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Zatvori formu"
          className="border border-white/15 p-2 text-white/60 transition hover:border-teal-300 hover:text-teal-300"
        >
          <HiOutlineXMark className="text-base" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className={labelCls}>Naslov projekta *</span>
          <input
            className={inputCls}
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="npr. E-Commerce Platform"
          />
        </label>

        <label className="block">
          <span className={labelCls}>Usluga (grupa)</span>
          <select
            className={inputCls}
            value={form.service}
            onChange={(e) => set("service", e.target.value)}
          >
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s} className="bg-[#0E0E12]">
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className={labelCls}>Oznaka / tag</span>
          <input
            className={inputCls}
            value={form.tag}
            onChange={(e) => set("tag", e.target.value)}
            placeholder="npr. Web shop"
          />
        </label>

        <label className="block md:col-span-2">
          <span className={labelCls}>Link projekta (https://…)</span>
          <input
            className={inputCls}
            value={form.url}
            onChange={(e) => set("url", e.target.value)}
            placeholder="https://www.klijent.ba"
          />
        </label>

        <label className="block md:col-span-2">
          <span className={labelCls}>Opis</span>
          <textarea
            className={inputCls + " min-h-[96px] resize-y"}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Kratki opis projekta…"
          />
        </label>
      </div>

      {/* Slike — samo link, bez uploada */}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label className="block">
            <span className={labelCls}>
              <HiOutlineGlobeAlt className="mr-1.5 inline text-sm text-teal-300" aria-hidden="true" />
              Slika za desktop *
            </span>
            <input
              className={inputCls}
              value={form.imageDesktop}
              onChange={(e) => set("imageDesktop", e.target.value)}
              placeholder="https://…/slika.jpg"
            />
          </label>
          <div className="mt-3 aspect-[16/9] overflow-hidden border border-white/10 bg-[#0A0A0E]">
            {form.imageDesktop ? (
              <img
                src={form.imageDesktop}
                alt=""
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0";
                }}
                onLoad={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "1";
                }}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-white/25">
                Pregled desktop slike
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block">
            <span className={labelCls}>
              <HiOutlineDevicePhoneMobile className="mr-1.5 inline text-sm text-teal-300" aria-hidden="true" />
              Slika za mobitel
            </span>
            <input
              className={inputCls}
              value={form.imageMobile}
              onChange={(e) => set("imageMobile", e.target.value)}
              placeholder="https://…/slika-mobile.jpg"
            />
          </label>
          <div className="mt-3 flex justify-center border border-white/10 bg-[#0A0A0E] py-3">
            <div className="aspect-[9/18] w-[92px] overflow-hidden rounded-[0.6rem] border border-white/15 bg-black">
              {form.imageMobile || form.imageDesktop ? (
                <img
                  src={form.imageMobile || form.imageDesktop}
                  alt=""
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[0.6rem] text-white/25">
                  mobilni
                </div>
              )}
            </div>
          </div>
          <p className="mt-2 text-[0.68rem] leading-5 text-white/30">
            Ako ostaviš prazno, koristi se desktop slika.
          </p>
        </div>
      </div>

      {error && (
        <p className="mt-5 border-l-2 border-red-400 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-300">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-[#0891B2] px-6 py-3 text-sm font-extrabold text-white transition hover:brightness-110"
        >
          <HiOutlineCheck className="text-base" aria-hidden="true" />
          {form.id ? "Sačuvaj izmjene" : "Dodaj projekt"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-white/20 px-6 py-3 text-sm font-bold text-white/80 transition hover:border-teal-300 hover:text-white"
        >
          Otkaži
        </button>
      </div>
    </form>
  );
}

// ── Tab: Projekti ──────────────────────────────────────────────────────────
function ProjectsTab() {
  const projects = useProjects();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...projects].sort((a, b) => a.createdAt - b.createdAt),
    [projects],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-white">Projekti</h2>
          <p className="mt-1 text-sm text-white/45">
            {projects.length === 0
              ? "Još nema projekata — dodaj prvi."
              : `${projects.length} ${projects.length === 1 ? "projekt" : "projekta"} na sajtu`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDraft(EMPTY_DRAFT)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-[#0891B2] px-5 py-2.5 text-sm font-extrabold text-white transition hover:brightness-110"
          >
            <HiOutlinePlus className="text-base" aria-hidden="true" />
            Dodaj projekt
          </button>
        </div>
      </div>

      {draft && (
        <ProjectForm
          draft={draft}
          onCancel={() => setDraft(null)}
          onSaved={() => setDraft(null)}
        />
      )}

      {sorted.length === 0 && !draft && (
        <div className="border border-dashed border-white/15 bg-white/[0.02] px-6 py-14 text-center">
          <HiOutlineRectangleGroup className="mx-auto text-3xl text-white/20" aria-hidden="true" />
          <p className="mt-4 text-sm font-semibold text-white/60">Nema projekata</p>
          <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-white/35">
            Klikni na „Dodaj projekt" i zalijepi link slike za desktop i mobitel. Projekti se odmah
            pojavljuju na stranici /projekti.
          </p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sorted.map((p) => (
          <div
            key={p.id}
            className="group flex flex-col border border-white/10 bg-white/[0.03] transition hover:border-teal-300/40"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-[#0A0A0E]">
              <img
                src={p.imageDesktop}
                alt={p.title}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="absolute left-0 top-0 bg-black/70 px-2 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-teal-300 backdrop-blur-sm">
                {p.service}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-4">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-teal-300/80">
                {p.tag || "—"}
              </p>
              <h3 className="mt-1 text-base font-extrabold tracking-tight text-white">{p.title}</h3>
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/40">
                {p.description || "Bez opisa"}
              </p>

              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[0.7rem] font-bold text-white/45 transition hover:text-teal-300"
                >
                  <HiOutlineArrowTopRightOnSquare className="text-sm" aria-hidden="true" />
                  {p.url.replace(/^https?:\/\//, "")}
                </a>
              )}

              <div className="mt-auto flex items-center gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setDraft(draftFrom(p))}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 border border-white/15 px-3 py-2 text-xs font-bold text-white/80 transition hover:border-teal-300 hover:text-white"
                >
                  <HiOutlinePencilSquare className="text-sm" aria-hidden="true" />
                  Uredi
                </button>
                {confirmId === p.id ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        deleteProject(p.id);
                        setConfirmId(null);
                      }}
                      className="inline-flex items-center justify-center gap-1.5 bg-red-500/90 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-500"
                    >
                      Potvrdi
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmId(null)}
                      className="border border-white/15 px-3 py-2 text-xs font-bold text-white/70 transition hover:text-white"
                    >
                      Ne
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmId(p.id)}
                    aria-label={`Obriši ${p.title}`}
                    className="border border-white/15 px-3 py-2 text-white/60 transition hover:border-red-400 hover:text-red-300"
                  >
                    <HiOutlineTrash className="text-sm" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length > 0 && (
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <p className="text-[0.68rem] leading-5 text-white/25">
            Podaci se čuvaju lokalno u ovom pregledniku (localStorage).
          </p>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Vratiti početne projekte i obrisati sve tvoje izmjene?")) {
                resetProjects();
                setConfirmId(null);
              }
            }}
            className="text-[0.68rem] font-bold text-white/30 transition hover:text-red-300"
          >
            Resetuj na početno
          </button>
        </div>
      )}
    </div>
  );
}

// ── Admin shell ────────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [authed, setAuthed] = useState(() => isAuthed());
  const [tab, setTab] = useState<"projekti" | "cijene">("projekti");

  if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} />;

  const logout = () => {
    try {
      window.sessionStorage.removeItem(AUTH_KEY);
    } catch {
      /* ignore */
    }
    setAuthed(false);
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <div
        className="pointer-events-none fixed -top-40 left-1/2 -z-0 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-teal-500/10 blur-[130px]"
        aria-hidden="true"
      />

      {/* Topbar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#060606]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-teal-400/30 bg-teal-500/10 text-teal-300">
              <HiOutlineLockClosed className="text-base" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-teal-300">DevForge</p>
              <p className="text-sm font-extrabold tracking-tight">Admin panel</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/projekti"
              className="hidden items-center gap-1.5 border border-white/15 px-3.5 py-2 text-xs font-bold text-white/70 transition hover:border-teal-300 hover:text-white sm:inline-flex"
            >
              <HiOutlineArrowTopRightOnSquare className="text-sm" aria-hidden="true" />
              Pogledaj sajt
            </a>
            <button
              type="button"
              onClick={logout}
              className="border border-white/15 px-3.5 py-2 text-xs font-bold text-white/70 transition hover:border-red-400 hover:text-red-300"
            >
              Odjavi se
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
        {/* Tabovi */}
        <div className="mb-8 flex items-center gap-1 border-b border-white/10">
          <button
            type="button"
            onClick={() => setTab("projekti")}
            aria-current={tab === "projekti"}
            className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition ${
              tab === "projekti"
                ? "border-teal-400 text-white"
                : "border-transparent text-white/45 hover:text-white/80"
            }`}
          >
            <HiOutlineRectangleGroup className="text-base" aria-hidden="true" />
            Projekti
          </button>
          <button
            type="button"
            onClick={() => setTab("cijene")}
            aria-current={tab === "cijene"}
            className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition ${
              tab === "cijene"
                ? "border-teal-400 text-white"
                : "border-transparent text-white/45 hover:text-white/80"
            }`}
          >
            <HiOutlineBanknotes className="text-base" aria-hidden="true" />
            Cijene
          </button>
        </div>

        {tab === "projekti" && <ProjectsTab />}
        {tab === "cijene" && <PricingTab />}
      </main>
    </div>
  );
}
