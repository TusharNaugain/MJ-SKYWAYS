// Vercel serverless entry — re-exports the Express app from server.js.
// All /api/* routes are rewritten to this single function via vercel.json.
module.exports = require('../server.js');
