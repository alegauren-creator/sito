document.getElementById('thoughts').innerHTML=PENSIERI.map(t=>`<blockquote class="card reveal quote">“${t}”<cite>— Alessio Gaetano</cite></blockquote>`).join('');
document.getElementById('poems').innerHTML=POESIE.map(p=>{
  const st=p.stanzas.map(lines=>`<div class="stanza reveal">${lines.map(l=>`<p>${l}</p>`).join('')}</div>`).join('');
  return `<article class="card poem reveal"><h3 class="poem-title">${p.title}</h3><cite class="poem-author">— ${p.author||'Alessio Gaetano'}</cite>${st}</article>`;
}).join('');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.getElementById('menu').onclick=()=>document.querySelector('nav').classList.toggle('open');
document.querySelectorAll('nav .links a').forEach(a=>a.onclick=()=>document.querySelector('nav').classList.remove('open'));
const ph=[...document.querySelectorAll('.ph')],lb=document.getElementById('lb'),im=lb.querySelector('img');let k=0;
const show=i=>{k=(i+ph.length)%ph.length;im.src=ph[k].href;im.alt=ph[k].querySelector('img').alt;lb.hidden=false};
ph.forEach((a,i)=>a.onclick=e=>{e.preventDefault();show(i)});
lbx.onclick=()=>lb.hidden=true;lbp.onclick=()=>show(k-1);lbn.onclick=()=>show(k+1);
lb.onclick=e=>{if(e.target===lb)lb.hidden=true};
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key=='Escape')lb.hidden=true;if(e.key=='ArrowLeft')show(k-1);if(e.key=='ArrowRight')show(k+1)});

const nv=document.querySelector('nav'),sv=()=>nv.classList.toggle('solid',scrollY>innerHeight*.6);addEventListener('scroll',sv,{passive:true});sv();
