/* ═════════════ DNA ONLINE — CLIENT APP ═════════════ */
const ME_KEY = 'dnaOnline.me';
const REQUIRED = ['height', 'bust', 'underbust', 'waist', 'hip'];
const STEP_MEAS = ['height', 'bust', 'underbust', 'waist', 'highhip', 'hip', 'shoulderW', 'torso', 'lower', 'neck', 'armLen', 'bicep', 'wrist', 'thigh', 'calf', 'ankle', 'foot'];
let REC, PRODUCTS = [], VIEW = 'welcome', MI = 0, TAB = 'me';
const meGet = () => { try { return JSON.parse(localStorage.getItem(ME_KEY)) || {}; } catch (e) { return {}; } };
const meSet = v => { try { localStorage.setItem(ME_KEY, JSON.stringify(v)); } catch (e) { } };
const blankRec = id => ({ id, status: 'draft', client: {}, profile: {}, x: {}, M: {}, unit: 'cm', A: {}, manual: {}, shape: null, shapeManual: false, picks: {}, notes: {}, createdAt: Date.now() });
const app = () => $('#app');
function persistLocal() { const me = meGet(); me.draft = REC; me.id = REC.id; me.token = REC.token; meSet(me); }
let pushT;
function persist(remote = false) { persistLocal(); if (remote) { clearTimeout(pushT); return API.saveRecord(REC).then(r => { REC.token = r.token; persistLocal(); }); } }

/* ── boot ── */
(async function boot() {
  const q = new URLSearchParams(location.search), code = (q.get('code') || '').trim().replace(/[^\w-]/g, '').slice(0, 40);
  const me = meGet();
  const id = code || me.id || 'c' + rid();
  REC = me.draft && me.draft.id === id ? me.draft : blankRec(id);
  if (me.token && me.id === id) REC.token = me.token;
  S = REC; // the shared rules engine reads the global S
  if (REC.token) { try { const r = await API.getRecord(REC.id, REC.token); if (r && (r.status === 'approved' || r.status === 'submitted')) { REC = r; S = REC; persistLocal(); } } catch (e) { } }
  try { PRODUCTS = await API.products(); } catch (e) { PRODUCTS = []; }
  VIEW = REC.status === 'approved' ? 'home' : REC.status === 'submitted' ? 'pending' : (REC.client.name ? 'wizard' : 'welcome');
  render();
})();

function render() {
  applyAuto();
  const v = { welcome: vWelcome, wizard: vWizard, pending: vPending, home: vHome }[VIEW]();
  app().innerHTML = v; window.scrollTo(0, 0);
  if (VIEW === 'wizard' && WSTEP === 1) { const i = $('#mIn'); i && i.focus({ preventScroll: true }); }
  $('#demoBadge').hidden = !DEMO;
}

/* ── welcome ── */
function vWelcome() {
  return `<section class="hero">${helixSVG(220, 1000, 4, 'hx big')}<div class="hero-in">${LOGO_W}<small>BODY DNA · ONLINE</small><h1>اكتشفي شيفرة<br><span>جسمكِ الخاصة</span></h1>
  <p>تحليل احترافي لشكل جسمكِ ومقاساتكِ بإشراف خبيرة DNA — ثم دليل كامل لكل ما يناسبكِ: من الملابس الداخلية حتى الحذاء والحقيبة، مع «العدسة» التي تحكم على أي قطعة قبل شرائها.</p>
  <ol class="how"><li><b>01</b>بياناتكِ وأسلوب حياتكِ</li><li><b>02</b>قياساتكِ خطوة بخطوة</li><li><b>03</b>تفاصيل جسمكِ</li><li><b>04</b>مراجعة الخبيرة ثم ملفكِ الكامل</li></ol>
  <button class="cta" data-go="start">ابدئي الآن</button><p class="fine">⏱ تقريباً 10 دقائق · جهّزي شريط قياس ناعم وملابس خفيفة</p></div></section>`;
}

