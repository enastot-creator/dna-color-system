/* ═════════════ BODY DNA — APP ═════════════ */
LIB.seam = SEAMS; DEFV.seam = 'full';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const IN = 2.54, toIn = cm => cm / IN;
const fmt = (n, d = 1) => n == null || isNaN(n) ? '—' : (Math.round(n * 10 ** d) / 10 ** d).toString();
const AR_DIG = s => String(s);

/* ── state ── */
const KEY = 'dnaBody.v1';
const blank = () => ({ id: 'c' + Date.now().toString(36), client: { date: new Date().toISOString().slice(0, 10) }, profile: {}, M: {}, unit: 'cm', A: {}, manual: {}, shape: null, shapeManual: false, picks: {}, notes: {}, x: {} });
let DB = { sessions: {}, current: null }, S;
try { DB = JSON.parse(localStorage.getItem(KEY)) || DB; } catch (e) { }
S = DB.sessions[DB.current] || blank();
let saveT, quiet = true; setTimeout(() => quiet = false, 2000);
function save() { clearTimeout(saveT); saveT = setTimeout(() => { DB.sessions[S.id] = S; DB.current = S.id; try { localStorage.setItem(KEY, JSON.stringify(DB)); quiet || flash('تم الحفظ تلقائياً'); } catch (e) { } }, 500); }
function flash(t) { const el = $('#toast'); el.textContent = t; el.classList.add('show'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('show'), 1400); }

