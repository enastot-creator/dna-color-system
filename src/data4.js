/* ═════════════ LIBRARY PART 4 — expanded variety (v2) ═════════════ */
const add = (cat, arr) => LIB[cat].push(...arr);
const sheer = s => `<g opacity=".5">${s}</g>`;
const slitLeg = (x, y1, y2) => `<path d="M${x} ${y1}L${x + 5} ${y2}L${x - 5} ${y2}Z" fill="url(#gM)" stroke="#081d44" stroke-width=".4"/>`;
const sideStripe = (y1, y2) => both(`<path d="M${100 + 35.5} ${y1}L${100 + 25.5} ${y2}" stroke="#fff" stroke-width="2.4" opacity=".85"/>`);
const cuffs = y => both(`<rect x="${100 + 4}" y="${y - 7}" width="27" height="6" rx="1.5" fill="url(#gF2)" stroke="#081d44" stroke-width=".4"/>`);

add('neck', [
  { id: 'keyhole', en: 'Keyhole', ar: 'رقبة بفتحة مفتاح', d: 'فتحة صغيرة على شكل قطرة تحت رقبة مغلقة؛ تمنح عمقاً محتشماً وتكسر امتلاء الصدر قليلاً.', g: 'bS A H X nL', a: '', s: () => neckCard('crew', `<path d="M100 75C95 80 94.5 90 100 96C105.5 90 105 80 100 75Z" fill="url(#gM)" stroke="#081d44" stroke-width=".5"/>`) },
  { id: 'queenanne', en: 'Queen Anne', ar: 'كوين آن', d: 'ياقة مرتفعة على جانبي الرقبة تنزل لفتحة قلب في المنتصف؛ ملكية تطيل الرقبة وتؤطر الوجه.', g: 'nS X A bL', a: 'shB', s: () => neckCard([[0, 96, 1], [7, 90], [13, 90], [17, 80], [16, 63, 1], [19, 64, 1]], '', { sleeveless: true }) },
  { id: 'portrait', en: 'Portrait Collar', ar: 'ياقة بورتريه', d: 'ياقة عريضة مطوية تحيط بالأكتاف كإطار لوحة؛ فخمة للسهرات وتوسّع الأكتاف الضيقة.', g: 'shN shSl A S nL', a: 'shB V bL', s: () => mq() + bodice('off', { len: 172, fit: 'semi' }) + PT.g(sp([[54, 90, 1], [100, 86], [146, 90, 1], [147, 101, 1], [100, 99], [53, 101, 1]]), 'F2'), t: 1 },
  { id: 'mandarin', en: 'Mandarin Collar', ar: 'ياقة ماندرين', d: 'ياقة واقفة قصيرة بدون طيّات؛ أنيقة ومحتشمة وتناسب الرقبة الطويلة.', g: 'nL bS H A', a: 'nS bL', s: () => neckCard('crew', PT.g(sp([[90.5, 60, 1], [109.5, 60, 1], [110.8, 69, 1], [89.2, 69, 1]]), 'F2') + PT.l('M100 69L100 172', .35) + PT.c(100, 82) + PT.c(100, 98)) },
  { id: 'peterpan', en: 'Peter Pan Collar', ar: 'ياقة بيتر بان', d: 'ياقة مستديرة مسطحة ناعمة؛ تضيف تفصيلة لطيفة للصدر الصغير والأكتاف الضيقة.', g: 'bS shN A pt', a: 'bL nS', s: () => neckCard('crew', both(PT.g(sp([[100.5, 75.5, 1], [110.5, 66.5], [119, 71], [117, 82], [105, 85]]), 'I'))) },
  { id: 'illusion', en: 'Illusion / Sheer Yoke', ar: 'صدرية شفافة', d: 'جزء شفاف أعلى الصدر فوق قصة سويت هارت؛ حل أنيق للاحتشام مع إبراز التصميم.', g: 'X A H bS bL', a: '', s: () => mq() + sheer(bodice('jewel', { len: 120, fit: 'semi', sleeveless: true, sw: 34 }, 'L')) + bodice('sweetheart', { len: 172, fit: 'semi' }), t: 1 },
  { id: 'asymDrape', en: 'Draped Asymmetric', ar: 'رقبة مائلة منسدلة', d: 'فتحة مائلة بطيّات ناعمة؛ تصنع حركة قُطرية تخفف الأكتاف العريضة والصدر الكبير.', g: 'V shB bL O X', a: '', s: () => mq() + PT.g(sp([[138, 77, 1], [134.5, 88], [133.6, 99], [134.6, 116], [131.5, 131], [128, 150], [133, 172, 1], [100, 173.5], [67, 172, 1], [72, 150], [68.5, 131], [65.4, 116], [66.2, 101], [78, 100], [108, 86], [125, 70, 1]])) + PT.l('M124 76Q108 98 84 104', .35) + PT.l('M126 84Q112 108 88 112', .25) }
]);