/* ── wizard ── */
let WSTEP = 0;
const field = (k, l, t = 'text', ph = '') => `<label class="fld"><span>${l}</span><input type="${t}" data-c="${k}" value="${esc(REC.client[k] || '')}" placeholder="${ph}" ${t === 'number' ? 'inputmode="decimal"' : ''}></label>`;
function stepper() { const s = ['بياناتكِ', 'القياسات', 'التفاصيل', 'الإرسال']; return `<div class="stepper">${s.map((t, i) => `<div class="${i < WSTEP ? 'done' : i === WSTEP ? 'on' : ''}"><b>${i + 1}</b><span>${t}</span></div>`).join('')}</div>`; }
function vWizard() {
  let body = '';
  if (WSTEP === 0) body = `<h2>أخبرينا عنكِ</h2><div class="card">${field('name', 'الاسم', 'text', 'اسمكِ')}${field('age', 'العمر', 'number')}${field('phone', 'رقم الجوال (للتواصل)', 'tel', '05xxxxxxxx')}</div>
    <div class="card"><b class="q">نمط حياتكِ اليومي</b>${chips('x', 'life', ['عمل رسمي', 'عمل مرن', 'طالبة', 'أم ومنزل', 'مناسبات كثيرة', 'سفر', 'رياضة'], true)}
    <b class="q">أسلوبكِ</b>${chips('x', 'style', ['كلاسيك', 'ناعم رومانسي', 'مينيمال', 'عصري جريء', 'كاجوال', 'بوهو', 'محافظ أنيق'], true)}
    <b class="q">مستوى الاحتشام</b>${chips('x', 'modest', ['محتشم كامل', 'محتشم عصري', 'معتدل', 'منفتح'])}
    <b class="q">ما الذي تودين التركيز عليه؟</b>${chips('x', 'goals', ['إبراز الخصر', 'إطالة القامة', 'إخفاء البطن', 'موازنة الأرداف', 'تخفيف الأكتاف', 'إبراز الصدر', 'إطالة الساقين'], true)}</div>
    <div class="nav"><button class="cta" data-go="next" ${REC.client.name ? '' : 'disabled'}>التالي ←</button></div>`;
  if (WSTEP === 1) {
    const k = STEP_MEAS[MI], m = MEAS.find(x => x[0] === k), v = REC.M[k], req = REQUIRED.includes(k);
    const fig = figFocus(k);
    body = `<h2>قياساتكِ <small>${MI + 1} / ${STEP_MEAS.length}</small></h2><div class="prog"><i style="width:${(MI + 1) / STEP_MEAS.length * 100}%"></i></div>
    <div class="meas"><div class="mfig1">${fig}</div><div class="mcard"><small>${m[2]}${req ? ' · <em>أساسي</em>' : ' · اختياري'}</small><h3>${m[1]}</h3><p>${m[3]}</p>
    <div class="mrow"><input id="mIn" type="number" inputmode="decimal" step="0.1" data-mm="${k}" value="${v ? fmt(REC.unit === 'in' ? toIn(v) : v) : ''}" placeholder="0"><div class="seg">${['cm', 'in'].map(u => `<button data-unit="${u}" class="${REC.unit === u ? 'on' : ''}">${u === 'cm' ? 'سم' : 'إنش'}</button>`).join('')}</div></div>
    <div class="nav2"><button class="ghost" data-go="mprev" ${MI ? '' : 'disabled'}>→ السابق</button>${req ? '' : '<button class="ghost" data-go="mskip">تخطّي</button>'}<button class="cta" data-go="mnext" ${req && !v ? 'disabled' : ''}>${MI === STEP_MEAS.length - 1 ? 'إنهاء القياسات' : 'التالي ←'}</button></div></div></div>
    <div class="nav"><button class="ghost" data-go="back">→ بياناتكِ</button></div>`;
  }
  if (WSTEP === 2) body = `<h2>تفاصيل جسمكِ</h2><p class="lead2">اخترنا لكِ مبدئياً حسب قياساتكِ (●). عدّلي ما تشعرين أنه لا يصفكِ — الخبيرة ستراجع كل شيء.</p>
    <div class="anaG">${ANA.map(g => `<div class="card"><b class="q">${g.t}</b>${chips('A', g.k, g.o)}</div>`).join('')}</div>
    <div class="nav"><button class="ghost" data-go="back">→ القياسات</button><button class="cta" data-go="next">التالي ←</button></div>`;
  if (WSTEP === 3) {
    const miss = REQUIRED.filter(k => !REC.M[k]);
    body = `<h2>مراجعة وإرسال</h2><div class="card sum">${MEAS.filter(m => REC.M[m[0]]).map(m => `<div><small>${m[1]}</small><b>${fmt(REC.M[m[0]])} سم</b></div>`).join('')}</div>
    ${miss.length ? `<p class="warn">⚠ ينقص: ${miss.map(k => MEAS.find(m => m[0] === k)[1]).join('، ')}</p>` : ''}
    <div class="card"><label class="consent"><input type="checkbox" id="consent" ${REC.consent ? 'checked' : ''}> أوافق على حفظ قياساتي وبياناتي لغرض تحليل جسمي ومراجعتها من خبيرة DNA فقط.</label>
    <label class="fld"><span>رسالة للخبيرة (اختياري)</span><textarea data-c="msg" placeholder="مثلاً: مناسبة قادمة، قطع أحبها، أشياء تزعجني في المقاسات…">${esc(REC.client.msg || '')}</textarea></label></div>
    <div class="nav"><button class="ghost" data-go="back">→ التفاصيل</button><button class="cta" data-go="submit" ${miss.length ? 'disabled' : ''}>إرسال ملفي للمراجعة ✓</button></div>`;
  }
  return `<header class="bar">${LOGO_N}<span>${esc(REC.client.name || 'رحلة DNA')}</span></header><main class="wiz">${stepper()}${body}</main>`;
}

