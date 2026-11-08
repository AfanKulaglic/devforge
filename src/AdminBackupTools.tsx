import { useEffect, useState, useSyncExternalStore } from "react";
import { HiOutlineArrowUpTray } from "react-icons/hi2";
import { countRemote, forcePushToFirebase, getSyncState, subscribeSync } from "./lib/projectsStore";

// ───────────────────────────────────────────────────────────────────────────
// Firebase sync status za projekte.
// Ranije je ovdje bila i sekcija „Sigurnosna kopija" (izvoz/uvoz JSON-a) —
// uklonjena jer su projekti sada u Firebaseu i backup nije potreban.
// ───────────────────────────────────────────────────────────────────────────

export default function BackupTools() {
  return <FirebaseSyncPanel />;
}

function FirebaseSyncPanel() {
  const state = useSyncExternalStore(subscribeSync, getSyncState, () => "idle" as const);
  const [remoteCount, setRemoteCount] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const refresh = async () => {
    const n = await countRemote();
    setRemoteCount(n);
  };

  useEffect(() => {
    void refresh();
  }, [state]);

  const onPush = async () => {
    setBusy(true);
    const res = await forcePushToFirebase();
    setBusy(false);
    if (res.ok) {
      setMsg(`Poslano ${res.count} projekata u Firebase.`);
      void refresh();
    } else {
      setMsg(`Greška: ${res.error}`);
    }
    window.setTimeout(() => setMsg(null), 8000);
  };

  const label: Record<string, { text: string; cls: string }> = {
    live: { text: "Povezano sa Firebase", cls: "text-teal-300" },
    connecting: { text: "Povezivanje…", cls: "text-white/60" },
    offline: { text: "Samo lokalno (bez baze)", cls: "text-white/40" },
    error: { text: "Greška u vezi sa bazom", cls: "text-red-300" },
    idle: { text: "Čeka…", cls: "text-white/40" },
  };
  const st = label[state] ?? label.idle;

  return (
    <div className="border border-white/10 bg-white/[0.02] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`h-2 w-2 rounded-full ${
              state === "live" ? "bg-teal-400" : state === "error" ? "bg-red-400" : "bg-white/30"
            }`}
            aria-hidden="true"
          />
          <div>
            <p className={`text-xs font-bold ${st.cls}`}>{st.text}</p>
            <p className="mt-0.5 text-[0.68rem] text-white/35">
              {remoteCount === null
                ? "Baza nedostupna"
                : `${remoteCount} ${remoteCount === 1 ? "projekt" : "projekata"} u bazi`}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onPush}
          disabled={busy}
          className="inline-flex items-center gap-2 border border-teal-400/40 bg-teal-500/10 px-4 py-2 text-xs font-bold text-teal-200 transition hover:bg-teal-500/20 disabled:opacity-50"
        >
          <HiOutlineArrowUpTray className="text-sm" aria-hidden="true" />
          {busy ? "Šaljem…" : "Pošalji lokalne u Firebase"}
        </button>
      </div>
      {msg && <p className="mt-2 text-xs text-teal-200">{msg}</p>}
    </div>
  );
}