add('sleeve', [
  { id: 'angel', en: 'Angel / Butterfly', ar: 'كم ملائكي', d: 'ينسدل واسعاً من الكتف كالجناح؛ يخفي أعلى الذراع الممتلئ بحركة ناعمة.', g: 'armF O A tall', a: 'pt fS', s: () => topBase('vShallow', { len: 165 }, { len: .55, ease: 2, innerK: 1.35, w: u => 15 * Math.pow(u, 1.2) }), t: 1 },
  { id: 'capeS', en: 'Cape Sleeve', ar: 'كم كاب', d: 'طبقة تنسدل فوق الذراع حتى المرفق؛ تغطي الذراعين بأناقة دون أن تقيّدها.', g: 'armF A O', a: 'shB V', s: () => mq() + bodice('crew', { len: 165, sleeveless: true, sw: 33 }) + both(PT.g(sp([[110, 67], [139, 76], [156, 140, 1], [128, 146, 1], [126, 104]]))), t: 1 },
  { id: 'tulipS', en: 'Tulip / Petal', ar: 'كم توليب', d: 'كم قصير من طبقتين متقاطعتين كبتلات الزهرة؛ يغطي أعلى الذراع بلطف.', g: 'armF A X', a: '', s: () => topBase('crew', { len: 165 }, { len: .32, ease: 2.6, w: u => 3 * Math.sin(Math.PI * u) }) + both(PT.l('M136 80Q150 98 146 112', .5, .8)) },
  { id: 'ruffleS', en: 'Tiered Ruffle', ar: 'كم كشكش طبقات', d: 'طبقتان من الكشكشة؛ تضيف حجماً للأكتاف الضيقة والأذرع النحيلة.', g: 'shN armS A S bS', a: 'shB V armF', s: () => topBase('crew', { len: 165 }, { len: .34, ease: 2, w: u => u < .5 ? 7 * u * 2 : 4 + 10 * (u - .5) * 2 }) + both(PT.l('M137 94L151 92', .5, .8)) },
  { id: 'split', en: 'Split Sleeve', ar: 'كم مشقوق', d: 'كم طويل بفتحة جانبية تكشف الذراع جزئياً؛ تفصيلة عصرية تخفف الكتلة.', g: 'H V X', a: '', s: () => topBase('crew', { len: 165 }, { len: .97, ease: 2.4, cuff: .05 }) + both(`<path d="M146 128L152 192L147 193Z" fill="url(#gM)" stroke="#081d44" stroke-width=".4"/>`), t: 1 },
  { id: 'bracelet', en: '7/8 Bracelet', ar: 'كم سبعة أثمان', d: 'ينتهي فوق المعصم بقليل ليُظهر الإسوارة والساعة؛ مثالي للذراع القصيرة والبتيت.', g: 'aS pt fS X H', a: 'aL', s: () => topBase('crew', { len: 165 }, { len: .82, ease: 1.9, cuff: .05 }) },
  { id: 'rolled', en: 'Rolled-Up Cuff', ar: 'كم مثني', d: 'كم قميص مطوي فوق المرفق؛ أسلوب مريح يكشف أنحف جزء من الذراع.', g: 'armF H V O', a: '', s: () => topBase('vShallow', { len: 172 }, { len: .58, ease: 2.6, cuff: .1 }) + shirtCollar() },
  { id: 'extralong', en: 'Extra-Long', ar: 'كم طويل جداً', d: 'يغطي جزءاً من اليد؛ ترند الكنزات والأوفرسايز — للذراع الطويلة والقامة الطويلة.', g: 'aL tall fS', a: 'aS pt', s: () => topBase('crew', { len: 172, fit: 'boxy' }, { len: 1.05, ease: 2.8 }), t: 1 },
  { id: 'offFlounce', en: 'Bardot Flounce', ar: 'كم أوف شولدر مكشكش', d: 'كم منخفض يبدأ تحت الكتف بكشكشة؛ يوسّع الأكتاف ويجذب النظر للأعلى.', g: 'A S shN shSl', a: 'shB V armF', s: () => mq() + sleeves({ start: .14, len: .42, ease: 1.8, w: u => 7 * Math.pow(u, 1.4) }) + bodice('off', { len: 168 }) }
]);

add('top', [
  { id: 'cropCardi', en: 'Cropped Cardigan', ar: 'كارديجان قصير', d: 'كارديجان محبوك ينتهي عند الخصر بأزرار؛ ترند يُلبس وحده كتوب.', g: 'pt tL A S X bS', a: 'tS O bF', s: () => mq() + jacket({ len: 152, fit: 'fitted', collarless: 1, closed: true, yb: 84, buttons: 4, cuff: .07 }) + hline(148, 28, .4), t: 1 },
  { id: 'sweater', en: 'Knit Sweater', ar: 'كنزة محبوكة', d: 'كنزة بحافة ريب؛ اختاري محبوكاً متوسط السماكة وأدخلي مقدمتها لتحديد الخصر.', g: 'H V fS bS', a: 'O bL fL', s: () => topBase('crew', { len: 182, fit: 'semi' }, { len: .97, ease: 2.6, cuff: .07 }) + hline(176, 33, .45) + hline(179, 33, .3) },
  { id: 'bardotT', en: 'Bardot Top', ar: 'توب أوف شولدر', d: 'توب بكتف مكشوف وكم طويل؛ يوازن الأرداف ويبرز الترقوة.', g: 'A S shN nL', a: 'shB V', s: () => mq() + sleeves({ start: .12, len: .9, ease: 1.7, cuff: .04 }) + bodice('off', { len: 168, fit: 'fitted' }) },
  { id: 'halterT', en: 'Halter Top', ar: 'توب هولتر', d: 'رباط خلف الرقبة وقصة داخلية للأكتاف؛ يخفف الأكتاف العريضة.', g: 'V shB nL', a: 'bL nS shN', s: () => mq() + bodice('halter', { len: 162, fit: 'fitted' }) + bow(100, 60, 'F') },
  { id: 'fitShirt', en: 'Fitted Button-Down', ar: 'قميص مفصّل', d: 'قميص كلاسيكي بخياطات بنس تتبع الجسم؛ أساسي للعمل — افتحي أول زرين.', g: 'X H V bS', a: 'bL', s: () => topBase('vShallow', { len: 176, fit: 'fitted' }, { len: .97, ease: 1.7, cuff: .06 }) + shirtCollar() + PT.l('M100 86L100 176', .35) + [98, 116, 134, 152].map(y => PT.c(100, y)).join('') },
  { id: 'sheerT', en: 'Sheer Layer Top', ar: 'توب شفاف بطبقة', d: 'قميص شفاف فوق كامي؛ ترند الطبقات الشفافة بإطلالة محتشمة.', g: 'H V A bS', a: '', s: () => mq() + bodice('cami', { len: 166, fit: 'semi' }) + sheer(sleeves({ len: .97, ease: 2.6, cuff: .05 }, 38.5, 'L') + bodice('vShallow', { len: 180, fit: 'semi' }, 'L')) + shirtCollar('F2'), t: 1 },
  { id: 'oneT', en: 'One-Shoulder Top', ar: 'توب كتف واحد', d: 'خط قطري واحد يكسر عرض الأكتاف ويُبرز الترقوة.', g: 'V shB X H', a: '', s: () => mq() + PT.g(sp([[138, 77, 1], [134.5, 88], [133.6, 99], [134.6, 116], [131.5, 131], [128, 150], [131, 165, 1], [100, 166.5], [69, 165, 1], [72, 150], [68.5, 131], [65.4, 116], [66.2, 101], [80, 98], [112, 80], [125, 69.5, 1]])) },
  { id: 'wrapCardi', en: 'Wrap Cardigan', ar: 'كارديجان ملتف', d: 'محبوك طويل يُربط عند الخصر؛ يصنع V ويحدد الخصر بنعومة.', g: 'X O A bL H', a: '', s: () => mq() + jacket({ len: 210, fit: 'semi', lapel: 'shawl', db: true, belt: 1, buttons: 0, yb: 150, cuff: .07 }) }
]);