/* ── derived analysis ── */
function braCalc(ub, bu) {
  // EN 13402 (brand size charts): band = underbust rounded to nearest 5 cm; cup = (bust − underbust): 10–12 AA, 12–14 A, then +1 letter per 2 cm
  if (!(ub > 0 && bu > 0) || bu <= ub) return null;
  const eu = Math.max(60, Math.min(120, Math.round(ub / 5) * 5)), band = 28 + (eu - 60) / 5 * 2;
  const diff = bu - ub, ci = Math.max(0, Math.min(UK_CUPS.length - 1, Math.floor((diff - 10) / 2)));
  const r = { band, eu, ci, diff, uk: band + UK_CUPS[ci], us: band + US_CUPS[ci], euS: eu + EU_CUPS[ci], fr: (eu + 15) + EU_CUPS[ci], au: (band - 22) + UK_CUPS[ci] };
  r.sister = [[band - 2, ci + 1], [band + 2, ci - 1]].filter(([bb, c]) => c >= 0 && c < UK_CUPS.length && bb >= 28).map(([bb, c]) => bb + UK_CUPS[c]);
  const m5 = ub % 5; r.bandEdge = Math.abs(m5 - 2.5) <= .5; // between two bands
  const dm = (diff - 10) % 2; r.cupEdge = diff >= 12 && (dm < .3 || dm > 1.7);
  r.small = diff < 10;
  return r;
}
function ffit(b, w, h, hh) {
  // Simmons, Istook & Devarajan (2004) FFIT rules in inches, preceded by oval/diamond checks
  const B = toIn(b), W = toIn(w), H = toIn(h), HH = toIn(hh || (w + h) / 2), r = HH / W;
  const v = { bh: B - H, hb: H - B, bw: B - W, hw: H - W, r };
  let sh, sub = '', rule;
  if (B - W < 2 && H - W < 3 && W >= H - 1) { sh = 'O'; rule = 'الوسط مقارب للصدر والأرداف (الصدر−الوسط < 2″ والأرداف−الوسط < 3″)'; }
  else if (H - B >= 2 && W >= B - .5) { sh = 'D'; rule = 'الأرداف أعرض من الصدر والوسط ≥ الصدر'; }
  else if (B - H <= 1 && H - B < 3.6 && (B - W >= 9 || H - W >= 10)) { sh = 'X'; rule = 'الصدر≈الأرداف (فرق < 3.6″) والخصر أصغر بـ 9″+ من الصدر أو 10″+ من الأرداف'; }
  else if (H - B >= 3.6 && H - B < 10 && H - W >= 9 && r < 1.193) { sh = 'X'; sub = 'ساعة رملية سفلية (Bottom Hourglass)'; rule = 'الأرداف أكبر من الصدر 3.6–10″، الأرداف−الوسط ≥ 9″، والخصر النازل÷الوسط < 1.193'; }
  else if (B - H > 1 && B - H < 10 && B - W >= 9) { sh = 'X'; sub = 'ساعة رملية علوية (Top Hourglass)'; rule = 'الصدر أكبر من الأرداف 1–10″ والصدر−الوسط ≥ 9″'; }
  else if (H - B > 2 && H - W >= 7 && r >= 1.193) { sh = 'S'; rule = 'الأرداف−الصدر > 2″، الأرداف−الوسط ≥ 7″، والخصر النازل÷الوسط ≥ 1.193 (بروز الورك العلوي)'; }
  else if (H - B >= 3.6 && H - W < 9) { sh = 'A'; rule = 'الأرداف أكبر من الصدر بـ 3.6″+ والخصر غير محدد بقوة (الأرداف−الوسط < 9″)'; }
  else if (B - H >= 3.6 && B - W < 9) { sh = 'V'; rule = 'الصدر أكبر من الأرداف بـ 3.6″+ والصدر−الوسط < 9″'; }
  else if (Math.abs(H - B) < 3.6 && B - W < 9 && H - W < 10) { sh = 'H'; rule = 'الصدر≈الأرداف (فرق < 3.6″) والخصر غير محدد (الصدر−الوسط < 9″ والأرداف−الوسط < 10″)'; }
  else { sh = H > B ? 'A' : 'V'; rule = 'أقرب تصنيف حسب الجزء الأعرض'; }
  return { sh, sub, rule, v };
}
function derive(M = S.M) {
  const D = { calc: [] }, C = (t, inp, f, res, basis) => D.calc.push([t, inp, f, res, basis]);
  const b = M.bust, w = M.waist, h = M.hip, hh = M.highhip, cm = x => fmt(x) + ' سم';
  if (M.height) {
    const H = M.height;
    D.heightIdx = H < 150 ? 0 : H < 157 ? 1 : H <= 162.5 ? 2 : H <= 170 ? 3 : 4;
    D.heightTxt = ['بتيت جداً (أقل من 150 سم)', 'بتيت (150–157 سم)', 'بتيت طويلة (157–162.5 سم)', 'متوسطة الطول (162.5–170 سم)', 'طويلة (أكثر من 170 سم)'][D.heightIdx];
    D.petite = H <= 162.5;
    C('تصنيف الطول', 'الطول ' + cm(H), 'بتيت حتى 162.5 سم · طويلة أكثر من 170 سم', D.heightTxt, 'معيار مقاسات البتيت العالمي');
  }
  if (M.wrist && M.height) {
    const H = M.height, W = M.wrist, [s1, s2] = H < 157.5 ? [14, 14.6] : H <= 165 ? [15.2, 15.9] : [15.9, 16.5];
    D.frameIdx = W < s1 ? 0 : W <= s2 ? 1 : 2;
    C('حجم الهيكل (كتلة الجسم)', `المعصم ${cm(W)} · الطول ${cm(H)}`, `لطولك: صغير < ${s1} · متوسط ${s1}–${s2} · كبير > ${s2}`, ['صغير', 'متوسط', 'كبير'][D.frameIdx], 'طريقة محيط المعصم (MedlinePlus / NIH)');
  }
  if (b && M.underbust) {
    const r = braCalc(M.underbust, b);
    if (r) { D.bra = r; D.bustIdx = r.ci <= 2 ? 0 : r.ci >= 5 ? 2 : 1; C('مقاس حمالة الصدر', `أسفل الصدر ${cm(M.underbust)} · الصدر ${cm(b)}`, `الحزام = أقرب 5 سم → ${r.eu} · الفرق ${fmt(r.diff)} سم → كوب ${EU_CUPS[r.ci]}`, `${r.uk} (UK/US) · ${r.euS} (EU)`, 'المعيار الأوروبي EN 13402'); C('حجم الصدر', 'حرف الكوب ' + UK_CUPS[r.ci], 'A–B صغير · C–D متناسب · DD فأكبر كبير', ['صغير', 'متناسب', 'كبير'][D.bustIdx], 'تصنيف تنسيقي'); }
  }
  if (b && w && h) {
    const f = ffit(b, w, h, hh); D.shape = f.sh; D.shapeSub = f.sub; D.ffit = f;
    C('شكل الجسم', `الصدر ${cm(b)} · الوسط ${cm(w)} · الأرداف ${cm(h)}${hh ? ' · الخصر النازل ' + cm(hh) : ''}`, `الصدر−الأرداف ${fmt(f.v.bh)}″ · الصدر−الوسط ${fmt(f.v.bw)}″ · الأرداف−الوسط ${fmt(f.v.hw)}″ · النازل÷الوسط ${fmt(f.v.r, 3)}`, SHAPES[f.sh].ar + (f.sub ? ' — ' + f.sub : ''), 'نظام FFIT البحثي: ' + f.rule);
    D.waistIdx = (h - w >= 25 || b - w >= 23) ? 0 : (h - w < 15 && b - w < 13) ? 2 : 1;
    C('شكل الوسط', `الأرداف−الوسط ${fmt(h - w)} سم · الصدر−الوسط ${fmt(b - w)} سم`, 'محدد: 25+ أو 23+ · غير محدد: أقل من 15 و13', ['محدد', 'متوسط', 'غير محدد'][D.waistIdx], 'تقديري (مكافئ لحدود FFIT)');
    D.whr = w / h;
  }
  if (M.shoulderC && h) { D.shWIdx = M.shoulderC - h > 5 ? 2 : h - M.shoulderC > 5 ? 3 : 0; C('الأكتاف مقابل الأرداف', `محيط الأكتاف ${cm(M.shoulderC)} · الأرداف ${cm(h)}`, 'فرق أكثر من 5 سم = أعرض/أصغر', ['متناسبة', '', 'أعرض من الجزء السفلي', 'أصغر من الجزء السفلي'][D.shWIdx], 'قاعدة المستشارات الشائعة'); }
  if (M.lower && M.height) { D.legR = M.lower / M.height; D.torsoIdx = D.legR < .59 ? 2 : D.legR > .635 ? 1 : 0; D.legsIdx = D.legR < .59 ? 1 : D.legR > .635 ? 2 : 0; C('طول الساق (نسبة الجزء السفلي)', `الوسط→الأرض ${cm(M.lower)} ÷ الطول ${cm(M.height)}`, `${Math.round(D.legR * 100)}% · متوازن 59–63.5%`, ['جذع متناسب وساق متناسبة', 'جذع قصير وساق طويلة', 'جذع طويل وساق قصيرة'][D.torsoIdx], 'تقديري (نسبة الجسم)'); }
  if (M.torso) {
    const ti = toIn(M.torso); D.torsoIdx = ti < 17.5 ? 1 : ti >= 19.5 ? 2 : 0;
    C('طول الجذع (العمود الفقري)', `${cm(M.torso)} = ${fmt(ti)} إنش`, 'قصير 15–17″ (حتى 17.4) · متناسب 18–19″ (17.5–19.4) · طويل 20″ فأكثر (من 19.5)', ['جذع متناسب', 'جذع قصير', 'جذع طويل'][D.torsoIdx], 'قاعدة ملف DNA الأصلي');
    if (D.legsIdx == null) D.legsIdx = D.torsoIdx === 1 ? 2 : D.torsoIdx === 2 ? 1 : 0;
  }
  if (M.neck) { D.neckIdx = M.neck < 7 ? 1 : M.neck > 10.5 ? 2 : 0; C('طول الرقبة', 'الرقبة ' + cm(M.neck), 'قصيرة < 7 · طويلة > 10.5', ['متناسبة', 'قصيرة', 'طويلة'][D.neckIdx], 'تقديري'); }
  if (M.thigh && h) { D.thighIdx = M.thigh / h > .64 ? 2 : M.thigh / h > .59 ? 1 : 0; C('حجم الأفخاذ', `الفخذ ${cm(M.thigh)} ÷ الأرداف ${cm(h)} = ${fmt(M.thigh / h, 2)}`, 'متناسبة ≤ 0.59 · متوسطة ≤ 0.64 · كبيرة أكثر', ['متناسبة', 'متوسطة', 'كبيرة'][D.thighIdx], 'تقديري'); }
  if (M.calf) { D.calfIdx = M.calf >= 39 || (M.ankle && M.ankle >= 24) ? 3 : M.calf <= 33 ? 0 : 1; C('عضلة الساق والكاحل', `السمانة ${cm(M.calf)}${M.ankle ? ' · الكاحل ' + cm(M.ankle) : ''}`, 'نحيلة ≤ 33 · ممتلئة ≥ 39 أو كاحل ≥ 24', ['نحيلة', 'متوسطة', '', 'ممتلئة'][D.calfIdx], 'تقديري'); }
  if (M.armLen && M.height) { D.armR = M.armLen / M.height; D.armLenIdx = D.armR < .32 ? 0 : D.armR > .355 ? 2 : 1; C('طول الذراعين', `الذراع ${cm(M.armLen)} ÷ الطول = ${fmt(D.armR * 100, 1)}%`, 'متناسب 32–35.5% من الطول', ['قصيرة', 'متناسبة', 'طويلة'][D.armLenIdx], 'تقديري (نسب الجسم الأنثروبومترية)'); }
  if (M.bicep) { D.armsIdx = M.bicep <= 25 ? 0 : M.bicep >= 32 ? 2 : 1; C('أعلى الذراع', 'المحيط ' + cm(M.bicep), 'نحيلة ≤ 25 · ممتلئة ≥ 32', ['نحيلة', 'متناسبة', 'ممتلئة'][D.armsIdx], 'تقديري'); }
  if (w && h) C('نسبة الوسط للأرداف WHR', `${cm(w)} ÷ ${cm(h)}`, 'مرجع صحي للنساء: 0.85 فأكثر خطر أعلى', fmt(w / h, 2), 'منظمة الصحة العالمية');
  if (w && M.height) { D.whtr = w / M.height; C('نسبة الوسط للطول WHtR', `${cm(w)} ÷ ${cm(M.height)}`, 'أقل من 0.5 ضمن النطاق الصحي', fmt(D.whtr, 2), 'مرجع صحي شائع'); }
  return D;
}
let D = {};
const AUTO_MAP = { arms: 'armsIdx', armLen: 'armLenIdx', frame: 'frameIdx', height: 'heightIdx', bust: 'bustIdx', waist: 'waistIdx', shW: 'shWIdx', torso: 'torsoIdx', legs: 'legsIdx', neck: 'neckIdx', thigh: 'thighIdx', calf: 'calfIdx' };
function applyAuto() {
  D = derive();
  for (const [g, k] of Object.entries(AUTO_MAP)) if (!S.manual[g] && D[k] != null) S.A[g] = D[k];
  if (!S.shapeManual && D.shape) S.shape = D.shape;
}
function tags() {
  const T = new Set(); if (S.shape) T.add(S.shape);
  ANA.forEach(g => { const v = S.A[g.k]; if (v != null && g.o[v] && g.o[v][1]) T.add(g.o[v][1]); });
  return T;
}
function score(it, T = tags()) {
  let sc = 0; const why = [], warn = [];
  (it.g || '').split(' ').filter(Boolean).forEach(t => { if (T.has(t)) { sc += t.length === 1 ? 2 : 1; why.push(t); } });
  (it.a || '').split(' ').filter(Boolean).forEach(t => { if (T.has(t)) { sc -= t.length === 1 ? 2.5 : 1.6; warn.push(t); } });
  return { sc, why, warn, st: !T.size ? '' : sc >= 2 ? 'rec' : sc <= -1.5 ? 'avoid' : '' };
}

