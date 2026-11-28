/* ═════════════ LIBRARY PART 2 — skirts · dresses · abaya · pants · jeans · shorts · jumpsuits ═════════════ */
const LM = () => mq({ arms: false });
const wb = (y = 155, w = 25.5, fn = PT.l) => fn(`M${r1(100 - w)} ${y}Q100 ${y + 1.5} ${r1(100 + w)} ${y}`, .45, .8);
const folds = (arr, o = .25) => arr.map(d => PT.l(d, o, .7)).join('');
const SK = {
  pencil: { hem: 31, len: 300, pts: [[33, 170], [36.5, 192], [35.6, 250]] },
  aline: { hem: 50, len: 300, pts: [[33, 172], [38.5, 205]] },
  slip: { hem: 40, len: 338, pts: [[34.5, 180], [36.6, 202], [37.5, 280]] },
  pleat: { hem: 53, len: 338, pts: [[32, 167], [40, 210]] },
  mermaid: { hem: 57, len: 388, pts: [[36.3, 192], [34, 250], [29, 300], [35, 335], [48, 372]] },
  tulip: { hem: 32, len: 286, dip: 9, pts: [[38, 188], [40.5, 235]] },
  bubble: { hem: 30, len: 290, dip: 3, pts: [[40, 195], [47.5, 245], [45, 274]] },
  tier: { hem: 60, len: 388, pts: [[33, 170], [37, 214], [38, 218, 1], [45, 220, 1], [47.5, 290, 1], [54, 292, 1]] },
  column: { hem: 37, len: 388, pts: [[35, 180], [36.6, 200], [36.4, 300]] },
  skater: { hem: 63, len: 238, dip: 7, pts: [[34, 167]] },
  godet: { hem: 50, len: 334, pts: [[36.3, 192], [35, 262], [33, 284]] },
  mini: { hem: 40, len: 240, pts: [[34, 175]] },
  midiA: { hem: 54, len: 330, pts: [[33, 172], [39, 210]] }
};
const sk = (k, extra = {}, f = 'F') => skirt({ ...SK[k], ...extra }, f);
LIB.skirt = [
  { id: 'pencil', en: 'Pencil Skirt', ar: 'تنورة بنسل', d: 'ضيقة ومستقيمة حتى الركبة؛ تبرز المنحنيات وتناسب الساعة الرملية والمستقيم.', g: 'X H V lL', a: 'A S thF bF hL', s: () => LM() + sk('pencil') + wb() + PT.l('M100 288L100 301', .5, .8) },
  { id: 'aline', en: 'A-Line Skirt', ar: 'تنورة A', d: 'تنساب بعيداً عن الورك والفخذ؛ القصة الأكثر أماناً للكمثري والأرداف الكبيرة.', g: 'A S hL thF O D V', a: '', s: () => LM() + sk('aline') + wb() + folds(['M112 200L118 298', 'M88 200L82 298']) },
  { id: 'slip', en: 'Bias-Cut Slip Midi', ar: 'تنورة ساتان مائلة', d: 'مقصوصة على الورب فتنساب على الجسم بنعومة؛ ترند ساتاني أنيق.', g: 'X H V tall lL', a: 'bF hP thF', s: () => LM() + sk('slip') + folds(['M108 200Q114 270 110 336', 'M93 210Q88 280 92 336', 'M120 230Q126 290 124 336'], .3), t: 1 },
  { id: 'pleat', en: 'Pleated Midi', ar: 'تنورة بليسيه', d: 'كسرات طولية تصنع خطوطاً عمودية وحركة؛ اختاري البليسيه المخيطة أعلى الورك.', g: 'H V X tall', a: 'hL thF S', s: () => LM() + sk('pleat') + wb() + vlines(16, 156, 338, 25, 53, .3) },
  { id: 'wrapS', en: 'Wrap Skirt', ar: 'تنورة ملتفة', d: 'تفتح بخط قطري يصنع حركة ويطيل الساق مع شق أمامي ناعم.', g: 'X A O H lS', a: '', s: () => LM() + sk('midiA', { hem: 50 }) + wb() + PT.l('M76 152Q104 240 112 330', .55, .9) + bow(76, 156) },
  { id: 'mermaid', en: 'Mermaid / Trumpet', ar: 'تنورة حورية', d: 'ضيقة حتى الركبة ثم تتسع؛ للمناسبات وتبرز منحنيات الساعة الرملية.', g: 'X S tall', a: 'O pt H bF thF', s: () => LM() + sk('mermaid') + wb() + folds(['M110 320L128 386', 'M90 320L72 386', 'M100 322L100 388']) },
  { id: 'tulip', en: 'Tulip Skirt', ar: 'تنورة توليب', d: 'تتراكب أمامياً كبتلات الزهرة؛ تضيف حجماً للورك المستقيم.', g: 'H V hS hF', a: 'A S hL thF', s: () => LM() + sk('tulip') + wb() + PT.l('M78 160Q96 250 126 285', .5, .9) + PT.l('M122 160Q104 250 74 285', .3, .7) },
  { id: 'bubble', en: 'Bubble / Balloon', ar: 'تنورة بالون', d: 'حجم منتفخ يُجمع عند الحاشية؛ من أقوى ترندات 2025/26 للأجسام النحيلة والمستقيمة.', g: 'H V hS hF fS', a: 'A S hL thF O pt', s: () => LM() + sk('bubble') + wb() + vlines(9, 268, 290, 44, 31, .25) + folds(['M90 200Q84 240 92 280', 'M112 200Q118 240 108 280']), t: 1 },
  { id: 'asym', en: 'Asymmetric Hem', ar: 'حاشية غير متماثلة', d: 'حاشية مائلة تُدخل حركة قطرية تكسر الامتلاء وتطيل الساق.', g: 'H O A V', a: 'pt', s: () => LM() + PT.g(sp([[75.4, 149, 1], [124.6, 149, 1], [136, 192], [146, 268], [151, 298, 1], [100, 324], [47, 352, 1], [56, 262], [64, 192]])) + wb() + folds(['M112 200L124 300', 'M88 200L72 340']) },
  { id: 'tier', en: 'Tiered Boho Maxi', ar: 'تنورة طبقات بوهو', d: 'طبقات متدرجة بإحساس البوهو؛ ترند الموسم للطويلات والأجسام النحيلة.', g: 'tall H V fS', a: 'pt lS A hL', s: () => LM() + sk('tier') + wb() + hline(218, 39, .5) + hline(291, 48, .5) + vlines(9, 220, 290, 40, 47, .18) + vlines(11, 293, 388, 50, 60, .18), t: 1 },
  { id: 'column', en: 'Column Maxi', ar: 'تنورة عمود ماكسي', d: 'مستقيمة طويلة بخط واحد نظيف؛ تطيل القامة وتلبس مع شق جانبي.', g: 'tall X H V lL', a: 'pt lS hL', s: () => LM() + sk('column') + wb() + PT.k('M118 300L117 389', .45, 1.1), t: 1 },
  { id: 'denimMaxi', en: 'Denim Maxi', ar: 'تنورة جينز ماكسي', d: 'جينز طويل بشق أمامي؛ ترند عملي وعصري للإطلالة اليومية.', g: 'tall H V X', a: 'pt hL thF', s: () => LM() + sk('column', {}, 'D') + wb(156, 25.5) + PT.st('M100 158L100 318') + PT.k('M100 320L100 389', .5, 1.2) + both(PT.st('M116 152Q119 166 132 168')), t: 1 },
  { id: 'skater', en: 'Skater / Circle', ar: 'تنورة دائرية قصيرة', d: 'دائرية واسعة بحركة مرحة؛ تصنع خصراً وتوازن الأكتاف العريضة.', g: 'V H hS bS', a: 'A thF tall', s: () => LM() + sk('skater') + wb() + folds(['M100 158L100 240', 'M112 160L126 236', 'M88 160L74 236', 'M120 158L148 228', 'M80 158L52 228']) },
  { id: 'godet', en: 'Godet Skirt', ar: 'تنورة جوديت', d: 'ضيقة من الأعلى مع قطع مثلثية في الحاشية تمنحها حركة دون حجم في الورك.', g: 'X H A', a: '', s: () => LM() + sk('godet') + wb() + ['M116 286L124 334', 'M84 286L76 334', 'M100 286L100 336'].map(d => PT.l(d, .4, .7)).join('') },
  { id: 'paperbagS', en: 'Paperbag Waist', ar: 'خصر بيبر باق', d: 'خصر مرتفع مكشكش بحزام ربطة؛ يصنع خصراً واضحاً للمستقيم.', g: 'H V hS bS tL', a: 'O bF tS', s: () => LM() + sk('midiA', { y0: 140, w0: 28, pts: [[25, 148, 1], [33, 172], [39, 210]] }) + vlines(8, 140, 148, 27, 25, .4) + hline(152, 25.5, .6) + bow(100, 151) },
  { id: 'dropS', en: 'Drop-Waist Pleat', ar: 'تنورة خصر منخفض', d: 'ضيقة حتى الورك ثم كسرات؛ ترند الخصر المنخفض للجذع الطويل والأجسام المستقيمة.', g: 'H V tL hS', a: 'tS A hL lS pt', s: () => LM() + sk('midiA', { pts: [[33, 172], [36.4, 196, 1], [44, 214]], hem: 54, len: 320 }) + hline(196, 36, .55) + vlines(12, 198, 320, 36, 54, .25), t: 1 }
];

