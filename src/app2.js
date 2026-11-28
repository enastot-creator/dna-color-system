/* ═════════════ BODY DNA — PAGE ═════════════ */
const CH = [['cover', 'الغلاف'], ['profile', 'الملف'], ['map', 'القياسات'], ['analysis', 'التحليل'], ['found', 'التأسيس'], ['upper', 'العلوي'], ['lower', 'السفلي'], ['dresses', 'الفساتين'], ['outer', 'الجاكيتات'], ['fabric', 'الأقمشة'], ['acc', 'المكملات'], ['shoes', 'الأحذية'], ['trend', 'الترند'], ['report', 'التقرير']];
const field = (k, label, type = 'text', ph = '') => `<label class="fld"><span>${label}</span><input type="${type}" data-f="${k}" value="${esc(S.client[k] || '')}" placeholder="${ph}"></label>`;
const pfield = (k, label, type = 'text', ph = '') => `<label class="fld"><span>${label}</span><input type="${type}" data-p="${k}" value="${esc(S.profile[k] || '')}" placeholder="${ph}"></label>`;

function build() {
  const goals = [['تحديد نوع الجسد وتصنيفه وتفاصيله', 'التعرف على تفاصيل كل جزء، وحل نقاط الضعف وإبراز نقاط القوة بالطريقة الصحيحة.'], ['التأسيس الداخلي', 'المقاسات والمسميات والقصات الصحيحة للملابس الداخلية (Bra · Briefs) والمشدات الملائمة لتكوينك.'], ['القصات والأطوال والمقاسات', 'قصات الرقبة والصدر والأكمام والوسط والقطع السفلية، وأنواع الفساتين والتوبات والتنانير والبناطيل والجاكيتات والعبايات بأطوالها الصحيحة.'], ['الأقمشة والنقوش', 'تصنيف الأقمشة الصحيحة وأحجام النقوش والمطبوعات الملائمة لأبعاد جسدك.'], ['مكملات الإطلالة', 'حجم الحقائب والمجوهرات وأطوال العقود، شكل الأظافر، عرض الأحزمة، وتصاميم الأحذية الملائمة لساقك وقدمك.']];
  const html = `
<section class="cover" id="cover">
  <div class="cv-bg">${helixSVG(260, 1400, 5, 'hx big')}</div>
  <div class="cv-in">
    <div class="cv-logos">${LOGO_W}${ENAS_W}</div>
    <small class="kick">BODY SHAPE ANALYSIS · CONSULTATION FILE</small>
    <h1>جلسة استشارة<br><span>تحليل وتفاصيل الأجسام</span></h1>
    <p class="lead">ملف تفاعلي متكامل: خريطة قياسات ذكية، تحليل فوري لشكل الجسم، وقصات عصرية موضحة بالرسم — تختارين منها بلمسة، ويُبنى ملفك الخاص تلقائياً.</p>
    <div class="cv-card">${field('name', 'اسم العميلة', 'text', 'الاسم الكامل')}${field('date', 'تاريخ الجلسة', 'date')}${field('consultant', 'المستشارة', 'text', 'اسم المستشارة')}${field('phone', 'جوال العميلة', 'tel', '05xxxxxxxx')}${field('consultantPhone', 'جوال المستشارة (لاستقبال رد العميلة)', 'tel', '9665xxxxxxxx')}</div>
    <div class="cv-goals">${goals.map((g, i) => `<div><span>${String(i + 1).padStart(2, '0')}</span><b>${g[0]}</b><p>${g[1]}</p></div>`).join('')}</div>
    <a class="cv-start" href="#profile">ابدئي الجلسة ↓</a>
  </div>
</section>
${chapter(1, 'profile', 'CLIENT PROFILE', 'الملف الشخصي وأسلوب الحياة', 'نفهم حياتك قبل جسمك — حتى تكون كل توصية عملية وواقعية.', `
<div class="panel"><div class="fgrid">${pfield('age', 'العمر', 'number')}${pfield('weight', 'الوزن (كجم) — اختياري', 'number')}${pfield('work', 'طبيعة العمل / الدراسة')}${pfield('city', 'المدينة والمناخ')}</div>
<div class="q"><b>نمط الحياة اليومي</b>${chips('x', 'life', ['عمل رسمي', 'عمل مرن', 'طالبة', 'أم ومنزل', 'مناسبات كثيرة', 'سفر متكرر', 'رياضة', 'سيدة أعمال'], true)}</div>
<div class="q"><b>شخصية الأسلوب</b>${chips('x', 'style', ['كلاسيك راقٍ', 'ناعم رومانسي', 'مينيمال هادئ', 'عصري جريء', 'رياضي كاجوال', 'بوهو حر', 'درامي فاخر', 'محافظ أنيق'], true)}</div>
<div class="q"><b>مستوى الاحتشام المفضل</b>${chips('x', 'modest', ['محتشم كامل', 'محتشم عصري', 'معتدل', 'منفتح'])}</div>
<div class="q"><b>أهدافك من الإطلالة</b>${chips('x', 'goals', ['إبراز الخصر', 'إطالة القامة', 'إخفاء البطن', 'موازنة الأرداف', 'تخفيف الأكتاف', 'إبراز الصدر', 'تنحيف الذراعين', 'إطالة الساقين', 'إطلالة أكثر أنوثة', 'إطلالة أكثر قوة ورسمية'], true)}</div>
<div class="q"><b>الأولوية عند الشراء</b>${chips('x', 'prio', ['الراحة', 'الأناقة', 'الترند', 'الجودة والاستدامة', 'السعر'], true)}</div></div>
${note('profile', 'القطع المفضلة، الألوان التي ترتاح فيها، الماركات، القطع التي لا تُلبس…')}`)}
${chapter(2, 'map', 'INTERACTIVE BODY MAP', 'تحديد قياسات الجسم', 'اضغطي على أي رقم في المجسم أو أدخلي القياس مباشرة — يتحرك المجسم ويُحلَّل جسمك لحظياً.', `
<div class="maptools"><div class="seg" id="unitSeg"><button data-unit="cm" class="${S.unit === 'cm' ? 'on' : ''}">سنتيمتر</button><button data-unit="in" class="${S.unit === 'in' ? 'on' : ''}">إنش</button></div><span class="hint">💡 استخدمي شريط قياس ناعم، ملابس خفيفة، وقفة مستقيمة مرتاحة.</span></div>
<div class="mapgrid"><div class="mcol">${MEAS.slice(0, 10).map((m, i) => measInput(m, i)).join('')}</div><div class="mfig" id="mapFig"></div><div class="mcol">${MEAS.slice(10).map((m, i) => measInput(m, i + 10)).join('')}</div></div>
<div class="mapout" id="mapOut"></div>
<details class="health"><summary>مؤشرات صحية مرجعية (اختياري — ليست تشخيصاً)</summary><div id="healthBox"></div></details>
${note('map')}`)}
${chapter(3, 'analysis', 'BODY ANALYSIS', 'استنتاجات جلسة التحليل', 'تُحدَّد الخيارات تلقائياً من القياسات (●) ويمكنك تعديل أي خيار باللمس.', `
<div class="panel calc"><h3>🧮 حاسبة استنتاجات قياسات الجسم</h3><p class="mini">كل استنتاج مع القيم المستخدمة والمعادلة ومصدرها — تتحدّث فوراً مع كل قياس. (معتمد = من معيار منشور · تقديري = قاعدة تنسيق نستخدمها ويمكنكِ تعديل نتيجتها يدوياً بالأسفل).</p><div id="calcBox"></div></div>
<div class="ana">${ANA.map(g => `<div class="ag"><b>${g.t}</b>${chips('A', g.k, g.o)}</div>`).join('')}</div>
<h3 class="sh3">التحليل النهائي لتحديد شكل الجسم</h3><div class="shapes" id="shapePick"></div><div id="shapeResult"></div>
<div class="beauty"><h3>ضعي معاييركِ الخاصة بالجمال</h3><p>تذكّري عزيزتي أن لكل شخص جماله المتفرد؛ ضعي معاييرك الخاصة مع اتباع النصائح التي ستُبرز جمالك وتعرّفك على نقاط القوة في مظهرك.</p>
<div class="fgrid2"><label class="fld"><span>أحب في جسمي…</span><textarea data-note="love">${esc(S.notes.love || '')}</textarea></label><label class="fld"><span>أرغب في التركيز على…</span><textarea data-note="focus">${esc(S.notes.focus || '')}</textarea></label></div></div>
${note('ana')}`, true)}
${chapter(4, 'found', 'THE FOUNDATION', 'نبدأ من التأسيس الداخلي', 'حمالة الصدر الصحيحة هي الخطوة الأولى لضبط كل ملابسك — وهي لراحة وصحة جسدك.', `
<div class="two"><div class="panel calc"><h3>① حاسبة مقاس حمالة الصدر (Bra)</h3><p class="mini">أدخلي القياسين بالسنتيمتر أو الإنش حسب الوحدة المختارة في خريطة القياسات — النتيجة فورية ومتزامنة مع ملف العميلة.</p>
<div class="calc-in"><label><span>محيط أسفل الصدر</span><input type="number" inputmode="decimal" step="0.1" data-m="underbust" data-calc="1"></label><label><span>محيط الصدر (أبرز نقطة)</span><input type="number" inputmode="decimal" step="0.1" data-m="bust" data-calc="1"></label><b class="calc-u" id="calcUnit"></b></div>
<div id="braOut"></div>
<ol class="steps"><li><b>محيط أسفل الصدر (الحزام):</b> شريط ناعم مستوٍ مشدود بارتياح مباشرة تحت الصدر.</li><li><b>محيط الصدر:</b> أكثر نقطة امتلاءً، والشريط مستوٍ على الظهر بدون شدّ.</li><li><b>مقاس الحزام (Band):</b> يؤخذ من محيط أسفل الصدر ويُحوَّل حسب النظام المعتمد (EU يُقرَّب لأقرب 5 سم).</li><li><b>حجم الكوب (Cup):</b> اطرحي محيط أسفل الصدر من محيط الصدر — 12–14 سم = A، وكل 2 سم إضافية = حرف تالٍ (B، C، D…).</li></ol>
<p class="mini">⚠ انظري لبلد الصنع قبل الشراء — الأرقام تختلف من دولة لأخرى؛ استخدمي جدول التحويل العالمي.</p></div>
<div class="panel"><h3>جدول المقاسات العالمي لحمالات الصدر</h3><div data-st="bra"></div></div></div>
${grid('bra', 'شكل وتصاميم حمالات الصدر الصحيحة لكِ', 'مع أبرز المسميات لتسهيل البحث والشراء')}
<div class="two">${tipBox('قواعد ذهبية في اختيار الحمالة', TIPS.bra)}${tipBox('التأكد من ملاءمة حمالة الصدر', TIPS.braFit, '✓')}</div>
<div class="warnrow"><b>أبرز علامات المقاس الخاطئ:</b>${TIPS.wrongBra.map(t => `<span>${t}</span>`).join('')}</div>
<div class="panel"><h3>② المقاس الصحيح للملابس الداخلية السفلية (Panties)</h3><p class="mini">قيسي الخصر عند أضيق نقطة، والورك عند أوسع نقطة — ويُعتمد الورك في الاختيار.</p><div data-st="bottom"></div></div>
${grid('panty', 'أنواع ومسميات الـ Panties المناسبة لشكل جسمك', 'لمقاس وقصة الكيلوت تأثير كبير على شكل الملابس الخارجية — حتى المنسدلة')}
${tipBox('نصائح لاختيار المقاس والقصة', TIPS.panty)}
<div class="panel"><h3>③ المشدات المناسبة لشكل وتفاصيل جسدك</h3><p>المشدات نوعان: للإطلالات اليومية (دعم خفيف–متوسط) وللمناسبات (دعم عالٍ). المشد لا يخفي الدهون فقط؛ بل يُظهر الملابس بشكل انسيابي جميل.</p><div id="sizeOut"></div></div>
${grid('shapewear', 'أنواع المشدات ومسمياتها', 'Shapewear · Waist trainer · Steel-boned corset')}
${tipBox('تذكّري', TIPS.shapewear, '!')}
${note('found')}`)}
${chapter(5, 'upper', 'UPPER BODY CUTS', 'القطع العلوية', 'قصات الرقبة والصدر، الأكمام، والتوبات — مع مسمياتها للبحث والتسوق.', `
${grid('neck', 'قصات الرقبة والصدر الصحيحة لكِ', 'اضغطي على الرسمة للتكبير ومعرفة سبب الملاءمة')}
${tipBox('القميص والأزرار', TIPS.shirt)}
${grid('sleeve', 'قصات الأكمام ومسمياتها الصحيحة لكِ')}
${tipBox('الفرق بين بدايات الأكمام مع حدود الكتف', TIPS.sleeveStart)}
<div class="panel"><h3>الطول المناسب للأكمام لذراعيكِ</h3><p class="mini">طول الكم يحدد أين تتوقف العين على الذراع: أنهيه عند أنحف نقطة (فوق المرفق أو عند الساعد أو المعصم) وتجنّبي أن ينتهي عند أعرض نقطة. يُحدَّد المقترح من طول الذراع ومحيط أعلاه.</p><div data-lenbox="sleeve"></div>
<div class="callout" style="margin-top:14px">📏 <b>قاعدة القياس:</b> الكم الكامل الصحيح ينتهي عند عظمة الرسغ تماماً والذراع مرتخية، ومع ثني المرفق يجب ألا يرتفع أكثر من 2–3 سم. في جداول الماركات ابحثي عن «Sleeve length» مساوياً تقريباً لطول ذراعك المسجّل في خريطة القياسات (رقم 17).</div></div>
${grid('top', 'قصات الـ TOPS المناسبة لكِ')}
<div class="panel"><h3>مقاسك الصحيح للملابس العلوية (Top Wear Sizing)</h3><p class="mini">القياسات تختلف بين العلامات التجارية — راجعي دليل كل ماركة. يُحدَّد صفّك تلقائياً من محيط الصدر.</p><div data-st="top"></div></div>
${note('upper')}`)}
${chapter(6, 'lower', 'LOWER BODY CUTS', 'القطع السفلية', 'التنانير والبناطيل والجينز والشورت والجمبسوت — مع الأطوال الصحيحة لكِ.', `
${grid('skirt', 'قصات التنانير الملائمة لكِ')}
<div class="panel"><h3>الأطوال الصحيحة لكِ ومسميات أطوال التنورة</h3><p class="mini">اضغطي على الطول لاعتماده — ✦ الأطوال الملائمة لطولك وشكل ساقك.</p><div data-lenbox="skirt"></div></div>
${grid('pants', 'قصات البنطال الملائمة لكِ')}
<div class="panel"><h3>أطوال البنطال الملائمة لكِ</h3><div data-lenbox="pants"></div></div>
${grid('rise', '① قصة الجينز: ارتفاع الوسط', 'أول نقطة في اختيار الجينز الصحيح')}
${grid('jeans', '② اختاري قصة ونوع الجينز الصحيحة')}
${tipBox('أسرار الجينز المثالي', TIPS.jeans)}
${grid('shorts', 'قصات الشورت المناسبة لكِ')}
${grid('jump', 'قصات الجمبسوت', 'طبّقي قواعد الصدر والأكمام والتوب والقطع السفلية معاً')}
<div class="panel"><h3>مقاسك الصحيح للملابس السفلية (Bottom Wear Sizing)</h3><div data-st="bottom"></div></div>
${note('lower')}`)}
${chapter(7, 'dresses', 'DRESSES · ABAYA · CONSTRUCTION', 'الفساتين والعبايات وقصات الخياطة', 'يوجد أنواع لا حصر لها من التصاميم؛ لذلك طبّقي القواعد المذكورة على الفستان كقطعة علوية وسفلية معاً.', `
${grid('dress', 'قصات وأنواع الفساتين الملائمة لأبعاد جسدك')}
${grid('seam', 'أنواع قصات الخياطة وتأثيرها على شكل جسدك', 'خدع بصرية احترافية تستخدمها دور الأزياء')}
${grid('abaya', 'قصات العباءة الملائمة لكِ', 'قسم خاص بالعباءة الخليجية العصرية')}
${note('dresses')}`, true)}
${chapter(8, 'outer', 'OUTERWEAR', 'الجاكيتات والمعاطف', 'الطول والقصة وشكل الطية — ثلاثة قرارات تصنع فرقاً كاملاً.', `
<div class="panel"><h3>أنواع الجاكيت بحسب الطول</h3><div data-lenbox="jacket"></div></div>
${grid('jacket', 'قصات الجاكيت ومسمياتها الملائمة لكِ')}
${grid('coat', 'قصة الكوت الملائمة لكِ')}
${note('outer')}`)}
${chapter(9, 'fabric', 'FABRICS & PRINTS', 'الأقمشة والنقوش والمطبوعات', 'الخامة تحدد كيف تتصرف القصة على جسمك — والنقشة تحدد أين تذهب العين.', `
${grid('fabric', 'تصنيف الأقمشة الصحيحة لكِ')}
<div class="panel"><h3>قسم النقوش والمطبوعات — مقياسكِ الشخصي</h3><div id="printBox"></div></div>
${tipBox('قواعد النقوش', TIPS.prints)}
${grid('print', 'أنواع ومسميات أهم أشكال الـ Pattern')}
${note('fabric')}`)}
${chapter(10, 'acc', 'ACCESSORIES', 'مكملات الإطلالة', 'الحقائب والمجوهرات والأظافر والأحزمة — بمقاييس جسمك.', `
<div id="accBox"></div>
${grid('bag', 'أنواع ومسميات الحقائب')}
<div class="panel"><h3>أطوال العقود الملائمة لكِ</h3><p class="mini">طول العقد يرسم خطاً يطيل الرقبة أو يقصّرها — اضغطي لاعتماده.</p><div id="necklBox"></div></div>
${grid('earring', 'الأقراط الملائمة لطول رقبتك وحجم هيكلك')}
${grid('nail', 'شكل قصة الأظافر الملائمة لشكل وحجم أصابعك')}
<div class="panel"><h3>اختيارك الصحيح للأحزمة</h3><div id="beltBox"></div></div>
${grid('belt', 'أنواع ومسميات الأحزمة')}
${note('acc')}`, true)}
${chapter(11, 'shoes', 'FOOTWEAR', 'تصاميم الأحذية الملائمة لشكل الجسد والساق', 'عند اختيار الحذاء راعي المقاس والجودة والاختيار السليم لشكل ساقك.', `
<div class="panel"><h3>أطوال الكعب الملائمة للأماكن</h3><div class="heelh">${HEELS_H.map((h, i) => `<div><svg viewBox="16 44 176 96">${shoe([8, 22, 40, 56][i], { heel: i ? 'stiletto' : 'block' })}</svg><b>${h[0]}</b><p>${h[1]}</p></div>`).join('')}</div></div>
${grid('heel', 'أسماء وأنواع الأحذية والكعب')}
${grid('strap', 'عرض حزام الكاحل الملائم لكِ (Ankle strap)')}
${grid('bootLen', 'أطوال البوت الملائمة لشكل الساق')}
${grid('boot', 'أنواع ومسميات البوت')}
${tipBox('طريقة اختيار الكعب المريح والصحي لجسدك', TIPS.shoesFit)}
${note('shoes')}`)}
${chapter(12, 'trend', 'TREND RADAR 2025/26', 'رادار الترند لكِ', 'أبرز ترندات الموسم — مُقيّمة تلقائياً حسب شكل جسمك وتفاصيله.', `<div class="trends" id="trendBox"></div>${note('trend')}`, true)}
${chapter(13, 'report', 'YOUR BODY DNA', 'ملفكِ النهائي', 'يُبنى تلقائياً من التحليل والاختيارات — جاهز للطباعة أو الحفظ PDF وإرساله للعميلة.', `<div class="rtools"><button class="btn" data-print="report">⎙ طباعة / حفظ PDF للتقرير</button><button class="btn ghost" data-print="all">⎙ طباعة الملف كاملاً</button></div><div id="reportBox"></div>`)}
`;
  $('#app').innerHTML = html;
  $('#nav').innerHTML = CH.map(([id, t], i) => `<a href="#${id}" data-nav="${id}"><span>${String(i).padStart(2, '0')}</span>${t}</a>`).join('');
}
function healthBox() {
  const el = $('#healthBox'); if (!el) return;
  const r = []; if (D.whr) r.push(`<p><b>نسبة الخصر للأرداف (WHR): ${fmt(D.whr, 2)}</b> — حسب منظمة الصحة العالمية يرتفع الخطر الصحي للنساء عند 0.85 فأكثر.</p>`);
  if (D.whtr) r.push(`<p><b>نسبة الخصر للطول (WHtR): ${fmt(D.whtr, 2)}</b> — المرجع الشائع: أقل من 0.5 ضمن النطاق الصحي.</p>`);
  el.innerHTML = r.join('') || '<p class="mini">تظهر بعد إدخال الوسط والأرداف والطول.</p>';
}

