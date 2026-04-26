// Build-time helper: materialize serviceAccountKey.json from the
// FIREBASE_SERVICE_ACCOUNT_BASE64 env var so server.js can require() it.
const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'serviceAccountKey.json');

if (fs.existsSync(target)) {
  console.log('[write-service-account] serviceAccountKey.json already present — leaving as-is.');
  process.exit(0);
}

const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
if (!b64) {
  console.warn('[write-service-account] FIREBASE_SERVICE_ACCOUNT_BASE64 env var is empty.');
  process.exit(0);
}

try {
  const raw = Buffer.from(b64, 'base64').toString('utf8');
  JSON.parse(raw); // validate
  fs.writeFileSync(target, raw, { encoding: 'utf8' });
  console.log('[write-service-account] Wrote serviceAccountKey.json from Base64.');
} catch (e) {
  console.error('[write-service-account] Failed to parse and write service account:', e.message);
  process.exit(1);
}