/* ── Dresses ── */
const DR = (b, s) => mq() + b + s;
LIB.dress = [
  { id: 'sheath', en: 'Sheath Dress', ar: 'فستان شيث', d: 'مُفصّل يتبع الجسم حتى الركبة؛ كلاسيكي رسمي للساعة الرملية والمستقيم.', g: 'X H lL', a: 'A O bF thF', s: () => DR(sk('pencil', { y0: 148 }), bodice('jewel', { len: 151, fit: 'fitted', sleeveless: true, sw: 33 })) },
  { id: 'wrapD', en: 'Wrap Dress', ar: 'فستان ملتف', d: 'أيقونة القصات: V + خصر محدد + تنورة منسدلة؛ يناسب أغلب الأجسام.', g: 'X A O bL H D', a: '', s: () => DR(sk('midiA', { hem: 50, len: 318 }) + PT.l('M76 152Q104 240 114 318', .5, .9), sleeves({ len: .68, ease: 1.8 }) + bodice('wrap', { len: 152, fit: 'fitted' }) + PT.l('M100 110Q90 132 75 150', .5, .8) + bow(124, 152)) },
  { id: 'fitflare', en: 'Fit & Flare', ar: 'فستان فت آند فلير', d: 'محدد حتى الخصر ثم تنورة واسعة؛ يصنع شكل الساعة الرملية ويخفي الورك.', g: 'A S H X V', a: 'O tS', s: () => DR(sk('aline', { hem: 58, len: 296, pts: [[38, 178]] }) + vlines(7, 156, 296, 28, 56, .2), bodice('square', { len: 151, fit: 'fitted', sleeveless: true, sw: 33 })) },
  { id: 'alineD', en: 'A-Line Dress', ar: 'فستان A', d: 'يتسع تدريجياً من الصدر أو الخصر؛ مريح ويوازن الجزء السفلي الأعرض.', g: 'A S O D hL thF', a: '', s: () => DR('', sleeves({ len: .3, ease: 2 }) + bodice('scoop', { len: 312, fit: 'flow' })) },
  { id: 'empire', en: 'Empire Waist', ar: 'فستان إمباير', d: 'الخط تحت الصدر مباشرة ثم ينسدل؛ مثالي للبطن الممتلئ والجذع القصير.', g: 'O D tS bS pt A', a: 'bL', s: () => DR(sk('slip', { y0: 128, w0: 29.6, hem: 50, pts: [[32, 150], [37, 200]] }) + hline(129, 30, .6) + folds(['M110 140L118 336', 'M90 140L82 336']), sleeves({ len: .3, ease: 1.5, w: u => 9 * Math.pow(u, 1.6) }) + bodice('v', { len: 130, fit: 'fitted' })) },
  { id: 'shift', en: 'Shift Dress', ar: 'فستان شيفت', d: 'مستقيم بدون تحديد خصر؛ عصري للأجسام المستقيمة والمقلوبة النحيلة.', g: 'H V lL hS', a: 'X A hL bL', s: () => DR('', bodice('boat', { len: 282, fit: 'boxy', sleeveless: true, sw: 34 })) },
  { id: 'slipD', en: 'Slip Dress', ar: 'فستان سليب', d: 'ساتان بحمالات رفيعة مقصوص على الورب؛ يُلبس وحده أو فوق تيشيرت ناعم.', g: 'X H V bS tall', a: 'bL bF hP', s: () => DR(sk('slip', { y0: 150 }), bodice('cami', { len: 152, fit: 'semi' }) + both(navyStrap('M126.5 100L123.5 75', 1.2))) + folds(['M108 200Q114 270 110 336', 'M93 210Q88 280 92 336']), t: 1 },
  { id: 'shirtD', en: 'Shirt Dress', ar: 'فستان قميص', d: 'ياقة وأزرار وحزام عند الخصر؛ عملي وأنيق للعمل والنهار.', g: 'H X V A', a: '', s: () => DR(sk('midiA', { len: 320 }) + PT.l('M100 152L100 318', .35), sleeves({ len: .7, ease: 2.2, cuff: .05 }) + bodice('vShallow', { len: 152, fit: 'semi' }) + shirtCollar() + [100, 118, 136].map(y => PT.c(100, y)).join('') + PT.g(sym([[0, 147], [29, 147, 1], [29, 155, 1], [0, 155]])) + `<rect x="95" y="146.5" width="10" height="9" rx="1.5" fill="none" stroke="#dfe8f7" stroke-width="1"/>`) },
  { id: 'columnD', en: 'Column Gown', ar: 'فستان عمود', d: 'خط واحد مستقيم من الصدر للأرض؛ أنيق جداً للطويلات.', g: 'tall X H V', a: 'pt hL O', s: () => DR(sk('column', { y0: 148 }), bodice('strapless', { len: 152, fit: 'fitted' })) },
  { id: 'dropD', en: 'Drop-Waist Dress', ar: 'فستان خصر منخفض', d: 'الخصر عند الورك ثم كسرات؛ ترند 2025/26 يطيل الجذع القصير ويناسب المستقيم.', g: 'H V tS hS bS', a: 'A S hL lS pt X', s: () => DR(sk('midiA', { y0: 194, w0: 36.4, pts: [[44, 214]], hem: 54, len: 308 }) + vlines(12, 196, 308, 36, 54, .25), sleeves({ len: .3, ease: 1.8 }) + bodice('scoop', { len: 196, fit: 'fitted', hemW: 36.6 })), t: 1 },
  { id: 'corsetD', en: 'Corset Dress', ar: 'فستان كورسيه', d: 'صدر مُدعّم بخطوط كورسيه وتنورة منسدلة؛ ترند المناسبات الأبرز.', g: 'X H A bS', a: 'O bF D', s: () => DR(sk('slip', { y0: 160 }), bodice('sweetheart', { len: 162, fit: 'fitted', hemDip: 6, hemPoint: 1 }) + [-22, -12, 0, 12, 22].map(x => PT.l(`M${100 + x} ${x === 0 ? 100 : 96}L${100 + x * .8} ${x === 0 ? 166 : 160}`, .38, .6)).join('')), t: 1 },
  { id: 'mermaidD', en: 'Mermaid Gown', ar: 'فستان حورية', d: 'يحتضن الجسم حتى الركبة ثم ينفتح؛ للسهرات ويبرز المنحنيات.', g: 'X S tall', a: 'O pt H bF', s: () => DR(sk('mermaid', { y0: 148 }), bodice('off', { len: 152, fit: 'fitted' })) },
  { id: 'bubbleD', en: 'Bubble-Hem Dress', ar: 'فستان بالون', d: 'حاشية منتفخة قصيرة؛ ترند مرح للنحيلات وأصحاب الساق الجميلة.', g: 'H V fS lL', a: 'A hL thF O', s: () => DR(sk('bubble', { y0: 150 }) + vlines(9, 268, 290, 44, 31, .25), bodice('strapless', { len: 152, fit: 'fitted' })), t: 1 },
  { id: 'trapeze', en: 'Trapeze / Swing', ar: 'فستان ترابيز', d: 'يتسع كالمثلث من الأكتاف؛ يخفي البطن والورك بأسلوب الستينات.', g: 'O D A', a: 'pt V', s: () => DR('', sleeves({ len: .68, ease: 2 }) + bodice('v', { len: 290, fit: 'wide' })) },
  { id: 'knitD', en: 'Knit Midi', ar: 'فستان تريكو', d: 'محبوك يتبع الجسم برفق؛ اختاري محبوكاً متوسط السماكة لا يلتصق.', g: 'X H V tall', a: 'O bF thF', s: () => DR(sk('slip', { hem: 37, pts: [[34.5, 180], [36.6, 202], [36, 280]] }) + vlines(10, 160, 338, 25, 37, .14), sleeves({ len: .97, ease: 1.3 }) + bodice('mock', { len: 152, fit: 'fitted' }) + vlines(10, 70, 150, 33, 25, .14)) },
  { id: 'oneD', en: 'One-Shoulder Midi', ar: 'فستان كتف واحد', d: 'خط قطري يكسر عرض الأكتاف ويجذب العين لأعلى بأناقة.', g: 'V shB X H A', a: '', s: () => DR(sk('slip', { y0: 150 }), PT.g(sp([[138, 77, 1], [134.5, 88], [133.6, 99], [134.6, 116], [131.5, 131], [125, 152, 1], [75, 152, 1], [68.5, 131], [65.4, 116], [66.2, 101], [80, 98], [112, 80], [125, 69.5, 1]]))), t: 1 },
  { id: 'blazerD', en: 'Blazer Dress', ar: 'فستان بليزر', d: 'بليزر طويل مُغلق يُلبس كفستان؛ قوي ومحدد للخصر مع حزام.', g: 'H X V tL', a: 'bL O', s: () => mq() + jacket({ len: 262, fit: 'fitted', lapel: 'notch', closed: true, yb: 140, db: true, buttons: 2 }), t: 1 },
  { id: 'kaftan', en: 'Kaftan', ar: 'قفطان', d: 'منسدل واسع بأكمام كيمونو؛ أنيق ومريح ويخفي التفاصيل بالكامل.', g: 'O D A tall', a: 'pt', s: () => mq() + sleeves({ len: .66, ease: 8, innerK: 1.3 }) + bodice('v', { len: 386, fit: 'flow' }) + PT.l('M100 101L100 140', .4) }
];