add('skirt', [
  { id: 'hanky', en: 'Handkerchief Hem', ar: 'حاشية منديل', d: 'حاشية بأطراف مدببة متدلية؛ حركة بوهو تخفي امتلاء الساق.', g: 'H O A cF', a: 'pt', s: () => LM() + PT.g(sp([[75.4, 149, 1], [124.6, 149, 1], [136, 192], [150, 288, 1], [134, 298], [118, 322, 1], [100, 302], [82, 322, 1], [66, 298], [50, 288, 1], [64, 192]])) + wb() },
  { id: 'slitMidi', en: 'Slit Midi', ar: 'ميدي بشق', d: 'تنورة مستقيمة متوسطة بشق أمامي؛ الشق يطيل الساق ويسهّل الحركة.', g: 'X H V pt lS', a: '', s: () => LM() + sk('column', { len: 334, hem: 35 }) + wb() + slitLeg(113, 286, 336), t: 1 },
  { id: 'tennis', en: 'Pleated Mini', ar: 'ميني بليسيه', d: 'تنورة قصيرة بكسرات؛ مرحة للأجسام النحيلة والساق الطويلة.', g: 'H V lL fS', a: 'thF A hL', s: () => LM() + sk('mini', { hem: 46, pts: [[34, 172]] }) + wb() + vlines(12, 156, 240, 26, 46, .3) },
  { id: 'cargoS', en: 'Cargo Midi', ar: 'تنورة كارجو', d: 'تنورة مستقيمة بجيوب جانبية؛ ترند عملي — للأرداف الصغيرة.', g: 'V H hS hF', a: 'A S hL thF', s: () => LM() + sk('column', { len: 332, hem: 38 }) + wb() + both(`<rect x="128" y="236" width="12" height="18" rx="2" fill="none" stroke="rgba(255,255,255,.55)" stroke-width=".8"/>`), t: 1 },
  { id: 'yoke', en: 'Yoke Flare', ar: 'تنورة بيوك', d: 'جزء مفصّل مسطح على الورك ثم كسرات أو اتساع؛ يحتوي البطن ويضيف حركة.', g: 'O A S bF hL', a: '', s: () => LM() + sk('midiA', { pts: [[33, 172], [36, 186], [44, 214]] }) + hline(184, 35, .55) + vlines(10, 186, 330, 36, 54, .2) },
  { id: 'straightMidi', en: 'Straight Midi', ar: 'ميدي مستقيمة', d: 'مستقيمة بطول منتصف الساق؛ كلاسيكية للعمل — مع حذاء بكعب للبتيت.', g: 'X H V tall', a: 'pt lS cF', s: () => LM() + sk('column', { len: 330, hem: 36.5 }) + wb() },
  { id: 'sarong', en: 'Sarong / Knot', ar: 'تنورة سارونق', d: 'لفّة بعقدة جانبية على الورك؛ قطرية مرتخية — تجنّبيها مع الورك العريض.', g: 'H V hS', a: 'A S hL', s: () => LM() + PT.g(sp([[75.4, 149, 1], [124.6, 149, 1], [136, 192], [140, 260], [146, 330, 1], [70, 334, 1], [64, 260], [64, 192]])) + PT.l('M124 152Q110 230 76 330', .5, .9) + bow(128, 168) }
]);

