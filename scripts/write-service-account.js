// Build-time helper: materialize serviceAccountKey.json from the
// FIREBASE_SERVICE_ACCOUNT env var so server.js can require() it as before.
// Skips silently when the env var isn't set (e.g. local dev where the file
// already exists on disk).
const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'serviceAccountKey.json');

if (fs.existsSync(target)) {
  console.log('[write-service-account] serviceAccountKey.json already present — leaving as-is.');
  process.exit(0);
}

const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!raw) {
  console.warn('[write-service-account] FIREBASE_SERVICE_ACCOUNT env var is empty — Firebase Admin will fail to initialise.');
  process.exit(0);
}

try {
  // Validate it parses as JSON before writing.
  JSON.parse(raw);
  fs.writeFileSync(target, raw, { encoding: 'utf8' });
  console.log('[write-service-account] Wrote serviceAccountKey.json from FIREBASE_SERVICE_ACCOUNT.');
} catch (e) {
  console.error('[write-service-account] FIREBASE_SERVICE_ACCOUNT is not valid JSON:', e.message);
  process.exit(1);
}
