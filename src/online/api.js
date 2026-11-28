/* ═════════════ DNA ONLINE — data layer (server API or local demo) ═════════════ */
// Set this to your server address after deploying server/worker.js, e.g. "https://api.yourdomain.com".
// Left empty, both pages run in DEMO mode: data lives in this browser only (client + studio in the same browser).
const DNA_API = window.DNA_API_BASE || '';
const DEMO = !DNA_API;
const MOCK_KEY = 'dnaOnline.mock';
const mockDB = () => { try { return JSON.parse(localStorage.getItem(MOCK_KEY)) || { records: {}, products: [] }; } catch (e) { return { records: {}, products: [] }; } };
const mockSave = db => { try { localStorage.setItem(MOCK_KEY, JSON.stringify(db)); } catch (e) { } };
const rid = () => Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);

async function http(path, opt = {}) {
  const r = await fetch(DNA_API + path, { ...opt, headers: { 'content-type': 'application/json', ...(opt.headers || {}) } });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || ('HTTP ' + r.status));
  return j;
}
const API = {
  /* client side */
  async saveRecord(rec) {
    if (DEMO) { const db = mockDB(); rec.token = rec.token || rid(); db.records[rec.id] = { ...(db.records[rec.id] || {}), ...rec, updatedAt: Date.now() }; mockSave(db); return { id: rec.id, token: rec.token }; }
    return http('/api/records', { method: 'POST', body: JSON.stringify(rec) });
  },
  async getRecord(id, token) {
    if (DEMO) { const r = mockDB().records[id]; if (!r || r.token !== token) throw new Error('not found'); return r; }
    return http(`/api/records/${encodeURIComponent(id)}?t=${encodeURIComponent(token)}`);
  },
  async products() { return DEMO ? mockDB().products : (await http('/api/products')).products; },
  async lens(payload) {
    if (DEMO) throw new Error('demo');
    return http('/api/lens', { method: 'POST', body: JSON.stringify(payload) });
  },
  /* studio (admin) side */
  adminKey: () => { try { return localStorage.getItem('dnaOnline.adminKey') || ''; } catch (e) { return ''; } },
  async list() {
    if (DEMO) return Object.values(mockDB().records).map(r => ({ id: r.id, name: r.client?.name, status: r.status, updatedAt: r.updatedAt, shape: r.shape }));
    return (await http('/api/admin/records', { headers: { 'x-admin-key': API.adminKey() } })).records;
  },
  async adminGet(id) { return DEMO ? mockDB().records[id] : http('/api/admin/records/' + encodeURIComponent(id), { headers: { 'x-admin-key': API.adminKey() } }); },
  async adminPut(rec) {
    if (DEMO) { const db = mockDB(); db.records[rec.id] = { ...rec, updatedAt: Date.now() }; mockSave(db); return { ok: true }; }
    return http('/api/admin/records/' + encodeURIComponent(rec.id), { method: 'PUT', headers: { 'x-admin-key': API.adminKey() }, body: JSON.stringify(rec) });
  },
  async adminDelete(id) {
    if (DEMO) { const db = mockDB(); delete db.records[id]; mockSave(db); return { ok: true }; }
    return http('/api/admin/records/' + encodeURIComponent(id), { method: 'DELETE', headers: { 'x-admin-key': API.adminKey() } });
  },
  async putProducts(list) {
    if (DEMO) { const db = mockDB(); db.products = list; mockSave(db); return { ok: true }; }
    return http('/api/admin/products', { method: 'PUT', headers: { 'x-admin-key': API.adminKey() }, body: JSON.stringify({ products: list }) });
  }
};

/* shared: compute the client's final profile (system analysis + consultant review overrides) */
function effective(rec) {
  const shape = rec.review?.shape || rec.shape;
  const A = { ...(rec.A || {}), ...(rec.review?.A || {}) };
  return { shape, A, picks: rec.review?.picks || {} };
}
function tagsFor(eff) {
  const T = new Set(); if (eff.shape) T.add(eff.shape);
  ANA.forEach(g => { const v = eff.A[g.k]; if (v != null && g.o[v] && g.o[v][1]) T.add(g.o[v][1]); });
  return T;
}
/* status for one library item for this client: consultant override wins, else rules */
function verdict(cat, it, T, eff) {
  const p = eff.picks[cat + ':' + it.id], sc = score(it, T);
  return { st: p === 'y' ? 'rec' : p === 'n' ? 'avoid' : sc.st, manual: !!p, why: sc.why, warn: sc.warn };
}
const CAT_LABEL = { bra: 'حمالات الصدر', panty: 'الملابس الداخلية', shapewear: 'المشدات', neck: 'قصات الرقبة', sleeve: 'الأكمام', top: 'التوبات', skirt: 'التنانير', dress: 'الفساتين', abaya: 'العبايات', pants: 'البناطيل', rise: 'ارتفاع الخصر', jeans: 'الجينز', shorts: 'الشورتات', jump: 'الجمبسوت', jacket: 'الجاكيتات', coat: 'المعاطف', fabric: 'الأقمشة', print: 'النقوش', bag: 'الحقائب', earring: 'الأقراط', nail: 'الأظافر', belt: 'الأحزمة', heel: 'الأحذية', boot: 'البوتات', bootLen: 'أطوال البوت', seam: 'قصات الخياطة' };
const GROUPS = [
  ['التأسيس الداخلي', ['bra', 'panty', 'shapewear']],
  ['القطع العلوية', ['neck', 'sleeve', 'top']],
  ['القطع السفلية', ['skirt', 'pants', 'rise', 'jeans', 'shorts']],
  ['الفساتين والعبايات', ['dress', 'abaya', 'jump', 'seam']],
  ['الجاكيتات والمعاطف', ['jacket', 'coat']],
  ['الأقمشة والنقوش', ['fabric', 'print']],
  ['الأحذية', ['heel', 'bootLen', 'boot']],
  ['الحقائب والمكملات', ['bag', 'earring', 'belt', 'nail']]
];