add('dress', [
  { id: 'bodycon', en: 'Bodycon Mini', ar: 'بوديكون قصير', d: 'ملتصق مرن بطول فوق الركبة؛ للأجسام المتوازنة مع مشد ناعم.', g: 'X lL H', a: 'O A bF thF hL', s: () => DR(sk('mini', { hem: 34, len: 246, pts: [[33, 170], [36.6, 192]], y0: 148 }), sleeves({ len: .97, ease: 1.2 }) + bodice('square', { len: 151, fit: 'fitted' })) },
  { id: 'teaD', en: 'Tea Dress', ar: 'فستان تي', d: 'أكمام منفوخة قصيرة وأزرار أمامية وتنورة ميدي؛ أنثوي ناعم لكل يوم.', g: 'X A H bS', a: '', s: () => DR(sk('midiA', { len: 326 }), sleeves({ len: .3, ease: 2, w: u => 5 * Math.sin(Math.PI * Math.min(.98, u)), cuff: .04 }) + bodice('vShallow', { len: 151, fit: 'fitted' }) + [96, 112, 128, 144].map(y => PT.c(100, y, 1.4)).join('')) },
  { id: 'tierD', en: 'Tiered Maxi Dress', ar: 'فستان طبقات ماكسي', d: 'طبقات متدرجة بإحساس البوهو؛ للطويلات والأجسام المستقيمة.', g: 'tall H V fS', a: 'pt hL A', s: () => DR(sk('tier', { y0: 150 }) + hline(218, 39, .5) + hline(291, 48, .5), bodice('square', { len: 152, fit: 'semi' }) + sleeves({ len: .3, ease: 1.6, w: u => 9 * Math.pow(u, 1.6) })), t: 1 },
  { id: 'halterD', en: 'Halter Maxi', ar: 'فستان هولتر ماكسي', d: 'رقبة هولتر وتنورة منسدلة للأرض؛ يخفف الأكتاف العريضة ويطيل.', g: 'V shB tall', a: 'bL nS shN', s: () => DR(sk('slip', { len: 388, y0: 150, hem: 42 }), bodice('halter', { len: 152, fit: 'fitted' }) + bow(100, 60, 'F')) },
  { id: 'offD', en: 'Off-Shoulder Midi', ar: 'فستان أوف شولدر', d: 'كتف مكشوف وتنورة A؛ يوازن الكمثري ويبرز الترقوة.', g: 'A S shN X', a: 'shB V', s: () => DR(sk('midiA', { len: 326 }), sleeves({ start: .12, len: .4, ease: 1.8 }) + bodice('off', { len: 151, fit: 'fitted' })) },
  { id: 'peplumD', en: 'Peplum Dress', ar: 'فستان بيبلوم', d: 'كشكشة عند الخصر فوق تنورة ضيقة؛ يصنع منحنيات للمستقيم.', g: 'H V bS', a: 'A S hL', s: () => DR(sk('pencil', { y0: 148 }) + PT.g(sym([[0, 149], [24.8, 149, 1], [33, 165], [42, 183, 1], [0, 185]])) + vlines(6, 152, 182, 22, 38, .3), bodice('square', { len: 151, fit: 'fitted' }) + sleeves({ len: .3, ease: 1.6 })) },
  { id: 'capeD', en: 'Cape Dress', ar: 'فستان بكاب', d: 'فستان مستقيم بطبقة كاب على الأكتاف؛ فخم ويغطي الذراعين.', g: 'A S shN armF tall', a: 'shB V pt', s: () => DR(sk('slip', { y0: 150 }), bodice('jewel', { len: 152, fit: 'fitted' }) + PT.g(sym([[0, 64], [9, 64, 1], [40, 80], [56, 150, 1], [0, 140]]), 'F2')), t: 1 },
  { id: 'babydollD', en: 'Babydoll Mini', ar: 'فستان بيبي دول', d: 'ضيق تحت الصدر ثم يتسع قصيراً؛ يخفي البطن ويُظهر الساقين.', g: 'O D lL bS pt', a: 'bL tall', s: () => DR('', sleeves({ len: .3, ease: 2, w: u => 5 * Math.sin(Math.PI * Math.min(.98, u)) }) + bodice('square', { len: 248, fit: 'wide' }) + hline(129, 30, .55)) }
]);

add('abaya', [
  { id: 'abClosed', en: 'Closed Abaya', ar: 'عباءة مغلقة', d: 'مغلقة بسحاب أو أزرار مخفية؛ خط واحد نظيف يطيل القامة.', g: 'pt O H A V D', a: '', s: () => mq() + sleeves({ len: .95, ease: 3 }) + bodice('jewel', { len: 386, fit: 'semi' }) + PT.l('M100 70L100 384', .45, .8) },
  { id: 'abShirt', en: 'Shirt Abaya', ar: 'عباءة قميص', d: 'ياقة قميص وأزرار أمامية؛ عملية للعمل والدوام.', g: 'H V X', a: '', s: () => mq() + sleeves({ len: .95, ease: 2.6, cuff: .05 }) + bodice('vShallow', { len: 386, fit: 'semi' }) + shirtCollar() + PT.l('M100 86L100 384', .35) + [100, 130, 160, 190, 220].map(y => PT.c(100, y)).join(''), t: 1 },
  { id: 'abLayer', en: 'Layered Abaya', ar: 'عباءة طبقات', d: 'طبقتان بطولين مختلفين؛ تضيف حركة وتخفي الأرداف.', g: 'A S hL tall', a: 'pt', s: () => abaya({ hem: 50, sleeve: { len: .95, ease: 3 } }) + both(PT.g(sp([[110, 68, 1], [139, 78, 1], [146, 200], [150, 250, 1], [106, 252, 1], [106, 80]]), 'F2')) },
  { id: 'abPleat', en: 'Side-Pleated Abaya', ar: 'عباءة بكسرات جانبية', d: 'كسرات جانبية تتسع من الورك؛ حركة فخمة بدون حجم عند الخصر.', g: 'V H X tall', a: '', s: () => abaya({ hem: 58, sleeve: { len: .95, ease: 3 } }) + both([0, 1, 2].map(i => PT.l(`M${128 + i * 4} 200L${136 + i * 7} 386`, .3)).join('')) }
]);