/* ── UI atoms ── */
const svg = (it, cat, cls = '') => `<svg class="${cls}" viewBox="${VB[it.v || DEFV[cat]] || VB.top}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${it.s()}</svg>`;
function card(cat, it) {
  const k = cat + ':' + it.id, p = S.picks[k] || '';
  return `<article class="it ${p ? 'p-' + p : ''}" data-k="${k}" data-trend="${it.t ? 1 : 0}">
  <div class="ill" data-zoom="${k}">${svg(it, cat)}<span class="badge"></span>${it.t ? '<span class="tr">TREND 25/26</span>' : ''}</div>
  <div class="nm"><b>${esc(it.ar)}</b><i>${esc(it.en)}</i></div>
  ${it.w ? `<div class="fab"><span>الوزن: ${it.w}</span><span>الانسدال: ${it.dr}</span><span>اللمعة: ${it.sh}</span></div>` : ''}
  <p>${esc(it.d)}</p>
  <div class="pk"><button data-pick="${k}" data-v="y">✓ يناسبني</button><button data-pick="${k}" data-v="n">✕ أتجنّبه</button></div></article>`;
}
function grid(cat, title, sub = '') {
  return `<section class="block" data-grid="${cat}">
  <div class="bh"><div><h3>${title}</h3>${sub ? `<p>${sub}</p>` : ''}</div>
  <div class="tools"><div class="seg" role="group"><button class="on" data-filter="all">الكل</button><button data-filter="rec">المقترح لكِ</button><button data-filter="trend">الترند</button><button data-filter="picked">اختياراتي</button></div>
  <button class="ghost" data-big="1">⤢ عرض كبير</button><button class="ghost" data-apply="${cat}">✦ تطبيق المقترحات</button></div></div>
  <div class="grid">${LIB[cat].map(it => card(cat, it)).join('')}</div></section>`;
}
function chips(store, key, opts, multi = false) {
  const cur = S[store][key];
  return `<div class="chips" data-store="${store}" data-key="${key}" data-multi="${multi ? 1 : 0}">${opts.map((o, i) => { const on = multi ? (cur || []).includes(i) : cur === i; return `<button class="chip ${on ? 'on' : ''}" data-i="${i}">${esc(Array.isArray(o) ? o[0] : o)}</button>`; }).join('')}</div>`;
}
const note = (k, ph = 'ملاحظات المستشارة…') => { const cn = (S.cnotes || {})[k] || '', cons = S.notes[k] || ''; return `<div class="note">${CLIENT && !cons ? '' : `<label>✎ ملاحظات وتوصيات المستشارة</label><textarea data-note="${k}" placeholder="${ph}">${esc(cons)}</textarea>`}<div class="note-c ${!cn && !CLIENT ? 'hide' : ''}"><label>💬 ملاحظات العميلة</label><textarea data-cnote="${k}" ${CLIENT ? '' : 'readonly'} placeholder="اكتبي ملاحظاتكِ وأسئلتكِ هنا — تُحفظ تلقائياً…">${esc(cn)}</textarea></div></div>`; };
const tipBox = (title, arr, icon = '◆') => `<div class="tips"><h4>${title}</h4><ul>${arr.map(t => `<li><span>${icon}</span>${esc(t)}</li>`).join('')}</ul></div>`;
function chapter(n, id, en, ar, sub, body, dark = false) {
  return `<section class="chapter ${dark ? 'dark' : ''}" id="${id}"><header class="ch-h"><span class="num">${String(n).padStart(2, '0')}</span><div><small>${en}</small><h2>${ar}</h2>${sub ? `<p>${sub}</p>` : ''}</div>${helixSVG(60, 220, 3)}</header>${body}</section>`;
}
function helixSVG(h = 120, w = 600, turns = 4, cls = 'hx') {
  let a = '', b = '', r = '';
  for (let i = 0; i <= 120; i++) { const x = i / 120 * w, t = i / 120 * turns * Math.PI * 2, y1 = h / 2 + Math.sin(t) * h * .38, y2 = h / 2 - Math.sin(t) * h * .38; a += (i ? 'L' : 'M') + r1(x) + ' ' + r1(y1); b += (i ? 'L' : 'M') + r1(x) + ' ' + r1(y2); if (i % 5 === 0) r += `<path d="M${r1(x)} ${r1(y1)}L${r1(x)} ${r1(y2)}" opacity="${.25 + .5 * Math.abs(Math.cos(t))}"/>`; }
  return `<svg class="${cls}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><g class="rungs">${r}</g><path class="s1" d="${a}"/><path class="s2" d="${b}"/></svg>`;
}

