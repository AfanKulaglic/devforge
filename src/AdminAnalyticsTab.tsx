import { useMemo, useSyncExternalStore } from "react";
import {
  HiOutlineArrowPath,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineComputerDesktop,
  HiOutlineDevicePhoneMobile,
  HiOutlineDeviceTablet,
  HiOutlineGlobeAlt,
  HiOutlineInformationCircle,
  HiOutlineLink,
  HiOutlineTrash,
  HiOutlineUsers,
} from "react-icons/hi2";
import { useEffect, useState as useState2 } from "react";
import {
  AnalyticsSummary,
  DEVICE_LABEL,
  Visit,
  clearVisits,
  fmtDateTime,
  fmtDuration,
  getServerVisits,
  getVisits,
  mergeRemoteVisits,
  subscribeVisits,
  summarize,
} from "./lib/analytics";

function useVisits() {
  return useSyncExternalStore(subscribeVisits, getVisits, getServerVisits);
}

// ── Male gradjevne jedinice (isti vizuelni jezik kao ostatak admina) ──────
const cardCls = "border border-white/10 bg-white/[0.02] p-5";

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className={cardCls}>
      <div className="flex items-center gap-2 text-teal-300">
        <span className="text-base" aria-hidden="true">{icon}</span>
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em]">{label}</p>
      </div>
      <p className="mt-2.5 text-2xl font-extrabold tracking-tight text-white">{value}</p>
      {hint && <p className="mt-1 text-xs text-white/40">{hint}</p>}
    </div>
  );
}

function BarRow({ label, value, max, suffix }: { label: string; value: number; max: number; suffix?: string }) {
  const pct = max > 0 ? Math.max(3, Math.round((value / max) * 100)) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-40 shrink-0 truncate text-sm text-white/70" title={label}>{label}</span>
      <div className="h-2 flex-1 overflow-hidden bg-white/[0.06]">
        <div className="h-full bg-gradient-to-r from-teal-400 to-cyan-400" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-16 shrink-0 text-right text-xs font-bold tabular-nums text-white/60">
        {value}{suffix ?? ""}
      </span>
    </div>
  );
}

function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className={cardCls}>
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white">{title}</p>
      {subtitle && <p className="mt-1 text-xs text-white/40">{subtitle}</p>}
      <div className="mt-4 space-y-2.5">{children}</div>
    </div>
  );
}

function DeviceIcon({ device }: { device: Visit["device"] }) {
  if (device === "mobile") return <HiOutlineDevicePhoneMobile className="text-sm" aria-hidden="true" />;
  if (device === "tablet") return <HiOutlineDeviceTablet className="text-sm" aria-hidden="true" />;
  return <HiOutlineComputerDesktop className="text-sm" aria-hidden="true" />;
}

/** Grafik posjeta po danu (cist SVG, bez biblioteka). */
function DailyChart({ daily }: { daily: AnalyticsSummary["daily"] }) {
  if (daily.length === 0) {
    return <p className="text-sm text-white/35">Nema podataka još.</p>;
  }
  const max = Math.max(...daily.map((d) => d.visits), 1);
  const W = 100;
  const H = 40;
  const step = daily.length > 1 ? W / (daily.length - 1) : 0;
  const points = daily.map((d, i) => `${i * step},${H - (d.visits / max) * H}`).join(" ");

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-28 w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="anFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,${H} ${points} ${W},${H}`} fill="url(#anFill)" />
        <polyline points={points} fill="none" stroke="#2DD4BF" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-2 flex justify-between text-[0.6rem] uppercase tracking-wider text-white/30">
        <span>{daily[0].day.slice(5)}</span>
        <span>{daily.at(-1)?.day.slice(5)}</span>
      </div>
    </div>
  );
}

