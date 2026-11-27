// DNA Online — Cloudflare Worker: client records, consultant review, store products, and the «Lens» (Claude vision).
// Secrets (never in code): ANTHROPIC_API_KEY, ADMIN_KEY  → `npx wrangler secret put ANTHROPIC_API_KEY`
// Vars (wrangler.toml): ALLOWED_ORIGINS, LENS_DAILY_LIMIT
import Anthropic from "@anthropic-ai/sdk";

const ID_RE = /^[\w-]{3,40}$/;
const MAX_RECORD = 96 * 1024;
const MAX_IMAGE_B64 = 6 * 1024 * 1024;

function cors(req, env) {
  const origin = req.headers.get("origin") || "";
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
  const ok = allowed.length === 0 || allowed.includes(origin);
  return {
    "access-control-allow-origin": ok ? origin || "*" : allowed[0],
    "access-control-allow-methods": "GET,POST,PUT,DELETE,OPTIONS",
    "access-control-allow-headers": "content-type,x-admin-key",
    "vary": "origin",
  };
}
const json = (data, status, h) => new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", ...h } });

function sameSecret(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}
const isAdmin = (req, env) => sameSecret(req.headers.get("x-admin-key") || "", env.ADMIN_KEY || "");

async function getIndex(env) { return (await env.DNA.get("index", "json")) || {}; }
async function putIndex(env, rec) {
  const idx = await getIndex(env);
  if (rec === null) return;
  idx[rec.id] = { id: rec.id, name: rec.client?.name || "", status: rec.status, updatedAt: rec.updatedAt, shape: rec.review?.shape || rec.shape || null };
  await env.DNA.put("index", JSON.stringify(idx));
}

export default {
  async fetch(req, env) {
    const h = cors(req, env);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    const url = new URL(req.url), p = url.pathname;
    try {
      // ── client: create / update own record ──
      if (p === "/api/records" && req.method === "POST") {
        const body = await req.text();
        if (body.length > MAX_RECORD) return json({ error: "too large" }, 413, h);
        const rec = JSON.parse(body);
        if (!ID_RE.test(rec.id || "")) return json({ error: "bad id" }, 400, h);
        const old = await env.DNA.get("rec:" + rec.id, "json");
        if (old && !sameSecret(rec.token || "", old.token)) return json({ error: "forbidden" }, 403, h);
        if (old && old.status === "approved") return json({ error: "locked" }, 409, h);
        const status = rec.status === "submitted" ? "submitted" : "draft"; // clients can never approve
        const clean = { ...rec, status, review: old?.review, token: old?.token || crypto.randomUUID(), updatedAt: Date.now() };
        await env.DNA.put("rec:" + rec.id, JSON.stringify(clean));
        await putIndex(env, clean);
        return json({ id: clean.id, token: clean.token }, 200, h);
      }
      let m;
      if ((m = p.match(/^\/api\/records\/([\w-]+)$/)) && req.method === "GET") {
        const rec = await env.DNA.get("rec:" + m[1], "json");
        if (!rec || !sameSecret(url.searchParams.get("t") || "", rec.token)) return json({ error: "not found" }, 404, h);
        return json(rec, 200, h);
      }
      if (p === "/api/products" && req.method === "GET") return json({ products: (await env.DNA.get("products", "json")) || [] }, 200, h);

      // ── the Lens ──
      if (p === "/api/lens" && req.method === "POST") return await lens(req, env, h);

      // ── consultant (admin) ──
      if (p.startsWith("/api/admin/")) {
        if (!isAdmin(req, env)) return json({ error: "unauthorized" }, 401, h);
        if (p === "/api/admin/records" && req.method === "GET") return json({ records: Object.values(await getIndex(env)) }, 200, h);
        if ((m = p.match(/^\/api\/admin\/records\/([\w-]+)$/))) {
          const key = "rec:" + m[1];
          if (req.method === "GET") { const r = await env.DNA.get(key, "json"); return r ? json(r, 200, h) : json({ error: "not found" }, 404, h); }
          if (req.method === "PUT") {
            const old = await env.DNA.get(key, "json"); if (!old) return json({ error: "not found" }, 404, h);
            const rec = await req.json();
            const next = { ...rec, id: old.id, token: old.token, updatedAt: Date.now() };
            await env.DNA.put(key, JSON.stringify(next)); await putIndex(env, next);
            return json({ ok: true }, 200, h);
          }
          if (req.method === "DELETE") {
            await env.DNA.delete(key); const idx = await getIndex(env); delete idx[m[1]]; await env.DNA.put("index", JSON.stringify(idx));
            return json({ ok: true }, 200, h);
          }
        }
        if (p === "/api/admin/products" && req.method === "PUT") {
          const { products } = await req.json();
          if (!Array.isArray(products) || products.length > 2000) return json({ error: "bad products" }, 400, h);
          await env.DNA.put("products", JSON.stringify(products));
          return json({ ok: true }, 200, h);
        }
      }
      return json({ error: "not found" }, 404, h);
    } catch (e) {
      return json({ error: "server error" }, 500, h);
    }
  },
};