/* ── pending ── */
function vPending() {
  return `<header class="bar">${LOGO_N}<span>${esc(REC.client.name || '')}</span></header><main class="wiz center">
  <div class="pend">${helixSVG(80, 400, 3)}<h2>ملفكِ قيد المراجعة</h2><p>وصل ملفكِ لخبيرة DNA وتتم مراجعة تحليلكِ يدوياً. ستصلكِ النتيجة الكاملة هنا فور اعتمادها.</p>
  <ol class="tl"><li class="done">✓ استلام البيانات والقياسات</li><li class="on">● مراجعة الخبيرة للتحليل</li><li>اعتماد ملف DNA الكامل</li></ol>
  <button class="cta" data-go="refresh">تحديث الحالة ↻</button><button class="ghost" data-go="edit">تعديل بياناتي قبل المراجعة</button></div></main>`;
}

const figFocus = k => { const g = (MEAS.find(m => m[0] === k) || [])[4] || {}; let svg = mapFigure().replace(new RegExp(`class="ml ([^"]*)" data-focus="${k}"`), `class="ml $1 focus" data-focus="${k}"`); const y = g.h ?? (g.arm ? 196 : g.bicep ? 112 : g.armL ? 138 : null); if (y != null) svg = svg.replace('viewBox="-30 -6 260 410"', `viewBox="-30 ${Math.max(-6, Math.min(224, y - 95))} 260 190"`); return svg; };