/* ── body map ── */
function mapFigure() {
  const M = S.M, k = (v, d, base) => v ? Math.max(base * .78, Math.min(base * 1.3, v / d * base)) : base;
  const p = { sh: k(M.shoulderW, 38, 38.5), bust: k(M.bust, 92, 34.5), waist: k(M.waist, 70, 24), hip: k(M.hip, 98, 35.5) };
  if (M.highhip) p.hh = k(M.highhip, 88, 31.25); if (M.thigh) p.thigh = k(M.thigh, 56, 32);
  let s = `<rect x="-30" y="-6" width="260" height="410" fill="url(#gBg)" rx="18"/>` + mq({ sh: p.sh, bust: p.bust, waist: p.waist, hip: p.hip, hh: p.hh, thigh: p.thigh, shadowW: 40 });
  MEAS.forEach((m, i) => {
    const g = m[4], v = S.M[m[0]], on = v ? 'has' : '';
    let d = '', lx, ly;
    const half = y => { const R = bodyR(p); let best = 30; for (let j = 0; j < R.length - 1; j++) if (R[j][1] <= y && R[j + 1][1] >= y && R[j][1] < 216) { const u = (y - R[j][1]) / ((R[j + 1][1] - R[j][1]) || 1); best = R[j][0] + (R[j + 1][0] - R[j][0]) * u; } return best; };
    if (g.h) {
      if (g.side) { const T = { 228: [101, 100 + (p.thigh ?? p.hip * .9) - 1], 318: [103.5, 123], 370: [104.5, 113] }[g.h]; d = `M${T[0]} ${g.h}L${T[1] + 2} ${g.h}`; lx = T[1] + 6; ly = g.h; }
      else { const w = g.h === 79 ? p.sh + 1 : g.h === 86 ? p.sh + 8 : half(g.h) + 1.5; d = `M${r1(100 - w)} ${g.h}Q100 ${g.h + 4} ${r1(100 + w)} ${g.h}`; lx = 100 + w + 4; ly = g.h; }
    } else if (g.v) { d = `M${g.x} ${g.v[0]}L${g.x} ${g.v[1]}`; lx = g.x; ly = (g.v[0] + g.v[1]) / 2; }
    else if (g.armL) { const a = [100 - p.sh - 1 - 12, 80], z = [100 - p.sh - 9.7 - 12, 196]; d = `M${r1(a[0])} ${a[1]}L${r1(z[0])} ${z[1]}M${r1(a[0] - 3)} ${a[1]}h6M${r1(z[0] - 3)} ${z[1]}h6`; lx = (a[0] + z[0]) / 2 - 14; ly = 138; }
    else if (g.bicep) { const x = 100 - p.sh - 2; d = `M${r1(x - 9)} 112L${r1(x + 7)} 112`; lx = x - 23; ly = 112; }
    else if (g.arm) { const x = 100 - p.sh - 9.7; d = `M${r1(x - 7)} 196L${r1(x + 7)} 196`; lx = x - 20; ly = 196; }
    else return;
    const left = (g.v && g.x < 100) || g.arm || g.bicep || g.armL, tx = g.v ? (g.x > 100 ? lx + 8 : lx - 8) : g.arm ? lx + 6 : lx + 6;
    s += `<g class="ml ${on}" data-focus="${m[0]}"><path d="${d}" class="mline ${g.d ? 'dash' : ''}"/>${g.v ? `<path d="M${g.x - 3} ${g.v[0]}h6M${g.x - 3} ${g.v[1]}h6" class="mline"/>` : ''}<circle cx="${r1(tx)}" cy="${r1(ly)}" r="6.2" class="mdot"/><text x="${r1(tx)}" y="${r1(ly + 2.3)}" class="mnum">${i + 1}</text>${v ? `<text x="${r1(tx + (left ? -9 : 9))}" y="${r1(ly + 2.4)}" class="mval" text-anchor="${left ? 'end' : 'start'}">${fmt(S.unit === 'in' ? toIn(v) : v)}</text>` : ''}</g>`;
  });
  return `<svg viewBox="-30 -6 260 410" class="bodymap">${s}</svg>`;
}
function measInput(m, i) {
  const v = S.M[m[0]], u = S.unit;
  return `<label class="mi ${v ? 'has' : ''}" data-mi="${m[0]}"><span class="n">${i + 1}</span><span class="t"><b>${m[1]}</b><i>${m[2]}</i></span><input type="number" inputmode="decimal" step="0.1" min="0" data-m="${m[0]}" value="${v ? fmt(u === 'in' ? toIn(v) : v) : ''}" placeholder="${u === 'in' ? 'إنش' : 'سم'}"><small>${m[3]}</small></label>`;
}
function renderMapOut() {
  const el = $('#mapOut'); if (!el) return;
  const st = [];
  if (D.shape) st.push(['شكل الجسم المقترح', SHAPES[D.shape].ar, SHAPES[D.shape].en]);
  if (D.bra) st.push(['مقاس الصدر', D.bra.uk, 'UK / US band']);
  if (D.heightTxt) st.push(['تصنيف الطول', D.heightTxt.split(' (')[0], D.petite ? 'Petite scale' : 'Standard scale']);
  if (D.frameIdx != null) st.push(['حجم الهيكل', ['صغير', 'متوسط', 'كبير'][D.frameIdx], 'Wrist method']);
  if (D.legR) st.push(['نسبة الساق للطول', Math.round(D.legR * 100) + '%', D.legsIdx === 1 ? 'جذع طويل / ساق أقصر' : D.legsIdx === 2 ? 'ساق طويلة / جذع قصير' : 'متوازنة']);
  if (D.whr) st.push(['نسبة الخصر للأرداف', fmt(D.whr, 2), 'WHR']);
  el.innerHTML = st.length ? st.map(([a, b, c]) => `<div class="stat"><small>${a}</small><b>${esc(b)}</b><i>${esc(c)}</i></div>`).join('') : `<div class="empty">أدخلي القياسات ليظهر التحليل الفوري هنا — الشكل، مقاس الصدر، تصنيف الطول، الهيكل والنسب.</div>`;
  const f = $('#mapFig'); if (f) f.innerHTML = mapFigure();
}

/* ── analysis chapter dynamic parts ── */
function renderShapePick() {
  const el = $('#shapePick'); if (!el) return;
  el.innerHTML = Object.entries(SHAPES).map(([k, v]) => `<button class="shp ${S.shape === k ? 'on' : ''} ${D.shape === k ? 'auto' : ''}" data-shape="${k}"><svg viewBox="40 0 120 400">${shapeFig(v.p, false)}</svg><b>${v.ar}</b><i>${v.en}</i>${D.shape === k ? '<em>حسب القياسات</em>' : ''}</button>`).join('');
  const r = $('#shapeResult'); if (!r) return;
  if (!S.shape) { r.innerHTML = '<div class="empty">اختاري شكل الجسم أو أدخلي قياسات الصدر والوسط والأرداف ليُحدَّد تلقائياً.</div>'; return; }
  const T = SHAPE_TXT[S.shape], sp = SHAPES[S.shape], tg = [...tags()].filter(t => t.length > 1);
  r.innerHTML = `<div class="result"><div class="rfig"><svg viewBox="24 0 152 400">${shapeFig(sp.p)}</svg></div><div class="rtxt"><small>يُصنّف نوع جسدكِ عزيزتي تحت مسمّى</small><h3>${sp.ar} <i>${sp.en}</i></h3>${D.shapeSub && S.shape === D.shape ? `<p class="sub">${D.shapeSub}</p>` : ''}
  <div class="goal">🎯 هدف التنسيق: <b>${T.goal}</b></div><p>${T.s}</p>
  ${tg.length ? `<div class="tagrow">${tg.map(t => `<span>${TAG_AR[t]}</span>`).join('')}</div>` : ''}
  <div class="scales"><div><small>حسب المقياس العالمي للطول</small><b>${D.heightTxt || '—'}</b></div><div><small>حسب المقياس العالمي للبتيت (Petite)</small><b>${S.M.height ? (D.petite ? 'ضمن مقاسات البتيت — ابحثي عن قسم Petite' : 'خارج البتيت — المقاسات العادية' + (S.M.height > 172 ? ' أو Tall' : '')) : '—'}</b></div></div>
  <h4>صيغ إطلالة جاهزة لكِ</h4><ol class="formula">${T.f.map(x => `<li>${x}</li>`).join('')}</ol></div></div>`;
}
function renderAna() { $$('[data-store="A"]').forEach(c => { const k = c.dataset.key; $$('.chip', c).forEach(b => { b.classList.toggle('on', S.A[k] === +b.dataset.i); b.classList.toggle('auto', !S.manual[k] && S.A[k] === +b.dataset.i && D[AUTO_MAP[k]] != null); }); }); renderShapePick(); }

