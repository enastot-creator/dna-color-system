/* ═════════════ DNA DRAW KIT — unified 3D fashion illustration engine ═════════════ */
const r1 = n => Math.round(n * 10) / 10;
/* Catmull-Rom → cubic Bézier; points [x,y,sharp] */
function sp(P, closed = true) {
  const n = P.length; if (n < 2) return '';
  const g = i => closed ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))];
  let d = `M${r1(P[0][0])} ${r1(P[0][1])}`;
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    let c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    let c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    if (p1[2]) c1 = p1; if (p2[2]) c2 = p2;
    d += `C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
  }
  return d + (closed ? 'Z' : '');
}
/* symmetric shape from right-half points (dx from centre 100) */
function sym(R) {
  const a = R.map(p => [100 + p[0], p[1], p[2]]);
  const b = R.slice(1, -1).reverse().map(p => [100 - p[0], p[1], p[2]]);
  return sp(a.concat(b));
}
const ab = R => R.map(p => [100 + p[0], p[1], p[2]]);
const line = (R, closed = false) => sp(ab(R), closed);
const both = s => s + `<g transform="matrix(-1 0 0 1 200 0)">${s}</g>`;
const flip = s => `<g transform="matrix(-1 0 0 1 200 0)">${s}</g>`;

/* painters */
const PT = {
  g: (d, f = 'F', extra = '') => `<path d="${d}" fill="url(#g${f})" stroke="${f === 'I' || f === 'S' || f === 'L' ? '#7d97c2' : '#081d44'}" stroke-width=".55" stroke-linejoin="round" ${extra}/><path d="${d}" fill="url(#gH)" opacity="${f === 'I' ? .25 : .5}" pointer-events="none"/>`,
  l: (d, o = .42, w = .7, dash = '') => `<path d="${d}" fill="none" stroke="rgba(255,255,255,${o})" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''} stroke-linecap="round" stroke-linejoin="round"/>`,
  k: (d, o = .32, w = .7, dash = '') => `<path d="${d}" fill="none" stroke="rgba(8,29,68,${o})" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''} stroke-linecap="round" stroke-linejoin="round"/>`,
  c: (x, y, r = 1.6, f = '#dfe8f7') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" stroke="rgba(8,29,68,.45)" stroke-width=".4"/>`,
  st: (d) => `<path d="${d}" fill="none" stroke="rgba(255,255,255,.55)" stroke-width=".55" stroke-dasharray="1.6 1.3"/>`
};

/* ── Mannequin ── */
function bodyR(o = {}) {
  const s = o.sh ?? 38.5, b = o.bust ?? 34.5, w = o.waist ?? 24, h = o.hip ?? 35.5, th = o.thigh ?? h * .9;
  const hh = o.hh ?? ((w + h) / 2 + 1.5);
  return [[0, 46], [7, 46], [8, 66], [15, 71], [s - 6, 75], [s, 80], [s - 2.5, 92], [b - .5, 104], [b, 116], [(b + w) / 2 + 1.5, 131], [w, 150], [hh, 170], [h, 191], [h - .5, 206], [Math.max(th - 3.5, 24), 240], [22, 290], [23, 318], [19, 350], [12.5, 375], [11.2, 384], [12.6, 391], [11.5, 393, 1], [6.5, 393, 1], [5.6, 384], [5, 372], [4, 330], [3.6, 292], [3, 252], [1.4, 224], [0, 216, 1]];
}
function armD(s = 38.5) {
  return sp([[s - 3, 77], [s + 3, 82], [s + 6.5, 100], [s + 8.5, 140], [s + 11, 170], [s + 13.5, 195], [s + 14.5, 204], [s + 12, 213], [s + 8.5, 208], [s + 6, 196], [s + 3, 170], [s - 2, 142], [s - 5, 118], [s - 6.5, 98]].map(p => [100 + p[0], p[1]]));
}
function mq(o = {}) {
  const s = o.sh ?? 38.5; let out = '';
  if (o.shadow !== false) out += `<ellipse cx="100" cy="394" rx="${o.shadowW || 30}" ry="3.6" fill="url(#gSh)"/>`;
  if (o.arms !== false) out += both(`<path d="${armD(s)}" fill="url(#gM)" stroke="#a9b8d3" stroke-width=".5"/>`);
  out += `<path d="${sym(bodyR(o))}" fill="url(#gM)" stroke="#a9b8d3" stroke-width=".5"/>`;
  out += `<path d="${sym(bodyR(o))}" fill="url(#gMH)" pointer-events="none"/>`;
  if (o.head !== false) out += `<ellipse cx="100" cy="33" rx="12.8" ry="17.2" fill="url(#gM)" stroke="#a9b8d3" stroke-width=".5"/><ellipse cx="96" cy="26" rx="5" ry="7" fill="#fff" opacity=".35"/>`;
  return out;
}