/* ── Abaya (Gulf modest wear) ── */
function abaya(o = {}) {
  const hem = o.hem ?? 44, wW = o.waist ?? 37;
  let s = mq();
  s += bodice('jewel', { len: 386, fit: 'semi' }, 'I');
  const R = [[109.5, 66, 1], [139, 77.5, 1], [136.5, 92], [100 + wW + 1, 120], [100 + wW, 150], [100 + hem - 4, 300], [100 + hem, 388, 1], [100 + (o.ov ?? 5), 389, 1], [100 + (o.ov ?? 5), 100], [106, 72]];
  let panel = PT.g(sp(R));
  if (o.trim) panel += PT.l(sp([[110.5, 68], [107.6, 73], [100 + (o.ov ?? 5) + 3, 100], [100 + (o.ov ?? 5) + 3, 387]], false), .7, 1.1);
  s += flip(panel) + panel;
  if (o.sleeve) s += sleeves(o.sleeve);
  return s;
}
LIB.abaya = [
  { id: 'abOpen', en: 'Classic Open Abaya', ar: 'عباءة كلاسيك مفتوحة', d: 'خط مستقيم مفتوح من الأمام يصنع عموداً طولياً يطيل القامة لكل الأجسام.', g: 'pt O A H V X D', a: '', s: () => abaya({ sleeve: { len: .95, ease: 3.2 } }) },
  { id: 'abFarasha', en: 'Butterfly (Farasha)', ar: 'عباءة فراشة', d: 'أجنحة واسعة متصلة من الكتف للحاشية؛ تخفي التفاصيل وتناسب الأجسام الممتلئة والطويلة.', g: 'O D A tall fL', a: 'pt fS', s: () => mq() + bodice('jewel', { len: 386, fit: 'semi' }, 'I') + PT.g(sym([[0, 64], [11, 66, 1], [40, 78], [66, 160], [72, 214, 1], [60, 222], [46, 214], [43, 300], [45, 388, 1], [0, 390]])) + PT.k('M100 72L100 388', .0) + PT.l('M100 75L100 388', .55, .9) + both(PT.l('M112 70Q140 140 160 214', .2, .6)) },
  { id: 'abKimono', en: 'Kimono Abaya', ar: 'عباءة كيمونو', d: 'أكمام كيمونو عريضة مستقيمة وقصة منسدلة؛ عصرية للعمل والمناسبات.', g: 'A O H V', a: 'pt', s: () => abaya({ sleeve: { len: .6, ease: 7, innerK: 1.25 } }), t: 1 },
  { id: 'abBelt', en: 'Belted / Wrap Abaya', ar: 'عباءة بحزام', d: 'حزام يحدد الخصر فيُظهر انحناءات الساعة الرملية والمستقيم بأناقة.', g: 'X H A V', a: 'O D bF', s: () => abaya({ waist: 31, ov: 1, sleeve: { len: .95, ease: 2.8 } }) + PT.g(sym([[0, 146], [33, 146, 1], [33, 154, 1], [0, 154]])) + bow(118, 152) },
  { id: 'abUmb', en: 'Umbrella / A-Line', ar: 'عباءة كلوش (مظلة)', d: 'تتسع للأسفل كالمظلة؛ توازن الأكتاف العريضة وتعطي حركة فخمة.', g: 'V H X tall', a: 'pt', s: () => abaya({ hem: 66, sleeve: { len: .95, ease: 3 } }) + both(PT.l('M118 150L150 386', .22)) },
  { id: 'abCape', en: 'Cape Abaya', ar: 'عباءة كاب', d: 'طبقة كاب على الأكتاف؛ تضيف حضوراً للأكتاف الضيقة وتخفي الذراعين.', g: 'A S shN shSl', a: 'shB V pt', s: () => abaya({ hem: 48 }) + PT.g(sym([[0, 62], [11, 66, 1], [40, 80], [56, 160, 1], [0, 176]])) + PT.l('M100 70L100 175', .5, .8), t: 1 },
  { id: 'abBisht', en: 'Bisht-Style Trim', ar: 'عباءة بشت مطرزة', d: 'حواف بتطريز رفيع على الأطراف؛ يصنع خطين عموديين يُنحّفان ويطيلان.', g: 'O D A pt X H', a: '', s: () => abaya({ trim: 1, sleeve: { len: .95, ease: 3.4, cuff: .05 } }) }
];

