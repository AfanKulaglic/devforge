import { useRef, useState } from "react";
import {
  HiOutlineArrowDownTray,
  HiOutlineArrowUpTray,
  HiOutlineCheckCircle,
  HiOutlineClipboardDocument,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import { BackupFile, backupToJson, downloadBackup, parseBackup, restoreBackup } from "./lib/projectsStore";

const btnCls =
  "inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 text-xs font-bold text-white/70 transition hover:border-teal-300 hover:text-white";

export default function BackupTools() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [pending, setPending] = useState<BackupFile | null>(null);

  const flash = (type: "ok" | "err", text: string) => {
    setMsg({ type, text });
    window.setTimeout(() => setMsg(null), 6000);
  };

  const onExport = () => {
    downloadBackup();
    flash("ok", "Backup preuzet. Sačuvaj fajl na sigurno mjesto.");
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(backupToJson());
      flash("ok", "JSON kopiran u clipboard.");
    } catch {
      flash("err", "Clipboard nije dostupan — koristi „Izvezi“.");
    }
  };

  const onFile = async (file: File) => {
    try {
      const text = await file.text();
      const backup = parseBackup(text);
      setPending(backup);
      setMsg(null);
    } catch (e) {
      flash("err", e instanceof Error ? e.message : "Neispravan fajl.");
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const onRestore = (mode: "replace" | "merge") => {
    if (!pending) return;
    const count = pending.projects.length;
    if (mode === "replace") {
      const ok = window.confirm(
        `Zamijeniti SVE projekte sa ${count} iz backupa?\n\nTrenutni projekti bit će obrisani.`,
      );
      if (!ok) return;
    }
    restoreBackup(pending, mode);
    setPending(null);
    flash(
      "ok",
      mode === "replace"
        ? `Uvezeno ${count} projekata (zamijenjeno).`
        : `Uvezeno ${count} projekata (spojeno).`,
    );
  };

  return (
    <div className="border border-white/10 bg-white/[0.02] p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white">
            Sigurnosna kopija
          </p>
          <p className="mt-1 max-w-xl text-xs leading-6 text-white/45">
            Projekti se čuvaju u ovom pregledniku. Izvezi backup prije većih izmjena ili da ih
            prebaciš na drugi uređaj.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={onExport} className={btnCls}>
            <HiOutlineArrowDownTray className="text-sm" aria-hidden="true" />
            Izvezi backup
          </button>
          <button type="button" onClick={onCopy} className={btnCls}>
            <HiOutlineClipboardDocument className="text-sm" aria-hidden="true" />
            Kopiraj JSON
          </button>
          <button type="button" onClick={() => fileRef.current?.click()} className={btnCls}>
            <HiOutlineArrowUpTray className="text-sm" aria-hidden="true" />
            Uvezi backup
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void onFile(f);
            }}
          />
        </div>
      </div>

      {msg && (
        <div
          className={`mt-4 flex items-start gap-2 border px-3 py-2.5 text-xs ${
            msg.type === "ok"
              ? "border-teal-400/30 bg-teal-500/10 text-teal-200"
              : "border-red-400/30 bg-red-500/10 text-red-200"
          }`}
        >
          {msg.type === "ok" ? (
            <HiOutlineCheckCircle className="mt-0.5 shrink-0 text-sm" aria-hidden="true" />
          ) : (
            <HiOutlineExclamationTriangle className="mt-0.5 shrink-0 text-sm" aria-hidden="true" />
          )}
          <span>{msg.text}</span>
        </div>
      )}

      {pending && (
        <div className="mt-4 border border-teal-400/30 bg-teal-500/[0.07] p-4">
          <p className="text-sm font-bold text-white">
            Backup spreman: {pending.projects.length} projekata
          </p>
          <p className="mt-1 text-xs text-white/50">
            Izvezen: {new Date(pending.exportedAt).toLocaleString("bs-BA")}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onRestore("merge")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-[#0891B2] px-4 py-2 text-xs font-extrabold text-white transition hover:brightness-110"
            >
              Spoji sa trenutnim
            </button>
            <button
              type="button"
              onClick={() => onRestore("replace")}
              className="inline-flex items-center gap-2 border border-red-400/40 px-4 py-2 text-xs font-bold text-red-300 transition hover:bg-red-500/10"
            >
              Zamijeni sve
            </button>
            <button
              type="button"
              onClick={() => setPending(null)}
              className="inline-flex items-center gap-2 border border-white/15 px-4 py-2 text-xs font-bold text-white/60 transition hover:border-white/40 hover:text-white"
            >
              Otkaži
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
