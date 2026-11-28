/* ═════════════ LIBRARY PART 3 — jackets · coats · lingerie · shapewear · shapes · accessories · prints · fabrics ═════════════ */
Object.assign(VB, { hand: '0 -10 120 150', hips: '46 128 108 104', shp: '24 52 152 212', legsB: '58 236 84 162', earr: '0 0 120 120', swatch: '0 0 160 130' });
Object.assign(DEFV, { bootLen: 'legsB', boot: 'legsB', strap: 'shoe', bag: 'obj', nail: 'hand', panty: 'hips', shapewear: 'shp', heel: 'shoe', earring: 'earr', print: 'swatch', fabric: 'swatch', rise: 'low' });

LIB.jacket = [
  { id: 'blazer', en: 'Classic Blazer', ar: 'بليزر كلاسيك', d: 'زر واحد وطية نوتش وطول الورك؛ القطعة الأهم في الخزانة لكل الأجسام.', g: 'X H A V O D', a: '', s: () => mq() + jacket({ len: 194, fit: 'semi', lapel: 'notch', pockets: 1, chest: 1, yb: 134 }) },
  { id: 'oversizedB', en: 'Oversized Blazer', ar: 'بليزر أوفرسايز', d: 'أكتاف عريضة وطول أسفل الورك؛ ترند التيلورنق الأبرز — يُلبس مع قطعة سفلية ضيقة.', g: 'H V tall A', a: 'pt fS', s: () => mq() + jacket({ len: 222, fit: 'boxy', lapel: 'notch', sw: 44, ease: 3, pockets: 1, yb: 142, sEase: 3.4 }), t: 1 },
  { id: 'cropB', en: 'Cropped Boxy Jacket', ar: 'جاكيت قصير مربع', d: 'ينتهي عند الخصر؛ يطيل الساقين ويناسب الجذع الطويل والبتيت.', g: 'pt tL lS A S X', a: 'tS O bF', s: () => mq() + jacket({ len: 152, fit: 'boxy', collarless: 1, sw: 41, yb: 90, buttons: 3 }), t: 1 },
  { id: 'dbB', en: 'Double-Breasted', ar: 'صدر مزدوج', d: 'صفان من الأزرار يضيفان عرضاً للجذع؛ أفضل للأجسام النحيلة والطويلة.', g: 'H tall bS A', a: 'bL O D V', s: () => mq() + jacket({ len: 196, fit: 'semi', lapel: 'peak', db: true, buttons: 2, pockets: 1, yb: 134 }) },
  { id: 'tux', en: 'Tuxedo / Shawl', ar: 'توكسيدو شال', d: 'طية شال منحنية ناعمة؛ تخفف الأكتاف الحادة وتناسب الصدر الكبير.', g: 'X bL V shSq O', a: '', s: () => mq() + jacket({ len: 192, fit: 'fitted', lapel: 'shawl', yb: 140 }) },
  { id: 'tweed', en: 'Bouclé / Tweed Jacket', ar: 'جاكيت تويد', d: 'بدون ياقة بحواف مزخرفة؛ أنيق قصير يناسب البتيت والجذع الطويل.', g: 'pt A X tL bS', a: 'fL O', s: () => mq() + jacket({ len: 168, fit: 'semi', collarless: 1, yb: 90, buttons: 4, pockets: 1, pockY: 22, chest: 1 }) + both(PT.l('M106 74L102.5 84L102.5 166', .7, 1.2)) },
  { id: 'peplumJ', en: 'Peplum / Hourglass', ar: 'جاكيت بيبلوم', d: 'محدد الخصر بكشكشة؛ يصنع منحنى للمستقيم ويبرز خصر الساعة الرملية.', g: 'H X V bS', a: 'A S hL', s: () => mq() + PT.g(sym([[0, 150], [27, 150, 1], [36, 165], [43, 182, 1], [0, 184]])) + vlines(6, 152, 182, 24, 38, .3) + jacket({ len: 152, fit: 'fitted', lapel: 'notch', yb: 132 }) },
  { id: 'bomber', en: 'Bomber', ar: 'بومبر', d: 'منتفخ بحافة ريب عند الخصر؛ رياضي يضيف حجماً للأعلى ويوازن الكمثري.', g: 'A S shN bS', a: 'V shB bL O', s: () => mq() + jacket({ len: 168, fit: 'flow', collarless: 1, closed: true, zip: 'M100 74L100 160', sEase: 3.2, cuff: .06, buttons: 0 }) + hline(162, 34, .55) + hline(166, 34, .4) },
  { id: 'biker', en: 'Biker Jacket', ar: 'جاكيت جلد بايكر', d: 'سحاب مائل وطية عريضة وطول الخصر؛ يعطي حدة وبنية للأجسام الناعمة.', g: 'A X pt tL H', a: 'O bF tS', s: () => mq() + jacket({ len: 160, fit: 'fitted', lapel: 'wide', yb: 120, zip: 'M118 90L104 160', buttons: 0, cuff: .08 }) },
  { id: 'trucker', en: 'Denim Trucker', ar: 'جاكيت جينز', d: 'ياقة قميص وجيوب صدر؛ كاجوال أساسي — اختاريه قصيراً عند الخصر.', g: 'A S H pt', a: 'bL', s: () => mq() + jacket({ len: 162, fit: 'semi', lapel: 'collar', f: 'D', lf: 'D', closed: true, yb: 92, buttons: 4, cuff: .06 }) + both(`<rect x="108" y="100" width="14" height="13" rx="1.5" fill="none" stroke="rgba(255,255,255,.6)" stroke-width=".7" stroke-dasharray="1.4 1"/>`) },
  { id: 'shacket', en: 'Shacket', ar: 'شاكيت', d: 'هجين القميص والجاكيت بطول الورك؛ طبقة يومية مريحة للمستقيم.', g: 'H V tall', a: 'pt', s: () => mq() + jacket({ len: 206, fit: 'boxy', lapel: 'collar', yb: 92, buttons: 5, sw: 41, cuff: .06 }) + both(`<rect x="110" y="102" width="15" height="15" rx="1.5" fill="none" stroke="rgba(255,255,255,.5)" stroke-width=".7"/>`), t: 1 },
  { id: 'barn', en: 'Barn Jacket', ar: 'جاكيت بارن', d: 'قطني ثقيل بياقة كوردروي وجيوب كبيرة؛ من ترندات 2025/26 الأقوى.', g: 'H V A tall', a: 'pt fS', s: () => mq() + jacket({ len: 200, fit: 'boxy', lapel: 'collar', lf: 'L', yb: 92, buttons: 4, sw: 41, pockets: 1, pockY: 34 }), t: 1 },
  { id: 'gilet', en: 'Quilted Gilet', ar: 'صديري مبطن', d: 'سترة بلا أكمام مبطنة؛ طبقة خفيفة تُبقي الذراعين حرتين.', g: 'H V A', a: 'bL O', s: () => mq() + jacket({ len: 186, fit: 'semi', collarless: 1, closed: true, sleeve: false, sw: 33, zip: 'M100 74L100 186', buttons: 0 }) + [100, 118, 136, 154, 172].map(y => hline(y, 34, .3, PT.l, '2 1.5')).join('') }
];
LIB.coat = [
  { id: 'trench', en: 'Trench Coat', ar: 'ترنش كوت', d: 'حزام وصدر مزدوج وطول الركبة؛ الكلاسيك الذي يصنع خصراً لكل الأجسام.', g: 'X H A V tall', a: 'pt', s: () => mq() + jacket({ len: 300, fit: 'semi', lapel: 'wide', db: true, belt: 1, buttons: 2, yb: 128, pockets: 1, pockY: 90, cuff: .06 }) },
  { id: 'wrapC', en: 'Wrap Coat', ar: 'معطف ملتف', d: 'بدون أزرار يُغلق بحزام؛ ناعم يرسم الخصر ويناسب المنحنيات.', g: 'X A O bL', a: '', s: () => mq() + jacket({ len: 312, fit: 'semi', lapel: 'shawl', db: true, belt: 1, buttons: 0, yb: 146, ease: 2.5 }) },
  { id: 'cocoon', en: 'Cocoon Coat', ar: 'معطف كوكون', d: 'منحني بشكل البيضة يخفي الوسط؛ عصري للأجسام المستقيمة والممتلئة.', g: 'O D H V', a: 'pt fS', s: () => mq() + jacket({ len: 292, fit: 'wide', collarless: 1, closed: true, buttons: 0, hemW: 34, ease: 2, sw: 42, sEase: 3.6 }), t: 1 },
  { id: 'car', en: 'Car Coat', ar: 'معطف قصير مستقيم', d: 'مستقيم لمنتصف الفخذ؛ عملي ويناسب البتيت أكثر من الطويل.', g: 'pt H V A', a: '', s: () => mq() + jacket({ len: 236, fit: 'semi', lapel: 'notch', yb: 120, buttons: 3, pockets: 1, pockY: 40 }) },
  { id: 'longC', en: 'Long Tailored Coat', ar: 'معطف طويل مفصّل', d: 'طويل حتى منتصف الساق بخط نظيف؛ يطيل الطويلات ويعطي فخامة.', g: 'tall X H V lL', a: 'pt lS', s: () => mq() + jacket({ len: 350, fit: 'semi', lapel: 'notch', yb: 136, buttons: 2, pockets: 1, pockY: 140 }) },
  { id: 'cape', en: 'Cape Coat', ar: 'معطف كاب', d: 'كاب يغطي الأكتاف والذراعين؛ يوسّع الأكتاف الضيقة بدراما راقية.', g: 'A S shN shSl tall', a: 'shB V pt', s: () => mq() + PT.g(sym([[0, 58], [10, 60, 1], [40, 80], [62, 228, 1], [0, 234]])) + PT.l('M100 64L100 232', .5, .9) + PT.c(100, 90) + PT.c(100, 110) + PT.c(100, 130), t: 1 },
  { id: 'funnelC', en: 'Funnel-Neck Coat', ar: 'معطف رقبة قمعية', d: 'ياقة واقفة بدون طيّات؛ ترند معماري للرقبة الطويلة.', g: 'nL tall H V bS', a: 'nS bL', s: () => mq() + jacket({ len: 300, fit: 'semi', lapel: 'funnel', collarless: 1, closed: true, yb: 92, buttons: 4, pockets: 1, pockY: 92 }), t: 1 },
  { id: 'puffer', en: 'Cropped Puffer', ar: 'بافر قصير', d: 'مبطن منتفخ ينتهي عند الخصر؛ اختاريه قصيراً لتفادي الكتلة.', g: 'H V A fS lL', a: 'O bL fL pt', s: () => mq() + jacket({ len: 170, fit: 'flow', collarless: 1, closed: true, buttons: 0, zip: 'M100 70L100 170', sEase: 4.2, ease: 3 }) + [96, 120, 144].map(y => hline(y, 38, .35)).join('') }
];

