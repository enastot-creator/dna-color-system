"""Build all deliverables from src/:  python3 src/build.py
   → body-shape.html (consultation file)   → online/client.html + online/studio.html (online system)"""
import json, os, re
SRC = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(SRC)
rd = lambda *p: open(os.path.join(SRC, *p), encoding='utf-8').read()
b64 = lambda f: rd('assets', f).strip()
img = lambda f, alt: f'<img src="data:image/png;base64,{b64(f)}" alt="{alt}">'
LN, LW, EW = img('dna_navy.b64', 'DNA Image'), img('dna_white.b64', 'DNA Image'), img('enas_white.b64', 'Enas Fashion')
LIBS = ['draw.js', 'data1.js', 'data2.js', 'data3.js', 'data4.js', 'knowledge.js']

def split_defs(js):
    defs = re.search(r"const DEFS = `(.*?)`;", js, re.S).group(1)
    return defs, js.replace("const DEFS = `", "const DEFS_ = `", 1)

# 1) consultation file
js = "const LOGO_N=" + json.dumps(LN) + ",LOGO_W=" + json.dumps(LW) + ",ENAS_W=" + json.dumps(EW) + ";\n"
js += ''.join(rd(f) + '\n' for f in LIBS + ['app.js', 'app2.js', 'share.js'])
defs, js = split_defs(js)
t = rd('template.html').replace('__LOGO_N__', LN).replace('__LOGO_W__', LW).replace('__ENAS_W__', EW).replace('__DEFS__', defs).replace('__JS__', js)
open(os.path.join(ROOT, 'body-shape.html'), 'w', encoding='utf-8').write(t)

# 2) online system
core = "const LOGO_N=" + json.dumps(LN) + ",LOGO_W=" + json.dumps(LW) + ";\n" + ''.join(rd(f) + '\n' for f in LIBS + ['app.js']) + rd('online', 'api.js') + '\n'
defs, core = split_defs(core)
css = rd('online', 'online.css')
def page(title, body_js, extra=''):
    return f'''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow, noarchive">
<meta name="theme-color" content="#0B2A5B">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=Playfair+Display:ital,wght@0,500;1,400&family=Montserrat:wght@600;700&display=swap" rel="stylesheet">
<style>{css}</style>
</head>
<body>
{defs}
<!-- ▼ ضعي هنا رابط الخادم بعد رفعه (مثال: https://api.yourdomain.com) — اتركيه فارغاً لوضع التجربة -->
<script>window.DNA_API_BASE = "";</script>
<div id="app"><div style="padding:120px 24px;text-align:center;line-height:2">إذا ظهرت هذه الرسالة افتحي الرابط في متصفح Safari أو Chrome.</div></div>
<div class="modal" id="zoom"><div class="mbox"><button class="x-close" id="zClose" aria-label="إغلاق">×</button><div class="zc"></div></div></div>
<div id="toast"></div>{extra}
<script>
{core}
{body_js}
</script>
</body>
</html>'''
os.makedirs(os.path.join(ROOT, 'online'), exist_ok=True)
open(os.path.join(ROOT, 'online', 'client.html'), 'w', encoding='utf-8').write(page('Body DNA', rd('online', 'lens.js') + '\n' + rd('online', 'client.js'), '<div id="demoBadge" hidden>وضع التجربة</div>'))
open(os.path.join(ROOT, 'online', 'studio.html'), 'w', encoding='utf-8').write(page('DNA Studio', rd('online', 'studio.js')))
print('built: body-shape.html, online/client.html, online/studio.html')