/* ── foundation ── */
function renderBra() {
  const el = $('#braOut'); if (!el) return;
  const u = $('#calcUnit'); if (u) u.textContent = S.unit === 'in' ? 'إنش' : 'سم';
  $$('[data-calc]').forEach(i => { if (document.activeElement !== i) { const v = S.M[i.dataset.m]; i.value = v ? fmt(S.unit === 'in' ? toIn(v) : v) : ''; } });
  const B = D.bra, ub = S.M.underbust, bu = S.M.bust;
  if (!B) { el.innerHTML = `<div class="empty">${ub && bu && bu <= ub ? '⚠ محيط الصدر يجب أن يكون أكبر من محيط أسفل الصدر — أعيدي القياس.' : 'أدخلي محيط أسفل الصدر ومحيط الصدر لحساب المقاس.'}</div>`; const t0 = $('#sizeOut'); if (t0) t0.innerHTML = sizePassport(); return; }
  const warn = [];
  if (ub < 58 || ub > 122) warn.push('قياس أسفل الصدر خارج نطاق الجداول المعتادة — تأكدي من القياس.');
  if (B.diff > 40) warn.push('الفرق كبير جداً (أكثر من 40 سم) — تأكدي أن الشريط مستوٍ وأن أسفل الصدر مأخوذ مباشرة تحت الصدر.');
  if (B.small) warn.push('الفرق أقل من 10 سم: مقاس AA — جربي البرالت أو الحمالات المبطنة الخفيفة.');
  if (B.bandEdge) warn.push(`أسفل الصدر (${fmt(ub)} سم) على الحد بين حزامين — جربي أيضاً المقاس الشقيق ${B.sister.join(' أو ')} واختاري الأريح.`);
  if (B.cupEdge) warn.push('الفرق على حد بين حرفين — جربي الكوب الأكبر بحرف إن شعرتِ بضغط.');
  el.innerHTML = `<div class="bra-hero"><small>قياسكِ الصحيح هو</small><b>${B.uk}</b><span>UK / US · ${B.euS} EU</span></div>
  <div class="conv">${[['UK', B.uk], ['US', B.us], ['EU', B.euS], ['FR / BE / ES', B.fr], ['AU / NZ', B.au]].map(([a, b]) => `<div><small>${a}</small><b>${b}</b></div>`).join('')}</div>
  <ol class="calc-steps"><li><b>الحزام:</b> أسفل الصدر ${fmt(ub)} سم ← يُقرَّب لأقرب 5 سم ← <b dir="ltr">EU ${B.eu}</b> · <b dir="ltr">UK/US ${B.band}</b> · <b dir="ltr">FR ${B.eu + 15}</b></li>
  <li><b>الكوب:</b> ${fmt(bu)} − ${fmt(ub)} = <b>${fmt(B.diff)} سم</b> ← ${B.diff < 12 ? 'أقل من 12 سم' : `من ${10 + B.ci * 2} إلى أقل من ${12 + B.ci * 2} سم`} ← الحرف <b dir="ltr">UK ${UK_CUPS[B.ci]}</b> · <b dir="ltr">EU ${EU_CUPS[B.ci]}</b></li>
  <li><b>المقاسات الشقيقة:</b> ${B.sister.join(' · ') || '—'} — نفس حجم الكوب بحزام مختلف؛ إن كان الحزام ضيقاً اختاري الحزام الأكبر بكوب أصغر بحرف.</li></ol>
  ${warn.map(w => `<p class="calc-warn">⚠ ${w}</p>`).join('')}
  <p class="mini">الحساب وفق المعيار الأوروبي EN 13402 المعتمد في جداول الماركات. إيطاليا تستخدم أرقاماً خاصة للحزام (1، 2، 3…) — راجعي جدول الماركة.</p>`;
  const t = $('#sizeOut'); if (t) t.innerHTML = sizePassport();
}
function renderCalc() {
  const el = $('#calcBox'); if (!el) return;
  el.innerHTML = D.calc.length ? `<div class="tbl-wrap"><table class="tbl calc-t"><thead><tr><th>الاستنتاج</th><th>القيم</th><th>المعادلة / الحدود</th><th>النتيجة</th><th>الأساس</th></tr></thead><tbody>${D.calc.map(r => `<tr><td><b>${r[0]}</b></td><td data-l="القيم">${esc(r[1])}</td><td data-l="الحدود">${esc(r[2])}</td><td class="res" data-l="النتيجة">${esc(r[3])}</td><td data-l="الأساس" class="src ${/تقديري|تنسيقي|الشائعة/.test(r[4]) ? 'est' : 'ok'}">${esc(r[4])}</td></tr>`).join('')}</tbody></table></div>` : '<div class="empty">أدخلي القياسات في خريطة القياسات لتظهر الحسابات.</div>';
}
function pickSize(v, idx) { if (!v) return null; for (const r of SIZES) if (v <= r[idx][1]) return r; return SIZES[SIZES.length - 1]; }
function sizePassport() {
  const M = S.M, top = pickSize(M.bust, 4), bot = pickSize(Math.max(M.hip || 0, 0) || null, 6), wst = pickSize(M.waist, 5);
  const sw = M.waist ? SHAPEWEAR.find(r => M.waist <= r[2]) : null;
  const eu = M.foot ? Math.round(1.5 * (M.foot + 1.5) * 2) / 2 : null;
  const wr = M.wrist; const watch = wr ? (wr < 15 ? '26–32 مم' : wr <= 16.5 ? '32–36 مم' : '36–40 مم') : null;
  const items = [
    ['حمالة الصدر', D.bra ? D.bra.uk + ' (UK)' : '—'], ['البلايز والتوبات', top ? `${top[0]} · US ${top[1]} · EU ${top[3]}` : '—'], ['التنانير والبناطيل', bot ? `${bot[0]} · US ${bot[1]} · EU ${bot[3]}` : '—'],
    ['الكيلوت (حسب الورك)', bot ? bot[0] : '—'], ['الجينز (مقاس الخصر)', M.waist ? `W${Math.round(toIn(M.waist))}` : '—'], ['المشدات', sw ? sw[0] : '—'],
    ['الكورسيه الحديدي', M.waist ? `${Math.round(toIn(M.waist) - 4)}" (${Math.round(M.waist - 10)} سم)` : '—'], ['الحذاء', eu ? `EU ${eu} · US ${eu - 30.5} · UK ${eu - 33}` : '—'], ['قطر الساعة', watch || '—']
  ];
  return `<div class="passport">${items.map(([a, b]) => `<div><small>${a}</small><b>${b}</b></div>`).join('')}</div>${top && bot && top[0] !== bot[0] ? `<p class="mini">مقاسك العلوي ${top[0]} والسفلي ${bot[0]} — في الفساتين والجمبسوت اختاري حسب الأكبر ثم عدّلي عند الخياط.</p>` : ''}${wst && bot && wst[0] !== bot[0] ? `<p class="mini">الخصر (${wst[0]}) يختلف عن الورك (${bot[0]}): في البناطيل اشتري حسب الورك وضيّقي الخصر.</p>` : ''}`;
}
function sizeTable(kind) {
  const idx = kind === 'top' ? 4 : 6, v = kind === 'top' ? S.M.bust : S.M.hip, hit = pickSize(v, idx);
  return `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>المقاس</th><th>US</th><th>UK</th><th>EU</th><th>الصدر سم</th><th>الوسط سم</th><th>الأرداف سم</th></tr></thead><tbody>${SIZES.map(r => `<tr class="${hit && hit[0] === r[0] ? 'hit' : ''}"><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4].join('–')}</td><td>${r[5].join('–')}</td><td>${r[6].join('–')}</td></tr>`).join('')}</tbody></table></div>`;
}
function braTable() {
  const rows = [[28, 60], [30, 65], [32, 70], [34, 75], [36, 80], [38, 85], [40, 90], [42, 95], [44, 100], [46, 105]];
  const hit = D.bra ? D.bra.band : null, cups = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>أسفل الصدر سم</th><th>أسفل الصدر إنش</th><th>UK / US</th><th>EU</th><th>FR / BE</th><th>AU</th></tr></thead><tbody>${rows.map(([u, e]) => `<tr class="${hit === u ? 'hit' : ''}"><td>${e - 2}–${e + 2}</td><td>${fmt((e - 2.5) / IN, 0)}–${fmt((e + 2.4) / IN, 0)}</td><td>${u}</td><td>${e}</td><td>${e + 15}</td><td>${u - 22}</td></tr>`).join('')}</tbody></table></div>
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>الفرق (سم)</th>${cups.map(n => `<th>${10 + n * 2}–${12 + n * 2}</th>`).join('')}</tr></thead><tbody><tr><td>UK</td>${cups.map(n => `<td class="${D.bra && D.bra.ci === n ? 'hitc' : ''}">${UK_CUPS[n]}</td>`).join('')}</tr><tr><td>US</td>${cups.map(n => `<td>${US_CUPS[n]}</td>`).join('')}</tr><tr><td>EU / FR</td>${cups.map(n => `<td>${EU_CUPS[n]}</td>`).join('')}</tr></tbody></table></div>`;
}
/* ── length guide ── */
function lengthGuide(kind) {
  const L = LENGTHS[kind], T = tags();
  const sel = S.x['len_' + kind] || [];
  if (kind === 'sleeve') {
    let fg = mq({}) + bodice('crew', { len: 168, fit: 'semi', sleeveless: true, sw: 33 }, 'I');
    L.forEach(l => {
      const sc = score({ g: l[4], a: l[5] }, T), A = axisAt(l[3]), n = [A.dir[1], -A.dir[0]], e = A.w + 4, on = sel.includes(l[0]);
      const p1 = [A.c[0] - n[0] * e, A.c[1] - n[1] * e], p2 = [A.c[0] + n[0] * e, A.c[1] + n[1] * e], py = 60 + L.indexOf(l) * 22;
      fg += `<g class="lg ${sc.st} ${on ? 'on' : ''}" data-len="sleeve:${l[0]}"><path d="M${r1(p1[0])} ${r1(p1[1])}L${r1(p2[0])} ${r1(p2[1])}" class="lgl" style="stroke-width:${on ? 2.4 : 1.4};stroke-dasharray:none"/><path d="M${r1(p2[0])} ${r1(p2[1])}L176 ${py}" class="lgl"/><rect x="176" y="${py - 7}" width="62" height="14" rx="7" class="lgp"/><text x="207" y="${py + 3}" class="lgt">${l[1]}</text></g>`;
    });
    return `<div class="lenwrap"><svg viewBox="40 40 202 190" class="lenfig">${fg}</svg><div class="lenlist">${L.map(l => { const sc = score({ g: l[4], a: l[5] }, T); return `<button class="lenbtn ${sc.st} ${sel.includes(l[0]) ? 'on' : ''}" data-len="sleeve:${l[0]}"><b>${l[1]}</b><i>${l[2]}</i>${sc.st === 'rec' ? '<em>✦ مناسب لكِ</em>' : sc.st === 'avoid' ? '<em class="x">تجنّبي</em>' : ''}</button>`; }).join('')}</div></div>`;
  }
  let fig = mq({ arms: kind === 'jacket' });
  L.forEach(l => {
    const sc = score({ g: l[4], a: l[5] }, T), y = l[3], on = sel.includes(l[0]);
    fig += `<g class="lg ${sc.st} ${on ? 'on' : ''}" data-len="${kind}:${l[0]}"><path d="M40 ${y}L160 ${y}" class="lgl"/><rect x="160" y="${y - 7}" width="62" height="14" rx="7" class="lgp"/><text x="191" y="${y + 3}" class="lgt">${l[1]}</text></g>`;
  });
  return `<div class="lenwrap"><svg viewBox="${kind === 'jacket' ? '20 40 210 360' : '30 120 200 280'}" class="lenfig">${fig}</svg><div class="lenlist">${L.map(l => { const sc = score({ g: l[4], a: l[5] }, T); return `<button class="lenbtn ${sc.st} ${sel.includes(l[0]) ? 'on' : ''}" data-len="${kind}:${l[0]}"><b>${l[1]}</b><i>${l[2]}</i>${sc.st === 'rec' ? '<em>✦ مناسب لكِ</em>' : sc.st === 'avoid' ? '<em class="x">تجنّبي</em>' : ''}</button>`; }).join('')}</div></div>`;
}

/* ── necklaces ── */
function necklaceGuide() {
  const T = tags(), sel = S.x.neckl || [];
  let fig = mq({ arms: true });
  NECKLACES.forEach((n, i) => { const sc = score({ g: n[5], a: n[6] }, T), y = n[4], wd = Math.min(9 + (y - 62) * .42, 30); fig += `<g class="lg ${sc.st} ${sel.includes(n[0]) ? 'on' : ''}" data-neckl="${n[0]}"><path d="M${100 - 8.5} 66Q${r1(100 - wd)} ${r1((66 + y) / 2)} 100 ${y}Q${r1(100 + wd)} ${r1((66 + y) / 2)} ${100 + 8.5} 66" class="chain"/><circle cx="100" cy="${y}" r="2.2" class="pend"/></g>`; });
  return `<div class="lenwrap"><svg viewBox="44 30 112 150" class="lenfig">${fig}</svg><div class="lenlist">${NECKLACES.map(n => { const sc = score({ g: n[5], a: n[6] }, T); return `<button class="lenbtn ${sc.st} ${sel.includes(n[0]) ? 'on' : ''}" data-neckl="${n[0]}"><b>${n[1]} <small>${n[3]}</small></b><i>${n[2]}</i>${sc.st === 'rec' ? '<em>✦ مناسب لكِ</em>' : sc.st === 'avoid' ? '<em class="x">تجنّبي</em>' : ''}</button>`; }).join('')}</div></div>`;
}
function accessoryAdvice() {
  const fr = S.A.frame, H = S.A.height, T = tags();
  const scale = fr === 0 || T.has('pt') ? 'صغيرة إلى متوسطة' : fr === 2 || T.has('tall') ? 'متوسطة إلى كبيرة' : 'متوسطة';
  const bag = [];
  bag.push(`<b>حجم الحقيبة:</b> ${scale} — الحقيبة تتناسب مع حجم هيكلك؛ الصغيرة جداً على هيكل كبير تُكبّره، والكبيرة على البتيت تبتلعها.`);
  if (T.has('A') || T.has('S') || T.has('hL')) bag.push('<b>مكان الحقيبة:</b> تحت الإبط أو عند الخصر — تجنبي الحقائب التي تستقر عند أعرض نقطة في الأرداف.');
  else if (T.has('V') || T.has('shB')) bag.push('<b>مكان الحقيبة:</b> عند الورك أو باليد — تجنبي الحقائب القصيرة تحت الإبط فتوسّع الجزء العلوي.');
  else if (T.has('O') || T.has('D')) bag.push('<b>مكان الحقيبة:</b> باليد أو بحزام طويل عند الورك — تجنبي الحقائب عند منتصف الجسم.');
  else bag.push('<b>مكان الحقيبة:</b> عند الخصر لإبرازه أو باليد للمناسبات.');
  bag.push(`<b>شكل الحقيبة:</b> ${['X', 'A', 'S', 'O'].includes(S.shape) ? 'الأشكال المنحنية الناعمة (هوبو، هلالية، سادل) تكرر منحنياتك وتنسجم معها.' : S.shape ? 'الأشكال الهندسية المهيكلة (توت، مقبض علوي، إيست وست) تنسجم مع خطوط جسمك المستقيمة.' : 'حددي شكل الجسم لتظهر التوصية.'}`);
  if (T.has('bL')) bag.push('<b>الكروس:</b> الحزام القُطري يقسم الصدر الكبير — اختاري حزاماً رفيعاً أو احملي الحقيبة على كتف واحد.');
  const jw = [`<b>حجم المجوهرات:</b> ${scale} — مقياس الحلي يتبع عرض معصمك وحجم هيكلك.`, S.M.wrist ? `<b>قطر الساعة المناسب:</b> ${S.M.wrist < 15 ? '26–32 مم' : S.M.wrist <= 16.5 ? '32–36 مم' : '36–40 مم'} (حسب معصم ${fmt(S.M.wrist)} سم).` : '<b>قطر الساعة:</b> أدخلي محيط المعصم في القياسات.', T.has('fiS') || T.has('fiW') ? '<b>الخواتم:</b> رفيعة بأشكال طولية أو بيضاوية تطيل الأصابع؛ تجنبي العريضة الأفقية.' : T.has('fiL') ? '<b>الخواتم:</b> يناسبك الكبير والعريض والمكدّس (Stacking).' : '<b>الخواتم:</b> متوسطة الحجم؛ خاتم لافت واحد يكفي في كل يد.', fr === 2 ? '<b>الأساور:</b> عريضة أو مجموعة متعددة.' : '<b>الأساور:</b> رفيعة أو متوسطة؛ تكديس 2–3 أساور ناعمة.'];
  return `<div class="adv"><div><h4>👜 الحقائب</h4>${bag.map(x => `<p>${x}</p>`).join('')}</div><div><h4>💎 المجوهرات والحُلي</h4>${jw.map(x => `<p>${x}</p>`).join('')}</div></div>`;
}
function beltAdvice() {
  const t = S.A.torso;
  return `<div class="callout">عرض الحزام الصحيح لكِ يعتمد على طول الجذع: ${t === 1 ? '<b>جذعك قصير</b> — حزام رفيع (1–2 سم) بلون التوب، أو بدون حزام مع قطع عالية الخصر.' : t === 2 ? '<b>جذعك طويل</b> — حزام عريض (5 سم فأكثر) أو أوبي أو كورسيه بلون القطعة السفلية لتقصير الجذع.' : t === 0 ? '<b>جذعك متناسب</b> — حزام متوسط (2.5–4 سم) ويمكنك تجربة كل الأعراض.' : 'حددي طول الجذع في التحليل لتظهر التوصية.'}${['O', 'D'].includes(S.shape) ? ' <br>مع شكل جسمك: ضعي الحزام تحت الصدر (إمباير) أو على الطبقة المفتوحة بدلاً من الخصر الطبيعي.' : ''}</div>`;
}
function printAdvice() {
  const T = tags(), fr = S.A.frame;
  const size = fr === 0 || T.has('pt') ? 0 : fr === 2 || T.has('tall') ? 2 : 1;
  const place = ['A', 'S'].includes(S.shape) ? 0 : ['V'].includes(S.shape) ? 1 : ['O', 'D'].includes(S.shape) ? 2 : 3;
  const rows = [['حجم النقوش الملائمة لكِ', ['صغيرة', 'متوسطة', 'كبيرة'], size], ['المسافة بين النقوش', ['متقاربة', 'متوسطة', 'متباعدة'], size], ['درجة التباين', ['هادئ متدرج', 'متوسط', 'عالٍ جريء'], size], ['أحجام النقاط (Dots)', ['صغيرة 2–5 مم', 'متوسطة 6–12 مم', 'كبيرة +12 مم'], size], ['أماكن النقوش وتركيز التفاصيل', ['الجزء العلوي', 'الجزء السفلي', 'الأطراف والطبقات الخارجية', 'كامل الجسم'], place]];
  return `<div class="prt">${rows.map((r, i) => { const key = 'pr' + i; if (S.x[key] == null && S.shape) S.x[key] = r[2]; return `<div class="prow"><b>${r[0]}</b>${chips('x', key, r[1])}</div>`; }).join('')}</div>`;
}

/* ── zoom modal ── */
function zoom(k) {
  const [cat, id] = k.split(':'), it = LIB[cat].find(x => x.id === id), sc = score(it);
  $('#zoom .zc').innerHTML = `<div class="zf">${svg(it, cat)}</div><div class="zt"><small>${it.en}</small><h3>${it.ar}</h3>${it.t ? '<span class="tr">TREND 25/26</span>' : ''}<p>${it.d}</p>
  ${sc.why.length ? `<div class="why ok"><b>✦ لماذا يناسبك</b>${sc.why.map(t => `<span>${TAG_AR[t]}</span>`).join('')}</div>` : ''}${sc.warn.length ? `<div class="why no"><b>⚠ انتبهي</b>${sc.warn.map(t => `<span>${TAG_AR[t]}</span>`).join('')}</div>` : ''}
  ${!sc.why.length && !sc.warn.length ? '<p class="mini">أكملي التحليل لتظهر أسباب الملاءمة.</p>' : ''}
  <div class="pk big"><button data-pick="${k}" data-v="y" class="${S.picks[k] === 'y' ? 'on' : ''}">✓ يناسبني</button><button data-pick="${k}" data-v="n" class="${S.picks[k] === 'n' ? 'on' : ''}">✕ أتجنّبه</button></div></div>`;
  $('#zoom').classList.add('open');
}

/* ── badges ── */
function refreshBadges() {
  const T = tags();
  $$('.it').forEach(el => {
    const [cat, id] = el.dataset.k.split(':'), it = (LIB[cat] || []).find(x => x.id === id); if (!it) return;
    const sc = score(it, T); el.dataset.rs = sc.st;
    const b = $('.badge', el); b.className = 'badge ' + sc.st; b.textContent = sc.st === 'rec' ? '✦ مقترح لكِ' : sc.st === 'avoid' ? 'غير مناسب' : '';
    const p = S.picks[el.dataset.k] || ''; el.classList.toggle('p-y', p === 'y'); el.classList.toggle('p-n', p === 'n');
  });
  $$('[data-lenbox]').forEach(b => b.innerHTML = lengthGuide(b.dataset.lenbox));
  const nk = $('#necklBox'); if (nk) nk.innerHTML = necklaceGuide();
  const ac = $('#accBox'); if (ac) ac.innerHTML = accessoryAdvice();
  const bl = $('#beltBox'); if (bl) bl.innerHTML = beltAdvice();
  const pr = $('#printBox'); if (pr) pr.innerHTML = printAdvice();
  renderTrends(T);
}
function renderTrends(T = tags()) {
  const el = $('#trendBox'); if (!el) return;
  el.innerHTML = TRENDS.map(([id, cat, ar, tip]) => { const it = LIB[cat].find(x => x.id === id); const sc = score(it, T); const lvl = !T.size ? '' : sc.st === 'rec' ? 'rec' : sc.st === 'avoid' ? 'avoid' : 'mid'; return `<div class="trd ${lvl}" data-zoom="${cat}:${id}"><div class="tfig">${svg(it, cat)}</div><div><b>${ar}</b><p>${tip}</p><span class="lvl">${lvl === 'rec' ? '✦ ترند مثالي لكِ' : lvl === 'avoid' ? 'جرّبيه بحذر أو بتعديل' : lvl === 'mid' ? 'يناسبك بالتنسيق الصحيح' : 'أكملي التحليل'}</span></div></div>`; }).join('');
}

/* ── report ── */
const CAT_AR = { bra: 'حمالات الصدر', panty: 'الملابس الداخلية', shapewear: 'المشدات', neck: 'قصات الرقبة', sleeve: 'الأكمام', top: 'التوبات', skirt: 'التنانير', dress: 'الفساتين', seam: 'قصات الخياطة', abaya: 'العبايات', pants: 'البناطيل', rise: 'ارتفاع الخصر', jeans: 'الجينز', shorts: 'الشورتات', jump: 'الجمبسوت', jacket: 'الجاكيتات', coat: 'المعاطف', fabric: 'الأقمشة', print: 'النقوش', bag: 'الحقائب', earring: 'الأقراط', nail: 'الأظافر', belt: 'الأحزمة', heel: 'الأحذية', strap: 'شريط الكاحل', bootLen: 'أطوال البوت', boot: 'البوتات' };
function renderReport() {
  const el = $('#reportBox'); if (!el) return;
  const c = S.client, sp = S.shape ? SHAPES[S.shape] : null, T = SHAPE_TXT[S.shape];
  const meas = MEAS.filter(m => S.M[m[0]]).map(m => `<div><small>${m[1]}</small><b>${fmt(S.M[m[0]])} سم</b></div>`).join('');
  const tg = [...tags()].filter(t => t.length > 1).map(t => `<span>${TAG_AR[t]}</span>`).join('');
  let picks = '';
  Object.keys(CAT_AR).forEach(cat => {
    const ys = LIB[cat].filter(it => S.picks[cat + ':' + it.id] === 'y'), ns = LIB[cat].filter(it => S.picks[cat + ':' + it.id] === 'n');
    if (!ys.length && !ns.length) return;
    picks += `<div class="rp"><h5>${CAT_AR[cat]}</h5><div class="rpy">${ys.map(it => `<div class="mini-it">${svg(it, cat)}<span>${it.ar}</span></div>`).join('')}</div>${ns.length ? `<div class="rpn"><b>تجنّبي:</b> ${ns.map(it => it.ar).join(' · ')}</div>` : ''}</div>`;
  });
  const lens = Object.keys(LENGTHS).map(k => { const sel = (S.x['len_' + k] || []).map(id => LENGTHS[k].find(l => l[0] === id)?.[1]).filter(Boolean); return sel.length ? `<div><small>أطوال ${({ skirt: 'التنانير والفساتين', pants: 'البناطيل', jacket: 'الجاكيتات والمعاطف', sleeve: 'الأكمام' })[k]}</small><b>${sel.join(' · ')}</b></div>` : ''; }).join('');
  const nks = (S.x.neckl || []).map(id => NECKLACES.find(n => n[0] === id)?.[1]).filter(Boolean);
  const notes = Object.entries(S.notes).filter(([k, v]) => v && v.trim()).map(([k, v]) => `<p><b>${({ profile: 'الملف الشخصي', map: 'القياسات', ana: 'التحليل', beauty: 'معاييري', found: 'التأسيس', upper: 'القطع العلوية', lower: 'القطع السفلية', dresses: 'الفساتين والعبايات', outer: 'الجاكيتات', fabric: 'الأقمشة والنقوش', acc: 'المكملات', shoes: 'الأحذية', trend: 'الترند' })[k] || k}:</b> ${esc(v)}</p>`).join('');
  el.innerHTML = `<div class="rep">
  <div class="rep-top">${LOGO_N}<div><small>BODY DNA PASSPORT · ملف DNA الخاص بكِ</small><h3>${esc(c.name || 'اسم العميلة')}</h3><p>${esc(c.date || '')} ${c.consultant ? '· المستشارة: ' + esc(c.consultant) : ''}</p></div></div>
  <div class="rep-grid"><div class="rep-shape">${sp ? `<svg viewBox="24 0 152 400">${shapeFig(sp.p)}</svg><b>${sp.ar}</b><i>${sp.en}</i>` : '<div class="empty">لم يُحدد الشكل بعد</div>'}</div>
  <div class="rep-main">${T ? `<div class="goal">🎯 ${T.goal}</div><p>${T.s}</p>` : ''}<div class="tagrow">${tg}</div>
  <h4>جواز المقاسات</h4>${sizePassport()}${lens || nks.length ? `<div class="passport">${lens}${nks.length ? `<div><small>أطوال العقود</small><b>${nks.join(' · ')}</b></div>` : ''}</div>` : ''}
  ${T ? `<h4>صيغ إطلالة جاهزة</h4><ol class="formula">${T.f.map(x => `<li>${x}</li>`).join('')}</ol>` : ''}</div></div>
  ${meas ? `<h4>القياسات المسجلة</h4><div class="passport small">${meas}</div>` : ''}
  <h4>اختياراتكِ المعتمدة</h4>${picks || '<div class="empty">لم تُسجَّل اختيارات بعد — استخدمي أزرار ✓ و✕ في كل قسم أو «تطبيق المقترحات».</div>'}
  ${notes ? `<h4>ملاحظات المستشارة</h4><div class="rnotes">${notes}</div>` : ''}
  ${Object.values(S.cnotes || {}).some(v => v && v.trim()) ? `<h4>💬 ملاحظات العميلة${S.clientAt ? ' <small class="mini">(وصلت ' + esc(S.clientAt.slice(0, 10)) + ')</small>' : ''}</h4><div class="rnotes c">${Object.entries(S.cnotes).filter(([k, v]) => v && v.trim()).map(([k, v]) => `<p><b>${k}:</b> ${esc(v)}</p>`).join('')}</div>` : ''}
  <div class="rep-foot">${helixSVG(30, 600, 6)}<span>DNA IMAGE · Enas Fashion — هذا الملف خاص بالعميلة ومبني على تحليل جلسة الاستشارة</span></div></div>`;
}

/* ── full update ── */
function update(full = false) {
  applyAuto(); renderMapOut(); renderAna(); renderBra(); renderCalc(); refreshBadges(); renderReport();
  $$('[data-st]').forEach(t => t.innerHTML = t.dataset.st === 'top' ? sizeTable('top') : t.dataset.st === 'bottom' ? sizeTable('bottom') : braTable());
  const nm = $('#hdrClient'); if (nm) nm.textContent = S.client.name || 'جلسة جديدة';
  save();
}