// ── Tab ───────────────────────────────────────────────────────────────────
export default function AnalyticsTab() {
  const visits = useVisits();
  const [loading, setLoading] = useState2(true);

  // summarize() nikad ne smije srusiti cijeli admin panel — ako podaci iz
  // baze nisu u ocekivanom obliku, prikazi prazno stanje umjesto bijelog ekrana.
  const { summary: s, failed } = useMemo(() => {
    try {
      return { summary: summarize(visits), failed: false };
    } catch (err) {
      console.error("[analytics] summarize failed:", err, visits);
      return {
        summary: summarize([]),
        failed: true,
      };
    }
  }, [visits]);

  // Ucitaj posjete i iz Firebase (svi uredjaji u istu listu).
  useEffect(() => {
    void mergeRemoteVisits().finally(() => setLoading(false));
  }, []);

  const maxCountry = Math.max(...s.byCountry.map((c) => c.count), 1);
  const maxSource = Math.max(...s.bySource.map((c) => c.count), 1);
  const maxDevice = Math.max(...s.byDevice.map((c) => c.count), 1);
  const maxPage = Math.max(...s.byPage.map((p) => p.views), 1);

  const onClear = () => {
    if (window.confirm("Obrisati sve lokalno prikupljene posjete? Ovo ne može poništiti.")) {
      clearVisits();
    }
  };

  return (
    <div className="space-y-6">
      {/* Obavještenje o ograničenju — iskreno, bez lažnih brojeva */}
      <div className="flex items-start gap-3 border border-teal-400/25 bg-teal-500/[0.06] p-4">
        <HiOutlineInformationCircle className="mt-0.5 shrink-0 text-lg text-teal-300" aria-hidden="true" />
        <div className="text-sm leading-6 text-white/70">
          <p className="font-bold text-white">Analitika — Firebase + lokalno</p>
          <p className="mt-1">
            Posjete se bilježe lokalno i <strong className="text-white">šalju u Firebase</strong>, pa ih vidiš
            sa svakog uređaja. Država je procijenjena iz vremenske zone; za tačnu geolokaciju uključi{" "}
            <strong className="text-white">Vercel Analytics</strong>.
          </p>
          {loading && <p className="mt-2 text-xs text-teal-200/70">Učitavam iz baze…</p>}
          {failed && (
            <p className="mt-2 text-xs text-amber-300/90">
              Dio zapisa iz baze nije u ispravnom obliku pa je preskočen. Klikni „Osvježi“ — novi posjeti se
              bilježe ispravno.
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="https://vercel.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-1.5 text-xs font-bold text-white/70 transition hover:border-teal-300 hover:text-white"
            >
              <HiOutlineArrowTopRightOnSquare className="text-sm" aria-hidden="true" />
              Otvori Vercel Analytics
            </a>
            <a
              href="https://analytics.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-1.5 text-xs font-bold text-white/70 transition hover:border-teal-300 hover:text-white"
            >
              <HiOutlineArrowTopRightOnSquare className="text-sm" aria-hidden="true" />
              Google Analytics
            </a>
          </div>
        </div>
      </div>

      {/* Kartice sa brojevima */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={<HiOutlineUsers />} label="Posjeta" value={String(s.totalVisits)} hint="zabilježeno lokalno" />
        <StatCard icon={<HiOutlineClock />} label="Prosj. trajanje" value={fmtDuration(s.avgSessionMs)} hint="po posjeti" />
        <StatCard icon={<HiOutlineChartBar />} label="Ukupno vrijeme" value={fmtDuration(s.totalTimeMs)} hint="sve posjete" />
        <StatCard icon={<HiOutlineGlobeAlt />} label="Država" value={String(s.byCountry.length)} hint="različitih izvora" />
      </div>

      {/* Grafik */}
      <SectionCard title="Posjete po danu" subtitle="zadnjih 14 dana">
        <DailyChart daily={s.daily} />
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Države */}
        <SectionCard title="Države" subtitle="procjena iz vremenske zone i jezika">
          {s.byCountry.length === 0 ? (
            <p className="text-sm text-white/35">Nema podataka još.</p>
          ) : (
            s.byCountry.map((c) => (
              <BarRow key={c.code} label={`${c.label} (${c.code})`} value={c.count} max={maxCountry} />
            ))
          )}
        </SectionCard>

        {/* Izvor */}
        <SectionCard title="Odakle dolaze" subtitle="referrer / kanal">
          {s.bySource.length === 0 ? (
            <p className="text-sm text-white/35">Nema podataka još.</p>
          ) : (
            s.bySource.map((c) => (
              <BarRow key={c.label} label={c.label} value={c.count} max={maxSource} />
            ))
          )}
        </SectionCard>

        {/* Uređaj */}
        <SectionCard title="Uređaji" subtitle="mobitel / tablet / desktop">
          {s.byDevice.length === 0 ? (
            <p className="text-sm text-white/35">Nema podataka još.</p>
          ) : (
            s.byDevice.map((c) => (
              <BarRow
                key={c.label}
                label={DEVICE_LABEL[c.label as Visit["device"]] ?? c.label}
                value={c.count}
                max={maxDevice}
              />
            ))
          )}
        </SectionCard>

        {/* Stranice */}
        <SectionCard title="Stranice" subtitle="pregledi i prosječno zadržavanje">
          {s.byPage.length === 0 ? (
            <p className="text-sm text-white/35">Nema podataka još.</p>
          ) : (
            s.byPage.map((p) => (
              <div key={p.path} className="flex items-center gap-3">
                <span className="w-32 shrink-0 truncate text-sm text-white/70" title={p.path}>{p.path}</span>
                <div className="h-2 flex-1 overflow-hidden bg-white/[0.06]">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-cyan-400"
                    style={{ width: `${Math.max(3, Math.round((p.views / maxPage) * 100))}%` }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right text-xs font-bold tabular-nums text-white/60">{p.views}×</span>
                <span className="w-16 shrink-0 text-right text-xs tabular-nums text-white/40">{fmtDuration(p.avgMs)}</span>
              </div>
            ))
          )}
        </SectionCard>
      </div>

      {/* Nedavne posjete */}
      <div className={cardCls}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white">Nedavne posjete</p>
            <p className="mt-1 text-xs text-white/40">hronološki, najnovije prvo</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                void mergeRemoteVisits().finally(() => setLoading(false));
              }}
              disabled={loading}
              className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-1.5 text-xs font-bold text-white/60 transition hover:border-teal-300 hover:text-white disabled:opacity-50"
            >
              <HiOutlineArrowPath className={`text-sm ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
              {loading ? "Učitavam…" : "Osvježi"}
            </button>
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-1.5 text-xs font-bold text-white/60 transition hover:border-red-400 hover:text-red-300"
            >
              <HiOutlineTrash className="text-sm" aria-hidden="true" />
              Očisti
            </button>
          </div>
        </div>

        {s.recent.length === 0 ? (
          <p className="mt-4 text-sm text-white/35">
            Nema zabilježenih posjeta. Otvori sajt u novom tabu pa se vrati ovdje.
          </p>
        ) : (
          <div className="mt-4 -mx-2 overflow-x-auto">
            <table className="w-full min-w-[56rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-[0.62rem] uppercase tracking-[0.14em] text-white/35">
                  <th className="px-2 py-2 font-bold">Vrijeme</th>
                  <th className="px-2 py-2 font-bold">Država</th>
                  <th className="px-2 py-2 font-bold">Izvor</th>
                  <th className="px-2 py-2 font-bold">Uređaj</th>
                  <th className="px-2 py-2 font-bold">Stranice</th>
                  <th className="px-2 py-2 text-right font-bold">Trajanje</th>
                </tr>
              </thead>
              <tbody>
                {s.recent.map((v) => (
                  <tr key={v.id} className="border-b border-white/[0.06] align-top transition hover:bg-white/[0.03]">
                    <td className="px-2 py-3 whitespace-nowrap text-xs text-white/55">
                      {fmtDateTime(v.startedAt)}
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-xs text-white/75">
                      <span className="font-bold">{v.countryCode}</span>
                      <span className="ml-1.5 text-white/40">{v.country}</span>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-xs text-white/60">
                      <span className="inline-flex items-center gap-1.5">
                        <HiOutlineLink className="text-[0.7rem] text-teal-300/70" aria-hidden="true" />
                        {v.referrerSource}
                      </span>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-xs text-white/60">
                      <span className="inline-flex items-center gap-1.5">
                        <DeviceIcon device={v.device} />
                        {DEVICE_LABEL[v.device]} · {v.screen}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-xs text-white/55">
                      {v.pages.length === 0 ? (
                        <span className="text-white/30">—</span>
                      ) : (
                        <div className="space-y-1">
                          {v.pages.map((p, i) => (
                            <div key={`${p.path}-${i}`} className="flex items-center gap-2">
                              <span className="font-mono text-[0.68rem] text-white/75">{p.path}</span>
                              <span className="text-[0.65rem] text-white/35">{fmtDuration(p.durationMs)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-2 py-3 text-right text-xs font-bold tabular-nums text-teal-300/85">
                      {fmtDuration(v.totalMs)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