/* ── Lingerie ── */
const band = (y1 = 119, y2 = 129, f = 'F') => PT.g(sym([[0, y1], [16, y1 + 3], [33.4, y1 + 2, 1], [32.4, y2, 1], [0, y2]]), f);
const strap = (x1, y1, x2 = 121, y2 = 73, w = 1.6) => both(navyStrap(`M${x1} ${y1}L${x2} ${y2}`, w));
const cup = (pts, f = 'F', det = '') => both(PT.g(sp(pts), f) + det);
LIB.bra = [
  { id: 'tshirt', en: 'T-Shirt Bra', ar: 'تيشيرت برا', d: 'كوب مقولب ناعم بلا خياطات؛ الأساس تحت الملابس الضيقة والفاتحة.', g: 'X H A V bS', a: '', s: () => mq() + band() + cup([[101.5, 104, 1], [113, 99.5], [127, 98, 1], [134, 110], [132, 119], [117, 124], [102, 120, 1]]) + strap(125.5, 99.5) },
  { id: 'balconette', en: 'Balconette', ar: 'بلكونيت', d: 'حافة أفقية وحمالات متباعدة؛ يرفع ويُظهر الصدر الصغير والمتوسط.', g: 'bS shN A X', a: 'shB', s: () => mq() + band() + cup([[102, 107, 1], [130, 104, 1], [134.5, 112], [132, 119], [117, 124], [102.5, 120, 1]]) + strap(129, 104, 124, 74) },
  { id: 'plungeB', en: 'Plunge Bra', ar: 'بلنج', d: 'مقدمة منخفضة جداً لفتحات V العميقة؛ يُقرّب ويرفع.', g: 'bS V H', a: '', s: () => mq() + band(121, 129) + cup([[101, 120, 1], [114, 104], [128, 98.5, 1], [134, 110], [132, 119], [117, 124], [101, 124, 1]]) + strap(126, 99) },
  { id: 'fullcup', en: 'Full-Cup / Minimizer', ar: 'كوب كامل / مُصغّر', d: 'يغطي الصدر بالكامل ويوزعه؛ دعم عالٍ للصدر الكبير وتقليل بصري حتى 2.5 سم.', g: 'bL O', a: 'bS', s: () => mq() + band(119, 131) + cup([[101.5, 98, 1], [115, 94], [129, 95, 1], [135, 109], [133, 120], [117, 125.5], [102, 121, 1]]) + strap(127, 95, 122, 73, 2.6) },
  { id: 'bralette', en: 'Triangle Bralette', ar: 'برالت مثلث', d: 'بدون سلك أو حشو بأكواب مثلثة؛ مريح وجميل للصدر الصغير.', g: 'bS fS', a: 'bL', s: () => mq() + band(120, 127) + cup([[102, 120, 1], [117, 97, 1], [132, 120, 1]], 'F', PT.l('M117 97L117 120', .3)) + strap(117, 97, 119, 73, 1.1), t: 1 },
  { id: 'longline', en: 'Longline Bralette', ar: 'برالت طويل', d: 'حزام عريض يمتد للضلوع؛ يُلبس مكشوفاً تحت البليزر كترند أنيق.', g: 'bS tL H X', a: 'tS bF', s: () => mq() + band(119, 140) + cup([[102, 119, 1], [118, 99, 1], [133, 119, 1]], 'F', PT.l('M118 99L118 119', .3)) + strap(118, 99, 120, 73, 1.2) + hline(130, 32, .3), t: 1 },
  { id: 'strapless', en: 'Strapless', ar: 'سترابلس', d: 'حزام عريض مطاطي داخلي يثبت بلا حمالات؛ لفتحات الأوف شولدر والسترابلس.', g: 'X A bS', a: '', s: () => mq() + band(117, 131) + cup([[101.5, 106, 1], [130, 102, 1], [135, 112], [133, 120], [117, 124], [102, 120, 1]]) },
  { id: 'sports', en: 'Sports Bra', ar: 'سبورت برا', d: 'تغطية عالية وحمالات عريضة؛ اختاري مستوى الدعم حسب الرياضة وحجم الصدر.', g: 'bL bS', a: '', s: () => mq() + PT.g(sym([[0, 92], [9, 89], [16, 76, 1], [23, 76, 1], [26, 92], [34, 104], [34, 116], [32, 133, 1], [0, 133]])) + hline(124, 32, .5) },
  { id: 'wireless', en: 'Wireless Comfort', ar: 'بدون سلك مريح', d: 'كوب ناعم مقولب بلا سلك؛ ترند الراحة اليومية مع شكل طبيعي.', g: 'bS fS X H', a: '', s: () => mq() + band(119, 128) + cup([[101.5, 106, 1], [114, 100], [127, 98.5, 1], [134, 111], [131, 119], [117, 123], [102, 119.5, 1]]) + strap(125.5, 99.5, 121, 73, 2), t: 1 },
  { id: 'multiway', en: 'Multiway', ar: 'متعدد الأوضاع', d: 'حمالات قابلة للفك تتحول هولتر أو متقاطعة أو كتف واحد.', g: 'X A V', a: '', s: () => mq() + band() + cup([[101.5, 104, 1], [130, 101, 1], [134.5, 111], [132, 119], [117, 124], [102, 120, 1]]) + both(navyStrap('M128 101.5L106 62', 1.4)) }
];
const hipX = y => { const T = [[138, 24.5], [150, 24.2], [170, 31.4], [191, 35.6], [206, 35.2], [224, 32]]; for (let i = 0; i < T.length - 1; i++) if (y <= T[i + 1][0]) { const u = (y - T[i][0]) / (T[i + 1][0] - T[i][0]); return T[i][1] + (T[i + 1][1] - T[i][1]) * u + .7; } return 32; };
const panty = (yT, yL, o = {}) => PT.g(sym([[0, yT + (o.dipT ?? 1)], [hipX(yT), yT, 1], ...(yL > yT + 12 ? [[hipX((yT + yL) / 2), (yT + yL) / 2]] : []), [hipX(yL), yL, 1], [o.mid ?? 14, o.midY ?? 203], [o.cw ?? 5, 214, 1], [0, 215.5]]), o.f || 'F');
LIB.panty = [
  { id: 'brief', en: 'Full Brief', ar: 'بريف كامل', d: 'يغطي البطن والأرداف بالكامل؛ لا يقسم الأرداف ويناسب البطن الممتلئ.', g: 'bF O hL A S', a: '', s: () => LM() + panty(152, 199) },
  { id: 'hiwaist', en: 'High-Waist Brief', ar: 'بريف خصر عالٍ', d: 'يرتفع فوق السرة؛ ينعّم البطن تحت الملابس عالية الخصر.', g: 'bF O D', a: 'tS', s: () => LM() + panty(140, 199) + hline(146, 25.5, .35), t: 1 },
  { id: 'hicut', en: 'High-Cut / French Cut', ar: 'هاي كت', d: 'فتحة ساق عالية جداً تطيل الساقين؛ ترند التسعينات العائد.', g: 'lS pt H X', a: 'thF', s: () => LM() + panty(152, 168, { mid: 9, midY: 196 }), t: 1 },
  { id: 'hipster', en: 'Hipster', ar: 'هيبستر', d: 'يجلس على الورك بخط أفقي؛ مناسب للبنطال منخفض الخصر.', g: 'H X tS', a: 'bF tL', s: () => LM() + panty(170, 198, { dipT: 2 }) },
  { id: 'bikini', en: 'Bikini', ar: 'بكيني', d: 'منخفض بجوانب أضيق؛ خفيف ومريح للأجسام المتوازنة.', g: 'X H V', a: 'bF', s: () => LM() + panty(174, 185, { dipT: 4, mid: 12 }) },
  { id: 'boyshort', en: 'Boyshort', ar: 'بوي شورت', d: 'يغطي أعلى الفخذ بخط أفقي؛ يمنع الاحتكاك تحت التنانير والفساتين.', g: 'thF H V', a: 'hL A', s: () => LM() + PT.g(sym([[0, 168], [hipX(168), 168, 1], [36.4, 192], [35.4, 222, 1], [3, 222, 1], [2, 217], [0, 216, 1]])) },
  { id: 'seamless', en: 'Seamless Laser-Cut', ar: 'بدون خياطات (ليزر)', d: 'حواف مقصوصة بالليزر لا تظهر تحت الملابس الضيقة؛ الأفضل مع البنسل والسليب.', g: 'X H A S O V D', a: '', s: () => LM() + panty(160, 194, { f: 'S' }), t: 1 },
  { id: 'thong', en: 'Thong', ar: 'ثونق', d: 'أقل تغطية من الخلف لإخفاء الخطوط؛ للأقمشة اللاصقة جداً فقط.', g: 'X hP', a: 'bF', s: () => LM() + PT.g(sym([[0, 176], [16, 175, 1], [9, 200], [4.5, 214, 1], [0, 215]])) + both(navyStrap(`M116 175.5L${100 + hipX(174)} 173`, 1.2)) }
];
const sw = (R, f = 'S', extra = '') => PT.g(sym(R), f) + extra;
LIB.shapewear = [
  { id: 'swBody', en: 'Open-Bust Bodysuit', ar: 'بودي مشد مفتوح الصدر', d: 'يشد البطن والخصر مع حمالة صدرك الخاصة؛ الأنسب تحت الفساتين الضيقة.', g: 'bF O X H D', a: '', s: () => mq() + sw([[0, 126], [30, 123, 1], [31.5, 131], [25, 150], [31.8, 170], [36.2, 191], [35.4, 206, 1], [5, 214, 1], [0, 216]], 'S', both(PT.k('M127 124L121 74', .7, 1.3))) },
  { id: 'swThigh', en: 'High-Waist Thigh Shaper', ar: 'شورت مشد بخصر عالٍ', d: 'من تحت الصدر حتى منتصف الفخذ؛ ينعّم البطن والأفخاذ ويمنع الاحتكاك.', g: 'thF bF A S O', a: '', s: () => mq() + PT.g(sym(pantsR({ y0: 128, w0: 30, len: 262, thigh: 35, hemOut: 31, hemIn: 3 })), 'S') + hline(134, 30, .4, PT.k) },
  { id: 'swCinch', en: 'Waist Cincher', ar: 'مشد خصر', d: 'حزام عريض من تحت الصدر للورك؛ يحدد الخصر — دعم عالٍ لساعتين كحد أقصى.', g: 'H X O', a: '', s: () => mq() + sw([[0, 127], [30, 126, 1], [24.8, 150], [32, 172, 1], [0, 174]], 'S', [-18, -8, 8, 18].map(x => PT.k(`M${100 + x} 128L${100 + x * 1.05} 172`, .3, .6)).join('') + PT.k('M100 128L100 173', .45, .8, '1 1.8')) },
  { id: 'swSlip', en: 'Shaping Slip', ar: 'مشد بشكل فستان', d: 'من الصدر حتى أسفل الركبة؛ ينعّم الخط كاملاً تحت الفساتين — يُفضّل أن يتعدى الركبة.', g: 'X H O A bF', a: '', s: () => mq() + sw([[0, 100], [24, 98, 1], [33.8, 101, 1], [34.5, 116], [29.5, 131], [25, 150], [31.6, 170], [36.2, 191], [34, 250], [29, 304, 1], [0, 306]], 'S', both(PT.k('M126 99L121 74', .7, 1.3))) },
  { id: 'swBrief', en: 'High-Waist Brief Shaper', ar: 'كيلوت مشد خصر عالٍ', d: 'خفيف للاستخدام اليومي؛ ينعّم أسفل البطن بدون ضغط على الفخذ.', g: 'bF O D', a: '', s: () => mq() + PT.g(sym([[0, 129], [29.5, 128, 1], [24.8, 150], [31.8, 170], [36, 194, 1], [14, 204], [5, 214, 1], [0, 215.5]]), 'S') },
  { id: 'corset', en: 'Steel-Boned Corset', ar: 'كورسيه بدعامات حديدية', d: 'يُختار أصغر بـ 10 سم (4 إنش) من خصرك الطبيعي؛ للمناسبات وبالتدريج.', g: 'X H', a: 'O bF D', s: () => mq() + sw([[0, 108], [18, 104], [33, 108, 1], [32, 128], [23.5, 150], [31.6, 172], [33.5, 178, 1], [0, 182]], 'F', [-22, -11, 11, 22].map(x => PT.l(`M${100 + x} 108L${100 + x * .78} 176`, .4, .6)).join('') + [118, 132, 146, 160].map(y => PT.l(`M96 ${y}L104 ${y + 7}M104 ${y}L96 ${y + 7}`, .55, .6)).join('')) },
  { id: 'swCami', en: 'Shaping Camisole', ar: 'كامي مشد', d: 'قميص داخلي ينعّم الظهر والبطن تحت البلوزات الخفيفة.', g: 'bF O H', a: '', s: () => mq() + sw([[0, 100], [24, 98, 1], [33.8, 101, 1], [34.5, 116], [29.5, 131], [25, 150], [31.8, 172, 1], [0, 174]], 'S', both(PT.k('M126 99L121 74', .7, 1.3))) }
];