/* ── Sleeve tube engine along the arm axis ── */
function AX(s) { return [[s - .5, 79], [s + .5, 100], [s + 3.2, 140], [s + 7, 170], [s + 9.7, 196]]; }
const AW = [6.5, 6.6, 5.3, 4, 3.8];
function axisAt(t, s = 38.5) {
  const ax = AX(s), L = [0];
  for (let i = 1; i < ax.length; i++) L.push(L[i - 1] + Math.hypot(ax[i][0] - ax[i - 1][0], ax[i][1] - ax[i - 1][1]));
  const d = t * L[L.length - 1]; let i = 0; while (i < L.length - 2 && L[i + 1] < d) i++;
  const u = (d - L[i]) / (L[i + 1] - L[i]), dl = L[i + 1] - L[i];
  const dir = [(ax[i + 1][0] - ax[i][0]) / dl, (ax[i + 1][1] - ax[i][1]) / dl];
  return { c: [100 + ax[i][0] + (ax[i + 1][0] - ax[i][0]) * u, ax[i][1] + (ax[i + 1][1] - ax[i][1]) * u], dir, w: AW[i] + (AW[i + 1] - AW[i]) * Math.min(u, 1) };
}
function sleeveD(o = {}, s = 38.5) {
  const ax = AX(s), L = [0];
  for (let i = 1; i < ax.length; i++) L.push(L[i - 1] + Math.hypot(ax[i][0] - ax[i - 1][0], ax[i][1] - ax[i - 1][1]));
  const tot = L[L.length - 1];
  const at = t => {
    const d = t * tot; let i = 0; while (i < L.length - 2 && L[i + 1] < d) i++;
    const u = (d - L[i]) / (L[i + 1] - L[i]);
    const c = [ax[i][0] + (ax[i + 1][0] - ax[i][0]) * u, ax[i][1] + (ax[i + 1][1] - ax[i][1]) * u];
    const dl = Math.hypot(ax[i + 1][0] - ax[i][0], ax[i + 1][1] - ax[i][1]);
    const dir = [(ax[i + 1][0] - ax[i][0]) / dl, (ax[i + 1][1] - ax[i][1]) / dl];
    return { c, dir, w: AW[i] + (AW[i + 1] - AW[i]) * u };
  };
  const len = o.len ?? .97, st = o.start ?? 0, N = Math.max(5, Math.round((len - st) * 16));
  const out = [], inn = [];
  for (let k = 0; k <= N; k++) {
    const t = st + (len - st) * k / N, u = (t - st) / ((len - st) || 1);
    const { c, dir, w } = at(t);
    const ww = w + (o.ease ?? 1.6) + (o.w ? o.w(u) : 0);
    const n = [dir[1], -dir[0]], ik = o.innerK ?? 1;
    out.push([100 + c[0] + n[0] * ww, c[1] + n[1] * ww]);
    inn.push([100 + c[0] - n[0] * ww * ik, c[1] - n[1] * ww * ik]);
  }
  out[out.length - 1][2] = 1; inn[inn.length - 1][2] = 1;
  if (st > 0) { out[0][2] = 1; inn[0][2] = 1; return sp(out.concat(inn.reverse())); }
  const top = [100 + s - 1, 74.5];
  return sp([top, ...out, ...inn.reverse()]);
}
function sleeveHemLine(o = {}, s = 38.5, at = null) {
  // returns a line across the sleeve at fraction 'at' of its length (for cuffs / seams)
  const len = o.len ?? .97, st = o.start ?? 0; const t = at ?? len - .02;
  const tmp = sleeveD({ ...o, start: Math.max(st, t - .001), len: t + .001 }, s);
  const m = tmp.match(/M([\d.-]+) ([\d.-]+)/), nums = tmp.match(/[\d.-]+/g).map(Number);
  const x2 = nums[nums.length - 2], y2 = nums[nums.length - 1];
  return `M${m[1]} ${m[2]}L${x2} ${y2}`;
}
function sleeves(o = {}, s = 38.5, f = 'F') {
  let one = PT.g(sleeveD(o, s), f);
  if (o.cuff) one += (f === 'F' ? PT.l : PT.k)(sleeveHemLine(o, s, (o.len ?? .97) - o.cuff), .5, .8);
  if (o.seam) one += (f === 'F' ? PT.l : PT.k)(sleeveHemLine(o, s, o.seam), .45, .7, '1.6 1.3');
  if (o.folds) for (let i = 0; i < o.folds; i++) {
    const t1 = (o.start ?? 0) + .1 + i * .06; one += (f === 'F' ? PT.l : PT.k)(sleeveHemLine(o, s, Math.min(t1, (o.len ?? .97) - .03)), .18, .5);
  }
  return both(one);
}

