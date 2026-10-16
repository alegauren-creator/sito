document.getElementById('thoughts').innerHTML=PENSIERI.map(t=>`<blockquote class="card reveal quote">“${t}”<cite>— Alessio Gaetano</cite></blockquote>`).join('');
document.getElementById('poems').innerHTML=POESIE.map(p=>{
  const st=p.stanzas.map(lines=>`<div class="stanza reveal">${lines.map(l=>`<p>${l}</p>`).join('')}</div>`).join('');
  return `<article class="card poem reveal"><h3 class="poem-title">${p.title}</h3><cite class="poem-author">— ${p.author||'Alessio Gaetano'}</cite>${st}</article>`;
}).join('');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
for(let i=0;i<14;i++){const s=document.createElement('span');s.textContent=['🍃','🌸','✿','❀'][i%4];s.style.left=Math.random()*100+'vw';s.style.animationDuration=14+Math.random()*16+'s';s.style.animationDelay=-Math.random()*30+'s';s.style.color=C[i%5];s.style.fontSize=12+Math.random()*16+'px';L.appendChild(s)}
document.getElementById('menu').onclick=()=>document.querySelector('nav').classList.toggle('open');
document.querySelectorAll('nav .links a').forEach(a=>a.onclick=()=>document.querySelector('nav').classList.remove('open'));
const ph=[...document.querySelectorAll('.ph')],lb=document.getElementById('lb'),im=lb.querySelector('img');let k=0;
const show=i=>{k=(i+ph.length)%ph.length;im.src=ph[k].href;im.alt=ph[k].querySelector('img').alt;lb.hidden=false};
ph.forEach((a,i)=>a.onclick=e=>{e.preventDefault();show(i)});
lbx.onclick=()=>lb.hidden=true;lbp.onclick=()=>show(k-1);lbn.onclick=()=>show(k+1);
lb.onclick=e=>{if(e.target===lb)lb.hidden=true};
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key=='Escape')lb.hidden=true;if(e.key=='ArrowLeft')show(k-1);if(e.key=='ArrowRight')show(k+1)});

(()=>{const c=document.getElementById('rain');if(!c||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const x=c.getContext('2d');let W,H,D=[];const dpr=Math.min(devicePixelRatio||1,2);
const R=()=>{W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);const n=Math.round(W*H/52000)+6;D=Array.from({length:n},()=>mk(true))};
const mk=a=>({x:Math.random()*W,y:a?Math.random()*H:-20,r:1.5+Math.random()*3,v:.15+Math.random()*.5,w:0,p:Math.random()*400});
const draw=d=>{const g=x.createLinearGradient(d.x,d.y-d.r*9,d.x,d.y);g.addColorStop(0,'rgba(170,215,220,0)');g.addColorStop(1,'rgba(170,215,220,.16)');x.fillStyle=g;x.fillRect(d.x-d.r*.35,d.y-d.r*9,d.r*.7,d.r*9);
const rg=x.createRadialGradient(d.x-d.r*.3,d.y-d.r*.3,0,d.x,d.y,d.r*1.2);rg.addColorStop(0,'rgba(255,255,255,.55)');rg.addColorStop(.5,'rgba(190,230,232,.22)');rg.addColorStop(1,'rgba(120,180,190,.08)');x.fillStyle=rg;x.beginPath();x.ellipse(d.x,d.y,d.r,d.r*1.25,0,0,7);x.fill();x.strokeStyle='rgba(255,255,255,.25)';x.lineWidth=.6;x.stroke()};
const tick=()=>{x.clearRect(0,0,W,H);for(const d of D){d.p--;if(d.p<=0){d.v=.15+Math.random()*.9;d.p=200+Math.random()*500}d.y+=d.v;d.x+=Math.sin(d.y/60)*.05;if(d.y>H+30)Object.assign(d,mk(false));draw(d)}requestAnimationFrame(tick)};
addEventListener('resize',R);R();tick()})();
const nv=document.querySelector('nav'),sv=()=>nv.classList.toggle('solid',scrollY>innerHeight*.6);addEventListener('scroll',sv,{passive:true});sv();