/* ── events ── */
document.addEventListener('input', e => {
  const t = e.target;
  if (t.dataset.m) { const k = t.dataset.m, v = parseFloat(t.value); S.M[k] = isNaN(v) || v <= 0 ? undefined : (S.unit === 'in' ? v * IN : v); $$(`[data-m="${k}"]`).forEach(o => { if (o !== t) o.value = S.M[k] ? fmt(S.unit === 'in' ? toIn(S.M[k]) : S.M[k]) : ''; const mi = o.closest('.mi'); mi && mi.classList.toggle('has', !!S.M[k]); }); update(); healthBox(); }
  else if (t.dataset.f) { S.client[t.dataset.f] = t.value; update(); }
  else if (t.dataset.p) { S.profile[t.dataset.p] = t.value; save(); }
  else if (t.dataset.note) { S.notes[t.dataset.note] = t.value; save(); clearTimeout(t._r); t._r = setTimeout(renderReport, 600); }
});
document.addEventListener('click', e => {
  const t = e.target.closest('button, [data-zoom], [data-focus], [data-len], [data-neckl], a[data-nav]'); if (!t) { if (e.target.id === 'zoom') $('#zoom').classList.remove('open'); return; }
  if (t.dataset.pick) { const k = t.dataset.pick; S.picks[k] = S.picks[k] === t.dataset.v ? '' : t.dataset.v; if (!S.picks[k]) delete S.picks[k]; refreshBadges(); renderReport(); save(); if ($('#zoom').classList.contains('open')) zoom(k); return; }
  if (t.dataset.zoom) return zoom(t.dataset.zoom);
  if (t.dataset.focus) { const i = $(`[data-m="${t.dataset.focus}"]`); i && (i.focus(), i.closest('.mi').scrollIntoView({ block: 'nearest', behavior: 'smooth' })); return; }
  if (t.dataset.len) { const [k, id] = t.dataset.len.split(':'), a = S.x['len_' + k] = S.x['len_' + k] || []; const j = a.indexOf(id); j < 0 ? a.push(id) : a.splice(j, 1); refreshBadges(); renderReport(); save(); return; }
  if (t.dataset.neckl) { const a = S.x.neckl = S.x.neckl || []; const j = a.indexOf(t.dataset.neckl); j < 0 ? a.push(t.dataset.neckl) : a.splice(j, 1); refreshBadges(); renderReport(); save(); return; }
  if (t.classList.contains('chip')) {
    const box = t.closest('.chips'), st = box.dataset.store, k = box.dataset.key, i = +t.dataset.i;
    if (box.dataset.multi === '1') { const a = S[st][k] = S[st][k] || []; const j = a.indexOf(i); j < 0 ? a.push(i) : a.splice(j, 1); t.classList.toggle('on'); save(); return; }
    S[st][k] = S[st][k] === i ? null : i; if (st === 'A') S.manual[k] = true;
    $$('.chip', box).forEach(b => b.classList.toggle('on', S[st][k] === +b.dataset.i));
    update(); return;
  }
  if (t.dataset.shape) { S.shape = S.shape === t.dataset.shape ? null : t.dataset.shape; S.shapeManual = !!S.shape && S.shape !== D.shape; update(); return; }
  if (t.dataset.unit) { S.unit = t.dataset.unit; $$('#unitSeg button').forEach(b => b.classList.toggle('on', b === t)); $$('[data-m]').forEach(i => { const v = S.M[i.dataset.m]; i.value = v ? fmt(S.unit === 'in' ? toIn(v) : v) : ''; i.placeholder = S.unit === 'in' ? 'إنش' : 'سم'; }); update(); return; }
  if (t.dataset.big) { const g = t.closest("[data-grid]").querySelector(".grid"); g.classList.toggle("big"); t.textContent = g.classList.contains("big") ? "⤡ عرض مصغّر" : "⤢ عرض كبير"; return; }
  if (t.dataset.filter) { const sec = t.closest('[data-grid]'); $$('.seg button', sec).forEach(b => b.classList.toggle('on', b === t)); const f = t.dataset.filter; $$('.it', sec).forEach(c => { c.hidden = f === 'rec' ? c.dataset.rs !== 'rec' : f === 'trend' ? c.dataset.trend !== '1' : f === 'picked' ? !(c.classList.contains('p-y') || c.classList.contains('p-n')) : false; }); return; }
  if (t.dataset.apply) { const cat = t.dataset.apply, T = tags(); if (!T.size) return flash('أكملي التحليل أولاً'); let n = 0; LIB[cat].forEach(it => { const k = cat + ':' + it.id; if (S.picks[k]) return; const sc = score(it, T); if (sc.st === 'rec') { S.picks[k] = 'y'; n++; } else if (sc.st === 'avoid') { S.picks[k] = 'n'; n++; } }); refreshBadges(); renderReport(); save(); flash(`تم تطبيق ${n} مقترحاً`); return; }
  if (t.dataset.print) { document.body.classList.toggle('print-report', t.dataset.print === 'report'); renderReport(); setTimeout(() => { window.print(); setTimeout(() => document.body.classList.remove('print-report'), 600); }, 60); return; }
  if (t.id === 'zClose') { $('#zoom').classList.remove('open'); return; }
  if (t.id === 'btnSessions') return openSessions();
  if (t.id === 'btnNew') { if (!confirm('بدء جلسة جديدة؟ الجلسة الحالية محفوظة في ملفات العميلات.')) return; DB.sessions[S.id] = S; S = blank(); startApp(); flash('جلسة جديدة'); return; }
  if (t.id === 'btnApplyAll') { const T = tags(); if (!T.size) return flash('أكملي التحليل أولاً'); let n = 0; Object.keys(CAT_AR).forEach(cat => LIB[cat].forEach(it => { const k = cat + ':' + it.id; if (S.picks[k]) return; const sc = score(it, T); if (sc.st) { S.picks[k] = sc.st === 'rec' ? 'y' : 'n'; n++; } })); refreshBadges(); renderReport(); save(); flash(`تم تطبيق ${n} مقترحاً على كل الأقسام`); return; }
  if (t.dataset.open) { DB.sessions[S.id] = S; S = DB.sessions[t.dataset.open]; startApp(); $('#sess').classList.remove('open'); return; }
  if (t.dataset.del) { if (!confirm('حذف ملف هذه العميلة نهائياً؟')) return; delete DB.sessions[t.dataset.del]; if (S.id === t.dataset.del) S = blank(); localStorage.setItem(KEY, JSON.stringify(DB)); openSessions(); return; }
  if (t.id === 'sClose') { $('#sess').classList.remove('open'); return; }
  if (t.id === 'btnExport') { const b = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = `BodyDNA-${(S.client.name || 'client').replace(/\s+/g, '_')}.json`; a.click(); return; }
  if (t.id === 'btnImport') { $('#fileIn').click(); return; }
});
$('#fileIn') || document.body.insertAdjacentHTML('beforeend', '<input type="file" id="fileIn" accept="application/json" hidden>');
document.addEventListener('change', e => { if (e.target.id !== 'fileIn') return; const f = e.target.files[0]; if (!f) return; f.text().then(txt => { try { const o = JSON.parse(txt); if (!o.M) throw 0; o.id = o.id || blank().id; DB.sessions[S.id] = S; S = o; startApp(); $('#sess').classList.remove('open'); flash('تم استيراد الملف'); } catch (er) { flash('ملف غير صالح'); } }); e.target.value = ''; });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { $('#zoom').classList.remove('open'); $('#sess').classList.remove('open'); } });
function openSessions() {
  DB.sessions[S.id] = S;
  const list = Object.values(DB.sessions).sort((a, b) => (b.client.date || '').localeCompare(a.client.date || ''));
  $('#sess .sc').innerHTML = `<h3>ملفات العميلات</h3><p class="mini">تُحفظ على هذا الجهاز فقط. صدّري الملف (JSON) لنقله لجهاز آخر أو للأرشفة.</p><div class="slist">${list.map(s => `<div class="srow ${s.id === S.id ? 'cur' : ''}"><div><b>${esc(s.client.name || 'بدون اسم')}</b><small>${esc(s.client.date || '')} · ${s.shape ? SHAPES[s.shape].ar : 'لم يُحلل'}</small></div><button class="btn sm" data-open="${s.id}">فتح</button><button class="btn sm ghost" data-del="${s.id}">حذف</button></div>`).join('')}</div><div class="rtools"><button class="btn" id="btnExport">⇩ تصدير الجلسة الحالية</button><button class="btn ghost" id="btnImport">⇧ استيراد ملف</button><button class="btn ghost" id="sClose">إغلاق</button></div>`;
  $('#sess').classList.add('open');
}
/* nav highlight + progress */
const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { $$('#nav a').forEach(a => a.classList.toggle('on', a.dataset.nav === en.target.id)); const a = $(`#nav a[data-nav="${en.target.id}"]`), nv = $('#nav'); a && nv.scrollTo({ left: a.offsetLeft - nv.clientWidth / 2 + a.offsetWidth / 2, behavior: 'smooth' }); } }), { rootMargin: '-45% 0px -50% 0px' });
window.addEventListener('scroll', () => { const h = document.documentElement; $('#prog').style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%'; }, { passive: true });
function startApp() { build(); $$('.chapter, .cover').forEach(s => io.observe(s)); update(); healthBox(); }
