/* ═════════════ «العدسة» — garment analysis → per-part verdict → outfits ═════════════ */
const GTYPES = [['top', 'توب / بلوزة', 'top'], ['shirt', 'قميص', 'top'], ['dress', 'فستان', 'dress'], ['skirt', 'تنورة', 'skirt'], ['pants', 'بنطال', 'pants'], ['jeans', 'جينز', 'jeans'], ['shorts', 'شورت', 'shorts'], ['jumpsuit', 'جمبسوت', 'jump'], ['jacket', 'جاكيت / بليزر', 'jacket'], ['coat', 'معطف', 'coat'], ['abaya', 'عباءة', 'abaya']];
const LEN_ENUM = [['cropped', 'قصير جداً / كروب'], ['waist', 'للخصر'], ['hip', 'للورك'], ['mid_thigh', 'منتصف الفخذ'], ['mini', 'ميني'], ['above_knee', 'فوق الركبة'], ['knee', 'للركبة'], ['below_knee', 'تحت الركبة'], ['midi', 'ميدي'], ['tea', 'أسفل السمانة'], ['ankle', 'للكاحل'], ['maxi', 'ماكسي / للأرض'], ['full_length', 'طول كامل'], ['capri', 'كابري'], ['culotte', 'كيلوت']];
const SLEN_ENUM = [['none', 'بدون أكمام'], ['cap', 'كاب'], ['short', 'قصير'], ['elbow', 'للمرفق'], ['three_quarter', 'ثلاثة أرباع'], ['bracelet', 'سبعة أثمان'], ['full', 'كامل'], ['extra_long', 'طويل جداً']];
const LEN_MAP = {
  skirt: { mini: 'mini', above_knee: 'above', knee: 'knee', below_knee: 'below', midi: 'midi', tea: 'tea', ankle: 'ankle', maxi: 'maxi', full_length: 'maxi' },
  pants: { full_length: 'full', maxi: 'full', ankle: 'ankleP', cropped: 'crop', capri: 'capriL', culotte: 'culL', midi: 'capriL' },
  jacket: { cropped: 'jCrop', waist: 'jWaist', hip: 'jHip', mid_thigh: 'jThigh', knee: 'jKnee', above_knee: 'jThigh', below_knee: 'jKnee', midi: 'jMidi', tea: 'jMidi', ankle: 'jLong', maxi: 'jLong', full_length: 'jLong' }
};
const LEN_KIND = { skirt: 'skirt', dress: 'skirt', abaya: 'skirt', pants: 'pants', jeans: 'pants', jump: 'pants', jacket: 'jacket', coat: 'jacket', top: 'jacket' };
const SLEN_MAP = { cap: 'sCap', short: 'sShort', elbow: 'sElbow', three_quarter: 'sQ', bracelet: 's78', full: 'sFull', extra_long: 'sXL' };
const SIL_CATS = ['top', 'skirt', 'dress', 'abaya', 'pants', 'jeans', 'shorts', 'jump', 'jacket', 'coat'];
function lensEnums() {
  return {
    garment_type: GTYPES.map(g => g[0]),
    neckline: ['none', ...LIB.neck.map(i => i.id)],
    sleeve_type: ['none', ...LIB.sleeve.map(i => i.id)],
    sleeve_length: SLEN_ENUM.map(s => s[0]),
    length: LEN_ENUM.map(l => l[0]),
    silhouette: ['none', ...SIL_CATS.flatMap(c => LIB[c].map(i => i.id))],
    fabric: ['unknown', ...LIB.fabric.map(i => i.id)],
    print: ['solid', ...LIB.print.map(i => i.id)],
    labels: Object.fromEntries([...SIL_CATS, 'neck', 'sleeve', 'fabric', 'print'].flatMap(c => LIB[c].map(i => [i.id, i.en])))
  };
}
const FIX = {
  neck: 'عوّضي بعقد طويل على شكل V، أو افتحي أول زرين، أو ارتديها تحت جاكيت مفتوح لصنع خط عمودي.',
  sleeve: 'يمكن تعديل الكم عند الخياط، أو ارتداؤها تحت جاكيت أو كارديجان يغطي الكم.',
  slen: 'اطلبي من الخياط تعديل طول الكم لينتهي عند أنحف نقطة في ذراعك.',
  len: 'اختاري طولاً آخر أو عدّلي الحاشية عند الخياط.',
  sil: 'القصة الأساسية لا تخدم شكل جسمك — هذا الجزء صعب تعديله، فكّري ببديل.',
  fabric: 'الخامة تضيف حجماً أو تلتصق — ارتديها في المنطقة التي تريدين إبرازها أو اختاري نسخة مطفية منسدلة.',
  print: 'حجم النقشة أو مكانها لا يناسب مقياسك — اختاري نقشة أصغر/أكبر أو ضعيها بعيداً عن منطقة التركيز.'
};
function findItem(id) { for (const c of Object.keys(LIB)) { const it = LIB[c].find(x => x.id === id); if (it) return [c, it]; } return [null, null]; }
function judge(a, T, eff) {
  const rows = [], cat = (GTYPES.find(g => g[0] === a.garment_type) || [])[2] || 'top';
  const push = (part, c, it, kind) => { if (!it) return; const v = verdict(c, it, T, eff); rows.push({ part, cat: c, it, v, fix: FIX[kind], kind }); };
  if (a.silhouette && a.silhouette !== 'none') { const [c, it] = findItem(a.silhouette); push('القصة', c, it, 'sil'); }
  if (a.neckline && a.neckline !== 'none' && !['skirt', 'pants', 'jeans', 'shorts'].includes(cat)) push('قصة الرقبة', 'neck', LIB.neck.find(i => i.id === a.neckline), 'neck');
  if (a.sleeve_type && a.sleeve_type !== 'none' && !['skirt', 'pants', 'jeans', 'shorts'].includes(cat)) push('نوع الكم', 'sleeve', LIB.sleeve.find(i => i.id === a.sleeve_type), 'sleeve');
  if (a.sleeve_length && SLEN_MAP[a.sleeve_length]) { const l = LENGTHS.sleeve.find(x => x[0] === SLEN_MAP[a.sleeve_length]); const sc = score({ g: l[4], a: l[5] }, T); rows.push({ part: 'طول الكم', lenRow: l, v: { st: sc.st, why: sc.why, warn: sc.warn }, fix: FIX.slen, kind: 'slen', best: bestLen('sleeve', T) }); }
  const lk = LEN_KIND[cat]; if (lk && a.length && LEN_MAP[lk][a.length]) { const l = LENGTHS[lk].find(x => x[0] === LEN_MAP[lk][a.length]); if (l) { const sc = score({ g: l[4], a: l[5] }, T); rows.push({ part: 'طول القطعة', lenRow: l, v: { st: sc.st, why: sc.why, warn: sc.warn }, fix: FIX.len, kind: 'len', best: bestLen(lk, T) }); } }
  if (a.fabric && a.fabric !== 'unknown') push('الخامة', 'fabric', LIB.fabric.find(i => i.id === a.fabric), 'fabric');
  if (a.print && a.print !== 'solid') push('النقشة', 'print', LIB.print.find(i => i.id === a.print), 'print');
  const bad = rows.filter(r => r.v.st === 'avoid'), good = rows.filter(r => r.v.st === 'rec');
  const silBad = bad.some(r => r.kind === 'sil');
  const overall = !rows.length ? ['mid', 'أكملي بيانات القطعة'] : silBad || bad.length >= 3 ? ['avoid', '✕ لا أنصحكِ بها'] : bad.length ? ['mid', '⚠ مناسبة مع تعديل بسيط'] : good.length >= 2 ? ['rec', '✓ مثالية لكِ'] : ['rec', '✓ مناسبة لكِ'];
  return { cat, rows, overall };
}
function bestLen(kind, T) { return LENGTHS[kind].filter(l => score({ g: l[4], a: l[5] }, T).st === 'rec').map(l => l[1]); }
const SLOTS = { top: [['skirt', 'pants', 'jeans'], ['heel'], ['bag']], skirt: [['top'], ['heel'], ['bag']], pants: [['top'], ['heel'], ['bag']], jeans: [['top'], ['heel'], ['bag']], shorts: [['top'], ['heel'], ['bag']], dress: [['heel'], ['bag'], ['jacket', 'belt']], jump: [['heel'], ['bag'], ['jacket', 'belt']], abaya: [['heel'], ['bag'], ['belt']], jacket: [['top'], ['pants', 'jeans', 'skirt'], ['heel']], coat: [['top'], ['pants', 'jeans', 'skirt'], ['heel']] };
function outfits(cat, T, eff, products, n = 3) {
  const slots = SLOTS[cat] || SLOTS.top, out = [];
  const pool = cats => {
    const items = cats.flatMap(c => LIB[c].map(it => ({ c, it, v: verdict(c, it, T, eff) }))).filter(x => x.v.st === 'rec').sort((a, b) => (b.it.t ? 1 : 0) - (a.it.t ? 1 : 0));
    const prods = products.filter(p => cats.includes(p.cat) && items.some(x => x.c === p.cat && x.it.id === p.item));
    return { items, prods };
  };
  const pools = slots.map(pool);
  for (let k = 0; k < n; k++) out.push(pools.map((p, si) => p.prods.length ? { prod: p.prods[k % p.prods.length] } : p.items.length ? { lib: p.items[(k * 2 + si) % p.items.length] } : null).filter(Boolean));
  return out;
}