/* ── Lens: classify one garment photo with Claude into the library's ids ── */
const strList = (a, max = 400) => Array.isArray(a) && a.length > 0 && a.length <= max && a.every((s) => typeof s === "string" && /^[\w-]{1,40}$/.test(s));
async function lens(req, env, h) {
  const body = await req.json();
  const { id, token, image, media_type, enums } = body;
  if (!ID_RE.test(id || "")) return json({ error: "bad id" }, 400, h);
  const rec = await env.DNA.get("rec:" + id, "json");
  if (!rec || !sameSecret(token || "", rec.token)) return json({ error: "forbidden" }, 403, h);
  if (rec.status !== "approved") return json({ error: "file not approved yet" }, 403, h);
  if (!["image/jpeg", "image/png", "image/webp"].includes(media_type) || typeof image !== "string" || image.length > MAX_IMAGE_B64) return json({ error: "bad image" }, 400, h);
  const keys = ["garment_type", "neckline", "sleeve_type", "sleeve_length", "length", "silhouette", "fabric", "print"];
  if (!enums || !keys.every((k) => strList(enums[k]))) return json({ error: "bad enums" }, 400, h);

  // daily limit per client
  const day = new Date().toISOString().slice(0, 10), ck = `lens:${id}:${day}`;
  const used = parseInt((await env.DNA.get(ck)) || "0", 10), limit = parseInt(env.LENS_DAILY_LIMIT || "15", 10);
  if (used >= limit) return json({ error: "daily limit" }, 429, h);
  await env.DNA.put(ck, String(used + 1), { expirationTtl: 60 * 60 * 30 });

  const properties = Object.fromEntries(keys.map((k) => [k, { type: "string", enum: enums[k] }]));
  properties.color_ar = { type: "string" };
  properties.description_ar = { type: "string" };
  const schema = { type: "object", properties, required: [...keys, "color_ar", "description_ar"], additionalProperties: false };
  const labels = enums.labels && typeof enums.labels === "object"
    ? Object.entries(enums.labels).filter(([k, v]) => /^[\w-]{1,40}$/.test(k) && typeof v === "string" && v.length < 60).slice(0, 600).map(([k, v]) => `${k} = ${v}`).join("\n")
    : "";

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  let response;
  try {
    response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 4000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low", format: { type: "json_schema", schema } },
      system:
        "You identify one clothing item in a photo for a body-shape styling app. For every field pick the closest id from its list. " +
        "If a field does not apply to this garment (for example a neckline on trousers) choose 'none' (or 'unknown' for fabric, 'solid' for a plain print). " +
        "'length' is where the hem falls on a person. description_ar is one short sentence in Arabic describing the piece; color_ar is its main colour in Arabic.\n\nId reference (id = English name):\n" + labels,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type, data: image } },
          { type: "text", text: "Classify this garment." },
        ],
      }],
    });
  } catch (e) {
    if (e instanceof Anthropic.RateLimitError) return json({ error: "busy, try again" }, 429, h);
    if (e instanceof Anthropic.APIError) return json({ error: "analysis unavailable" }, 502, h);
    throw e;
  }
  if (response.stop_reason === "refusal") return json({ error: "could not analyse this image" }, 422, h);
  const text = response.content.find((b) => b.type === "text")?.text;
  let analysis;
  try { analysis = JSON.parse(text); } catch { return json({ error: "analysis unavailable" }, 502, h); }
  return json({ analysis, remaining: limit - used - 1 }, 200, h);
}
