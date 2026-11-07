import { FormEvent, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  HiOutlineArrowDown,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineArrowUp,
  HiOutlineBanknotes,
  HiOutlineCheck,
  HiOutlineChevronRight,
  HiOutlinePencilSquare,
  HiOutlinePlus,
  HiOutlineStar,
  HiOutlineTrash,
  HiOutlineXMark,
} from "react-icons/hi2";
import {
  PricingGroupData,
  PricingPlanData,
  deleteGroup,
  getPricing,
  getServerPricing,
  moveGroup,
  newPricingId,
  resetPricing,
  saveGroup,
  subscribePricing,
} from "./lib/pricingStore";

// ───────────────────────────────────────────────────────────────────────────
// Tab "Cijene" u admin panelu — dodavanje/uređivanje paketa i grupa.
// Isti vizuelni jezik kao tab "Projekti".
// ───────────────────────────────────────────────────────────────────────────

const inputCls =
  "mt-2 w-full border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-teal-300";
const labelCls = "block text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/45";

function usePricingGroups() {
  return useSyncExternalStore(subscribePricing, getPricing, getServerPricing);
}

type PlanDraft = {
  id: string | null;
  title: string;
  price: string;
  tagline: string;
  popular: boolean;
  itemsText: string;
};

const EMPTY_PLAN: PlanDraft = {
  id: null,
  title: "",
  price: "",
  tagline: "",
  popular: false,
  itemsText: "",
};

function planToDraft(p: PricingPlanData): PlanDraft {
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    tagline: p.tagline,
    popular: p.popular,
    itemsText: p.items.join("\n"),
  };
}

function draftToPlan(d: PlanDraft): PricingPlanData {
  return {
    id: d.id ?? newPricingId("plan"),
    title: d.title.trim(),
    price: d.price.trim(),
    tagline: d.tagline.trim(),
    popular: d.popular,
    items: d.itemsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
  };
}

// ── Forma za jedan paket ───────────────────────────────────────────────────
function PlanForm({
  draft,
  onCancel,
  onSave,
}: {
  draft: PlanDraft;
  onCancel: () => void;
  onSave: (plan: PricingPlanData) => void;
}) {
  const [form, setForm] = useState<PlanDraft>(draft);
  const [error, setError] = useState("");

  useEffect(() => setForm(draft), [draft]);

  const set = <K extends keyof PlanDraft>(k: K, v: PlanDraft[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.title.trim()) return setError("Naziv paketa je obavezan.");
    if (!form.price.trim()) return setError("Cijena je obavezna (npr. „300–450 KM“).");
    setError("");
    onSave(draftToPlan(form));
  };

  return (
    <form className="mt-4 border border-teal-400/30 bg-teal-500/[0.04] p-4 md:p-5" onSubmit={submit}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-teal-300">
          {form.id ? "Uredi paket" : "Novi paket"}
        </p>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Zatvori"
          className="border border-white/15 p-1.5 text-white/60 transition hover:border-teal-300 hover:text-teal-300"
        >
          <HiOutlineXMark className="text-sm" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Naziv paketa *</span>
          <input className={inputCls} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="npr. Business" />
        </label>
        <label className="block">
          <span className={labelCls}>Cijena *</span>
          <input className={inputCls} value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="npr. 300–450 KM" />
        </label>
        <label className="block md:col-span-2">
          <span className={labelCls}>Kratki opis (tagline)</span>
          <input className={inputCls} value={form.tagline} onChange={(e) => set("tagline", e.target.value)} placeholder="npr. Najčešći izbor za firme" />
        </label>
        <label className="block md:col-span-2">
          <span className={labelCls}>Šta je uključeno — jedna stavka po redu</span>
          <textarea
            className={inputCls + " min-h-[150px] resize-y font-mono text-[13px] leading-6"}
            value={form.itemsText}
            onChange={(e) => set("itemsText", e.target.value)}
            placeholder={"Do 12 podstranica + blog\nPremium UI/UX dizajn\nAdmin panel (CMS)"}
          />
          <span className="mt-1.5 block text-[0.68rem] text-white/30">
            Svaki novi red = nova stavka sa kvačicom na sajtu.
          </span>
        </label>
      </div>

      <label className="mt-4 flex cursor-pointer items-center gap-2.5">
        <input
          type="checkbox"
          checked={form.popular}
          onChange={(e) => set("popular", e.target.checked)}
          className="h-4 w-4 accent-teal-400"
        />
        <span className="text-xs font-bold text-white/70">
          Označi kao „Najpopularnije" (ističe se teal okvirom na sajtu)
        </span>
      </label>

      {error && (
        <p className="mt-4 border-l-2 border-red-400 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-300">
          {error}
        </p>
      )}

      <div className="mt-5 flex gap-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-[#0891B2] px-5 py-2.5 text-sm font-extrabold text-white transition hover:brightness-110"
        >
          <HiOutlineCheck className="text-base" aria-hidden="true" />
          Sačuvaj paket
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-white/20 px-5 py-2.5 text-sm font-bold text-white/80 transition hover:border-teal-300 hover:text-white"
        >
          Otkaži
        </button>
      </div>
    </form>
  );
}