/* ── home (approved) ── */
const TABS = [['me', 'ملفي', '◎'], ['cuts', 'القصات', '✂'], ['lens', 'العدسة', '⌾'], ['shop', 'التسوق', '🛍'], ['sizes', 'المقاسات', '📏']];
function vHome() {
  const tab = { me: tMe, cuts: tCuts, lens: tLens, shop: tShop, sizes: tSizes }[TAB]();
  return `<header class="bar">${LOGO_N}<span>${esc(REC.client.name || '')}</span><button class="ico" data-go="report">⎙</button></header><main class="home">${tab}</main>
  <nav class="tabs">${TABS.map(t => `<button class="${TAB === t[0] ? 'on' : ''}" data-tab="${t[0]}"><i>${t[2]}</i>${t[1]}</button>`).join('')}</nav>`;
}
const EFF = () => effective(REC);
function tMe() {
  const e = EFF(), sp = SHAPES[e.shape], T = SHAPE_TXT[e.shape], tg = [...tagsFor(e)].filter(t => t.length > 1);
  return `<section class="me-hero"><div class="mfig2"><svg viewBox="24 0 152 400">${shapeFig(sp.p)}</svg></div><div><small>شكل جسمكِ</small><h2>${sp.ar}<i>${sp.en}</i></h2><div class="goal">🎯 ${T.goal}</div></div></section>
  ${REC.review?.msg ? `<div class="card msg"><b>💬 رسالة خبيرتكِ</b><p>${esc(REC.review.msg)}</p></div>` : ''}
  <div class="card"><h3>استراتيجيتكِ</h3><p>${T.s}</p><div class="tagrow">${tg.map(t => `<span>${TAG_AR[t]}</span>`).join('')}</div></div>
  <div class="card"><h3>صيغ إطلالة جاهزة</h3><ol class="formula">${T.f.map(x => `<li>${x}</li>`).join('')}</ol></div>
  <div class="card"><h3>أطوالكِ المثالية</h3>${['skirt', 'pants', 'sleeve', 'jacket'].map(k => `<div class="lenrow"><small>${({ skirt: 'التنانير والفساتين', pants: 'البناطيل', sleeve: 'الأكمام', jacket: 'الجاكيتات' })[k]}</small><b>${bestLen(k, tagsFor(e)).join(' · ') || 'كل الأطوال المتوازنة'}</b></div>`).join('')}</div>
  <button class="cta wide" data-tab="lens">جربي «العدسة» على قطعة الآن ⌾</button>`;
}
let CUTG = 0;
function tCuts() {
  const e = EFF(), T = tagsFor(e), [gname, cats] = GROUPS[CUTG];
  return `<div class="gtabs">${GROUPS.map((g, i) => `<button class="${i === CUTG ? 'on' : ''}" data-cg="${i}">${g[0]}</button>`).join('')}</div>
  ${cats.map(c => { const list = LIB[c].map(it => ({ it, v: verdict(c, it, T, e) })), rec = list.filter(x => x.v.st === 'rec'), av = list.filter(x => x.v.st === 'avoid');
    return `<section class="card"><h3>${CAT_LABEL[c]}</h3>${rec.length ? `<div class="mgrid">${rec.map(x => `<button class="mit" data-z="${c}:${x.it.id}"><svg viewBox="${VB[x.it.v || DEFV[c]] || VB.top}">${x.it.s()}</svg><span>${x.it.ar}</span>${x.it.t ? '<em>ترند</em>' : ''}</button>`).join('')}</div>` : '<p class="mini">لا توجد قطعة مميزة هنا — اختاري القصات المتوازنة.</p>'}
    ${av.length ? `<p class="avoid"><b>تجنّبي:</b> ${av.map(x => x.it.ar).join(' · ')}</p>` : ''}</section>`; }).join('')}`;
}
function tSizes() {
  return `<div class="card"><h3>جواز مقاساتكِ</h3>${sizePassport()}</div>${D.bra ? `<div class="card"><h3>حمالة الصدر</h3><div class="bra1"><b>${D.bra.uk}</b><span>UK/US · ${D.bra.euS} EU · ${D.bra.fr} FR</span></div><p class="mini">المقاسات الشقيقة: ${D.bra.sister.join(' · ')}</p></div>` : ''}
  <div class="card"><h3>قياساتكِ المسجلة</h3><div class="sum">${MEAS.filter(m => REC.M[m[0]]).map(m => `<div><small>${m[1]}</small><b>${fmt(REC.M[m[0]])} سم</b></div>`).join('')}</div><p class="mini">💡 أعيدي القياس كل 6 أشهر أو عند تغيّر وزنكِ أكثر من 5 كجم.</p></div>`;
}
function prodCard(p) { return `<a class="prod" href="${esc(p.url)}" target="_blank" rel="noopener">${p.img ? `<img src="${esc(p.img)}" alt="" loading="lazy">` : `<svg viewBox="${VB[DEFV[p.cat]] || VB.top}">${(LIB[p.cat].find(i => i.id === p.item) || LIB.top[0]).s()}</svg>`}<b>${esc(p.name)}</b><small>${esc(p.store || '')}${p.price ? ' · ' + esc(p.price) : ''}</small></a>`; }
function tShop() {
  const e = EFF(), T = tagsFor(e), ok = PRODUCTS.filter(p => LIB[p.cat] && LIB[p.cat].some(it => it.id === p.item && verdict(p.cat, it, T, e).st === 'rec'));
  if (!ok.length) return `<div class="card center"><h3>مختارات المتاجر</h3><p>قريباً تظهر هنا منتجات مختارة من المتاجر تناسب قصاتكِ بالضبط.</p></div>`;
  const by = {}; ok.forEach(p => (by[p.cat] = by[p.cat] || []).push(p));
  return Object.entries(by).map(([c, ps]) => `<section class="card"><h3>${CAT_LABEL[c]}</h3><div class="pgrid">${ps.map(prodCard).join('')}</div></section>`).join('');
}

