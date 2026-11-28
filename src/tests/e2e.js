const { chromium, devices } = require('playwright');
const BASE = 'http://127.0.0.1:8765/body-shape.html';
const ok = (c, m) => { console.log((c ? '✓ ' : '✗ ') + m); if (!c) process.exitCode = 1; };
(async () => {
  const b = await chromium.launch();
  const errs = []; const watch = p => { p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && !/fonts/.test(m.text()) && errs.push(m.text())); };
  // ── consultant (desktop) ──
  const cctx = await b.newContext({ viewport: { width: 1300, height: 900 } }); const c = await cctx.newPage(); watch(c);
  await c.goto(BASE); await c.waitForTimeout(500);
  const vals = { height: 160, bust: 92, underbust: 74, waist: 70, highhip: 88, hip: 102, wrist: 15, lower: 96, armLen: 53, bicep: 30 };
  for (const [k, v] of Object.entries(vals)) await c.fill(`.mi [data-m="${k}"]`, String(v));
  await c.fill('[data-f="name"]', 'نورة'); await c.fill('[data-note="ana"]', 'ملاحظة المستشارة للتحليل');
  await c.evaluate(() => document.getElementById('btnApplyAll').click());
  // bra calc synced
  ok(await c.inputValue('[data-calc][data-m="underbust"]') === '74', 'bra calculator input synced with body map');
  ok((await c.textContent('#braOut .bra-hero b')) === '34D', 'bra calculator result 74/92 → 34D (EN13402: 74 cm → band 75) (got ' + await c.textContent('#braOut .bra-hero b') + ')');
  // typing in the calculator updates the map
  await c.fill('[data-calc][data-m="bust"]', '96'); await c.waitForTimeout(200);
  ok(await c.inputValue('.mi [data-m="bust"]') === '96', 'calculator → body map sync');
  ok((await c.textContent('#braOut .bra-hero b')) === '34E', 'recalculated 74/96 → 34E (got ' + await c.textContent('#braOut .bra-hero b') + ')');
  ok((await c.$$eval('#calcBox tbody tr', r => r.length)) >= 8, 'conclusions calculator rows rendered');
  ok((await c.$$eval('[data-lenbox="sleeve"] .lenbtn', r => r.length)) === 7, 'sleeve length guide rendered');
  await c.click('[data-lenbox="sleeve"] .lenbtn >> nth=3'); await c.waitForTimeout(100);
  ok(await c.evaluate(() => (S.x.len_sleeve || []).includes('sQ')), 'sleeve length selectable');
  await c.evaluate(() => document.getElementById('btnShare').click()); await c.waitForTimeout(500);
  const link = await c.inputValue('.linkbox');
  ok(link.includes('#c=z'), 'client link generated (compressed), length ' + link.length);
  const sid = await c.evaluate(() => S.id);
  // ── client (phone) ──
  const kctx = await b.newContext({ ...devices['iPhone 13'] }); const k = await kctx.newPage(); watch(k);
  await k.goto(link); await k.waitForTimeout(800);
  ok(await k.evaluate(() => document.body.classList.contains('client')), 'client mode active');
  ok(await k.evaluate(() => S.client.name) === 'نورة', 'client sees her file');
  ok(await k.$eval('.mi [data-m="bust"]', i => i.readOnly), 'measurements read-only for client');
  ok(!(await k.isVisible('#btnSessions')), 'consultant tools hidden for client');
  const card = 'article[data-k="neck:v"] button[data-v="n"]';
  await k.evaluate(s => document.querySelector(s).click(), card); await k.waitForTimeout(100);
  await k.fill('[data-cnote="upper"]', 'أحب الرقبة المربعة أكثر'); await k.waitForTimeout(700);
  // simulate closing the browser and opening the link again
  await k.close(); const k2 = await kctx.newPage(); watch(k2); await k2.goto(link); await k2.waitForTimeout(800);
  ok(await k2.inputValue('[data-cnote="upper"]') === 'أحب الرقبة المربعة أكثر', 'client note persisted after reopening');
  ok(await k2.evaluate(() => S.picks['neck:v']) === 'n', 'client pick persisted after reopening');
  await k2.evaluate(() => document.getElementById('btnSend').click()); await k2.waitForTimeout(500);
  const reply = await k2.inputValue('.linkbox');
  ok(reply.includes('#r='), 'reply link generated, length ' + reply.length);
  await k2.screenshot({ path: 'e2e_client.png' });
  // ── consultant receives ──
  await c.goto(reply); await c.waitForTimeout(1500);
  ok(await c.evaluate(id => S.id === id, sid), 'reply opened the right client file');
  ok(await c.evaluate(() => S.cnotes.upper) === 'أحب الرقبة المربعة أكثر', 'client note merged into consultant file');
  ok(await c.evaluate(() => S.picks['neck:v']) === 'n', 'client pick merged');
  ok(await c.evaluate(() => S.notes.ana) === 'ملاحظة المستشارة للتحليل', 'consultant notes preserved');
  ok((await c.textContent('#reportBox')).includes('أحب الرقبة المربعة'), 'client notes appear in report');
  ok(errs.length === 0, 'no JS errors' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  await b.close();
})();