/* ── Pants ── */
const PN = {
  straight: { thigh: 36, knee: 11, hem: 11 },
  wide: { thigh: 38, knee: 17, hem: 21, len: 390 },
  palazzo: { thigh: 41, knee: 23, hem: 29, len: 390, y0: 146 },
  flare: { thigh: 35, knee: 9.3, hem: 19, len: 390 },
  boot: { thigh: 35.4, knee: 10, hem: 13.5 },
  cig: { thigh: 34.6, knee: 8.6, hem: 7, len: 372 },
  skinny: { thigh: 34, knee: 7.5, hem: 5.6, len: 378 },
  barrel: { thigh: 37.6, knee: 19, hem: 10.5, len: 376, mid: [[39.5, 258]] },
  taper: { thigh: 38.5, knee: 12, hem: 7.5, len: 372 },
  culotte: { thigh: 38, knee: 17, hem: 21, len: 326 },
  cargo: { thigh: 37, knee: 14, hem: 12.5 },
  jogger: { thigh: 36, knee: 11, hem: 7, len: 372 },
  pleatW: { thigh: 39, knee: 16, hem: 17, len: 390, crease: 1 },
  capri: { thigh: 34.6, knee: 9, hem: 8, len: 330 },
  mom: { thigh: 37, knee: 11.5, hem: 9, len: 374, y0: 145 },
  baggy: { thigh: 39, knee: 16, hem: 16, len: 390, y0: 160, crotch: 228 }
};
const pn = (k, ex = {}, f = 'F') => pants({ ...PN[k], ...ex }, f);
const jeansDet = (y0 = 149) => wb(y0 + 6, 25.5 + (y0 < 150 ? 0 : (y0 - 150) * .24)) + both(PT.st(`M${116} ${y0 + 3}Q119 ${y0 + 16} ${133} ${y0 + 19}`)) + PT.st(`M103 ${y0 + 7}L103 ${y0 + 40}Q102 ${y0 + 46} 100 ${y0 + 48}`);
LIB.pants = [
  { id: 'straightP', en: 'Straight Leg', ar: 'بنطال مستقيم', d: 'خط مستقيم من الورك للحاشية؛ يوازن كل الأجسام ويطيل الساق.', g: 'A O X H V D S', a: '', s: () => LM() + pn('straight', { crease: 1 }) + wb() },
  { id: 'wideP', en: 'Wide Leg', ar: 'بنطال واسع', d: 'واسع من الورك يغطي الحذاء؛ مع الخصر العالي يطيل الساق بشكل مذهل.', g: 'A S V X H thF hL cF tall', a: 'pt', s: () => LM() + pn('wide') + wb() + folds(['M114 230L124 388', 'M86 230L76 388']), t: 1 },
  { id: 'palazzo', en: 'Palazzo', ar: 'بالاتزو', d: 'واسع جداً وانسيابي؛ يعطي فخامة ويخفي الأرداف والأفخاذ.', g: 'A S thF hL tall V', a: 'pt lS', s: () => LM() + pn('palazzo') + wb(152, 25.8) + folds(['M112 220L128 388', 'M88 220L72 388', 'M120 230L140 388']) },
  { id: 'flareP', en: 'Flare', ar: 'بنطال فلير', d: 'ضيق حتى الركبة ثم يتسع؛ يوازن الأرداف ويطيل الساق مع الكعب.', g: 'A S X V thF', a: 'pt', s: () => LM() + pn('flare') + wb(), t: 1 },
  { id: 'bootP', en: 'Bootcut', ar: 'بوت كت', d: 'اتساع خفيف عند الحاشية يوازن الأفخاذ ويجلس فوق البوت.', g: 'A S X thF cF', a: '', s: () => LM() + pn('boot') + wb() },
  { id: 'cig', en: 'Cigarette', ar: 'سيجارة', d: 'ضيق مستقيم بطول الكاحل؛ أنيق للساق النحيلة مع حذاء مدبب.', g: 'V H O lL cS', a: 'A S thF cF', s: () => LM() + pn('cig', { crease: 1 }) + wb() },
  { id: 'barrelP', en: 'Barrel / Horseshoe', ar: 'بنطال برميل', d: 'منحني عند الركبة وضيق عند الكاحل؛ ترند 2025/26 الأقوى للطويلات والنحيلات.', g: 'H V tall lL fS', a: 'pt A S thF lS', s: () => LM() + pn('barrel') + wb() + both(PT.l('M126 240Q134 290 122 360', .3)), t: 1 },
  { id: 'taper', en: 'Pleated Tapered', ar: 'بنطال كسرات مدبب', d: 'كسرات عند الخصر وحجم في الورك يضيق للحاشية؛ يضيف منحنى للورك المسطح.', g: 'H V hF hS', a: 'A S hL thF bF', s: () => LM() + pn('taper') + wb() + both(PT.l('M112 156L114 200', .45) + PT.l('M118 156L119 190', .35)) },
  { id: 'culotte', en: 'Culottes', ar: 'كيلوت', d: 'واسع بطول منتصف الساق؛ عصري لكنه يقصّر — للطويلات والساق الطويلة.', g: 'tall lL V H', a: 'pt lS cF', s: () => LM() + pn('culotte') + wb() },
  { id: 'cargo', en: 'Cargo / Parachute', ar: 'كارجو / باراشوت', d: 'جيوب جانبية وقماش عملي؛ ترند الستريت ستايل للأجسام المستقيمة والمقلوبة.', g: 'V H hS hF', a: 'A S thF hL', s: () => LM() + pn('cargo') + wb() + both(`<rect x="129" y="242" width="13" height="18" rx="2" fill="none" stroke="rgba(255,255,255,.5)" stroke-width=".8"/>` + PT.l('M129 247l13 0', .5, .8)), t: 1 },
  { id: 'jogger', en: 'Tailored Jogger', ar: 'جوقر رسمي', d: 'خصر مطاطي وحاشية مجموعة بقماش راقٍ؛ مريح للإطلالة السمارت كاجوال.', g: 'H V lL', a: 'pt cF thF', s: () => LM() + pn('jogger') + hline(156, 25.5, .5) + both(PT.l('M106 364L119 364', .5, .9)) },
  { id: 'pleatW', en: 'Pleated Wide Trouser', ar: 'بنطال واسع بكسرات', d: 'تيلورنق فضفاض بكسرات وخط كي أمامي؛ ترند الأناقة الهادئة (Quiet Luxury).', g: 'A S V H X tall thF', a: 'pt', s: () => LM() + pn('pleatW') + wb() + both(PT.l('M113 156L115 196', .45)), t: 1 },
  { id: 'capri', en: 'Capri', ar: 'كابري', d: 'ضيق بطول منتصف الساق؛ عاد كترند مع الباليرينا — للساق الطويلة النحيلة.', g: 'lL cS tall', a: 'pt lS cF', s: () => LM() + pn('capri') + wb(), t: 1 },
  { id: 'paperbagP', en: 'Paperbag Trouser', ar: 'بنطال بيبر باق', d: 'خصر مرتفع مكشكش بحزام؛ يصنع خصراً ويضيف منحنى للورك.', g: 'H V hS hF tL', a: 'O bF tS', s: () => LM() + pn('straight', { y0: 140, w0: 28 }) + vlines(8, 140, 148, 27, 25, .4) + hline(152, 25.5, .6) + bow(100, 151) }
];

