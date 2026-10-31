// Ort im Repository: .github/scripts/update-google-rating.mjs
//
// Holt Durchschnitt und Anzahl der Google-Bewertungen (Places API New) und aktualisiert
// in allen .html-Dateien des Repositorys:
//   1. den Text in Elementen mit class="g-rating" (z.B. 5.0) und class="g-count" (z.B. 21)
//   2. "ratingValue" und "ratingCount" im Sterne-Code (JSON-LD) für die Google-Suche
// Bei einem Fehler wird nichts geändert – die Website behält die letzten Zahlen.

import fs from 'node:fs';
import path from 'node:path';

const API_KEY = (process.env.GOOGLE_API_KEY || '').trim();
const PLACE_ID = (process.env.GOOGLE_PLACE_ID || '').trim();
if (!API_KEY || !PLACE_ID) {
  console.error('GOOGLE_API_KEY oder GOOGLE_PLACE_ID fehlt (Settings → Secrets and variables → Actions).');
  process.exit(1);
}

const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}`, {
  headers: {
    'X-Goog-Api-Key': API_KEY,
    'X-Goog-FieldMask': 'rating,userRatingCount',
  },
});
if (!res.ok) {
  console.error('Fehler von Google:', res.status, await res.text());
  process.exit(1);
}
const data = await res.json();
const { rating, userRatingCount } = data;

// Plausibilitätsprüfung: lieber nichts ändern als falsche Zahlen veröffentlichen
if (typeof rating !== 'number' || typeof userRatingCount !== 'number' ||
    rating < 1 || rating > 5 || userRatingCount < 1) {
  console.error('Unerwartete Antwort, nichts geändert:', JSON.stringify(data));
  process.exit(1);
}

const ratingText = rating.toFixed(1);          // "5.0"
const countText = String(userRatingCount);     // "21"
console.log(`Google: ${ratingText} ★ (${countText} Bewertungen)`);

// 1. Sichtbarer Text: <span class="g-rating">5.0</span>
const replaceClass = (html, cls, value) =>
  html.replace(
    new RegExp(`(<[^>]*\\bclass="[^"]*\\b${cls}\\b[^"]*"[^>]*>)[^<]*(<)`, 'g'),
    `$1${value}$2`
  );

// 2. Sterne-Code (JSON-LD) – nur innerhalb von <script type="application/ld+json">
const replaceSchema = (html) =>
  html.replace(
    /(<script[^>]*type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/g,
    (all, open, json, close) => {
      const updated = json
        .replace(/("ratingValue"\s*:\s*)"?[\d.]+"?/g, `$1${ratingText}`)
        .replace(/("ratingCount"\s*:\s*)"?\d+"?/g, `$1${countText}`)
        .replace(/("reviewCount"\s*:\s*)"?\d+"?/g, `$1${countText}`);
      return open + updated + close;
    }
  );

function* htmlFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.name.endsWith('.html')) yield full;
  }
}

let changed = 0;
for (const file of htmlFiles('.')) {
  const before = fs.readFileSync(file, 'utf8');
  let after = replaceClass(before, 'g-rating', ratingText);
  after = replaceClass(after, 'g-count', countText);
  after = replaceSchema(after);
  if (after !== before) {
    fs.writeFileSync(file, after);
    console.log('Aktualisiert:', file);
    changed++;
  }
}
console.log(changed ? `${changed} Datei(en) aktualisiert.` : 'Alles schon aktuell.');
