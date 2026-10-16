# Genera index.html (IT), en/, fr/, ar/ e sitemap.xml dai contenuti in content.py
import os,sys,json,html,urllib.parse
sys.path.insert(0,os.path.dirname(__file__));import content as C
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE='https://alegauren-creator.github.io/sito/'
LANGS=['it','en','fr','ar']
E=lambda s:html.escape(s,quote=True)
N_PHOTOS=len([f for f in os.listdir(ROOT+'/img') if f.startswith('foto-')])
IDS=['chi','foto','video','poesie','pensieri','lavoro','inizia','contatti']
def page(L):
  t=C.T[L];R='' if L=='it' else '../';url=SITE+t['path']
  alt=''.join(f'<link rel="alternate" hreflang="{l}" href="{SITE+C.T[l]["path"]}">' for l in LANGS)+f'<link rel="alternate" hreflang="x-default" href="{SITE}">'
  ld={"@context":"https://schema.org","@type":"Person","name":"Alessio Gaetano","jobTitle":t['job'],"url":url,"image":SITE+"og.jpg","email":"mailto:aleg.auren@gmail.com","sameAs":["https://www.tiktok.com/@a_g.auren","https://ko-fi.com/alessio_g"],"knowsLanguage":["it","en","fr"]}
  ws={"@context":"https://schema.org","@type":"WebSite","name":"Alessio Gaetano – "+t['sub'],"url":url,"inLanguage":L}
  langsw=''.join(f'<a href="{R}{C.T[l]["path"]}" hreflang="{l}" lang="{l}" data-lang="{l}"{" aria-current=\"true\"" if l==L else ""}>{C.T[l]["short"]}</a>' for l in LANGS)
  nav=''.join(f'<a href="#{i}">{E(n)}</a>' for i,n in zip(IDS,t['nav']))
  bio=''.join(f'<p>{E(p)}</p>' for p in t['bio'])
  gal=''.join(f'<a class="ph reveal" href="{R}img/foto-{i:02d}.jpg"><img src="{R}img/thumb-{i:02d}.jpg" alt="{E(t["photo_alt"])} {i}" loading="lazy" width="600" height="800"></a>' for i in range(1,N_PHOTOS+1))
  vids=''.join(f'<figure class="vid reveal"><button class="vfacade" type="button" data-id="{v}" aria-label="{E(t["video_play"])}: {E(tt)}"><img src="{R}img/video-{v}.jpg" alt="{E(tt)}" loading="lazy"><span class="play" aria-hidden="true"></span></button><figcaption>{E(tt)}</figcaption></figure>' for v,tt in zip(C.VIDEOS,t['video_titles']))
  poems=''
  for p in C.POEMS[L]:
    st=''.join('<div class="stanza reveal">'+''.join(f'<p>{E(l)}</p>' for l in s)+'</div>' for s in p['stanzas'])
    note=f'<span class="tr-note">{E(t["poem_note"])} – «{E(C.POEMS["it"][0]["title"])}»</span>' if t['poem_note'] else ''
    poems+=f'<article class="card poem reveal"><h3 class="poem-title">{E(p["title"])}</h3><cite class="poem-author">— Alessio Gaetano</cite>{note}{st}</article>'
  th=C.THOUGHTS[L]
  thoughts=''.join(f'<blockquote class="card reveal quote">“{E(x)}”<cite>— {E(t["author"])}</cite></blockquote>' for x in th[:2])
  week=f'<div class="week card reveal"><span class="lbl">{E(t["week_label"])}</span><p id="weekq" class="weekq">{E(th[2])}</p><script type="application/json" id="weekdata">{json.dumps(th,ensure_ascii=False)}</script></div>'
  serv=''.join(f'<div class="card reveal hov"><h3>{E(a)}</h3><p>{E(b)}</p><a class="btn" href="mailto:aleg.auren@gmail.com?subject={urllib.parse.quote(d)}">{E(c)}</a></div>' for a,b,c,d in t['services'])
  samples=''.join(f'<article class="card reveal sample"><span class="lbl">{E(k)}</span><h3>{E(a)}</h3>'+(f'<p class="slogan">{E(s)}</p>' if s else '')+''.join(f'<p>{E(x)}</p>' for x in b.split('\n'))+'</article>' for a,k,s,b in t['samples'])
  steps=''.join(f'<li class="step reveal"><span class="num">{i}</span><h3>{E(a)}</h3><p>{E(b)}</p></li>' for i,(a,b) in enumerate(t['steps'],1))
  msg=''.join(f'<p>{E(x)}</p>' for x in t['inizia_msg'])
  opts=''.join(f'<option>{E(o)}</option>' for o in t['f_types'])
  cl=t['c_labels']
  ar_font='' 
  return f'''<!doctype html><html lang="{L}" dir="{t['dir']}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{E(t['title'])}</title><meta name="description" content="{E(t['desc'])}">
<link rel="canonical" href="{url}">{alt}<link rel="icon" href="{R}favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website"><meta property="og:url" content="{url}"><meta property="og:title" content="Alessio Gaetano – {E(t['sub'])}"><meta property="og:description" content="{E(t['ogdesc'])}"><meta property="og:image" content="{SITE}og.jpg"><meta property="og:locale" content="{dict(it='it_IT',en='en_US',fr='fr_FR',ar='ar_AR')[L]}"><meta name="twitter:card" content="summary_large_image">
<!-- google-site-verification: incolla qui il meta tag di Google Search Console -->
<script type="application/ld+json">{json.dumps(ld,ensure_ascii=False)}</script><script type="application/ld+json">{json.dumps(ws,ensure_ascii=False)}</script>
<link rel="stylesheet" href="{R}fonts/fonts.css"><link rel="stylesheet" href="{R}style.css?v=7">
<script>window.SITE_BASE="{R}";window.SITE_LANG="{L}";</script></head><body>
<nav><a href="#top" class="brand">Alessio Gaetano</a><div class="links">{nav}</div><div class="langs" role="group" aria-label="{E(t['langlabel'])}">{langsw}</div><button id="menu" aria-label="{E(t['menu'])}">☰</button></nav>
<header id="top" class="hero"><div class="hero-bg"></div><canvas id="herorain" aria-hidden="true"></canvas><h1 class="reveal">Alessio Gaetano</h1><p class="sub reveal">{E(t['sub'])}</p><p class="roles reveal">{E(t['roles'])}</p><div class="reveal"><a class="btn" href="#chi">{E(t['more'])}</a> <a class="btn ghost" href="#lavoro">{E(t['work'])}</a></div></header>
<main>
<section id="chi"><h2 class="reveal">{E(t['h_chi'])}</h2><div class="card reveal">{bio}</div></section>
<section id="foto"><h2 class="reveal">{E(t['h_foto'])}</h2><div class="gallery">{gal}</div></section>
<section id="video"><h2 class="reveal">{E(t['h_video'])}</h2><p class="intro reveal">{E(t['video_intro'])}</p><div class="videos">{vids}</div><p class="note small reveal">{E(t['video_note'])}</p></section>
<section id="poesie"><h2 class="reveal">{E(t['h_poesie'])}</h2>{poems}</section>
<section id="pensieri"><h2 class="reveal">{E(t['h_pensieri'])}</h2>{week}<div class="grid2">{thoughts}</div></section>
<section id="libri"><h2 class="reveal">{E(t['h_libri'])}</h2><div class="card reveal book"><h3>{E(t['book_t'])}</h3><p>{E(t['book_d'])}</p><p><a class="btn" href="https://ko-fi.com/alessio_g" target="_blank" rel="noopener">{E(t['kofi'])}</a> <a class="btn ghost" href="https://www.tiktok.com/@a_g.auren" target="_blank" rel="noopener">{E(t['tiktok_follow'])}</a></p><p class="note">{E(t['more_books'])}</p></div></section>
<section id="lavoro"><h2 class="reveal">{E(t['h_lavoro'])}</h2><p class="intro reveal">{E(t['lavoro_intro'])}</p><div class="grid4">{serv}</div>
<h2 class="reveal sub2">{E(t['h_samples'])}</h2><p class="intro note reveal">{E(t['samples_note'])}</p><div class="samples">{samples}</div>
<h2 class="reveal sub2">{E(t['h_come'])}</h2><ol class="steps">{steps}</ol></section>
<section id="inizia"><h2 class="reveal">{E(t['h_inizia'])}</h2><div class="card reveal inizia"><div class="msg">{msg}</div>
<div class="breath" data-in="{E(t['breath_in'])}" data-out="{E(t['breath_out'])}" data-done="{E(t['breath_done'])}" data-start="{E(t['breath_start'])}" data-stop="{E(t['breath_stop'])}"><div class="circle"><span class="bl" aria-live="polite"></span></div><button class="btn" type="button" id="breathbtn">{E(t['breath_start'])}</button></div>
<p><a class="btn ghost" href="https://alegauren-creator.github.io/anima-quieta/" target="_blank" rel="noopener">{E(t['aq_link'])}</a></p></div></section>
<section id="app"><h2 class="reveal">{E(t['h_app'])}</h2><div class="app-one"><a class="card reveal hov" href="https://alegauren-creator.github.io/anima-quieta/" target="_blank" rel="noopener"><h3>Anima Quieta</h3><p>{E(t['app_d'])}</p></a></div></section>
<section id="contatti"><h2 class="reveal">{E(t['h_contatti'])}</h2><p class="intro reveal">{E(t['contact_intro'])}</p>
<form id="cform" class="card reveal cform" data-subject="{E(t['f_subject'])}" data-hello="{E(t['f_hello'])}"><div class="row"><label>{E(t['f_name'])}<input name="name" required autocomplete="name"></label><label>{E(t['f_email'])}<input name="email" type="email" required autocomplete="email" dir="ltr"></label></div>
<label>{E(t['f_type'])}<select name="type">{opts}</select></label><label>{E(t['f_msg'])}<textarea name="msg" rows="5" required></textarea></label>
<div class="factions"><button class="btn" type="submit">{E(t['f_send'])}</button><a class="btn ghost" href="https://wa.me/qr/L4SHBNHXK6KGN1" target="_blank" rel="noopener">{E(t['f_wa'])}</a></div><p class="note small">{E(t['f_hint'])}</p></form>
<div class="contacts">
<a class="card reveal hov" href="mailto:aleg.auren@gmail.com"><span class="lbl">{E(cl[0])}</span><span dir="ltr">aleg.auren@gmail.com</span></a>
<a class="card reveal hov" href="https://wa.me/qr/L4SHBNHXK6KGN1" target="_blank" rel="noopener"><span class="lbl">{E(cl[1])}</span>WhatsApp</a>
<a class="card reveal hov" href="https://www.tiktok.com/@a_g.auren" target="_blank" rel="noopener"><span class="lbl">{E(cl[2])}</span><span dir="ltr">TikTok @a_g.auren</span></a>
<a class="card reveal hov" href="https://ko-fi.com/alessio_g" target="_blank" rel="noopener"><span class="lbl">{E(cl[3])}</span>{E(t['c_coffee'])}</a></div></section>
</main>
<footer><p>© 2026 Alessio Gaetano · <a href="{R}privacy.html">{E(t['privacy'])}</a></p></footer>
<button id="music" type="button" aria-pressed="false" data-on="{E(t['music_on'])}" data-off="{E(t['music_off'])}" data-aon="{E(t['music_aria_on'])}" data-aoff="{E(t['music_aria_off'])}"><span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="t">{E(t['music_off'])}</span></button>
<div id="lb" hidden><button id="lbx" aria-label="{E(t['close'])}">×</button><button id="lbp" aria-label="{E(t['prev'])}">‹</button><img alt=""><button id="lbn" aria-label="{E(t['next'])}">›</button></div>
<script src="{R}main.js?v=3"></script><script src="{R}rain.js?v=5"></script><script src="{R}music.js?v=3"></script></body></html>'''
for L in LANGS:
  d=ROOT+'/'+C.T[L]['path'];os.makedirs(d,exist_ok=True);open(d+'index.html','w').write(page(L))
alts=''.join(f'<xhtml:link rel="alternate" hreflang="{l}" href="{SITE+C.T[l]["path"]}"/>' for l in LANGS)+f'<xhtml:link rel="alternate" hreflang="x-default" href="{SITE}"/>'
sm='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'+''.join(f'<url><loc>{SITE+C.T[l]["path"]}</loc><lastmod>2026-10-16</lastmod>{alts}</url>\n' for l in LANGS)+'</urlset>\n'
open(ROOT+'/sitemap.xml','w').write(sm);print('ok',N_PHOTOS)