/* ── Body shapes ── */
const SHAPES = {
  X: { en: 'Hourglass', ar: 'الساعة الرملية', p: { sh: 38.5, bust: 35, waist: 23, hip: 36 } },
  A: { en: 'Pear / Triangle', ar: 'الكمثرى (المثلث)', p: { sh: 34, bust: 31.5, waist: 24, hip: 40.5, thigh: 39 } },
  S: { en: 'Spoon', ar: 'الملعقة', p: { sh: 34, bust: 31.5, waist: 24, hh: 37, hip: 39 } },
  V: { en: 'Inverted Triangle', ar: 'المثلث المقلوب', p: { sh: 43.5, bust: 37.5, waist: 28.5, hip: 32 } },
  H: { en: 'Rectangle', ar: 'المستطيل', p: { sh: 37, bust: 33.5, waist: 30.5, hip: 34 } },
  O: { en: 'Apple / Oval', ar: 'التفاحة (البيضاوي)', p: { sh: 37.5, bust: 37.5, waist: 37, hh: 38.5, hip: 36 } },
  D: { en: 'Diamond', ar: 'الماسة', p: { sh: 33.5, bust: 33, waist: 34.5, hh: 38, hip: 38 } }
};
function shapeFig(p, mark = true) {
  const R = bodyR(p); let s = `<ellipse cx="100" cy="394" rx="30" ry="3.6" fill="url(#gSh)"/>` + PT.g(sym(R), 'F2') + `<ellipse cx="100" cy="33" rx="12.8" ry="17.2" fill="url(#gF2)" stroke="#081d44" stroke-width=".5"/>`;
  if (mark) [[80, p.sh ?? 38.5], [116, p.bust ?? 34.5], [150, p.waist ?? 24], [191, p.hip ?? 35.5]].forEach(([y, w]) => { s += `<path d="M${r1(100 - w - 7)} ${y}L${r1(100 + w + 7)} ${y}" stroke="#fff" stroke-width=".9" stroke-dasharray="2 1.6" opacity=".9"/>` + `<circle cx="${r1(100 - w - 7)}" cy="${y}" r="1.6" fill="#fff"/><circle cx="${r1(100 + w + 7)}" cy="${y}" r="1.6" fill="#fff"/>`; });
  return s;
}