/* ── Bodice builder ── */
const FIT = { fitted: [34.6, 29.5, 24.6, 31, 36.3], semi: [35, 31.5, 28, 33, 37], boxy: [37.5, 37.5, 37.5, 38, 39.5], flow: [35.5, 35, 36, 41, 46], wide: [40, 41, 42, 45, 50] };
function widthAt(fit, y) {
  const W = FIT[fit] || FIT.semi;
  const T = [[104, W[0] - .3], [116, W[0]], [131, W[1]], [150, W[2]], [172, W[3]], [195, W[4]], [260, W[4] + (fit === 'flow' || fit === 'wide' ? 12 : 1)], [390, W[4] + (fit === 'flow' || fit === 'wide' ? 30 : 4)]];
  if (y <= T[0][0]) return T[0][1];
  for (let i = 0; i < T.length - 1; i++) if (y <= T[i + 1][0]) { const u = (y - T[i][0]) / (T[i + 1][0] - T[i][0]); return T[i][1] + (T[i + 1][1] - T[i][1]) * u; }
  return T[T.length - 1][1];
}
const NECK = {
  crew: [[0, 75.5], [6.5, 73.5], [10.5, 67, 1]],
  jewel: [[0, 70.5], [6, 69.5], [9, 66, 1]],
  scoop: [[0, 93], [10, 90], [16, 80], [17.5, 69, 1]],
  v: [[0, 101, 1], [13.5, 68, 1]],
  vShallow: [[0, 86, 1], [11.5, 67.5, 1]],
  plunge: [[0, 124, 1], [8, 100], [14.5, 69, 1]],
  boat: [[0, 71], [14, 70], [27, 73.5, 1]],
  square: [[0, 92, 1], [16, 92, 1], [16, 70, 1]],
  sweetheart: [[0, 98, 1], [6, 91.5], [13, 90.5], [19.5, 94], [24, 100, 1]],
  halter: [[0, 96, 1], [6, 76], [8.5, 60, 1], [13, 61, 1], [17, 82], [27.5, 101, 1]],
  off: [[0, 94], [22, 91.5], [45, 93.5, 1], [45.5, 101, 1], [35, 103]],
  strapless: [[0, 99.5], [20, 98], [33.8, 101, 1]],
  cami: [[0, 101], [12, 98.5], [27, 99.5, 1], [33.8, 102, 1]],
  turtle: [[0, 47], [8.6, 47, 1], [9.2, 64], [13, 69, 1]],
  mock: [[0, 55], [9, 55, 1], [9.4, 65], [12.5, 69, 1]],
  funnel: [[0, 52], [11.5, 51, 1], [13, 67.5, 1]],
  cowl: [[0, 101], [11, 95], [17.5, 81], [19, 69, 1]],
  wrap: [[0, 110, 1], [14, 68, 1]],
  cowlDeep: [[0, 112], [12, 104], [19, 84], [20, 69, 1]]
};
function bodiceR(nk, o = {}) {
  const len = o.len ?? 172, fit = o.fit ?? 'semi';
  const R = NECK[nk] ? NECK[nk].map(p => [...p]) : nk.map(p => [...p]);
  const noSh = ['sweetheart', 'halter', 'off', 'strapless', 'cami'].includes(nk) || o.noShoulder;
  if (!noSh) {
    const sw = o.sw ?? (o.sleeveless ? 33 : 38);
    R.push([sw, 77, 1]);
    if (o.sleeveless) R.push([31.5, 88]); else R.push([sw - 2, 88]);
    R.push([33.6, 99, o.sleeveless ? 1 : 0]);
  }
  const lastY = R[R.length - 1][1];
  for (const y of [116, 131, 150, 172, 195, 230, 270, 310, 350]) if (y > lastY + 4 && y < len - 4) R.push([widthAt(fit, y), y]);
  R.push([o.hemW ?? widthAt(fit, len), len, 1], [0, len + (o.hemDip ?? 1.5), o.hemPoint ? 1 : 0]);
  return R;
}
function bodice(nk, o = {}, f = 'F') { return PT.g(sym(bodiceR(nk, o)), f); }

