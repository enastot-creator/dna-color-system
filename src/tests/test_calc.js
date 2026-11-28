// Unit tests for the calculators — runs the real app code in a sandbox (no DOM needed for these functions)
const vm = require('vm'), fs = require('fs');
const ctx = { console, setTimeout, clearTimeout, Math, JSON, Object, Array, Set, String, Number, isNaN, parseFloat };
vm.createContext(ctx);
for (const f of ['draw.js', 'data1.js', 'data2.js', 'data3.js', 'data4.js', 'knowledge.js', 'app.js']) vm.runInContext(fs.readFileSync(require('path').join(__dirname, '..', f), 'utf8'), ctx, { filename: f });
const I = x => x * 2.54; // inches → cm
let pass = 0, fail = 0;
const eq = (name, got, exp) => { if (JSON.stringify(got) === JSON.stringify(exp)) pass++; else { fail++; console.log('✗', name, '→ got', got, 'expected', exp); } };
const run = code => vm.runInContext(code, ctx);

// ── body shape (FFIT) ──
const shape = (b, w, h, hh) => { ctx._a = [I(b), I(w), I(h), hh ? I(hh) : undefined]; return run('ffit(..._a)'); };
eq('hourglass 36-26-37', shape(36, 26, 37, 32).sh, 'X');
eq('bottom hourglass 34-25-39 hh29', [shape(34, 25, 39, 29).sh, !!shape(34, 25, 39, 29).sub], ['X', true]);
eq('top hourglass 39-28-36', [shape(39, 28, 36).sh, !!shape(39, 28, 36).sub], ['X', true]);
eq('spoon 34-26-39 hh33', shape(34, 26, 39, 33).sh, 'S');
eq('triangle 34-31-39', shape(34, 31, 39).sh, 'A');
eq('inverted 40-32-35', shape(40, 32, 35).sh, 'V');
eq('rectangle 35-30-36', shape(35, 30, 36).sh, 'H');
eq('apple 38-38-38.5', shape(38, 38, 38.5).sh, 'O');
eq('diamond 35-36-39', shape(35, 36, 39).sh, 'D');
eq('hourglass boundary bust-waist exactly 9', shape(36, 27, 36.5).sh, 'X');
eq('rectangle bust-waist 8.9', shape(36, 27.1, 36.5).sh, 'H');

// ── bra (EN 13402) ──
const bra = (ub, b) => { ctx._a = [ub, b]; return run('braCalc(..._a)'); };
let r = bra(76, 94); eq('76/94', [r.uk, r.euS, r.fr, r.au, r.us], ['34D', '75D', '90D', '12D', '34D']);
r = bra(68, 80); eq('68/80 → 32A', [r.uk, r.euS], ['32A', '70A']);
r = bra(82, 104); eq('82/104 → 36E UK = 80F EU = 36DDD/F US', [r.uk, r.euS, r.us], ['36E', '80F', '36DDD/F']);
r = bra(70, 86); eq('70/86 → 70C', [r.euS, r.uk], ['70C', '32C']);
r = bra(90, 108); eq('90/108 → 90D', [r.euS, r.uk], ['90D', '40D']);
r = bra(75, 89); eq('75/89 diff 14 → B', r.euS, '75B');
r = bra(75, 88.9); eq('75/88.9 diff 13.9 → A', r.euS, '75A');
r = bra(65, 73); eq('diff 8 → AA + small flag', [r.euS, r.small], ['65AA', true]);
r = bra(72.5, 90); eq('72.5 rounds to 75 + edge flag', [r.eu, r.bandEdge], [75, true]);
r = bra(76, 94); eq('sister sizes of 34D', r.sister, ['32DD', '36C']);
eq('bust smaller than underbust → null', bra(80, 78), null);

