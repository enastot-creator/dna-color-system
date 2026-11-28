// Local tests for the Worker: in-memory KV + intercepted Claude API call (no real key or network)
import fs from 'fs';
fs.copyFileSync(new URL('../../online/server/src/index.js', import.meta.url), new URL('./worker.mjs', import.meta.url));
const { default: worker } = await import('./worker.mjs');
class KV { m = new Map(); async get(k, t) { const v = this.m.get(k); return v == null ? null : t === 'json' ? JSON.parse(v) : v; } async put(k, v) { this.m.set(k, v); } async delete(k) { this.m.delete(k); } }
const env = { DNA: new KV(), ADMIN_KEY: 'admin-secret-123', ANTHROPIC_API_KEY: 'sk-test', ALLOWED_ORIGINS: 'https://example.com', LENS_DAILY_LIMIT: '2' };
let sent = null;
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, init) => {
  if (String(url).includes('api.anthropic.com')) {
    sent = { url: String(url), headers: Object.fromEntries(new Headers(init.headers)), body: JSON.parse(init.body) };
    return new Response(JSON.stringify({ id: 'msg_1', type: 'message', role: 'assistant', model: 'claude-opus-5-5', stop_reason: 'end_turn', stop_sequence: null, usage: { input_tokens: 10, output_tokens: 10 },
      content: [{ type: 'text', text: JSON.stringify({ garment_type: 'dress', neckline: 'v', sleeve_type: 'setin', sleeve_length: 'three_quarter', length: 'midi', silhouette: 'wrapD', fabric: 'fCrepe', print: 'solid', color_ar: 'كحلي', description_ar: 'فستان ملتف' }) }] }), { status: 200, headers: { 'content-type': 'application/json' } });
  }
  return realFetch(url, init);
};
let pass = 0, fail = 0; const ok = (c, m) => { c ? pass++ : fail++; console.log((c ? '✓ ' : '✗ ') + m); };
const call = (method, path, body, headers = {}) => worker.fetch(new Request('https://w.dev' + path, { method, headers: { origin: 'https://example.com', 'content-type': 'application/json', ...headers }, body: body ? JSON.stringify(body) : undefined }), env);
const A = { 'x-admin-key': 'admin-secret-123' };

let r = await call('POST', '/api/records', { id: 'TEST01', status: 'approved', client: { name: 'ريم' }, M: { bust: 94 }, review: { shape: 'X' } });
const j = await r.json(); ok(r.status === 200 && j.token, 'client creates record and gets token');
let rec = JSON.parse(env.DNA.m.get('rec:TEST01'));
ok(rec.status === 'draft' && !rec.review, 'client cannot self-approve or inject a review');
r = await call('POST', '/api/records', { id: 'TEST01', token: 'wrong', status: 'submitted' }); ok(r.status === 403, 'wrong token cannot overwrite');
r = await call('GET', '/api/records/TEST01?t=wrong'); ok(r.status === 404, 'wrong token cannot read');
r = await call('POST', '/api/records', { id: 'TEST01', token: j.token, status: 'submitted', client: { name: 'ريم' }, M: { bust: 94 } }); ok(r.status === 200, 'client submits with token');
r = await call('GET', '/api/admin/records'); ok(r.status === 401, 'admin list requires key');
r = await call('GET', '/api/admin/records', null, { 'x-admin-key': 'nope' }); ok(r.status === 401, 'wrong admin key rejected');
r = await call('GET', '/api/admin/records', null, A); let list = (await r.json()).records; ok(list.length === 1 && list[0].status === 'submitted', 'admin sees submitted file in inbox');
r = await call('POST', '/api/lens', { id: 'TEST01', token: j.token, image: 'AAAA', media_type: 'image/jpeg', enums: {} }); ok(r.status === 403, 'lens blocked before approval');
rec = await (await call('GET', '/api/admin/records/TEST01', null, A)).json();
r = await call('PUT', '/api/admin/records/TEST01', { ...rec, status: 'approved', review: { shape: 'X', A: {}, picks: {}, msg: 'hi' }, token: 'hijack' }, A); ok(r.status === 200, 'admin approves');
ok(JSON.parse(env.DNA.m.get('rec:TEST01')).token === j.token, 'admin update keeps the client token');
r = await call('POST', '/api/records', { id: 'TEST01', token: j.token, status: 'draft' }); ok(r.status === 409, 'approved file locked from client edits');
r = await call('GET', '/api/records/TEST01?t=' + j.token); ok((await r.json()).review.msg === 'hi', 'client reads approved file with review');
const enums = { garment_type: ['dress', 'top'], neckline: ['none', 'v'], sleeve_type: ['none', 'setin'], sleeve_length: ['none', 'three_quarter'], length: ['midi'], silhouette: ['none', 'wrapD'], fabric: ['unknown', 'fCrepe'], print: ['solid'], labels: { v: 'V-Neck', wrapD: 'Wrap Dress' } };
r = await call('POST', '/api/lens', { id: 'TEST01', token: j.token, image: 'AAAA', media_type: 'image/gif', enums }); ok(r.status === 400, 'lens rejects unsupported image type');
r = await call('POST', '/api/lens', { id: 'TEST01', token: j.token, image: 'AAAA', media_type: 'image/jpeg', enums: { ...enums, neckline: ['bad id!'] } }); ok(r.status === 400, 'lens rejects malformed enums');
r = await call('POST', '/api/lens', { id: 'TEST01', token: j.token, image: 'AAAA', media_type: 'image/jpeg', enums }); const lj = await r.json();
ok(r.status === 200 && lj.analysis.silhouette === 'wrapD', 'lens returns parsed analysis');
ok(sent && sent.body.model === 'claude-opus-5-5', 'request uses claude-opus-5-5');
ok(sent.body.messages[0].content[0].type === 'image' && sent.body.messages[0].content[0].source.type === 'base64', 'image sent as base64 image block');
ok(sent.body.output_config.format.type === 'json_schema' && sent.body.output_config.format.schema.properties.neckline.enum.includes('v'), 'structured output schema built from library ids');
console.log('  headers:', JSON.stringify(Object.keys(sent.headers)), sent.headers['anthropic-beta'], 'fallbacks:', sent.body.fallbacks); ok(((sent.headers['x-api-key'] || sent.headers['authorization'] || '').includes('sk-test')) && /server-side-fallback/.test(sent.headers['anthropic-beta'] || ''), 'key sent server-side only, refusal fallback enabled');
r = await call('POST', '/api/lens', { id: 'TEST01', token: j.token, image: 'AAAA', media_type: 'image/jpeg', enums }); ok(r.status === 200, 'second lens call ok');
r = await call('POST', '/api/lens', { id: 'TEST01', token: j.token, image: 'AAAA', media_type: 'image/jpeg', enums }); ok(r.status === 429, 'daily lens limit enforced');
r = await call('PUT', '/api/admin/products', { products: [{ id: 'p1', name: 'x', cat: 'skirt', item: 'aline', url: 'https://e.com' }] }, A); ok(r.status === 200, 'admin saves products');
r = await call('GET', '/api/products'); ok((await r.json()).products.length === 1, 'products public');
r = await call('OPTIONS', '/api/records'); ok(r.headers.get('access-control-allow-origin') === 'https://example.com', 'CORS for allowed origin');
r = await call('DELETE', '/api/admin/records/TEST01', null, A); ok(r.status === 200 && !env.DNA.m.get('rec:TEST01'), 'admin deletes file');
console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