/* ── Bags ── */
const hw = (x, y, w = 10, h = 6) => `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="1.6" fill="url(#gG)" stroke="#6f84a8" stroke-width=".5"/>`;
const strapP = (d, w = 3.2) => `<path d="${d}" fill="none" stroke="#0e2f66" stroke-width="${w}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#5f8fd6" stroke-width="${w * .3}" stroke-linecap="round" opacity=".6"/>`;
const bagSh = (cx = 100, w = 60) => `<ellipse cx="${cx}" cy="151" rx="${w}" ry="4" fill="url(#gSh)"/>`;
LIB.bag = [
  { id: 'tote', en: 'Structured Tote', ar: 'توت بنيوي', d: 'كبيرة مستطيلة للعمل؛ مناسبة للطويلات والهيكل المتوسط والكبير.', g: 'tall fL H V', a: 'pt fS', s: () => bagSh() + strapP('M68 64C68 22 92 22 92 64') + strapP('M108 64C108 22 132 22 132 64') + PT.g(sp([[48, 62, 1], [152, 62, 1], [160, 146, 1], [40, 146, 1]])) + PT.l('M48 74L152 74', .3) },
  { id: 'hobo', en: 'Slouchy Hobo', ar: 'هوبو مرتخية', d: 'ناعمة منحنية تُحمل على الكتف؛ ترند الحقائب الكبيرة المرتخية — للأجسام المنحنية.', g: 'X A O S tall', a: 'pt fS', s: () => bagSh() + strapP('M48 74Q100 -6 152 74', 4) + PT.g(sp([[44, 72], [100, 92], [156, 72], [150, 126], [100, 148], [50, 126]])) + PT.l('M60 100Q100 120 140 100', .25), t: 1 },
  { id: 'baguette', en: 'Baguette', ar: 'باقيت', d: 'صغيرة مستطيلة تُحمل تحت الإبط عند الخصر؛ تبرز الخصر وتناسب البتيت.', g: 'pt fS X H tS', a: 'fL', s: () => bagSh(100, 52) + strapP('M62 84Q100 44 138 84', 3.6) + PT.g(sp([[46, 82, 1], [154, 82, 1], [156, 124, 1], [44, 124, 1]])) + PT.g(sp([[46, 82, 1], [154, 82, 1], [154, 104, 1], [100, 108], [46, 104, 1]]), 'F2') + hw(100, 106, 14, 7), t: 1 },
  { id: 'crescent', en: 'Crescent', ar: 'هلالية', d: 'شكل الهلال الناعم؛ من أبرز ترندات الحقائب ويكرر منحنيات الجسم.', g: 'X A O S', a: 'V H', s: () => bagSh() + strapP('M42 80Q100 30 158 80', 2.6) + PT.g(sp([[40, 80, 1], [70, 104], [100, 110], [130, 104], [160, 80, 1], [152, 118], [100, 144], [48, 118]])), t: 1 },
  { id: 'clutch', en: 'Envelope Clutch', ar: 'كلتش', d: 'تُحمل باليد للمناسبات؛ اختاري حجمها حسب حجم يدك وهيكلك.', g: 'X H V A O', a: '', s: () => bagSh() + PT.g(sp([[34, 68, 1], [166, 68, 1], [166, 126, 1], [34, 126, 1]])) + PT.g(sp([[34, 68, 1], [166, 68, 1], [100, 108, 1]]), 'F2') + hw(100, 104, 8, 8) },
  { id: 'bucket', en: 'Bucket Bag', ar: 'باكت', d: 'أسطوانية برباط؛ كاجوال ومتوسطة الحجم.', g: 'H A X', a: '', s: () => bagSh(100, 50) + strapP('M62 64Q100 6 138 64') + PT.g(sp([[58, 60], [142, 60], [148, 138], [100, 148], [52, 138]])) + `<ellipse cx="100" cy="61" rx="42" ry="7" fill="#0b2a5b"/>` + PT.l('M60 72Q100 82 140 72', .5, 1) },
  { id: 'crossbody', en: 'Mini Crossbody', ar: 'كروس صغيرة', d: 'عملية بحزام طويل؛ اجعليها عند الورك العلوي لا عند أعرض نقطة.', g: 'pt fS H V', a: 'hL A bL', s: () => bagSh(100, 36) + strapP('M72 84L28 4', 2.2) + strapP('M128 84L172 4', 2.2) + PT.g(sp([[68, 82, 1], [132, 82, 1], [134, 134, 1], [66, 134, 1]])) + PT.g(sp([[68, 82, 1], [132, 82, 1], [132, 104, 1], [68, 104, 1]]), 'F2') + hw(100, 104, 9, 6) },
  { id: 'saddle', en: 'Saddle Bag', ar: 'سادل', d: 'شكل D منحني بقلاب كبير؛ ناعمة للأجسام المنحنية.', g: 'X A O S', a: '', s: () => bagSh() + strapP('M54 64Q100 10 146 64') + PT.g(sp([[50, 60, 1], [150, 60, 1], [152, 100], [132, 138], [100, 146], [68, 138], [48, 100]])) + PT.g(sp([[50, 60, 1], [150, 60, 1], [146, 98], [126, 124], [100, 130], [74, 124], [54, 98]]), 'F2') + hw(100, 126, 8, 8) },
  { id: 'tophandle', en: 'Top-Handle', ar: 'مقبض علوي', d: 'بنيوية بمقبض صلب؛ رسمية وتناسب الأجسام ذات الخطوط المستقيمة.', g: 'H V X', a: '', s: () => bagSh() + strapP('M76 70Q76 30 100 30Q124 30 124 70', 4) + PT.g(sp([[48, 68, 1], [152, 68, 1], [160, 142, 1], [40, 142, 1]])) + PT.g(sp([[48, 68, 1], [152, 68, 1], [152, 96, 1], [48, 96, 1]]), 'F2') + hw(100, 96, 14, 9) },
  { id: 'eastwest', en: 'East-West', ar: 'إيست وست', d: 'طويلة أفقياً ونحيفة؛ ترند يطيل خط الكتف ويوازن الأرداف.', g: 'A S tall H', a: 'pt V shB', s: () => bagSh(100, 76) + strapP('M38 92Q100 40 162 92', 2.8) + PT.g(sp([[26, 90, 1], [174, 90, 1], [172, 124, 1], [28, 124, 1]])) + PT.l('M30 100L170 100', .3), t: 1 },
  { id: 'shoulder', en: '90s Shoulder Bag', ar: 'حقيبة كتف قصيرة', d: 'صغيرة بحزام قصير تجلس تحت الإبط؛ ترند يجذب النظر لأعلى.', g: 'A S pt fS', a: 'bL V', s: () => bagSh(100, 46) + strapP('M64 92Q100 40 136 92', 3.4) + PT.g(sp([[56, 90], [144, 90], [148, 128], [100, 134], [52, 128]])), t: 1 }
];