// ── Kartica grupe ──────────────────────────────────────────────────────────
function GroupCard({
  group,
  index,
  total,
}: {
  group: PricingGroupData;
  index: number;
  total: number;
}) {
  const [open, setOpen] = useState(index === 0);
  const [planDraft, setPlanDraft] = useState<PlanDraft | null>(null);
  const [editMeta, setEditMeta] = useState(false);
  const [heading, setHeading] = useState(group.heading);
  const [subtitle, setSubtitle] = useState(group.subtitle);
  const [note, setNote] = useState(group.note);
  const [confirmPlan, setConfirmPlan] = useState<string | null>(null);
  const [confirmGroup, setConfirmGroup] = useState(false);

  const savePlan = (plan: PricingPlanData) => {
    const exists = group.plans.some((p) => p.id === plan.id);
    const plans = exists ? group.plans.map((p) => (p.id === plan.id ? plan : p)) : [...group.plans, plan];
    saveGroup({ ...group, plans });
    setPlanDraft(null);
  };

  const removePlan = (id: string) => {
    saveGroup({ ...group, plans: group.plans.filter((p) => p.id !== id) });
    setConfirmPlan(null);
  };

  const saveMeta = (event: FormEvent) => {
    event.preventDefault();
    saveGroup({ ...group, heading: heading.trim(), subtitle: subtitle.trim(), note: note.trim() });
    setEditMeta(false);
  };

  return (
    <div className="border border-white/10 bg-white/[0.03]">
      {/* Zaglavlje grupe */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5">
        <button type="button" onClick={() => setOpen((v) => !v)} className="flex flex-1 items-center gap-3 text-left">
          <HiOutlineChevronRight
            className={`shrink-0 text-base text-white/40 transition-transform ${open ? "rotate-90" : ""}`}
            aria-hidden="true"
          />
          <span className="text-[0.62rem] font-black tracking-[0.2em] text-white/25">0{index + 1}</span>
          <div className="min-w-0">
            <p className="truncate text-base font-extrabold text-white">{group.heading || "(bez naziva)"}</p>
            <p className="text-[0.68rem] text-white/35">
              {group.plans.length} {group.plans.length === 1 ? "paket" : "paketa"}
            </p>
          </div>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => moveGroup(group.id, -1)}
            disabled={index === 0}
            aria-label="Pomjeri gore"
            className="border border-white/15 p-1.5 text-white/60 transition hover:border-teal-300 hover:text-teal-300 disabled:opacity-20 disabled:hover:border-white/15 disabled:hover:text-white/60"
          >
            <HiOutlineArrowUp className="text-sm" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => moveGroup(group.id, 1)}
            disabled={index === total - 1}
            aria-label="Pomjeri dolje"
            className="border border-white/15 p-1.5 text-white/60 transition hover:border-teal-300 hover:text-teal-300 disabled:opacity-20 disabled:hover:border-white/15 disabled:hover:text-white/60"
          >
            <HiOutlineArrowDown className="text-sm" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setEditMeta((v) => !v)}
            className="border border-white/15 px-2.5 py-1.5 text-[0.68rem] font-bold text-white/70 transition hover:border-teal-300 hover:text-white"
          >
            Naslov / napomena
          </button>
          {confirmGroup ? (
            <>
              <button
                type="button"
                onClick={() => deleteGroup(group.id)}
                className="bg-red-500/90 px-2.5 py-1.5 text-[0.68rem] font-bold text-white transition hover:bg-red-500"
              >
                Potvrdi
              </button>
              <button
                type="button"
                onClick={() => setConfirmGroup(false)}
                className="border border-white/15 px-2.5 py-1.5 text-[0.68rem] font-bold text-white/70"
              >
                Ne
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmGroup(true)}
              aria-label="Obriši grupu"
              className="border border-white/15 px-2 py-1.5 text-white/60 transition hover:border-red-400 hover:text-red-300"
            >
              <HiOutlineTrash className="text-sm" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {open && (
        <div className="px-4 pb-5 pt-4">
          {/* Uređivanje naslova / podnaslova / napomene grupe */}
          {editMeta && (
            <form className="mb-5 border border-teal-400/30 bg-teal-500/[0.04] p-4" onSubmit={saveMeta}>
              <label className="block">
                <span className={labelCls}>Naziv grupe</span>
                <input className={inputCls} value={heading} onChange={(e) => setHeading(e.target.value)} />
              </label>
              <label className="mt-4 block">
                <span className={labelCls}>Podnaslov grupe (prikazuje se ispod naslova)</span>
                <textarea className={inputCls + " min-h-[70px] resize-y"} value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
              </label>
              <label className="mt-4 block">
                <span className={labelCls}>Napomena / sitna slova (ispod paketa)</span>
                <textarea className={inputCls + " min-h-[110px] resize-y"} value={note} onChange={(e) => setNote(e.target.value)} />
              </label>
              <div className="mt-4 flex gap-2">
                <button type="submit" className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-[#0891B2] px-4 py-2 text-xs font-extrabold text-white">
                  <HiOutlineCheck className="text-sm" aria-hidden="true" />
                  Sačuvaj
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHeading(group.heading);
                    setSubtitle(group.subtitle);
                    setNote(group.note);
                    setEditMeta(false);
                  }}
                  className="border border-white/20 px-4 py-2 text-xs font-bold text-white/80"
                >
                  Otkaži
                </button>
              </div>
            </form>
          )}

          {/* Paketi */}
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {group.plans.map((plan) => (
              <div key={plan.id} className="flex flex-col border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="truncate text-sm font-extrabold text-white">{plan.title}</h4>
                      {plan.popular && (
                        <HiOutlineStar className="shrink-0 text-xs text-teal-300" aria-label="Najpopularnije" />
                      )}
                    </div>
                    <p className="mt-1 text-lg font-black tracking-tight text-teal-300">{plan.price}</p>
                  </div>
                </div>
                {plan.tagline && <p className="mt-1.5 text-[0.7rem] leading-5 text-white/40">{plan.tagline}</p>}
                <p className="mt-2 text-[0.66rem] text-white/25">{plan.items.length} stavki uključeno</p>

                <div className="mt-auto flex items-center gap-1.5 pt-3">
                  <button
                    type="button"
                    onClick={() => setPlanDraft(planToDraft(plan))}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 border border-white/15 px-2.5 py-1.5 text-[0.68rem] font-bold text-white/80 transition hover:border-teal-300 hover:text-white"
                  >
                    <HiOutlinePencilSquare className="text-sm" aria-hidden="true" />
                    Uredi
                  </button>
                  {confirmPlan === plan.id ? (
                    <>
                      <button
                        type="button"
                        onClick={() => removePlan(plan.id)}
                        className="bg-red-500/90 px-2.5 py-1.5 text-[0.68rem] font-bold text-white"
                      >
                        Potvrdi
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmPlan(null)}
                        className="border border-white/15 px-2 py-1.5 text-[0.68rem] font-bold text-white/70"
                      >
                        Ne
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmPlan(plan.id)}
                      aria-label={`Obriši ${plan.title}`}
                      className="border border-white/15 px-2 py-1.5 text-white/60 transition hover:border-red-400 hover:text-red-300"
                    >
                      <HiOutlineTrash className="text-sm" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Dodaj paket */}
            <button
              type="button"
              onClick={() => setPlanDraft(EMPTY_PLAN)}
              className="flex min-h-[120px] flex-col items-center justify-center gap-2 border border-dashed border-white/15 bg-white/[0.01] p-4 text-xs font-bold text-white/40 transition hover:border-teal-300/60 hover:text-teal-300"
            >
              <HiOutlinePlus className="text-xl" aria-hidden="true" />
              Dodaj paket
            </button>
          </div>

          {planDraft && (
            <PlanForm draft={planDraft} onCancel={() => setPlanDraft(null)} onSave={savePlan} />
          )}
        </div>
      )}
    </div>
  );
}