/* ── Skirt builder (right half, from waist) ── */
function skirtR(o) {
  const y0 = o.y0 ?? 149, w0 = o.w0 ?? 24.6;
  const R = [[0, y0], [w0, y0, 1]];
  (o.pts || []).forEach(p => R.push(p));
  R.push([o.hem, o.len, 1], [0, o.len + (o.dip ?? 2)]);
  return R;
}
function skirt(o, f = 'F') { return PT.g(sym(skirtR(o)), f); }
function vlines(n, y1, y2, wTop, wBot, o = .3, fn = PT.l) { // pleat lines fan
  let s = ''; for (let i = 1; i < n; i++) { const u = i / n - .5; s += fn(`M${r1(100 + u * 2 * wTop)} ${y1}L${r1(100 + u * 2 * wBot)} ${y2}`, o, .6); } return s;
}
function hline(y, w, o = .45, fn = PT.l, dash = '') { return fn(`M${r1(100 - w)} ${y}Q100 ${y + 2} ${r1(100 + w)} ${y}`, o, .8, dash); }

/* ── Pants builder ── */
function pantsR(o) {
  const y0 = o.y0 ?? 149, len = o.len ?? 388;
  const wAt = y => y < 150 ? 24.6 + (150 - y) * .12 : y < 170 ? 24.6 + (y - 150) * .24 : 29.4 + (y - 170) * .3;
  const kc = 15, hc = o.hc ?? 14.2;
  const leg = (c, h) => { const inner = Math.max(2.4, c - h); return [inner, inner + 2 * h]; };
  const [ki, ko] = leg(kc, o.knee), [hi, ho] = leg(hc, o.hem);
  const R = [[0, y0], [o.w0 ?? wAt(y0), y0, 1]];
  if (y0 < 186) R.push([o.hip ?? 36.2, 191]);
  R.push([o.thigh ?? 35.5, 224]);
  if (len > 300) { (o.mid || []).forEach(p => R.push(p)); R.push([ko, 292]); }
  else if (len > 250) R.push([(o.thigh ?? 35.5) - (224 - 250) * 0, 250]);
  R.push([len > 300 ? ho : (o.hemOut ?? Math.max(o.thigh ?? 35.5, 30)), len, 1]);
  const hemIn = len > 300 ? hi : (o.hemIn ?? 3);
  R.push([hemIn, len, 1]);
  if (len > 300) { R.push([ki, 292]); }
  R.push([2, o.crotch ? o.crotch + 10 : 226], [0, o.crotch ?? 215, 1]);
  return R;
}
function pants(o, f = 'F') {
  let s = PT.g(sym(pantsR(o)), f);
  const fn = f === 'F' || f === 'D' ? PT.l : PT.k;
  s += fn(`M100 ${(o.y0 ?? 149) + 4}L100 ${o.crotch ?? 215}`, .35, .6); // fly
  if (o.crease) s += both(fn(`M${100 + 15} ${(o.y0 ?? 149) + 6}L${r1(100 + (o.hc ?? 14.2))} ${(o.len ?? 388) - 2}`, .3, .6));
  return s;
}