/* ── Shoes ── */
function shoe(h, o = {}) {
  const hs = 118 - h, mid = t => hs + (121 - hs) * t;
  let s = `<ellipse cx="108" cy="127" rx="78" ry="4" fill="url(#gSh)"/>`;
  const heel = {
    stiletto: [[37, hs + 2, 1], [51, hs + 2, 1], [44, 126, 1], [41.5, 126, 1]],
    block: [[36, hs + 2, 1], [56, hs + 2, 1], [54, 126, 1], [38, 126, 1]],
    kitten: [[37, hs + 2, 1], [50, hs + 2, 1], [44, 118], [46, 126, 1], [42.5, 126, 1], [40.5, 118]],
    cone: [[36, hs + 2, 1], [55, hs + 2, 1], [47.5, 126, 1], [42.5, 126, 1]],
    sculpt: [[36, hs + 2, 1], [55, hs + 2, 1], [60, (hs + 126) / 2], [52, 126, 1], [42, 126, 1], [48, (hs + 126) / 2]],
    flat: [[36, 120, 1], [50, 120, 1], [50, 126, 1], [36, 126, 1]]
  }[o.heel || 'stiletto'];
  if (o.heel === 'wedge') s += PT.g(sp([[34, hs + 2, 1], [70, mid(.35) + 2], [104, mid(.78) + 2], [122, 126, 1], [36, 126, 1]]), 'F2');
  else s += PT.g(sp(heel), 'F2');
  if (o.platform) s += PT.g(sp([[104, 116, 1], [178, 114, 1], [184, 126, 1], [104, 126, 1]]), 'F2');
  // sole
  const ty = o.platform ? 114 : 121;
  s += PT.g(sp([[34, hs, 1], [62, mid(.3)], [100, mid(.78)], [128, ty + 1], [174, ty], [181, ty - 3, 1], [178, ty + 3, 1], [130, ty + 4], [100, mid(.78) + 3], [62, mid(.3) + 3], [34, hs + 3, 1]]), 'F');
  // upper
  const back = o.open === 'back' ? [] : o.open === 'sling' ? [] : [[33, hs - 20, 1], [46, hs - 15]];
  const startX = o.open === 'back' || o.open === 'sling' ? 82 : null;
  let U;
  if (o.type === 'ballet') U = [[34, hs - 13, 1], [70, hs - 9], [118, ty - 15], [150, ty - 16], [172, ty - 11], [181, ty - 3, 1], [130, ty + 1], [100, mid(.78)], [62, mid(.3)], [34, hs, 1]];
  else if (o.type === 'loafer') U = [[34, hs - 18, 1], [70, hs - 15], [112, ty - 26], [150, ty - 22], [174, ty - 13], [181, ty - 3, 1], [130, ty + 1], [100, mid(.78)], [62, mid(.3)], [34, hs, 1]];
  else if (startX) U = [[startX, mid(.6) - 18, 1], [120, ty - 18], [150, ty - 16], [174, ty - 10], [181, ty - 3, 1], [130, ty + 1], [startX + 6, mid(.62) + 1, 1]];
  else U = [...back, [92, mid(.62) - 10], [128, ty - 15], [154, ty - 15], [174, ty - 10], [181, ty - 3, 1], [130, ty + 1], [100, mid(.78)], [62, mid(.3)], [34, hs, 1]];
  if (o.type !== 'strappy') s += PT.g(sp(U), 'F');
  if (o.type === 'loafer') s += PT.l(`M112 ${ty - 22}Q130 ${ty - 17} 148 ${ty - 20}`, .6, 1.2);
  if (o.type === 'ballet') s += PT.g(sp([[118, ty - 17], [112, ty - 22], [114, ty - 12], [118, ty - 15, 1], [124, ty - 21], [124, ty - 12]]), 'F2');
  if (o.open === 'sling') s += strapP(`M84 ${mid(.6) - 14}Q48 ${hs - 26} 35 ${hs - 6}`, 2);
  if (o.mj) s += strapP(`M86 ${mid(.6) - 9}Q112 ${mid(.6) - 26} 124 ${ty - 16}`, 2.6) + `<circle cx="122" cy="${ty - 16}" r="2" fill="url(#gG)"/>`;
  if (o.ankle) s += strapP(`M34 ${hs - 30}Q52 ${hs - 24} 62 ${hs - 30}`, o.ankle) + strapP(`M52 ${hs - 27}L64 ${mid(.4) - 10}`, 1.6);
  return s;
}
LIB.heel = [
  { id: 'stilettoP', en: 'Stiletto Pump', ar: 'كعب ستيليتو', d: 'كعب رفيع عالٍ ومقدمة مدببة؛ أقصى إطالة للساق للمناسبات.', g: 'pt lS tall X V', a: 'cF', s: () => shoe(46) },
  { id: 'kitten', en: 'Kitten Heel', ar: 'كعب كيتن', d: 'كعب قصير رفيع 3–5 سم؛ ترند أنيق ومريح للعمل اليومي.', g: 'tall pt H X V A', a: '', s: () => shoe(18, { heel: 'kitten' }), t: 1 },
  { id: 'slingback', en: 'Slingback', ar: 'سلينق باك', d: 'مفتوح من الخلف بشريط رفيع؛ من أبرز ترندات الأحذية الكلاسيكية.', g: 'X H V A tall', a: '', s: () => shoe(24, { heel: 'kitten', open: 'sling' }), t: 1 },
  { id: 'blockH', en: 'Block Heel', ar: 'كعب عريض', d: 'كعب عريض ثابت؛ مريح للعمل ويوازن الساق الممتلئة والكاحل العريض.', g: 'cF A O fL', a: '', s: () => shoe(34, { heel: 'block' }) },
  { id: 'coneH', en: 'Cone Heel', ar: 'كعب مخروطي', d: 'عريض من الأعلى ويضيق؛ توازن بين الأناقة والثبات.', g: 'H V X', a: '', s: () => shoe(36, { heel: 'cone' }) },
  { id: 'wedgeH', en: 'Wedge', ar: 'ويدج', d: 'كعب متصل يوزع الوزن؛ مريح للصيف ويضيف طولاً بثبات.', g: 'pt cF fL', a: 'cS fS', s: () => shoe(32, { heel: 'wedge' }) },
  { id: 'platformH', en: 'Platform', ar: 'بلاتفورم', d: 'نعل أمامي سميك يقلل ميل القدم؛ يضيف طولاً بارتياح أكبر.', g: 'tall fL cF', a: 'pt fS', s: () => shoe(48, { heel: 'block', platform: 1 }) },
  { id: 'sculptH', en: 'Sculptural Heel', ar: 'كعب نحتي', d: 'كعب بتصميم فني منحني؛ قطعة لافتة للمناسبات.', g: 'tall H V', a: '', s: () => shoe(38, { heel: 'sculpt' }), t: 1 },
  { id: 'mule', en: 'Mule', ar: 'ميول', d: 'مفتوح من الخلف بدون شريط؛ سهل اللبس وعصري.', g: 'H X V A', a: '', s: () => shoe(26, { heel: 'block', open: 'back' }) },
  { id: 'maryjane', en: 'Mary Jane', ar: 'ماري جين', d: 'شريط على مشط القدم؛ ترند قوي — يقطع الساق فاختاريه للساق الطويلة.', g: 'lL tall cS', a: 'lS pt cF', s: () => shoe(20, { heel: 'block', mj: 1 }), t: 1 },
  { id: 'anklestrap', en: 'Ankle Strap', ar: 'شريط الكاحل', d: 'شريط حول الكاحل يقطع الخط العمودي؛ عرضه يتبع امتلاء الكاحل.', g: 'lL tall cS', a: 'lS pt cF', s: () => shoe(42, { ankle: 2.6, open: 'sling' }) },
  { id: 'ballet', en: 'Ballet Flat', ar: 'باليرينا', d: 'مسطح ناعم بفيونكة؛ ترند الموسم — اختاري المقدمة المدببة أو المكشوفة لتطيل.', g: 'tall lL X H', a: '', s: () => shoe(0, { heel: 'flat', type: 'ballet' }), t: 1 },
  { id: 'loafer', en: 'Loafer', ar: 'لوفر', d: 'مسطح كلاسيكي بنعل سميك؛ ترند الأناقة الهادئة مع البدلات والبرمودا.', g: 'tall H V cF', a: 'pt', s: () => shoe(4, { heel: 'block', type: 'loafer' }), t: 1 }
];
LIB.strap = [
  { id: 'stWide', en: 'Wide Strap', ar: 'شريط عريض', d: 'للكاحل الممتلئ والساق العضلية؛ يتوازن مع حجم الساق.', g: 'cF', a: 'cS lS pt', s: () => shoe(40, { ankle: 6, open: 'sling' }) },
  { id: 'stMed', en: 'Medium Strap', ar: 'شريط متوسط', d: 'للساق المتوسطة مع انحناء عند الكاحل.', g: 'X H A', a: '', s: () => shoe(40, { ankle: 3.6, open: 'sling' }) },
  { id: 'stThin', en: 'Thin Strap', ar: 'شريط رفيع', d: 'للكاحل النحيل؛ ومع الساق القصيرة اختاريه بلون البشرة أو تجنّبيه.', g: 'cS lL', a: 'cF', s: () => shoe(40, { ankle: 1.4, open: 'sling' }) }
];
/* boots on legs */
const LO = [[236, 28], [252, 26.5], [290, 22], [318, 23], [350, 19], [375, 12.5], [384, 11.2], [391, 12.6]], LI = [[236, 2.2], [252, 3], [292, 3.6], [330, 4], [372, 5], [384, 5.6], [393, 6.5]];
const itp = (T, y) => { if (y <= T[0][0]) return T[0][1]; for (let i = 0; i < T.length - 1; i++) if (y <= T[i + 1][0]) { const u = (y - T[i][0]) / (T[i + 1][0] - T[i][0]); return T[i][1] + (T[i + 1][1] - T[i][1]) * u; } return T[T.length - 1][1]; };
function boot(top, o = {}) {
  const e = o.ease ?? 1.8, ys = [top, ...[252, 290, 318, 350, 372].filter(y => y > top + 4)];
  const out = ys.map(y => [100 + itp(LO, y) + e + (o.slouch && y < 340 ? 2.5 * Math.sin(y / 9) : 0), y]);
  const inn = ys.map(y => [100 + Math.max(2, itp(LI, y) - e), y]).reverse();
  if (o.vtop) out[0] = [out[0][0], top + 6];
  const R = [...out, [100 + 15, 388], [100 + 14, 395, 1], [100 + 4.5, 395, 1], [100 + 3.5, 388], ...inn.slice(0, -1), [inn[inn.length - 1][0], inn[inn.length - 1][1] + (o.vtop ? -4 : 0)]];
  R[0][2] = 1; R[R.length - 1][2] = 1;
  let s = PT.g(sp(R), o.f || 'F');
  if (o.chelsea) s += PT.k(`M${r1(100 + itp(LO, top) + e - 3)} ${top + 1}L${r1(100 + itp(LO, top + 22) + e - 1)} ${top + 20}`, .0) + PT.l(`M${r1(100 + itp(LO, top) + e - 2)} ${top + 1}Q${r1(100 + itp(LO, top + 10) + e - 6)} ${top + 12} ${r1(100 + itp(LO, top) + e - 1)} ${top + 20}`, .7, 1.4);
  if (o.lace) for (let y = top + 4; y < 378; y += 6) s += PT.l(`M${r1(100 + itp(LI, y) + 3)} ${y}L${r1(100 + itp(LO, y) - 2)} ${y + 3}`, .55, .6);
  if (o.western) s += PT.st(`M${r1(100 + itp(LI, top + 10) + 2)} ${top + 14}Q${r1(100 + (itp(LO, top + 10) + itp(LI, top + 10)) / 2)} ${top + 4} ${r1(100 + itp(LO, top + 10))} ${top + 14}`);
  return both(s);
}
const legsMQ = () => `<path d="${sym(bodyR())}" fill="url(#gM)" stroke="#a9b8d3" stroke-width=".5"/><ellipse cx="100" cy="396" rx="26" ry="3" fill="url(#gSh)"/>`;
LIB.bootLen = [
  { id: 'bAnkle', en: 'Ankle Boot', ar: 'بوت الكاحل', d: 'ينتهي فوق الكاحل؛ مع الساق القصيرة اختاريه بكعب وفتحة V أو بلون البنطال.', g: 'cF X H A V tall', a: '', s: () => legsMQ() + boot(360, { vtop: 1 }) },
  { id: 'bMid', en: 'Mid-Calf Boot', ar: 'بوت منتصف الساق', d: 'يقطع الساق عند أعرض نقطة؛ للطويلات وأصحاب الساق النحيلة فقط.', g: 'tall cS lL', a: 'pt lS cF', s: () => legsMQ() + boot(326) },
  { id: 'bKnee', en: 'Knee-High', ar: 'بوت للركبة', d: 'يغطي الساق كاملة ويخلق خطاً طويلاً متصلاً — الأفضل للساق الممتلئة مع تنورة تغطي أعلاه.', g: 'cF pt lS X H A', a: '', s: () => legsMQ() + boot(290) },
  { id: 'bOTK', en: 'Over-the-Knee', ar: 'فوق الركبة', d: 'يتعدى الركبة؛ يطيل الساق جداً مع ألوان متقاربة — للطويلات والساق النحيلة.', g: 'tall lL cS V H', a: 'pt thF cF', s: () => legsMQ() + boot(258, { ease: 1.2 }) }
];
LIB.boot = [
  { id: 'chelsea', en: 'Chelsea Boot', ar: 'تشيلسي', d: 'بوت كاحل بجانب مطاطي؛ عملي ويُلبس مع الجينز المستقيم.', g: 'H V X A', a: '', s: () => legsMQ() + boot(356, { chelsea: 1 }) },
  { id: 'western', en: 'Western Boot', ar: 'ويسترن', d: 'حافة V وزخرفة خياطة؛ ترند الويسترن الحديث مع الفساتين والجينز.', g: 'tall H V lL', a: 'pt lS cF', s: () => legsMQ() + boot(318, { western: 1, vtop: 1 }), t: 1 },
  { id: 'slouch', en: 'Slouch Boot', ar: 'سلاوتش', d: 'ساق مرتخية بطيّات؛ ترند ناعم يضيف حجماً للساق النحيلة.', g: 'cS tall lL', a: 'cF pt', s: () => legsMQ() + boot(300, { slouch: 1, ease: 2.6 }), t: 1 },
  { id: 'riding', en: 'Riding Boot', ar: 'بوت الفروسية', d: 'مسطح طويل مستقيم للركبة؛ كلاسيكي يطيل خط الساق.', g: 'tall cF H X', a: '', s: () => legsMQ() + boot(288, { ease: 2.2 }) },
  { id: 'sock', en: 'Sock Boot', ar: 'سوك بوت', d: 'ملتصق مرن كالجورب؛ ينساب تحت البنطال ويطيل الساق.', g: 'cS lL X V', a: 'cF', s: () => legsMQ() + boot(344, { ease: .7 }) },
  { id: 'combat', en: 'Combat / Lug', ar: 'كومبات', d: 'برباط ونعل سميك؛ يوازن الساق الممتلئة ويُلبس مع الفساتين الناعمة.', g: 'cF H V', a: 'pt', s: () => legsMQ() + boot(346, { lace: 1, ease: 2.4 }) }
];

