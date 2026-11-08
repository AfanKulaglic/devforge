import { FormEvent, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineBanknotes,
  HiOutlineChartBar,
  HiOutlineCheck,
  HiOutlineChevronDown,
  HiOutlineChevronRight,
  HiOutlineChevronUp,
  HiOutlineDevicePhoneMobile,
  HiOutlineEye,
  HiOutlineEyeSlash,
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
  reorderProjects,
  resetProjects,
  toggleProjectVisibility,
  saveProject,
  subscribe,
} from "./lib/projectsStore";
import PricingTab from "./AdminPricingTab";
import AnalyticsTab from "./AdminAnalyticsTab";

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
  visible: boolean;
  createdAt: number | null; // null = novi projekt
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
  visible: true,
  createdAt: null,
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
    visible: p.visible !== false,
    createdAt: p.createdAt,
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
                placeholder="admin"
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
                  placeholder="••••••••••••"
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
      // Uredjivanje NE smije promijeniti redoslijed — zadrzi postojeci createdAt.
      createdAt: form.createdAt ?? Date.now(),
      visible: form.visible,
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


// ── Kartica jednog projekta (u listi po kategorijama) ─────────────────────
function ProjectCard({
  project,
  position,
  total,
  confirming,
  onEdit,
  onMoveUp,
  onMoveDown,
  onAskDelete,
  onCancelDelete,
  onConfirmDelete,
  onToggleVisible,
}: {
  project: AdminProject;
  position: number;
  total: number;
  confirming: boolean;
  onEdit: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onAskDelete: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
  onToggleVisible: () => void;
}) {
  const isVisible = project.visible !== false;
  const canUp = position > 1;
  const canDown = position < total;
  return (
    <div className={`group flex flex-col border bg-white/[0.03] transition hover:border-teal-300/40 ${isVisible ? "border-white/10" : "border-dashed border-white/20"}`}>
      {/* Redoslijed + vidljivost */}
      <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-black/25 px-2 py-1.5">
        <span className="flex items-center gap-1.5 pl-1 text-[0.6rem] font-black uppercase tracking-[0.16em] text-white/35">
          <span className="text-teal-300/80">#{position}</span>
          <span className="hidden sm:inline">po redu</span>
        </span>
        <div className="flex items-center gap-1">
          {/* Vidljiv / sakriven — jedan klik */}
          <button
            type="button"
            onClick={onToggleVisible}
            title={isVisible ? "Sakrij s javnog sajta" : "Prikaži na javnom sajtu"}
            aria-label={isVisible ? `Sakrij ${project.title} s javnog sajta` : `Prikaži ${project.title} na javnom sajtu`}
            aria-pressed={isVisible}
            className={`flex items-center gap-1 border px-1.5 py-1 text-[0.58rem] font-black uppercase tracking-[0.1em] transition ${
              isVisible
                ? "border-teal-300/45 bg-teal-400/15 text-teal-200 hover:bg-teal-400/25"
                : "border-white/15 bg-transparent text-white/35 hover:border-white/35 hover:text-white/60"
            }`}
          >
            {isVisible ? (
              <HiOutlineEye className="text-sm" aria-hidden="true" />
            ) : (
              <HiOutlineEyeSlash className="text-sm" aria-hidden="true" />
            )}
            <span className="hidden sm:inline">{isVisible ? "Vidljiv" : "Sakriven"}</span>
          </button>
          <button
            type="button"
            onClick={onMoveUp}
            disabled={!canUp}
            title="Pomjeri gore"
            aria-label={`Pomjeri ${project.title} gore`}
            className="border border-white/12 px-1.5 py-1 text-white/60 transition hover:border-teal-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:border-white/12 disabled:hover:text-white/60"
          >
            <HiOutlineChevronUp className="text-sm" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={!canDown}
            title="Pomjeri dole"
            aria-label={`Pomjeri ${project.title} dolje`}
            className="border border-white/12 px-1.5 py-1 text-white/60 transition hover:border-teal-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:border-white/12 disabled:hover:text-white/60"
          >
            <HiOutlineChevronDown className="text-sm" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="relative aspect-[16/9] overflow-hidden bg-[#0A0A0E]">
        {/* Sakriven projekt: slika je prigusena da se odmah vidi status */}
        {!isVisible && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#060608]/70">
            <span className="flex items-center gap-1.5 border border-white/20 bg-black/60 px-2.5 py-1 text-[0.6rem] font-black uppercase tracking-[0.16em] text-white/70">
              <HiOutlineEyeSlash className="text-sm" aria-hidden="true" />
              Sakriven
            </span>
          </div>
        )}
        <img
          src={project.imageDesktop}
          alt={project.title}
          className={`h-full w-full object-cover transition ${isVisible ? "" : "opacity-30 grayscale"}`}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.opacity = "0.15";
          }}
        />
        {project.tag && (
          <span className="absolute right-0 top-0 bg-black/70 px-2 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white/70 backdrop-blur-sm">
            {project.tag}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-extrabold tracking-tight text-white">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/40">
          {project.description || "Bez opisa"}
        </p>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 truncate text-[0.7rem] font-bold text-white/45 transition hover:text-teal-300"
          >
            <HiOutlineArrowTopRightOnSquare className="shrink-0 text-sm" aria-hidden="true" />
            <span className="truncate">{project.url.replace(/^https?:\/\//, "")}</span>
          </a>
        )}

        <div className="mt-auto flex items-center gap-2 pt-4">
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex flex-1 items-center justify-center gap-1.5 border border-white/15 px-3 py-2 text-xs font-bold text-white/80 transition hover:border-teal-300 hover:text-white"
          >
            <HiOutlinePencilSquare className="text-sm" aria-hidden="true" />
            Uredi
          </button>
          {confirming ? (
            <>
              <button
                type="button"
                onClick={onConfirmDelete}
                className="inline-flex items-center justify-center gap-1.5 bg-red-500/90 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-500"
              >
                Potvrdi
              </button>
              <button
                type="button"
                onClick={onCancelDelete}
                className="border border-white/15 px-3 py-2 text-xs font-bold text-white/70 transition hover:text-white"
              >
                Ne
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onAskDelete}
              aria-label={`Obriši ${project.title}`}
              className="border border-white/15 px-3 py-2 text-white/60 transition hover:border-red-400 hover:text-red-300"
            >
              <HiOutlineTrash className="text-sm" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Tab: Projekti ──────────────────────────────────────────────────────────
function ProjectsTab() {
  const projects = useProjects();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  // Koje su kategorije otvorene — po defaultu sve.
  const [closedGroups, setClosedGroups] = useState<string[]>([]);

  const isOpen = (service: string) => !closedGroups.includes(service);
  const toggleGroup = (service: string) =>
    setClosedGroups((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service],
    );

  // Premjesti projekt gore/dolje SAMO unutar njegove kategorije.
  const moveWithinGroup = (
    group: { service: string; items: AdminProject[] },
    index: number,
    delta: -1 | 1,
  ) => {
    const target = index + delta;
    if (target < 0 || target >= group.items.length) return;
    const ids = group.items.map((p) => p.id);
    [ids[index], ids[target]] = [ids[target], ids[index]];
    reorderProjects(group.service, ids);
  };

  // Grupisano po kategorijama (SERVICE_OPTIONS odredjuje redoslijed),
  // ukljucujuci i prazne kategorije da se vidi sta nedostaje.
  const grouped = useMemo(() => {
    const byService = SERVICE_OPTIONS.map((service) => ({
      service,
      items: projects
        .filter((p) => p.service === service)
        .sort((a, b) => a.createdAt - b.createdAt),
    }));
    // Projekti sa nepoznatom kategorijom (npr. stara vrijednost) idu na kraj.
    const known = new Set<string>(SERVICE_OPTIONS);
    const orphans = projects
      .filter((p) => !known.has(p.service))
      .sort((a, b) => a.createdAt - b.createdAt);
    if (orphans.length > 0) {
      byService.push({ service: "Ostalo", items: orphans });
    }
    return byService;
  }, [projects]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-white">Projekti</h2>
          <p className="mt-1 text-sm text-white/45">
            {projects.length === 0 ? (
              "Još nema projekata — dodaj prvi."
            ) : (
              <>
                {projects.length} {projects.length === 1 ? "projekt" : "projekta"} ukupno
                {" · "}
                <span className="font-semibold text-teal-200/80">
                  {projects.filter((p) => p.visible !== false).length} vidljivo
                </span>
                {projects.some((p) => p.visible === false) && (
                  <span className="text-white/30">
                    {" · "}
                    {projects.filter((p) => p.visible === false).length} sakriveno
                  </span>
                )}
              </>
            )}
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

      {projects.length === 0 && !draft && (
        <div className="border border-dashed border-white/15 bg-white/[0.02] px-6 py-14 text-center">
          <HiOutlineRectangleGroup className="mx-auto text-3xl text-white/20" aria-hidden="true" />
          <p className="mt-4 text-sm font-semibold text-white/60">Nema projekata</p>
          <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-white/35">
            Klikni na „Dodaj projekt" i zalijepi link slike za desktop i mobitel. Projekti se odmah
            pojavljuju na stranici /projekti.
          </p>
        </div>
      )}

      {/* Projekti grupisani po kategorijama (isti redoslijed kao na /projekti) */}
      <div className="space-y-4">
        {grouped.map((group, groupIndex) => (
          <div key={group.service} className="border border-white/10 bg-white/[0.02]">
            <button
              type="button"
              onClick={() => toggleGroup(group.service)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition hover:bg-white/[0.02]"
            >
              <div className="flex items-center gap-3">
                <HiOutlineChevronDown
                  className={`shrink-0 text-base text-white/40 transition-transform ${
                    isOpen(group.service) ? "" : "-rotate-90"
                  }`}
                  aria-hidden="true"
                />
                <span className="text-[0.62rem] font-black tracking-[0.2em] text-white/25">
                  0{groupIndex + 1}
                </span>
                <div>
                  <p className="text-base font-extrabold text-white">{group.service}</p>
                  <p className="text-[0.68rem] text-white/35">
                    {group.items.length} {group.items.length === 1 ? "projekt" : "projekta"}
                    {group.items.some((p) => p.visible === false) && (
                      <span className="text-white/25">
                        {" · "}
                        {group.items.filter((p) => p.visible === false).length} sakriven
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <span className="hidden shrink-0 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-teal-300/70 sm:block">
                {isOpen(group.service) ? "Sakrij" : "Prikaži"}
              </span>
            </button>

            {isOpen(group.service) && (
              <div className="border-t border-white/10 p-4">
                {group.items.length === 0 ? (
                  <div className="border border-dashed border-white/12 px-4 py-8 text-center">
                    <p className="text-xs font-semibold text-white/40">
                      Nema projekata u ovoj kategoriji
                    </p>
                    <button
                      type="button"
                      onClick={() => setDraft({ ...EMPTY_DRAFT, service: group.service })}
                      className="mt-3 inline-flex items-center gap-1.5 border border-white/15 px-3 py-1.5 text-[0.68rem] font-bold text-white/70 transition hover:border-teal-300 hover:text-white"
                    >
                      <HiOutlinePlus className="text-sm" aria-hidden="true" />
                      Dodaj u „{group.service}"
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {group.items.map((p, index) => (
                      <ProjectCard
                        key={p.id}
                        project={p}
                        position={index + 1}
                        total={group.items.length}
                        confirming={confirmId === p.id}
                        onEdit={() => setDraft(draftFrom(p))}
                        onMoveUp={() => moveWithinGroup(group, index, -1)}
                        onMoveDown={() => moveWithinGroup(group, index, +1)}
                        onAskDelete={() => setConfirmId(p.id)}
                        onCancelDelete={() => setConfirmId(null)}
                        onConfirmDelete={() => {
                          deleteProject(p.id);
                          setConfirmId(null);
                        }}
                        onToggleVisible={() => toggleProjectVisibility(p.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
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
  const [tab, setTab] = useState<"projekti" | "cijene" | "analitika">("projekti");

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
          <button
            type="button"
            onClick={() => setTab("analitika")}
            aria-current={tab === "analitika"}
            className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition ${
              tab === "analitika"
                ? "border-teal-400 text-white"
                : "border-transparent text-white/45 hover:text-white/80"
            }`}
          >
            <HiOutlineChartBar className="text-base" aria-hidden="true" />
            Analitika
          </button>
        </div>

        {tab === "projekti" && <ProjectsTab />}
        {tab === "cijene" && <PricingTab />}
        {tab === "analitika" && <AnalyticsTab />}
      </main>
    </div>
  );
}