// ── derive: height / frame / proportions ──
const der = M => { ctx._M = M; return run('derive(_M)'); };
eq('162.5 is petite', [der({ height: 162.5 }).heightIdx, der({ height: 162.5 }).petite], [2, true]);
eq('163 is average', [der({ height: 163 }).heightIdx, der({ height: 163 }).petite], [3, false]);
eq('149 very petite', der({ height: 149 }).heightIdx, 0);
eq('171 tall', der({ height: 171 }).heightIdx, 4);
eq('frame 163/15 small', der({ height: 163, wrist: 15 }).frameIdx, 0);
eq('frame 163/15.5 medium', der({ height: 163, wrist: 15.5 }).frameIdx, 1);
eq('frame 163/16 large', der({ height: 163, wrist: 16 }).frameIdx, 2);
eq('frame 155/14.3 medium', der({ height: 155, wrist: 14.3 }).frameIdx, 1);
eq('frame 170/16.6 large', der({ height: 170, wrist: 16.6 }).frameIdx, 2);
eq('legs: lower 98 / 163 = 60% balanced', der({ height: 163, lower: 98 }).torsoIdx, 0);
eq('legs: lower 94 / 163 = 57.7% long torso', [der({ height: 163, lower: 94 }).torsoIdx, der({ height: 163, lower: 94 }).legsIdx], [2, 1]);
eq('legs: lower 106 / 163 = 65% short torso', [der({ height: 163, lower: 106 }).torsoIdx, der({ height: 163, lower: 106 }).legsIdx], [1, 2]);
eq('arm 54/163 = 33% proportional', der({ height: 163, armLen: 54 }).armLenIdx, 1);
eq('arm 50/163 short', der({ height: 163, armLen: 50 }).armLenIdx, 0);
eq('arm 59/163 long', der({ height: 163, armLen: 59 }).armLenIdx, 2);
eq('bicep 33 full', der({ bicep: 33 }).armsIdx, 2);
eq('bust size from cup D = proportional', der({ bust: 94, underbust: 76 }).bustIdx, 1);
eq('bust size from cup E = large', der({ bust: 104, underbust: 82 }).bustIdx, 2);
eq('bust size from cup B = small', der({ bust: 89, underbust: 75 }).bustIdx, 0);
eq('shoulders broader than hips', der({ shoulderC: 110, hip: 100 }).shWIdx, 2);
eq('shoulders narrower than hips', der({ shoulderC: 94, hip: 100 }).shWIdx, 3);
eq('torso 40.6cm (16in) short', der({ torso: 40.64 }).torsoIdx, 1);
eq('torso 46.99cm (18.5in) proportional', der({ torso: 46.99 }).torsoIdx, 0);
eq('torso 50.8cm (20in) long', der({ torso: 50.8 }).torsoIdx, 2);
eq('torso boundary 17.5in proportional', der({ torso: 17.5 * 2.54 }).torsoIdx, 0);
eq('torso boundary 19.5in long', der({ torso: 19.5 * 2.54 }).torsoIdx, 2);
eq('torso long → legs short when no leg measure', der({ torso: 51 }).legsIdx, 1);
eq('spine rule overrides ratio for torso; legs keep ratio', [der({ torso: 41, height: 163, lower: 94 }).torsoIdx, der({ torso: 41, height: 163, lower: 94 }).legsIdx], [1, 1]);
const full = der({ height: 163, bust: 94, underbust: 76, waist: 72, highhip: 90, hip: 104, wrist: 15, lower: 98 });
eq('calc rows produced', full.calc.length >= 7, true);
eq('WHR', Math.round(full.whr * 100) / 100, 0.69);

// ── library integrity: every item renders, unique ids, rule tags valid ──
const tagOk = new Set(Object.keys(run('TAG_AR')));
let bad = [];
for (const [cat, items] of Object.entries(run('LIB'))) {
  const ids = new Set();
  for (const it of items) {
    if (ids.has(it.id)) bad.push('dup ' + cat + ':' + it.id); ids.add(it.id);
    try { const s = it.s(); if (!s || s.includes('NaN') || s.includes('undefined')) bad.push('render ' + cat + ':' + it.id); } catch (e) { bad.push('err ' + cat + ':' + it.id + ' ' + e.message); }
    for (const t of ((it.g || '') + ' ' + (it.a || '')).split(' ').filter(Boolean)) if (!tagOk.has(t)) bad.push('tag ' + cat + ':' + it.id + ' ' + t);
  }
}
eq('library integrity', bad, []);
const count = Object.values(run('LIB')).reduce((a, b) => a + b.length, 0);
console.log(`\n${pass} passed, ${fail} failed · ${count} illustrated items in library`);
process.exit(fail ? 1 : 0);