/* ── Nails ── */
function nail(shape) {
  const tips = {
    round: [[40, 40], [42, 22], [60, 14], [78, 22], [80, 40]],
    oval: [[40, 40], [43, 18], [60, 6], [77, 18], [80, 40]],
    almond: [[40, 40], [46, 16], [60, 2], [74, 16], [80, 40]],
    square: [[40, 40], [40, 14, 1], [80, 14, 1], [80, 40]],
    squoval: [[40, 40], [40.5, 19], [44, 12.5], [60, 12], [76, 12.5], [79.5, 19], [80, 40]],
    coffin: [[40, 40], [48, 6, 1], [72, 6, 1], [80, 40]],
    stiletto: [[40, 40], [50, 14], [60, -6, 1], [70, 14], [80, 40]],
    short: [[40, 40], [42, 32], [60, 27], [78, 32], [80, 40]]
  }[shape];
  const N = [[40, 70], [40, 50], ...tips, [80, 50], [80, 70], [60, 76]];
  return `<path d="${sp([[30, 140], [30, 50], [40, 30], [60, 24], [80, 30], [90, 50], [90, 140]])}" fill="url(#gM)" stroke="#a9b8d3" stroke-width=".6"/>` + PT.g(sp(N.map((p, i) => i === 0 || i === N.length - 1 ? p : p)), 'F') + `<path d="M48 64Q46 44 52 26" stroke="#fff" stroke-width="3" opacity=".45" fill="none" stroke-linecap="round"/>`;
}
LIB.nail = [
  { id: 'nOval', en: 'Oval', ar: 'بيضاوي', d: 'يطيل الأصابع القصيرة والعريضة بنعومة؛ كلاسيكي آمن.', g: 'fiS fiW', a: '', s: () => nail('oval') },
  { id: 'nAlmond', en: 'Almond', ar: 'لوزي', d: 'مدبب ناعم كاللوزة؛ الأكثر إطالة وأنوثة للأصابع القصيرة.', g: 'fiS fiW', a: '', s: () => nail('almond'), t: 1 },
  { id: 'nRound', en: 'Round', ar: 'دائري', d: 'يتبع شكل طرف الإصبع؛ عملي للأظافر القصيرة.', g: 'fiL fiW', a: '', s: () => nail('round') },
  { id: 'nSquoval', en: 'Squoval', ar: 'مربع بيضاوي', d: 'مربع بزوايا ناعمة؛ قوي ومتوازن لمعظم الأيادي.', g: 'fiL', a: 'fiS', s: () => nail('squoval') },
  { id: 'nSquare', en: 'Square', ar: 'مربع', d: 'حافة مستقيمة تعرّض الإصبع؛ للأصابع الطويلة النحيفة.', g: 'fiL', a: 'fiS fiW', s: () => nail('square') },
  { id: 'nCoffin', en: 'Coffin / Ballerina', ar: 'باليرينا', d: 'مدبب بحافة مسطحة؛ جريء ويطيل الأصابع.', g: 'fiL fiS', a: 'fiW', s: () => nail('coffin') },
  { id: 'nStiletto', en: 'Stiletto', ar: 'ستيليتو', d: 'مدبب حاد درامي؛ للمناسبات وللأصابع الطويلة.', g: 'fiL', a: 'fiW', s: () => nail('stiletto') },
  { id: 'nShort', en: 'Short Natural', ar: 'قصير طبيعي', d: 'قصير نظيف بلون حليبي؛ ترند الأناقة الهادئة ومناسب للعمل.', g: 'fiS fiW fiL', a: '', s: () => nail('short'), t: 1 }
];

/* ── Belts ── */
const beltBase = () => mq() + bodice('scoop', { len: 210, fit: 'fitted', sleeveless: true, sw: 31 }, 'I');
const beltBand = (y, w, f = 'F') => PT.g(sym([[0, y], [widthAt('fitted', y) + 1.2, y, 1], [widthAt('fitted', y + w) + 1.2, y + w, 1], [0, y + w]]), f);
LIB.belt = [
  { id: 'bSkinny', en: 'Skinny Belt', ar: 'حزام رفيع', d: '1–2 سم؛ للجذع القصير — يحدد الخصر دون أن يقطع الجسم.', g: 'tS pt fS bL', a: 'tL fL', s: () => beltBase() + beltBand(148, 3) + hw(100, 149.5, 5, 5) },
  { id: 'bMed', en: 'Classic Belt', ar: 'حزام كلاسيك', d: '2.5–4 سم؛ للجذع المتناسب ومع البنطال والجينز.', g: 'X H A', a: '', s: () => beltBase() + beltBand(147, 6) + hw(100, 150, 9, 8) },
  { id: 'bWide', en: 'Wide Belt', ar: 'حزام عريض', d: '5 سم فأكثر؛ للجذع الطويل والساعة الرملية — يصنع خصراً واضحاً.', g: 'tL X tall fL', a: 'tS pt bL O', s: () => beltBase() + beltBand(143, 12) + hw(100, 149, 11, 13) },
  { id: 'bObi', en: 'Obi / Sash', ar: 'حزام أوبي', d: 'حزام قماشي عريض بربطة؛ يرسم الخصر بنعومة على الفساتين والعبايات.', g: 'tL X H', a: 'tS O bL', s: () => beltBase() + beltBand(140, 18, 'F2') + bow(120, 152, 'F2') },
  { id: 'bCorset', en: 'Corset Belt', ar: 'حزام كورسيه', d: 'عريض بأربطة؛ ترند يصنع خصر الساعة الرملية فوق القمصان والفساتين.', g: 'H tL X', a: 'tS O bF', s: () => beltBase() + beltBand(138, 22) + [142, 148, 154].map(y => PT.l(`M96 ${y}L104 ${y + 5}M104 ${y}L96 ${y + 5}`, .6, .6)).join(''), t: 1 },
  { id: 'bChain', en: 'Chain Belt', ar: 'حزام سلسلة', d: 'سلسلة معدنية مرتخية؛ لمسة مجوهرات خفيفة على الخصر.', g: 'X H pt', a: '', s: () => beltBase() + [...Array(15).keys()].map(i => { const x = 76 + i * 3.4; return `<ellipse cx="${x}" cy="${151 + Math.sin(i / 14 * Math.PI) * 3}" rx="2" ry="1.4" fill="none" stroke="#6f84a8" stroke-width=".9"/>`; }).join('') },
  { id: 'bHip', en: 'Low-Slung Hip Belt', ar: 'حزام على الورك', d: 'يجلس مائلاً على الورك؛ ترند البوهو — للأجسام المستقيمة والجذع الطويل والورك الضيق.', g: 'H V tL hS', a: 'A S hL tS O', s: () => beltBase() + PT.g(sp([[66, 180, 1], [136, 172, 1], [137, 178, 1], [66, 188, 1]])) + hw(118, 178, 10, 10), t: 1 },
  { id: 'bWestern', en: 'Statement Buckle', ar: 'حزام بإبزيم بارز', d: 'إبزيم كبير يجذب النظر للخصر؛ للخصر المحدد والجذع المتوسط.', g: 'X H tL', a: 'O bF tS', s: () => beltBase() + beltBand(146, 7) + hw(100, 149.5, 16, 13), t: 1 }
];