/* ── Jacket / coat builder ── */
function jacket(o = {}) {
  const len = o.len ?? 192, fit = o.fit ?? 'semi', ov = o.db ? 9 : 2.5, yb = o.yb ?? 132, sw = o.sw ?? 39.5;
  const W = y => widthAt(fit, y) + (o.ease ?? 1.5);
  let s = '';
  // inner top
  if (!o.closed) s += bodice('crew', { len: Math.min(len, 190), fit: 'fitted' }, 'I');
  const R = [[109.5, 66, 1], [100 + sw, 77.5, 1], [100 + sw - 2.5, 90], [100 + W(104), 104]];
  for (const y of [131, 150, 172, 195, 230, 270, 310, 350]) if (y < len - 5) R.push([100 + W(y), y]);
  R.push([100 + (o.hemW ?? W(len)), len, 1], [100 - ov, len + 1.5, 1], [100 - ov, yb, 1]);
  if (o.collarless) { R.pop(); R.push([100 - ov, 84, 1]); R.push([103, 72]); }
  let panel = PT.g(sp(R), o.f || 'F');
  // lapels
  const lf = o.lf || 'F2';
  if (o.lapel === 'notch') panel += PT.g(sp([[109.5, 66.5, 1], [117.5, 70], [119.5, 80, 1], [116.8, 82.5, 1], [127, 87, 1], [101 - ov + 1, yb, 1]]), lf);
  if (o.lapel === 'peak') panel += PT.g(sp([[109.5, 66.5, 1], [117.5, 70], [119.5, 80.5, 1], [130, 76, 1], [125.5, 88], [101 - ov + 1, yb, 1]]), lf);
  if (o.lapel === 'shawl') panel += PT.g(sp([[109.5, 66.5, 1], [119, 72], [123, 88], [101 - ov + 1, yb, 1]]), lf);
  if (o.lapel === 'wide') panel += PT.g(sp([[109.5, 66.5, 1], [119, 70], [123, 79, 1], [119, 82, 1], [136, 92, 1], [101 - ov + 1, yb, 1]]), lf);
  if (o.lapel === 'collar') panel += PT.g(sp([[109.5, 65.5, 1], [121, 70], [124, 82, 1], [111, 79, 1]]), lf);
  if (o.lapel === 'funnel') panel += PT.g(sp([[108, 55, 1], [114, 56], [116, 70], [112, 75, 1], [100 - ov + 1, 84, 1], [100 - ov + 1, 57, 1]]), lf);
  if (o.pockets) panel += PT.l(`M${100 + 13} ${len - (o.pockY ?? 30)}l17 0`, .55, 1);
  if (o.chest) panel += PT.l(`M${100 + 19} 112l11 -1`, .5, .9);
  // left panel = mirror (underneath for overlap illusion)
  s += flip(panel) + panel;
  // sleeves
  if (o.sleeve !== false) s += sleeves({ len: o.sLen ?? .95, ease: o.sEase ?? 2.6, cuff: o.cuff, w: o.sw2, seam: o.sSeam }, sw - 1, o.f || 'F');
  // buttons
  const bx = o.db ? [100 - 6, 100 + 6] : [100];
  (o.buttons ?? (o.db ? 2 : 1) ? [...Array(o.buttons ?? (o.db ? 2 : 1)).keys()] : []).forEach(i => bx.forEach(x => { s += PT.c(x, yb + 5 + i * 15, 1.7); }));
  if (o.belt) s += PT.g(sp([[100 - W(150) - .5, 147, 1], [100 + W(150) + .5, 147, 1], [100 + W(156) + .5, 154, 1], [100 - W(156) - .5, 154, 1]]), o.f || 'F') + `<rect x="95" y="146" width="10" height="9" rx="1.5" fill="none" stroke="#dfe8f7" stroke-width="1"/>`;
  if (o.zip) s += PT.l(o.zip, .7, 1);
  return s;
}

