// ============================================================
//  Instellingen van de stemtool
//  Plak hieronder het firebaseConfig-blok uit de Firebase-console.
// ============================================================
window.STEM_CONFIG = {
  firebase: {
    apiKey: "AIzaSyB-_7BnR107K_DZ1UDK2dqkpP2hKUKZx4s",
    authDomain: "blijdorp-stemmen.firebaseapp.com",
    projectId: "blijdorp-stemmen",
    storageBucket: "blijdorp-stemmen.firebasestorage.app",
    messagingSenderId: "269411042780",
    appId: "1:269411042780:web:83f01e41cbecf3ac4f3b19",
    databaseURL: "https://blijdorp-stemmen-default-rtdb.europe-west1.firebasedatabase.app"   // alleen nodig bij Realtime Database
  },

  // true = stemmers kiezen eerst hun eigen groep en kunnen daar niet op stemmen
  vraagEigenGroep: true,

  titel: "Stem op de beste presentatie",
  subtitel: "Casus Diergaarde Blijdorp",

  groepen: [
    { id: 1, groep: "Groep 1", dier: "Rode panda",            kleur: "#DF5200", weetje: "Gebruikt zijn pluizige staart als deken." },
    { id: 2, groep: "Groep 2", dier: "Rüppells gier",         kleur: "#004877", weetje: "Een van de hoogst vliegende vogels ter wereld." },
    { id: 3, groep: "Groep 3", dier: "Dwergnijlpaard",        kleur: "#0B8443", weetje: "Leeft verstopt in de regenwouden van West-Afrika." },
    { id: 4, groep: "Groep 4", dier: "Antilliaanse leguaan",  kleur: "#33AF6D", weetje: "Komt alleen voor op een paar Caribische eilanden." },
    { id: 5, groep: "Groep 5", dier: "Zee-engel",             kleur: "#0072BD", weetje: "Een haai die plat als een rog op de bodem ligt." },
    { id: 6, groep: "Groep 6", dier: "Dalmatische pelikaan",  kleur: "#B07A1E", weetje: "Een van de grootste vliegende vogels ter wereld." }
  ]
};