LIB.jeans = [
  { id: 'jStraight', en: 'Straight Jeans', ar: 'جينز مستقيم', d: 'الأكثر توازناً لأغلب الأجسام؛ اختاريه بخصر عالٍ وغسلة داكنة.', g: 'A O X H V D S', a: '', s: () => LM() + pn('straight', {}, 'D') + jeansDet() },
  { id: 'jWide', en: 'Wide-Leg Jeans', ar: 'جينز واسع', d: 'واسع بطول كامل يغطي الكعب؛ يطيل ويوازن الأرداف.', g: 'A S V X thF hL tall', a: 'pt', s: () => LM() + pn('wide', {}, 'D') + jeansDet(), t: 1 },
  { id: 'jBarrel', en: 'Barrel Jeans', ar: 'جينز برميل', d: 'منحني ومريح؛ ترند الموسم — اختاريه بطول الكاحل مع حذاء مدبب.', g: 'H V tall lL', a: 'pt A S thF lS', s: () => LM() + pn('barrel', {}, 'D') + jeansDet(), t: 1 },
  { id: 'jFlare', en: 'Flare Jeans', ar: 'جينز فلير', d: 'ضيق حتى الركبة ثم يتسع؛ رجعة السبعينات تطيل الساق جداً مع الكعب.', g: 'A S X V thF', a: '', s: () => LM() + pn('flare', {}, 'D') + jeansDet(), t: 1 },
  { id: 'jBoot', en: 'Bootcut Jeans', ar: 'جينز بوت كت', d: 'اتساع بسيط يوازن الأفخاذ الممتلئة والساق العضلية.', g: 'A S X thF cF', a: '', s: () => LM() + pn('boot', {}, 'D') + jeansDet() },
  { id: 'jMom', en: 'Mom Jeans', ar: 'مام جينز', d: 'خصر عالٍ جداً ومريح عند الورك ويضيق قليلاً؛ يصنع منحنى للورك المسطح.', g: 'H V hF hS tL', a: 'A S hL thF tS', s: () => LM() + pn('mom', {}, 'D') + jeansDet(145) },
  { id: 'jSlim', en: 'Slim Straight', ar: 'سليم ستريت', d: 'ضيق دون أن يلتصق؛ بديل عصري للسكيني.', g: 'V H O X lL', a: 'A thF', s: () => LM() + pn('cig', { len: 380, hem: 8 }, 'D') + jeansDet() },
  { id: 'jSkinny', en: 'Skinny', ar: 'سكيني', d: 'ملتصق بالكامل؛ لم يعد الترند الأول لكنه أساسي مع البوت والتونيك.', g: 'V O D lL cS', a: 'A S thF cF hL', s: () => LM() + pn('skinny', {}, 'D') + jeansDet() },
  { id: 'jBaggy', en: 'Baggy / Boyfriend', ar: 'جينز باقي', d: 'خصر منخفض وواسع؛ ستريت ستايل للأجسام النحيلة والمستقيمة.', g: 'H V fS tall', a: 'pt A S hL O', s: () => LM() + pn('baggy', {}, 'D') + jeansDet(160), t: 1 }
];
LIB.rise = [
  { id: 'rLow', en: 'Low Rise', ar: 'خصر منخفض', d: 'يجلس تحت السرة بـ 7–10 سم؛ يطيل الجذع القصير لكنه يُظهر البطن.', g: 'tS lL', a: 'tL lS bF O', s: () => LM() + pn('straight', { y0: 168 }, 'D') + jeansDet(168) },
  { id: 'rMid', en: 'Mid Rise', ar: 'خصر متوسط', d: 'يجلس تحت السرة مباشرة؛ متوازن ومريح لمعظم الأجسام.', g: 'X H tS', a: '', s: () => LM() + pn('straight', { y0: 158 }, 'D') + jeansDet(158) },
  { id: 'rHigh', en: 'High Rise', ar: 'خصر عالٍ', d: 'يجلس عند أنحف نقطة في الخصر؛ يطيل الساق القصيرة ويحتوي البطن.', g: 'lS tL pt A X H O bF', a: 'tS', s: () => LM() + pn('straight', { y0: 149 }, 'D') + jeansDet(149) },
  { id: 'rUltra', en: 'Ultra-High Rise', ar: 'خصر مرتفع جداً', d: 'فوق السرة بعدة سنتيمترات؛ أقصى إطالة للساق مع توب قصير أو مدخل.', g: 'lS tL pt A', a: 'tS bL', s: () => LM() + pn('straight', { y0: 142 }, 'D') + jeansDet(142) }
];