/* ── shared SVG defs (gradients) ── */
const DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<linearGradient id="gF" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#071d45"/><stop offset=".22" stop-color="#1c4a93"/><stop offset=".42" stop-color="#3a72c6"/><stop offset=".6" stop-color="#2557a6"/><stop offset=".85" stop-color="#123873"/><stop offset="1" stop-color="#061a3d"/></linearGradient>
<linearGradient id="gF2" x1="0" x2="1"><stop offset="0" stop-color="#0d2c63"/><stop offset=".45" stop-color="#4b82d4"/><stop offset="1" stop-color="#143e7e"/></linearGradient>
<linearGradient id="gD" x1="0" x2="1"><stop offset="0" stop-color="#1d3f74"/><stop offset=".3" stop-color="#4f7fbe"/><stop offset=".5" stop-color="#7aa2d6"/><stop offset=".7" stop-color="#4a78b6"/><stop offset="1" stop-color="#1a3a6c"/></linearGradient>
<linearGradient id="gL" x1="0" x2="1"><stop offset="0" stop-color="#8fb0e3"/><stop offset=".4" stop-color="#d8e6fb"/><stop offset=".7" stop-color="#b3cbf0"/><stop offset="1" stop-color="#7c9fd7"/></linearGradient>
<linearGradient id="gS" x1="0" x2="1"><stop offset="0" stop-color="#9db9e6"/><stop offset=".45" stop-color="#e3edfc"/><stop offset="1" stop-color="#8eaee0"/></linearGradient>
<linearGradient id="gI" x1="0" x2="1"><stop offset="0" stop-color="#d4e0f2"/><stop offset=".45" stop-color="#ffffff"/><stop offset="1" stop-color="#cfdcf0"/></linearGradient>
<linearGradient id="gM" x1="0" x2="1"><stop offset="0" stop-color="#c4d0e3"/><stop offset=".35" stop-color="#f3f6fb"/><stop offset=".55" stop-color="#e9eef6"/><stop offset="1" stop-color="#b9c7dd"/></linearGradient>
<linearGradient id="gMH" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset=".5" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#9fb0cc" stop-opacity=".15"/></linearGradient>
<linearGradient id="gH" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".35" stop-color="#fff" stop-opacity=".06"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>
<linearGradient id="gG" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#eef3fb"/><stop offset=".5" stop-color="#b7c6de"/><stop offset="1" stop-color="#eef3fb"/></linearGradient>
<radialGradient id="gSh"><stop offset="0" stop-color="#0b2a5b" stop-opacity=".28"/><stop offset="1" stop-color="#0b2a5b" stop-opacity="0"/></radialGradient>
<radialGradient id="gBg" cx=".5" cy=".42" r=".65"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e6eefa"/></radialGradient>
<pattern id="pDot" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1" fill="#fff" opacity=".55"/></pattern>
</defs></svg>`;
