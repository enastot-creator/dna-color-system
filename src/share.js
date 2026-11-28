/* ═════════════ CLIENT LINK MODE — share with client, persist her edits, send back ═════════════ */
let CLIENT = false, CKEY = '';
const b64u = bytes => { let s = ''; bytes.forEach(b => s += String.fromCharCode(b)); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
const unb64u = str => { const s = atob(str.replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(s, c => c.charCodeAt(0)); };
async function pack(obj) {
  const raw = new TextEncoder().encode(JSON.stringify(obj));
  if (window.CompressionStream) { try { const buf = await new Response(new Blob([raw]).stream().pipeThrough(new CompressionStream('deflate-raw'))).arrayBuffer(); return 'z' + b64u(new Uint8Array(buf)); } catch (e) { } }
  return 'j' + b64u(raw);
}
async function unpack(str) {
  const kind = str[0], bytes = unb64u(str.slice(1));
  if (kind === 'z') { const buf = await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer(); return JSON.parse(new TextDecoder().decode(buf)); }
  return JSON.parse(new TextDecoder().decode(bytes));
}
const baseURL = () => location.href.split('#')[0];
const lsGet = k => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } };

/* save override: client copy lives under its own key */
save = function () {
  clearTimeout(saveT);
  saveT = setTimeout(() => {
    S.rev = S.rev || Date.now();
    const ok = CLIENT ? lsSet(CKEY, S) : (DB.sessions[S.id] = S, DB.current = S.id, lsSet(KEY, DB));
    if (!quiet) flash(ok ? (CLIENT ? 'تم حفظ اختياراتك على جهازك ✓' : 'تم الحفظ تلقائياً') : '⚠ المتصفح يمنع الحفظ (وضع التصفح الخاص؟)');
  }, 400);
};

async function route() {
  const h = location.hash;
  if (h.startsWith('#c=')) {
    try {
      const inc = (await unpack(h.slice(3))).s;
      CLIENT = true; CKEY = 'dnaBody.client.' + inc.id;
      const loc = lsGet(CKEY);
      if (loc && loc.srcRev === inc.rev) S = loc;                       // same version → keep her edits
      else if (loc) {                                                     // consultant sent an update → keep client's own input on top
        S = inc; S.srcRev = inc.rev; S.cnotes = loc.cnotes || {}; S.cp = loc.cp || {};
        Object.assign(S.picks, S.cp); S.x = { ...inc.x, ...(loc.cx || {}) }; S.cx = loc.cx || {};
      } else { S = inc; S.srcRev = inc.rev; S.cnotes = S.cnotes || {}; S.cp = {}; S.cx = {}; }
      document.body.classList.add('client');
    } catch (e) { alert('تعذّر فتح الرابط — قد يكون غير مكتمل. اطلبي من المستشارة إرساله مرة أخرى.'); }
  } else if (h.startsWith('#r=')) {
    try {
      const r = await unpack(h.slice(3));
      let tgt = DB.sessions[r.id];
      if (!tgt) { tgt = blank(); tgt.id = r.id; tgt.client.name = r.name || 'عميلة'; DB.sessions[r.id] = tgt; }
      tgt.cnotes = r.cnotes || {}; tgt.cp = r.cp || {}; Object.assign(tgt.picks, r.cp || {});
      Object.entries(r.cx || {}).forEach(([k, v]) => tgt.x[k] = v);
      tgt.clientAt = r.at; S = tgt; lsSet(KEY, DB);
      history.replaceState(null, '', baseURL());
      setTimeout(() => { flash(`وصلت ملاحظات ${r.name || 'العميلة'} واختياراتها ✓`); location.hash = '#report'; }, 900);
    } catch (e) { alert('تعذّر قراءة رابط الرد — اطلبي من العميلة إرساله مرة أخرى.'); }
  }
}

function applyClientMode() {
  if (!CLIENT) return;
  $$('[data-m],[data-f],[data-p],[data-note]').forEach(i => { i.readOnly = true; i.tabIndex = -1; });
  $$('[data-note]').forEach(t => { if (!t.value.trim()) t.closest('.note-c')?.classList.add('empty-c'); });
  const c = $('#cover .cv-in .lead'); if (c) c.innerHTML = `أهلاً <b>${esc(S.client.name || '')}</b> — هذا ملفكِ الخاص من جلسة الاستشارة. تصفحي القصات، اضغطي <b>✓ يناسبني</b> أو <b>✕ أتجنّبه</b>، واكتبي ملاحظاتكِ في خانة «ملاحظاتي». كل شيء يُحفظ تلقائياً على جهازكِ حتى لو أغلقتِ المتصفح، وعند الانتهاء اضغطي <b>📤 إرسال ملاحظاتي</b>.`;
}

