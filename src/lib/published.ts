// ───────────────────────────────────────────────────────────────────────────
// Objavljeno — koje su Instagram/Facebook objave vec pustene.
//
// Problem: /objave ima 60+ objava i ne moze se zapamtiti koja je objavljena
// a koja nije. Prstom se gubi red.
//
// Rjesenje: svaka objava ima kvacicu. Stanje se cuva u Firebase-u (ne u
// localStorage-u) da bi se vidjelo SA SVAKOG uredjaja — isto kao poruke.
// Format: devforge/published/<postId> = { at: <ms>, by: <string> }
// ───────────────────────────────────────────────────────────────────────────

import { onValue, ref, remove, set } from "firebase/database";
import { getDb, firebaseReady } from "./firebase";

const PATH = "devforge/published";

export type PublishedMap = Record<string, number>; // postId -> timestamp

/** Ucitaj sve objavljene objave (jednokratno). */
export async function loadPublished(): Promise<PublishedMap> {
  if (!firebaseReady) return {};
  try {
    const { get } = await import("firebase/database");
    const snap = await get(ref(getDb(), PATH));
    const raw = snap.val() as Record<string, { at?: number }> | null;
    if (!raw) return {};
    const out: PublishedMap = {};
    Object.entries(raw).forEach(([id, v]) => {
      if (v && typeof v.at === "number") out[id] = v.at;
    });
    return out;
  } catch {
    return {};
  }
}

/** Pretplati se na promjene (realtime, s vise uredjaja). */
export function subscribePublished(cb: (m: PublishedMap) => void): () => void {
  if (!firebaseReady) {
    cb({});
    return () => {};
  }
  try {
    return onValue(ref(getDb(), PATH), (snap) => {
      const raw = snap.val() as Record<string, { at?: number }> | null;
      const out: PublishedMap = {};
      if (raw) {
        Object.entries(raw).forEach(([id, v]) => {
          if (v && typeof v.at === "number") out[id] = v.at;
        });
      }
      cb(out);
    });
  } catch {
    cb({});
    return () => {};
  }
}

/** Ozvaci ili skini kvačicu. */
export async function setPublished(postId: string, published: boolean): Promise<boolean> {
  if (!firebaseReady) return false;
  try {
    const r = ref(getDb(), `${PATH}/${postId}`);
    if (published) await set(r, { at: Date.now() });
    else await remove(r);
    return true;
  } catch {
    return false;
  }
}