add('pants', [
  { id: 'kickFlare', en: 'Kick Flare Cropped', ar: 'فلير قصير', d: 'اتساع بسيط بطول الكاحل؛ يُظهر الحذاء ويناسب البتيت أكثر من الفلير الكامل.', g: 'pt X H V A', a: 'cF', s: () => LM() + pn('flare', { len: 362, hem: 14.5, knee: 9 }) + wb(), t: 1 },
  { id: 'sailor', en: 'Sailor Trouser', ar: 'بنطال بحّار', d: 'خصر عالٍ بلوحة أزرار أمامية وأرجل واسعة؛ يحدد الخصر ويطيل.', g: 'X A H tL', a: 'bF O tS', s: () => LM() + pn('wide', { y0: 144 }) + hline(151, 25.8, .5) + both([160, 172, 184].map(y => PT.c(115, y, 1.5)).join('')) },
  { id: 'harem', en: 'Harem / Drop-Crotch', ar: 'بنطال هارم', d: 'منطقة الحوض منخفضة ومرتخية والحاشية مجموعة؛ كاجوال مريح للأجسام النحيلة.', g: 'H V fS tall', a: 'pt lS A hL', s: () => LM() + pn('jogger', { thigh: 40, knee: 15, hem: 7, crotch: 250 }) + hline(156, 25.5, .5) },
  { id: 'leggings', en: 'Leggings', ar: 'ليقنز', d: 'ملتصق تماماً؛ يُلبس تحت تونيك أو فستان أو كارديجان طويل.', g: 'V lL cS O D', a: 'A thF cF', s: () => LM() + pn('skinny', { thigh: 33.5, knee: 6.8, hem: 5, len: 376 }) + hline(153, 25, .4) },
  { id: 'wideCuff', en: 'Wide Cuffed', ar: 'واسع بثنية', d: 'واسع بحافة مثنية فوق الكاحل؛ تيلورنق عصري مع لوفر أو باليرينا.', g: 'tall H V lL', a: 'pt lS', s: () => LM() + pn('wide', { len: 374, hem: 19 }) + wb() + both(PT.l('M103 367L139 367', .6, 1.3)), t: 1 },
  { id: 'splitHem', en: 'Split-Hem Straight', ar: 'مستقيم بشق الحاشية', d: 'شق صغير أمامي عند الحاشية يكشف الحذاء ويطيل الساق.', g: 'X H V A pt', a: '', s: () => LM() + pn('straight', { len: 380, crease: 1 }) + wb() + both(slitLeg(114, 360, 381)), t: 1 },
  { id: 'track', en: 'Side-Stripe Pant', ar: 'بنطال بخط جانبي', d: 'خط طولي على الجانب يرسم خطاً عمودياً يطيل الساق؛ رياضي أنيق.', g: 'pt lS H V A', a: '', s: () => LM() + pn('straight', { len: 386 }) + wb() + sideStripe(156, 384), t: 1 }
]);

add('jeans', [
  { id: 'jKick', en: 'Kick Flare Jeans', ar: 'جينز كيك فلير', d: 'فلير خفيف بطول الكاحل؛ عصري ويناسب البتيت.', g: 'pt X H V A', a: 'cF', s: () => LM() + pn('flare', { len: 362, hem: 14, knee: 9 }, 'D') + jeansDet() },
  { id: 'jCropStraight', en: 'Straight Cropped', ar: 'مستقيم قصير', d: 'مستقيم بطول الكاحل وثنية صغيرة؛ مع حذاء مدبب أو لوفر.', g: 'X H V lL cS', a: 'lS cF', s: () => LM() + pn('straight', { len: 362 }, 'D') + jeansDet() + both(PT.l('M106 358L127 358', .6, 1.4)) },
  { id: 'jWideCuff', en: 'Wide Cuffed Jeans', ar: 'جينز واسع بثنية', d: 'واسع بحافة مثنية؛ ترند كاجوال للطويلات.', g: 'tall H V', a: 'pt lS', s: () => LM() + pn('wide', { len: 374, hem: 19 }, 'D') + jeansDet() + both(PT.l('M103 367L139 367', .6, 1.3)), t: 1 },
  { id: 'jCarpenter', en: 'Carpenter / Utility', ar: 'جينز كاربنتر', d: 'واسع بجيوب وحلقة جانبية؛ ستريت ستايل للأرداف الصغيرة.', g: 'H V hS tall', a: 'A S hL pt', s: () => LM() + pn('wide', {}, 'D') + jeansDet() + both(`<rect x="126" y="230" width="11" height="22" rx="2" fill="none" stroke="rgba(255,255,255,.55)" stroke-width=".8" stroke-dasharray="1.4 1"/>`), t: 1 }
]);

add('shorts', [
  { id: 'pleatS', en: 'Pleated High-Waist', ar: 'شورت كسرات عالي', d: 'خصر عالٍ بكسرات أمامية؛ يضيف منحنى للورك المسطح.', g: 'H V hF hS', a: 'A S hL bF', s: () => LM() + sh({ len: 252, thigh: 37, hemOut: 39, hemIn: 2 }) + wb() + both(PT.l('M112 156L114 188', .45)) },
  { id: 'skort', en: 'Skort', ar: 'سكورت', d: 'شورت يبدو كتنورة A من الأمام؛ عملي ومريح للحركة.', g: 'A S thF', a: '', s: () => LM() + sk('mini', { hem: 44, pts: [[34, 172]] }) + wb() + PT.l('M78 156L102 238', .4, .8) },
  { id: 'denimBermuda', en: 'Denim Bermuda', ar: 'برمودا جينز', d: 'جينز بطول الركبة؛ ترند الصيف مع حذاء مسطح.', g: 'tall lL H V', a: 'pt lS cF', s: () => LM() + sh({ len: 286, hemOut: 36, hemIn: 2.5 }, 'D') + jeansDet(), t: 1 }
]);