/* share modal */
async function openShare() {
  S.rev = Date.now(); save();
  const data = await pack({ s: S }), url = baseURL() + '#c=' + data, local = location.protocol === 'file:';
  $('#sess .sc').innerHTML = `<h3>🔗 رابط ملف العميلة</h3>
  <p class="mini">ترسلين هذا الرابط للعميلة؛ يفتح ملفها في <b>وضع العميلة</b>: ترى التحليل والقصات وتختار ✓/✕ وتكتب ملاحظاتها فقط (لا تستطيع تعديل القياسات أو التحليل). اختياراتها تُحفظ على جهازها، ثم ترسل لكِ رابط رد يدمج ملاحظاتها في ملفها عندكِ.</p>
  ${local ? '<p class="calc-warn">⚠ أنتِ تفتحين الملف من جهازك مباشرة (file://). الرابط سيعمل فقط بعد رفع الملف على موقعك أو استضافة — افتحي الملف من رابط الموقع ثم أنشئي الرابط من هناك.</p>' : ''}
  <textarea class="linkbox" readonly>${url}</textarea><p class="mini">طول الرابط: ${url.length} حرف · البيانات مضغوطة داخل الرابط نفسه ولا تُرسل لأي خادم.</p>
  <div class="rtools"><button class="btn" id="cpLink">نسخ الرابط</button><a class="btn ghost" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent('ملف استشارة تحليل الجسم الخاص بكِ — DNA Image:\n' + url)}">واتساب</a>${navigator.share ? '<button class="btn ghost" id="nsLink">مشاركة…</button>' : ''}<button class="btn ghost" id="sClose">إغلاق</button></div>
  <p class="mini">💡 كلما عدّلتِ ملفها أنشئي رابطاً جديداً — عند فتحه تحتفظ العميلة بملاحظاتها السابقة وتظهر لها تحديثاتك.</p>`;
  $('#sess').classList.add('open');
  $('#cpLink').onclick = () => copyText(url);
  const ns = $('#nsLink'); if (ns) ns.onclick = () => navigator.share({ title: 'Body DNA', text: 'ملف استشارة تحليل الجسم الخاص بكِ', url }).catch(() => { });
}
async function sendBack() {
  const r = { id: S.id, name: S.client.name, cnotes: S.cnotes || {}, cp: S.cp || {}, cx: S.cx || {}, at: new Date().toISOString() };
  const url = baseURL() + '#r=' + await pack(r);
  const txt = `ملاحظاتي واختياراتي من ملف الاستشارة (${S.client.name || ''}):\n${url}`;
  $('#sess .sc').innerHTML = `<h3>📤 إرسال ملاحظاتي للمستشارة</h3><p class="mini">أرسلي هذا الرابط للمستشارة عبر واتساب؛ عند فتحه تُضاف ملاحظاتكِ واختياراتكِ إلى ملفكِ لديها. ملاحظاتكِ تبقى محفوظة على جهازكِ أيضاً.</p>
  <textarea class="linkbox" readonly>${url}</textarea>
  <div class="rtools"><a class="btn" target="_blank" rel="noopener" href="https://wa.me/${(S.client.consultantPhone || '').replace(/\D/g, '')}?text=${encodeURIComponent(txt)}">إرسال عبر واتساب</a><button class="btn ghost" id="cpLink">نسخ</button>${navigator.share ? '<button class="btn ghost" id="nsLink">مشاركة…</button>' : ''}<button class="btn ghost" id="sClose">إغلاق</button></div>`;
  $('#sess').classList.add('open');
  $('#cpLink').onclick = () => copyText(url);
  const ns = $('#nsLink'); if (ns) ns.onclick = () => navigator.share({ title: 'ملاحظاتي', text: txt }).catch(() => { });
}
function copyText(t) {
  (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => flash('تم النسخ ✓')).catch(() => { const a = $('.linkbox'); a.select(); document.execCommand('copy'); flash('تم النسخ ✓'); });
}
document.addEventListener('click', e => {
  const t = e.target.closest('button'); if (!t) return;
  if (t.id === 'btnShare') openShare();
  if (t.id === 'btnSend') sendBack();
  if (CLIENT && t.dataset.pick) { const k = t.dataset.pick; setTimeout(() => { S.cp = S.cp || {}; S.cp[k] = S.picks[k] || ''; save(); }, 0); }
  if (CLIENT && (t.dataset.len || t.dataset.neckl || t.classList.contains('chip'))) setTimeout(() => { S.cx = S.cx || {}; Object.keys(S.x).forEach(k => S.cx[k] = S.x[k]); save(); }, 0);
}, true);
document.addEventListener('input', e => { const t = e.target; if (t.dataset.cnote) { S.cnotes = S.cnotes || {}; S.cnotes[t.dataset.cnote] = t.value; save(); clearTimeout(t._r); t._r = setTimeout(renderReport, 600); } });

/* boot */
(async () => {
  await route();
  startApp(); applyClientMode();
  const fb = $('#nojs'); if (fb) fb.remove();
})();
window.addEventListener('hashchange', () => { if (/^#[cr]=/.test(location.hash)) location.reload(); });
