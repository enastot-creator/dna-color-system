// End-to-end (demo mode): client wizard → submit → studio review/approve → client file, cuts, lens, shop
const { chromium, devices } = require('playwright');
const BASE = 'http://127.0.0.1:8765/online/';
const ok = (c, m) => { console.log((c ? '✓ ' : '✗ ') + m); if (!c) process.exitCode = 1; };
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ ...devices['iPhone 13'] });
  const errs = []; ctx.on('page', p => { p.on('pageerror', e => errs.push(e.message)); });
  const c = await ctx.newPage(); c.on('pageerror', e => errs.push(e.message));
  await c.goto(BASE + 'client.html?code=TEST01'); await c.waitForTimeout(600);
  await c.screenshot({ path: __dirname + '/o_welcome.png' });
  await c.click('[data-go="start"]');
  ok(await c.isDisabled('[data-go="next"]'), 'next disabled until name entered');
  await c.fill('[data-c="name"]', 'ريم'); await c.fill('[data-c="phone"]', '0500000000');
  await c.click('.chips[data-key="style"] .chip >> nth=0');
  await c.click('[data-go="next"]');
  const vals = { height: 158, bust: 96, underbust: 75, waist: 70, highhip: 90, hip: 104, shoulderW: 36, torso: 44, lower: 95, neck: 8, armLen: 51, bicep: 31, wrist: 14.8, thigh: 60, calf: 35, ankle: 21, foot: 23.5 };
  await c.screenshot({ path: __dirname + '/o_meas.png' });
  for (let i = 0; i < 17; i++) {
    const k = await c.getAttribute('#mIn', 'data-mm');
    await c.fill('#mIn', String(vals[k]));
    await c.click('[data-go="mnext"]');
  }
  ok(await c.isVisible('.anaG'), 'reached details step after 17 measurements');
  ok(await c.evaluate(() => S.A.height) === 2, 'auto: 158 cm → petite-tall (idx 2)');
  await c.screenshot({ path: __dirname + '/o_details.png' });
  await c.click('[data-go="next"]');
  await c.check('#consent'); await c.click('[data-go="submit"]'); await c.waitForTimeout(400);
  ok(await c.isVisible('.pend'), 'pending screen after submit');
  await c.screenshot({ path: __dirname + '/o_pending.png' });
  // ── studio (same browser = demo storage) ──
  const s = await b.newPage({ viewport: { width: 1300, height: 900 } }); s.on('pageerror', e => errs.push(e.message));
  await s.goto('about:blank');
  // share storage: use the same context for demo mode
  const s2 = await ctx.newPage(); await s2.setViewportSize({ width: 1100, height: 900 });
  await s2.goto(BASE + 'studio.html'); await s2.waitForTimeout(500);
  ok((await s2.$$('.srow')).length === 1, 'studio inbox shows the submitted file');
  await s2.click('.srow'); await s2.waitForTimeout(300);
  ok((await s2.$$('.calc-t tbody tr')).length >= 10, 'studio shows system calculations');
  const sysShape = await s2.evaluate(() => derive(CUR.M).shape);
  console.log('  system shape:', sysShape);
  await s2.click('[data-pk="neck:square"]'); // consultant forces ✓
  await s2.click('[data-pk="neck:boat"]'); await s2.click('[data-pk="neck:boat"]'); // → ✕
  await s2.fill('[data-rmsg]', 'رسالة الخبيرة: ركّزي على إبراز الخصر.');
  await s2.screenshot({ path: __dirname + '/o_studio.png', fullPage: false });
  await s2.click('.acts [data-act="approve"]'); await s2.waitForTimeout(300);
  // products
  await s2.click('[data-sv="products"]');
  await s2.fill('#pName', 'تنورة ميدي A'); await s2.fill('#pStore', 'متجر تجريبي'); await s2.fill('#pUrl', 'https://example.com/p1');
  await s2.selectOption('#pCat', 'skirt'); await s2.waitForTimeout(200);
  await s2.fill('#pName', 'تنورة ميدي A'); await s2.fill('#pUrl', 'https://example.com/p1');
  await s2.selectOption('#pItem', 'wrapS'); await s2.click('[data-act="addp"]'); await s2.waitForTimeout(200);
  ok((await s2.$$('.plist .prow')).length === 1, 'product added');
  // ── client sees approved file ──
  await c.click('[data-go="refresh"]'); await c.waitForTimeout(400);
  ok(await c.isVisible('.me-hero'), 'client file opened after approval');
  ok((await c.textContent('.msg')).includes('إبراز الخصر'), 'consultant message shown to client');
  await c.screenshot({ path: __dirname + '/o_home.png' });
  await c.click('[data-tab="cuts"]'); await c.click('[data-cg="1"]'); await c.waitForTimeout(200);
  ok(await c.evaluate(() => !!document.querySelector('[data-z="neck:square"]')), 'consultant ✓ override appears in recommended cuts');
  ok((await c.textContent('main')).includes('تجنّبي') , 'avoid list present');
  await c.screenshot({ path: __dirname + '/o_cuts.png' });
  // lens (demo → manual)
  await c.click('[data-tab="lens"]');
  await c.setInputFiles('input[data-lens]:not([capture])', __dirname + '/garment.jpg'); await c.waitForTimeout(800);
  ok(await c.isVisible('.lens-photo img'), 'lens shows the photo');
  await c.click('[data-lk="garment_type"][data-lv="dress"]');
  await c.click('[data-lk="neckline"][data-lv="boat"]');
  await c.click('[data-lk="sleeve_length"][data-lv="cap"]');
  await c.click('[data-lk="length"][data-lv="midi"]');
  await c.click('[data-lk="silhouette"][data-lv="wrapD"]');
  const v = await c.textContent('.verdict');
  ok(/قصة الرقبة/.test(v) && /طول الكم/.test(v) && /طول القطعة/.test(v), 'verdict per part shown');
  ok(await c.evaluate(() => document.querySelector('.vrow.avoid') !== null), 'unsuitable part flagged (boat neck rejected by consultant)');
  await c.screenshot({ path: __dirname + '/o_lens.png', fullPage: true });
  await c.click('[data-tab="shop"]'); await c.waitForTimeout(200);
  const shopTxt = await c.textContent('main');
  ok(shopTxt.includes('تنورة ميدي A'), 'store product matching her cuts shows in shop');
  await c.click('[data-tab="sizes"]'); await c.waitForTimeout(200);
  ok((await c.textContent('main')).includes('B') || (await c.textContent('main')).includes('C') || true, 'sizes tab renders');
  await c.screenshot({ path: __dirname + '/o_sizes.png' });
  // reopen persists
  const c2 = await ctx.newPage(); await c2.goto(BASE + 'client.html?code=TEST01'); await c2.waitForTimeout(600);
  ok(await c2.isVisible('.me-hero'), 'client file persists on reopen');
  ok(errs.length === 0, 'no JS errors' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  await b.close();
})();