add('jump', [
  { id: 'romper', en: 'Romper / Playsuit', ar: 'بلاي سوت', d: 'قطعة واحدة قصيرة؛ للساق الطويلة والجذع المتوسط.', g: 'lL H X', a: 'tL pt bF', s: () => mq() + sh({ len: 236, thigh: 36, hemOut: 39, hemIn: 2.5 }) + sleeves({ len: .3, ease: 2, w: u => 8 * Math.pow(u, 1.6) }) + bodice('vShallow', { len: 152, fit: 'semi' }) + bow(100, 151) },
  { id: 'dungaree', en: 'Dungaree / Overall', ar: 'أوفرول', d: 'صدرية بحمالات فوق توب؛ كاجوال مرح للأجسام المستقيمة.', g: 'H V fS', a: 'bL O', s: () => mq() + bodice('crew', { len: 160, fit: 'semi' }, 'I') + sleeves({ len: .3, ease: 2 }, 38.5, 'I') + pn('straight', { y0: 150 }, 'D') + PT.g(sp([[82, 112, 1], [118, 112, 1], [120, 152, 1], [80, 152, 1]]), 'D') + both(navyStrap('M117 112L124 76', 2.2)) },
  { id: 'culotteJ', en: 'Culotte Jumpsuit', ar: 'جمبسوت كيلوت', d: 'أرجل واسعة بطول منتصف الساق؛ عصري للطويلات.', g: 'tall V H', a: 'pt lS', s: () => mq() + pn('culotte') + sleeves({ len: .3, ease: 1.8 }) + bodice('v', { len: 152, fit: 'semi' }) },
  { id: 'oneJ', en: 'One-Shoulder Jumpsuit', ar: 'جمبسوت كتف واحد', d: 'خط قطري للأعلى وأرجل واسعة؛ للسهرات ويخفف الأكتاف.', g: 'V shB tall X', a: 'pt', s: () => mq() + pn('palazzo') + PT.g(sp([[138, 77, 1], [134.5, 88], [133.6, 99], [134.6, 116], [131.5, 131], [125, 152, 1], [75, 152, 1], [68.5, 131], [65.4, 116], [66.2, 101], [80, 98], [112, 80], [125, 69.5, 1]])), t: 1 }
]);

add('jacket', [
  { id: 'cropBlazer', en: 'Cropped Blazer', ar: 'بليزر قصير', d: 'بليزر مفصّل ينتهي عند الخصر؛ يطيل الساقين ومثالي للبتيت.', g: 'pt lS tL A S X', a: 'tS O', s: () => mq() + jacket({ len: 160, fit: 'fitted', lapel: 'notch', yb: 128 }), t: 1 },
  { id: 'longBlazer', en: 'Longline Blazer', ar: 'بليزر طويل', d: 'يصل لمنتصف الفخذ؛ يغطي الأرداف ويرسم خطاً عمودياً طويلاً.', g: 'A S O D hL tall', a: 'pt lS', s: () => mq() + jacket({ len: 238, fit: 'semi', lapel: 'notch', yb: 140, pockets: 1, pockY: 40 }) },
  { id: 'safari', en: 'Safari / Utility', ar: 'جاكيت سفاري', d: 'جيوب أمامية وحزام عند الخصر؛ يصنع خصراً للأجسام المستقيمة.', g: 'H V A', a: 'bL O', s: () => mq() + jacket({ len: 206, fit: 'semi', lapel: 'collar', yb: 92, buttons: 4, belt: 1, pockets: 1, pockY: 34 }) + both(`<rect x="110" y="102" width="14" height="14" rx="1.5" fill="none" stroke="rgba(255,255,255,.5)" stroke-width=".7"/>`) },
  { id: 'kimonoJ', en: 'Kimono Jacket', ar: 'جاكيت كيمونو', d: 'مفتوح بأكمام واسعة مستقيمة؛ طبقة منسدلة تخفي البطن والذراعين.', g: 'O D armF A', a: 'pt', s: () => mq() + bodice('crew', { len: 190, fit: 'fitted' }, 'I') + sleeves({ len: .6, ease: 7, innerK: 1.25 }) + both(PT.g(sp([[109.5, 66, 1], [139, 77.5, 1], [138, 120], [140, 228, 1], [104, 228, 1], [104, 80]]))) },
  { id: 'fringe', en: 'Suede Fringe Jacket', ar: 'جاكيت سويدي بشراشيب', d: 'سويد بشراشيب؛ ترند البوهو الأبرز — قصير للبتيت.', g: 'H V tL A', a: 'bL O', s: () => mq() + jacket({ len: 170, fit: 'semi', lapel: 'collar', closed: false, yb: 120, buttons: 0, f: 'F2', lf: 'F2' }) + [...Array(12).keys()].map(i => PT.l(`M${70 + i * 5.3} 170L${70 + i * 5.3} 182`, .55, .8)).join(''), t: 1 },
  { id: 'leatherBlazer', en: 'Leather Blazer', ar: 'بليزر جلد', d: 'بليزر بخامة الجلد؛ قوي وأنيق — مع قطعة سفلية ناعمة.', g: 'X H A V', a: 'O', s: () => mq() + jacket({ len: 196, fit: 'semi', lapel: 'notch', yb: 134, pockets: 1 }) + PT.l('M84 100Q90 140 86 190', .35, 1.2) + PT.l('M118 100Q112 140 116 190', .25, 1.2), t: 1 }
]);

