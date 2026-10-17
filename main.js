// Interazioni del sito (nessun tracker, nessun servizio esterno)
const B=window.SITE_BASE||'';
// lingua: ricorda la scelta; sulla pagina italiana reindirizza alla lingua salvata
document.querySelectorAll('.langs a').forEach(a=>a.addEventListener('click',()=>{try{localStorage.setItem('ag-lang',a.dataset.lang)}catch(e){}}));
try{const s=localStorage.getItem('ag-lang');if(window.SITE_LANG==='it'&&s&&s!=='it'&&!/[?&]lang=it/.test(location.search)&&!document.referrer.startsWith(location.origin))location.replace(B+s+'/'+location.hash)}catch(e){}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const nv=document.querySelector('nav');document.getElementById('menu').onclick=()=>nv.classList.toggle('open');
document.querySelectorAll('nav .links a').forEach(a=>a.onclick=()=>nv.classList.remove('open'));
const sv=()=>nv.classList.toggle('solid',scrollY>innerHeight*.6);addEventListener('scroll',sv,{passive:true});sv();
// galleria
const ph=[...document.querySelectorAll('.ph')],lb=document.getElementById('lb'),im=lb.querySelector('img');let k=0;
const show=i=>{k=(i+ph.length)%ph.length;im.src=ph[k].href;im.alt=ph[k].querySelector('img').alt;lb.hidden=false};
ph.forEach((a,i)=>a.onclick=e=>{e.preventDefault();show(i)});
lbx.onclick=()=>lb.hidden=true;lbp.onclick=()=>show(k-1);lbn.onclick=()=>show(k+1);lb.onclick=e=>{if(e.target===lb)lb.hidden=true};
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key=='Escape')lb.hidden=true;if(e.key=='ArrowLeft')show(k-1);if(e.key=='ArrowRight')show(k+1)});
// pensiero della settimana (settimana ISO)
(()=>{const d=document.getElementById('weekdata');if(!d)return;const L=JSON.parse(d.textContent),t=new Date(),u=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate()));const day=u.getUTCDay()||7;u.setUTCDate(u.getUTCDate()+4-day);const y0=new Date(Date.UTC(u.getUTCFullYear(),0,1));const w=Math.ceil(((u-y0)/864e5+1)/7);
document.getElementById('weekq').textContent='“'+L[(u.getUTCFullYear()*53+w)%L.length]+'”'})();
// video TikTok: si carica solo al clic (nessun cookie di terze parti prima)
document.querySelectorAll('.vfacade').forEach(b=>b.addEventListener('click',()=>{const f=document.createElement('iframe');f.src='https://www.tiktok.com/player/v1/'+b.dataset.id+'?autoplay=1&rel=0&description=0&music_info=0';f.allow='autoplay; fullscreen; encrypted-media';f.allowFullscreen=true;f.title=b.getAttribute('aria-label');f.className='vframe';b.replaceWith(f)}));
// video ospitati sul sito: pulsante play elegante sopra i controlli nativi
document.querySelectorAll('.vlocal').forEach(w=>{const v=w.querySelector('video'),p=w.querySelector('.play');v.controls=false;p.onclick=()=>{v.controls=true;v.play()};v.addEventListener('play',()=>{v.controls=true;w.classList.add('playing');document.querySelectorAll('.vlocal video').forEach(o=>o!==v&&o.pause())});v.addEventListener('pause',()=>w.classList.remove('playing'))});
// respiro guidato: 6 cicli da 10 s (4 inspira, 6 espira) = 1 minuto
(()=>{const w=document.querySelector('.breath');if(!w)return;const c=w.querySelector('.circle'),l=w.querySelector('.bl'),btn=document.getElementById('breathbtn');let tm=[],on=false;
const stop=(done)=>{tm.forEach(clearTimeout);tm=[];on=false;c.className='circle';l.textContent=done?w.dataset.done:'';btn.textContent=w.dataset.start};
btn.onclick=()=>{if(on)return stop();on=true;btn.textContent=w.dataset.stop;for(let i=0;i<6;i++){tm.push(setTimeout(()=>{c.className='circle in';l.textContent=w.dataset.in},i*10000));tm.push(setTimeout(()=>{c.className='circle out';l.textContent=w.dataset.out},i*10000+4000))}tm.push(setTimeout(()=>stop(true),60000))}})();
// modulo contatti: compone una email (nessun backend)
(()=>{const f=document.getElementById('cform');if(!f)return;f.onsubmit=e=>{e.preventDefault();const v=n=>f.elements[n].value.trim();
const body=`${f.dataset.hello}\n\n${v('msg')}\n\n— ${v('name')}\n${v('email')}`;location.href='mailto:aleg.auren@gmail.com?subject='+encodeURIComponent(f.dataset.subject+' – '+v('type'))+'&body='+encodeURIComponent(body)}})();