/* ── lens ── */
let LENS = { img: null, a: null, busy: false, err: '' };
function tLens() {
  const e = EFF(), T = tagsFor(e);
  let html = `<section class="card lens-in"><h3>⌾ العدسة</h3><p>صوّري القطعة أو ارفعي صورتها، وسأخبركِ هل تناسبكِ وأي جزء منها لا يناسب، مع تنسيقات ترند لها.</p>
  <div class="lbtns"><label class="cta">📷 تصوير القطعة<input type="file" accept="image/*" capture="environment" data-lens hidden></label><label class="ghost big">🖼 رفع صورة<input type="file" accept="image/*" data-lens hidden></label></div>
  <p class="mini">💡 صوّري القطعة كاملة على خلفية فاتحة أو على المانيكان. الصورة تُستخدم للتحليل فقط ولا تُحفظ.</p></section>`;
  if (LENS.img) html += `<div class="card lens-photo"><img src="${LENS.img}" alt="">${LENS.busy ? '<div class="scan"><i></i><span>جارٍ تحليل القطعة…</span></div>' : ''}</div>`;
  if (LENS.err) html += `<p class="warn">${LENS.err}</p>`;
  if (LENS.img && !LENS.busy) {
    const a = LENS.a || {};
    html += `<section class="card"><h3>${LENS.a?.ai ? 'ما تعرّفت عليه — صحّحي إن لزم' : 'حدّدي تفاصيل القطعة'}</h3>${LENS.a?.desc ? `<p class="mini">${esc(LENS.a.desc)}</p>` : ''}
    ${pickRow('garment_type', 'نوع القطعة', GTYPES.map(g => [g[0], g[1]]), a.garment_type)}
    ${!['skirt', 'pants', 'jeans', 'shorts'].includes((GTYPES.find(g => g[0] === a.garment_type) || [])[2]) ? pickRow('neckline', 'قصة الرقبة', [['none', 'لا ينطبق'], ...LIB.neck.map(i => [i.id, i.ar])], a.neckline, 'neck') + pickRow('sleeve_type', 'نوع الكم', [['none', 'بدون'], ...LIB.sleeve.map(i => [i.id, i.ar])], a.sleeve_type, 'sleeve') + pickRow('sleeve_length', 'طول الكم', SLEN_ENUM, a.sleeve_length) : ''}
    ${pickRow('length', 'طول القطعة', LEN_ENUM, a.length)}
    ${a.garment_type ? pickRow('silhouette', 'القصة الأقرب', [['none', 'غير متأكدة'], ...LIB[(GTYPES.find(g => g[0] === a.garment_type) || [])[2] || 'top'].map(i => [i.id, i.ar])], a.silhouette, (GTYPES.find(g => g[0] === a.garment_type) || [])[2]) : ''}
    ${pickRow('fabric', 'الخامة', [['unknown', 'لا أعرف'], ...LIB.fabric.map(i => [i.id, i.ar])], a.fabric)}${pickRow('print', 'النقشة', [['solid', 'سادة'], ...LIB.print.map(i => [i.id, i.ar])], a.print)}</section>`;
    if (a.garment_type) {
      const j = judge(a, T, e);
      html += `<section class="card verdict ${j.overall[0]}"><h2>${j.overall[1]}</h2>${j.rows.map(r => `<div class="vrow ${r.v.st}"><span class="vi">${r.v.st === 'rec' ? '✓' : r.v.st === 'avoid' ? '✕' : '●'}</span><div><b>${r.part}: ${r.it ? r.it.ar : r.lenRow[1]}</b>
        ${r.v.why?.length ? `<small class="ok">يناسب: ${r.v.why.map(t => TAG_AR[t]).join('، ')}</small>` : ''}${r.v.warn?.length ? `<small class="no">لا يناسب: ${r.v.warn.map(t => TAG_AR[t]).join('، ')}</small>` : ''}
        ${r.v.st === 'avoid' ? `<p>💡 ${r.fix}${r.best?.length ? ` الأنسب لكِ: <b>${r.best.join(' أو ')}</b>.` : ''}</p>` : ''}</div></div>`).join('')}</section>`;
      if (j.overall[0] !== 'avoid') {
        const outs = outfits(j.cat, T, e, PRODUCTS);
        html += `<section class="card"><h3>✨ تنسيقات ترند لهذه القطعة</h3>${outs.map((o, i) => `<div class="outfit"><div class="oi"><img src="${LENS.img}" alt=""><small>قطعتكِ</small></div>${o.map(s => s.prod ? prodCard(s.prod) : `<button class="mit" data-z="${s.lib.c}:${s.lib.it.id}"><svg viewBox="${VB[s.lib.it.v || DEFV[s.lib.c]] || VB.top}">${s.lib.it.s()}</svg><span>${s.lib.it.ar}</span></button>`).join('')}<b class="on">${i + 1}</b></div>`).join('')}</section>`;
      }
    }
  }
  return html;
}
function pickRow(key, label, opts, cur, cat) {
  return `<div class="prow2"><b>${label}</b><div class="pscroll">${opts.map(([id, ar]) => { const it = cat && LIB[cat] ? LIB[cat].find(i => i.id === id) : null; return `<button class="pk2 ${cur === id ? 'on' : ''}" data-lk="${key}" data-lv="${id}">${it ? `<svg viewBox="${VB[it.v || DEFV[cat]] || VB.top}">${it.s()}</svg>` : ''}<span>${ar}</span></button>`; }).join('')}</div></div>`;
}
async function lensFile(file) {
  LENS = { img: null, a: null, busy: true, err: '' };
  const img = await downscale(file, 1024); LENS.img = img.dataUrl; render();
  try {
    const en = lensEnums();
    const r = await API.lens({ id: REC.id, token: REC.token, image: img.b64, media_type: 'image/jpeg', enums: en });
    LENS.a = { ...r.analysis, desc: r.analysis.description_ar, ai: true };
  } catch (e) { LENS.a = {}; LENS.err = DEMO || e.message === 'demo' ? 'وضع التجربة: التحليل الآلي يعمل بعد ربط الخادم — حددي تفاصيل القطعة يدوياً بالأسفل وسيحكم النظام عليها.' : (/daily/.test(e.message) ? 'وصلتِ للحد اليومي للعدسة — ' : 'تعذّر التحليل الآلي الآن — ') + 'حددي تفاصيل القطعة يدوياً بالأسفل.'; }
  LENS.busy = false; render();
}
function downscale(file, max) {
  return new Promise((res, rej) => { const fr = new FileReader(); fr.onload = () => { const im = new Image(); im.onload = () => { const k = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement('canvas'); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); const dataUrl = c.toDataURL('image/jpeg', .85); res({ dataUrl, b64: dataUrl.split(',')[1] }); }; im.onerror = rej; im.src = fr.result; }; fr.onerror = rej; fr.readAsDataURL(file); });
}

