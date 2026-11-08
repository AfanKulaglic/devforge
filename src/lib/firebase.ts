// ───────────────────────────────────────────────────────────────────────────
// Firebase inicijalizacija (Realtime Database).
//
// Kljuc i URL su javni po dizajnu (tako Firebase radi) — sigurnost se postize
// pravilima u Firebase konzoli, ne skrivanjem kljuca. Vidi `database.rules.json`.
// ───────────────────────────────────────────────────────────────────────────

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyDJ8ILM8oQBLo5HMB3yMo0NYfWNAsCu7Dc",
  authDomain: "my-game-702f4.firebaseapp.com",
  databaseURL: "https://my-game-702f4-default-rtdb.firebaseio.com",
  projectId: "my-game-702f4",
  storageBucket: "my-game-702f4.firebasestorage.app",
  messagingSenderId: "99818120649",
  appId: "1:99818120649:web:3979ded952229faa5bf418",
};

let app: FirebaseApp | null = null;
let db: Database | null = null;

/** Vrati (ili inicijalizuj) Firebase app — sigurno za vise poziva. */
export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  }
  return app;
}

/** Vrati Realtime Database instancu. */
export function getDb(): Database {
  if (!db) db = getDatabase(getFirebaseApp());
  return db;
}

/** Da li je Firebase konfigurisan (uvijek jest dok su kljucevi gore). */
export const firebaseReady = Boolean(firebaseConfig.databaseURL);
