document.getElementById('thoughts').innerHTML=PENSIERI.map(t=>`<blockquote class="card reveal quote">“${t}”<cite>— Alessio Gaetano</cite></blockquote>`).join('');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const L=document.querySelector('.leaves'),C=['#f7c6d9','#c9b8f0','#a8e0d0','#ffe1a8','#b8d8f5'];
for(let i=0;i<14;i++){const s=document.createElement('span');s.textContent=['🍃','🌸','✿','❀'][i%4];s.style.left=Math.random()*100+'vw';s.style.animationDuration=14+Math.random()*16+'s';s.style.animationDelay=-Math.random()*30+'s';s.style.color=C[i%5];s.style.fontSize=12+Math.random()*16+'px';L.appendChild(s)}
document.getElementById('menu').onclick=()=>document.querySelector('nav').classList.toggle('open');
document.querySelectorAll('nav .links a').forEach(a=>a.onclick=()=>document.querySelector('nav').classList.remove('open'));
const ph=[...document.querySelectorAll('.ph')],lb=document.getElementById('lb'),im=lb.querySelector('img');let k=0;
const show=i=>{k=(i+ph.length)%ph.length;im.src=ph[k].href;im.alt=ph[k].querySelector('img').alt;lb.hidden=false};
ph.forEach((a,i)=>a.onclick=e=>{e.preventDefault();show(i)});
lbx.onclick=()=>lb.hidden=true;lbp.onclick=()=>show(k-1);lbn.onclick=()=>show(k+1);
lb.onclick=e=>{if(e.target===lb)lb.hidden=true};
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key=='Escape')lb.hidden=true;if(e.key=='ArrowLeft')show(k-1);if(e.key=='ArrowRight')show(k+1)});
