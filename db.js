// Opslag van de stemmen in Firebase.
// - Staat er een databaseURL in config.js? Dan wordt de Realtime Database gebruikt.
// - Anders Firestore.
// Beide bewaren per telefoon één stem onder "votes/<voterId>".
// Met ?demo in de URL draait alles lokaal in de browser, handig om te testen.
const C = window.STEM_CONFIG;
const SDK = "https://www.gstatic.com/firebasejs/10.12.2/";

export const demo = new URLSearchParams(location.search).has("demo");
export const geconfigureerd = !!(C.firebase && C.firebase.projectId && C.firebase.projectId !== "VUL_IN");
const gebruiktRTDB = !!(C.firebase && C.firebase.databaseURL && C.firebase.databaseURL !== "VUL_IN");

let api = null, db = null;
async function init() {
  if (db || demo || !geconfigureerd) return;
  const { initializeApp } = await import(SDK + "firebase-app.js");
  const app = initializeApp(C.firebase);
  if (gebruiktRTDB) {
    api = await import(SDK + "firebase-database.js");
    db = api.getDatabase(app);
  } else {
    api = await import(SDK + "firebase-firestore.js");
    db = api.getFirestore(app);
  }
}

function leeg() { const t = {}; C.groepen.forEach(g => (t[g.id] = 0)); return t; }

// ---- demo-opslag (alleen deze browser) ----
const DEMO_KEY = "stemtool-demo-votes";
function demoLees() { try { return JSON.parse(localStorage.getItem(DEMO_KEY) || "[]"); } catch { return []; } }
function demoSchrijf(v) { try { localStorage.setItem(DEMO_KEY, JSON.stringify(v)); } catch {} }

function metTimeout(p) {
  const t = new Promise((_, rej) => setTimeout(() => { const e = new Error("timeout"); e.code = "timeout"; rej(e); }, 12000));
  return Promise.race([p, t]);
}

export async function stem(voterId, group, own) {
  if (demo) {
    const v = demoLees();
    if (v.some(x => x.id === voterId)) { const e = new Error("dubbel"); e.code = "permission-denied"; throw e; }
    v.push({ id: voterId, group, own }); demoSchrijf(v); return;
  }
  await init();
  try {
    if (gebruiktRTDB) {
      await metTimeout(api.set(api.ref(db, "votes/" + voterId), { group, own, ts: api.serverTimestamp() }));
    } else {
      await metTimeout(api.setDoc(api.doc(db, "votes", voterId), { group, own, ts: api.serverTimestamp() }));
    }
  } catch (e) {
    if (String(e.code || e.message).toUpperCase().includes("PERMISSION")) e.code = "permission-denied";
    throw e;
  }
}

// Roept cb(tellingPerGroep, totaal) aan bij elke wijziging.
export async function volg(cb, foutCb) {
  if (demo) {
    const tik = () => { const t = leeg(), v = demoLees(); v.forEach(x => { if (t[x.group] != null) t[x.group]++; }); cb(t, v.length); };
    tik(); setInterval(tik, 1000); return;
  }
  await init();
  if (gebruiktRTDB) {
    api.onValue(api.ref(db, "votes"), snap => {
      const t = leeg(); let n = 0;
      snap.forEach(d => { const g = d.val() && d.val().group; if (t[g] != null) { t[g]++; n++; } });
      cb(t, n);
    }, foutCb);
  } else {
    api.onSnapshot(api.collection(db, "votes"), snap => {
      const t = leeg();
      snap.forEach(d => { const g = d.data().group; if (t[g] != null) t[g]++; });
      cb(t, snap.size);
    }, foutCb);
  }
}

export function demoReset() { demoSchrijf([]); }