/* ── Earrings ── */
const ear = (inner) => `<path d="M40 24C64 6 96 24 92 54C90 70 76 74 72 88C68 100 56 104 50 96" fill="url(#gM)" stroke="#a9b8d3" stroke-width=".8"/>` + inner;
const metal = (d, w = 3) => `<path d="${d}" fill="none" stroke="url(#gG)" stroke-width="${w}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#6f84a8" stroke-width=".5"/>`;
LIB.earring = [
  { id: 'eStud', en: 'Stud', ar: 'حلق صغير ملتصق', d: 'ملتصق بشحمة الأذن؛ آمن للرقبة القصيرة وللعمل.', g: 'nS fS', a: '', s: () => ear(`<circle cx="58" cy="96" r="4" fill="url(#gF2)" stroke="#081d44" stroke-width=".5"/>`) },
  { id: 'eHuggie', en: 'Huggie Hoop', ar: 'حلق هقي', d: 'حلقة صغيرة تحتضن الشحمة؛ بسيطة للاستخدام اليومي.', g: 'nS fS pt', a: '', s: () => ear(metal('M56 92a6 6 0 1 0 6 6', 2.6)) },
  { id: 'eHoop', en: 'Statement Hoop', ar: 'حلق دائري كبير', d: 'حلقة كبيرة سميكة؛ ترند قوي للرقبة الطويلة والهيكل الكبير.', g: 'nL fL tall', a: 'nS fS', s: () => ear(metal('M58 96a18 18 0 1 0 2 0', 4)), t: 1 },
  { id: 'eDrop', en: 'Drop', ar: 'حلق متدلٍ', d: 'يتدلى بطول متوسط؛ يطيل الوجه ويلفت النظر للعنق.', g: 'nL X H', a: '', s: () => ear(metal('M58 96L58 108', 1.4) + `<path d="M58 108C52 116 52 124 58 128C64 124 64 116 58 108Z" fill="url(#gF2)" stroke="#081d44" stroke-width=".5"/>`) },
  { id: 'eChand', en: 'Chandelier', ar: 'شاندلير', d: 'متدلٍ عريض فخم؛ للرقبة الطويلة فقط حتى لا يلامس الكتف.', g: 'nL tall fL', a: 'nS pt', s: () => ear(metal('M58 96L58 104', 1.4) + `<path d="M58 104L44 122L72 122Z" fill="url(#gF2)" stroke="#081d44" stroke-width=".5"/>` + [46, 52, 58, 64, 70].map(x => metal(`M${x} 122L${x} 132`, 1)).join('')) },
  { id: 'eCuff', en: 'Ear Cuff / Climber', ar: 'إير كاف', d: 'يتسلق حافة الأذن؛ ترند عصري خفيف لا يضيف طولاً.', g: 'nS nL', a: '', s: () => ear(metal('M84 42Q92 54 86 66', 3) + [0, 1, 2].map(i => `<circle cx="${62 + i * 7}" cy="${92 - i * 14}" r="2.4" fill="url(#gG)"/>`).join('')), t: 1 }
];

/* ── Prints (pattern swatches) ── */
let PID = 0;
function swatch(patternInner, w = 20, h = 20, bg = '#123a78', rot = 0) {
  const id = 'pt' + (++PID);
  return `<defs><pattern id="${id}" width="${w}" height="${h}" patternUnits="userSpaceOnUse" patternTransform="rotate(${rot})"><rect width="${w}" height="${h}" fill="${bg}"/>${patternInner}</pattern></defs><path d="M14 18Q50 8 80 16T146 14L150 112Q112 122 80 114T10 116Z" fill="url(#${id})" stroke="#081d44" stroke-width=".6"/><path d="M14 18Q50 8 80 16T146 14L150 112Q112 122 80 114T10 116Z" fill="url(#gH)" opacity=".55"/><path d="M60 14Q66 60 58 116" stroke="#000" stroke-opacity=".12" stroke-width="10" fill="none"/><path d="M104 16Q112 64 104 118" stroke="#fff" stroke-opacity=".14" stroke-width="12" fill="none"/>`;
}
const W_ = '#eaf1fb';
LIB.print = [
  { id: 'pDots', en: 'Polka Dot', ar: 'منقط', d: 'ترند 2025/26 الأقوى؛ النقطة الصغيرة للهيكل الصغير والكبيرة للكبير.', g: 'pt fS X H', a: '', s: () => swatch(`<circle cx="10" cy="10" r="3.4" fill="${W_}"/><circle cx="0" cy="0" r="3.4" fill="${W_}"/><circle cx="20" cy="20" r="3.4" fill="${W_}"/><circle cx="20" cy="0" r="3.4" fill="${W_}"/><circle cx="0" cy="20" r="3.4" fill="${W_}"/>`), t: 1 },
  { id: 'pDitsy', en: 'Ditsy Floral', ar: 'ورد صغير', d: 'زهور صغيرة متقاربة؛ مناسبة للبتيت والهيكل الصغير.', g: 'pt fS', a: 'fL', s: () => swatch([[5, 5], [15, 12], [8, 17]].map(([x, y]) => [0, 72, 144, 216, 288].map(a => `<circle cx="${x + 2.2 * Math.cos(a * Math.PI / 180)}" cy="${y + 2.2 * Math.sin(a * Math.PI / 180)}" r="1.4" fill="${W_}"/>`).join('') + `<circle cx="${x}" cy="${y}" r="1" fill="#7fa6e3"/>`).join(''), 20, 20) },
  { id: 'pBigFloral', en: 'Large Floral', ar: 'ورد كبير', d: 'زهور كبيرة جريئة؛ للهيكل الكبير والطويلات — ضعيها حيث تريدين لفت النظر.', g: 'fL tall', a: 'pt fS', s: () => swatch([0, 60, 120, 180, 240, 300].map(a => `<ellipse cx="${30 + 9 * Math.cos(a * Math.PI / 180)}" cy="${30 + 9 * Math.sin(a * Math.PI / 180)}" rx="8" ry="5" transform="rotate(${a} ${30 + 9 * Math.cos(a * Math.PI / 180)} ${30 + 9 * Math.sin(a * Math.PI / 180)})" fill="${W_}" opacity=".9"/>`).join('') + `<circle cx="30" cy="30" r="5" fill="#7fa6e3"/>`, 60, 60) },
  { id: 'pVert', en: 'Vertical Stripe', ar: 'خطوط طولية', d: 'تطيل وتنحّف المنطقة؛ الخطوط الرفيعة المتقاربة أقوى في الإطالة.', g: 'pt O D H lS', a: '', s: () => swatch(`<rect x="0" width="5" height="20" fill="${W_}"/>`, 12, 20) },
  { id: 'pHoriz', en: 'Breton Stripe', ar: 'خطوط عرضية', d: 'تضيف عرضاً؛ استخدميها في المنطقة الأضيق (أعلى الكمثري أو أسفل المقلوب).', g: 'A S V hS bS', a: 'O bL hL', s: () => swatch(`<rect y="0" width="20" height="4.5" fill="${W_}"/>`, 20, 11) },
  { id: 'pDiag', en: 'Diagonal', ar: 'خطوط مائلة', d: 'حركة قطرية تكسر الامتلاء وتنحّف أكثر من العرضية.', g: 'O H D', a: '', s: () => swatch(`<rect x="0" width="4" height="20" fill="${W_}"/>`, 11, 20, '#123a78', 35) },
  { id: 'pPin', en: 'Pinstripe', ar: 'بن سترايب', d: 'خطوط رفيعة جداً على البدلات؛ تطيل بأناقة رسمية.', g: 'pt H X V O', a: '', s: () => swatch(`<rect x="0" width="1" height="20" fill="${W_}"/>`, 9, 20, '#0b2a5b') },
  { id: 'pHound', en: 'Houndstooth', ar: 'هاوندز توث', d: 'نقشة كلاسيكية مُسننة؛ اختاري حجمها حسب حجم هيكلك.', g: 'H X fS', a: '', s: () => swatch(`<path d="M0 0H8V8H16L8 16V8H0Z" fill="${W_}"/>`, 16, 16) },
  { id: 'pHerring', en: 'Herringbone', ar: 'هيرنغبون', d: 'نسيج متعرج ناعم من بعيد؛ آمن لكل الأجسام في المعاطف.', g: 'X H A V O', a: '', s: () => swatch(`<path d="M0 0L6 6L0 12M6 0L12 6L6 12" stroke="${W_}" stroke-width="1.3" fill="none"/>`, 12, 12) },
  { id: 'pPlaid', en: 'Plaid / Tartan', ar: 'كاروهات', d: 'مربعات متقاطعة تضيف حجماً؛ للمناطق التي تريدين توسيعها.', g: 'V H A hS', a: 'O fL', s: () => swatch(`<rect x="0" y="12" width="40" height="7" fill="#3f6fbf" opacity=".9"/><rect x="12" y="0" width="7" height="40" fill="#3f6fbf" opacity=".7"/><rect x="0" y="30" width="40" height="1.4" fill="${W_}"/><rect x="30" y="0" width="1.4" height="40" fill="${W_}"/>`, 40, 40) },
  { id: 'pGingham', en: 'Gingham', ar: 'جينجهام', d: 'مربعات صغيرة صيفية؛ مرحة للبتيت والهيكل الصغير.', g: 'pt fS', a: 'fL', s: () => swatch(`<rect width="10" height="20" fill="${W_}" opacity=".45"/><rect width="20" height="10" fill="${W_}" opacity=".45"/>`, 20, 20, '#2a5aa8') },
  { id: 'pPaisley', en: 'Paisley', ar: 'بيزلي', d: 'نقشة شرقية منحنية؛ تكرر منحنيات الأجسام الأنثوية.', g: 'X A O', a: '', s: () => swatch(`<path d="M14 28C2 26 4 8 16 8C26 8 26 22 18 24C14 25 12 20 16 19" stroke="${W_}" stroke-width="1.6" fill="none"/><circle cx="16" cy="14" r="2" fill="${W_}"/>`, 32, 32) },
  { id: 'pLeopard', en: 'Leopard', ar: 'جلد النمر', d: 'ترند دائم ومتجدد؛ اجعليه قطعة واحدة في الإطلالة مع ألوان هادئة.', g: 'X H V tall', a: '', s: () => swatch([[6, 6], [20, 10], [12, 20], [26, 24], [4, 26]].map(([x, y]) => `<path d="M${x} ${y}c3-3 7-1 7 2s-5 5-7 3" stroke="${W_}" stroke-width="2" fill="none"/>`).join(''), 32, 32, '#2f62b3'), t: 1 },
  { id: 'pGeo', en: 'Geometric', ar: 'هندسي', d: 'زوايا وأشكال حادة؛ تتناغم مع الأجسام المستقيمة والمقلوبة.', g: 'H V', a: 'X', s: () => swatch(`<path d="M0 20L10 0L20 20Z" fill="${W_}" opacity=".85"/>`, 20, 20) },
  { id: 'pAbstract', en: 'Abstract', ar: 'تجريدي', d: 'ضربات فنية حرة تخفي التفاصيل؛ ممتازة لمنطقة البطن.', g: 'O D A', a: '', s: () => swatch(`<path d="M4 12C12 2 24 20 34 8" stroke="${W_}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="28" cy="30" r="5" fill="#7fa6e3"/>`, 40, 40) },
  { id: 'pChevron', en: 'Chevron', ar: 'شيفرون', d: 'زجزاج يشير للأعلى أو الأسفل؛ اتجاهه يوجه النظر.', g: 'H V', a: '', s: () => swatch(`<path d="M0 10L10 2L20 10" stroke="${W_}" stroke-width="3" fill="none"/>`, 20, 14) }
];