const sh = (o, f = 'F') => pants({ thigh: 35.5, ...o }, f);
LIB.shorts = [
  { id: 'bermuda', en: 'Bermuda Shorts', ar: 'برمودا', d: 'تصل للركبة تقريباً؛ ترند الصيف الأقوى ويُلبس مع لوفر أو صندل.', g: 'tall lL V H', a: 'pt lS cF', s: () => LM() + sh({ len: 286, hemOut: 35.5, hemIn: 2.5, crease: 1 }) + wb(), t: 1 },
  { id: 'tailoredS', en: 'Tailored Shorts', ar: 'شورت رسمي', d: 'قماش مُفصّل وطول منتصف الفخذ؛ أنيق مع بليزر للطقس الحار.', g: 'X H V lL', a: 'thF', s: () => LM() + sh({ len: 246, hemOut: 37.5, hemIn: 2 }) + wb() + both(PT.l('M104 240L136 240', .45, .9)) },
  { id: 'denimS', en: 'Denim Shorts', ar: 'شورت جينز', d: 'اختاري الخصر العالي والطول تحت الأرداف لإطالة الساق.', g: 'lL H V', a: 'thF pt', s: () => LM() + sh({ len: 230, hemOut: 37, hemIn: 2.5 }, 'D') + jeansDet() },
  { id: 'biker', en: 'Biker Shorts', ar: 'بايكر', d: 'ملتصق مرن لمنتصف الفخذ؛ للرياضة أو تحت فستان أو مع بليزر أوفرسايز.', g: 'V H lL fS', a: 'thF A S hL', s: () => LM() + sh({ len: 270, thigh: 34, hemOut: 24, hemIn: 2.2 }) + hline(152, 25, .4) },
  { id: 'wideS', en: 'Wide Culotte Shorts', ar: 'شورت واسع', d: 'واسع وانسيابي يخفي الأفخاذ مع حركة ناعمة.', g: 'A S thF', a: 'pt', s: () => LM() + sh({ len: 262, thigh: 38, hemOut: 44, hemIn: 1.2 }) + wb() },
  { id: 'boxer', en: 'Boxer Shorts', ar: 'بوكسر', d: 'خصر مطاطي وقماش قطني مخطط؛ ترند صيفي مريح للإطلالات الكاجوال.', g: 'H V fS', a: 'thF hL', s: () => LM() + sh({ len: 236, thigh: 36, hemOut: 37.5, hemIn: 2.5 }) + vlines(8, 152, 236, 25, 37, .2) + hline(156, 25, .55), t: 1 }
];