/* ── zoom ── */
function zoomItem(k) {
  const [c, id] = k.split(':'), it = LIB[c].find(x => x.id === id), v = verdict(c, it, tagsFor(EFF()), EFF());
  $('#zoom .zc').innerHTML = `<div class="zf"><svg viewBox="${VB[it.v || DEFV[c]] || VB.top}">${it.s()}</svg></div><div class="zt"><small>${it.en}</small><h3>${it.ar}</h3><p>${it.d}</p>${v.why.length ? `<p class="ok">✦ يناسبكِ لأن: ${v.why.map(t => TAG_AR[t]).join('، ')}</p>` : ''}${v.manual ? '<p class="mini">✓ اختيار خبيرتكِ</p>' : ''}<p class="mini">ابحثي عنها في المتاجر باسم: <b>${it.en}</b></p></div>`;
  $('#zoom').classList.add('open');
}

/* ── events ── */
document.addEventListener('click', async e => {
  const t = e.target.closest('button, [data-z]'); if (!t) { if (e.target.id === 'zoom') $('#zoom').classList.remove('open'); return; }
  const g = t.dataset.go;
  if (g === 'start') { VIEW = 'wizard'; WSTEP = 0; return render(); }
  if (g === 'next') { WSTEP++; persist(); return render(); }
  if (g === 'back') { WSTEP--; return render(); }
  if (g === 'mnext') { if (MI < STEP_MEAS.length - 1) MI++; else WSTEP = 2; persist(); return render(); }
  if (g === 'mprev') { MI = Math.max(0, MI - 1); return render(); }
  if (g === 'mskip') { delete REC.M[STEP_MEAS[MI]]; if (MI < STEP_MEAS.length - 1) MI++; else WSTEP = 2; return render(); }
  if (g === 'submit') { if (!$('#consent').checked) return flash('يرجى الموافقة على حفظ البيانات أولاً'); REC.consent = true; REC.status = 'submitted'; REC.submittedAt = Date.now(); t.disabled = true; try { await persist(true); VIEW = 'pending'; render(); } catch (er) { REC.status = 'draft'; t.disabled = false; flash('تعذّر الإرسال — تحققي من الاتصال وحاولي مجدداً'); } return; }
  if (g === 'refresh') { try { const r = await API.getRecord(REC.id, REC.token); REC = r; S = REC; persistLocal(); if (r.status === 'approved') { VIEW = 'home'; TAB = 'me'; flash('ملفكِ جاهز ✨'); } else flash('ما زال قيد المراجعة'); render(); } catch (er) { flash('تعذّر التحديث'); } return; }
  if (g === 'edit') { REC.status = 'draft'; await persist(true).catch(() => { }); VIEW = 'wizard'; WSTEP = 0; return render(); }
  if (g === 'report') return window.print();
  if (t.dataset.unit) { REC.unit = t.dataset.unit; return render(); }
  if (t.dataset.tab) { TAB = t.dataset.tab; render(); if (TAB === 'shop' || TAB === 'lens') API.products().then(p => { const ch = JSON.stringify(p) !== JSON.stringify(PRODUCTS); PRODUCTS = p; if (ch && TAB === 'shop') render(); }).catch(() => { }); return; }
  if (t.dataset.cg) { CUTG = +t.dataset.cg; return render(); }
  if (t.dataset.z) return zoomItem(t.dataset.z);
  if (t.dataset.lk) { LENS.a = LENS.a || {}; LENS.a[t.dataset.lk] = t.dataset.lv; if (t.dataset.lk === 'garment_type') LENS.a.silhouette = 'none'; const y = scrollY; render(); scrollTo(0, y); return; }
  if (t.classList.contains('chip')) { const box = t.closest('.chips'), st = box.dataset.store, k = box.dataset.key, i = +t.dataset.i; if (box.dataset.multi === '1') { const a = REC[st][k] = REC[st][k] || []; const j = a.indexOf(i); j < 0 ? a.push(i) : a.splice(j, 1); t.classList.toggle('on'); } else { REC[st][k] = REC[st][k] === i ? null : i; if (st === 'A') REC.manual[k] = true; $$('.chip', box).forEach(b => b.classList.toggle('on', REC[st][k] === +b.dataset.i)); } persist(); return; }
  if (t.id === 'zClose') $('#zoom').classList.remove('open');
});
document.addEventListener('input', e => {
  const t = e.target;
  if (t.dataset.c) { REC.client[t.dataset.c] = t.value; persist(); const n = $('[data-go="next"]'); if (n && t.dataset.c === 'name') n.disabled = !t.value.trim(); }
  if (t.dataset.mm) { const v = parseFloat(t.value); REC.M[t.dataset.mm] = isNaN(v) || v <= 0 ? undefined : (REC.unit === 'in' ? v * IN : v); persist(); const n = $('[data-go="mnext"]'); if (n && REQUIRED.includes(t.dataset.mm)) n.disabled = !REC.M[t.dataset.mm]; const f = $('.mfig1'); if (f) { applyAuto(); f.innerHTML = figFocus(t.dataset.mm); } }
});
document.addEventListener('change', e => { if (e.target.dataset.lens !== undefined && e.target.files[0]) lensFile(e.target.files[0]); });
document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.id === 'mIn') { const n = $('[data-go="mnext"]'); n && !n.disabled && n.click(); } if (e.key === 'Escape') $('#zoom').classList.remove('open'); });