add('coat', [
  { id: 'duster', en: 'Duster', ar: 'معطف داستر', d: 'طويل مفتوح بدون أزرار وخفيف؛ يرسم خطين عموديين يطيلان القامة.', g: 'tall O D H A', a: 'pt', s: () => mq() + jacket({ len: 350, fit: 'semi', collarless: 1, buttons: 0, yb: 84 }), t: 1 },
  { id: 'peacoat', en: 'Peacoat', ar: 'بي كوت', d: 'صدر مزدوج وطول الورك؛ كلاسيكي بحري يناسب الأجسام النحيلة.', g: 'H A pt bS', a: 'bL O V', s: () => mq() + jacket({ len: 210, fit: 'semi', lapel: 'wide', db: true, buttons: 3, yb: 120 }) },
  { id: 'teddy', en: 'Teddy / Faux Fur', ar: 'معطف تيدي', d: 'فرو ناعم يضيف حجماً كبيراً؛ للأجسام النحيلة وبطول قصير.', g: 'fS H V lL', a: 'fL O bL pt', s: () => mq() + jacket({ len: 220, fit: 'flow', collarless: 1, closed: true, buttons: 0, f: 'L', sEase: 4, ease: 3 }) + `<rect x="60" y="76" width="80" height="140" fill="url(#pDot)" opacity=".5"/>`, t: 1 },
  { id: 'belted', en: 'Belted Midi Coat', ar: 'معطف بحزام ميدي', d: 'مفصّل بحزام وطول منتصف الساق؛ يصنع ساعة رملية تحت المعطف.', g: 'X H A tall', a: 'O D pt', s: () => mq() + jacket({ len: 330, fit: 'fitted', lapel: 'notch', belt: 1, buttons: 0, yb: 140 }) }
]);

add('bag', [
  { id: 'beltbag', en: 'Belt Bag', ar: 'حقيبة حزام', d: 'تُلبس على الخصر أو بالعرض على الصدر؛ عملية وتبرز الخصر.', g: 'X H pt', a: 'bL O bF', s: () => bagSh(100, 50) + strapP('M20 92Q60 100 66 96', 3) + strapP('M134 96Q140 100 180 92', 3) + PT.g(sp([[64, 82], [100, 76], [136, 82], [140, 110], [100, 118], [60, 110]])) + PT.l('M66 92Q100 86 134 92', .5, 1) },
  { id: 'bowling', en: 'Bowling Bag', ar: 'حقيبة بولينج', d: 'مستطيلة منحنية بمقبضين؛ متوسطة الحجم ومريحة.', g: 'H A X', a: '', s: () => bagSh() + strapP('M72 66Q100 26 128 66', 3.6) + PT.g(sp([[46, 72, 1], [154, 72, 1], [160, 120], [150, 144, 1], [50, 144, 1], [40, 120]])) + PT.l('M50 82Q100 74 150 82', .5, 1) },
  { id: 'frame', en: 'Frame Clutch', ar: 'كلتش بإطار', d: 'إطار معدني بقفل كبس؛ للمناسبات — صغيرة للهيكل الصغير.', g: 'fS pt X', a: 'fL', s: () => bagSh(100, 44) + PT.g(sp([[58, 80], [100, 72], [142, 80], [150, 128], [100, 138], [50, 128]])) + `<path d="M58 80Q100 70 142 80" stroke="url(#gG)" stroke-width="4" fill="none"/>` + `<circle cx="94" cy="73" r="3" fill="url(#gG)"/><circle cx="106" cy="73" r="3" fill="url(#gG)"/>` },
  { id: 'woven', en: 'Woven Tote', ar: 'توت منسوجة', d: 'نسيج مضفور بإحساس صيفي؛ ترند العطلات والإطلالات الكاجوال.', g: 'tall H A', a: 'pt fS', s: () => bagSh() + strapP('M70 66C70 26 96 26 96 66') + strapP('M104 66C104 26 130 26 130 66') + PT.g(sp([[46, 64, 1], [154, 64, 1], [160, 146, 1], [40, 146, 1]])) + [...Array(8).keys()].map(i => PT.l(`M44 ${74 + i * 9}L156 ${74 + i * 9}`, .25)).join('') + [...Array(10).keys()].map(i => PT.l(`M${54 + i * 10} 66L${52 + i * 10} 144`, .18)).join(''), t: 1 }
]);