// ── Glavni tab ─────────────────────────────────────────────────────────────
export default function PricingTab() {
  const groups = usePricingGroups();
  const [confirmReset, setConfirmReset] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  const totalPlans = useMemo(() => groups.reduce((n, g) => n + g.plans.length, 0), [groups]);

  const addGroup = (event: FormEvent) => {
    event.preventDefault();
    const name = newGroupName.trim();
    if (!name) return;
    saveGroup({
      id: newPricingId("grp"),
      heading: name,
      subtitle: "",
      note: "",
      plans: [],
    });
    setNewGroupName("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-white">Cijene paketa</h2>
          <p className="mt-1 text-sm text-white/45">
            {groups.length} {groups.length === 1 ? "grupa" : "grupe"} · {totalPlans}{" "}
            {totalPlans === 1 ? "paket" : "paketa"} ukupno
          </p>
        </div>
        <a
          href="/cijene"
          className="inline-flex items-center gap-1.5 border border-white/15 px-3.5 py-2 text-xs font-bold text-white/70 transition hover:border-teal-300 hover:text-white"
        >
          <HiOutlineArrowTopRightOnSquare className="text-sm" aria-hidden="true" />
          Pogledaj na sajtu
        </a>
      </div>

      <div className="border border-teal-400/20 bg-teal-500/[0.05] px-4 py-3">
        <p className="text-[0.72rem] leading-5 text-teal-100/80">
          <HiOutlineBanknotes className="mr-1.5 inline text-sm text-teal-300" aria-hidden="true" />
          Promjene se odmah vide na <strong>/cijene</strong> i na stranicama usluga. Cijena na naslovnici
          („Web već od …“) se <strong>ne</strong> mijenja odavde — ona je fiksni tekst.
        </p>
      </div>

      {groups.length === 0 && (
        <div className="border border-dashed border-white/15 bg-white/[0.02] px-6 py-14 text-center">
          <HiOutlineBanknotes className="mx-auto text-3xl text-white/20" aria-hidden="true" />
          <p className="mt-4 text-sm font-semibold text-white/60">Nema grupa cijena</p>
          <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-white/35">
            Dodaj grupu ispod (npr. „Web stranice") pa unutar nje pakete.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {groups.map((group, index) => (
          <GroupCard key={group.id} group={group} index={index} total={groups.length} />
        ))}
      </div>

      {/* Dodaj novu grupu */}
      <form className="flex flex-wrap items-end gap-2 border border-white/10 bg-white/[0.02] p-4" onSubmit={addGroup}>
        <label className="min-w-[220px] flex-1">
          <span className={labelCls}>Nova grupa (npr. „Održavanje", „Logo dizajn")</span>
          <input
            className={inputCls}
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Naziv grupe…"
          />
        </label>
        <button
          type="submit"
          disabled={!newGroupName.trim()}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-[#0891B2] px-5 py-3 text-sm font-extrabold text-white transition hover:brightness-110 disabled:opacity-30"
        >
          <HiOutlinePlus className="text-base" aria-hidden="true" />
          Dodaj grupu
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
        <p className="text-[0.68rem] leading-5 text-white/25">
          Cijene se čuvaju lokalno u ovom pregledniku (localStorage).
        </p>
        {confirmReset ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                resetPricing();
                setConfirmReset(false);
              }}
              className="bg-red-500/90 px-3 py-1.5 text-[0.68rem] font-bold text-white transition hover:bg-red-500"
            >
              Potvrdi reset
            </button>
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="border border-white/15 px-3 py-1.5 text-[0.68rem] font-bold text-white/70"
            >
              Ne
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="text-[0.68rem] font-bold text-white/30 transition hover:text-red-300"
          >
            Resetuj sve na početno
          </button>
        )}
      </div>
    </div>
  );
}
