/* ═════════════ DNA STUDIO — consultant's hidden review page ═════════════ */
let SV = 'inbox', LIST = [], CUR = null, PRODS = [], FILTER = 'submitted';
const ST_AR = { draft: 'مسودة', submitted: 'بانتظار المراجعة', approved: 'معتمد' };
const sapp = () => $('#app');
async function load() {
  try { LIST = await API.list(); } catch (e) { LIST = []; flash('تعذّر جلب الملفات: ' + e.message); }
  try { PRODS = await API.products(); } catch (e) { PRODS = []; }
  srender();
}
function srender() {
  const v = SV === 'review' ? vReview() : SV === 'products' ? vProducts() : SV === 'settings' ? vSettings() : vInbox();
  sapp().innerHTML = `<header class="sbar">${LOGO_N}<b>DNA STUDIO</b><nav>${[['inbox', 'الملفات'], ['products', 'منتجات المتاجر'], ['settings', 'الإعدادات']].map(([k, l]) => `<button class="${SV === k || (SV === 'review' && k === 'inbox') ? 'on' : ''}" data-sv="${k}">${l}</button>`).join('')}</nav>${DEMO ? '<em class="demo">وضع التجربة</em>' : ''}</header><main class="smain">${v}</main>`;
}
function vInbox() {
  const rows = LIST.filter(r => FILTER === 'all' || r.status === FILTER).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  const cnt = s => LIST.filter(r => r.status === s).length;
  return `<div class="shead"><h2>ملفات العميلات</h2><div class="seg">${[['submitted', `بانتظار المراجعة (${cnt('submitted')})`], ['approved', `معتمدة (${cnt('approved')})`], ['draft', `مسودات (${cnt('draft')})`], ['all', 'الكل']].map(([k, l]) => `<button class="${FILTER === k ? 'on' : ''}" data-f="${k}">${l}</button>`).join('')}</div><button class="ghost" data-act="reload">↻ تحديث</button></div>
  ${rows.length ? `<div class="slist">${rows.map(r => `<button class="srow" data-open="${r.id}"><b>${esc(r.name || 'بدون اسم')}</b><small>${r.id}</small><span class="st ${r.status}">${ST_AR[r.status] || r.status}</span><span>${r.shape ? SHAPES[r.shape].ar : '—'}</span><small>${r.updatedAt ? new Date(r.updatedAt).toLocaleString('ar') : ''}</small></button>`).join('')}</div>` : '<div class="empty">لا توجد ملفات هنا.</div>'}`;
}
function sChips(key, opts, cur, sys) { return `<div class="chips" data-ra="${key}">${opts.map((o, i) => `<button class="chip ${cur === i ? 'on' : ''} ${sys === i ? 'auto' : ''}" data-i="${i}">${o[0]}</button>`).join('')}</div>`; }
function vReview() {
  const R = CUR; if (!R) return '';
  S = R; const Dd = derive(R.M); D = Dd;
  R.review = R.review || { A: {}, picks: {} };
  const sysA = { ...R.A }; for (const [g, k] of Object.entries(AUTO_MAP)) if (!R.manual?.[g] && Dd[k] != null) sysA[g] = Dd[k];
  const e = { shape: R.review.shape || R.shape || Dd.shape, A: { ...sysA, ...R.review.A }, picks: R.review.picks }, T = tagsFor(e);
  const lab = (k, arr) => (R.x?.[k] || []).map(i => arr[i]).filter(Boolean).join('، ') || '—';
  return `<div class="shead"><button class="ghost" data-sv="inbox">→ الملفات</button><h2>${esc(R.client?.name || '')} <small class="st ${R.status}">${ST_AR[R.status]}</small></h2>
  <div class="acts"><button class="ghost" data-act="save">حفظ</button><button class="ghost" data-act="return">إعادة للعميلة للتعديل</button><button class="cta" data-act="approve">✓ اعتماد ونشر الملف</button></div></div>
  <div class="rgrid"><section class="card"><h3>بيانات العميلة</h3><p>📞 ${esc(R.client?.phone || '—')} · العمر ${esc(R.client?.age || '—')}</p><p><b>نمط الحياة:</b> ${lab('life', ['عمل رسمي', 'عمل مرن', 'طالبة', 'أم ومنزل', 'مناسبات كثيرة', 'سفر', 'رياضة'])}</p><p><b>الأسلوب:</b> ${lab('style', ['كلاسيك', 'ناعم رومانسي', 'مينيمال', 'عصري جريء', 'كاجوال', 'بوهو', 'محافظ أنيق'])}</p><p><b>الأهداف:</b> ${lab('goals', ['إبراز الخصر', 'إطالة القامة', 'إخفاء البطن', 'موازنة الأرداف', 'تخفيف الأكتاف', 'إبراز الصدر', 'إطالة الساقين'])}</p>${R.client?.msg ? `<p class="cmsg">💬 ${esc(R.client.msg)}</p>` : ''}</section>
  <section class="card"><h3>القياسات <small>(قابلة للتعديل)</small></h3><div class="mgrid2">${MEAS.map(m => `<label><span>${m[1]}</span><input type="number" step="0.1" data-rm="${m[0]}" value="${R.M[m[0]] ? fmt(R.M[m[0]]) : ''}"></label>`).join('')}</div></section></div>
  <section class="card"><h3>🧮 حسابات النظام</h3>${Dd.calc.length ? `<div class="tbl-wrap"><table class="tbl calc-t"><thead><tr><th>الاستنتاج</th><th>القيم</th><th>الحدود</th><th>النتيجة</th><th>الأساس</th></tr></thead><tbody>${Dd.calc.map(r => `<tr><td><b>${r[0]}</b></td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td class="res">${esc(r[3])}</td><td class="src">${esc(r[4])}</td></tr>`).join('')}</tbody></table></div>` : '<p>لا توجد قياسات كافية.</p>'}</section>
  <section class="card"><h3>شكل الجسم ${Dd.shape ? `<small>— النظام: ${SHAPES[Dd.shape].ar}${Dd.shapeSub ? ' (' + Dd.shapeSub + ')' : ''}</small>` : ''}</h3><div class="shapes">${Object.entries(SHAPES).map(([k, v]) => `<button class="shp ${e.shape === k ? 'on' : ''}" data-rs="${k}"><svg viewBox="40 0 120 400">${shapeFig(v.p, false)}</svg><b>${v.ar}</b>${Dd.shape === k ? '<em>النظام</em>' : ''}</button>`).join('')}</div></section>
  <section class="card"><h3>التفاصيل <small>(● اختيار النظام/العميلة — عدّلي للاعتماد)</small></h3><div class="ana">${ANA.map(g => `<div class="ag"><b>${g.t}</b>${sChips(g.k, g.o, e.A[g.k], sysA[g.k])}</div>`).join('')}</div></section>
  <section class="card"><h3>القصات <small>اضغطي على القطعة: مقترح النظام ← ✓ اعتماد ← ✕ استبعاد ← رجوع للنظام</small></h3>${GROUPS.map(([gn, cats]) => `<h4>${gn}</h4>${cats.map(c => `<div class="crow"><b>${CAT_LABEL[c]}</b><div>${LIB[c].map(it => { const sc = score(it, T), p = e.picks[c + ':' + it.id]; return `<button class="ic ${p ? 'p-' + p : sc.st}" data-pk="${c}:${it.id}" title="${esc(it.d)}">${p === 'y' ? '✓ ' : p === 'n' ? '✕ ' : sc.st === 'rec' ? '✦ ' : ''}${it.ar}</button>`; }).join('')}</div></div>`).join('')}`).join('')}</section>
  <section class="card"><h3>رسالة للعميلة</h3><textarea data-rmsg rows="4" placeholder="تظهر في أعلى ملفها: ملاحظات شخصية، نصائح، تنبيهات…">${esc(R.review.msg || '')}</textarea></section>
  <div class="acts end"><button class="ghost danger" data-act="del">حذف الملف</button><button class="cta" data-act="approve">✓ اعتماد ونشر الملف</button></div>`;
}
function vSettings() {
  return `<div class="shead"><h2>الإعدادات</h2></div><section class="card"><h3>الاتصال بالخادم</h3>
  <p>${DEMO ? '⚠ <b>وضع التجربة:</b> الخادم غير مربوط — الملفات محفوظة في هذا المتصفح فقط، والعدسة تعمل بالإدخال اليدوي. افتحي صفحة العميلة في نفس المتصفح للتجربة.' : '✓ مربوط بالخادم: <code dir="ltr">' + esc(DNA_API) + '</code>'}</p>
  <label class="fld"><span>مفتاح الإدارة (ADMIN_KEY الذي وضعتِه في الخادم)</span><input type="password" id="akey" value="${esc(API.adminKey())}" dir="ltr"></label><button class="cta" data-act="savekey">حفظ المفتاح على هذا الجهاز</button>
  <p class="mini">المفتاح يُحفظ على جهازكِ فقط. لا تشاركيه، ولا ترسلي مفتاح الذكاء الاصطناعي لأحد — مكانه إعدادات الخادم فقط.</p></section>`;
}
let PCAT = 'top';
function vProducts() {
  const cats = Object.keys(CAT_LABEL).filter(c => c !== 'seam' && c !== 'bootLen');
  return `<div class="shead"><h2>منتجات المتاجر</h2><p class="mini">المنتجات تظهر للعميلة فقط إذا كانت قصتها مناسبة لها، وتُستخدم في تنسيقات العدسة.</p></div>
  <section class="card"><h3>إضافة منتج</h3><div class="pform">
  <label class="fld"><span>اسم المنتج</span><input id="pName"></label><label class="fld"><span>المتجر</span><input id="pStore"></label>
  <label class="fld"><span>رابط المنتج</span><input id="pUrl" dir="ltr" placeholder="https://"></label><label class="fld"><span>رابط الصورة (اختياري)</span><input id="pImg" dir="ltr" placeholder="https://"></label>
  <label class="fld"><span>السعر</span><input id="pPrice" placeholder="299 ر.س"></label>
  <label class="fld"><span>القسم</span><select id="pCat">${cats.map(c => `<option value="${c}" ${c === PCAT ? 'selected' : ''}>${CAT_LABEL[c]}</option>`).join('')}</select></label>
  <label class="fld"><span>القصة المطابقة</span><select id="pItem">${LIB[PCAT].map(i => `<option value="${i.id}">${i.ar} — ${i.en}</option>`).join('')}</select></label></div>
  <button class="cta" data-act="addp">+ إضافة المنتج</button></section>
  <section class="card"><h3>المنتجات (${PRODS.length})</h3>${PRODS.length ? `<div class="plist">${PRODS.map((p, i) => `<div class="prow"><b>${esc(p.name)}</b><span>${esc(p.store || '')}</span><span>${CAT_LABEL[p.cat]} · ${(LIB[p.cat].find(x => x.id === p.item) || {}).ar || ''}</span><a href="${esc(p.url)}" target="_blank" rel="noopener">فتح</a><button class="ghost danger" data-delp="${i}">حذف</button></div>`).join('')}</div>` : '<div class="empty">لا توجد منتجات بعد.</div>'}</section>`;
}
async function saveCur(msg) { CUR.updatedAt = Date.now(); await API.adminPut(CUR); const i = LIST.findIndex(r => r.id === CUR.id); const sum = { id: CUR.id, name: CUR.client?.name, status: CUR.status, updatedAt: CUR.updatedAt, shape: CUR.review?.shape || CUR.shape }; i < 0 ? LIST.push(sum) : LIST[i] = sum; flash(msg); }
document.addEventListener('click', async e => {
  const t = e.target.closest('button'); if (!t) return;
  if (t.dataset.sv) { SV = t.dataset.sv; return srender(); }
  if (t.dataset.f) { FILTER = t.dataset.f; return srender(); }
  if (t.dataset.open) { try { CUR = await API.adminGet(t.dataset.open); SV = 'review'; srender(); } catch (er) { flash('تعذّر فتح الملف'); } return; }
  const a = t.dataset.act;
  if (a === 'reload') return load();
  if (a === 'save') return saveCur('تم الحفظ');
  if (a === 'approve') { if (!(CUR.review?.shape || CUR.shape || derive(CUR.M).shape)) return flash('حددي شكل الجسم قبل الاعتماد'); CUR.review.shape = CUR.review.shape || CUR.shape || derive(CUR.M).shape; CUR.status = 'approved'; CUR.review.approvedAt = Date.now(); await saveCur('تم اعتماد الملف ونشره للعميلة ✓'); return srender(); }
  if (a === 'return') { CUR.status = 'draft'; await saveCur('أُعيد الملف للعميلة'); return srender(); }
  if (a === 'del') { if (!confirm('حذف ملف هذه العميلة نهائياً؟')) return; await API.adminDelete(CUR.id); LIST = LIST.filter(r => r.id !== CUR.id); CUR = null; SV = 'inbox'; return srender(); }
  if (a === 'savekey') { try { localStorage.setItem('dnaOnline.adminKey', $('#akey').value.trim()); } catch (er) { } flash('تم الحفظ'); return load(); }
  if (a === 'addp') { const p = { id: rid(), name: $('#pName').value.trim(), store: $('#pStore').value.trim(), url: $('#pUrl').value.trim(), img: $('#pImg').value.trim(), price: $('#pPrice').value.trim(), cat: $('#pCat').value, item: $('#pItem').value }; if (!p.name || !/^https?:\/\//.test(p.url)) return flash('أدخلي الاسم ورابطاً صحيحاً'); if (p.img && !/^https?:\/\//.test(p.img)) p.img = ''; PRODS.push(p); await API.putProducts(PRODS); flash('أضيف المنتج'); return srender(); }
  if (t.dataset.delp) { PRODS.splice(+t.dataset.delp, 1); await API.putProducts(PRODS); return srender(); }
  if (t.dataset.rs) { CUR.review.shape = t.dataset.rs; return srender(); }
  if (t.dataset.pk) { const k = t.dataset.pk, p = CUR.review.picks[k]; if (!p) CUR.review.picks[k] = 'y'; else if (p === 'y') CUR.review.picks[k] = 'n'; else delete CUR.review.picks[k]; const y = scrollY; srender(); scrollTo(0, y); return; }
  if (t.classList.contains('chip')) { const k = t.closest('[data-ra]').dataset.ra, i = +t.dataset.i; CUR.review.A[k] = i; const y = scrollY; srender(); scrollTo(0, y); return; }
});
document.addEventListener('change', e => { if (e.target.id === 'pCat') { PCAT = e.target.value; const y = scrollY; const keep = ['pName', 'pStore', 'pUrl', 'pImg', 'pPrice'].map(id => [id, $('#' + id).value]); srender(); keep.forEach(([id, v]) => $('#' + id).value = v); scrollTo(0, y); } });
document.addEventListener('input', e => {
  const t = e.target;
  if (t.dataset.rm) { const v = parseFloat(t.value); CUR.M[t.dataset.rm] = isNaN(v) || v <= 0 ? undefined : v; clearTimeout(t._r); t._r = setTimeout(() => { const y = scrollY, id = t.dataset.rm; srender(); scrollTo(0, y); const n = $(`[data-rm="${id}"]`); n && n.focus(); }, 700); }
  if (t.dataset.rmsg !== undefined) CUR.review.msg = t.value;
});
load();