function shoeExtra(kind) {
  let s = `<ellipse cx="108" cy="127" rx="78" ry="4" fill="url(#gSh)"/>`;
  if (kind === 'sneaker') return s + PT.g(sp([[30, 124, 1], [182, 124, 1], [184, 112], [172, 102], [130, 92], [96, 82], [60, 78], [36, 80], [28, 100]])) + PT.g(sp([[28, 116, 1], [184, 116, 1], [184, 126, 1], [28, 126, 1]]), 'I') + [96, 104, 112, 120].map(x => PT.l(`M${x} ${84 + (x - 96) * .5}L${x + 10} ${80 + (x - 96) * .5}`, .7, 1.2)).join('') + PT.l('M60 108Q110 100 150 112', .35, 1);
  if (kind === 'espadrille') return s + PT.g(sp([[34, 92, 1], [70, 104], [104, 114], [122, 126, 1], [36, 126, 1]]), 'L') + [...Array(9).keys()].map(i => PT.k(`M${38 + i * 9} ${96 + i * 3}L${36 + i * 9} 125`, .35, .7)).join('') + PT.g(sp([[34, 90, 1], [62, 96], [100, 108], [128, 117], [174, 117], [181, 114, 1], [176, 108], [150, 100], [128, 100], [96, 92], [60, 80], [34, 76]]));
  if (kind === 'strappy') return shoe(40, { type: 'strappy' }) + strapP('M118 108L152 104', 2) + strapP('M138 113L172 110', 2) + strapP('M96 112Q100 92 116 104', 1.8) + strapP('M34 62Q50 68 62 62', 2) + strapP('M48 65L60 94', 1.6);
  if (kind === 'slide') return s + PT.g(sp([[34, 120, 1], [180, 118, 1], [184, 124, 1], [34, 126, 1]]), 'F2') + PT.g(sp([[104, 118, 1], [116, 98], [150, 96], [168, 104], [172, 118, 1]]));
  return s;
}
add('heel', [
  { id: 'dorsay', en: "D'Orsay", ar: 'دورسيه', d: 'جوانب مكشوفة تُظهر قوس القدم؛ أنثوي ويطيل الساق.', g: 'X H V lL', a: 'cF', s: () => shoe(40, { open: 'back' }) + PT.g(sp([[33, 58, 1], [52, 64], [56, 80, 1], [36, 80, 1]])) },
  { id: 'peeptoe', en: 'Peep-Toe', ar: 'بيب تو', d: 'فتحة صغيرة عند الأصابع؛ للسهرات ويُفضّل للقدم النحيلة.', g: 'X H tall', a: '', s: () => shoe(42) + `<path d="M172 110Q178 114 181 117L176 118Q172 115 170 112Z" fill="url(#gM)" stroke="#081d44" stroke-width=".4"/>` },
  { id: 'espadrille', en: 'Espadrille Wedge', ar: 'إسبادريل', d: 'كعب ويدج من الجوت؛ صيفي مريح يضيف طولاً بثبات.', g: 'pt cF A O', a: '', s: () => shoeExtra('espadrille'), t: 1 },
  { id: 'sneaker', en: 'Minimal Sneaker', ar: 'سنيكرز', d: 'سنيكرز بسيط بلون فاتح؛ أساسي يُنسّق حتى مع التنانير والبدلات.', g: 'H V A X O', a: '', s: () => shoeExtra('sneaker'), t: 1 },
  { id: 'strappy', en: 'Strappy Sandal', ar: 'صندل أشرطة', d: 'أشرطة رفيعة تكشف القدم؛ يطيل الساق للمناسبات الصيفية.', g: 'lL cS tall', a: 'cF lS', s: () => shoeExtra('strappy') },
  { id: 'slide', en: 'Flat Slide', ar: 'سلايد مسطح', d: 'شريط عريض بدون كعب؛ كاجوال صيفي — اختاريه بمقدمة مربعة عصرية.', g: 'tall lL', a: 'pt lS', s: () => shoeExtra('slide') }
]);

add('bra', [
  { id: 'pushup', en: 'Push-Up', ar: 'بوش أب', d: 'حشوة سفلية ترفع وتُقرّب؛ للصدر الصغير مع فتحات V.', g: 'bS V H', a: 'bL', s: () => mq() + band(121, 129) + cup([[101, 118, 1], [114, 104], [128, 98.5, 1], [134, 110], [132, 119], [117, 124], [101, 124, 1]], 'F', PT.l('M104 120Q118 112 132 116', .5, 1.2)) + strap(126, 99) },
  { id: 'demi', en: 'Demi Cup', ar: 'ديمي (نصف كوب)', d: 'يغطي نصف الصدر بحافة منخفضة؛ مناسب للقصات المربعة والواسعة.', g: 'bS X A', a: 'bL', s: () => mq() + band() + cup([[102, 110, 1], [118, 106], [131, 104, 1], [135, 113], [132, 119], [117, 124], [102.5, 120, 1]]) + strap(130, 104, 125, 74) },
  { id: 'racer', en: 'Racerback', ar: 'ريسر باك', d: 'أشرطة تلتقي في منتصف الظهر لا تنزلق؛ للأكتاف المنحدرة والضيقة.', g: 'shSl shN bL', a: '', s: () => mq() + band() + cup([[101.5, 104, 1], [113, 99.5], [127, 98, 1], [134, 110], [132, 119], [117, 124], [102, 120, 1]]) + both(navyStrap('M124 99.5L112 72', 2.4)) },
  { id: 'adhesive', en: 'Adhesive / Stick-On', ar: 'لاصق بدون حمالات', d: 'أكواب لاصقة بدون حزام؛ للفساتين المكشوفة الظهر — للصدر الصغير والمتوسط.', g: 'bS', a: 'bL', s: () => mq() + cup([[102, 106, 1], [114, 100], [127, 101], [133, 110], [130, 120], [116, 124], [103, 119, 1]], 'S') + PT.l('M100 112L102 112', .5), t: 1 }
]);
add('panty', [
  { id: 'tanga', en: 'Tanga', ar: 'تانغا', d: 'جوانب رفيعة عريضة قليلاً وتغطية متوسطة؛ بين البكيني والثونق.', g: 'X H V', a: 'bF', s: () => LM() + panty(176, 182, { dipT: 5, mid: 11 }) },
  { id: 'brazilian', en: 'Brazilian', ar: 'برازيليان', d: 'تغطية متوسطة خلفية مع فتحة ساق عالية؛ لا تظهر خطوطها كثيراً.', g: 'hP X H lS', a: 'bF', s: () => LM() + panty(170, 178, { dipT: 3, mid: 10, midY: 200 }) }
]);

const ARM_TAGS = { cap: ['', 'armF'], short: ['', 'armF'], elbow: ['armF', ''], q34: ['armF aS', ''], sleeveless: ['', 'armF'], flutter: ['armF', ''], kimono: ['armF', ''], dolman: ['armF', ''], puff: ['armS', 'armF'], bishop: ['armS aL', ''], lantern: ['armS', ''], setin: ['aL', ''], cold: ['', 'armF'], gigot: ['armS', 'armF'], bell: ['aL armF', ''], drop: ['armF', ''], raglan: ['armF', ''] };
LIB.sleeve.forEach(it => { const t = ARM_TAGS[it.id]; if (t) { it.g = (it.g + ' ' + t[0]).trim(); it.a = (it.a + ' ' + t[1]).trim(); } });