/* ── Fabrics ── */
const fab = (bg, extra = '') => `<path d="M14 18Q50 8 80 16T146 14L150 112Q112 122 80 114T10 116Z" fill="${bg}" stroke="#081d44" stroke-width=".6"/>${extra}<path d="M14 18Q50 8 80 16T146 14L150 112Q112 122 80 114T10 116Z" fill="url(#gH)" opacity=".45"/>`;
LIB.fabric = [
  { id: 'fCrepe', en: 'Crepe', ar: 'كريب', w: 'متوسط', dr: 'انسدال ممتاز', sh: 'مطفي', d: 'سطح مطفي حبيبي يخفي التفاصيل؛ مثالي للفساتين والتيلورنق لكل الأجسام.', g: 'X A O H V D S', a: '', s: () => fab('url(#gF)') },
  { id: 'fSatin', en: 'Satin / Silk', ar: 'ساتان / حرير', w: 'خفيف–متوسط', dr: 'انسيابي جداً', sh: 'لامع', d: 'اللمعة تضيف حجماً؛ ضعيه في المنطقة التي تريدين إبرازها فقط.', g: 'bS fS H V', a: 'bF hL O', s: () => fab('url(#gF)', '<path d="M30 20Q60 70 40 116" stroke="#fff" stroke-opacity=".55" stroke-width="14" fill="none"/><path d="M110 16Q130 60 116 118" stroke="#fff" stroke-opacity=".35" stroke-width="9" fill="none"/>') },
  { id: 'fChiffon', en: 'Chiffon / Georgette', ar: 'شيفون / جورجيت', w: 'خفيف جداً', dr: 'طائر ناعم', sh: 'شفاف', d: 'طبقات شفافة ناعمة؛ تخفف الأجسام الممتلئة وتناسب الأكمام والعبايات.', g: 'O A X fL', a: '', s: () => fab('url(#gL)', '<path d="M10 40Q80 60 150 36" stroke="#123a78" stroke-opacity=".25" stroke-width="6" fill="none"/><path d="M10 80Q80 100 150 76" stroke="#123a78" stroke-opacity=".2" stroke-width="6" fill="none"/>'), t: 0 },
  { id: 'fJersey', en: 'Jersey / Modal', ar: 'جيرسي / مودال', w: 'خفيف–متوسط', dr: 'مطاطي منسدل', sh: 'مطفي', d: 'مرن ومريح لكنه يلتصق؛ اختاري الجيرسي السميك مع البطن الممتلئ.', g: 'X H V', a: 'bF O', s: () => fab('url(#gF)', vlines(18, 0, 130, 80, 80, .08)) },
  { id: 'fPonte', en: 'Ponte / Scuba', ar: 'بونتي / سكوبا', w: 'سميك', dr: 'يحافظ على الشكل', sh: 'نصف مطفي', d: 'مطاطي سميك ينعّم الجسم ويحتفظ بالشكل؛ رائع للبنسل والبيبلوم.', g: 'X H O', a: 'fS', s: () => fab('url(#gF2)') },
  { id: 'fLinen', en: 'Linen', ar: 'كتان', w: 'متوسط', dr: 'هيكلي يتجعد', sh: 'مطفي', d: 'طبيعي يتنفس للصيف؛ يتجعد فاختاري الخلطات (Linen blend) للقصات المفصّلة.', g: 'H V A', a: '', s: () => fab('url(#gL)', [...Array(14).keys()].map(i => `<path d="M10 ${20 + i * 7}L150 ${18 + i * 7}" stroke="#123a78" stroke-opacity=".12" stroke-width="1.2"/>`).join('')) },
  { id: 'fDenim', en: 'Denim', ar: 'دنيم', w: 'متوسط–ثقيل', dr: 'هيكلي', sh: 'مطفي', d: 'الغسلة الداكنة الموحدة تنحّف؛ الغسلات الفاتحة والبهتان على الفخذ توسّع.', g: 'X H A V', a: '', s: () => fab('url(#gD)', [...Array(24).keys()].map(i => `<path d="M${i * 7} 10L${i * 7 - 30} 130" stroke="#fff" stroke-opacity=".12" stroke-width="1.4"/>`).join('')) },
  { id: 'fTweed', en: 'Tweed / Bouclé', ar: 'تويد / بوكليه', w: 'ثقيل', dr: 'هيكلي', sh: 'محبب', d: 'ملمس غني يضيف حجماً؛ للأجسام النحيلة وللجاكيتات القصيرة.', g: 'fS H V bS', a: 'fL O bL', s: () => fab('url(#gF2)', `<rect x="10" y="10" width="140" height="110" fill="url(#pDot)"/>`) },
  { id: 'fVelvet', en: 'Velvet', ar: 'مخمل', w: 'متوسط', dr: 'ثقيل ناعم', sh: 'عمق لامع', d: 'يمتص الضوء ويلمع على البروزات؛ للأعلى أو كقطعة مسائية واحدة.', g: 'H V fS', a: 'O bF hL', s: () => fab('#0a2350', '<path d="M30 18Q70 70 44 118" stroke="#3a72c6" stroke-opacity=".6" stroke-width="18" fill="none"/>') },
  { id: 'fKnit', en: 'Rib / Chunky Knit', ar: 'تريكو مضلّع', w: 'متوسط–سميك', dr: 'مرن', sh: 'مطفي', d: 'الريب الرفيع ينحّف؛ المحبوك السميك يضيف حجماً — للهيكل الصغير.', g: 'fS H bS', a: 'O bL fL', s: () => fab('url(#gF)', vlines(16, 10, 120, 70, 70, .25)) },
  { id: 'fLeather', en: 'Leather / Faux', ar: 'جلد', w: 'ثقيل', dr: 'هيكلي', sh: 'لامع خفيف', d: 'يعطي حدة وبنية؛ مثالي في الجاكيتات والتنانير المستقيمة.', g: 'X H A V', a: 'O', s: () => fab('#0b2a5b', '<path d="M20 30Q80 50 140 26M24 76Q80 94 140 70" stroke="#5f8fd6" stroke-opacity=".5" stroke-width="2" fill="none"/>') },
  { id: 'fOrganza', en: 'Organza / Taffeta', ar: 'أورجانزا / تفتا', w: 'خفيف هيكلي', dr: 'منتفخ', sh: 'لامع', d: 'يصنع حجماً منتفخاً؛ للأكمام والتنانير الدرامية على الأجسام النحيلة.', g: 'fS H V A', a: 'fL O hL', s: () => fab('url(#gL)', '<path d="M20 20Q60 120 120 40" stroke="#fff" stroke-opacity=".8" stroke-width="6" fill="none"/>'), t: 1 },
  { id: 'fSequin', en: 'Sequins / Metallic', ar: 'ترتر / معدني', w: 'متوسط', dr: 'ثقيل', sh: 'عاكس جداً', d: 'أقوى أداة لجذب النظر؛ ضعيها على أجمل منطقة في جسمك.', g: 'X V tall', a: 'O bF hL', s: () => fab('url(#gF)', [...Array(60).keys()].map(i => `<circle cx="${16 + (i % 12) * 11.5}" cy="${22 + Math.floor(i / 12) * 19}" r="4" fill="url(#gG)" opacity=".55"/>`).join('')) }
];