LIB.jump = [
  { id: 'jsWrap', en: 'Wrap Jumpsuit', ar: 'جمبسوت ملتف', d: 'صدر ملتف وحزام خصر وأرجل واسعة؛ أسهل جمبسوت لأغلب الأجسام.', g: 'X A O bL H', a: 'tL', s: () => mq() + pn('wide') + sleeves({ len: .3, ease: 2 }) + bodice('wrap', { len: 152, fit: 'fitted' }) + bow(124, 152) },
  { id: 'jsUtility', en: 'Utility / Boiler', ar: 'جمبسوت يوتيليتي', d: 'ياقة وجيوب وسحاب؛ عملي بإحساس الأوفرول الحديث.', g: 'H V A', a: 'pt bL', s: () => mq() + pn('straight', { y0: 149 }) + sleeves({ len: .62, ease: 2.6, cuff: .06 }) + bodice('vShallow', { len: 152, fit: 'semi' }) + shirtCollar() + PT.l('M100 86L100 214', .6, 1) + both(`<rect x="110" y="104" width="11" height="12" rx="1.5" fill="none" stroke="rgba(255,255,255,.5)" stroke-width=".7"/>`) + PT.g(sym([[0, 147], [29, 147, 1], [29, 154, 1], [0, 154]])), t: 1 },
  { id: 'jsStrapless', en: 'Strapless Wide', ar: 'جمبسوت سترابلس', d: 'صدر مكشوف وأرجل واسعة؛ للسهرات ويبرز الأكتاف والترقوة.', g: 'A X shN tall', a: 'shB V bL', s: () => mq() + pn('palazzo') + bodice('strapless', { len: 152, fit: 'fitted' }) },
  { id: 'jsHalter', en: 'Halter Jumpsuit', ar: 'جمبسوت هولتر', d: 'أحزمة رقبة تخفف الأكتاف العريضة مع أرجل منسدلة.', g: 'V shB tall', a: 'bL nS', s: () => mq() + pn('wide') + bodice('halter', { len: 152, fit: 'fitted' }) + bow(100, 60, 'F') },
  { id: 'jsTailor', en: 'Tailored Jumpsuit', ar: 'جمبسوت مفصّل', d: 'ياقة بليزر وأرجل مستقيمة بكسرة؛ بديل أنيق للبدلة الرسمية.', g: 'H X V tall', a: 'pt', s: () => mq() + pn('pleatW') + jacket({ len: 152, fit: 'fitted', lapel: 'notch', closed: true, yb: 134, ease: 0 }), t: 1 }
];
