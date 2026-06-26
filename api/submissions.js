import { get, head, put, BlobPreconditionFailedError } from '@vercel/blob';

var BLOB_PATH = 'nuha-submissions.json';
var BLOB_ACCESS = process.env.BLOB_ACCESS === 'public' ? 'public' : 'private';
var BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
var MAX_WRITE_RETRIES = 5;

function blobOptions(extra) {
  var opts = { access: BLOB_ACCESS };
  if (BLOB_TOKEN) opts.token = BLOB_TOKEN;
  if (extra) Object.keys(extra).forEach(function (key) { opts[key] = extra[key]; });
  return opts;
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function parseBody(req) {
  if (!req.body) return null;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch (e) {
      return null;
    }
  }
  return req.body;
}

async function readAll() {
  try {
    var result = await get(BLOB_PATH, blobOptions());
    if (!result || result.statusCode !== 200 || !result.stream) return [];
    var text = await new Response(result.stream).text();
    if (!text) return [];
    var data = JSON.parse(text);
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

async function writeAll(items) {
  var lastError = null;

  for (var attempt = 0; attempt < MAX_WRITE_RETRIES; attempt++) {
    try {
      var options = blobOptions({
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
        cacheControlMaxAge: 60
      });

      try {
        var meta = await head(BLOB_PATH, blobOptions());
        if (meta && meta.etag) options.ifMatch = meta.etag;
      } catch (e) {
        // First write — blob does not exist yet.
      }

      await put(BLOB_PATH, JSON.stringify(items), options);
      return;
    } catch (err) {
      lastError = err;
      if (err instanceof BlobPreconditionFailedError) continue;
      throw err;
    }
  }

  throw lastError || new Error('Could not save submissions');
}

async function appendEntry(entry) {
  for (var attempt = 0; attempt < MAX_WRITE_RETRIES; attempt++) {
    var all = await readAll();
    if (all.some(function (item) { return item.id === entry.id; })) return;
    all.unshift(entry);
    try {
      await writeAll(all);
      return;
    } catch (err) {
      if (err instanceof BlobPreconditionFailedError) continue;
      throw err;
    }
  }
  throw new Error('Could not save submission');
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(503).json({
      error: 'Storage not configured',
      code: 'NO_BLOB'
    });
  }

  try {
    if (req.method === 'POST') {
      var entry = parseBody(req);
      if (!entry || !entry.id || !entry.formType) {
        return res.status(400).json({ error: 'Invalid submission' });
      }
      await appendEntry(entry);
      return res.status(201).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: String(err && err.message ? err.message : err) });
  }
}
